"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

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
