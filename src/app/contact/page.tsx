import type { Metadata } from "next";
import ContactPage from "@/views/ContactPage";
import { fetchContactPage } from "@/lib/sanity/fetchSitePages";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/contact");

export const revalidate = 60;

export default async function Page() {
  const sanityContact = await fetchContactPage();
  return <ContactPage sanityContact={sanityContact} />;
}
