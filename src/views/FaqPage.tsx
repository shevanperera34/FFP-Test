"use client";

import React, { useMemo, useState } from "react";
import { pickCms, pickCmsImageUrl } from "@/lib/sanity/pickCms";
import type { SanityFaqItemDoc, SanityFaqListingPageDoc } from "@/lib/sanity/siteQueries";
import PageFrame, { contentMaxWidth, titleFont, uiFont, useIsCompactLayout } from "../components/PageFrame";
import heroBg2 from "../assets/images/hero-bg2.png";
import { encodePublicAssetPath } from "../utils/encodePublicAssetPath";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqGroup = {
  heading: string;
  items: FaqItem[];
};

const faqGroups: FaqGroup[] = [
  {
    heading: "Face Painting",
    items: [
      {
        question: "What type of paints do you use?",
        answer: "Professional-grade, skin-safe paints designed for cosmetic use.",
      },
      {
        question: "How many faces can you paint per hour?",
        answer: "Usually 10-12 detailed designs per hour, or a higher count with a speed menu format.",
      },
      {
        question: "What setup do you need at the venue?",
        answer: "One table and two chairs in a well-lit area, ideally away from loud speakers.",
      },
      {
        question: "Can you match party themes?",
        answer: "Yes, theme references can be discussed in advance so the menu fits your event look.",
      },
      {
        question: "How do we remove face paint?",
        answer: "Use mild soap and warm water, or an oil-based makeup remover for easier removal.",
      },
      {
        question: "Is face painting safe for children?",
        answer: "Yes, we use cosmetic-grade skin-safe products and follow age-appropriate designs.",
      },
    ],
  },
  {
    heading: "Body Painting",
    items: [
      {
        question: "Is body paint safe for sensitive skin?",
        answer: "Yes, we use professional skin-safe paints and can adjust products based on sensitivity notes.",
      },
      {
        question: "How long does body painting take?",
        answer: "Timing depends on coverage and detail level. We confirm a timeline before your event.",
      },
      {
        question: "Do you do custom body paint concepts?",
        answer: "Yes, custom concepts are welcome and planned with references before the booking.",
      },
      {
        question: "Will body paint transfer onto clothing?",
        answer: "We use high-quality products and sealing methods, but light transfer can happen with heavy friction.",
      },
      {
        question: "Can body painting be booked for photoshoots?",
        answer: "Absolutely. We frequently support editorial shoots, creative sessions, and branded campaigns.",
      },
      {
        question: "How is body paint removed?",
        answer: "Removal is typically soap and warm water, with oil-based remover for stronger pigments.",
      },
      {
        question: "Do you travel for body painting bookings?",
        answer: "Yes, mobile setup is available across the GTA with travel details confirmed at inquiry.",
      },
    ],
  },
  {
    heading: "Belly Painting",
    items: [
      {
        question: "Is belly painting safe during pregnancy?",
        answer: "Yes, we use cosmetic-grade products that are skin-safe and suitable for maternity sessions.",
      },
      {
        question: "When is the best time to book a belly paint session?",
        answer: "Most clients book between 28 and 36 weeks for comfort and ideal bump shape.",
      },
      {
        question: "Can a partner or child join the design?",
        answer: "Yes, we can include partner hands, sibling details, or a family-themed concept.",
      },
      {
        question: "How long does a session usually take?",
        answer: "Most sessions run 60 to 120 minutes depending on complexity and add-ons.",
      },
      {
        question: "Do you provide photo-ready designs?",
        answer: "Yes, designs are planned to look polished in photos and keepsake shots.",
      },
      {
        question: "Can we do a custom concept?",
        answer: "Absolutely. You can share ideas, themes, and inspiration references in advance.",
      },
    ],
  },
  {
    heading: "Matte Ink Tattoos",
    items: [
      {
        question: "What are matte ink tattoos?",
        answer: "They are realistic-looking temporary tattoos with a clean black-ink finish.",
      },
      {
        question: "How long do matte tattoos last?",
        answer: "Most last around 2-5 days depending on placement, skin type, and aftercare.",
      },
      {
        question: "Are matte tattoos waterproof?",
        answer: "They are water-resistant for day-to-day wear but can fade faster with friction or oils.",
      },
      {
        question: "Can guests choose from different designs?",
        answer: "Yes, we bring a curated stencil catalog with options for different age groups.",
      },
      {
        question: "How are matte tattoos removed?",
        answer: "They remove quickly with rubbing alcohol or oil-based remover.",
      },
    ],
  },
  {
    heading: "Glitter Tattoos",
    items: [
      {
        question: "Are glitter tattoos safe for children’s skin?",
        answer: "Yes, we use cosmetic-grade glitter and skin-safe adhesive suitable for all ages.",
      },
      {
        question: "How long do glitter tattoos last?",
        answer: "Most last between 2 and 5 days depending on care and placement.",
      },
      {
        question: "Can glitter tattoos be removed easily?",
        answer: "Yes. Oil-based products, alcohol, or warm soapy soaking help remove them quickly.",
      },
      {
        question: "Do you offer custom designs for glitter tattoos?",
        answer: "Custom stencil requests can be prepared in advance with enough lead time.",
      },
      {
        question: "Are there restrictions on placement?",
        answer: "We avoid irritated or sensitive areas and recommend clean, dry skin for best wear.",
      },
      {
        question: "How many glitter tattoos can you apply per hour?",
        answer: "Throughput depends on detail level, but this is one of our fastest high-volume services.",
      },
    ],
  },
  {
    heading: "Balloon Twisting",
    items: [
      {
        question: "What balloon designs do you offer?",
        answer: "Popular designs include animals, swords, flowers, and themed creations.",
      },
      {
        question: "How many creations can be made per hour?",
        answer: "Usually up to 15 per hour depending on design complexity and line flow.",
      },
      {
        question: "Is balloon twisting suitable for all ages?",
        answer: "Recommended for ages 3+ due to standard balloon safety considerations.",
      },
      {
        question: "Can this be booked for larger events?",
        answer: "Yes, multi-artist coverage is available for higher guest counts.",
      },
      {
        question: "Can guests choose colors and styles?",
        answer: "Yes, we encourage guests to choose colors and style variations when time allows.",
      },
      {
        question: "Do you do custom themed balloons?",
        answer: "Yes, we can align balloon menus to your party theme when discussed in advance.",
      },
    ],
  },
  {
    heading: "Bling Bar",
    items: [
      {
        question: "What is included in the Bling Bar service?",
        answer: "A curated selection of cosmetic-grade glitter gels, gems, pixie dust, and sparkle looks.",
      },
      {
        question: "How many guests can be served per hour?",
        answer: "Typically 15-30 guests per hour depending on style complexity.",
      },
      {
        question: "Is bling bar safe for kids?",
        answer: "Yes, we use skin-safe products and adjust applications by age and sensitivity.",
      },
      {
        question: "Can guests choose from different styles?",
        answer: "Yes, guests can pick from pre-designed sparkle looks and color palettes.",
      },
      {
        question: "Is this good for festivals and corporate events?",
        answer: "Absolutely. Bling bar is excellent for high-volume engagement and quick visual impact.",
      },
      {
        question: "Do you offer a themed bling menu?",
        answer: "Yes, we can curate sparkle looks around your event theme or brand palette.",
      },
    ],
  },
  {
    heading: "Booking & Policies",
    items: [
      {
        question: "How do I secure a date?",
        answer: "A deposit is required to confirm your booking date and time.",
      },
      {
        question: "Do you travel across the GTA?",
        answer: "Yes, Fable Face Paint is fully mobile across the Greater Toronto Area.",
      },
      {
        question: "Can I request custom themes?",
        answer: "Absolutely. Theme preferences and event direction are confirmed during planning.",
      },
      {
        question: "What if I’m not sure which service to book?",
        answer: "Use the general inquiry option on the booking page and we’ll recommend the best fit.",
      },
      {
        question: "Do you offer multi-artist bookings?",
        answer: "Yes, additional artists can be arranged for larger events and tighter timelines.",
      },
    ],
  },
];

const FAQ_CATEGORY_HEADINGS: Record<string, string> = {
  "face-painting": "Face Painting",
  "body-painting": "Body Painting",
  "belly-painting": "Belly Painting",
  "matte-ink-tattoos": "Matte Ink Tattoos",
  "glitter-tattoos": "Glitter Tattoos",
  "bling-bar": "Bling Bar",
  "balloon-twisting": "Balloon Twisting",
  "booking-policies": "Booking & Policies",
  general: "General",
};

function faqGroupsFromSanity(items: SanityFaqItemDoc[]): FaqGroup[] {
  const order: string[] = [];
  const map = new Map<string, FaqItem[]>();
  for (const row of items) {
    const key = row.category?.trim() || "general";
    if (!map.has(key)) {
      map.set(key, []);
      order.push(key);
    }
    map.get(key)!.push({
      question: pickCms(row.question, ""),
      answer: pickCms(row.answer, ""),
    });
  }
  return order.map((key) => ({
    heading: FAQ_CATEGORY_HEADINGS[key] ?? key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    items: map.get(key)!,
  }));
}

type FaqPageProps = {
  sanityFaqItems?: SanityFaqItemDoc[] | null;
  sanityFaqListing?: SanityFaqListingPageDoc | null;
};

const FaqPage: React.FC<FaqPageProps> = ({ sanityFaqItems = null, sanityFaqListing = null }) => {
  const isCompactLayout = useIsCompactLayout();
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [openItemIndex, setOpenItemIndex] = useState(0);

  const displayGroups = useMemo(() => {
    if (sanityFaqItems && sanityFaqItems.length > 0) return faqGroupsFromSanity(sanityFaqItems);
    return faqGroups;
  }, [sanityFaqItems]);

  const faqHeroBg = pickCmsImageUrl(sanityFaqListing?.heroBackground?.asset?.url, heroBg2);
  const faqEyebrow = pickCms(sanityFaqListing?.eyebrow, "FAQ");
  const faqPageTitle = pickCms(sanityFaqListing?.pageTitle, "Frequently asked questions");
  const faqIntro = pickCms(sanityFaqListing?.intro, "Select a service category to view only that FAQ set.");

  const activeGroup = displayGroups[activeGroupIndex] ?? displayGroups[0];

  if (!activeGroup) {
    return (
      <PageFrame pageSlug="faq" pageTitle="FAQ | Fable Face Paint">
        <div style={{ padding: 40, textAlign: "center" }}>No FAQ content yet.</div>
      </PageFrame>
    );
  }

  return (
    <PageFrame pageSlug="faq" pageTitle="FAQ | Fable Face Paint">
      <div style={{ maxWidth: contentMaxWidth, margin: "0 auto", padding: "0 18px 34px" }}>
        <section
          style={{
            width: "100vw",
            marginLeft: "calc(50% - 50vw)",
            marginRight: "calc(50% - 50vw)",
            backgroundImage: `linear-gradient(108deg, rgba(8,12,18,0.86) 0%, rgba(8,12,18,0.64) 48%, rgba(8,12,18,0.82) 100%), url("${encodePublicAssetPath(faqHeroBg)}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderBottom: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <div
            style={{
              maxWidth: contentMaxWidth,
              margin: "0 auto",
              padding: isCompactLayout ? "42px 22px 36px" : "56px 22px 46px",
              display: "grid",
              gap: 12,
              color: "#FFFFFF",
              justifyItems: "center",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.72, fontFamily: uiFont }}>{faqEyebrow}</div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2.2rem, 4.1vw, 4rem)",
                lineHeight: 0.98,
                fontWeight: 950,
                fontFamily: titleFont,
              }}
            >
              {faqPageTitle}
            </h1>
            <p style={{ margin: 0, maxWidth: 820, fontSize: "clamp(0.98rem, 1.18vw, 1.08rem)", lineHeight: 1.62, color: "rgba(242,247,252,0.9)" }}>
              {faqIntro}
            </p>
          </div>
        </section>

        <section
          style={{
            padding: isCompactLayout ? "22px 0 24px" : "28px 0 32px",
            display: "grid",
            gridTemplateColumns: isCompactLayout ? "1fr" : "minmax(260px, 0.42fr) minmax(0, 0.58fr)",
            gap: 16,
            alignItems: "start",
          }}
        >
          <aside
            style={{
              display: "grid",
              gap: 10,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(6,12,18,0.54)",
              boxShadow: "0 14px 28px rgba(0,0,0,0.24)",
              padding: "10px",
            }}
          >
            {displayGroups.map((group, groupIndex) => {
              const selected = groupIndex === activeGroupIndex;
              return (
                <button
                  key={`${group.heading}-${groupIndex}`}
                  type="button"
                  onClick={() => {
                    setActiveGroupIndex(groupIndex);
                    setOpenItemIndex(0);
                  }}
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    borderRadius: 14,
                    border: selected ? "1px solid rgba(211,74,168,0.74)" : "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(24,30,38,0.92)",
                    boxShadow: selected ? "0 0 0 1px rgba(211,74,168,0.35), 0 8px 20px rgba(0,0,0,0.18)" : "0 8px 18px rgba(0,0,0,0.15)",
                    color: "#FFFFFF",
                    textAlign: "left",
                    padding: "12px 12px 11px",
                    display: "grid",
                    gap: 3,
                  }}
                >
                  <span style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.65rem)", lineHeight: 1.04, fontWeight: 900, fontFamily: titleFont }}>{group.heading}</span>
                  <span style={{ fontSize: 12, opacity: 0.72, fontFamily: uiFont }}>
                    {group.items.length} {group.items.length === 1 ? "question" : "questions"}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      opacity: 0.74,
                      fontFamily: uiFont,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {group.items[0]?.question ?? ""}
                  </span>
                </button>
              );
            })}
          </aside>

          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontSize: "clamp(2rem, 3vw, 3.1rem)", lineHeight: 1.02, fontWeight: 950, fontFamily: titleFont }}>{activeGroup.heading}</div>

            <div style={{ display: "grid", gap: 10 }}>
              {activeGroup.items.map((item, itemIndex) => {
                const open = openItemIndex === itemIndex;
                return (
                  <div
                    key={`${activeGroup.heading}-${itemIndex}-${item.question}`}
                    data-native-cursor="true"
                    style={{
                      borderRadius: 16,
                      border: open ? "1px solid rgba(211,74,168,0.70)" : "1px solid rgba(255,255,255,0.16)",
                      background: "rgba(24,30,38,0.92)",
                      boxShadow: "0 10px 24px rgba(0,0,0,0.2)",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenItemIndex((current) => (current === itemIndex ? -1 : itemIndex))}
                      style={{
                        width: "100%",
                        border: "none",
                        background: "transparent",
                        color: "#FFFFFF",
                        cursor: "pointer",
                        textAlign: "left",
                        padding: "12px 14px",
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 999,
                          border: open ? "1px solid rgba(211,74,168,0.8)" : "1px solid rgba(255,255,255,0.24)",
                          display: "grid",
                          placeItems: "center",
                          lineHeight: 1,
                          fontSize: 16,
                          marginTop: 1,
                          flexShrink: 0,
                          color: open ? "#F2B4DD" : "#FFFFFF",
                        }}
                      >
                        {open ? "−" : "+"}
                      </span>
                      <span style={{ fontSize: "clamp(1.15rem, 1.52vw, 2rem)", lineHeight: 1.2, fontFamily: titleFont, fontWeight: 900 }}>{item.question}</span>
                    </button>

                    {open ? (
                      <div style={{ padding: "0 14px 14px 48px", fontSize: "clamp(0.96rem, 1.04vw, 1.1rem)", lineHeight: 1.6, opacity: 0.92 }}>{item.answer}</div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </PageFrame>
  );
};

export default FaqPage;
