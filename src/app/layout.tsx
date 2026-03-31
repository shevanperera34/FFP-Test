import type { Metadata, Viewport } from "next";
import { getSiteUrl } from "@/config/site";
import ScrollToTop from "@/components/ScrollToTop";
import JsonLdGraph from "./JsonLdGraph";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        {children}
      </body>
    </html>
  );
}
