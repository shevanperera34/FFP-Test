"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const VisualEditing = dynamic(
  () => import("next-sanity/visual-editing").then((m) => m.VisualEditing),
  { ssr: false },
);

/**
 * Must not render VisualEditing during the initial hydration pass: Next can otherwise
 * associate streamed page HTML with the lazy VisualEditing subtree (ffp-site-shell vs Suspense mismatch).
 * After mount, render is a client-only update — comlink to Studio stays stable.
 */
export function VisualEditingGate() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return <VisualEditing />;
}
