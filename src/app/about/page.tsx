import type { Metadata } from "next";
import AboutPage from "@/views/AboutPage";
import { fetchAboutPage } from "@/lib/sanity/fetchSitePages";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/about");

export const revalidate = 60;

export default async function Page() {
  const sanityAbout = await fetchAboutPage();
  return <AboutPage sanityAbout={sanityAbout} />;
}
