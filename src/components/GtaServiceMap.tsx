"use client";

import React, { useMemo, useState } from "react";
import mapFillToronto from "../assets/Gallery/image-asset 1.webp";
import mapFillPeel from "../assets/Gallery/image-asset 2.webp";
import mapFillHalton from "../assets/Gallery/image-asset 3.webp";
import mapFillYork from "../assets/Gallery/image-asset 4.webp";
import mapFillDurham from "../assets/Gallery/image-asset 5.webp";
import mapFillSimcoe from "../assets/Gallery/image-asset 6.webp";
import { encodePublicAssetPath, type BundledImageSrc } from "../utils/encodePublicAssetPath";
import { titleFont, uiFont } from "./PageFrame";

type RegionId = "halton" | "peel" | "toronto" | "york" | "durham" | "simcoe";

type RegionConfig = {
  id: RegionId;
  name: string;
  color: string;
  path: string;
  labelX: number;
  labelY: number;
  cities: string[];
  image: BundledImageSrc;
};

const regions: RegionConfig[] = [
  {
    id: "simcoe",
    name: "Simcoe",
    color: "#CDEFFF",
    path: "M208 20 L478 20 L446 76 L190 76 Z",
    labelX: 330,
    labelY: 52,
    cities: ["Barrie"],
    image: mapFillSimcoe,
  },
  {
    id: "halton",
    name: "Halton",
    color: "#D8EE8A",
    path: "M44 262 L148 218 L190 256 L170 374 L84 404 L30 332 Z",
    labelX: 104,
    labelY: 294,
    cities: ["Oakville", "Milton", "Halton Hills"],
    image: mapFillHalton,
  },
  {
    id: "peel",
    name: "Peel",
    color: "#F6CFB3",
    path: "M128 168 L260 160 L276 258 L190 258 L148 218 Z",
    labelX: 196,
    labelY: 206,
    cities: ["Mississauga", "Brampton", "Caledon", "Bolton", "Orangeville"],
    image: mapFillPeel,
  },
  {
    id: "toronto",
    name: "City Of Toronto",
    color: "#F2D45C",
    path: "M236 258 L430 258 L416 332 L242 332 Z",
    labelX: 328,
    labelY: 300,
    cities: ["Toronto", "Etobicoke", "North York", "East York", "Scarborough"],
    image: mapFillToronto,
  },
  {
    id: "york",
    name: "York",
    color: "#8ED8EE",
    path: "M212 78 L442 78 L420 170 L260 170 L246 258 L276 258 L260 160 L128 168 L190 76 Z",
    labelX: 296,
    labelY: 134,
    cities: ["Vaughan", "Richmond Hill", "Markham", "Stouffville", "King City", "Aurora", "New Market"],
    image: mapFillYork,
  },
  {
    id: "durham",
    name: "Durham",
    color: "#EFE3AF",
    path: "M442 78 L626 86 L626 284 L430 258 L420 170 Z",
    labelX: 522,
    labelY: 184,
    cities: ["Ajax"],
    image: mapFillDurham,
  },
];

const regionById = regions.reduce<Record<RegionId, RegionConfig>>((acc, region) => {
  acc[region.id] = region;
  return acc;
}, {} as Record<RegionId, RegionConfig>);

export default function GtaServiceMap({ isCompactLayout }: { isCompactLayout: boolean }) {
  const [activeRegionId, setActiveRegionId] = useState<RegionId>("toronto");
  const [activeCity, setActiveCity] = useState<string>("Toronto");

  const activeRegion = regionById[activeRegionId];

  const activeLabel = useMemo(() => {
    if (!activeCity) return activeRegion.name;
    return `${activeCity} · ${activeRegion.name}`;
  }, [activeCity, activeRegion]);

  const focusRegion = (regionId: RegionId, city?: string) => {
    setActiveRegionId(regionId);
    setActiveCity(city ?? regionById[regionId].cities[0] ?? "");
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isCompactLayout ? "1fr" : "minmax(0, 1.5fr) minmax(240px, 0.9fr)",
        gap: 12,
      }}
    >
      <div
        data-native-cursor="true"
        style={{
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.16)",
          background: "rgba(8,14,22,0.48)",
          padding: isCompactLayout ? "10px" : "12px",
          display: "grid",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.11em", textTransform: "uppercase", opacity: 0.74, fontFamily: uiFont }}>Interactive Service Map</div>
          <div style={{ fontSize: isCompactLayout ? 12 : 13, fontWeight: 700, letterSpacing: "0.04em", opacity: 0.88, fontFamily: uiFont }}>{activeLabel}</div>
        </div>

        <svg viewBox="0 0 660 430" role="img" aria-label="Greater Toronto Area service map" style={{ width: "100%", height: "auto", display: "block" }}>
          <defs>
            {regions.map((region) => (
              <pattern key={`pattern-${region.id}`} id={`region-fill-${region.id}`} patternUnits="userSpaceOnUse" x={0} y={0} width={660} height={430}>
                <image href={encodePublicAssetPath(region.image)} x={0} y={0} width={660} height={430} preserveAspectRatio="xMidYMid slice" />
              </pattern>
            ))}
          </defs>

          <rect x={2} y={2} width={656} height={426} rx={10} fill="rgba(234,240,246,0.92)" stroke="rgba(255,255,255,0.28)" strokeWidth={2} />

          {regions.map((region) => {
            const isActive = region.id === activeRegionId;
            return (
              <g
                key={region.id}
                onMouseEnter={() => focusRegion(region.id)}
                onFocus={() => focusRegion(region.id)}
                tabIndex={0}
                style={{
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <path
                  d={region.path}
                  style={{
                    fill: isActive ? `url(#region-fill-${region.id})` : region.color,
                    stroke: isActive ? "#FFFFFF" : "rgba(35,40,48,0.72)",
                    strokeWidth: isActive ? 4 : 2.2,
                    transition: "fill 220ms ease, stroke 220ms ease, stroke-width 220ms ease, transform 220ms ease",
                    transform: isActive ? "scale(1.04)" : "scale(1)",
                    transformOrigin: "center center",
                    transformBox: "fill-box",
                  }}
                />
                <text
                  x={region.labelX}
                  y={region.labelY}
                  textAnchor="middle"
                  style={{
                    fill: "#1C2733",
                    fontSize: isCompactLayout ? 16 : 18,
                    fontFamily: titleFont,
                    fontWeight: 900,
                    letterSpacing: "0.02em",
                    pointerEvents: "none",
                    textShadow: "0 1px 0 rgba(255,255,255,0.35)",
                  }}
                >
                  {region.name}
                </text>
              </g>
            );
          })}

          <text
            x={24}
            y={32}
            style={{
              fill: "#1F2A36",
              fontSize: 34,
              fontFamily: titleFont,
              fontWeight: 950,
            }}
          >
            Greater Toronto Area
          </text>
        </svg>
      </div>

      <div
        data-native-cursor="true"
        style={{
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.16)",
          background: "rgba(8,14,22,0.48)",
          padding: isCompactLayout ? "10px" : "12px",
          display: "grid",
          gap: 10,
          alignContent: "start",
        }}
      >
        <div style={{ fontSize: 12, letterSpacing: "0.11em", textTransform: "uppercase", opacity: 0.74, fontFamily: uiFont }}>City Coverage</div>

        {regions.map((region) => (
          <div key={`city-group-${region.id}`} style={{ display: "grid", gap: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: uiFont, opacity: 0.9 }}>{region.name}</div>
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
                      border: active ? "1px solid rgba(255,255,255,0.8)" : "1px solid rgba(255,255,255,0.22)",
                      background: active ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.06)",
                      color: "#F6F8FB",
                      padding: "5px 9px",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.03em",
                      fontFamily: uiFont,
                      textTransform: "uppercase",
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
