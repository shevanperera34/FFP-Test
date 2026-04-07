import type {PreviewUrlValidateUrlResult} from "@sanity/preview-url-secret";
import {validatePreviewUrl} from "@sanity/preview-url-secret";
import {perspectiveCookieName} from "@sanity/preview-url-secret/constants";
import {cookies, draftMode} from "next/headers";
import {NextResponse} from "next/server";
import {previewClient} from "@/lib/sanity/previewClient";
import {getSanityReadToken} from "@/lib/sanity/readToken";
import {sanityDataset, sanityProjectId} from "@/lib/sanity/env";

const readToken = getSanityReadToken();

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function getNestedCode(err: unknown): string {
  if (!err || typeof err !== "object") return "";
  const o = err as {code?: unknown; cause?: unknown};
  if (typeof o.code === "string") return o.code;
  if (typeof o.code === "number") return String(o.code);
  return getNestedCode(o.cause);
}

function isRetryablePreviewNetworkError(err: unknown): boolean {
  const code = getNestedCode(err);
  if (
    code === "EAI_AGAIN" ||
    code === "ENOTFOUND" ||
    code === "ETIMEDOUT" ||
    code === "ECONNRESET" ||
    code === "EHOSTUNREACH"
  ) {
    return true;
  }
  if (err && typeof err === "object" && "isNetworkError" in err) {
    return Boolean((err as {isNetworkError?: unknown}).isNetworkError);
  }
  return false;
}

/**
 * `validatePreviewUrl` calls Sanity’s API; DNS glitches often surface as EAI_AGAIN.
 * Retries help transient resolver failures; they cannot fix a host with no route to the internet.
 */
async function validatePreviewUrlWithRetries(
  client: ReturnType<typeof previewClient.withConfig>,
  url: string,
): Promise<PreviewUrlValidateUrlResult> {
  const raw = process.env.SANITY_PREVIEW_VALIDATE_MAX_ATTEMPTS ?? "5";
  const parsed = Number.parseInt(raw, 10);
  const maxAttempts = Number.isFinite(parsed) ? Math.min(10, Math.max(1, parsed)) : 5;

  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await validatePreviewUrl(client, url);
    } catch (err) {
      lastError = err;
      const retry = isRetryablePreviewNetworkError(err) && attempt < maxAttempts;
      if (retry) {
        const backoffMs = 400 * 2 ** (attempt - 1);
        console.warn(
          `[draft-mode/enable] validatePreviewUrl attempt ${attempt}/${maxAttempts} failed (${getNestedCode(err) || "network"}), retry in ${backoffMs}ms`,
        );
        await sleep(backoffMs);
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

/**
 * Custom draft-mode enable (instead of defineEnableDraftMode only) because Next.js 15
 * can leave `cookies().get("__prerender_bypass")` unset right after `draftMode().enable()`,
 * and `cookies().set({ value: undefined })` throws → 500 for Presentation preview.
 */
export async function GET(request: Request) {
  if (!readToken.length) {
    return NextResponse.json(
      {
        error: "Missing SANITY_API_READ_TOKEN",
        message:
          "Presentation preview needs a Sanity read token. Create one at sanity.io/manage → API → Tokens (Viewer). Put it in fable-face-paint-frontend/.env.local as SANITY_API_READ_TOKEN (or SANITY_READ_TOKEN / SANITY_API_TOKEN), then restart Next.js.",
      },
      {status: 503},
    );
  }

  const client = previewClient.withConfig({token: readToken});

  let isValid: boolean;
  let redirectTo: string;
  let studioPreviewPerspective: string | undefined;

  try {
    const result = await validatePreviewUrlWithRetries(client, request.url);
    isValid = result.isValid;
    redirectTo = result.redirectTo ?? "/";
    studioPreviewPerspective = result.studioPreviewPerspective ?? undefined;
  } catch (err) {
    console.error("[draft-mode/enable] validatePreviewUrl failed", err);
    const code = getNestedCode(err);
    const dnsHint =
      code === "EAI_AGAIN" || code === "ENOTFOUND"
        ? ` DNS cannot resolve ${sanityProjectId}.api.sanity.io on the machine running Next.js (not your browser). On that host run: getent hosts ${sanityProjectId}.api.sanity.io — if it fails, fix resolv.conf / NetworkManager DNS (try 1.1.1.1 or 8.8.8.8), disable VPN, or: sudo resolvectl flush-caches. Dataset: ${sanityDataset}.`
        : "";
    return NextResponse.json(
      {
        error: "Sanity preview validation failed",
        message: `Could not reach Sanity to validate the preview secret.${dnsHint}`,
      },
      {status: 502},
    );
  }

  if (!isValid) {
    return new NextResponse("Invalid secret", {status: 401});
  }

  const draftModeStore = await draftMode();
  if (!draftModeStore.isEnabled) {
    draftModeStore.enable();
  }

  const isProduction = process.env.NODE_ENV === "production";
  const isSecure =
    isProduction || process.env.NEXT_SANITY_DRAFT_MODE_SECURE_DEV === "1";

  const cookieStore = await cookies();
  const bypass = cookieStore.get("__prerender_bypass");
  if (bypass?.value) {
    cookieStore.set({
      name: "__prerender_bypass",
      value: bypass.value,
      httpOnly: true,
      path: "/",
      secure: isSecure,
      sameSite: isSecure ? "none" : "lax",
    });
  }

  if (studioPreviewPerspective) {
    cookieStore.set({
      name: perspectiveCookieName,
      value: studioPreviewPerspective,
      httpOnly: true,
      path: "/",
      secure: isSecure,
      sameSite: isSecure ? "none" : "lax",
    });
  }

  const target = new URL(redirectTo, request.url);
  return NextResponse.redirect(target);
}
