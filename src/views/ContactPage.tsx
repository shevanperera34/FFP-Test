"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PageFrame, {
  HoverButton,
  HoneyBookEmbed,
  canonicalPathBySlug,
  contentMaxWidth,
  titleFont,
  uiFont,
  unifiedDarkButtonHover,
  unifiedHoverTransition,
  useIsCompactLayout,
} from "../components/PageFrame";
import heroBg2 from "../assets/images/hero-bg2.png";
import { encodePublicAssetPath } from "../utils/encodePublicAssetPath";
import { pickCms } from "@/lib/sanity/pickCms";
import type { SanityContactPageDoc } from "@/lib/sanity/siteQueries";

const defaultHeroEyebrow = "Book an artist now";
const defaultHeroTitle = "Looking to book face painters in Toronto?";
const defaultHeroIntro =
  "Request a date for Fable Face Paint—small parties, corporate events, and large activations across the GTA. Pick the path that fits your event; you’ll get a clear funnel and fast replies.";
const defaultSmallTitle = "Birthday / Private Party";
const defaultSmallBody =
  "For birthdays and intimate celebrations where premium design quality is the priority.";
const defaultLargeTitle = "Corporate / Public Events";
const defaultLargeBody =
  "For activations, festivals, and higher guest volume where throughput and structure are critical.";
const defaultUnsureHelper =
  "Not sure which option fits? Share a few details and we’ll guide you to the best booking path.";

type ContactPageProps = {
  sanityContact?: SanityContactPageDoc | null;
};

const ContactPage: React.FC<ContactPageProps> = ({ sanityContact = null }) => {
  const router = useRouter();
  const isCompactLayout = useIsCompactLayout();
  const [showUnsureForm, setShowUnsureForm] = useState(false);

  const heroEyebrow = pickCms(sanityContact?.eyebrow, defaultHeroEyebrow);
  const heroTitle = pickCms(sanityContact?.pageTitle, defaultHeroTitle);
  const heroIntro = pickCms(sanityContact?.intro, defaultHeroIntro);
  const smallCardTitle = pickCms(sanityContact?.smallCardTitle, defaultSmallTitle);
  const smallCardBody = pickCms(sanityContact?.smallCardBody, defaultSmallBody);
  const largeCardTitle = pickCms(sanityContact?.largeCardTitle, defaultLargeTitle);
  const largeCardBody = pickCms(sanityContact?.largeCardBody, defaultLargeBody);
  const unsureHelper = pickCms(sanityContact?.unsureHelper, defaultUnsureHelper);

  return (
    <PageFrame pageSlug="contact" pageTitle="Book an Artist Now | Fable Face Paint">
      <div style={{ maxWidth: contentMaxWidth, margin: "0 auto", padding: "0 18px 34px" }}>
        <section
          style={{
            width: "100vw",
            marginLeft: "calc(50% - 50vw)",
            marginRight: "calc(50% - 50vw)",
            backgroundImage: `linear-gradient(108deg, rgba(8,12,18,0.84) 0%, rgba(8,12,18,0.62) 48%, rgba(8,12,18,0.80) 100%), url("${encodePublicAssetPath(heroBg2)}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              maxWidth: contentMaxWidth,
              margin: "0 auto",
              padding: isCompactLayout ? "44px 22px 34px" : "58px 22px 46px",
              display: "grid",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.74, fontFamily: uiFont }}>{heroEyebrow}</div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2.2rem, 4.2vw, 4.2rem)",
                lineHeight: 0.98,
                fontWeight: 950,
                fontFamily: titleFont,
                maxWidth: 860,
              }}
            >
              {heroTitle}
            </h1>
            <p style={{ margin: 0, maxWidth: 820, fontSize: "clamp(0.98rem, 1.18vw, 1.1rem)", lineHeight: 1.62, color: "rgba(242,247,252,0.92)" }}>
              {heroIntro}
            </p>
          </div>
        </section>

        <section style={{ padding: isCompactLayout ? "24px 0 12px" : "30px 0 16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isCompactLayout ? "1fr" : "minmax(0, 1fr) auto minmax(0, 1fr)",
              gap: 14,
              alignItems: "start",
            }}
          >
            <div
              data-native-cursor="true"
              style={{
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(6,12,18,0.50)",
                boxShadow: "0 14px 28px rgba(0,0,0,0.24)",
                padding: "18px 16px",
                display: "grid",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 12, letterSpacing: "0.11em", textTransform: "uppercase", opacity: 0.72, fontFamily: uiFont }}>Small Events</div>
              <div style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)", lineHeight: 1.02, fontWeight: 950, fontFamily: titleFont }}>{smallCardTitle}</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, opacity: 0.9 }}>{smallCardBody}</p>
              <HoverButton
                onClick={() => router.push(canonicalPathBySlug.birthdays)}
                style={{
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 12,
                  padding: "10px 14px",
                  fontWeight: 800,
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  background: "rgba(255,255,255,0.06)",
                  color: "#FFFFFF",
                  fontFamily: uiFont,
                  transition: unifiedHoverTransition,
                }}
                hoverStyle={unifiedDarkButtonHover}
              >
                View Small Events
              </HoverButton>
              <HoneyBookEmbed kind="privateParty" embedId="HB_PRIVATE_PARTY_FORM_ID" tag="private_party" />
            </div>

            <div
              style={{
                alignSelf: isCompactLayout ? "stretch" : "center",
                justifySelf: "center",
                display: "grid",
                width: isCompactLayout ? "100%" : "auto",
              }}
            >
              <HoverButton
                onClick={() => setShowUnsureForm((current) => !current)}
                style={{
                  cursor: "pointer",
                  border: "1px solid #931C62",
                  borderRadius: 12,
                  padding: "10px 14px",
                  fontWeight: 800,
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  background: showUnsureForm ? "#931C62" : "rgba(255,255,255,0.06)",
                  color: "#FFFFFF",
                  fontFamily: uiFont,
                  transition: unifiedHoverTransition,
                  minWidth: isCompactLayout ? undefined : 132,
                }}
                hoverStyle={unifiedDarkButtonHover}
              >
                {"I'm Not Sure"}
              </HoverButton>
            </div>

            <div
              data-native-cursor="true"
              style={{
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(6,12,18,0.50)",
                boxShadow: "0 14px 28px rgba(0,0,0,0.24)",
                padding: "18px 16px",
                display: "grid",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 12, letterSpacing: "0.11em", textTransform: "uppercase", opacity: 0.72, fontFamily: uiFont }}>Large Events</div>
              <div style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)", lineHeight: 1.02, fontWeight: 950, fontFamily: titleFont }}>{largeCardTitle}</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, opacity: 0.9 }}>{largeCardBody}</p>
              <HoverButton
                onClick={() => router.push(canonicalPathBySlug.corporate)}
                style={{
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 12,
                  padding: "10px 14px",
                  fontWeight: 800,
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  background: "rgba(255,255,255,0.06)",
                  color: "#FFFFFF",
                  fontFamily: uiFont,
                  transition: unifiedHoverTransition,
                }}
                hoverStyle={unifiedDarkButtonHover}
              >
                View Large Events
              </HoverButton>
              <HoneyBookEmbed kind="corporate" embedId="HB_CORPORATE_FORM_ID" tag="corporate" />
            </div>
          </div>
        </section>

        {showUnsureForm ? (
          <section style={{ padding: isCompactLayout ? "8px 0 6px" : "12px 0 8px", display: "grid", gap: 12 }}>
            <div style={{ display: "grid", gap: 6, textAlign: "center", justifyItems: "center" }}>
              <h2 style={{ margin: 0, fontSize: "clamp(1.8rem, 2.8vw, 2.9rem)", lineHeight: 1.02, fontWeight: 950, fontFamily: titleFont }}>General Inquiry</h2>
              <p style={{ margin: 0, maxWidth: 780, fontSize: "clamp(0.96rem, 1.12vw, 1.03rem)", lineHeight: 1.58, opacity: 0.9 }}>{unsureHelper}</p>
            </div>

          <div
            data-native-cursor="true"
            style={{
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(6,12,18,0.50)",
              boxShadow: "0 14px 28px rgba(0,0,0,0.24)",
              padding: "16px",
              display: "grid",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 12, letterSpacing: "0.11em", textTransform: "uppercase", opacity: 0.72, fontFamily: uiFont }}>Not Sure Yet</div>
            <form
              onSubmit={(event) => event.preventDefault()}
              style={{
                display: "grid",
                gap: 10,
                gridTemplateColumns: isCompactLayout ? "1fr" : "repeat(2, minmax(0, 1fr))",
              }}
            >
              <input
                type="text"
                placeholder="Full name"
                style={{
                  width: "100%",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#FFFFFF",
                  padding: "10px 12px",
                  fontSize: 14,
                  fontFamily: uiFont,
                }}
              />
              <input
                type="email"
                placeholder="Email"
                style={{
                  width: "100%",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#FFFFFF",
                  padding: "10px 12px",
                  fontSize: 14,
                  fontFamily: uiFont,
                }}
              />
              <input
                type="text"
                placeholder="Event date (optional)"
                style={{
                  width: "100%",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#FFFFFF",
                  padding: "10px 12px",
                  fontSize: 14,
                  fontFamily: uiFont,
                }}
              />
              <input
                type="text"
                placeholder="Estimated guest count"
                style={{
                  width: "100%",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#FFFFFF",
                  padding: "10px 12px",
                  fontSize: 14,
                  fontFamily: uiFont,
                }}
              />
              <textarea
                placeholder="Tell us a bit about your event"
                rows={4}
                style={{
                  gridColumn: isCompactLayout ? "auto" : "1 / -1",
                  width: "100%",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#FFFFFF",
                  padding: "10px 12px",
                  fontSize: 14,
                  fontFamily: uiFont,
                  resize: "vertical",
                }}
              />
              <button
                type="submit"
                style={{
                  gridColumn: isCompactLayout ? "auto" : "1 / -1",
                  cursor: "pointer",
                  border: "1px solid #931C62",
                  borderRadius: 12,
                  padding: "11px 14px",
                  fontWeight: 800,
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  background: "#931C62",
                  color: "#FFFFFF",
                  fontFamily: uiFont,
                  transition: unifiedHoverTransition,
                }}
              >
                Submit General Inquiry (mock)
              </button>
            </form>
          </div>
          </section>
        ) : null}
      </div>
    </PageFrame>
  );
};

export default ContactPage;
