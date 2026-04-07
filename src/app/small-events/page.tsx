import type { Metadata } from "next";
import SmallEventsPage from "@/views/SmallEventsPage";
import { fetchSmallEventsPage } from "@/lib/sanity/fetchSitePages";
import { buildSmallEventsVisualAttrs } from "@/lib/sanity/smallEventsVisualAttrs";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/small-events");

export const revalidate = 60;

export default async function Page() {
  const sanitySmallEvents = await fetchSmallEventsPage();
  const smallEventsVisualAttrs = buildSmallEventsVisualAttrs(sanitySmallEvents);
  return <SmallEventsPage sanitySmallEvents={sanitySmallEvents} smallEventsVisualAttrs={smallEventsVisualAttrs} />;
}
