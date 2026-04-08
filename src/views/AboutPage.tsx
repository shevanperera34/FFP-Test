"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { stegaClean } from "@sanity/client/stega";
import GtaServiceMap from "../components/GtaServiceMap";
import PageFrame, {
  HoverButton,
  canonicalPathBySlug,
  contentMaxWidth,
  titleFont,
  uiFont,
  unifiedDarkButtonHover,
  unifiedHoverTransition,
  useIsCompactLayout,
} from "../components/PageFrame";
import heroBg2 from "../assets/images/hero-bg2.png";
import milenaImg from "../assets/Website Photos etc_/IMG_0316 (3).jpg";
import { eventPicHorizontalUrls } from "../generated/imageManifests";
import { encodePublicAssetPath } from "../utils/encodePublicAssetPath";
import { pickCms, pickCmsImageUrl, pickCmsUrl } from "@/lib/sanity/pickCms";
import type {
  SanityAboutMomentImage,
  SanityAboutPageDoc,
  SanityAboutProcessRow,
  SanityAboutTestimonialRow,
  SanityAboutValueRow,
} from "@/lib/sanity/siteQueries";
import type { BundledImageSrc } from "../utils/encodePublicAssetPath";

type AboutMomentDisplay = { src: string; alt: string };

const aboutGalleryImages = eventPicHorizontalUrls;

const values = [
  {
    title: "Professional Setup",
    text: "Clean, guest-friendly stations designed to look polished and move lines smoothly.",
  },
  {
    title: "Guest-First Flow",
    text: "Design quality stays high while we maintain practical throughput for your event size.",
  },
  {
    title: "Safe Materials",
    text: "Cosmetic-grade products and sanitary process between guests.",
  },
  {
    title: "Reliable Planning",
    text: "Clear communication before the event so setup, timing, and expectations are aligned.",
  },
];

const processSteps = [
  { title: "Plan", desc: "We align on event type, guest count, timing, and service mix." },
  { title: "Prepare", desc: "Design direction, supplies, and setup needs are confirmed in advance." },
  { title: "Set Up", desc: "On-site station is organized for visibility, comfort, and guest flow." },
  { title: "Deliver", desc: "Artistry is tailored to the energy and pace of your event." },
  { title: "Wrap", desc: "Efficient closeout with a clean finish to your venue space." },
];

const aboutGoogleReviews = [
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

type AboutPageProps = {
  sanityAbout?: SanityAboutPageDoc | null;
};

const defaultGoogleReviewsUrl = "https://www.google.com/search?q=Fable+Face+Paint+Google+Reviews";

const AboutPage: React.FC<AboutPageProps> = ({ sanityAbout = null }) => {
  const router = useRouter();
  const isCompactLayout = useIsCompactLayout();

  const heroBg = pickCmsImageUrl(sanityAbout?.heroBackground?.asset?.url, heroBg2);
  const artistPortrait = pickCmsImageUrl(sanityAbout?.artistPhoto?.asset?.url, milenaImg);
  const artistAlt = pickCms(sanityAbout?.artistPhoto?.alt, "Milena from Fable Face Paint");

  const heroEyebrow = pickCms(sanityAbout?.eyebrow, "About us");
  const heroTitle = pickCms(sanityAbout?.pageTitle, "Meet the artist behind Fable Face Paint.");
  const heroIntro = pickCms(
    sanityAbout?.intro,
    "Professional face painting, glitter tattoos, and event art across Toronto & the GTA—blending magical design with reliable logistics. From intimate parties to high-volume events, the goal is memorable guest moments without stress on your day.",
  );

  const valuesSectionTitle = pickCms(sanityAbout?.valuesSectionTitle, "What We Prioritize");
  const valuesSectionIntro = pickCms(
    sanityAbout?.valuesSectionIntro,
    "The values below are editable in this page file so you can tune your brand voice quickly.",
  );
  const processSectionTitle = pickCms(sanityAbout?.processSectionTitle, "How We Work With You");
  const testimonialsSectionTitle = pickCms(sanityAbout?.testimonialsSectionTitle, "What Clients Are Saying");
  const googleReviewScore = pickCms(sanityAbout?.googleReviewScore, "5.0");
  const googleReviewCount = pickCms(sanityAbout?.googleReviewCount, "(59)");
  const googleReviewsUrl = pickCmsUrl(sanityAbout?.googleReviewsUrl, defaultGoogleReviewsUrl);
  const eventMomentsTitle = pickCms(sanityAbout?.eventMomentsTitle, "Event Moments");

  const bookingNoteBelowReviews = useMemo(() => {
    const raw = sanityAbout?.bookingNoteBelowReviews;
    if (typeof raw !== "string") return "";
    return stegaClean(raw).trim();
  }, [sanityAbout?.bookingNoteBelowReviews]);

  const displayValues = useMemo((): typeof values => {
    const cms = sanityAbout?.values;
    if (!cms?.length) return values;
    return cms.map((v: SanityAboutValueRow | null, i: number) => ({
      title: pickCms(v?.title, values[i]?.title ?? ""),
      text: pickCms(v?.text, values[i]?.text ?? ""),
    }));
  }, [sanityAbout]);

  const displayProcessSteps = useMemo((): typeof processSteps => {
    const cms = sanityAbout?.processSteps;
    if (!cms?.length) return processSteps;
    return cms.map((v: SanityAboutProcessRow | null, i: number) => ({
      title: pickCms(v?.title, processSteps[i]?.title ?? ""),
      desc: pickCms(v?.description, processSteps[i]?.desc ?? ""),
    }));
  }, [sanityAbout]);

  const displayReviews = useMemo((): typeof aboutGoogleReviews => {
    const cms = sanityAbout?.testimonials;
    if (!cms?.length) return aboutGoogleReviews;
    return cms.map((v: SanityAboutTestimonialRow | null, i: number) => ({
      quote: pickCms(v?.quote, aboutGoogleReviews[i]?.quote ?? ""),
      author: pickCms(v?.author, aboutGoogleReviews[i]?.author ?? ""),
      time: pickCms(v?.time, aboutGoogleReviews[i]?.time ?? ""),
    }));
  }, [sanityAbout]);

  const displayMomentImages = useMemo((): AboutMomentDisplay[] => {
    const cms = sanityAbout?.momentImages;
    if (cms?.length) {
      return cms
        .map((img: SanityAboutMomentImage | null, i: number) => {
          const url = img?.asset?.url;
          if (!url) return null;
          return {src: url, alt: pickCms(img?.alt, `Event moment ${i + 1}`)};
        })
        .filter((x: AboutMomentDisplay | null): x is AboutMomentDisplay => x !== null);
    }
    return aboutGalleryImages.map((image: BundledImageSrc, i: number) => ({
      src: encodePublicAssetPath(image),
      alt: `Event moment ${i + 1}`,
    }));
  }, [sanityAbout]);

  return (
    <PageFrame pageSlug="about" pageTitle="About Us | Fable Face Paint">
      <div style={{ maxWidth: contentMaxWidth, margin: "0 auto", padding: "0 18px 0" }}>
        <section
          style={{
            width: "100vw",
            marginLeft: "calc(50% - 50vw)",
            marginRight: "calc(50% - 50vw)",
            backgroundImage: `linear-gradient(105deg, rgba(6,10,14,0.82) 0%, rgba(6,10,14,0.60) 44%, rgba(6,10,14,0.78) 100%), url("${encodePublicAssetPath(heroBg)}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              maxWidth: contentMaxWidth,
              margin: "0 auto",
              padding: isCompactLayout ? "42px 22px 36px" : "58px 22px 52px",
              display: "grid",
              gridTemplateColumns: isCompactLayout ? "1fr" : "minmax(0, 1.1fr) minmax(280px, 0.7fr)",
              gap: 24,
              alignItems: "center",
            }}
          >
            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.74, fontFamily: uiFont }}>{heroEyebrow}</div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(2.25rem, 4.2vw, 4.3rem)",
                  lineHeight: 0.98,
                  fontWeight: 950,
                  fontFamily: titleFont,
                }}
              >
                {heroTitle}
              </h1>
              <p style={{ margin: 0, maxWidth: 760, fontSize: "clamp(1rem, 1.24vw, 1.17rem)", lineHeight: 1.62, color: "rgba(242,247,252,0.92)" }}>
                {heroIntro}
              </p>
              <div style={{ paddingTop: 2 }}>
                <HoverButton
                  onClick={() => router.push(canonicalPathBySlug.contact)}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #931C62",
                    borderRadius: 12,
                    padding: "12px 22px",
                    fontWeight: 800,
                    fontSize: 16,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background: "#931C62",
                    color: "#FFFFFF",
                    fontFamily: uiFont,
                    transition: unifiedHoverTransition,
                  }}
                  hoverStyle={unifiedDarkButtonHover}
                >
                  Book Your Date
                </HoverButton>
              </div>
            </div>

            <div
              data-native-cursor="true"
              style={{
                justifySelf: isCompactLayout ? "start" : "end",
                width: isCompactLayout ? 180 : 220,
                height: isCompactLayout ? 180 : 220,
                borderRadius: 999,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.24)",
                boxShadow: "0 14px 32px rgba(0,0,0,0.32)",
              }}
            >
              <img
                src={encodePublicAssetPath(artistPortrait)}
                alt={artistAlt}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </section>

        <section style={{ padding: isCompactLayout ? "26px 0 14px" : "34px 0 18px" }}>
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ display: "grid", gap: 10 }}>
              <h2 style={{ margin: 0, fontSize: "clamp(1.95rem, 3.1vw, 3.1rem)", lineHeight: 1.02, fontWeight: 950, fontFamily: titleFont }}>{valuesSectionTitle}</h2>
              <p style={{ margin: 0, maxWidth: 760, fontSize: "clamp(0.98rem, 1.15vw, 1.06rem)", lineHeight: 1.6, opacity: 0.86 }}>{valuesSectionIntro}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isCompactLayout ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: 14 }}>
              {displayValues.map((value, valueIndex) => (
                <div
                  key={`${value.title}-${valueIndex}`}
                  data-native-cursor="true"
                  style={{
                    borderRadius: 18,
                    border: "1px solid rgba(255,255,255,0.16)",
                    background: "rgba(6,12,18,0.50)",
                    boxShadow: "0 12px 26px rgba(0,0,0,0.24)",
                    padding: "16px 16px 18px",
                    display: "grid",
                    gap: 10,
                  }}
                >
                  <div style={{ fontSize: 30, lineHeight: 0.98, fontWeight: 900, fontFamily: titleFont }}>{value.title}</div>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, opacity: 0.9 }}>{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: isCompactLayout ? "18px 0 20px" : "24px 0 26px" }}>
          <div style={{ display: "grid", gap: 14 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(1.95rem, 3.1vw, 3.1rem)", lineHeight: 1.02, fontWeight: 950, fontFamily: titleFont }}>{processSectionTitle}</h2>
            <div style={{ display: "flex", flexDirection: isCompactLayout ? "column" : "row", alignItems: "stretch" }}>
              {displayProcessSteps.map((step, index) => (
                <React.Fragment key={`${step.title}-${index}`}>
                  <div
                    data-native-cursor="true"
                    style={{
                      flex: isCompactLayout ? "none" : "1 1 0",
                      borderRadius: 16,
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "rgba(6,12,18,0.44)",
                      padding: "14px 12px 16px",
                      display: "grid",
                      gap: 8,
                      textAlign: isCompactLayout ? "center" : "left",
                      justifyItems: isCompactLayout ? "center" : "stretch",
                    }}
                  >
                    <div style={{ fontSize: 11, letterSpacing: "0.11em", textTransform: "uppercase", opacity: 0.72, fontFamily: uiFont }}>Step {index + 1}</div>
                    <div style={{ fontSize: 24, lineHeight: 1, fontWeight: 900, fontFamily: titleFont }}>{step.title}</div>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, opacity: 0.88, maxWidth: isCompactLayout ? 460 : "none" }}>{step.desc}</p>
                  </div>

                  {index < displayProcessSteps.length - 1 ? (
                    <div
                      aria-hidden="true"
                      style={{
                        alignSelf: "center",
                        width: isCompactLayout ? 3 : 30,
                        height: isCompactLayout ? 30 : 3,
                        margin: isCompactLayout ? "8px auto" : "0 8px",
                        borderRadius: 999,
                        background: isCompactLayout
                          ? "linear-gradient(180deg, rgba(211,74,168,0.2), rgba(211,74,168,0.95), rgba(147,28,98,0.92), rgba(211,74,168,0.2))"
                          : "linear-gradient(90deg, rgba(211,74,168,0.2), rgba(211,74,168,0.95), rgba(147,28,98,0.92), rgba(211,74,168,0.2))",
                        boxShadow: "0 0 10px rgba(211,74,168,0.75), 0 0 22px rgba(147,28,98,0.55)",
                        opacity: 0.95,
                        flexShrink: 0,
                      }}
                    />
                  ) : null}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: isCompactLayout ? "4px 0 20px" : "8px 0 24px" }}>
          <div
            data-native-cursor="true"
            style={{
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(6,12,18,0.50)",
              boxShadow: "0 12px 26px rgba(0,0,0,0.24)",
              padding: isCompactLayout ? "14px 12px" : "18px 16px",
              display: "grid",
              gap: 10,
            }}
          >
            <GtaServiceMap isCompactLayout={isCompactLayout} />
          </div>
        </section>

        <section style={{ padding: isCompactLayout ? "6px 0 20px" : "8px 0 24px" }}>
          <div
            style={{
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "#ECEAEC",
              boxShadow: "0 16px 34px rgba(0,0,0,0.26)",
              padding: isCompactLayout ? "14px 12px 12px" : "16px 16px 14px",
              display: "grid",
              gap: 12,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(1.7rem, 2.6vw, 2.65rem)",
                lineHeight: 1.02,
                fontWeight: 950,
                fontFamily: titleFont,
                color: "#161616",
              }}
            >
              {testimonialsSectionTitle}
            </h2>

            <div
              style={{
                borderRadius: 12,
                border: "1px solid rgba(12,12,12,0.1)",
                background: "#F2F0EE",
                padding: isCompactLayout ? "10px" : "12px",
                display: "flex",
                alignItems: isCompactLayout ? "flex-start" : "center",
                justifyContent: "space-between",
                gap: 10,
                flexDirection: isCompactLayout ? "column" : "row",
              }}
            >
              <div style={{ display: "grid", gap: 2 }}>
                <div style={{ fontSize: "clamp(1.35rem, 1.75vw, 1.8rem)", lineHeight: 1, fontFamily: uiFont, color: "#1A1A1A" }}>Google Reviews</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 40, lineHeight: 0.95, fontWeight: 900, fontFamily: titleFont, color: "#111111" }}>{googleReviewScore}</span>
                  <span style={{ fontSize: 26, color: "#F9CA24", letterSpacing: "0.08em" }}>★★★★★</span>
                  <span style={{ fontSize: 15, color: "rgba(20,20,20,0.66)" }}>{googleReviewCount}</span>
                </div>
              </div>

              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  borderRadius: 999,
                  border: "1px solid rgba(36,105,226,0.25)",
                  background: "#2D7CF6",
                  color: "#FFFFFF",
                  padding: "10px 14px",
                  fontSize: 12,
                  fontWeight: 900,
                  fontFamily: uiFont,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Review us on Google
              </a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isCompactLayout ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 10 }}>
              {displayReviews.map((review) => (
                <div
                  key={`${review.author}-${review.time}`}
                  style={{
                    borderRadius: 12,
                    border: "1px solid rgba(12,12,12,0.12)",
                    background: "#F2F0EE",
                    padding: "12px 12px 14px",
                    display: "grid",
                    gap: 10,
                    minHeight: isCompactLayout ? 160 : 190,
                  }}
                >
                  <div style={{ color: "#F9CA24", letterSpacing: "0.08em", fontSize: 16, textAlign: "center" }}>★★★★★</div>
                  <div
                    style={{
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: "#1A1A1A",
                      textAlign: "center",
                    }}
                  >
                    {review.quote}
                  </div>
                  <div style={{ marginTop: "auto", textAlign: "center", display: "grid", gap: 2 }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#1A1A1A" }}>{review.author}</div>
                    <div style={{ fontSize: 12, color: "rgba(20,20,20,0.64)" }}>{review.time}</div>
                    <div style={{ fontSize: 13, color: "rgba(20,20,20,0.7)", fontFamily: uiFont }}>Google</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {bookingNoteBelowReviews ? (
            <div
              style={{
                marginTop: 10,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(7,22,18,0.68)",
                boxShadow: "0 10px 24px rgba(0,0,0,0.2)",
                padding: isCompactLayout ? "10px 12px" : "12px 14px",
                fontSize: "clamp(0.95rem, 1vw, 1.02rem)",
                lineHeight: 1.5,
                color: "rgba(242,247,252,0.94)",
              }}
            >
              {bookingNoteBelowReviews}
            </div>
          ) : null}
        </section>

        <section style={{ padding: isCompactLayout ? "8px 0 26px" : "12px 0 34px" }}>
          <div style={{ display: "grid", gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(1.7rem, 2.8vw, 2.7rem)", lineHeight: 1.04, fontWeight: 950, fontFamily: titleFont }}>{eventMomentsTitle}</h2>
            <div style={{ display: "grid", gridTemplateColumns: isCompactLayout ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))", gap: 10 }}>
              {displayMomentImages.slice(0, isCompactLayout ? 6 : 8).map((image, index) => (
                <div
                  key={`about-gallery-${image.src}-${index}`}
                  data-native-cursor="true"
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.14)",
                    height: isCompactLayout ? 130 : 170,
                    boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: 8 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <HoverButton
              onClick={() => router.push(canonicalPathBySlug.services)}
              style={{
                cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 12,
                padding: "10px 16px",
                fontWeight: 800,
                fontSize: 14,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                background: "rgba(255,255,255,0.06)",
                color: "#FFFFFF",
                fontFamily: uiFont,
                transition: unifiedHoverTransition,
              }}
              hoverStyle={unifiedDarkButtonHover}
            >
              View Services
            </HoverButton>
            <HoverButton
              onClick={() => router.push(canonicalPathBySlug.contact)}
              style={{
                cursor: "pointer",
                border: "1px solid #931C62",
                borderRadius: 12,
                padding: "10px 16px",
                fontWeight: 800,
                fontSize: 14,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                background: "#931C62",
                color: "#FFFFFF",
                fontFamily: uiFont,
                transition: unifiedHoverTransition,
              }}
              hoverStyle={unifiedDarkButtonHover}
            >
              Start Booking
            </HoverButton>
          </div>
        </section>
      </div>
    </PageFrame>
  );
};

export default AboutPage;
