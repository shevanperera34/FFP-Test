"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import mapFillToronto from "../assets/Gallery/image-asset 1.webp";
import mapFillPeel from "../assets/Gallery/image-asset 2.webp";
import mapFillHalton from "../assets/Gallery/image-asset 3.webp";
import mapFillYork from "../assets/Gallery/image-asset 4.webp";
import mapFillDurham from "../assets/Gallery/image-asset 5.webp";
import mapRegionDurham from "../assets/Map/Durham.png";
import mapRegionHalton from "../assets/Map/Halton.png";
import mapRegionPeel from "../assets/Map/Peel.png";
import mapRegionToronto from "../assets/Map/Toronto.png";
import mapRegionYork from "../assets/Map/York.png";
import { encodePublicAssetPath, type BundledImageSrc } from "../utils/encodePublicAssetPath";
import { titleFont, uiFont } from "./PageFrame";

type RegionId = "halton" | "peel" | "toronto" | "york" | "durham";

type RegionLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  labelX: string;
  labelY: string;
};

type TitleLayout = {
  x: number;
  y: number;
};

type RegionConfig = {
  id: RegionId;
  mapLabel: string;
  coverageLabel: string;
  color: string;
  accent: string;
  cities: string[];
  image: BundledImageSrc;
  mapAsset: BundledImageSrc;
  defaultLayout: RegionLayout;
};

const mapBaseWidth = 700;
const mapBaseHeight = 460;
const orderedRegionIds: RegionId[] = ["halton", "peel", "toronto", "york", "durham"];

const regions: RegionConfig[] = [
  {
    id: "halton",
    mapLabel: "Halton",
    coverageLabel: "Halton",
    color: "#A0B7CB",
    accent: "#48C5E5",
    cities: ["Oakville", "Milton", "Halton Hills"],
    image: mapFillHalton,
    mapAsset: mapRegionHalton,
    defaultLayout: {
      x: 118.2,
      y: 265,
      width: 148,
      height: 195,
      z: 1,
      labelX: "46%",
      labelY: "69%",
    },
  },
  {
    id: "peel",
    mapLabel: "Peel",
    coverageLabel: "Peel",
    color: "#88AA90",
    accent: "#72CEA4",
    cities: ["Mississauga", "Brampton", "Caledon", "Bolton", "Orangeville"],
    image: mapFillPeel,
    mapAsset: mapRegionPeel,
    defaultLayout: {
      x: 141.5,
      y: 222.4,
      width: 145,
      height: 169,
      z: 2,
      labelX: "54%",
      labelY: "60%",
    },
  },
  {
    id: "toronto",
    mapLabel: "Toronto",
    coverageLabel: "City Of Toronto",
    color: "#E54A24",
    accent: "#FF9258",
    cities: ["Toronto", "Etobicoke", "North York", "East York", "Scarborough"],
    image: mapFillToronto,
    mapAsset: mapRegionToronto,
    defaultLayout: {
      x: 264.7,
      y: 270.5,
      width: 131,
      height: 87,
      z: 3,
      labelX: "52%",
      labelY: "59%",
    },
  },
  {
    id: "york",
    mapLabel: "York",
    coverageLabel: "York",
    color: "#A9A28D",
    accent: "#D4CAB0",
    cities: ["Vaughan", "Richmond Hill", "Markham", "Stouffville", "King City", "Aurora", "New Market"],
    image: mapFillYork,
    mapAsset: mapRegionYork,
    defaultLayout: {
      x: 231.6,
      y: 142,
      width: 146,
      height: 157,
      z: 4,
      labelX: "50%",
      labelY: "56%",
    },
  },
  {
    id: "durham",
    mapLabel: "Durham",
    coverageLabel: "Durham",
    color: "#A98686",
    accent: "#D1A6A6",
    cities: ["Ajax"],
    image: mapFillDurham,
    mapAsset: mapRegionDurham,
    defaultLayout: {
      x: 343.1,
      y: 43.4,
      width: 218,
      height: 244,
      z: 5,
      labelX: "58%",
      labelY: "68%",
    },
  },
];

const regionById = regions.reduce<Record<RegionId, RegionConfig>>((acc, region) => {
  acc[region.id] = region;
  return acc;
}, {} as Record<RegionId, RegionConfig>);

function createInitialLayouts(): Record<RegionId, RegionLayout> {
  return regions.reduce<Record<RegionId, RegionLayout>>((acc, region) => {
    acc[region.id] = { ...region.defaultLayout };
    return acc;
  }, {} as Record<RegionId, RegionLayout>);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function buildLayoutSnippet(layouts: Record<RegionId, RegionLayout>, titleLayout: TitleLayout): string {
  return [
    `title: { x: ${round1(titleLayout.x)}, y: ${round1(titleLayout.y)} }`,
    ...orderedRegionIds
    .map((id) => {
      const l = layouts[id];
      return `${id}: { x: ${round1(l.x)}, y: ${round1(l.y)}, width: ${round1(l.width)}, height: ${round1(l.height)}, z: ${l.z}, labelX: "${l.labelX}", labelY: "${l.labelY}" }`;
    }),
  ].join("\n");
}

function RegionLayer({
  region,
  layout,
  isActive,
  isCompactLayout,
  isEditorEnabled,
  onActivate,
  onPointerDown,
}: {
  region: RegionConfig;
  layout: RegionLayout;
  isActive: boolean;
  isCompactLayout: boolean;
  isEditorEnabled: boolean;
  onActivate: () => void;
  onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => void;
}) {
  const mapAssetUrl = encodePublicAssetPath(region.mapAsset);
  const fillUrl = encodePublicAssetPath(region.image);

  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      onPointerDown={onPointerDown}
      style={{
        position: "absolute",
        left: `${(layout.x / mapBaseWidth) * 100}%`,
        top: `${(layout.y / mapBaseHeight) * 100}%`,
        width: `${(layout.width / mapBaseWidth) * 100}%`,
        height: `${(layout.height / mapBaseHeight) * 100}%`,
        zIndex: isActive ? layout.z + 1 : layout.z,
        border: "none",
        padding: 0,
        margin: 0,
        background: "transparent",
        cursor: isEditorEnabled ? "grab" : "pointer",
        transform: isActive && !isEditorEnabled ? "scale(1.012)" : "scale(1)",
        transformOrigin: "center center",
        transition: "transform 240ms ease, filter 240ms ease",
        filter: isActive ? "drop-shadow(0 12px 18px rgba(0,0,0,0.34))" : "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
      }}
      aria-label={region.mapLabel}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${mapAssetUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          opacity: isActive ? 0.1 : 1,
          transition: "opacity 220ms ease",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(130deg, rgba(255,255,255,0.14), rgba(0,0,0,0.42)), url(${fillUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isActive ? 1 : 0,
          transition: "opacity 240ms ease",
          WebkitMaskImage: `url(${mapAssetUrl})`,
          WebkitMaskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskImage: `url(${mapAssetUrl})`,
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          pointerEvents: "none",
        }}
      />

      {isEditorEnabled ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: isActive ? "1px dashed rgba(255,255,255,0.85)" : "1px dashed rgba(255,255,255,0.28)",
            borderRadius: 2,
            pointerEvents: "none",
          }}
        />
      ) : null}

      {(isActive || isEditorEnabled) ? (
        <div
          style={{
            position: "absolute",
            left: layout.labelX,
            top: layout.labelY,
            transform: "translate(-50%, -50%)",
            color: "#F7FBFF",
            fontFamily: titleFont,
            fontWeight: 900,
            fontSize: isCompactLayout ? 20 : 31,
            lineHeight: 1,
            textShadow: "0 2px 12px rgba(0,0,0,0.62)",
            letterSpacing: "0.01em",
            pointerEvents: "none",
          }}
        >
          {region.mapLabel}
        </div>
      ) : null}
    </button>
  );
}

export default function GtaServiceMap({ isCompactLayout }: { isCompactLayout: boolean }) {
  const [activeRegionId, setActiveRegionId] = useState<RegionId | null>("toronto");
  const [activeCity, setActiveCity] = useState<string>("Toronto");
  const [layouts, setLayouts] = useState<Record<RegionId, RegionLayout>>(() => createInitialLayouts());
  const [titleLayout, setTitleLayout] = useState<TitleLayout>({ x: 293.5, y: 27 });
  const [isEditorEnabled, setIsEditorEnabled] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const mapViewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setIsEditorEnabled(params.get("mapEdit") === "1");
  }, []);

  const sortedRegions = useMemo(() => {
    return [...regions].sort((a, b) => layouts[a.id].z - layouts[b.id].z);
  }, [layouts]);

  const layoutSnippet = useMemo(() => buildLayoutSnippet(layouts, titleLayout), [layouts, titleLayout]);

  const focusRegion = (regionId: RegionId, city?: string) => {
    setActiveRegionId(regionId);
    setActiveCity(city ?? regionById[regionId].cities[0] ?? "");
  };

  const clearActive = () => {
    setActiveRegionId(null);
    setActiveCity("");
  };

  const handleRegionDragStart = (regionId: RegionId, event: React.PointerEvent<HTMLButtonElement>) => {
    if (!isEditorEnabled) return;

    event.preventDefault();
    event.stopPropagation();
    setActiveRegionId(regionId);
    setActiveCity("");

    const mapRect = mapViewportRef.current?.getBoundingClientRect();
    if (!mapRect) return;

    const startClientX = event.clientX;
    const startClientY = event.clientY;
    const startLayout = layouts[regionId];

    const onMove = (moveEvent: PointerEvent) => {
      const deltaX = ((moveEvent.clientX - startClientX) / mapRect.width) * mapBaseWidth;
      const deltaY = ((moveEvent.clientY - startClientY) / mapRect.height) * mapBaseHeight;

      setLayouts((prev) => {
        const current = prev[regionId];
        const nextX = clamp(round1(startLayout.x + deltaX), 0, mapBaseWidth - current.width);
        const nextY = clamp(round1(startLayout.y + deltaY), 0, mapBaseHeight - current.height);
        if (nextX === current.x && nextY === current.y) return prev;
        return {
          ...prev,
          [regionId]: {
            ...current,
            x: nextX,
            y: nextY,
          },
        };
      });
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const handleCopyLayout = async () => {
    try {
      await navigator.clipboard.writeText(layoutSnippet);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    } finally {
      window.setTimeout(() => setCopyState("idle"), 1200);
    }
  };

  const resetLayout = () => {
    setLayouts(createInitialLayouts());
    setTitleLayout({ x: 293.5, y: 27 });
    clearActive();
  };

  const handleTitleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isEditorEnabled) return;

    event.preventDefault();
    event.stopPropagation();

    const mapRect = mapViewportRef.current?.getBoundingClientRect();
    if (!mapRect) return;

    const startClientX = event.clientX;
    const startClientY = event.clientY;
    const startLayout = titleLayout;

    const onMove = (moveEvent: PointerEvent) => {
      const deltaX = ((moveEvent.clientX - startClientX) / mapRect.width) * mapBaseWidth;
      const deltaY = ((moveEvent.clientY - startClientY) / mapRect.height) * mapBaseHeight;

      setTitleLayout({
        x: clamp(round1(startLayout.x + deltaX), 0, mapBaseWidth),
        y: clamp(round1(startLayout.y + deltaY), 0, mapBaseHeight),
      });
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isCompactLayout ? "1fr" : "minmax(0, 1.5fr) minmax(240px, 0.9fr)",
        gap: 12,
        alignItems: "stretch",
      }}
    >
      <div
        data-native-cursor="true"
        style={{
          display: "grid",
          gap: 12,
        }}
      >
        {isEditorEnabled ? (
          <div
            style={{
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(3,9,15,0.58)",
              padding: "8px 10px",
              display: "grid",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 11, fontFamily: uiFont, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.88 }}>Map Edit Mode</div>
            <div style={{ fontSize: 12, lineHeight: 1.45, opacity: 0.86 }}>
              Drag regions and the title directly on the map. Open this page with <code>?mapEdit=1</code> to keep editor mode enabled.
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={handleCopyLayout}
                style={{
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.28)",
                  background: "rgba(255,255,255,0.08)",
                  color: "#F2F7FD",
                  padding: "6px 11px",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  fontFamily: uiFont,
                  cursor: "pointer",
                }}
              >
                {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy Failed" : "Copy Layout"}
              </button>
              <button
                type="button"
                onClick={resetLayout}
                style={{
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#DCE9F7",
                  padding: "6px 11px",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  fontFamily: uiFont,
                  cursor: "pointer",
                }}
              >
                Reset
              </button>
            </div>
            <pre
              style={{
                margin: 0,
                fontSize: 10,
                lineHeight: 1.5,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(2,7,12,0.58)",
                padding: "8px",
                overflowX: "auto",
                color: "#DEEBFA",
              }}
            >
              {layoutSnippet}
            </pre>
          </div>
        ) : null}

        <div
          ref={mapViewportRef}
          onMouseLeave={() => {
            if (!isEditorEnabled) clearActive();
          }}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: `${mapBaseWidth}/${mapBaseHeight}`,
            overflow: "hidden",
          }}
        >
          <div
            onPointerDown={handleTitleDragStart}
            style={{
              position: "absolute",
              top: `${(titleLayout.y / mapBaseHeight) * 100}%`,
              left: `${(titleLayout.x / mapBaseWidth) * 100}%`,
              transform: "translate(-50%, -50%)",
              fontSize: isCompactLayout ? "clamp(2rem, 8.8vw, 3rem)" : "clamp(2rem, 3.4vw, 3.5rem)",
              lineHeight: 1.02,
              fontWeight: 950,
              fontFamily: titleFont,
              color: "#F0F4FB",
              textShadow: "0 6px 22px rgba(0,0,0,0.46)",
              whiteSpace: "nowrap",
              pointerEvents: isEditorEnabled ? "auto" : "none",
              cursor: isEditorEnabled ? "grab" : "default",
              userSelect: "none",
              zIndex: 30,
              border: isEditorEnabled ? "1px dashed rgba(255,255,255,0.55)" : "none",
              borderRadius: 8,
              padding: isEditorEnabled ? "4px 8px" : "0",
              background: isEditorEnabled ? "rgba(5,10,16,0.35)" : "transparent",
            }}
          >
            Serving all across the GTA
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: "rotate(20deg)",
              transformOrigin: "center center",
            }}
          >
            {sortedRegions.map((region) => (
              <RegionLayer
                key={region.id}
                region={region}
                layout={layouts[region.id]}
                isActive={region.id === activeRegionId}
                isCompactLayout={isCompactLayout}
                isEditorEnabled={isEditorEnabled}
                onActivate={() => focusRegion(region.id)}
                onPointerDown={(event) => handleRegionDragStart(region.id, event)}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        data-native-cursor="true"
        onMouseLeave={() => {
          if (!isEditorEnabled) clearActive();
        }}
        style={{
          borderRadius: 12,
          border: "1px solid rgba(160,190,230,0.24)",
          background:
            "radial-gradient(130% 110% at 100% 0%, rgba(46,151,126,0.1), rgba(46,151,126,0) 58%), radial-gradient(120% 120% at 0% 0%, rgba(83,123,196,0.14), rgba(83,123,196,0) 58%), rgba(7,14,22,0.5)",
          padding: isCompactLayout ? "10px" : "12px",
          display: "grid",
          gap: 12,
          alignContent: "start",
          alignSelf: "stretch",
          height: "100%",
        }}
      >
        <div style={{ fontSize: 12, letterSpacing: "0.11em", textTransform: "uppercase", opacity: 0.82, fontFamily: uiFont }}>City Coverage</div>

        {regions.map((region) => (
          <div key={`city-group-${region.id}`} style={{ display: "grid", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: region.color,
                  boxShadow: `0 0 0 1px ${region.accent}`,
                }}
              />
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: uiFont, opacity: 0.93 }}>
                {region.coverageLabel}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {region.cities.map((city) => {
                const active = city === activeCity;
                return (
                  <button
                    key={city}
                    type="button"
                    onMouseEnter={() => focusRegion(region.id, city)}
                    onFocus={() => focusRegion(region.id, city)}
                    onClick={() => focusRegion(region.id, city)}
                    style={{
                      cursor: "pointer",
                      borderRadius: 999,
                      border: active ? `1px solid ${region.accent}` : "1px solid rgba(221,232,243,0.28)",
                      background: active ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.05)",
                      color: active ? "#FFFFFF" : "rgba(237,244,252,0.93)",
                      boxShadow: active ? "0 8px 18px rgba(0,0,0,0.22)" : "none",
                      padding: "6px 10px",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.03em",
                      fontFamily: uiFont,
                      textTransform: "uppercase",
                      transition: "all 220ms ease",
                    }}
                  >
                    {city}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
