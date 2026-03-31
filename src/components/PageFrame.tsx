"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import grenzeBold from "../assets/fonts/Grenze/Grenze-Bold.ttf";
import grenzeSemiBold from "../assets/fonts/Grenze/Grenze-SemiBold.ttf";
import unifrakturCookBold from "../assets/fonts/UnifrakturCook-Bold.ttf";
import heroBgMain from "../assets/images/hero-bg-main.png";
import heroBg2 from "../assets/images/hero-bg2.png";
import heroBgPink from "../assets/images/hero-bg-pink.png";
import logoMain from "../assets/My Logos and PFPs/Logo - fable face paint (1).png";
import mossBackground from "../assets/Website Photos etc_/moss-5619857_1920.jpg";
import IkigaiFooter from "./IkigaiFooter";
import type { BundledImageSrc } from "../utils/encodePublicAssetPath";

function bundledSrc(src: BundledImageSrc): string {
  return typeof src === "string" ? src : src.src;
}

export type PageSlug =
  | "home"
  | "birthdays"
  | "corporate"
  | "services"
  | "gallery"
  | "about"
  | "faq"
  | "contact";

export type PageBackgroundAssetKey = "siteAmbient" | "homeHeroBg2" | "smallEventsHeroBgPink";

export type PageBackground = {
  assetKey?: PageBackgroundAssetKey;
  color?: string;
  overlay?: string;
  size?: string;
  position?: string;
  repeat?: string;
  attachment?: "scroll" | "fixed";
};

export const brand = {
  name: "Fable Face Paint",
  tagline: "Magical artistry. Professional execution.",
  colors: {
    forest: "#0F2A1D",
    lilac: "#EDE6F7",
    magenta: "#D34AA8",
    ink: "#0B0B0B",
    paper: "#FFFFFF",
  },
};

export const uiFont = '"Germania One", serif';
export const titleFont = '"Grenze", serif';
export const servicesHeadingFont = '"Grenze SemiBold", serif';
export const contentMaxWidth = 1180;

export const unifiedHoverTransition =
  "transform 0.22s ease, background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, color 0.22s ease, opacity 0.22s ease";

export const unifiedDarkButtonHover: React.CSSProperties = {
  transform: "translateY(-1px)",
  background: "#931C62",
  boxShadow: "0 14px 36px rgba(147, 28, 98, 0.32)",
  color: "#FFFFFF",
  opacity: 1,
};

export const unifiedLightButtonHover: React.CSSProperties = {
  transform: "translateY(-1px)",
  background: "#D34AA8",
  boxShadow: "0 14px 30px rgba(211,74,168,0.30)",
  color: "#FFFFFF",
  opacity: 1,
};

export const unifiedTextButtonHover: React.CSSProperties = {
  transform: "translateY(-1px)",
  background: "#931C62",
  boxShadow: "0 10px 28px rgba(147, 28, 98, 0.22)",
  color: "#FFFFFF",
  opacity: 1,
};

export const unifiedBookButtonHover: React.CSSProperties = {
  transform: "scale(1.04)",
  opacity: 1,
};

const navTextGlowHover: React.CSSProperties = {
  color: "#F2B4DD",
  opacity: 1,
  textShadow: "0 0 10px rgba(211,74,168,0.65), 0 0 22px rgba(211,74,168,0.35)",
};

const defaultSiteBackground: Required<Pick<PageBackground, "color" | "size" | "position" | "repeat" | "attachment">> & {
  image: string;
  overlay: string;
} = {
  color: brand.colors.forest,
  image: bundledSrc(heroBgMain),
  overlay: `radial-gradient(1100px 650px at 30% 0%, rgba(211,74,168,0.18), transparent 62%),
             radial-gradient(900px 520px at 90% 12%, rgba(237,230,247,0.12), transparent 60%)`,
  size: "cover",
  position: "center",
  repeat: "no-repeat",
  attachment: "fixed",
};

const pageBackgroundAssets = {
  siteAmbient: bundledSrc(heroBgMain),
  homeHeroBg2: bundledSrc(heroBg2),
  smallEventsHeroBgPink: bundledSrc(heroBgPink),
} as const;

const navItems: Array<{ slug: PageSlug; label: string }> = [
  { slug: "home", label: "Home" },
  { slug: "birthdays", label: "Small Events" },
  { slug: "corporate", label: "Large Events" },
  { slug: "services", label: "Services" },
  { slug: "gallery", label: "Gallery" },
  { slug: "about", label: "About" },
  { slug: "faq", label: "FAQ" },
];

const defaultPageTitleBySlug: Record<PageSlug, string> = {
  home: "Fable Face Paint",
  birthdays: "Small Events | Fable Face Paint",
  corporate: "Large Events | Fable Face Paint",
  services: "Services | Fable Face Paint",
  gallery: "Gallery | Fable Face Paint",
  about: "About Us | Fable Face Paint",
  faq: "FAQ | Fable Face Paint",
  contact: "Book an Artist Now | Fable Face Paint",
};

export const canonicalPathBySlug: Record<PageSlug, string> = {
  home: "/",
  birthdays: "/small-events",
  corporate: "/large-events",
  services: "/services",
  gallery: "/gallery",
  about: "/about",
  faq: "/faq",
  contact: "/contact",
};

type TrackPayload = Record<string, string | number | boolean | null | undefined>;

type WindowWithPosthog = Window & {
  posthog?: { capture: (e: string, p: Record<string, unknown>) => void };
};

export function track(event: string, payload?: TrackPayload) {
  if (typeof window !== "undefined") {
    const w = window as WindowWithPosthog;
    if (w.posthog?.capture) {
      w.posthog.capture(event, (payload ?? {}) as Record<string, unknown>);
      return;
    }
  }
  console.log("[track]", event, payload ?? {});
}

export function useIsCompactLayout() {
  const [isCompactLayout, setIsCompactLayout] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncLayout = () => {
      setIsCompactLayout(window.innerWidth < 980);
    };

    syncLayout();
    window.addEventListener("resize", syncLayout);

    return () => window.removeEventListener("resize", syncLayout);
  }, []);

  return isCompactLayout;
}

export function HoverButton({
  children,
  onClick,
  style,
  hoverStyle,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style: React.CSSProperties;
  hoverStyle?: React.CSSProperties;
  ariaLabel?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={ariaLabel}
      style={{
        ...style,
        ...(hovered ? hoverStyle : {}),
      }}
    >
      {children}
    </button>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      data-native-cursor="true"
      style={{
        borderRadius: 18,
        padding: 22,
        background: "rgba(255,255,255,0.92)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        border: "1px solid rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SectionWrap({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ maxWidth: contentMaxWidth, margin: "0 auto", padding: "38px 22px" }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: 20, display: "grid", gap: 8 }}>
          {title && <div style={{ fontSize: 24, fontWeight: 900, color: brand.colors.paper, fontFamily: titleFont }}>{title}</div>}
          {subtitle && <div style={{ fontSize: 15, lineHeight: 1.65, opacity: 0.9, color: "rgba(255,255,255,0.88)" }}>{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

export function SmallEventsSection({
  backgroundImage,
  children,
  padding = "38px 22px",
  disableWhiteOverlay = false,
}: {
  backgroundImage: string;
  children: React.ReactNode;
  padding?: string;
  disableWhiteOverlay?: boolean;
}) {
  return (
    <div
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        backgroundImage: disableWhiteOverlay
          ? `url(${backgroundImage})`
          : `linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.12) 100%), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          maxWidth: contentMaxWidth,
          margin: "0 auto",
          padding,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function HoneyBookEmbed({ kind, embedId, tag }: { kind: "privateParty" | "corporate"; embedId: string; tag: string }) {
  useEffect(() => {
    track("form_view", { kind, tag });
  }, [kind, tag]);

  return (
    <Card style={{ background: "#F2F0EE" }}>
      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ fontWeight: 950, fontSize: 16, color: brand.colors.ink }}>
          {kind === "corporate" ? "Corporate Inquiry (HoneyBook)" : "Private Party Inquiry (HoneyBook)"}
        </div>
        <div style={{ fontSize: 13, opacity: 0.85, color: brand.colors.ink }}>
          Embed ID: <b>{embedId}</b> | Tag: <b>{tag}</b>
        </div>
        <div style={{ fontSize: 13, opacity: 0.85, color: brand.colors.ink }}>
          Replace this block with the real HoneyBook embed snippet. This is just the structure.
        </div>
        <HoverButton
          onClick={() => track("form_submit_mock", { kind, tag })}
          style={{
            cursor: "pointer",
            borderRadius: 12,
            border: "none",
            padding: "12px 14px",
            fontWeight: 900,
            fontFamily: uiFont,
            background: brand.colors.magenta,
            color: brand.colors.paper,
            boxShadow: "0 10px 24px rgba(211,74,168,0.20)",
            transition: unifiedHoverTransition,
          }}
          hoverStyle={unifiedLightButtonHover}
        >
          Submit (mock)
        </HoverButton>
      </div>
    </Card>
  );
}

type GlitterSpark = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  life: number;
  rotation: number;
  color: string;
};

function CursorGlitterTrail() {
  const [enabled, setEnabled] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const [sparkles, setSparkles] = useState<GlitterSpark[]>([]);
  const [nativeCursorZone, setNativeCursorZone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const syncEnabled = () => setEnabled(mediaQuery.matches);

    syncEnabled();
    mediaQuery.addEventListener("change", syncEnabled);

    return () => mediaQuery.removeEventListener("change", syncEnabled);
  }, []);

  useEffect(() => {
    if (!enabled || typeof document === "undefined") return;

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-cursor-glitter", "true");
    styleEl.textContent = `
      button,
      a,
      input,
      textarea,
      select,
      [role="button"] {
        cursor: pointer !important;
      }

      [data-native-cursor="true"],
      [data-native-cursor="true"] * {
        cursor: auto !important;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const palette = ["#ffffff", "#f4c3e8", "#f7d8ff", "#fde68a"];
    let animationFrame = 0;
    let sparkleId = 0;
    let lastSpawn = 0;
    let previousTime = performance.now();

    const spawnSparkles = (x: number, y: number) => {
      const nextSparkles = Array.from({ length: 3 }, () => ({
        id: sparkleId++,
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        dx: (Math.random() - 0.5) * 1.6,
        dy: Math.random() * -1.2 - 0.2,
        size: Math.random() * 8 + 4,
        life: 1,
        rotation: Math.random() * 360,
        color: palette[Math.floor(Math.random() * palette.length)],
      }));

      setSparkles((current) => [...nextSparkles, ...current].slice(0, 36));
    };

    const handleMove = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const isNativeZone = Boolean(target?.closest('[data-native-cursor="true"], button, a, input, textarea, select, [role="button"]'));

      setNativeCursorZone(isNativeZone);
      setCursor({ x: event.clientX, y: event.clientY, visible: !isNativeZone });

      if (isNativeZone) {
        setSparkles([]);
        return;
      }

      const now = performance.now();
      if (now - lastSpawn > 14) {
        spawnSparkles(event.clientX, event.clientY);
        lastSpawn = now;
      }
    };

    const handleLeave = () => setCursor((current) => ({ ...current, visible: false }));

    const tick = (time: number) => {
      const delta = Math.min((time - previousTime) / 16.67, 2);
      previousTime = time;

      setSparkles((current) =>
        current
          .map((sparkle) => ({
            ...sparkle,
            x: sparkle.x + sparkle.dx * delta,
            y: sparkle.y + sparkle.dy * delta + 0.18 * delta,
            life: sparkle.life - 0.045 * delta,
            rotation: sparkle.rotation + 4 * delta,
          }))
          .filter((sparkle) => sparkle.life > 0.02)
      );

      animationFrame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          style={{
            position: "fixed",
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            borderRadius: 999,
            opacity: sparkle.life,
            transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg) scale(${0.65 + sparkle.life * 0.8})`,
            background: `radial-gradient(circle, ${sparkle.color} 0%, rgba(255,255,255,0.92) 42%, rgba(255,255,255,0) 74%)`,
            boxShadow: `0 0 ${8 + sparkle.size}px rgba(242, 180, 221, ${sparkle.life * 0.45})`,
            mixBlendMode: "screen",
          }}
        />
      ))}

      {cursor.visible && !nativeCursorZone ? (
        <>
          <div
            style={{
              position: "fixed",
              left: cursor.x,
              top: cursor.y,
              width: 26,
              height: 26,
              transform: "translate(-50%, -50%)",
              borderRadius: 999,
              border: "1px solid rgba(244,195,232,0.65)",
              background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(211,74,168,0.12) 52%, rgba(211,74,168,0) 76%)",
              boxShadow: "0 0 20px rgba(211,74,168,0.32)",
            }}
          />
          <div
            style={{
              position: "fixed",
              left: cursor.x,
              top: cursor.y,
              width: 7,
              height: 7,
              transform: "translate(-50%, -50%)",
              borderRadius: 999,
              background: "#FFFFFF",
              boxShadow: "0 0 14px rgba(255,255,255,0.85), 0 0 24px rgba(211,74,168,0.55)",
            }}
          />
        </>
      ) : null}
    </div>
  );
}

function getPageShellBackground(pageSlug: PageSlug, background?: PageBackground) {
  if (pageSlug === "services" || pageSlug === "birthdays") {
    return {
      backgroundColor: "#12161D",
      backgroundImage: "none",
      backgroundSize: undefined,
      backgroundPosition: undefined,
      backgroundRepeat: undefined,
      backgroundAttachment: "scroll" as const,
    };
  }

  const backgroundAsset = background?.assetKey ? pageBackgroundAssets[background.assetKey] : defaultSiteBackground.image;
  const backgroundLayers = [background?.overlay ?? defaultSiteBackground.overlay, `url(${backgroundAsset})`].filter(Boolean);

  return {
    backgroundColor: background?.color ?? defaultSiteBackground.color,
    backgroundImage: backgroundLayers.join(", "),
    backgroundSize: background?.size ?? defaultSiteBackground.size,
    backgroundPosition: background?.position ?? defaultSiteBackground.position,
    backgroundRepeat: background?.repeat ?? defaultSiteBackground.repeat,
    backgroundAttachment: background?.attachment ?? defaultSiteBackground.attachment,
  };
}

type PageFrameProps = {
  pageSlug: PageSlug;
  children: React.ReactNode;
  backgroundOverride?: PageBackground;
  pageTitle?: string;
};

export default function PageFrame({ pageSlug, children, backgroundOverride, pageTitle }: PageFrameProps) {
  const router = useRouter();

  const setCurrent = useCallback(
    (next: PageSlug) => {
      const target = canonicalPathBySlug[next] ?? "/";
      if (next !== pageSlug) {
        router.push(target);
      }
    },
    [router, pageSlug]
  );

  const [navCondensed, setNavCondensed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isCompactLayout = useIsCompactLayout();

  useEffect(() => {
    if (typeof document === "undefined") return;

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-font", "unifraktur-cook");
    styleEl.textContent = `
      @font-face {
        font-family: "Grenze";
        src: url("${bundledSrc(grenzeBold)}") format("truetype");
        font-weight: 700;
        font-style: normal;
      }

      @font-face {
        font-family: "Grenze SemiBold";
        src: url("${bundledSrc(grenzeSemiBold)}") format("truetype");
        font-weight: 600;
        font-style: normal;
      }

      @font-face {
        font-family: "Unifraktur Cook";
        src: url("${bundledSrc(unifrakturCookBold)}") format("truetype");
        font-weight: 700;
        font-style: normal;
      }
    `;

    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = pageTitle ?? defaultPageTitleBySlug[pageSlug];
    }
    track("page_view", { slug: pageSlug });
  }, [pageSlug, pageTitle]);

  useEffect(() => {
    if (pageSlug !== "home") {
      setNavCondensed(false);
      return;
    }

    if (typeof window === "undefined") return;

    const syncNavCondensed = () => {
      const heroScrollThreshold = isCompactLayout ? window.innerHeight * 0.52 : 72;
      setNavCondensed(window.scrollY > heroScrollThreshold);
    };

    syncNavCondensed();
    window.addEventListener("scroll", syncNavCondensed, { passive: true });
    window.addEventListener("resize", syncNavCondensed);

    return () => {
      window.removeEventListener("scroll", syncNavCondensed);
      window.removeEventListener("resize", syncNavCondensed);
    };
  }, [pageSlug, isCompactLayout]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pageSlug]);

  useEffect(() => {
    if (!isCompactLayout) {
      setMobileMenuOpen(false);
    }
  }, [isCompactLayout]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!isCompactLayout) {
      document.body.style.removeProperty("overflow");
      return;
    }
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.removeProperty("overflow");
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [mobileMenuOpen, isCompactLayout]);

  const navAlt = pageSlug !== "home" || navCondensed;
  const pageShellBackground = getPageShellBackground(pageSlug, backgroundOverride);
  const navLogoHeight = isCompactLayout ? 40 : 50;
  const showCenterNavLogo = pageSlug === "home" ? navCondensed : true;
  const mobileNavReservedHeight = 72;
  const navBookButtonStyle: React.CSSProperties = {
    cursor: "pointer",
    border: "1px solid #931C62",
    borderRadius: 12,
    padding: isCompactLayout ? "9px 14px" : "14px 32px",
    minWidth: isCompactLayout ? undefined : 168,
    fontWeight: 700,
    fontSize: isCompactLayout ? 13 : 18,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    background: "#931C62",
    color: brand.colors.paper,
    fontFamily: uiFont,
    boxShadow: "0 10px 24px rgba(147, 28, 98, 0.22)",
    transform: "scale(1)",
    transition: unifiedHoverTransition,
  };

  const handleNavSelect = (next: PageSlug) => {
    setCurrent(next);
    setMobileMenuOpen(false);
  };

  return (
    <div
      className="ffp-site-shell"
      style={{
        minHeight: "100vh",
        backgroundColor: pageShellBackground.backgroundColor,
        backgroundImage: pageShellBackground.backgroundImage,
        backgroundSize: pageShellBackground.backgroundSize,
        backgroundPosition: pageShellBackground.backgroundPosition,
        backgroundRepeat: pageShellBackground.backgroundRepeat,
        backgroundAttachment: pageShellBackground.backgroundAttachment,
        color: brand.colors.paper,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <CursorGlitterTrail />

      <div
        style={{
          position: isCompactLayout ? "fixed" : "sticky",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 20,
          backdropFilter: isCompactLayout ? undefined : "blur(10px)",
          background: isCompactLayout ? "#050B16" : "rgba(15,42,29,0.72)",
          borderBottom: isCompactLayout ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.10)",
          ...(navAlt
            ? {
                background: isCompactLayout ? "#050B16" : "rgba(10,12,20,0.82)",
                borderBottom: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
              }
            : {}),
          transition: "background 240ms ease, border-color 240ms ease, box-shadow 240ms ease",
        }}
      >
        {isCompactLayout ? (
          <>
            <div style={{ maxWidth: contentMaxWidth, margin: "0 auto", padding: navAlt ? "10px 14px" : "12px 14px" }}>
              <div style={{ position: "relative", minHeight: 48, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <HoverButton
                  onClick={() => setMobileMenuOpen((open) => !open)}
                  style={{
                    cursor: "pointer",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 12,
                    width: 44,
                    height: 44,
                    background: "rgba(255,255,255,0.06)",
                    color: "#FFFFFF",
                    display: "grid",
                    placeItems: "center",
                    transition: unifiedHoverTransition,
                  }}
                  hoverStyle={unifiedDarkButtonHover}
                  ariaLabel={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  <span style={{ display: "grid", gap: 4 }}>
                    <span
                      style={{
                        width: 18,
                        height: 2,
                        borderRadius: 999,
                        background: "#FFFFFF",
                        transform: mobileMenuOpen ? "translateY(6px) rotate(45deg)" : "none",
                        transition: "transform 0.22s ease",
                      }}
                    />
                    <span
                      style={{
                        width: 18,
                        height: 2,
                        borderRadius: 999,
                        background: "#FFFFFF",
                        opacity: mobileMenuOpen ? 0 : 1,
                        transition: "opacity 0.2s ease",
                      }}
                    />
                    <span
                      style={{
                        width: 18,
                        height: 2,
                        borderRadius: 999,
                        background: "#FFFFFF",
                        transform: mobileMenuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
                        transition: "transform 0.22s ease",
                      }}
                    />
                  </span>
                </HoverButton>

                <HoverButton
                  onClick={() => handleNavSelect("home")}
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                    padding: 0,
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: showCenterNavLogo ? 0.97 : 0,
                    pointerEvents: showCenterNavLogo ? "auto" : "none",
                    transition: "opacity 0.28s ease, transform 0.28s ease",
                  }}
                  hoverStyle={{ ...unifiedTextButtonHover, background: "transparent", border: "none", boxShadow: "none", transform: "translateX(-50%) scale(1.03)" }}
                  ariaLabel="Go to home"
                >
                  <img
                    src={bundledSrc(logoMain)}
                    alt=""
                    style={{
                      height: 30,
                      width: "auto",
                      filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.40))",
                    }}
                  />
                </HoverButton>

                <HoverButton onClick={() => handleNavSelect("contact")} style={navBookButtonStyle} hoverStyle={{ ...unifiedBookButtonHover, transform: "scale(1.035)" }}>
                  Book
                </HoverButton>
              </div>
            </div>

            {mobileMenuOpen ? (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 38,
                  background: "#050712",
                  display: "grid",
                  gridTemplateRows: "auto 1fr",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    maxWidth: contentMaxWidth,
                    width: "100%",
                    margin: "0 auto",
                    padding: "12px 14px",
                    background: "#050B16",
                    borderBottom: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <div style={{ position: "relative", minHeight: 48, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <HoverButton
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        cursor: "pointer",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 12,
                        width: 44,
                        height: 44,
                        background: "rgba(255,255,255,0.08)",
                        color: "#FFFFFF",
                        display: "grid",
                        placeItems: "center",
                        transition: unifiedHoverTransition,
                      }}
                      hoverStyle={unifiedDarkButtonHover}
                      ariaLabel="Close menu"
                    >
                      <span style={{ display: "grid", gap: 4 }}>
                        <span style={{ width: 18, height: 2, borderRadius: 999, background: "#FFFFFF", transform: "translateY(6px) rotate(45deg)" }} />
                        <span style={{ width: 18, height: 2, borderRadius: 999, background: "#FFFFFF", opacity: 0 }} />
                        <span style={{ width: 18, height: 2, borderRadius: 999, background: "#FFFFFF", transform: "translateY(-6px) rotate(-45deg)" }} />
                      </span>
                    </HoverButton>

                    <img
                      src={bundledSrc(logoMain)}
                      alt=""
                      style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        height: 30,
                        width: "auto",
                        opacity: 0.97,
                        filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.40))",
                      }}
                    />

                    <HoverButton onClick={() => handleNavSelect("contact")} style={navBookButtonStyle} hoverStyle={{ ...unifiedBookButtonHover, transform: "scale(1.035)" }}>
                      Book
                    </HoverButton>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: 12,
                    gridTemplateRows: `repeat(${navItems.length}, minmax(0, 1fr))`,
                    alignItems: "stretch",
                    padding: "16px 18px calc(22px + env(safe-area-inset-bottom))",
                    backgroundImage: `linear-gradient(180deg, rgba(8, 13, 22, 0.84) 0%, rgba(8, 13, 22, 0.90) 100%), url("${bundledSrc(mossBackground)}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: 0,
                  }}
                >
                  {navItems.map((p) => (
                    <HoverButton
                      key={p.slug}
                      onClick={() => handleNavSelect(p.slug)}
                      style={{
                        cursor: "pointer",
                        width: "100%",
                        border: p.slug === pageSlug ? "1px solid #931C62" : "1px solid rgba(255,255,255,0.16)",
                        borderRadius: 14,
                        background: p.slug === pageSlug ? "#931C62" : "#161E2D",
                        color: "#FFFFFF",
                        fontWeight: p.slug === pageSlug ? 900 : 800,
                        boxShadow: p.slug === pageSlug ? "0 14px 30px rgba(147, 28, 98, 0.34)" : "none",
                        padding: "10px 16px",
                        minHeight: 0,
                        height: "100%",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 22,
                        lineHeight: 1.1,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        fontFamily: uiFont,
                        textAlign: "center",
                        transition: unifiedHoverTransition,
                      }}
                      hoverStyle={unifiedDarkButtonHover}
                    >
                      {p.label}
                    </HoverButton>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div
            style={{
              width: "100%",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              ...(navAlt
                ? {
                    maxWidth: contentMaxWidth,
                    margin: "0 auto",
                    padding: "10px 18px",
                    gap: 16,
                    transition: "padding 240ms ease",
                  }
                : {}),
            }}
          >
            {navAlt ? (
              <HoverButton
                onClick={() => setCurrent("home")}
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  transition: unifiedHoverTransition,
                }}
                hoverStyle={{ ...unifiedTextButtonHover, background: "transparent", border: "none", boxShadow: "none", transform: "scale(1.03)" }}
                ariaLabel="Go to home"
              >
                <img
                  src={bundledSrc(logoMain)}
                  alt=""
                  style={{
                    height: navLogoHeight,
                    width: "auto",
                    opacity: 0.95,
                    filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.40))",
                  }}
                />
              </HoverButton>
            ) : null}

            <div
              style={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                ...(navAlt
                  ? {
                      width: "auto",
                      flex: 1,
                      justifyContent: "center",
                      gap: 14,
                    }
                  : {}),
              }}
            >
              {navItems.map((p) => (
                <HoverButton
                  key={p.slug}
                  onClick={() => setCurrent(p.slug)}
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                    color: p.slug === pageSlug ? brand.colors.paper : "rgba(255,255,255,0.80)",
                    fontWeight: p.slug === pageSlug ? 900 : 700,
                    padding: "8px 10px",
                    borderRadius: 999,
                    textDecoration: p.slug === pageSlug ? "underline" : "none",
                    textUnderlineOffset: 4,
                    fontSize: navAlt ? 16 : 18,
                    textTransform: "uppercase",
                    fontFamily: uiFont,
                    textShadow: "none",
                    transition: unifiedHoverTransition,
                  }}
                  hoverStyle={navTextGlowHover}
                >
                  {p.label}
                </HoverButton>
              ))}
            </div>

            {!navAlt ? <div style={{ flex: 1 }} /> : null}

            <HoverButton onClick={() => setCurrent("contact")} style={navBookButtonStyle} hoverStyle={{ ...unifiedBookButtonHover, transform: "scale(1.035)" }}>
              Book
            </HoverButton>
          </div>
        )}
      </div>

      {isCompactLayout ? <div aria-hidden style={{ height: mobileNavReservedHeight }} /> : null}

      {children}

      <IkigaiFooter onNavigate={setCurrent} brandName={brand.name} />
    </div>
  );
}
