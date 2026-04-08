"use client";

import dynamic from "next/dynamic";
import footerLogo from "../assets/My Logos and PFPs/Logo - fable face paint (1).png";

const LiquidEther = dynamic(() => import("./LiquidEther"), { ssr: false });

type FooterPage = "home" | "services" | "gallery" | "about" | "contact";

type IkigaiFooterProps = {
  onNavigate: (page: FooterPage) => void;
  brandName: string;
};

const linkBase = "text-white/70 hover:text-[#EDE6F7] transition";

const btnPrimary =
  "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white shadow-sm " +
  "transition-all focus:outline-none focus:ring-2 focus:ring-white/20 " +
  "bg-gradient-to-r from-[#0F3433] to-[#D6B6D4] " +
  "hover:from-[#D6B6D4] hover:to-[#0F3433]";

const chipBase =
  "rounded-full border border-white/20 bg-white/5 p-2 transition " +
  "hover:border-[#EDE6F7]/60 hover:bg-gradient-to-r hover:from-[#9A0E63] hover:to-[#D34AA8] " +
  "focus:outline-none focus:ring-2 focus:ring-white/20";

export default function IkigaiFooter({ onNavigate, brandName }: IkigaiFooterProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goTo = (page: FooterPage) => {
    onNavigate(page);
    scrollToTop();
  };

  return (
    <footer className="relative pt-10 border-t border-[#EDE6F7]/20 bg-[#9A0E63] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <LiquidEther
          colors={["#9A0E63", "#D34AA8", "#EDE6F7"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.55,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#9A0E63]/35 via-[#9A0E63]/65 to-[#0B0B0B]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(237,230,247,0.12),transparent)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img
              src={typeof footerLogo === "string" ? footerLogo : footerLogo.src}
              alt={`${brandName} logo`}
              className="h-12 w-auto shrink-0 object-contain opacity-95"
            />

              <div>
                <div className="font-['Germania_One'] uppercase tracking-widest text-lg">{brandName}</div>
                <div className="text-xs text-white/60">Magical Artistry &amp; Face Painting</div>
              </div>
            </div>

            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-sm">
              Premium face painting for birthdays, festivals, and corporate events across the GTA.
            </p>

            <button onClick={scrollToTop} className={`mt-6 ${btnPrimary}`}>
              ↑ Back to top
            </button>
          </div>

          <div>
            <div className="font-['Germania_One'] uppercase tracking-widest text-sm text-white/90">Quick Links</div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <button onClick={() => goTo("services")} className={`${linkBase} text-left`}>
                Services
              </button>
              <button onClick={() => goTo("gallery")} className={`${linkBase} text-left`}>
                Gallery
              </button>
              <button onClick={() => goTo("about")} className={`${linkBase} text-left`}>
                About
              </button>
              <button onClick={() => goTo("contact")} className={`${linkBase} text-left`}>
                Contact
              </button>
            </div>
          </div>

          <div>
            <div className="font-['Germania_One'] uppercase tracking-widest text-sm text-white/90">Connect</div>

            <div className="mt-4 space-y-4">
              <a href="mailto:thefablefacepaint@gmail.com" className={linkBase}>
                thefablefacepaint@gmail.com
              </a>

              <div className="flex gap-3 pt-1">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={chipBase}
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 0 10a5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6zm4.5-.9a1.1 1.1 0 1 0 0 2.2a1.1 1.1 0 0 0 0-2.2z" />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={chipBase}
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05C20 8.65 21 11 21 14.3V21h-4v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9z" />
                  </svg>
                </a>
              </div>

              <button onClick={() => goTo("contact")} className={btnPrimary}>
                Book Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-6">
          <div className="text-xs text-white/55">© {new Date().getFullYear()} {brandName}. All rights reserved.</div>

          <button onClick={() => goTo("contact")} className="text-xs text-white/55 hover:text-white transition">
            Book / Contact
          </button>
        </div>
      </div>
    </footer>
  );
}
