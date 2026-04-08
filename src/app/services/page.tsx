import type { Metadata } from "next";
import ServicesPage from "@/views/ServicesPage";
import { fetchServicesList, fetchServicesListingPage } from "@/lib/sanity/fetchSitePages";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/services");

export const revalidate = 60;

export default async function Page() {
  const [sanityServices, sanityServicesListing] = await Promise.all([fetchServicesList(), fetchServicesListingPage()]);
  return <ServicesPage sanityServices={sanityServices} sanityServicesListing={sanityServicesListing} />;
}
