"use client";

import React from "react";
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

const ContactPage: React.FC = () => {
  const router = useRouter();
  const isCompactLayout = useIsCompactLayout();

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
            <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.74, fontFamily: uiFont }}>Book an artist now</div>
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
              Looking to book face painters in Toronto?
            </h1>
            <p style={{ margin: 0, maxWidth: 820, fontSize: "clamp(0.98rem, 1.18vw, 1.1rem)", lineHeight: 1.62, color: "rgba(242,247,252,0.92)" }}>
              Request a date for Fable Face Paint—small parties, corporate events, and large activations across the GTA. Pick the path that fits your event; you’ll get a clear funnel and fast replies.
            </p>
          </div>
        </section>

        <section style={{ padding: isCompactLayout ? "24px 0 12px" : "30px 0 16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isCompactLayout ? "1fr" : "repeat(2, minmax(0, 1fr))",
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
              <div style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)", lineHeight: 1.02, fontWeight: 950, fontFamily: titleFont }}>Birthday / Private Party</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, opacity: 0.9 }}>For birthdays and intimate celebrations where premium design quality is the priority.</p>
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
              <div style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)", lineHeight: 1.02, fontWeight: 950, fontFamily: titleFont }}>Corporate / Public Events</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, opacity: 0.9 }}>For activations, festivals, and higher guest volume where throughput and structure are critical.</p>
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
            </div>
          </div>
        </section>

        <section style={{ padding: isCompactLayout ? "8px 0 6px" : "12px 0 8px", display: "grid", gap: 12 }}>
          <HoneyBookEmbed kind="general" embedId="xEOtC5kzhFIudav6ugX8" tag="booking_request" />
        </section>
      </div>
    </PageFrame>
  );
};

export default ContactPage;
