import type { Metadata } from "next";
import { Suspense } from "react";
import { draftMode } from "next/headers";
import { getSiteUrl } from "@/config/site";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { VisualEditingGate } from "@/components/VisualEditingGate";
import ScrollToTop from "@/components/ScrollToTop";
import { SanityLive } from "@/lib/sanity/live";
import JsonLdGraph from "./JsonLdGraph";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const draft = await draftMode();
  const showVisualEditing = draft.isEnabled || process.env.NODE_ENV === "development";

  return (
    <html lang="en-CA">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <JsonLdGraph />
        <ScrollToTop />
        <SanityLive />
        {showVisualEditing ? (
          <div data-sanity-visual-editing-root suppressHydrationWarning style={{ display: "contents" }}>
            <VisualEditingGate />
          </div>
        ) : null}
        {/* Page shell streams after VE slot so RSC does not merge chunks into the wrong subtree. */}
        <Suspense fallback={null}>{children}</Suspense>
        {draft.isEnabled ? <DisableDraftMode /> : null}
      </body>
    </html>
  );
}
