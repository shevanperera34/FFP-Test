"use client";

import {useIsPresentationTool} from "next-sanity/hooks";
import {withBasePath} from "@/config/site";

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();

  if (isPresentationTool) return null;

  return (
    <a
      href={withBasePath("/api/draft-mode/disable")}
      className="fixed bottom-4 right-4 z-[100] rounded-full bg-neutral-900 px-4 py-2 text-sm text-white shadow-lg hover:bg-neutral-800"
    >
      Exit preview
    </a>
  );
}
