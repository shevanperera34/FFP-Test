import type { Metadata } from "next";
import LargeEventsPage from "@/views/LargeEventsPage";
import { fetchLargeEventsPage } from "@/lib/sanity/fetchSitePages";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/large-events");

export const revalidate = 60;

export default async function Page() {
  const sanityLargeEvents = await fetchLargeEventsPage();
  return <LargeEventsPage sanityLargeEvents={sanityLargeEvents} />;
}
