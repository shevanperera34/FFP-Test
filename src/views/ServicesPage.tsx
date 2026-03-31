"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageFrame, {
  HoverButton,
  contentMaxWidth,
  titleFont,
  uiFont,
  unifiedDarkButtonHover,
  unifiedHoverTransition,
  useIsCompactLayout,
} from "../components/PageFrame";
import mossBackground from "../assets/Website Photos etc_/moss-5619857_1920.jpg";
import ScatterHoverGallery from "../components/ScatterHoverGallery";
import { serviceAssetModuleRecord } from "../generated/imageManifests";
import { encodePublicAssetPath, type BundledImageSrc } from "../utils/encodePublicAssetPath";

type ServiceSection = {
  heading: string;
  paragraph: string;
};

type ServiceFaqItem = {
  question: string;
  answer: string;
};

type ServiceEntry = {
  id: string;
  name: string;
  folder: string;
  cardHeading: string;
  cardParagraph: string;
  sections: ServiceSection[];
  importantInfo: string[];
  faq: ServiceFaqItem[];
};

const imagesByFolder = Object.entries(serviceAssetModuleRecord).reduce<Record<string, BundledImageSrc[]>>(
  (acc, [filePath, imageUrl]) => {
    const folderMatch = filePath.match(/assets\/srevice assets\/([^/]+)\/Assets\//);
    if (!folderMatch) return acc;

    const folderName = folderMatch[1];
    if (!acc[folderName]) acc[folderName] = [];
    acc[folderName].push(imageUrl);
    return acc;
  },
  {}
);

const services: ServiceEntry[] = [
  {
    id: "face-painting",
    name: "Face Painting",
    folder: "Face Painting",
    cardHeading: "A Clean & Professional Setup",
    cardParagraph:
      "Everything is sanitized between guests, and only high-quality, skin-safe paints are used. The setup is neat and inviting, adding to the magic of your event.",
    sections: [
      {
        heading: "A Clean & Professional Setup",
        paragraph:
          "Everything is sanitized between guests, and only high-quality, skin-safe paints are used. The setup is neat and inviting, adding to the magic of your event.",
      },
      {
        heading: "Beautiful Designs in 5 minutes",
        paragraph:
          "From adorable animals to intricate fantasy designs, each painting is customized to bring out your guests' personalities. Whether playful or elegant, there is something for everyone.",
      },
      {
        heading: "Smiling Ear-to-Ear",
        paragraph:
          "Quick enough to keep the line moving, yet detailed enough to wow your guests. Each face comes to life in minutes so guests can enjoy the rest of the event.",
      },
    ],
    importantInfo: [
      "A deposit is required to secure your date and time.",
      "Please provide one table and two chairs in a well-lit area.",
      "For outdoor events, shade or weather cover is required.",
    ],
    faq: [
      {
        question: "How many faces can you paint per hour?",
        answer: "Typically 10-12 detailed designs per hour, depending on complexity.",
      },
      {
        question: "What age is recommended?",
        answer: "Face painting is suitable for ages 3 and above.",
      },
      {
        question: "How do we remove paint after the event?",
        answer: "Use mild soap and water, or an oil-based makeup remover for easier removal.",
      },
    ],
  },
  {
    id: "body-painting",
    name: "Body Painting",
    folder: "Body Painting",
    cardHeading: "Endless Creative Possibilities",
    cardParagraph:
      "From small, detailed pieces to full-body transformations, body painting can bring any vision to life, whether for a photoshoot, bold cosplay, or living art.",
    sections: [
      {
        heading: "Endless Creative Possibilities",
        paragraph:
          "From small, detailed pieces to full-body transformations, body painting can bring any vision to life, whether for a photoshoot, bold cosplay, or living art.",
      },
      {
        heading: "Pro-Grade Paints & Technique",
        paragraph:
          "Only high-quality, skin-safe paints are used, applied with expert technique to create striking and photo-ready results.",
      },
      {
        heading: "Durable Yet Easy to Wash Off",
        paragraph:
          "Designs stay vibrant for hours and can be removed with soap and water when you are ready.",
      },
    ],
    importantInfo: [
      "Session length depends on coverage and complexity.",
      "Clean, lotion-free skin is recommended before the appointment.",
      "Please confirm setup privacy and timing in advance for larger designs.",
    ],
    faq: [
      {
        question: "Is body painting safe for sensitive skin?",
        answer: "Yes, professional skin-safe paints are used.",
      },
      {
        question: "Can you do custom concepts?",
        answer: "Yes, custom concepts are available and planned ahead of your event.",
      },
      {
        question: "How long does it take?",
        answer: "Timing varies by design scope and detail level.",
      },
    ],
  },
  {
    id: "bling-bar",
    name: "Bling Bar",
    folder: "Bling Bar",
    cardHeading: "A Beautiful Range of Colours to Choose From",
    cardParagraph:
      "Guests can pick from a wide selection of glitter shades or select from pre-designed face gem arrangements to suit their style and personality.",
    sections: [
      {
        heading: "A Beautiful Range of Colours to Choose From",
        paragraph:
          "Guests can pick from a wide selection of glitter shades or select from pre-designed face gem arrangements to suit their style and personality.",
      },
      {
        heading: "Sparkle and Shine for Every Guest",
        paragraph:
          "The bling bar adds a magical touch to your event, where guests can choose from a variety of sparkling glitter colours or dazzling face gem designs.",
      },
      {
        heading: "Fast & Fun for All Ages",
        paragraph:
          "With the ability to serve up to 30 guests per hour, the bling bar ensures everyone gets a chance to shine without long waits.",
      },
    ],
    importantInfo: [
      "A non-refundable deposit is required to secure your booking.",
      "Only cosmetic-grade glitter and skin-safe adhesive are used.",
      "Extensions are available based on artist availability.",
    ],
    faq: [
      {
        question: "What is included in the Bling Bar service?",
        answer:
          "A curated selection of cosmetic-grade glitters, gels, pixie dust, rhinestones, and face gems.",
      },
      {
        question: "How many guests can you accommodate per hour?",
        answer: "Usually between 15 and 30 guests per hour depending on the style requested.",
      },
      {
        question: "Is this safe for children?",
        answer: "Yes, this service uses skin-safe products and follows age-safe guidelines.",
      },
    ],
  },
  {
    id: "balloon-twisting",
    name: "Balloon Twisting",
    folder: "Balloon Twisting",
    cardHeading: "Interactive Fun That Keeps Guests Engaged",
    cardParagraph:
      "Balloon twisting brings joy to your event, with guests receiving fun creations like animals, swords, and flowers to keep the atmosphere playful.",
    sections: [
      {
        heading: "Interactive Fun That Keeps Guests Engaged",
        paragraph:
          "Balloon twisting brings joy to your event, with guests receiving fun creations like animals, swords, and flowers to keep the atmosphere playful.",
      },
      {
        heading: "Colours are Personally Picked",
        paragraph:
          "Guests enjoy choosing colours and styles, making each piece feel personal and event-ready.",
      },
      {
        heading: "Quick and Fun for Larger Crowds",
        paragraph:
          "Serving up to 15 guests per hour, balloon twisting is perfect for high-energy events without long waits.",
      },
    ],
    importantInfo: [
      "Recommended for guests ages 3 and up.",
      "A compact setup area is needed for line flow.",
      "Multi-artist coverage is available for larger events.",
    ],
    faq: [
      {
        question: "How many creations can you make per hour?",
        answer: "Typically up to 15 creations per hour depending on complexity.",
      },
      {
        question: "What kinds of designs can guests choose?",
        answer: "Popular options include swords, animals, flowers, and themed character shapes.",
      },
      {
        question: "Can this work for festivals and public events?",
        answer: "Yes, this service is often used for festivals and high-traffic family events.",
      },
    ],
  },
  {
    id: "glitter-tattoos",
    name: "Glitter Tattoos",
    folder: "Glitter Tattoos",
    cardHeading: "Longer Wear Than Face Paint",
    cardParagraph:
      "Glitter tattoos are applied with skin-safe adhesive and cosmetic-grade glitter for strong visual pop and all-day wear.",
    sections: [
      {
        heading: "Longer Wear Than Face Paint",
        paragraph:
          "Glitter tattoos are applied with skin-safe adhesive and cosmetic-grade glitter for strong visual pop and all-day wear.",
      },
      {
        heading: "Great for Outdoor Event Days",
        paragraph:
          "This service performs well in festival and outdoor settings where guests want lower-touch maintenance.",
      },
      {
        heading: "Clean, Quick Application",
        paragraph: "Stencil-led designs allow reliable throughput while keeping a polished finish.",
      },
    ],
    importantInfo: [
      "Water-resistant and typically lasts 2-5 days.",
      "Custom stencil options can be arranged with advance notice.",
      "Best applied to clean, dry skin on recommended body areas.",
    ],
    faq: [
      {
        question: "How long do glitter tattoos last?",
        answer: "Most last between 2 and 5 days depending on care and skin type.",
      },
      {
        question: "How do guests remove them?",
        answer: "They can be removed with oil-based products, alcohol, or warm soapy soaking.",
      },
      {
        question: "Are they safe for sensitive skin?",
        answer: "Skin-safe materials are used, but please share allergy concerns ahead of time.",
      },
    ],
  },
  {
    id: "matte-tattoos",
    name: "Matte Tattoos",
    folder: "Matte Ink Tattoos",
    cardHeading: "A Wide Range of Sizes and Designs",
    cardParagraph:
      "From minimalist symbols to intricate patterns, there is something for everyone whether it is a party, festival, or corporate event.",
    sections: [
      {
        heading: "A Wide Range of Sizes and Designs",
        paragraph:
          "From minimalist symbols to intricate patterns, there is something for everyone whether it is a party, festival, or corporate event.",
      },
      {
        heading: "Realistic, Temporary Tattoos",
        paragraph:
          "With a sleek black finish, these tattoos look like real ink while still being fully temporary.",
      },
      {
        heading: "Waterproof & Easy to Remove",
        paragraph:
          "These tattoos can last multiple days and remove with rubbing alcohol or oil-based products.",
      },
    ],
    importantInfo: [
      "Designed for temporary wear with realistic matte-black finish.",
      "Stencil catalog includes multiple size options for different age groups.",
      "Avoid applying over irritated or broken skin.",
    ],
    faq: [
      {
        question: "How long do matte tattoos last?",
        answer: "Usually around 2-5 days depending on placement and aftercare.",
      },
      {
        question: "Can guests pick custom designs?",
        answer: "Guests can choose from the available stencil set curated for events.",
      },
      {
        question: "How do you remove them?",
        answer: "Use rubbing alcohol or an oil-based remover for quick removal.",
      },
    ],
  },
];

const servicePreviewIndexById: Partial<Record<ServiceEntry["id"], number>> = {
  "face-painting": 1,
  "body-painting": 1,
};

function ServiceGalleryPanel({
  images,
  isCompactLayout,
  onOpenGallery,
}: {
  images: BundledImageSrc[];
  isCompactLayout: boolean;
  onOpenGallery: () => void;
}) {
  const safeImages = images;
  const [showFirstTimeHint, setShowFirstTimeHint] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem("ffp_services_gallery_hint_seen");
    if (!seen) {
      setShowFirstTimeHint(true);
    }
  }, []);

  const markHintAsSeen = () => {
    if (!showFirstTimeHint) return;
    setShowFirstTimeHint(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ffp_services_gallery_hint_seen", "1");
    }
  };

  return (
    <div
      data-native-cursor="true"
      className="services-gallery-panel"
      onMouseEnter={markHintAsSeen}
      onClick={onOpenGallery}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenGallery();
        }
      }}
      style={{
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "#ECEAEC",
        overflow: "hidden",
        height: isCompactLayout ? 220 : 280,
        position: "relative",
        padding: isCompactLayout ? "8px" : "10px",
        cursor: "pointer",
      }}
    >
      {safeImages.length > 0 ? (
        <ScatterHoverGallery
          images={safeImages}
          columns={isCompactLayout ? 2 : 3}
          cardWidth={isCompactLayout ? 122 : 98}
          cardHeight={isCompactLayout ? 98 : 115}
          visibleCount={isCompactLayout ? 4 : 6}
          className={isCompactLayout ? "services-gallery-panel ffp-gallery-display" : "services-gallery-panel"}
        />
      ) : null}

      {showFirstTimeHint && !isCompactLayout ? (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            bottom: 10,
            transform: "translateX(-50%)",
            borderRadius: 999,
            border: "1px solid rgba(11,11,11,0.24)",
            background: "rgba(255,255,255,0.84)",
            color: "#111111",
            padding: "7px 12px",
            fontSize: 12,
            fontFamily: uiFont,
            fontWeight: 900,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            boxShadow: "0 8px 18px rgba(0,0,0,0.2)",
            pointerEvents: "none",
          }}
        >
          bring your mouse here
        </div>
      ) : null}
    </div>
  );
}

function CollapsiblePanel({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      data-native-cursor="true"
      style={{
        borderRadius: 12,
        border: "1px solid rgba(211,74,168,0.40)",
        background: "#F2F0EE",
        color: "#121212",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        style={{
          width: "100%",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          padding: "12px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 13,
          fontFamily: uiFont,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#111111",
        }}
      >
        <span style={{ fontWeight: 900 }}>{title}</span>
        <span style={{ fontSize: 10, opacity: 0.7 }}>{open ? "Collapse" : "Expand"}</span>
      </button>

      {open ? (
        <div style={{ borderTop: "1px solid rgba(11,11,11,0.14)", padding: "12px 12px 14px", display: "grid", gap: 10 }}>{children}</div>
      ) : null}
    </div>
  );
}

const ServicesPage: React.FC = () => {
  const isCompactLayout = useIsCompactLayout();
  const router = useRouter();
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);

  const servicesWithImages = useMemo(
    () =>
      services.map((service) => ({
        ...service,
        galleryImages: imagesByFolder[service.folder] ?? [],
      })),
    []
  );

  const activeService = servicesWithImages.find((service) => service.id === activeServiceId) ?? null;

  return (
    <PageFrame pageSlug="services" pageTitle="Services | Fable Face Paint">
      <div
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          backgroundImage: `linear-gradient(180deg, rgba(4,10,14,0.78) 0%, rgba(4,10,14,0.74) 100%), url("${encodePublicAssetPath(mossBackground)}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          borderTop: "1px solid rgba(255,255,255,0.10)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <div style={{ maxWidth: contentMaxWidth, margin: "0 auto", padding: isCompactLayout ? "18px 12px 24px" : "18px 16px 30px", display: "grid", gap: 14 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.9rem, 3.2vw, 3.2rem)", lineHeight: 1.02, fontWeight: 950, fontFamily: titleFont }}>Services</h1>
            <p style={{ margin: 0, fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)", lineHeight: 1.55, opacity: 0.9 }}>Click a service to learn more details.</p>
          </div>

          {!activeService ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isCompactLayout ? "1fr" : "repeat(3, minmax(0, 1fr))",
                gap: isCompactLayout ? 10 : 14,
              }}
            >
              {servicesWithImages.map((service) => {
                const preferredIndex = servicePreviewIndexById[service.id] ?? 0;
                const previewImage = service.galleryImages[preferredIndex] ?? service.galleryImages[0];
                const cardHovered = hoveredServiceId === service.id;
                return (
                  <article
                    key={service.id}
                    data-native-cursor="true"
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveServiceId(service.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveServiceId(service.id);
                      }
                    }}
                    onMouseEnter={() => setHoveredServiceId(service.id)}
                    onMouseLeave={() => setHoveredServiceId((current) => (current === service.id ? null : current))}
                    onFocus={() => setHoveredServiceId(service.id)}
                    onBlur={() => setHoveredServiceId((current) => (current === service.id ? null : current))}
                    style={{
                      position: "relative",
                      borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.16)",
                      minHeight: isCompactLayout ? 214 : 236,
                      overflow: "hidden",
                      boxShadow: "0 10px 24px rgba(0,0,0,0.26)",
                      cursor: "pointer",
                    }}
                  >
                    {previewImage ? (
                      <img
                        src={encodePublicAssetPath(previewImage)}
                        alt={service.name}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : null}

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, rgba(4,10,14,0.52) 0%, rgba(4,10,14,0.88) 88%)",
                        padding: isCompactLayout ? "12px 12px 10px" : "14px 14px 12px",
                        display: "grid",
                        alignContent: "space-between",
                        gap: 10,
                      }}
                    >
                      <div style={{ display: "grid", gap: 6 }}>
                        <div
                          style={{
                            fontSize: "clamp(1.65rem, 2.3vw, 2.55rem)",
                            lineHeight: 0.95,
                            fontWeight: 900,
                            fontFamily: titleFont,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {service.name}
                        </div>
                        <div
                          style={{
                            fontSize: "clamp(0.94rem, 1.04vw, 1.15rem)",
                            lineHeight: 1.2,
                            fontFamily: uiFont,
                            fontWeight: 700,
                          }}
                        >
                          {service.cardHeading}
                        </div>
                        <div
                          style={{
                            fontSize: "clamp(0.86rem, 0.95vw, 0.98rem)",
                            lineHeight: 1.36,
                            opacity: 0.9,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {service.cardParagraph}
                        </div>
                      </div>

                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <span
                          style={{
                            color: cardHovered ? "#F2B4DD" : "#FFFFFF",
                            fontWeight: 900,
                            fontSize: "clamp(0.98rem, 1.06vw, 1.12rem)",
                            padding: "6px 2px",
                            fontFamily: uiFont,
                            transition: unifiedHoverTransition,
                            textShadow: cardHovered ? "0 0 12px rgba(242,180,221,0.58)" : "none",
                          }}
                        >
                          View Service
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(3,14,14,0.66)",
                boxShadow: "0 16px 34px rgba(0,0,0,0.30)",
                padding: isCompactLayout ? "10px" : "12px",
                display: "grid",
                gridTemplateColumns: isCompactLayout ? "1fr" : "260px minmax(0, 1fr)",
                gap: 12,
              }}
            >
              <aside style={{ display: "grid", gap: 8, alignContent: "start" }}>
                {servicesWithImages.map((service) => {
                  const isActive = service.id === activeService.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setActiveServiceId(service.id)}
                      style={{
                        cursor: "pointer",
                        borderRadius: 10,
                        border: isActive ? "1px solid #931C62" : "1px solid rgba(255,255,255,0.12)",
                        background: isActive ? "#931C62" : "rgba(5,10,16,0.64)",
                        color: "#FFFFFF",
                        fontSize: 16,
                        fontFamily: uiFont,
                        fontWeight: 800,
                        padding: "12px 10px",
                        textAlign: "center",
                        boxShadow: isActive ? "0 10px 24px rgba(147, 28, 98, 0.22)" : "none",
                        transition: unifiedHoverTransition,
                      }}
                    >
                      {service.name}
                    </button>
                  );
                })}
              </aside>

              <div style={{ display: "grid", gap: 10, alignContent: "start" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                  <div style={{ fontSize: "clamp(2.2rem, 3.2vw, 3.2rem)", lineHeight: 0.96, fontWeight: 900, fontFamily: titleFont }}>{activeService.name}</div>
                  <button
                    type="button"
                    onClick={() => setActiveServiceId(null)}
                    style={{
                      cursor: "pointer",
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,0.18)",
                      background: "rgba(255,255,255,0.08)",
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontFamily: uiFont,
                      fontWeight: 800,
                      padding: "8px 12px",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    Close
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isCompactLayout ? "1fr" : "minmax(0, 1fr) minmax(320px, 0.78fr)", gap: 12 }}>
                  <div style={{ display: "grid", gap: 10 }}>
                    {activeService.sections.map((section) => (
                      <div key={`${activeService.id}-${section.heading}`} style={{ display: "grid", gap: 4 }}>
                        <div style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.6rem)", lineHeight: 1.04, fontFamily: uiFont }}>{section.heading}</div>
                        <div style={{ fontSize: "clamp(0.95rem, 1.04vw, 1.05rem)", lineHeight: 1.58, opacity: 0.9 }}>{section.paragraph}</div>
                      </div>
                    ))}
                  </div>

                  <ServiceGalleryPanel
                    images={activeService.galleryImages}
                    isCompactLayout={isCompactLayout}
                    onOpenGallery={() => router.push(`/gallery?tag=${encodeURIComponent(activeService.folder)}`)}
                  />
                </div>

                <CollapsiblePanel title="Important Info" defaultOpen>
                  <div style={{ display: "grid", gap: 8 }}>
                    {activeService.importantInfo.map((item) => (
                      <div key={`${activeService.id}-important-${item}`} style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(11,11,11,0.86)" }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </CollapsiblePanel>

                <CollapsiblePanel title="Service FAQ" defaultOpen>
                  <div style={{ display: "grid", gap: 10 }}>
                    {activeService.faq.map((faqItem) => (
                      <div key={`${activeService.id}-faq-${faqItem.question}`} style={{ display: "grid", gap: 4 }}>
                        <div style={{ fontSize: 13, fontWeight: 900, lineHeight: 1.45 }}>{faqItem.question}</div>
                        <div style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(11,11,11,0.84)" }}>{faqItem.answer}</div>
                      </div>
                    ))}
                  </div>
                </CollapsiblePanel>
              </div>
            </div>
          )}

          {activeService ? (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <HoverButton
                onClick={() => setActiveServiceId(null)}
                style={{
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.08)",
                  color: "#FFFFFF",
                  fontFamily: uiFont,
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  padding: "9px 12px",
                  transition: unifiedHoverTransition,
                }}
                hoverStyle={unifiedDarkButtonHover}
              >
                Back to services
              </HoverButton>
            </div>
          ) : null}
        </div>
      </div>
    </PageFrame>
  );
};

export default ServicesPage;
