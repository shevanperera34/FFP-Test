import type { Metadata } from "next";
import ServicesPage from "@/views/ServicesPage";
import { fetchServicesList } from "@/lib/sanity/fetchSitePages";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/services");

export const revalidate = 60;

export default async function Page() {
  const sanityServices = await fetchServicesList();
  return <ServicesPage sanityServices={sanityServices} />;
}
