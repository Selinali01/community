"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Mixkit: diverse group in genuine conversation around warm light in a garden at night.
// Real people, warm, cinematic — the community IS the scene.
const VIDEO = "https://assets.mixkit.co/videos/42754/42754-720.mp4";
const POSTER = "https://assets.mixkit.co/videos/42754/42754-thumb-1080-0.jpg";
const VIDEO_FALLBACK = "https://assets.mixkit.co/videos/42716/42716-720.mp4";

const NAV_LINKS = ["Platform", "Communities", "Pricing", "About"];

export function FullHeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  // Window scroll in pixels — reliable (target+sticky useScroll miscalculates).
  // The hero sits at the top of the page, so scrollY 0 == hero start.
  const { scrollY } = useScroll();

  // Cinematic zoom-OUT: start tight on the people, pull back to reveal the
  // whole warm community scene as you scroll. "render cool humans, then zoom out."
  const videoScale = useTransform(scrollY, [0, 860], [1.28, 1.0]);
  const videoY = useTransform(scrollY, [0, 860], ["3%", "-2%"]);

  // Hero copy floats up and fades as the camera pulls back
  const heroY = useTransform(scrollY, [0, 460], [0, -80]);
  const heroOp = useTransform(scrollY, [0, 400], [1, 0]);

  // "Connected through us" — product layer fades in as the scene settles
  const revealOp = useTransform(scrollY, [430, 720], [0, 1]);
  const revealY = useTransform(scrollY, [430, 720], [40, 0]);

  return (
    <section ref={ref} style={{ position: "relative", height: "190vh", background: "#0a1d08" }}>
      {/* Pinned stage — holds the scene while the zoom-out + reveal play */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* ── Fullscreen looping video — the people, the scene ── */}
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          poster={POSTER}
          style={{
            scale: videoScale,
            y: videoY,
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            willChange: "transform",
            filter: "saturate(1.05) brightness(1.02) contrast(1.02) sepia(0.10)",
          }}
        >
          <source src={VIDEO} type="video/mp4" />
          <source src={VIDEO_FALLBACK} type="video/mp4" />
        </motion.video>

        {/* ── Warm scrims ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(10,18,6,0.30)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(10,18,6,0.72) 0%, rgba(10,18,6,0.34) 22%, transparent 46%, transparent 60%, rgba(10,18,6,0.78) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(216,150,40,0.16) 0%, transparent 70%)" }} />

        {/* ── Glass nav ── */}
        <nav
          style={{
            position: "relative", zIndex: 10,
            maxWidth: 1240, margin: "0 auto", width: "100%",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "26px 32px",
          }}
        >
          <div style={{
            fontFamily: "var(--font-akkurat)", fontWeight: 700, fontSize: 19,
            letterSpacing: "-0.7px", color: "#fbfdf6",
            display: "flex", alignItems: "baseline", gap: 1,
          }}>
            BubbleLab
            <sup style={{ fontSize: 9, fontWeight: 400, opacity: 0.7, fontFamily: "var(--font-fragment-mono)" }}>®</sup>
          </div>

          <div className="hero-nav-links" style={{ display: "flex", alignItems: "center", gap: 30 }}>
            {NAV_LINKS.map((l, i) => (
              <a key={l} href="#" style={{
                fontSize: 13.5, letterSpacing: "-0.3px", textDecoration: "none",
                fontFamily: "var(--font-akkurat)",
                color: i === 0 ? "#fbfdf6" : "rgba(251,253,246,0.62)",
                transition: "color 0.2s ease",
              }}>{l}</a>
            ))}
          </div>

          <a href="#" className="liquid-glass" style={{
            borderRadius: 9999, padding: "9px 20px", fontSize: 13.5, fontWeight: 600,
            letterSpacing: "-0.3px", color: "#fbfdf6", textDecoration: "none",
            fontFamily: "var(--font-akkurat)",
          }}>Get started</a>
        </nav>

        {/* ── Hero copy (upper third) — fades as camera pulls back ── */}
        <motion.div
          style={{
            y: heroY, opacity: heroOp,
            position: "relative", zIndex: 10,
            flex: 1,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
            textAlign: "center", padding: "clamp(20px, 5vh, 60px) 24px 0",
          }}
        >
          {/* Eyebrow */}
          <div className="fade-rise liquid-glass" style={{
            borderRadius: 9999, padding: "5px 15px", marginBottom: 28,
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#d7e8b5", boxShadow: "0 0 8px rgba(215,232,181,0.8)" }} />
            <span style={{
              fontFamily: "var(--font-fragment-mono)", fontSize: 11,
              letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(251,253,246,0.85)",
            }}>Community Infrastructure</span>
          </div>

          {/* Headline */}
          <h1 className="fade-rise-1" style={{
            fontFamily: "var(--font-akkurat)", fontWeight: 400,
            fontSize: "clamp(46px, 8vw, 92px)", lineHeight: 0.98,
            letterSpacing: "-3px", color: "#fbfdf6", margin: 0, maxWidth: 1000,
            textShadow: "0 2px 40px rgba(10,18,6,0.5)",
          }}>
            Run the <span style={{ fontStyle: "italic", color: "#e7d9a8" }}>community</span>.<br />
            <span style={{ color: "rgba(251,253,246,0.62)" }}>Not the ops.</span>
          </h1>

          {/* Subhead */}
          <p className="fade-rise-2" style={{
            fontFamily: "var(--font-akkurat)", fontWeight: 400,
            fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: 1.6,
            letterSpacing: "-0.3px", color: "rgba(251,253,246,0.74)",
            maxWidth: 540, margin: "24px auto 0",
            textShadow: "0 1px 20px rgba(10,18,6,0.6)",
          }}>
            The platform behind private professional communities — applications,
            directories, matchmaking, events, and automations. We handle the ops
            so you can focus on your people.
          </p>

          {/* CTAs */}
          <div className="fade-rise-3" style={{ display: "flex", gap: 12, marginTop: 34, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#" style={{
              background: "#fbfdf6", color: "#0a1d08", borderRadius: 9999,
              padding: "14px 32px", fontSize: 15, fontWeight: 700, letterSpacing: "-0.4px",
              textDecoration: "none", fontFamily: "var(--font-akkurat)",
              boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5)",
            }}>Start building →</a>
            <a href="#features" className="liquid-glass" style={{
              borderRadius: 9999, padding: "14px 30px", fontSize: 15, fontWeight: 600,
              letterSpacing: "-0.4px", color: "#fbfdf6", textDecoration: "none",
              fontFamily: "var(--font-akkurat)",
            }}>See how it works</a>
          </div>
        </motion.div>

        {/* ── "Connected through us" reveal — fades in as the scene settles ── */}
        <motion.div
          style={{
            y: revealY, opacity: revealOp,
            position: "absolute", left: 0, right: 0, bottom: "8vh", zIndex: 10,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 18,
            pointerEvents: "none", padding: "0 24px", textAlign: "center",
          }}
        >
          <p style={{
            fontFamily: "var(--font-akkurat)", fontWeight: 400, fontStyle: "italic",
            fontSize: "clamp(18px, 2.4vw, 26px)", letterSpacing: "-0.6px",
            color: "#fbfdf6", margin: 0, maxWidth: 560, lineHeight: 1.35,
            textShadow: "0 2px 30px rgba(10,18,6,0.7)",
          }}>
            Every member, every intro, every event — held together by one platform.
          </p>
          {/* Live community stats — the "through us" proof */}
          <div className="liquid-glass" style={{
            borderRadius: 9999, padding: "11px 26px",
            display: "flex", alignItems: "center", gap: 26,
          }}>
            {[["847", "members"], ["24", "matches / wk"], ["12", "events"]].map(([v, l], i, a) => (
              <div key={l} style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-fragment-mono)", fontSize: 17, fontWeight: 700, color: "#fbfdf6", letterSpacing: "-0.6px" }}>{v}</span>
                <span style={{ fontFamily: "var(--font-fragment-mono)", fontSize: 10, color: "rgba(251,253,246,0.6)", letterSpacing: "0.04em" }}>{l}</span>
                {i < a.length - 1 && <span style={{ marginLeft: 20, width: 1, height: 13, background: "rgba(251,253,246,0.22)", display: "inline-block" }} />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
