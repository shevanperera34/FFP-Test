import { NextResponse } from "next/server";

/**
 * Drop X-Frame-Options when present so Sanity Presentation can iframe this app.
 * CSP `frame-ancestors` from next.config.ts defines which parents are allowed.
 */
export function middleware() {
  const res = NextResponse.next();
  res.headers.delete("x-frame-options");
  res.headers.delete("X-Frame-Options");
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|ttf|otf)$).*)",
  ],
};
