"use client";

import { motion, animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Count-up number — animates 0 → value when scrolled into view (once).
// A premium "cool and smooth" micro-interaction for the live community stats.
// Respects prefers-reduced-motion (shows the final value immediately).
export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setVal(to); return; }
    const controls = animate(0, to, {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{val}</span>;
}

// Generic scroll-into-view reveal — fade + rise. For hero-quality moments
// below the fold (testimonial, product preview) so the whole page feels smooth.
export function Reveal({
  children,
  y = 28,
  delay = 0,
}: {
  children: ReactNode;
  y?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

// Draws a horizontal line left→right when scrolled into view — used for the
// product preview's match connector ("connected through us", in the UI mockup).
export function DrawLine() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      style={{ flex: 1, borderTop: "1.5px dashed #c5ccb6", transformOrigin: "left center" }}
      // initial is identical server + client (SSR-safe); reduced-motion only
      // collapses the transition so it snaps instead of drawing.
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-40px" }}
    />
  );
}

// Staggered fade-up for the features grid cards
export function AnimatedFeatureCard({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </motion.div>
  );
}

// Staggered fade-up for the how-it-works steps
export function AnimatedStep({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.14,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </motion.div>
  );
}

// Section label fade-in
export function AnimatedSectionLabel({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
