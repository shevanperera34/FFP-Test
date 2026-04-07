import type { Metadata } from "next";
import HomePage from "@/HomePage";
import { fetchHomepage } from "@/lib/sanity/fetchHomepage";
import { fetchSiteSettings } from "@/lib/sanity/fetchSitePages";
import { buildHomepageVisualAttrs } from "@/lib/sanity/homepageVisualAttrs";
import {
  mergeHomepageCopy,
  resolveArtistPhotoAlt,
  resolveHeroLogoAlt,
} from "@/lib/sanity/mergeHomepageCopy";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/");

/** Revalidate homepage when Sanity content changes (on-demand revalidation can be added later). */
export const revalidate = 60;

export default async function Page() {
  const [sanityHomepage, sanitySiteSettings] = await Promise.all([fetchHomepage(), fetchSiteSettings()]);
  const homepageCopy = mergeHomepageCopy(sanityHomepage);
  const homepageVisualAttrs = buildHomepageVisualAttrs(sanityHomepage);
  const heroLogoAlt = resolveHeroLogoAlt(sanityHomepage);
  const artistPhotoAlt = resolveArtistPhotoAlt(sanityHomepage);

  return (
    <HomePage
      sanityHomepage={sanityHomepage}
      sanitySiteSettings={sanitySiteSettings}
      homepageCopy={homepageCopy}
      homepageVisualAttrs={homepageVisualAttrs}
      heroLogoAlt={heroLogoAlt}
      artistPhotoAlt={artistPhotoAlt}
    />
  );
}
