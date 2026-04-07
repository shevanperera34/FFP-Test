import type { Metadata } from "next";
import { Suspense } from "react";
import GalleryPage from "@/views/GalleryPage";
import { fetchGalleryImages } from "@/lib/sanity/fetchSitePages";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/gallery");

export const revalidate = 60;

export default async function Page() {
  const sanityGallery = await fetchGalleryImages();
  return (
    <Suspense fallback={null}>
      <GalleryPage sanityGallery={sanityGallery} />
    </Suspense>
  );
}
