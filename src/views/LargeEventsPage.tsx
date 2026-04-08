"use client";

import React, { useCallback, useMemo, useState } from "react";
import { stegaClean } from "@sanity/client/stega";
import { pickCms, pickCmsImageUrl } from "@/lib/sanity/pickCms";
import type {
  SanityLargeEventsClientLogo,
  SanityLargeEventsPageDoc,
  SanityLargeEventsPricingCard,
} from "@/lib/sanity/siteQueries";
import { useRouter } from "next/navigation";
import PageFrame, {
  HoverButton,
  HoneyBookEmbed,
  SectionWrap,
  SmallEventsSection,
  brand,
  canonicalPathBySlug,
  contentMaxWidth,
  servicesHeadingFont,
  titleFont,
  uiFont,
  unifiedDarkButtonHover,
  unifiedHoverTransition,
  useIsCompactLayout,
} from "../components/PageFrame";
import heroBgMain from "../assets/images/hero-bg-main.png";
import heroBgWhite from "../assets/images/hero-bg-white.png";
import largeEventsHeroBackground from "../assets/Event pics_/horizontal/jpeg-optimizer_20241207_164735.webp";
import corporateLogo1 from "../assets/Corporate Logos/001ef16f0c7d49c2b60f4a22bf1ff1a1.png";
import corporateLogo2 from "../assets/Corporate Logos/162-1627127_rec-room-logo-png-transparent-png-removebg-preview.png";
import corporateLogo3 from "../assets/Corporate Logos/channels4_profile-removebg-preview.png";
import corporateLogo4 from "../assets/Corporate Logos/download.png";
import corporateLogo5 from "../assets/Corporate Logos/images-removebg-preview.png";
import corporateLogo6 from "../assets/Corporate Logos/images__1_-removebg-preview.png";
import corporateLogo7 from "../assets/Corporate Logos/Seneca-logo.svg.png";
import corporateLogo8 from "../assets/Corporate Logos/Untitled design (12).png";
import { allEventPicsSorted, serviceAssetEntries } from "../generated/imageManifests";
import { encodePublicAssetPath, type BundledImageSrc } from "../utils/encodePublicAssetPath";

type PricingDisplayCard = {
  name: string;
  price: string;
  subprice: string;
  bestFor: string[];
  includes: string[];
  badge?: string;
  footnote?: string;
  cardPhotoUrl?: string;
  cardPhotoAlt?: string;
};

const pricingCards: PricingDisplayCard[] = [
  {
    name: "1 Artist",
    price: "$500",
    subprice: "2 hours minimum",
    bestFor: ["Small corporate events", "Moderate foot traffic", "Premium brand presence"],
    includes: ["Structured guest flow", "Professional-grade setup", "Great for brand activations"],
    footnote: "Each additional hour: +$100 per hour (per artist).",
  },
  {
    name: "2 Artists",
    price: "$400 / artist",
    subprice: "2 hours minimum",
    badge: "Best Value",
    bestFor: ["Higher volume events", "Busy activations", "Faster throughput"],
    includes: ["Better coverage", "Less wait time", "Ideal for larger guest counts"],
    footnote: "Each additional hour: +$100 per hour (per artist).",
  },
  {
    name: "3+ Artists",
    price: "$400 / artist",
    subprice: "2 hours minimum",
    bestFor: ["Festivals", "Public events", "Large crowds + line management"],
    includes: ["Built for scale", "Multi-artist coordination", "Best for high traffic"],
    footnote: "Each additional hour: +$100 per hour (per artist).",
  },
];

type SpotlightService = {
  serviceName: string;
  folder: string;
  sections: Array<{ heading: string; paragraph: string }>;
};

const largeEventSpotlights: SpotlightService[] = [
  {
    serviceName: "Face Painting",
    folder: "Face Painting",
    sections: [
      {
        heading: "Fast Visual Impact",
        paragraph: "Designed for high-attendance environments while still delivering polished, camera-ready work.",
      },
      {
        heading: "Queue-Aware Flow",
        paragraph: "Menu structure and pacing are tuned to keep lines moving during busy event windows.",
      },
      {
        heading: "Brand-Friendly Presence",
        paragraph: "A clean station setup that blends into premium corporate and public environments.",
      },
    ],
  },
  {
    serviceName: "Body Painting",
    folder: "Body Painting",
    sections: [
      {
        heading: "Campaign-Driven Concepts",
        paragraph: "Built for branded moments, stage visuals, and high-impact activations.",
      },
      {
        heading: "Planned Production Window",
        paragraph: "Session timing is coordinated in advance around event milestones and media moments.",
      },
      {
        heading: "Professional Execution",
        paragraph: "Premium products and disciplined process keep the final look sharp on-site and on camera.",
      },
    ],
  },
  {
    serviceName: "Bling Bar",
    folder: "Bling Bar",
    sections: [
      {
        heading: "High Throughput Sparkle Service",
        paragraph: "Ideal for activations with steady line volume and quick guest turnarounds.",
      },
      {
        heading: "Customizable Palette",
        paragraph: "Colours and gem styles can be tuned to event branding and audience tone.",
      },
      {
        heading: "All-Day Visual Pop",
        paragraph: "A strong fit for events where guests want expressive looks that read well in photos.",
      },
    ],
  },
  {
    serviceName: "Glitter Tattoos",
    folder: "Glitter Tattoos",
    sections: [
      {
        heading: "Water-Resistant Wear",
        paragraph: "Great for all-day events and outdoor activations where durability matters.",
      },
      {
        heading: "Stencil-Led Efficiency",
        paragraph: "Consistent design output that balances quality with queue speed.",
      },
      {
        heading: "Broad Audience Appeal",
        paragraph: "A versatile service that works across ages without heavy setup overhead.",
      },
    ],
  },
  {
    serviceName: "Matte Tattoos",
    folder: "Matte Ink Tattoos",
    sections: [
      {
        heading: "Modern Temporary Ink Look",
        paragraph: "Realistic matte-black finish for guests who want a more editorial style.",
      },
      {
        heading: "Quick Application",
        paragraph: "Designed to keep momentum in medium-to-large event lines.",
      },
      {
        heading: "Strong Activation Add-On",
        paragraph: "Pairs well with face painting or bling services for layered guest experiences.",
      },
    ],
  },
  {
    serviceName: "Balloon Twisting",
    folder: "Balloon Twisting",
    sections: [
      {
        heading: "Family-Centered Crowd Energy",
        paragraph: "A high-visibility station that keeps younger guests engaged and entertained.",
      },
      {
        heading: "Reliable Line Movement",
        paragraph: "Simple design menus support predictable throughput at scale.",
      },
      {
        heading: "Great for Public Events",
        paragraph: "Performs especially well at festivals, community events, and large open venues.",
      },
    ],
  },
];

const corporateGoogleReviews = [
  {
    quote: "On-time, polished, and very easy to coordinate for our larger activation.",
    author: "Corporate Client",
    time: "8 months ago",
  },
  {
    quote: "Fast guest flow, beautiful work, and truly professional communication from start to finish.",
    author: "Event Team Lead",
    time: "9 months ago",
  },
  {
    quote: "Reliable setup and great with crowds. Guests loved the experience all day.",
    author: "Festival Organizer",
    time: "1 year ago",
  },
];

const corporateLogoImages = [
  { src: corporateLogo1 },
  { src: corporateLogo2 },
  { src: corporateLogo3 },
  { src: corporateLogo4 },
  { src: corporateLogo5 },
  { src: corporateLogo6 },
  { src: corporateLogo7 },
  { src: corporateLogo8 },
];

const allEventPics = allEventPicsSorted;

const galleryImagesByFolder = serviceAssetEntries.reduce<Record<string, BundledImageSrc[]>>(
  (acc, { key: filePath, url: imageUrl }) => {
    const folderMatch = filePath.match(/assets\/srevice assets\/([^/]+)\/Assets\//);
    if (!folderMatch) return acc;

    const folderName = folderMatch[1];
    if (!acc[folderName]) acc[folderName] = [];
    acc[folderName].push(imageUrl);
    return acc;
  },
  {}
);

function RotatingCorporateLogoPair({
  logos,
  isCompactLayout,
}: {
  logos: { src: BundledImageSrc }[];
  isCompactLayout: boolean;
}) {
  const [activeLogoStart, setActiveLogoStart] = useState(0);
  const safeLogos = logos.length > 0 ? logos : [{ src: "" as BundledImageSrc }];
  const total = safeLogos.length;

  const goNext = useCallback(() => {
    if (total <= 2) return;
    setActiveLogoStart((currentStart) => (currentStart + 2) % total);
  }, [total]);

  React.useEffect(() => {
    if (total <= 2 || typeof window === "undefined") return;
    const interval = window.setInterval(goNext, 4200);
    return () => window.clearInterval(interval);
  }, [goNext, total]);

  const visible = [safeLogos[activeLogoStart % total], safeLogos[(activeLogoStart + 1) % total]].filter(Boolean) as {
    src: BundledImageSrc;
  }[];

  return (
    <div
      style={{
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.16)",
        background: "rgba(6,12,18,0.45)",
        boxShadow: "0 14px 30px rgba(0,0,0,0.34)",
        backdropFilter: "blur(8px)",
        padding: isCompactLayout ? "16px 16px 14px" : "18px 18px 16px",
        display: "grid",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.72, fontFamily: uiFont }}>Trusted by teams like</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, alignItems: "stretch" }}>
        {visible.map((logo, index) => (
          <div
            key={`hero-logo-${activeLogoStart}-${index}`}
            style={{
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              minHeight: isCompactLayout ? 92 : 110,
              height: isCompactLayout ? 92 : 110,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 14px",
              boxSizing: "border-box",
            }}
          >
            {logo.src ? (
              <img
                src={encodePublicAssetPath(logo.src)}
                alt={`Corporate partner ${index + 1}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            ) : null}
          </div>
        ))}
      </div>

      {logos.length > 2 ? (
        <div style={{ display: "flex", gap: 5 }}>
          {Array.from({ length: Math.ceil(logos.length / 2) }).map((_, index) => (
            <span
              key={`hero-logo-pair-dot-${index}`}
              style={{
                width: index === Math.floor(activeLogoStart / 2) ? 16 : 6,
                height: 6,
                borderRadius: 999,
                background: index === Math.floor(activeLogoStart / 2) ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                transition: "width 0.24s ease, background 0.24s ease",
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MiniGoogleReviews({
  isCompactLayout,
}: {
  isCompactLayout: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: isCompactLayout ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: 14,
          flexDirection: isCompactLayout ? "column" : "row",
        }}
      >
        <div style={{ display: "grid", gap: 2 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.72,
              fontFamily: uiFont,
              color: "rgba(20,20,20,0.82)",
            }}
          >
            Google Reviews
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#111111" }}>5.0</span>
            <span style={{ fontSize: 16, color: "#F9CA24", letterSpacing: "0.08em" }}>★★★★★</span>
            <span style={{ fontSize: 13, opacity: 0.66, color: "rgba(20,20,20,0.74)" }}>(59)</span>
          </div>
        </div>
        <a
          href="https://www.google.com/search?q=Fable+Face+Paint+Google+Reviews"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            borderRadius: 999,
            border: "1px solid rgba(11,11,11,0.18)",
            color: "#111111",
            padding: "8px 12px",
            fontSize: 12,
            fontWeight: 800,
            fontFamily: uiFont,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            background: "#F2F0EE",
          }}
        >
          Review us on Google
        </a>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isCompactLayout ? "1fr" : "repeat(3, minmax(0, 1fr))",
          gap: 12,
        }}
      >
        {corporateGoogleReviews.map((review, index) => (
          <div
            key={`corporate-mini-review-${index}`}
            style={{
              borderRadius: 12,
              border: "1px solid rgba(11,11,11,0.12)",
              background: "#F2F0EE",
              padding: "14px 14px 16px",
              display: "grid",
              gap: 8,
              minHeight: 140,
            }}
          >
            <div style={{ color: "#F9CA24", letterSpacing: "0.08em", fontSize: 13 }}>★★★★★</div>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.45,
                opacity: 0.9,
                color: "#1A1A1A",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {review.quote}
            </div>
            <div style={{ marginTop: "auto", fontSize: 12, opacity: 0.72, color: "rgba(20,20,20,0.74)" }}>
              <span style={{ fontWeight: 800 }}>{review.author}</span> · {review.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getServicePreviewImages(serviceName: string) {
  return galleryImagesByFolder[serviceName] ?? [];
}

function LargeEventsServiceSpotlight({ isCompactLayout }: { isCompactLayout: boolean }) {
  const touchStartXRef = React.useRef<number | null>(null);
  const spotlightItems = useMemo(
    () =>
      largeEventSpotlights.map((service) => {
        const previewImage = getServicePreviewImages(service.folder)[0] ?? allEventPics[0] ?? largeEventsHeroBackground;
        return {
          serviceName: service.serviceName,
          sections: service.sections,
          image: previewImage,
        };
      }),
    []
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const total = spotlightItems.length;
  const safeIndex = total > 0 ? activeIndex % total : 0;
  const activeItem = spotlightItems[safeIndex];

  const goNext = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((currentIndex) => (currentIndex + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((currentIndex) => (currentIndex - 1 + total) % total);
  }, [total]);

  React.useEffect(() => {
    if (typeof window === "undefined" || total <= 1) return;
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % total);
    }, 15000);
    return () => window.clearInterval(interval);
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

  if (!activeItem) return null;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "linear-gradient(165deg, rgba(10,33,28,0.9), rgba(7,20,18,0.95))",
        boxShadow: "0 16px 42px rgba(0,0,0,0.3)",
        color: brand.colors.paper,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: isCompactLayout ? "18px 18px 14px" : "24px 26px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 48, lineHeight: 1.02, fontFamily: servicesHeadingFont }}>{activeItem.serviceName}</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <HoverButton
            onClick={goPrev}
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              color: "#FFFFFF",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              transition: unifiedHoverTransition,
            }}
            hoverStyle={unifiedDarkButtonHover}
            ariaLabel="Previous service"
          >
            ‹
          </HoverButton>
          <HoverButton
            onClick={goNext}
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              color: "#FFFFFF",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              transition: unifiedHoverTransition,
            }}
            hoverStyle={unifiedDarkButtonHover}
            ariaLabel="Next service"
          >
            ›
          </HoverButton>
        </div>
      </div>

      <div
        style={{
          padding: isCompactLayout ? "0 18px 18px" : "0 26px 26px",
          display: "grid",
          gridTemplateColumns: isCompactLayout ? "1fr" : "1.25fr 1fr",
          gap: 20,
          alignItems: "start",
        }}
      >
        <div style={{ display: "grid", gap: 16 }}>
          {activeItem.sections.map((section, index) => (
            <div key={`${activeItem.serviceName}-${section.heading}-${index}`} style={{ display: "grid", gap: 10 }}>
              <div style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.45rem)", lineHeight: 1.1, fontFamily: uiFont }}>{section.heading}</div>
              <div style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.03rem)", lineHeight: 1.6, opacity: 0.9 }}>{section.paragraph}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.16)",
            overflow: "hidden",
            height: isCompactLayout ? 220 : 260,
            background: "rgba(255,255,255,0.08)",
          }}
        >
          <img
            src={encodePublicAssetPath(activeItem.image)}
            alt={`${activeItem.serviceName} preview`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>

      <div style={{ padding: isCompactLayout ? "0 14px 14px" : "0 20px 16px", display: "flex", gap: 6, flexWrap: "wrap" }}>
        {spotlightItems.map((item, index) => {
          const active = index === safeIndex;
          return (
            <button
              key={item.serviceName}
              type="button"
              onClick={() => setActiveIndex(index)}
              style={{
                cursor: "pointer",
                border: active ? "1px solid rgba(211,74,168,0.82)" : "1px solid rgba(255,255,255,0.22)",
                background: active ? "rgba(211,74,168,0.20)" : "rgba(255,255,255,0.06)",
                color: "#FFFFFF",
                borderRadius: 999,
                padding: "6px 10px",
                fontSize: 12,
                fontFamily: uiFont,
                transition: unifiedHoverTransition,
              }}
            >
              {item.serviceName}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type LargeEventsPageProps = {
  sanityLargeEvents?: SanityLargeEventsPageDoc | null;
};

const LargeEventsPage: React.FC<LargeEventsPageProps> = ({ sanityLargeEvents = null }) => {
  const router = useRouter();
  const isCompactLayout = useIsCompactLayout();

  const heroPartnerLogos = useMemo(() => {
    const cms = sanityLargeEvents?.clientLogos;
    const fromCms =
      cms
        ?.map((img: SanityLargeEventsClientLogo | null | undefined) => img?.asset?.url)
        .filter((u: string | null | undefined): u is string => typeof u === "string" && u.trim().length > 0)
        .map((url: string) => ({ src: url })) ?? [];
    if (fromCms.length >= 2) return fromCms;
    return corporateLogoImages;
  }, [sanityLargeEvents]);

  const heroEyebrow = pickCms(sanityLargeEvents?.eyebrow, "Large Events");
  const heroTitle = pickCms(sanityLargeEvents?.pageTitle, "Built for scale, speed, and high guest volume.");
  const heroIntro = pickCms(
    sanityLargeEvents?.intro,
    "Best for corporate events, festivals, and public activations where flow matters and multi-artist support may be needed.",
  );

  const displayPricingCards = useMemo((): PricingDisplayCard[] => {
    const cms = sanityLargeEvents?.pricingCards;
    if (!cms?.length) return pricingCards;
    return cms.map((card: SanityLargeEventsPricingCard | null, index: number) => {
      const fallback = pricingCards[index] ?? pricingCards[0];
      const cmsBest = (card?.bestFor ?? []).filter((b: unknown): b is string => typeof b === "string");
      const cmsInc = (card?.includes ?? []).filter((b: unknown): b is string => typeof b === "string");
      const photoUrl = card?.cardPhoto?.asset?.url;
      const trimmedPhoto = typeof photoUrl === "string" ? photoUrl.trim() : "";
      return {
        name: pickCms(card?.packageName, fallback.name),
        price: pickCms(card?.price, fallback.price),
        subprice: pickCms(card?.subprice, fallback.subprice),
        bestFor: cmsBest.some((b: string) => stegaClean(b).trim().length > 0) ? cmsBest : fallback.bestFor,
        includes: cmsInc.some((b: string) => stegaClean(b).trim().length > 0) ? cmsInc : fallback.includes,
        badge: pickCms(card?.badge, fallback.badge ?? ""),
        footnote: pickCms(card?.footnote, fallback.footnote ?? ""),
        cardPhotoUrl: trimmedPhoto.length > 0 ? trimmedPhoto : undefined,
        cardPhotoAlt: typeof card?.cardPhoto?.alt === "string" ? card.cardPhoto.alt : "",
      };
    });
  }, [sanityLargeEvents]);

  const eventProofPool = useMemo(
    () => (allEventPics.length > 0 ? allEventPics : [largeEventsHeroBackground]),
    []
  );
  const moodImages = useMemo(
    () => Array.from({ length: 8 }, (_, index) => eventProofPool[index % eventProofPool.length]),
    [eventProofPool]
  );

  const heroBg = pickCmsImageUrl(sanityLargeEvents?.heroBackground?.asset?.url, largeEventsHeroBackground);
  const packagesSectionBg = pickCmsImageUrl(sanityLargeEvents?.packagesSectionBackground?.asset?.url, heroBgMain);
  const testimonialsSectionBg = pickCmsImageUrl(sanityLargeEvents?.testimonialsSectionBackground?.asset?.url, heroBgWhite);
  const packagesIntro = pickCms(
    sanityLargeEvents?.packagesSectionIntro,
    "Placeholder paragraph: add a short description of corporate package options and recommended artist coverage."
  );
  const testimonialsIntro = pickCms(
    sanityLargeEvents?.testimonialsSectionIntro,
    "Placeholder paragraph: add one line about reliability, execution quality, and planner confidence."
  );

  return (
    <PageFrame pageSlug="corporate">
      <div style={{ maxWidth: contentMaxWidth, margin: "0 auto", padding: "0 18px 26px" }}>
        <div style={{ display: "grid", gap: 0 }}>
          <div
            style={{
              position: "relative",
              width: "100vw",
              marginLeft: "calc(50% - 50vw)",
              marginRight: "calc(50% - 50vw)",
              marginTop: 0,
              borderRadius: 0,
              overflow: "hidden",
              minHeight: isCompactLayout ? "min(70vh, 560px)" : "min(76vh, 740px)",
              backgroundImage: `linear-gradient(105deg, rgba(6,10,14,0.78) 0%, rgba(6,10,14,0.58) 44%, rgba(6,10,14,0.74) 100%), url("${encodePublicAssetPath(heroBg)}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "grid",
              alignItems: "start",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: contentMaxWidth,
                margin: "0 auto",
                padding: isCompactLayout ? "36px 22px 34px" : "54px clamp(28px, 8vw, 148px) 44px",
                minHeight: isCompactLayout ? "min(70vh, 560px)" : "min(76vh, 740px)",
                display: "grid",
                gridTemplateColumns: isCompactLayout ? "1fr" : "minmax(0, 1.06fr) minmax(320px, 0.72fr)",
                alignItems: "stretch",
                gap: isCompactLayout ? 28 : 36,
              }}
            >
              <div style={{ display: "grid", gap: 22, alignContent: "start", justifyItems: "start" }}>
                <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.75, fontFamily: uiFont }}>{heroEyebrow}</div>
                <div style={{ fontSize: "clamp(2.2rem, 4.2vw, 4.5rem)", lineHeight: 0.98, fontWeight: 950, fontFamily: titleFont, maxWidth: 860 }}>
                  {heroTitle}
                </div>
                <div style={{ fontSize: "clamp(1rem, 1.28vw, 1.2rem)", lineHeight: 1.6, color: "rgba(242,247,252,0.92)", maxWidth: 860 }}>
                  {heroIntro}
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  maxWidth: isCompactLayout ? "100%" : 430,
                  justifySelf: isCompactLayout ? "stretch" : "end",
                  alignSelf: isCompactLayout ? "start" : "end",
                  marginTop: isCompactLayout ? 8 : 190,
                }}
              >
                <RotatingCorporateLogoPair logos={heroPartnerLogos} isCompactLayout={isCompactLayout} />
              </div>
            </div>
          </div>

          <SmallEventsSection
            backgroundImage={encodePublicAssetPath(packagesSectionBg)}
            padding={isCompactLayout ? "24px 18px" : "34px 18px"}
            disableWhiteOverlay
          >
            <div style={{ display: "grid", gap: 32 }}>
              <div style={{ display: "grid", gap: 10, justifyItems: "center" }}>
                <div
                  style={{
                    fontSize: "clamp(2rem, 3.2vw, 3.2rem)",
                    lineHeight: 1.02,
                    fontWeight: 950,
                    fontFamily: titleFont,
                    textAlign: "center",
                    color: "#FFFFFF",
                    textShadow: "0 3px 10px rgba(0,0,0,0.42), 0 10px 26px rgba(0,0,0,0.22)",
                  }}
                >
                  Packages
                </div>
                <div
                  style={{
                    maxWidth: 760,
                    textAlign: "center",
                    fontSize: "clamp(0.98rem, 1.2vw, 1.1rem)",
                    lineHeight: 1.6,
                    color: "rgba(242,247,252,0.9)",
                    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  {packagesIntro}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: isCompactLayout ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 28, alignItems: "stretch" }}>
                {displayPricingCards.map((card, index) => {
                  const featured = Boolean(card.badge);
                  const cardVisualImage = moodImages[(index + 2) % moodImages.length];
                  const cardTopImage = card.cardPhotoUrl ?? cardVisualImage;
                  const cardTopAlt =
                    card.cardPhotoUrl && stegaClean(card.cardPhotoAlt ?? "").trim().length > 0 ?
                      pickCms(card.cardPhotoAlt, `${card.name} package`)
                    : `${card.name} event preview`;
                  return (
                    <div
                      key={card.name}
                      data-native-cursor="true"
                      style={{
                        position: "relative",
                        display: "grid",
                        gap: 22,
                        minHeight: 0,
                        padding: "28px 22px 22px",
                        borderRadius: 24,
                        background: "#F2F0EE",
                        color: brand.colors.ink,
                        border: featured ? "1px solid rgba(211,74,168,0.65)" : "1px solid rgba(11,11,11,0.10)",
                        boxShadow: featured
                          ? "0 20px 48px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(211,74,168,0.18)"
                          : "0 18px 44px rgba(0,0,0,0.14)",
                      }}
                    >
                      {card.badge ? (
                        <div
                          style={{
                            position: "absolute",
                            top: -12,
                            left: "50%",
                            transform: "translateX(-50%)",
                            padding: "6px 18px",
                            borderRadius: 999,
                            background: "rgba(147, 28, 98, 0.24)",
                            border: "1px solid rgba(211,74,168,0.65)",
                            fontSize: 10,
                            fontWeight: 900,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                          }}
                        >
                          {card.badge}
                        </div>
                      ) : null}

                      <div
                        style={{
                          position: "relative",
                          borderRadius: 16,
                          overflow: "hidden",
                          border: "1px solid rgba(255,255,255,0.14)",
                          height: 116,
                        }}
                      >
                        <img
                          src={encodePublicAssetPath(cardTopImage)}
                          alt={cardTopAlt}
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
                            inset: 0,
                            background: "linear-gradient(to top, rgba(5,9,12,0.62), rgba(5,9,12,0.12))",
                            display: "flex",
                            alignItems: "flex-end",
                            padding: "8px 10px",
                          }}
                        >
                          <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: uiFont, opacity: 0.9 }}>
                            Activation-ready
                          </span>
                        </div>
                      </div>

                      <div style={{ display: "grid", gap: 10 }}>
                        <div style={{ fontSize: 16, fontWeight: 900 }}>{card.name}</div>
                        <div style={{ fontSize: featured ? "clamp(2.9rem, 3.8vw, 4rem)" : "clamp(2.6rem, 3.5vw, 3.6rem)", fontWeight: 950, lineHeight: 0.98 }}>
                          {card.price}
                        </div>
                        <div style={{ fontSize: 14, opacity: 0.64 }}>{card.subprice}</div>
                      </div>

                      <div style={{ display: "grid", gap: 14 }}>
                        <div style={{ fontSize: 16, fontWeight: 900 }}>Best for</div>
                        <div style={{ display: "grid", gap: 10 }}>
                          {card.bestFor.map((item) => (
                            <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.4, opacity: 0.82 }}>
                              <span style={{ opacity: 0.5 }}>●</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: "grid", gap: 14 }}>
                        <div style={{ fontSize: 16, fontWeight: 900 }}>Includes</div>
                        <div style={{ display: "grid", gap: 12 }}>
                          {card.includes.map((item) => (
                            <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.4, opacity: 0.86 }}>
                              <span
                                style={{
                                  width: 26,
                                  height: 26,
                                  flexShrink: 0,
                                  display: "grid",
                                  placeItems: "center",
                                  borderRadius: 999,
                                  border: "1px solid rgba(11,11,11,0.16)",
                                  color: brand.colors.ink,
                                  fontSize: 15,
                                  lineHeight: 1,
                                }}
                              >
                                ✓
                              </span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginTop: "auto", display: "grid", gap: 18 }}>
                        {card.footnote ? <div style={{ fontSize: 13, lineHeight: 1.45, opacity: 0.62 }}>{card.footnote}</div> : null}
                        <HoverButton
                          onClick={() => router.push(canonicalPathBySlug.contact)}
                          style={{
                            width: "100%",
                            borderRadius: 18,
                            padding: "16px 18px",
                            border: featured ? "none" : "1px solid rgba(11,11,11,0.14)",
                            background: featured ? "#A7E4C4" : "#10261E",
                            color: featured ? "#0B231A" : "#FFFFFF",
                            fontSize: 16,
                            fontWeight: 900,
                            transition: unifiedHoverTransition,
                            cursor: "pointer",
                          }}
                          hoverStyle={
                            featured
                              ? {
                                  transform: "translateY(-1px)",
                                  background: "#9A0E63",
                                  boxShadow: "0 18px 36px rgba(154,14,99,0.24)",
                                  color: "#FFFFFF",
                                }
                              : unifiedDarkButtonHover
                          }
                        >
                          Request {card.name}
                        </HoverButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </SmallEventsSection>

          <SmallEventsSection backgroundImage={encodePublicAssetPath(testimonialsSectionBg)} padding={isCompactLayout ? "22px 18px 30px" : "30px 18px 40px"}>
            <div style={{ display: "grid", gap: 30 }}>
              <div style={{ display: "grid", gap: 18 }}>
                <div style={{ display: "grid", gap: 10, justifyItems: "center" }}>
                  <div
                    style={{
                      fontSize: "clamp(1.85rem, 3vw, 3rem)",
                      lineHeight: 1.04,
                      fontWeight: 950,
                      fontFamily: titleFont,
                      textAlign: "center",
                      color: "#1A1A1A",
                      textShadow: "none",
                    }}
                  >
                    Client Reviews
                  </div>
                  <div
                    style={{
                      maxWidth: 760,
                      textAlign: "center",
                      fontSize: "clamp(0.98rem, 1.2vw, 1.08rem)",
                      lineHeight: 1.6,
                      color: "rgba(24,24,24,0.86)",
                      textShadow: "none",
                    }}
                  >
                    {testimonialsIntro}
                  </div>
                </div>
                <MiniGoogleReviews isCompactLayout={isCompactLayout} />
              </div>

              <div style={{ display: "grid", gap: 18 }}>
                <div
                  style={{
                    fontSize: "clamp(1.85rem, 3vw, 3rem)",
                    lineHeight: 1.04,
                    fontWeight: 950,
                    fontFamily: titleFont,
                    textAlign: "center",
                    color: "#1A1A1A",
                    textShadow: "none",
                  }}
                >
                  Service Spotlight
                </div>
                <LargeEventsServiceSpotlight isCompactLayout={isCompactLayout} />
              </div>
            </div>
          </SmallEventsSection>
        </div>
      </div>

      <SectionWrap title="Corporate Inquiry" subtitle="Routes into HoneyBook (separate funnels).">
        <HoneyBookEmbed kind="corporate" embedId="HB_CORPORATE_FORM_ID" tag="corporate" />
      </SectionWrap>
    </PageFrame>
  );
};

export default LargeEventsPage;
