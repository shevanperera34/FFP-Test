"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PageFrame, {
  HoverButton,
  contentMaxWidth,
  titleFont,
  uiFont,
  unifiedDarkButtonHover,
  unifiedHoverTransition,
  useIsCompactLayout,
} from "../components/PageFrame";
import heroBgPink from "../assets/images/hero-bg-pink.png";
import {
  eventPicHorizontalUrls,
  eventPicVerticalUrls,
  serviceAssetEntries,
} from "../generated/imageManifests";
import { encodePublicAssetPath, type BundledImageSrc } from "../utils/encodePublicAssetPath";

type GalleryItem = {
  src: BundledImageSrc;
  tag: string;
};

const serviceItems: GalleryItem[] = serviceAssetEntries.map(({ key: filePath, url: imageUrl }) => {
  const folderMatch = filePath.match(/assets\/srevice assets\/([^/]+)\/Assets\//);
  const folder = folderMatch?.[1] ?? "Service";
  return {
    src: imageUrl,
    tag: folder,
  };
});

const verticalItems: GalleryItem[] = eventPicVerticalUrls.map((src) => ({ src, tag: "Event Photos" }));
const horizontalItems: GalleryItem[] = eventPicHorizontalUrls.map((src) => ({ src, tag: "Event Photos" }));

const allGalleryItems = [...serviceItems, ...verticalItems, ...horizontalItems];
const galleryTags = ["All", ...Array.from(new Set(allGalleryItems.map((item) => item.tag)))];
const instagramProfileUrl = "https://www.instagram.com/fablefacepaint/?hl=en";

const GalleryPage: React.FC = () => {
  const isCompactLayout = useIsCompactLayout();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTag, setActiveTag] = useState<string>("All");
  const instagramEmbedHeight = isCompactLayout ? 760 : 980;

  useEffect(() => {
    const requestedTag = searchParams?.get("tag")?.trim() ?? "All";
    setActiveTag(galleryTags.includes(requestedTag) ? requestedTag : "All");
  }, [searchParams]);

  const filteredItems = useMemo(
    () => (activeTag === "All" ? allGalleryItems : allGalleryItems.filter((item) => item.tag === activeTag)),
    [activeTag]
  );

  return (
    <PageFrame pageSlug="gallery" pageTitle="Gallery | Fable Face Paint">
      <div style={{ maxWidth: contentMaxWidth, margin: "0 auto", padding: "0 18px 34px" }}>
        <section
          style={{
            width: "100vw",
            marginLeft: "calc(50% - 50vw)",
            marginRight: "calc(50% - 50vw)",
            backgroundImage: `linear-gradient(108deg, rgba(8,12,18,0.84) 0%, rgba(8,12,18,0.62) 48%, rgba(8,12,18,0.80) 100%), url("${encodePublicAssetPath(heroBgPink)}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderBottom: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <div
            style={{
              maxWidth: contentMaxWidth,
              margin: "0 auto",
              padding: isCompactLayout ? "44px 22px 36px" : "58px 22px 48px",
              display: "grid",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.74, fontFamily: uiFont }}>Gallery</div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2.2rem, 4.2vw, 4.2rem)",
                lineHeight: 0.98,
                fontWeight: 950,
                fontFamily: titleFont,
                maxWidth: 800,
              }}
            >
              Real event work, sorted by service.
            </h1>
            <p style={{ margin: 0, maxWidth: 820, fontSize: "clamp(0.98rem, 1.18vw, 1.1rem)", lineHeight: 1.6, color: "rgba(242,247,252,0.92)" }}>
              Use the filter chips below to swap categories. Everything visible on this page is controlled directly in this file.
            </p>
          </div>
        </section>

        <section style={{ padding: isCompactLayout ? "22px 0 26px" : "28px 0 34px", display: "grid", gap: 16 }}>
          <div
            data-native-cursor="true"
            style={{
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.16)",
              background: "linear-gradient(122deg, rgba(10,14,21,0.78) 0%, rgba(26,11,30,0.72) 56%, rgba(53,17,34,0.72) 100%)",
              boxShadow: "0 14px 30px rgba(0,0,0,0.24)",
              padding: isCompactLayout ? "14px 12px" : "16px",
              display: "grid",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div style={{ display: "grid", gap: 2 }}>
                <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.76, fontFamily: uiFont }}>Instagram Preview</div>
                <div style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.45rem)", lineHeight: 1.1, fontWeight: 900, fontFamily: titleFont }}>@fablefacepaint</div>
              </div>
              <a
                href={instagramProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.24)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#FFFFFF",
                  padding: "8px 12px",
                  fontWeight: 800,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontFamily: uiFont,
                }}
              >
                Open Instagram
              </a>
            </div>

            <div
              style={{
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(10,10,10,0.38)",
                minHeight: instagramEmbedHeight,
              }}
            >
              <iframe
                src="https://www.instagram.com/fablefacepaint/embed"
                title="Fable Face Paint Instagram feed"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: instagramEmbedHeight,
                  border: "none",
                  display: "block",
                  background: "#101216",
                }}
                allow="encrypted-media"
              />
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {galleryTags.map((tag) => {
              const active = tag === activeTag;
              return (
                <HoverButton
                  key={tag}
                  onClick={() => {
                    setActiveTag(tag);
                    const path = pathname ?? "/gallery";
                    if (tag === "All") {
                      router.replace(path, { scroll: false });
                    } else {
                      router.replace(`${path}?${new URLSearchParams({ tag }).toString()}`, { scroll: false });
                    }
                  }}
                  style={{
                    cursor: "pointer",
                    border: active ? "1px solid rgba(211,74,168,0.82)" : "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 999,
                    padding: "8px 12px",
                    fontWeight: 800,
                    fontSize: 12,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    background: active ? "rgba(211,74,168,0.20)" : "rgba(255,255,255,0.06)",
                    color: "#FFFFFF",
                    fontFamily: uiFont,
                    transition: unifiedHoverTransition,
                  }}
                  hoverStyle={unifiedDarkButtonHover}
                >
                  {tag}
                </HoverButton>
              );
            })}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isCompactLayout ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))",
              gap: 10,
            }}
          >
            {filteredItems.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                data-native-cursor="true"
                style={{
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 10px 26px rgba(0,0,0,0.24)",
                  height: isCompactLayout ? 140 : 190,
                  position: "relative",
                }}
              >
                <img
                  src={encodePublicAssetPath(item.src)}
                  alt={`${item.tag} image ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 8,
                    bottom: 8,
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.22)",
                    background: "rgba(6,10,14,0.55)",
                    padding: "4px 8px",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    fontFamily: uiFont,
                    color: "#F7F8FA",
                  }}
                >
                  {item.tag}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageFrame>
  );
};

export default GalleryPage;
