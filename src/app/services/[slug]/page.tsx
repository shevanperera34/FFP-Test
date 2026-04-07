import type { Metadata } from "next";
import ServicesPage from "@/views/ServicesPage";
import { fetchServicesList } from "@/lib/sanity/fetchSitePages";
import { metadataForPath } from "@/lib/seo/metadata";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  await params;
  return metadataForPath("/services");
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sanityServices = await fetchServicesList();
  return <ServicesPage sanityServices={sanityServices} initialServiceSlug={slug} />;
}
