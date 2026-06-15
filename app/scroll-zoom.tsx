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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle cinematic parallax — video drifts up + scales as you scroll past
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, -70]);
  const contentOp = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#0a1d08",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
          // Warm botanical grade — push the night scene toward our cream/loam palette
          filter: "saturate(1.05) brightness(1.02) contrast(1.02) sepia(0.10)",
        }}
      >
        <source src={VIDEO} type="video/mp4" />
        <source src={VIDEO_FALLBACK} type="video/mp4" />
      </motion.video>

      {/* ── Warm scrims for depth + text legibility ── */}
      {/* Overall warm darken so cream text reads everywhere */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(10,18,6,0.42)" }} />
      {/* Top + bottom cinematic gradient */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(10,18,6,0.55) 0%, transparent 28%, transparent 62%, rgba(10,18,6,0.72) 100%)" }} />
      {/* Warm golden glow from the firelight center */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse 60% 50% at 50% 62%, rgba(216,150,40,0.16) 0%, transparent 70%)" }} />

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

      {/* ── Hero content — cinematic, centered ── */}
      <motion.div
        style={{
          y: contentY, opacity: contentOp,
          position: "relative", zIndex: 10,
          flex: 1,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "40px 24px 96px",
        }}
      >
        {/* Eyebrow */}
        <div className="fade-rise liquid-glass" style={{
          borderRadius: 9999, padding: "5px 15px", marginBottom: 30,
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
          letterSpacing: "-3px", color: "#fbfdf6", margin: 0,
          maxWidth: 1000,
          textShadow: "0 2px 40px rgba(10,18,6,0.5)",
        }}>
          Run the <span style={{ fontStyle: "italic", color: "#e7d9a8" }}>community</span>.<br />
          <span style={{ color: "rgba(251,253,246,0.62)" }}>Not the ops.</span>
        </h1>

        {/* Subhead */}
        <p className="fade-rise-2" style={{
          fontFamily: "var(--font-akkurat)", fontWeight: 400,
          fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: 1.6,
          letterSpacing: "-0.3px", color: "rgba(251,253,246,0.72)",
          maxWidth: 540, margin: "26px auto 0",
          textShadow: "0 1px 20px rgba(10,18,6,0.5)",
        }}>
          The platform behind private professional communities — applications,
          directories, matchmaking, events, and automations. We handle the ops
          so you can focus on your people.
        </p>

        {/* CTAs */}
        <div className="fade-rise-3" style={{ display: "flex", gap: 12, marginTop: 38, flexWrap: "wrap", justifyContent: "center" }}>
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

        {/* Social proof */}
        <div className="fade-rise-3" style={{
          marginTop: 34, display: "flex", alignItems: "center", gap: 10,
          fontFamily: "var(--font-fragment-mono)", fontSize: 11, letterSpacing: "0.04em",
        }}>
          <span style={{ color: "rgba(251,253,246,0.50)", textTransform: "uppercase", fontSize: 10 }}>Powering</span>
          <span style={{ color: "#e7c6cf", fontWeight: 700, fontFamily: "var(--font-akkurat)", fontSize: 14 }}>OGC</span>
          <span style={{ color: "rgba(251,253,246,0.35)" }}>·</span>
          <span style={{ color: "#aecbe6", fontWeight: 700, fontFamily: "var(--font-akkurat)", fontSize: 14 }}>The Den</span>
        </div>
      </motion.div>
    </section>
  );
}
