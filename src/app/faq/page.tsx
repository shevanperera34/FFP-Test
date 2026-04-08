import type { Metadata } from "next";
import FaqPage from "@/views/FaqPage";
import { fetchFaqItems, fetchFaqListingPage } from "@/lib/sanity/fetchSitePages";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/faq");

export const revalidate = 60;

export default async function Page() {
  const [sanityFaqItems, sanityFaqListing] = await Promise.all([fetchFaqItems(), fetchFaqListingPage()]);
  return <FaqPage sanityFaqItems={sanityFaqItems} sanityFaqListing={sanityFaqListing} />;
}
