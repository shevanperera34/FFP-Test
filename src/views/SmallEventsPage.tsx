"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { stegaClean } from "@sanity/client/stega";
import { pickCms, pickCmsImageUrl } from "@/lib/sanity/pickCms";
import type { SmallEventsVisualAttrs } from "@/lib/sanity/smallEventsVisualAttrs";
import type { SanitySmallEventsPageDoc, SanitySmallEventsPricingCard } from "@/lib/sanity/siteQueries";
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
  unifiedTextButtonHover,
  useIsCompactLayout,
} from "../components/PageFrame";
import heroBg2 from "../assets/images/hero-bg2.png";
import heroBgPink from "../assets/images/hero-bg-pink.png";
import smallEventsHeroBackground from "../assets/Event pics_/horizontal/jpeg-optimizer_Business+Suite_creation_545982634821784.webp";
import { eventPicHorizontalUrls, serviceAssetEntries } from "../generated/imageManifests";
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
    name: "1 Hour",
    price: "$175",
    subprice: "flat rate",
    bestFor: ["Quick parties", "Smaller guest lists", "A premium add-on moment"],
    includes: ["Face painting + event art vibe", "Clean, professional setup", "Perfect for birthdays"],
  },
  {
    name: "2 Hours",
    price: "$250",
    subprice: "($125/hr)",
    badge: "Most Popular",
    bestFor: ["Most birthdays", "More guests", "More flexibility for designs"],
    includes: ["Better guest coverage", "More time for detail", "Balanced flow"],
  },
  {
    name: "3+ Hours",
    price: "$125/hr",
    subprice: "after 1st hour",
    bestFor: ["Bigger private events", "Longer bookings", "More guests without rushing"],
    includes: ["Ideal for full-event coverage", "More time for variety", "Great for mixed ages"],
  },
];

type SpotlightService = {
  serviceName: string;
  folder: string;
  sections: Array<{ heading: string; paragraph: string }>;
};

const smallEventSpotlights: SpotlightService[] = [
  {
    serviceName: "Face Painting",
    folder: "Face Painting",
    sections: [
      {
        heading: "A Clean & Professional Setup",
        paragraph:
          "Everything is sanitized between guests, and only high-quality, skin-safe paints are used. The setup is neat and inviting, adding to the magic of your event.",
      },
      {
        heading: "Beautiful Designs in 5 minutes",
        paragraph:
          "From adorable animals to intricate fantasy designs, each painting is customized to bring out your guests’ personalities. Whether playful or elegant, there’s something for everyone.",
      },
      {
        heading: "Smiling Ear-to-Ear",
        paragraph:
          "Quick enough to keep the line moving, yet detailed enough to wow your guests. Each face comes to life in just minutes so everyone can enjoy the event.",
      },
    ],
  },
  {
    serviceName: "Bling Bar",
    folder: "Bling Bar",
    sections: [
      {
        heading: "A Beautiful Range of Colours to Choose From",
        paragraph:
          "Guests can pick from a wide selection of glitter shades or pre-designed gem arrangements to suit their style and personality.",
      },
      {
        heading: "Sparkle and Shine for Every Guest",
        paragraph:
          "The bling bar adds a magical touch with dazzling glitter and face gems for guests who want an eye-catching look.",
      },
      {
        heading: "Fast & Fun for All Ages",
        paragraph: "Serving up to 30 guests per hour, the bling bar keeps the line moving while still feeling premium.",
      },
    ],
  },
  {
    serviceName: "Glitter Tattoos",
    folder: "Glitter Tattoos",
    sections: [
      {
        heading: "Longer Wear Than Face Paint",
        paragraph: "Glitter tattoos are applied with skin-safe adhesive and cosmetic-grade glitter for strong visual pop.",
      },
      {
        heading: "Great for Outdoor Event Days",
        paragraph: "This service performs well in festival and outdoor settings where guests want lower-touch maintenance.",
      },
      {
        heading: "Clean, Quick Application",
        paragraph: "Stencil-led designs allow reliable throughput while keeping a polished finish.",
      },
    ],
  },
  {
    serviceName: "Balloon Twisting",
    folder: "Balloon Twisting",
    sections: [
      {
        heading: "Interactive Fun That Keeps Guests Engaged",
        paragraph:
          "Balloon twisting brings playful energy with creations like animals, swords, and flowers that guests can take away.",
      },
      {
        heading: "Colours are Personally Picked",
        paragraph:
          "Each balloon design is built quickly and customized to keep the event atmosphere fun and personal.",
      },
      {
        heading: "Quick and Fun for Larger Crowds",
        paragraph: "Serving up to 15 guests per hour, this is a reliable add-on for active party environments.",
      },
    ],
  },
  {
    serviceName: "Matte Tattoos",
    folder: "Matte Ink Tattoos",
    sections: [
      {
        heading: "A Wide Range of Sizes and Designs",
        paragraph:
          "From minimalist symbols to intricate patterns, there’s something for every age and vibe at your event.",
      },
      {
        heading: "Realistic, Temporary Tattoos",
        paragraph: "With a sleek black finish, these tattoos create a real-ink look without long-term commitment.",
      },
      {
        heading: "Waterproof & Easy to Remove",
        paragraph: "They can last for days and remove easily with rubbing alcohol or oil when guests are ready.",
      },
    ],
  },
];

const birthdayGoogleReviews = [
  {
    quote: "Milena is truly wonderful and efficient. Her work is amazing and I will continue to use her.",
    author: "Stina Baby",
    time: "10 months ago",
  },
  {
    quote: "Hired her for my son's 6th birthday party. She is punctual, professional, and incredibly talented.",
    author: "Anastasia Shvets",
    time: "10 months ago",
  },
  {
    quote: "Wonderful service and super cute face painting designs. Milena made the event feel easy.",
    author: "Jessica F",
    time: "11 months ago",
  },
];

const horizontalEventImages = eventPicHorizontalUrls;

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

function RotatingGoogleReviewCard({
  reviews,
  isCompactLayout,
}: {
  reviews: { quote: string; author: string; time: string }[];
  isCompactLayout: boolean;
}) {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const total = reviews.length;
  const activeReview = reviews[activeReviewIndex % total];

  const goToReview = useCallback(
    (index: number) => {
      if (index < 0 || index >= total) return;
      setActiveReviewIndex(index);
    },
    [total]
  );

  if (!activeReview) return null;

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
      <div style={{ display: "grid", gap: 6 }}>
        <div style={{ fontSize: "clamp(2.6rem, 5vw, 4.1rem)", lineHeight: 0.92, fontWeight: 950, fontFamily: titleFont }}>Google Reviews</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 62, lineHeight: 0.9, fontWeight: 900 }}>5.0</span>
          <span style={{ fontSize: 58, letterSpacing: "0.08em", color: "#F9CA24", lineHeight: 0.84 }}>★★★★★</span>
          <span style={{ fontSize: 44, opacity: 0.78, lineHeight: 0.9 }}>(59)</span>
        </div>
      </div>

      <div style={{ fontSize: "clamp(1rem, 1.25vw, 1.12rem)", lineHeight: 1.55, minHeight: 74 }}>{activeReview.quote}</div>

      <div style={{ display: "grid", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ fontSize: 24, fontFamily: titleFont }}>{activeReview.author}</div>
          <div style={{ fontSize: 16, opacity: 0.72 }}>{activeReview.time}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {reviews.map((_, index) => (
              <button
                key={`birthday-hero-review-dot-${index}`}
                type="button"
                onClick={() => goToReview(index)}
                style={{
                  width: index === activeReviewIndex ? 22 : 7,
                  height: 7,
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  background: index === activeReviewIndex ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.45)",
                  transition: "width 0.2s ease, background 0.2s ease",
                }}
              />
            ))}
          </div>

          <a
            href="https://www.google.com/search?q=Fable+Face+Paint+Google+Reviews"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.22)",
              color: "#FFFFFF",
              padding: "8px 12px",
              fontSize: 14,
              fontWeight: 800,
              fontFamily: uiFont,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}

function EventHighlightsGallery({
  images,
  isCompactLayout,
}: {
  images: BundledImageSrc[];
  isCompactLayout: boolean;
}) {
  const touchStartXRef = useRef<number | null>(null);
  const galleryImages = images;
  const total = galleryImages.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((currentIndex) => (currentIndex + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((currentIndex) => (currentIndex - 1 + total) % total);
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
  };

  if (!galleryImages[activeIndex]) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        padding: isCompactLayout ? "0 18px" : "0 28px",
      }}
    >
      <div
        data-native-cursor="true"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "relative",
          width: "100%",
          height: isCompactLayout ? "min(64vh, 500px)" : "min(74vh, 620px)",
          minHeight: isCompactLayout ? 360 : 460,
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.24)",
          boxShadow: "0 14px 28px rgba(0,0,0,0.22)",
          outline: "none",
        }}
        aria-label="Event highlights gallery"
      >
        <img
          src={encodePublicAssetPath(galleryImages[activeIndex]!)}
          alt={`Event highlight ${activeIndex + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "linear-gradient(180deg, rgba(7,14,18,0.08) 0%, rgba(7,14,18,0.22) 100%)",
          }}
        />

        {total > 1 ? (
          <div
            aria-label="Event highlight position"
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
            {galleryImages.map((_, index) => (
              <span
                key={`event-highlight-dot-${index}`}
                style={{
                  width: index === activeIndex ? 18 : 6,
                  height: 6,
                  borderRadius: 999,
                  background: index === activeIndex ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.52)",
                  transition: "width 0.2s ease, background 0.2s ease",
                }}
              />
            ))}
          </div>
        ) : null}
      </div>

      {total > 1 ? (
        <>
          <HoverButton
            onClick={goPrev}
            ariaLabel="Previous event highlight"
            style={{
              position: "absolute",
              left: isCompactLayout ? -4 : -8,
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              color: "#FFFFFF",
              fontSize: isCompactLayout ? 36 : 44,
              lineHeight: 1,
              cursor: "pointer",
              padding: 0,
              transition: "transform 0.22s ease, color 0.22s ease, text-shadow 0.22s ease",
              textShadow: "0 4px 12px rgba(0,0,0,0.55)",
            }}
            hoverStyle={{
              transform: "translateY(-50%) scale(1.08)",
              color: "#F2B4DD",
              textShadow: "0 6px 16px rgba(0,0,0,0.62)",
            }}
          >
            ‹
          </HoverButton>
          <HoverButton
            onClick={goNext}
            ariaLabel="Next event highlight"
            style={{
              position: "absolute",
              right: isCompactLayout ? -4 : -8,
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              color: "#FFFFFF",
              fontSize: isCompactLayout ? 36 : 44,
              lineHeight: 1,
              cursor: "pointer",
              padding: 0,
              transition: "transform 0.22s ease, color 0.22s ease, text-shadow 0.22s ease",
              textShadow: "0 4px 12px rgba(0,0,0,0.55)",
            }}
            hoverStyle={{
              transform: "translateY(-50%) scale(1.08)",
              color: "#F2B4DD",
              textShadow: "0 6px 16px rgba(0,0,0,0.62)",
            }}
          >
            ›
          </HoverButton>
        </>
      ) : null}
    </div>
  );
}

function getServicePreviewImages(serviceName: string) {
  return galleryImagesByFolder[serviceName] ?? [];
}

function SmallEventsServiceSpotlight({ isCompactLayout }: { isCompactLayout: boolean }) {
  const touchStartXRef = useRef<number | null>(null);
  const spotlightItems = useMemo(
    () =>
      smallEventSpotlights.map((service) => {
        const previewImage = getServicePreviewImages(service.folder)[0] ?? horizontalEventImages[0] ?? smallEventsHeroBackground;
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
        border: "1px solid rgba(11,11,11,0.14)",
        background: "#F2F0EE",
        boxShadow: "0 16px 42px rgba(0,0,0,0.18)",
        color: brand.colors.ink,
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
              border: "1px solid rgba(11,11,11,0.18)",
              background: "rgba(255,255,255,0.66)",
              color: brand.colors.ink,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              transition: unifiedHoverTransition,
            }}
            hoverStyle={unifiedTextButtonHover}
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
              border: "1px solid rgba(11,11,11,0.18)",
              background: "rgba(255,255,255,0.66)",
              color: brand.colors.ink,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              transition: unifiedHoverTransition,
            }}
            hoverStyle={unifiedTextButtonHover}
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
              <div style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.03rem)", lineHeight: 1.6, opacity: 0.8 }}>{section.paragraph}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            borderRadius: 16,
            border: "1px solid rgba(11,11,11,0.12)",
            overflow: "hidden",
            height: isCompactLayout ? 220 : 260,
            background: "rgba(11,11,11,0.06)",
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
                border: active ? "1px solid rgba(211,74,168,0.82)" : "1px solid rgba(11,11,11,0.16)",
                background: active ? "rgba(211,74,168,0.20)" : "rgba(255,255,255,0.72)",
                color: brand.colors.ink,
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

type SmallEventsPageProps = {
  sanitySmallEvents?: SanitySmallEventsPageDoc | null;
  smallEventsVisualAttrs?: SmallEventsVisualAttrs;
};

const SmallEventsPage: React.FC<SmallEventsPageProps> = ({
  sanitySmallEvents = null,
  smallEventsVisualAttrs = {},
}) => {
  const router = useRouter();
  const isCompactLayout = useIsCompactLayout();

  const heroEyebrow = pickCms(sanitySmallEvents?.eyebrow, "Small Events");
  const heroTitle = pickCms(sanitySmallEvents?.pageTitle, "Private celebrations, made premium.");
  const heroIntro = pickCms(
    sanitySmallEvents?.intro,
    "This setup is designed for birthdays and intimate celebrations where guests want detailed art and the event host wants a smooth, stress-free experience.",
  );

  const displayPricingCards = useMemo((): PricingDisplayCard[] => {
    const cms = sanitySmallEvents?.pricingCards;
    if (!cms?.length) return pricingCards;
    return cms.map((card: SanitySmallEventsPricingCard | null, index: number) => {
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
  }, [sanitySmallEvents]);

  const eventProofPool = useMemo(
    () => (horizontalEventImages.length > 0 ? horizontalEventImages : [smallEventsHeroBackground]),
    []
  );
  const moodImages = useMemo(
    () => Array.from({ length: 8 }, (_, index) => eventProofPool[index % eventProofPool.length]),
    [eventProofPool]
  );

  const heroBg = pickCmsImageUrl(sanitySmallEvents?.heroBackground?.asset?.url, smallEventsHeroBackground);
  const packagesSectionBg = pickCmsImageUrl(sanitySmallEvents?.packagesSectionBackground?.asset?.url, heroBg2);
  const highlightsSectionBg = pickCmsImageUrl(sanitySmallEvents?.highlightsSectionBackground?.asset?.url, heroBgPink);
  const spotlightSectionBg = pickCmsImageUrl(sanitySmallEvents?.spotlightSectionBackground?.asset?.url, heroBg2);
  const packagesIntro = pickCms(
    sanitySmallEvents?.packagesSectionIntro,
    "Placeholder paragraph: add a short description of what is included in each package and how clients should choose."
  );
  const highlightsIntro = pickCms(
    sanitySmallEvents?.highlightsSectionIntro,
    "Placeholder paragraph: share a quick sentence about featured moments from recent events."
  );
  const spotlightIntroRaw = sanitySmallEvents?.spotlightSectionIntro;
  const spotlightIntro =
    typeof spotlightIntroRaw === "string" && stegaClean(spotlightIntroRaw).trim().length > 0 ? spotlightIntroRaw : null;

  return (
    <PageFrame pageSlug="birthdays">
      <div style={{ maxWidth: contentMaxWidth, margin: "0 auto", padding: "0 18px 26px" }}>
        <div style={{ display: "grid", gap: 0 }}>
          <div
            style={{
              position: "relative",
              width: "100vw",
              marginLeft: "calc(50% - 50vw)",
              marginRight: "calc(50% - 50vw)",
              borderRadius: 0,
              overflow: "hidden",
              minHeight: isCompactLayout ? "min(72vh, 560px)" : "min(78vh, 760px)",
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
                padding: isCompactLayout ? "36px 22px 34px" : "52px clamp(28px, 6vw, 120px) 42px",
                minHeight: isCompactLayout ? "min(72vh, 560px)" : "min(78vh, 760px)",
                display: "grid",
                gridTemplateColumns: isCompactLayout ? "1fr" : "minmax(0, 1.06fr) minmax(320px, 0.72fr)",
                alignItems: "stretch",
                gap: isCompactLayout ? 28 : 36,
              }}
            >
              <div style={{ display: "grid", gap: 22, alignContent: "start", justifyItems: "start" }}>
                <div
                  style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.75, fontFamily: uiFont }}
                  data-sanity={smallEventsVisualAttrs.eyebrow}
                >
                  {heroEyebrow}
                </div>
                <div
                  style={{ fontSize: "clamp(2.2rem, 4.2vw, 4.5rem)", lineHeight: 0.98, fontWeight: 950, fontFamily: titleFont, maxWidth: 760 }}
                  data-sanity={smallEventsVisualAttrs.pageTitle}
                >
                  {heroTitle}
                </div>
                <div
                  style={{ fontSize: "clamp(1rem, 1.28vw, 1.2rem)", lineHeight: 1.6, color: "rgba(242,247,252,0.92)", maxWidth: 720 }}
                  data-sanity={smallEventsVisualAttrs.intro}
                >
                  {heroIntro}
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  maxWidth: isCompactLayout ? "100%" : 400,
                  justifySelf: isCompactLayout ? "stretch" : "end",
                  alignSelf: isCompactLayout ? "start" : "end",
                  marginTop: isCompactLayout ? 8 : 210,
                }}
              >
                <RotatingGoogleReviewCard reviews={birthdayGoogleReviews} isCompactLayout={isCompactLayout} />
              </div>
            </div>
          </div>

          <SmallEventsSection
            backgroundImage={encodePublicAssetPath(packagesSectionBg)}
            padding={isCompactLayout ? "24px 18px" : "34px 18px"}
            disableWhiteOverlay
          >
            <div style={{ display: "grid", gap: 46 }}>
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
              <div
                style={{ display: "grid", gridTemplateColumns: isCompactLayout ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 28, alignItems: "stretch" }}
                data-sanity={smallEventsVisualAttrs.pricingCards}
              >
                {displayPricingCards.map((card, index) => {
                  const featured = Boolean(card.badge);
                  const cardVisualImage = moodImages[index % moodImages.length];
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
                            Celebration-ready
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
                          Select {card.name}
                        </HoverButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </SmallEventsSection>

          <SmallEventsSection backgroundImage={encodePublicAssetPath(highlightsSectionBg)} padding={isCompactLayout ? "22px 18px" : "30px 18px"}>
            <div style={{ display: "grid", gap: 20 }}>
              <div style={{ display: "grid", gap: 10, justifyItems: "center" }}>
                <div
                  style={{
                    fontSize: "clamp(1.85rem, 3vw, 3rem)",
                    lineHeight: 1.04,
                    fontWeight: 950,
                    fontFamily: titleFont,
                    textAlign: "center",
                    color: "#FFFFFF",
                    textShadow: "0 3px 10px rgba(0,0,0,0.42), 0 10px 26px rgba(0,0,0,0.22)",
                  }}
                >
                  Event Highlights
                </div>
                <div
                  style={{
                    maxWidth: 760,
                    textAlign: "center",
                    fontSize: "clamp(0.98rem, 1.2vw, 1.08rem)",
                    lineHeight: 1.6,
                    color: "rgba(242,247,252,0.9)",
                    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  {highlightsIntro}
                </div>
              </div>
              <EventHighlightsGallery images={horizontalEventImages} isCompactLayout={isCompactLayout} />
            </div>
          </SmallEventsSection>

          <SmallEventsSection backgroundImage={encodePublicAssetPath(spotlightSectionBg)} padding={isCompactLayout ? "22px 18px 30px" : "30px 18px 40px"}>
            <div style={{ display: "grid", gap: 20 }}>
              <div
                style={{
                  fontSize: "clamp(1.85rem, 3vw, 3rem)",
                  lineHeight: 1.04,
                  fontWeight: 950,
                  fontFamily: titleFont,
                  textAlign: "center",
                  color: "#FFFFFF",
                  textShadow: "0 3px 10px rgba(0,0,0,0.42), 0 10px 26px rgba(0,0,0,0.22)",
                }}
              >
                Service Spotlight
              </div>
              {spotlightIntro ? (
                <div
                  style={{
                    maxWidth: 760,
                    margin: "0 auto",
                    textAlign: "center",
                    fontSize: "clamp(0.98rem, 1.2vw, 1.08rem)",
                    lineHeight: 1.6,
                    color: "rgba(242,247,252,0.9)",
                    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  {spotlightIntro}
                </div>
              ) : null}
              <SmallEventsServiceSpotlight isCompactLayout={isCompactLayout} />
            </div>
          </SmallEventsSection>
        </div>
      </div>

      <SectionWrap title="Birthday / Private Party Inquiry" subtitle="Routes into HoneyBook (separate funnels).">
        <HoneyBookEmbed kind="privateParty" embedId="HB_PRIVATE_PARTY_FORM_ID" tag="private_party" />
      </SectionWrap>
    </PageFrame>
  );
};

export default SmallEventsPage;
