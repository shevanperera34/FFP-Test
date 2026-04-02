"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PageFrame, {
  HoverButton,
  Card,
  brand,
  canonicalPathBySlug,
  contentMaxWidth,
  titleFont,
  uiFont,
  unifiedBookButtonHover,
  unifiedDarkButtonHover,
  unifiedHoverTransition,
  useIsCompactLayout,
} from "./components/PageFrame";
import galleryImage1 from "./assets/Gallery/image-asset 1.webp";
import galleryImage2 from "./assets/Gallery/image-asset 2.webp";
import galleryImage3 from "./assets/Gallery/image-asset 3.webp";
import galleryImage4 from "./assets/Gallery/image-asset 4.webp";
import galleryImage5 from "./assets/Gallery/image-asset 5.webp";
import galleryImage6 from "./assets/Gallery/image-asset 6.webp";
import galleryImage7 from "./assets/Gallery/image-asset 7.webp";
import galleryImage8 from "./assets/Gallery/image-asset 8.webp";
import heroFrameIllustration from "./assets/Website Photos etc_/fablefacepaint website illustration.png";
import milenaImg from "./assets/Website Photos etc_/IMG_0316 (3).jpg";
import heroCenterLogo from "./assets/My Logos and PFPs/Logo - fable face paint (1).png";
import awardWinner2026 from "./assets/Awards/Winner-2026.png";
import award1 from "./assets/Awards/1.png";
import award2 from "./assets/Awards/2.png";
import award3 from "./assets/Awards/3.png";
import award4 from "./assets/Awards/4.png";
import award5 from "./assets/Awards/5 (2).png";
import award6 from "./assets/Awards/6 (2).png";
import corporateLogo1 from "./assets/Corporate Logos/001ef16f0c7d49c2b60f4a22bf1ff1a1.png";
import corporateLogo2 from "./assets/Corporate Logos/162-1627127_rec-room-logo-png-transparent-png-removebg-preview.png";
import corporateLogo3 from "./assets/Corporate Logos/channels4_profile-removebg-preview.png";
import corporateLogo4 from "./assets/Corporate Logos/download.png";
import corporateLogo5 from "./assets/Corporate Logos/images-removebg-preview.png";
import corporateLogo6 from "./assets/Corporate Logos/images__1_-removebg-preview.png";
import corporateLogo7 from "./assets/Corporate Logos/Seneca-logo.svg.png";
import corporateLogo8 from "./assets/Corporate Logos/Untitled design (12).png";
import { eventPicVerticalUrls, serviceAssetEntries } from "./generated/imageManifests";
import { encodePublicAssetPath, type BundledImageSrc } from "./utils/encodePublicAssetPath";

const homeGalleryImages = [galleryImage1, galleryImage2, galleryImage3, galleryImage4, galleryImage5, galleryImage6, galleryImage7, galleryImage8];
const beltAwardImages = [award1, award2, award3, awardWinner2026, award4, award5, award6];
const mobileAwardTopRow = [award1, award2, award3];
const mobileAwardBottomRow = [award4, award5, award6];
const corporateLogoImages = [
  { src: corporateLogo1, scale: 1.08 },
  { src: corporateLogo2, scale: 1.08 },
  { src: corporateLogo3, scale: 1.04 },
  { src: corporateLogo4, scale: 1.02 },
  { src: corporateLogo5, scale: 1.28 },
  { src: corporateLogo6, scale: 1.22 },
  { src: corporateLogo7, scale: 1.02 },
  { src: corporateLogo8, scale: 1.0 },
];

const travelAreas = [
  "Toronto",
  "Vaughan",
  "Richmond Hill",
  "Markham",
  "Mississauga",
  "Brampton",
  "Oakville",
  "Burlington",
  "Milton",
  "Etobicoke",
  "North York",
  "Scarborough",
  "Pickering",
  "Ajax",
  "Whitby",
  "Oshawa",
  "Aurora",
  "Newmarket",
  "King City",
];

const trustIndicators = [
  {
    icon: "shield-plus",
    title: "$5M Liability Insured",
    subtitle: "Professional event coverage",
  },
  {
    icon: "sparkles",
    title: "Cosmetic-Grade Products",
    subtitle: "Pro kit & materials",
  },
  {
    icon: "mobile",
    title: "Fully Mobile",
    subtitle: "Serving the Greater Toronto Area",
  },
  {
    icon: "network",
    title: "Trusted Pro Network",
    subtitle: "Multi-artist support",
  },
];

const aboutVerticalEventImages = eventPicVerticalUrls;
const allServiceAssetImages = serviceAssetEntries.map((e) => e.url);

function VerticalEventSwipeCarousel({
  images,
  isCompactLayout,
}: {
  images: BundledImageSrc[];
  isCompactLayout: boolean;
}) {
  const touchStartXRef = useRef<number | null>(null);
  const carouselImages = images.length > 0 ? images : homeGalleryImages;
  const total = carouselImages.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((currentIndex) => (currentIndex + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((currentIndex) => (currentIndex - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (total <= 1 || typeof window === "undefined") return;
    const interval = window.setInterval(goNext, 4200);
    return () => window.clearInterval(interval);
  }, [goNext, total]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current;
    const endX = event.changedTouches[0]?.clientX ?? null;
    touchStartXRef.current = null;
    if (startX === null || endX === null) return;
    const delta = endX - startX;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  if (!carouselImages[activeIndex]) return null;

  return (
    <div
      data-native-cursor="true"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        height: "100%",
        width: "100%",
        minHeight: isCompactLayout ? 360 : 0,
        aspectRatio: isCompactLayout ? "3 / 4" : undefined,
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src={encodePublicAssetPath(carouselImages[activeIndex]!)}
        alt={`Event photo ${activeIndex + 1}`}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          touchAction: "pan-y",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          background: `
            radial-gradient(circle at center, rgba(242,240,238,0) 58%, rgba(242,240,238,0.07) 78%, rgba(242,240,238,0.18) 100%),
            linear-gradient(to bottom, rgba(242,240,238,0.12) 0%, rgba(242,240,238,0) 20%, rgba(242,240,238,0) 80%, rgba(242,240,238,0.14) 100%),
            linear-gradient(to right, rgba(242,240,238,0.11) 0%, rgba(242,240,238,0) 18%, rgba(242,240,238,0) 82%, rgba(242,240,238,0.11) 100%)
          `,
          boxShadow: "inset 0 0 44px rgba(242,240,238,0.10), inset 0 0 90px rgba(242,240,238,0.05)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(7,14,18,0.30), rgba(7,14,18,0.05) 35%, rgba(7,14,18,0.18))",
          pointerEvents: "none",
        }}
      />
      <div
        aria-label="Event image position"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 12,
          display: "flex",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {carouselImages.map((_, index) => (
          <span
            key={`vertical-event-dot-${index}`}
            style={{
              width: index === activeIndex ? 18 : 6,
              height: 6,
              borderRadius: 999,
              background: index === activeIndex ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.4)",
              transition: "width 0.2s ease, background 0.2s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function HomeGalleryRotationViewport({
  images,
  isCompactLayout,
}: {
  images: BundledImageSrc[];
  isCompactLayout: boolean;
}) {
  const touchStartXRef = useRef<number | null>(null);
  const total = images.length;
  const slotsPerView = isCompactLayout ? 4 : 8;
  const [activeOffset, setActiveOffset] = useState(0);

  const goNext = useCallback(() => {
    if (total <= 1) return;
    setActiveOffset((currentOffset) => (currentOffset + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    if (total <= 1) return;
    setActiveOffset((currentOffset) => (currentOffset - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (total <= 1 || typeof window === "undefined") return;
    const interval = window.setInterval(goNext, 3400);
    return () => window.clearInterval(interval);
  }, [goNext, total]);

  useEffect(() => {
    if (total === 0) {
      setActiveOffset(0);
      return;
    }
    setActiveOffset((currentOffset) => currentOffset % total);
  }, [total]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current;
    const endX = event.changedTouches[0]?.clientX ?? null;
    touchStartXRef.current = null;
    if (startX === null || endX === null) return;
    const delta = endX - startX;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  if (total === 0) return null;

  const visibleCount = Math.min(slotsPerView, total);
  const visibleImages = Array.from({ length: visibleCount }, (_, index) => images[(activeOffset + index) % total]);
  const pickImage = (index: number) => visibleImages[index % visibleImages.length]!;
  const tileRadius = isCompactLayout ? 16 : 22;

  const renderTile = (src: BundledImageSrc, key: string) => (
    <div
      key={key}
      style={{
        position: "relative",
        minHeight: 0,
        borderRadius: tileRadius,
        overflow: "hidden",
      }}
    >
      <img
        src={encodePublicAssetPath(src)}
        alt="Event gallery image"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: isCompactLayout ? 780 : 1180,
        margin: "0 auto",
        height: isCompactLayout ? "min(56vh, 520px)" : "min(62vh, 690px)",
        minHeight: isCompactLayout ? 320 : 440,
        borderRadius: isCompactLayout ? 22 : 30,
      }}
    >
      {!isCompactLayout && total > 1 ? (
        <>
          <HoverButton
            onClick={goPrev}
            ariaLabel="Previous gallery images"
            style={{
              position: "absolute",
              left: -54,
              top: "50%",
              transform: "translateY(-50%)",
              width: 34,
              height: 34,
              border: "none",
              background: "transparent",
              color: "rgba(255,255,255,0.88)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              lineHeight: 1,
              zIndex: 3,
              cursor: "pointer",
            }}
            hoverStyle={{
              color: "#FFFFFF",
              textShadow: "0 0 10px rgba(214,182,212,0.95), 0 0 22px rgba(214,182,212,0.7)",
              transform: "translateY(-50%) scale(1.06)",
            }}
          >
            ‹
          </HoverButton>
          <HoverButton
            onClick={goNext}
            ariaLabel="Next gallery images"
            style={{
              position: "absolute",
              right: -54,
              top: "50%",
              transform: "translateY(-50%)",
              width: 34,
              height: 34,
              border: "none",
              background: "transparent",
              color: "rgba(255,255,255,0.88)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              lineHeight: 1,
              zIndex: 3,
              cursor: "pointer",
            }}
            hoverStyle={{
              color: "#FFFFFF",
              textShadow: "0 0 10px rgba(214,182,212,0.95), 0 0 22px rgba(214,182,212,0.7)",
              transform: "translateY(-50%) scale(1.06)",
            }}
          >
            ›
          </HoverButton>
        </>
      ) : null}
      {isCompactLayout ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 12,
            height: "100%",
          }}
        >
          {Array.from({ length: 4 }, (_, index) => renderTile(pickImage(index), `compact-gallery-tile-${index}`))}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.9fr 0.95fr",
            gap: 20,
            height: "100%",
          }}
        >
          <div style={{ display: "grid", gridTemplateRows: "1.45fr 1fr", gap: 20, minHeight: 0 }}>
            {renderTile(pickImage(0), "desktop-gallery-tile-0")}
            {renderTile(pickImage(1), "desktop-gallery-tile-1")}
          </div>
          <div style={{ display: "grid", gridTemplateRows: "1fr 1.05fr 0.95fr", gap: 20, minHeight: 0 }}>
            {renderTile(pickImage(2), "desktop-gallery-tile-2")}
            {renderTile(pickImage(3), "desktop-gallery-tile-3")}
            {renderTile(pickImage(4), "desktop-gallery-tile-4")}
          </div>
          <div style={{ display: "grid", gridTemplateRows: "1.25fr 1fr", gap: 20, minHeight: 0 }}>
            {renderTile(pickImage(5), "desktop-gallery-tile-5")}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, minHeight: 0 }}>
              {renderTile(pickImage(6), "desktop-gallery-tile-6")}
              {renderTile(pickImage(7), "desktop-gallery-tile-7")}
            </div>
          </div>
        </div>
      )}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(7,14,18,0.22), rgba(7,14,18,0.03) 38%, rgba(7,14,18,0.08))",
          pointerEvents: "none",
          borderRadius: isCompactLayout ? 22 : 30,
        }}
      />
      <div
        aria-label="Gallery image position"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 16,
          display: "flex",
          justifyContent: "center",
          gap: 7,
        }}
      >
        {total <= 12 ? (
          images.map((_, index) => (
            <span
              key={`home-gallery-dot-${index}`}
              style={{
                width: index === activeOffset ? 20 : 7,
                height: 7,
                borderRadius: 999,
                background: index === activeOffset ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.45)",
                transition: "width 0.2s ease, background 0.2s ease",
              }}
            />
          ))
        ) : (
          <div style={{ fontSize: 12, fontFamily: uiFont, color: "rgba(255,255,255,0.9)" }}>
            {activeOffset + 1} / {total}
          </div>
        )}
      </div>
    </div>
  );
}

const homeCopy = {
  locationLabel: "across the GTA",
  heroHeadline: "Premium & Enchanted Event face art experience",
  heroCtaLabel: "Book Now",
  introHeadline: "Face painting, but make it event art.",
  introParagraph:
    "Fable Face Paint is a fully mobile face painting & event art service serving the GTA. Led by Milena, with a trusted team available for larger bookings, we can handle everything from private celebrations to corporate and public events.",
  artistEyebrow: "Meet your artist",
  artistName: "Milena",
  smallEventsEyebrow: "Birthdays · Private parties",
  smallEventsTitle: "Small Events",
  smallEventsDescription: "Perfect for smaller guest lists and high-quality designs. Book a single artist for a clean, magical setup.",
  smallEventsCtaLabel: "Explore Small Events",
  largeEventsEyebrow: "Corporate · Festivals · Public events",
  largeEventsTitle: "Large Events",
  largeEventsDescription: "Need higher throughput or multiple artists? This path is built for scale, structure, and crowd flow.",
  largeEventsCtaLabel: "Explore Large Events",
  helperNote: "Not sure which one fits? Start with the closest match, and the booking form will sort the details.",
  travelAreasTitle: "Serving Toronto and the Greater Toronto Area",
  travelAreasDescription: "Available for birthdays, private parties, corporate events, and festivals across these cities:",
  trustSectionTitle: "What clients rely on",
  gallerySectionTitle: "Real work from real events.",
  gallerySectionDescription: "A quick look at the detailed work and atmosphere of Fable Face Paint events.",
};

const HomePage: React.FC = () => {
  const router = useRouter();
  const isCompactLayout = useIsCompactLayout();

  const goTo = useCallback(
    (slug: "birthdays" | "corporate" | "contact" | "about") => {
      router.push(canonicalPathBySlug[slug]);
    },
    [router]
  );

  return (
    <PageFrame pageSlug="home">
      <section
        style={{
          position: "relative",
          minHeight: isCompactLayout ? "min(84svh, 760px)" : "calc(100vh - 60px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: isCompactLayout ? "3.5vh" : "8vh",
          padding: isCompactLayout ? "3.5vh 14px 34px" : "8vh 24px 80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${encodePublicAssetPath(heroFrameIllustration)}")`,
            backgroundSize: isCompactLayout ? "cover" : "110% auto",
            backgroundPosition: isCompactLayout ? "center top" : "center -28px",
            backgroundRepeat: "no-repeat",
            pointerEvents: "none",
            mixBlendMode: "normal",
            opacity: 1,
          }}
          aria-hidden
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: isCompactLayout ? 480 : 900,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: isCompactLayout ? "center" : "flex-end",
              width: isCompactLayout ? "min(176px, 48vw)" : "28%",
              maxWidth: "min(720px, 92vw)",
              marginBottom: isCompactLayout ? 16 : 20,
            }}
          >
            <img
              src={encodePublicAssetPath(heroCenterLogo)}
              alt="Fable Face Paint logo"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 24,
                filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.6)) drop-shadow(0 12px 32px rgba(0,0,0,0.55)) contrast(1.1)",
              }}
            />
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 700,
                fontSize: isCompactLayout ? "clamp(0.6rem, 2.8vw, 0.78rem)" : "clamp(0.55rem, 1.2vw, 0.7rem)",
                color: "rgba(255,255,255,0.65)",
                margin: "4px 0 0",
                letterSpacing: "0.12em",
                textTransform: "none",
                textShadow: "0 2px 6px rgba(0,0,0,0.42), 0 6px 18px rgba(0,0,0,0.22)",
              }}
            >
              {homeCopy.locationLabel}
            </p>
          </div>
          <p
            style={{
              fontFamily: '"Unifraktur Cook", serif',
              fontWeight: 900,
              fontSize: isCompactLayout ? "clamp(2.2rem, 12vw, 3.65rem)" : "clamp(2.85rem, 8vw, 5rem)",
              color: "#FFFFFF",
              margin: isCompactLayout ? "0" : "0 0 6px",
              lineHeight: isCompactLayout ? 0.96 : 1.0,
              letterSpacing: "0.02em",
              textShadow: "0 4px 8px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)",
              maxWidth: isCompactLayout ? "min(370px, 94vw)" : undefined,
            }}
          >
            {homeCopy.heroHeadline}
          </p>
          <HoverButton
            onClick={() => goTo("contact")}
            style={{
              cursor: "pointer",
              border: "1px solid #931C62",
              borderRadius: 8,
              marginTop: isCompactLayout ? 18 : 28,
              padding: isCompactLayout ? "11px 28px" : "16px 40px",
              minWidth: isCompactLayout ? 172 : 220,
              fontWeight: 700,
              fontSize: isCompactLayout ? 15 : 20,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              background: "#931C62",
              color: "#FFFFFF",
              fontFamily: uiFont,
              boxShadow: "0 10px 24px rgba(147, 28, 98, 0.22)",
              transform: "scale(1)",
              transition: unifiedHoverTransition,
            }}
            hoverStyle={unifiedBookButtonHover}
          >
            {homeCopy.heroCtaLabel}
          </HoverButton>
        </div>
      </section>

      <section
        style={{
          padding: isCompactLayout ? "62px 0 52px" : "96px 0",
          background: "transparent",
          minHeight: isCompactLayout ? "auto" : "calc(100vh - 72px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: contentMaxWidth, margin: "0 auto", padding: isCompactLayout ? "0 16px" : "0 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isCompactLayout ? "1fr" : "minmax(320px, 1.05fr) minmax(300px, 0.9fr)",
              gap: 42,
              alignItems: "start",
              maxWidth: contentMaxWidth,
            }}
          >
            <div
              style={{
                paddingTop: 0,
                maxWidth: 560,
                marginTop: isCompactLayout ? 0 : -10,
              }}
            >
              <div
                style={{
                  fontSize: "clamp(2.65rem, 4vw, 4.15rem)",
                  fontWeight: 950,
                  fontFamily: titleFont,
                  lineHeight: 0.98,
                  letterSpacing: "-0.02em",
                  textShadow: "0 3px 10px rgba(0,0,0,0.42), 0 10px 26px rgba(0,0,0,0.22)",
                }}
              >
                {homeCopy.introHeadline}
              </div>
              <div
                style={{
                  marginTop: isCompactLayout ? 18 : 24,
                  maxWidth: 640,
                  fontSize: isCompactLayout ? 16 : 18,
                  lineHeight: isCompactLayout ? 1.62 : 1.8,
                  opacity: 0.9,
                  textShadow: "0 2px 8px rgba(0,0,0,0.34)",
                }}
              >
                {homeCopy.introParagraph}
              </div>

              <div data-native-cursor="true" style={{ marginTop: isCompactLayout ? 24 : 32 }}>
                <HoverButton
                  onClick={() => goTo("about")}
                  ariaLabel="Meet your artist and learn more about Fable Face Paint"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: isCompactLayout ? "column" : "row",
                    alignItems: isCompactLayout ? "center" : "center",
                    textAlign: isCompactLayout ? "center" : "left",
                    gap: isCompactLayout ? 14 : 44,
                    padding: isCompactLayout ? "18px 14px" : "32px 36px 32px 48px",
                    minHeight: isCompactLayout ? 0 : 220,
                    borderRadius: 18,
                    background: "#F2F0EE",
                    color: brand.colors.ink,
                    border: "1px solid rgba(11,11,11,0.10)",
                    boxShadow: "0 18px 44px rgba(0,0,0,0.18)",
                    backdropFilter: "blur(10px)",
                    width: "100%",
                    maxWidth: 860,
                    transition: unifiedHoverTransition,
                  }}
                  hoverStyle={{
                    transform: "translateY(-2px)",
                    background: "#FFFFFF",
                    boxShadow: "0 20px 52px rgba(0,0,0,0.22)",
                    color: brand.colors.ink,
                  }}
                >
                  <img
                    src={encodePublicAssetPath(milenaImg)}
                    alt="Milena, lead artist"
                    style={{
                      width: isCompactLayout ? 108 : 126,
                      height: isCompactLayout ? 108 : 126,
                      borderRadius: 999,
                      objectFit: "cover",
                      objectPosition: "center 30%",
                      transform: isCompactLayout ? "scale(1.08)" : "scale(1.32)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                    }}
                  />
                  <div style={{ display: "grid", gap: 8, paddingLeft: isCompactLayout ? 0 : 6, justifyItems: isCompactLayout ? "center" : "start" }}>
                    <div
                      style={{
                        fontSize: isCompactLayout ? 12 : 18,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        opacity: 0.75,
                      }}
                    >
                      {homeCopy.artistEyebrow}
                    </div>
                    <div style={{ fontSize: isCompactLayout ? 30 : 34, fontWeight: 950, lineHeight: 1.02, maxWidth: "100%", wordBreak: "break-word" }}>
                      {homeCopy.artistName}
                    </div>
                    <div style={{ fontSize: isCompactLayout ? 11 : 12, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.65, fontFamily: uiFont }}>
                      Learn more about Milena and the team
                    </div>
                  </div>
                </HoverButton>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gap: isCompactLayout ? 16 : 24,
                width: "100%",
                maxWidth: 420,
                justifySelf: isCompactLayout ? "stretch" : "end",
                paddingTop: isCompactLayout ? 0 : 8,
              }}
            >
              <Card
                style={{
                  background: "#F2F0EE",
                  color: brand.colors.ink,
                  border: "1px solid rgba(11,11,11,0.10)",
                  boxShadow: "0 18px 44px rgba(0,0,0,0.18)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.74 }}>{homeCopy.smallEventsEyebrow}</div>
                </div>

                <div style={{ marginTop: 12, fontSize: 24, fontWeight: 950, fontFamily: titleFont }}>{homeCopy.smallEventsTitle}</div>
                <div style={{ marginTop: 10, fontSize: 16, lineHeight: 1.6, opacity: 0.86 }}>{homeCopy.smallEventsDescription}</div>

                <HoverButton
                  onClick={() => goTo("birthdays")}
                  style={{
                    marginTop: 14,
                    cursor: "pointer",
                    border: "1px solid #15554E",
                    background: "linear-gradient(135deg, #1A7D6C 0%, #15554E 100%)",
                    color: "#FFFFFF",
                    borderRadius: 12,
                    padding: "12px 14px",
                    fontFamily: uiFont,
                    fontWeight: 800,
                    fontSize: 15,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 10px 24px rgba(21,85,78,0.24)",
                    transition: unifiedHoverTransition,
                  }}
                  hoverStyle={{
                    transform: "translateY(-1px)",
                    background: "#15554E",
                    boxShadow: "0 14px 30px rgba(21,85,78,0.34)",
                    color: "#FFFFFF",
                    opacity: 1,
                  }}
                >
                  {homeCopy.smallEventsCtaLabel} <span aria-hidden>→</span>
                </HoverButton>
              </Card>

              <Card
                style={{
                  position: "relative",
                  background: "#F2F0EE",
                  color: brand.colors.ink,
                  border: "1px solid rgba(211,74,168,0.65)",
                  boxShadow: "0 18px 44px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(211,74,168,0.18)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div style={{ fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.74 }}>{homeCopy.largeEventsEyebrow}</div>

                <div style={{ marginTop: 12, fontSize: 24, fontWeight: 950, fontFamily: titleFont }}>{homeCopy.largeEventsTitle}</div>
                <div style={{ marginTop: 10, fontSize: 16, lineHeight: 1.6, opacity: 0.86 }}>{homeCopy.largeEventsDescription}</div>

                <HoverButton
                  onClick={() => goTo("corporate")}
                  style={{
                    marginTop: 14,
                    cursor: "pointer",
                    border: "1px solid #931C62",
                    background: "linear-gradient(135deg, #B61C78 0%, #8E185A 100%)",
                    color: "#FFFFFF",
                    borderRadius: 12,
                    padding: "12px 14px",
                    fontFamily: uiFont,
                    fontWeight: 800,
                    fontSize: 15,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 10px 24px rgba(147,28,98,0.24)",
                    transition: unifiedHoverTransition,
                  }}
                  hoverStyle={unifiedDarkButtonHover}
                >
                  {homeCopy.largeEventsCtaLabel} <span aria-hidden>→</span>
                </HoverButton>
              </Card>
            </div>
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 15,
              lineHeight: 1.7,
              opacity: 0.8,
              paddingLeft: 2,
              maxWidth: 760,
              textShadow: "0 2px 8px rgba(0,0,0,0.34)",
            }}
          >
            {homeCopy.helperNote}
          </div>

          <div
            data-native-cursor="true"
            style={{
              marginTop: 18,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(6,12,18,0.44)",
              boxShadow: "0 14px 30px rgba(0,0,0,0.24)",
              padding: isCompactLayout ? "18px 14px" : "22px 20px",
              display: "grid",
              gap: 12,
              maxWidth: 900,
            }}
          >
            <div style={{ fontSize: isCompactLayout ? 12 : 13, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.76, fontFamily: uiFont }}>
              Travel Areas
            </div>
            <div style={{ fontSize: "clamp(1.45rem, 2.2vw, 2rem)", lineHeight: 1.05, fontWeight: 950, fontFamily: titleFont }}>
              {homeCopy.travelAreasTitle}
            </div>
            <p style={{ margin: 0, fontSize: isCompactLayout ? 14 : 15, lineHeight: 1.6, opacity: 0.9 }}>{homeCopy.travelAreasDescription}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {travelAreas.map((city) => (
                <span
                  key={city}
                  style={{
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.06)",
                    padding: "6px 10px",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                    color: "#F5F7FA",
                    fontFamily: uiFont,
                    textTransform: "uppercase",
                  }}
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "0 0 96px",
          marginTop: isCompactLayout ? -12 : -110,
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 24,
            position: "relative",
            isolation: "isolate",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: isCompactLayout ? "120px 0 0 0" : "170px 0 0 0",
              background:
                "linear-gradient(to bottom, rgba(214, 182, 212, 0) 0%, rgba(214, 182, 212, 0.30) 14%, rgba(214, 182, 212, 0.30) 100%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              height: isCompactLayout ? 130 : 210,
              background: "linear-gradient(to bottom, rgba(214, 182, 212, 0.30) 0%, rgba(214, 182, 212, 0) 100%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div
            style={{
              width: "100%",
              padding: isCompactLayout ? "0 8px" : "0 10px",
              display: "grid",
              justifyItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 1240,
                display: "grid",
                gap: isCompactLayout ? 16 : 22,
                justifyItems: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  padding: isCompactLayout ? "0 0 44px" : "2px 0 64px",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: "4%",
                    right: "4%",
                    bottom: 2,
                    height: 16,
                    borderRadius: 999,
                    background: "rgba(0,0,0,0.34)",
                    filter: "blur(14px)",
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: isCompactLayout ? "center" : "space-between",
                    gap: isCompactLayout ? 14 : 20,
                    overflowX: isCompactLayout ? "hidden" : "visible",
                    padding: isCompactLayout ? "0 8px 6px" : "0 18px 8px",
                  }}
                >
                  {isCompactLayout ? (
                    <div
                      style={{
                        width: "100%",
                        display: "grid",
                        gap: 10,
                        padding: "0 4px",
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                          alignItems: "end",
                          justifyItems: "center",
                          gap: 8,
                        }}
                      >
                        {mobileAwardTopRow.map((src, index) => (
                          <img
                            key={`award-mobile-top-${index}`}
                            src={encodePublicAssetPath(src)}
                            alt={`Award badge ${index + 1}`}
                            style={{
                              width: "100%",
                              maxWidth: 124,
                              maxHeight: 88,
                              objectFit: "contain",
                              display: "block",
                              filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.24))",
                            }}
                          />
                        ))}
                      </div>

                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img
                          src={encodePublicAssetPath(awardWinner2026)}
                          alt="Best rated winner badge"
                          style={{
                            width: "auto",
                            height: 112,
                            objectFit: "contain",
                            display: "block",
                            filter: "drop-shadow(0 10px 14px rgba(0,0,0,0.28))",
                          }}
                        />
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                          alignItems: "end",
                          justifyItems: "center",
                          gap: 8,
                        }}
                      >
                        {mobileAwardBottomRow.map((src, index) => (
                          <img
                            key={`award-mobile-bottom-${index}`}
                            src={encodePublicAssetPath(src)}
                            alt={`Award badge ${index + 4}`}
                            style={{
                              width: "100%",
                              maxWidth: 124,
                              maxHeight: 88,
                              objectFit: "contain",
                              display: "block",
                              filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.24))",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    beltAwardImages.map((src, index) => (
                      <img
                        key={`award-belt-${index}`}
                        src={encodePublicAssetPath(src)}
                        alt={`Award badge ${index + 1}`}
                        style={{
                          flex: "0 0 auto",
                          height: src === beltAwardImages[3] ? 162 : 122,
                          width: "auto",
                          objectFit: "contain",
                          display: "block",
                          filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.24))",
                        }}
                      />
                    ))
                  )}
                </div>
              </div>

              <div
                style={{
                  textAlign: "center",
                  width: "min(680px, 92%)",
                  marginTop: isCompactLayout ? 16 : 28,
                }}
              >
                <div
                  style={{
                    marginTop: 8,
                    fontSize: "clamp(2.65rem, 4vw, 4.15rem)",
                    fontWeight: 950,
                    fontFamily: titleFont,
                    textShadow: "0 3px 10px rgba(0,0,0,0.42), 0 10px 26px rgba(0,0,0,0.22)",
                  }}
                >
                  {homeCopy.trustSectionTitle}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              maxWidth: isCompactLayout ? contentMaxWidth : 1280,
              margin: "0 auto",
              width: "100%",
              display: "grid",
              gap: 26,
              padding: isCompactLayout ? "12px 18px 8px" : "18px 0 8px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isCompactLayout ? "1fr" : "minmax(0, 1fr) clamp(280px, 26vw, 360px)",
                gap: isCompactLayout ? 14 : 24,
                width: "100%",
                maxWidth: isCompactLayout ? 720 : 1260,
                margin: isCompactLayout ? "0 auto" : "0 auto 0 0",
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gridTemplateRows: "repeat(2, minmax(0, 1fr))",
                  gap: 12,
                  aspectRatio: isCompactLayout ? "4 / 5" : undefined,
                  height: isCompactLayout ? undefined : "clamp(420px, 42vw, 520px)",
                }}
              >
                {trustIndicators.map((item) => (
                  <div
                    key={item.title}
                    style={{
                      display: "grid",
                      alignContent: "center",
                      justifyItems: "center",
                      gap: 10,
                      padding: isCompactLayout ? "12px 10px" : "16px 12px",
                      minHeight: 0,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        color: "#D6B6D4",
                        opacity: 0.95,
                      }}
                    >
                      {item.icon === "shield-plus" ? (
                        <svg width={isCompactLayout ? 44 : 56} height={isCompactLayout ? 44 : 56} viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M37 7L57 14V31C57 43.5 48.8 55.2 37 60C25.2 55.2 17 43.5 17 31V14L37 7Z" stroke="currentColor" strokeWidth="3.5" />
                          <path d="M37 24V40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                          <path d="M29 32H45" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                        </svg>
                      ) : null}
                      {item.icon === "sparkles" ? (
                        <svg width={isCompactLayout ? 44 : 56} height={isCompactLayout ? 44 : 56} viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24 16L27 25L36 28L27 31L24 40L21 31L12 28L21 25L24 16Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                          <path d="M49 23L51.5 30.5L59 33L51.5 35.5L49 43L46.5 35.5L39 33L46.5 30.5L49 23Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                          <path d="M41 47L43 53L49 55L43 57L41 63L39 57L33 55L39 53L41 47Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                        </svg>
                      ) : null}
                      {item.icon === "mobile" ? (
                        <svg width={isCompactLayout ? 44 : 56} height={isCompactLayout ? 44 : 56} viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="24" y="12" width="26" height="50" rx="6" stroke="currentColor" strokeWidth="3.5" />
                          <path d="M32 20H42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          <circle cx="37" cy="54" r="2.5" stroke="currentColor" strokeWidth="2.5" />
                        </svg>
                      ) : null}
                      {item.icon === "network" ? (
                        <svg width={isCompactLayout ? 44 : 56} height={isCompactLayout ? 44 : 56} viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="26" cy="27" r="6" stroke="currentColor" strokeWidth="3" />
                          <circle cx="48" cy="27" r="6" stroke="currentColor" strokeWidth="3" />
                          <path d="M18 48C18 42.5 22.5 38 28 38H24C29.5 38 34 42.5 34 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          <path d="M40 48C40 42.5 44.5 38 50 38H46C51.5 38 56 42.5 56 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      ) : null}
                    </div>
                    <div style={{ fontSize: "clamp(1.3rem, 1.8vw, 1.85rem)", fontWeight: 950, lineHeight: 1.05, fontFamily: titleFont }}>{item.title}</div>
                    <div style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)", lineHeight: 1.5, opacity: 0.84 }}>{item.subtitle}</div>
                  </div>
                ))}
              </div>
              <div style={{ height: isCompactLayout ? undefined : "clamp(420px, 42vw, 520px)" }}>
                <VerticalEventSwipeCarousel images={aboutVerticalEventImages} isCompactLayout={isCompactLayout} />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "grid",
                gap: 10,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isCompactLayout ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))",
                  gap: 10,
                  width: "100%",
                }}
              >
                {corporateLogoImages.slice(0, isCompactLayout ? 4 : 8).map((logo, index) => (
                  <div
                    key={`home-trusted-logo-${index}`}
                    style={{
                      width: "100%",
                      height: isCompactLayout ? 62 : 74,
                      display: "grid",
                      placeItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={encodePublicAssetPath(logo.src)}
                      alt={`Partner logo ${index + 1}`}
                      style={{
                        width: isCompactLayout ? 112 : 132,
                        height: isCompactLayout ? 42 : 50,
                        maxWidth: "100%",
                        objectFit: "contain",
                        display: "block",
                        transform: `scale(${logo.scale})`,
                        transformOrigin: "center center",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: isCompactLayout ? "18px 0 46px" : "18px 0 64px",
          minHeight: isCompactLayout ? "calc(100vh - 64px)" : "calc(100vh - 72px)",
        }}
      >
        <div
          style={{
            maxWidth: contentMaxWidth,
            margin: "0 auto",
            padding: "0 18px",
            display: "grid",
            gap: isCompactLayout ? 18 : 24,
          }}
        >
          <div
            style={{
              display: "grid",
              gap: 12,
              justifyItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                fontWeight: 950,
                fontFamily: titleFont,
                lineHeight: 0.98,
                maxWidth: 720,
              }}
            >
              {homeCopy.gallerySectionTitle}
            </div>
            <div
              style={{
                maxWidth: 760,
                fontSize: 18,
                lineHeight: 1.65,
                opacity: 0.82,
              }}
            >
              {homeCopy.gallerySectionDescription}
            </div>
          </div>

          <div
            style={{
              width: "100%",
            }}
          >
            <HomeGalleryRotationViewport
              images={allServiceAssetImages.length > 0 ? allServiceAssetImages : homeGalleryImages}
              isCompactLayout={isCompactLayout}
            />
          </div>
        </div>
      </section>
    </PageFrame>
  );
};

export default HomePage;
