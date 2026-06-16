"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent, useSpring, useReducedMotion, type MotionValue } from "framer-motion";

// Hero stat that counts 0 → `to` driven by scroll progress through the reveal.
// Scroll-driven (not useInView) so it's reliable inside the pinned hero stage.
function ScrollStat({ scrollY, to }: { scrollY: MotionValue<number>; to: number }) {
  const reduce = useReducedMotion();
  const mv = useTransform(scrollY, [330, 540], [0, to]);
  // Always start at 0 (matches SSR) to avoid hydration mismatch; an effect jumps
  // to the final value for reduced-motion users after mount.
  const [val, setVal] = useState(0);
  useMotionValueEvent(mv, "change", (latest) => { if (!reduce) setVal(Math.round(latest)); });
  useEffect(() => { if (reduce) setVal(to); }, [reduce, to]);
  return <>{val}</>;
}

// Self-hosted (Mixkit 42754, free license): diverse group in genuine
// conversation around a warm firepit at night. Crisp 1080p source. Real people
// connecting, the community IS the scene. Local in /public, no CDN hotlink.
const VIDEO = "/hero.mp4";
const POSTER = "/hero-poster.jpg";
const VIDEO_FALLBACK = "/hero-fallback.mp4";

// Single CTA destination used everywhere
export const BOOK_DEMO = "https://calendar.app.google/YqLHSCCMvtUQAkma9";

export function FullHeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force-play for browsers that block muted autoplay (iOS Safari, some Chrome)
  // and pause the video once the hero scrolls out of view to save CPU/battery.
  useEffect(() => {
    const v = videoRef.current;
    const section = ref.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener("canplay", tryPlay, { once: true });

    let io: IntersectionObserver | undefined;
    if (section && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) tryPlay();
          else v.pause();
        },
        { threshold: 0.01 }
      );
      io.observe(section);
    }
    return () => {
      v.removeEventListener("canplay", tryPlay);
      io?.disconnect();
    };
  }, []);

  // Window scroll in pixels, reliable (target+sticky useScroll miscalculates).
  // The hero sits at the top of the page, so scrollY 0 == hero start.
  const { scrollY } = useScroll();
  // Respect reduced-motion: disable the large movements (zoom + parallax).
  // Gate behind a mounted flag so SSR and the first client render match
  // (both non-reduced), avoids a hydration mismatch on the transform styles.
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const r = mounted && prefersReduced ? 0 : 1;

  // Pinned section is 190vh, so the sticky stage unpins at ~90vh (~620–740px
  // depending on viewport). All scroll beats must COMPLETE before ~560px so the
  // zoom-out fully resolves and the reveal dwells before the section scrolls away.
  // Cinematic zoom-OUT: start tight on the people, pull back to the full scene.
  const videoScale = useTransform(scrollY, [0, 540], r ? [1.22, 1.0] : [1.06, 1.06]);
  const videoY = useTransform(scrollY, [0, 540], r ? ["1.5%", "-1%"] : ["0%", "0%"]);

  // Hero copy floats up and fades as the camera pulls back
  const heroY = useTransform(scrollY, [0, 360], [0, -80]);
  const heroOp = useTransform(scrollY, [0, 300], [1, 0]);

  // Reveal copy + stats, settle by ~540px, then hold until the unpin
  const revealOp = useTransform(scrollY, [330, 540], [0, 1]);
  const revealY = useTransform(scrollY, [330, 540], [40, 0]);

  // Scroll cue, visible at rest, fades the moment you start scrolling

  // Subtle mouse parallax on the video, dimensionality, "cool and smooth".
  // Spring-smoothed; the video has bleed so the ±px shift never reveals edges.
  const rawMX = useMotionValue(0);
  const rawMY = useMotionValue(0);
  const pX = useSpring(useTransform(rawMX, [-0.5, 0.5], r ? [10, -10] : [0, 0]), { stiffness: 70, damping: 20 });
  const pY = useSpring(useTransform(rawMY, [-0.5, 0.5], r ? [7, -7] : [0, 0]), { stiffness: 70, damping: 20 });

  return (
    <section
      ref={ref}
      className="hero-focus"
      style={{ position: "relative", height: "190vh", background: "#0a1d08" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        rawMX.set((e.clientX - r.left) / r.width - 0.5);
        rawMY.set((e.clientY - Math.min(0, r.top)) / window.innerHeight - 0.5);
      }}
    >
      {/* Pinned stage, holds the scene while the zoom-out + reveal play */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* ── Fullscreen looping video, the people, the scene (mouse-parallax) ── */}
        <motion.div style={{ x: pX, y: pY, position: "absolute", inset: -16, zIndex: 0 }}>
        <motion.video
          ref={videoRef}
          aria-hidden="true"
          tabIndex={-1}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={POSTER}
          style={{
            scale: videoScale,
            y: videoY,
            transformOrigin: "50% 34%",
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            willChange: "transform",
            // Lift exposure + warmth so the dinner glows and faces read clearly
            filter: "saturate(1.08) brightness(1.16) contrast(0.99) sepia(0.12)",
          }}
        >
          <source src={VIDEO} type="video/mp4" />
          <source src={VIDEO_FALLBACK} type="video/mp4" />
        </motion.video>
        </motion.div>

        {/* ── Warm scrims (lighter overall darken, let the dinner glow) ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(10,18,6,0.18)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(10,18,6,0.72) 0%, rgba(10,18,6,0.34) 22%, transparent 46%, transparent 60%, rgba(10,18,6,0.78) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(216,150,40,0.18) 0%, transparent 70%)" }} />
        {/* Amber color-wash, unifies + lifts the warmth across the whole scene */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "rgba(196,118,34,0.14)", mixBlendMode: "soft-light", pointerEvents: "none" }} />
        {/* Cinematic film grain */}
        <div className="film-grain" aria-hidden="true" style={{ zIndex: 2 }} />

        {/* Nav lives in the persistent <SiteHeader/> (fixed, page-level), so the
            wordmark + Book a demo stay put and seamlessly recolor on scroll. */}

        {/* ── Hero copy (upper third), fades as camera pulls back ── */}
        <motion.div
          style={{
            y: heroY, opacity: heroOp,
            position: "relative", zIndex: 10,
            flex: 1,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            textAlign: "center", padding: "0 24px",
            // sit between top and center, ~12% above the midpoint
            marginTop: "-13vh",
          }}
        >
          {/* Eyebrow, backed by Y Combinator (no pill, just mark + text) */}
          <div className="fade-rise" style={{
            marginBottom: 26, display: "inline-flex", alignItems: "center", gap: 9,
          }}>
            <img src="/yc-logo.svg" alt="Y Combinator" width={16} height={16} style={{ borderRadius: 3, display: "block", boxShadow: "0 1px 8px rgba(0,0,0,0.35)" }} />
            <span style={{
              fontFamily: "var(--font-fragment-mono)", fontSize: 11,
              letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(251,253,246,0.9)",
              textShadow: "0 1px 12px rgba(10,18,6,0.7)",
            }}>Backed by Y Combinator</span>
          </div>

          {/* Headline, two lines cascade in for cinematic rhythm */}
          <h1 style={{
            fontFamily: "var(--font-akkurat)", fontWeight: 400,
            fontSize: "clamp(46px, 8vw, 92px)", lineHeight: 0.98,
            letterSpacing: "-3px", color: "#fbfdf6", margin: 0, maxWidth: 1000,
          }}>
            <span className="fade-rise-1" style={{ display: "block" }}>
              Run the <span style={{ fontStyle: "italic", color: "#f0e3b8" }}>community</span>.
            </span>
            <span className="fade-rise-2" style={{ display: "block", color: "rgba(251,253,246,0.93)" }}>
              Not the ops.
            </span>
          </h1>

          {/* Single CTA, glass pill (matches nav), dialed up to stand out */}
          <div className="fade-rise-3" style={{ display: "flex", gap: 12, marginTop: 36, justifyContent: "center" }}>
            <a href={BOOK_DEMO} target="_blank" rel="noopener noreferrer" className="hero-cta">Book a demo →</a>
          </div>
        </motion.div>

        {/* ── "Connected through us" reveal, fades in as the scene settles ── */}
        <motion.div
          style={{
            y: revealY, opacity: revealOp,
            position: "absolute", left: 0, right: 0, bottom: "8vh", zIndex: 10,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 18,
            pointerEvents: "none", padding: "0 24px", textAlign: "center",
          }}
        >
          {/* Soft localized scrim, keeps the copy crisp over the busy lit table */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: "-48px -12vw", zIndex: -1, pointerEvents: "none",
            background: "radial-gradient(ellipse 58% 82% at 50% 68%, rgba(8,14,5,0.52) 0%, rgba(8,14,5,0.28) 45%, transparent 72%)",
          }} />
          <p style={{
            fontFamily: "var(--font-akkurat)", fontWeight: 400,
            fontSize: "clamp(18px, 2.4vw, 26px)", letterSpacing: "-0.6px",
            color: "#fbfdf6", margin: 0, maxWidth: 820, lineHeight: 1.4,
            textShadow: "0 2px 30px rgba(10,18,6,0.7)",
          }}>
            <span style={{ display: "block" }}>Applications, directories, matchmaking, events, automations</span>
            <span style={{ display: "block", color: "rgba(251,253,246,0.66)" }}>We run the ops so you can focus on your people.</span>
          </p>
          {/* Live community proof, single scroll-driven count-up */}
          <div className="liquid-glass" style={{
            borderRadius: 9999, padding: "11px 26px",
            display: "flex", alignItems: "baseline", gap: 8,
          }}>
            <span style={{ fontFamily: "var(--font-fragment-mono)", fontSize: 11, color: "rgba(251,253,246,0.6)", letterSpacing: "0.04em" }}>Supporting</span>
            <span style={{ fontFamily: "var(--font-fragment-mono)", fontSize: 17, fontWeight: 700, color: "#fbfdf6", letterSpacing: "-0.6px" }}><ScrollStat scrollY={scrollY} to={4200} />+</span>
            <span style={{ fontFamily: "var(--font-fragment-mono)", fontSize: 11, color: "rgba(251,253,246,0.6)", letterSpacing: "0.04em" }}>members</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

type Band = { start: number; end: number };

const rgbaLerp = (a: number[], b: number[], p: number) =>
  `rgba(${Math.round(a[0] + (b[0] - a[0]) * p)},${Math.round(a[1] + (b[1] - a[1]) * p)},${Math.round(a[2] + (b[2] - a[2]) * p)},${(a[3] + (b[3] - a[3]) * p).toFixed(3)})`;

// Maps scroll position to a color that crossfades from `dark` (over the hero)
// to `light` (over the cream sections) across the measured boundary band.
function useBandColor(
  scrollY: MotionValue<number>,
  band: React.RefObject<Band>,
  dark: number[],
  light: number[],
) {
  return useTransform(scrollY, (y) => {
    const { start, end } = band.current;
    const p = Math.min(1, Math.max(0, (y - start) / (end - start)));
    return rgbaLerp(dark, light, p);
  });
}

// Persistent, page-level header. No background and no border, it simply sits
// over the content and seamlessly recolors (cream over the dark hero, ink over
// the light sections) as you scroll across the hero→content boundary. The CTA
// stays a frosted glass pill, its frost + border tone shift so it reads on both.
export function SiteHeader() {
  const { scrollY } = useScroll();
  // The dark→light boundary, measured from the first light section so it's
  // exact regardless of hero height. Flip happens as cream crosses the header.
  const band = useRef<Band>({ start: 900, end: 1100 });
  useEffect(() => {
    const measure = () => {
      const el = document.getElementById("communities");
      const top = el ? el.offsetTop : window.innerHeight * 1.9;
      band.current = { start: top - 78, end: top - 8 };
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  // [r,g,b,a] over-hero (cream) → over-content (ink)
  const brand = useBandColor(scrollY, band, [251, 253, 246, 1], [10, 29, 8, 1]);
  const brandSoft = useBandColor(scrollY, band, [251, 253, 246, 0.6], [10, 29, 8, 0.5]);
  const pillText = useBandColor(scrollY, band, [251, 253, 246, 0.95], [10, 29, 8, 0.92]);
  const pillBg = useBandColor(scrollY, band, [255, 255, 255, 0.05], [10, 29, 8, 0.045]);
  const pillBorder = useBandColor(scrollY, band, [255, 255, 255, 0.3], [10, 29, 8, 0.16]);

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, pointerEvents: "none" }}>
      <div className="fade-rise" style={{
        width: "100%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "22px 40px",
      }}>
        <a href="#top" style={{ pointerEvents: "auto", textDecoration: "none", display: "flex", alignItems: "baseline", gap: 8 }}>
          <motion.span style={{
            fontFamily: "var(--font-brand)", fontWeight: 600, fontSize: 20,
            letterSpacing: "-0.4px", color: brand,
          }}>
            Bubble Lab
          </motion.span>
          <motion.span style={{
            fontFamily: "var(--font-brand)", fontWeight: 400,
            fontSize: 20, letterSpacing: "-0.4px", color: brandSoft,
          }}>
            Communities
          </motion.span>
        </a>

        <motion.a href={BOOK_DEMO} target="_blank" rel="noopener noreferrer" className="cta-hover" style={{
          pointerEvents: "auto", borderRadius: 9999, padding: "9px 20px",
          fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.3px", textDecoration: "none",
          fontFamily: "var(--font-akkurat)",
          color: pillText, background: pillBg,
          borderWidth: 1, borderStyle: "solid", borderColor: pillBorder,
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.12)",
        }}>
          Book a demo
        </motion.a>
      </div>
    </header>
  );
}
