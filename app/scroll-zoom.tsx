"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  type MotionValue,
} from "framer-motion";

// ── Config ────────────────────────────────────────────────────────────────────

// Misty morning over green field with trees — soft, atmospheric, Adaline-adjacent palette
const BG_IMAGE =
  "https://images.unsplash.com/photo-1759220948579-aa4866af0f0d?auto=format&fit=crop&w=1920&q=85";

// Fallback: garden during golden hour (warmer, more vivid)
const BG_FALLBACK =
  "https://images.unsplash.com/photo-1553368168-3957f806d986?auto=format&fit=crop&w=1920&q=85";

interface Member {
  name: string;
  role: string;
  company: string;
  initials: string;
  photo: string;
  avatarBg: string; // fallback gradient if photo fails
  x: number; // % of viewport width (card center)
  y: number; // % of viewport height
  range: [number, number]; // scroll range [start, end]
  initOp: number; // opacity at scroll 0
  maxOp: number;  // opacity at scroll range[1]
}

// Member viewport-entry timing (at 2x zoom from origin 46%,60%):
//   Sam  enters at scroll ~0.12  (from right, y=76%)
//   Taylor/Casey enter at ~0.24  (from top)
//   Maya enters at ~0.26         (from right)
//   Chris enters at ~0.31        (from left, y=76%)
//   Jordan/River enter at ~0.46  (far left/right)
//   Dana enters at ~0.64         (farthest left)
// At 1.5x zoom from origin (46%,60%): Sam/Taylor/Casey are at edges (faint presences)
// Chris barely off left, Maya barely off right — many people subtly visible from load
// At 2.0x zoom from origin (46%,60%): only Sarah & Alex are in viewport.
// All others are fully off-screen — they enter cleanly as zoom pulls back.
// The tiny field silhouettes + bokeh provide "lots in the background" at start.
const MEMBERS: Member[] = [
  { name: "Sarah M.",  initials: "SM", role: "Head of Growth",    company: "Figma",   photo: "https://randomuser.me/api/portraits/women/44.jpg", avatarBg: "linear-gradient(135deg,#5aac38,#2d6018)", x: 33, y: 60, range: [0.0, 0.26], initOp: 0.88, maxOp: 0.97 },
  { name: "Alex K.",   initials: "AK", role: "VP Engineering",    company: "Linear",  photo: "https://randomuser.me/api/portraits/men/32.jpg",   avatarBg: "linear-gradient(135deg,#203b14,#4a9030)", x: 59, y: 60, range: [0.0, 0.26], initOp: 0.88, maxOp: 0.97 },
  { name: "Chris R.",  initials: "CR", role: "Operations Lead",   company: "Vercel",  photo: "https://randomuser.me/api/portraits/men/15.jpg",   avatarBg: "linear-gradient(135deg,#4a3212,#203b14)", x: 18, y: 76, range: [0.28, 0.52], initOp: 0, maxOp: 0.88 },
  { name: "Sam T.",    initials: "ST", role: "Community Builder", company: "Loom",    photo: "https://randomuser.me/api/portraits/women/58.jpg", avatarBg: "linear-gradient(135deg,#1a3d14,#4a9030)", x: 75, y: 76, range: [0.10, 0.44], initOp: 0, maxOp: 0.88 },
  { name: "Dana W.",   initials: "DW", role: "Founding Engineer", company: "Arc",     photo: "https://randomuser.me/api/portraits/women/35.jpg", avatarBg: "linear-gradient(135deg,#31200b,#4a3212)", x: 9,  y: 62, range: [0.52, 0.70], initOp: 0, maxOp: 0.82 },
  { name: "River O.",  initials: "RO", role: "Head of Design",    company: "Pitch",   photo: "https://randomuser.me/api/portraits/men/50.jpg",   avatarBg: "linear-gradient(135deg,#203b14,#2d6018)", x: 84, y: 62, range: [0.36, 0.56], initOp: 0, maxOp: 0.82 },
  { name: "Jordan L.", initials: "JL", role: "Chief of Staff",    company: "Stripe",  photo: "https://randomuser.me/api/portraits/women/68.jpg", avatarBg: "linear-gradient(135deg,#4a3212,#7a5820)", x: 14, y: 44, range: [0.36, 0.56], initOp: 0, maxOp: 0.88 },
  { name: "Maya P.",   initials: "MP", role: "Head of Product",   company: "Notion",  photo: "https://randomuser.me/api/portraits/women/22.jpg", avatarBg: "linear-gradient(135deg,#1a3d14,#3d8a28)", x: 78, y: 38, range: [0.22, 0.46], initOp: 0, maxOp: 0.88 },
  { name: "Taylor B.", initials: "TB", role: "Creative Director", company: "Spotify", photo: "https://randomuser.me/api/portraits/women/89.jpg", avatarBg: "linear-gradient(135deg,#31200b,#5a3515)", x: 44, y: 25, range: [0.22, 0.46], initOp: 0, maxOp: 0.84 },
  { name: "Casey M.",  initials: "CM", role: "Startup Founder",   company: "Own Co.", photo: "https://randomuser.me/api/portraits/men/77.jpg",   avatarBg: "linear-gradient(135deg,#203b14,#5aac38)", x: 63, y: 23, range: [0.28, 0.50], initOp: 0, maxOp: 0.84 },
];

// Index order: 0=Sarah, 1=Alex, 2=Chris, 3=Sam, 4=Dana, 5=River, 6=Jordan, 7=Maya, 8=Taylor, 9=Casey
const CONNECTIONS: [number, number, number, number][] = [
  [0, 1, 0.16, 0.36],  // Sarah ↔ Alex   — centerpiece
  [3, 1, 0.06, 0.30],  // Sam → Alex     — Sam at edge from load
  [1, 7, 0.16, 0.40],  // Alex → Maya    — Maya barely visible from load
  [8, 9, 0.20, 0.44],  // Taylor ↔ Casey — both at top edge from load
  [2, 0, 0.18, 0.44],  // Chris → Sarah  — Chris at edge from load
  [6, 0, 0.38, 0.58],  // Jordan → Sarah
  [5, 7, 0.38, 0.58],  // River → Maya
  [4, 6, 0.54, 0.70],  // Dana → Jordan
  [8, 6, 0.40, 0.60],  // Taylor → Jordan
  [9, 7, 0.40, 0.60],  // Casey → Maya
];

// Company brand colors — dot color in cards
const BRAND: Record<string, string> = {
  "Figma":   "#7B61FF",
  "Linear":  "#5D64CF",
  "Vercel":  "#1a1a1a",
  "Loom":    "#625DF5",
  "Arc":     "#FF4C00",
  "Pitch":   "#1A1A1A",
  "Stripe":  "#635BFF",
  "Notion":  "#37352F",
  "Spotify": "#1DB954",
  "Own Co.": "#4a3212",
};

// Subtle brand color as inset glow — makes each card feel uniquely theirs
// All at low alpha so it's a whisper, not a shout
const BRAND_INSET: Record<string, string> = {
  "Figma":   "rgba(123,97,255,0.12)",
  "Linear":  "rgba(93,100,207,0.12)",
  "Vercel":  "rgba(0,0,0,0.06)",
  "Loom":    "rgba(98,93,245,0.12)",
  "Arc":     "rgba(255,76,0,0.10)",
  "Pitch":   "rgba(0,0,0,0.06)",
  "Stripe":  "rgba(99,91,255,0.12)",
  "Notion":  "rgba(55,53,47,0.08)",
  "Spotify": "rgba(29,185,84,0.12)",
  "Own Co.": "rgba(74,50,18,0.08)",
};

// ── Avatar (with photo fallback) ──────────────────────────────────────────────

function Avatar({ member }: { member: Member }) {
  const [failed, setFailed] = useState(false);
  // Featured pair (Sarah=Figma, Alex=Linear) gets a pulsing matched ring
  const isMatched = member.company === "Figma" || member.company === "Linear";

  if (failed) {
    return (
      <div style={{ position: "relative", flexShrink: 0 }}>
        {isMatched && (
          <motion.div
            style={{ position: "absolute", inset: -5, borderRadius: "50%", border: "2px solid rgba(215,232,181,0.70)", pointerEvents: "none" }}
            animate={{ opacity: [0.65, 0.10, 0.65], scale: [1, 1.12, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: member.company === "Linear" ? 0.55 : 0 }}
          />
        )}
      <div
        style={{
          width: 60, height: 60, borderRadius: "50%",
          background: member.avatarBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#fbfdf6",
          letterSpacing: "-0.52px", flexShrink: 0,
          border: "2.5px solid rgba(215,232,181,0.75)",
        }}
      >
        {member.initials}
      </div>
      </div>
    );
  }
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      {isMatched && (
        <motion.div
          style={{ position: "absolute", inset: -5, borderRadius: "50%", border: "2px solid rgba(215,232,181,0.70)", pointerEvents: "none" }}
          animate={{ opacity: [0.65, 0.10, 0.65], scale: [1, 1.12, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: member.company === "Linear" ? 0.55 : 0 }}
        />
      )}
      <img
        src={member.photo}
        alt={member.name}
        onError={() => setFailed(true)}
        style={{
          width: 60, height: 60, borderRadius: "50%",
          objectFit: "cover",
          border: "2.5px solid rgba(215,232,181,0.80)",
          boxShadow: "0 0 0 1px rgba(215,232,181,0.25)",
        }}
      />
    </div>
  );
}

// ── Member card ───────────────────────────────────────────────────────────────

function AnimatedCard({
  member, progress, idx,
}: { member: Member; progress: MotionValue<number>; idx: number }) {
  const opacity = useTransform(
    progress,
    [member.range[0], member.range[1]],
    [member.initOp, member.maxOp]
  );
  const scale = useTransform(
    progress,
    [member.range[0], member.range[1]],
    [0.94, 1.0]
  );

  // Featured pair: cinematic entrance — emerge from the warm golden field
  const entranceDelay = idx === 0 ? 0.75 : 0.95;

  return (
    <div style={{ position: "absolute", left: `${member.x}%`, top: `${member.y}%`, transform: "translate(-50%,-50%)", zIndex: 10 }}>
      {/* One-time entrance — outer wrapper, separate from scroll-driven inner */}
      {idx < 2 ? (
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.90 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: entranceDelay, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div style={{ opacity, scale }}>
            {/* Float + hover */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3.2 + idx * 0.42,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.58,
              }}
        >
          <motion.div
            whileHover={{ scale: 1.06, transition: { duration: 0.18, ease: "easeOut" } }}
            style={{ cursor: "default" }}
          >
          {/* Portrait card — face first, text below — more human, more profile-like */}
          <div style={{
            width: 116,
            background: idx < 2
              ? "linear-gradient(180deg, rgba(254,250,238,0.93) 0%, rgba(252,247,233,0.91) 100%)"
              : "rgba(252,248,240,0.91)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            border: idx < 2
              ? "1px solid rgba(180,230,120,0.48)"
              : "1px solid rgba(10,29,8,0.08)",
            borderRadius: 18,
            padding: "14px 12px 12px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            textAlign: "center",
            boxShadow: idx < 2
              ? `0 18px 52px -8px rgba(74,50,18,0.22), 0 0 22px rgba(180,230,120,0.14), 0 2px 12px rgba(74,50,18,0.10), inset 0 1px 0 rgba(255,255,255,0.70), inset 0 0 0 1px ${BRAND_INSET[member.company] ?? "rgba(0,0,0,0.04)"}`
              : `0 18px 52px -8px rgba(74,50,18,0.22), 0 2px 12px rgba(74,50,18,0.10), inset 0 1px 0 rgba(255,255,255,0.70), inset 0 0 0 1px ${BRAND_INSET[member.company] ?? "rgba(0,0,0,0.04)"}`,
          }}>
            <Avatar member={member} />
            <div style={{ width: "100%" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0a1d08", letterSpacing: "-0.52px", lineHeight: 1.2 }}>
                {member.name}
              </div>
              <div style={{ fontSize: 10, color: "#31200b", letterSpacing: "-0.40px", marginTop: 2, lineHeight: 1.3 }}>
                {member.role}
              </div>
              <div style={{ marginTop: 5, display: "inline-flex", alignItems: "center", gap: 3 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: BRAND[member.company] ?? "#d7e8b5", opacity: 0.85, flexShrink: 0 }} />
                <span style={{ fontSize: 10, color: "#4a3212", fontFamily: "var(--font-fragment-mono)", letterSpacing: "0.02em" }}>
                  {member.company}
                </span>
              </div>
            </div>
          </div>
          </motion.div>
        </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        // Non-featured: just scroll-driven, no entrance animation
        <motion.div style={{ opacity, scale }}>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.2 + idx * 0.42, repeat: Infinity, ease: "easeInOut", delay: idx * 0.58 }}
          >
            <motion.div whileHover={{ scale: 1.06, transition: { duration: 0.18, ease: "easeOut" } }} style={{ cursor: "default" }}>
              <div style={{
                width: 116,
                // Warm gradient on ALL cards — cohesive with featured pair
                background: "linear-gradient(180deg, rgba(253,251,245,0.92) 0%, rgba(252,248,240,0.90) 100%)",
                backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
                border: "1px solid rgba(10,29,8,0.08)",
                borderRadius: 18, padding: "14px 12px 12px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center",
                boxShadow: `0 18px 52px -8px rgba(74,50,18,0.22), 0 2px 12px rgba(74,50,18,0.10), inset 0 1px 0 rgba(255,255,255,0.70), inset 0 0 0 1px ${BRAND_INSET[member.company] ?? "rgba(0,0,0,0.04)"}`,
              }}>
                <Avatar member={member} />
                <div style={{ width: "100%" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0a1d08", letterSpacing: "-0.52px", lineHeight: 1.2 }}>{member.name}</div>
                  <div style={{ fontSize: 11, color: "#31200b", letterSpacing: "-0.44px", marginTop: 2, lineHeight: 1.3 }}>{member.role}</div>
                  <div style={{ marginTop: 5, display: "inline-flex", alignItems: "center", gap: 3 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: BRAND[member.company] ?? "#d7e8b5", opacity: 0.85, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: "#4a3212", fontFamily: "var(--font-fragment-mono)", letterSpacing: "0.02em" }}>{member.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// ── Traveling spark — glowing particle that races along each connection ──────
// Appears after the line finishes drawing; feels like electricity activating the link.

function AnimatedSpark({
  pathId, progress, scrollEnd,
}: { pathId: string; progress: MotionValue<number>; scrollEnd: number }) {
  const opacity = useTransform(progress, [scrollEnd, scrollEnd + 0.09], [0, 0.88]);
  return (
    <motion.circle r="0.48" fill="rgba(225,255,110,0.96)" style={{ opacity }}>
      <animateMotion dur="2.6s" repeatCount="indefinite">
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </motion.circle>
  );
}

// ── Connection line — own component so useTransform is at top level ───────────

function AnimatedLine({
  from, to, progress, scrollStart, scrollEnd, isFeatured = false, gradientId, pathId,
}: {
  from: Member; to: Member;
  progress: MotionValue<number>;
  scrollStart: number; scrollEnd: number;
  isFeatured?: boolean;
  gradientId?: string;
  pathId?: string;
}) {
  const pathLen = useTransform(progress, [scrollStart, scrollEnd], [0, 1]);
  const labelOp = useTransform(progress, [scrollEnd - 0.02, scrollEnd + 0.08], [0, 1]);
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  // Quadratic bezier — arc 9 units above midpoint for elegant curves
  const cpY = midY - 9;
  const d = `M${from.x},${from.y} Q${midX},${cpY},${to.x},${to.y}`;
  // Actual point on bezier at t=0.5: (midX, midY - 4.5)
  const labelY = midY - 4.5;

  return (
    <g>
      {/* Featured only: always-visible ghost arc that breathes — hints at the connection before it draws */}
      {isFeatured && (
        <motion.path
          d={d}
          stroke="rgba(190,240,110,0.28)"
          strokeWidth="3.5"
          fill="none" strokeLinecap="round"
          filter="url(#area-glow)"
          animate={{ opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {/* Outer halo — featured is much wider */}
      <motion.path d={d} stroke="rgba(215,232,181,0.18)" strokeWidth={isFeatured ? 2.8 : 1.2}
        fill="none" strokeLinecap="round" style={{ pathLength: pathLen }} />
      {/* Mid glow */}
      <motion.path d={d} stroke="rgba(215,232,181,0.30)" strokeWidth={isFeatured ? 1.0 : 0.50}
        fill="none" strokeLinecap="round" style={{ pathLength: pathLen }} />
      {/* Gradient main line — ID used by spark's mpath */}
      <motion.path
        id={pathId}
        d={d}
        stroke={gradientId ? `url(#${gradientId})` : (isFeatured ? "rgba(155,210,100,0.85)" : "rgba(155,200,110,0.70)")}
        strokeWidth={isFeatured ? 0.30 : 0.23}
        fill="none" strokeLinecap="round" style={{ pathLength: pathLen }}
      />
      {/* Traveling spark — activates after line is fully drawn */}
      {pathId && (
        <AnimatedSpark pathId={pathId} progress={progress} scrollEnd={scrollEnd} />
      )}
      {/* "matched ✦" label on the featured center connection only */}
      {isFeatured && (
        <motion.g style={{ opacity: labelOp }}>
          <rect
            x={midX - 4.5} y={labelY - 1.8}
            width={9} height={3.4} rx={1.7}
            fill="rgba(215,232,181,0.92)"
          />
          <text
            x={midX} y={labelY + 0.6}
            textAnchor="middle"
            fontSize="1.8"
            fontFamily="'JetBrains Mono', 'Courier New', monospace"
            fill="#0a1d08"
            letterSpacing="0.05"
          >
            matched ✦
          </text>
        </motion.g>
      )}
    </g>
  );
}

// ── Connection node dot — own component ───────────────────────────────────────

function AnimatedNode({
  member, progress, scrollStart,
}: { member: Member; progress: MotionValue<number>; scrollStart: number }) {
  const opacity = useTransform(progress, [scrollStart, scrollStart + 0.14], [0, 0.90]);
  return (
    <g>
      {/* Outer glow ring */}
      <motion.circle cx={member.x} cy={member.y} r="2.0"
        fill="rgba(215,232,181,0.15)" style={{ opacity }} />
      {/* Inner glow */}
      <motion.circle cx={member.x} cy={member.y} r="1.1"
        fill="rgba(215,232,181,0.55)" style={{ opacity }} />
      {/* Solid core */}
      <motion.circle cx={member.x} cy={member.y} r="0.70"
        fill="rgba(215,232,181,0.96)" style={{ opacity }} />
    </g>
  );
}

// ── Background photo component (img with onError fallback) ───────────────────

function BackgroundPhoto() {
  const [src, setSrc] = useState(BG_IMAGE);
  return (
    // Cinematic entrance — fades in from dark over 1.6s, then cards emerge from the brightening warmth
    <motion.div
      style={{ position: "absolute", inset: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Soft sage-green fallback — matches misty morning palette while photo loads */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #c8d4a0 0%, #a4b880 40%, #7a9060 100%)" }} />
      <img
        src={src}
        alt=""
        loading="eager"
        fetchPriority="high"
        onError={() => setSrc(BG_FALLBACK)}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 52%",
          // Adaline-adjacent treatment: more sepia warmth, desaturated for cream/sage palette,
          // brighter for soft morning light, reduced contrast for atmospheric misty quality
          filter: "sepia(0.18) saturate(0.82) brightness(1.10) contrast(0.96)",
        }}
      />
      {/* Warm cream tint overlay */}
      {/* Warm cream tint — botanical journal warmth (more cream, less amber than sunset) */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(245,237,210,0.18)" }} />
      {/* Sun warmth pulse — slow breathing glow makes the scene feel alive */}
      <motion.div
        style={{ position: "absolute", inset: 0 }}
        animate={{ opacity: [0.55, 1.0, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Softer, more diffuse for misty morning — like light filtering through haze */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 48% at 68% 8%, rgba(255,240,195,0.14) 0%, transparent 100%)" }} />
      </motion.div>
      {/* Sun warmth pulse amplified — the animated version replaces static glow */}
      {/* Top gradient — cream fade into the misty morning scene */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(251,248,238,0.55) 0%, rgba(251,248,238,0.10) 26%, transparent 44%)" }} />
      {/* Photo's natural bottom warmth is sufficient — no extra overlay needed */}
      {/* Edge vignette — cinematic */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 115% 85% at 50% 44%, transparent 32%, rgba(20,14,4,0.22) 100%)" }} />
    </motion.div>
  );
}

// ── Distant people silhouettes in the garden field ───────────────────────────
// Tiny gatherings visible in the warm wildflower field — reinforces "tons of people"
// even before the community cards materialize.

const FIELD_PEOPLE = [
  // [cx, cy, scale, opacity] — increased opacity to be visible over bright golden field
  // Left cluster
  [14, 71, 0.34, 0.22], [17, 70, 0.30, 0.18], [20, 72, 0.28, 0.20],
  // Center-left cluster
  [37, 73, 0.31, 0.20], [40, 72, 0.29, 0.18],
  // Center single
  [49, 75, 0.27, 0.16],
  // Center-right cluster
  [57, 72, 0.32, 0.20], [60, 71, 0.29, 0.17],
  // Right cluster
  [78, 71, 0.33, 0.22], [82, 70, 0.30, 0.18], [85, 72, 0.28, 0.20],
  // Scattered individuals
  [27, 73, 0.28, 0.16], [68, 73, 0.30, 0.16], [45, 74, 0.26, 0.14],
] as const;

function PeopleBackground() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 3, pointerEvents: "none" }}
    >
      {FIELD_PEOPLE.map(([cx, cy, s, op], i) => (
        <g key={i} transform={`translate(${cx},${cy})`} opacity={op}>
          <circle cy={-5 * s} r={2.4 * s} fill="#1a2a0a" />
          <ellipse cy={0.8 * s} rx={1.8 * s} ry={5 * s} fill="#1a2a0a" />
        </g>
      ))}
    </svg>
  );
}

// ── Bokeh ambient particles — warm golden circles floating in background ──────
// Deterministic positions (no Math.random) so SSR and client match.

const BOKEH: { x: number; y: number; s: number; dur: number; delay: number }[] = [
  { x: 8,  y: 16, s: 7,  dur: 5.2, delay: 0.0 },
  { x: 88, y: 22, s: 5,  dur: 4.8, delay: 0.8 },
  { x: 32, y: 74, s: 9,  dur: 6.1, delay: 1.6 },
  { x: 65, y: 12, s: 5,  dur: 5.5, delay: 2.4 },
  { x: 21, y: 48, s: 8,  dur: 4.6, delay: 3.2 },
  { x: 79, y: 60, s: 5,  dur: 5.8, delay: 0.4 },
  { x: 48, y: 88, s: 7,  dur: 4.9, delay: 1.2 },
  { x: 92, y: 40, s: 6,  dur: 6.3, delay: 2.0 },
  { x: 6,  y: 68, s: 8,  dur: 5.1, delay: 2.8 },
  { x: 57, y: 30, s: 5,  dur: 4.7, delay: 0.6 },
  { x: 74, y: 80, s: 7,  dur: 5.9, delay: 1.4 },
  { x: 15, y: 92, s: 5,  dur: 4.4, delay: 2.2 },
  { x: 42, y: 52, s: 6,  dur: 5.6, delay: 0.2 },
  { x: 83, y: 10, s: 4,  dur: 4.5, delay: 1.8 },
  { x: 26, y: 36, s: 7,  dur: 5.3, delay: 3.0 },
  // Near-origin particles — visible at 2x zoom (close-up state)
  { x: 38, y: 55, s: 5,  dur: 4.8, delay: 0.3 },
  { x: 52, y: 64, s: 4,  dur: 5.1, delay: 1.8 },
  { x: 44, y: 57, s: 6,  dur: 4.3, delay: 3.6 },
  { x: 49, y: 53, s: 3,  dur: 5.7, delay: 2.1 },
  { x: 40, y: 66, s: 5,  dur: 4.6, delay: 0.9 },
];

function BokehLayer() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 2 }}>
      {BOKEH.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            borderRadius: "50%",
            background: `rgba(255,200,70,${0.16 + (i % 3) * 0.06})`,
            filter: `blur(${p.s * 1.2}px)`,
            transform: "translate(-50%,-50%)",
          }}
          animate={{ y: [0, -14, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ── Product frame (shoji-style panels) ───────────────────────────────────────

function ProductFrame({ opacity }: { opacity: MotionValue<number> }) {
  const PW = 62;
  return (
    <motion.div style={{ opacity, position: "absolute", inset: 0, pointerEvents: "none" }}>
      {/* Left panel */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: PW, bottom: 0,
        background: "rgba(251,253,246,0.86)",
        backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
        borderRight: "1px solid rgba(224,229,213,0.78)",
      }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 22, width: 1, background: "rgba(197,204,182,0.28)" }} />
      </div>
      {/* Right panel */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: PW, bottom: 0,
        background: "rgba(251,253,246,0.86)",
        backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
        borderLeft: "1px solid rgba(224,229,213,0.78)",
      }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 22, width: 1, background: "rgba(197,204,182,0.28)" }} />
      </div>
      {/* Bottom stats */}
      <div style={{
        position: "absolute", bottom: 0, left: PW, right: PW, height: 54,
        background: "rgba(251,253,246,0.92)",
        backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
        borderTop: "1px solid rgba(224,229,213,0.78)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 36,
      }}>
        {[["847","members"],["24","matches this week"],["12","upcoming events"]].map(([v,l],i,a)=>(
          <div key={l} style={{ display:"flex", alignItems:"baseline", gap:6 }}>
            <span style={{ fontFamily:"var(--font-fragment-mono)", fontSize:15, fontWeight:700, color:"#0a1d08", letterSpacing:"-0.60px" }}>{v}</span>
            <span style={{ fontFamily:"var(--font-fragment-mono)", fontSize:10, color:"#4a3212", letterSpacing:"0.04em", opacity:0.6 }}>{l}</span>
            {i<a.length-1&&<span style={{ marginLeft:14, width:1, height:10, background:"#c5ccb6", display:"inline-block" }}/>}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Full hero section ─────────────────────────────────────────────────────────

// ── Featured area glow — soft pulse between the two central matched members ───

function AnimatedConnectionGlow({ progress }: { progress: MotionValue<number> }) {
  // Glows on as Sarah↔Alex connection completes (scrollEnd 0.42), lingers softly
  const opacity = useTransform(progress, [0.38, 0.44, 0.58, 0.78], [0, 0.42, 0.28, 0.10]);
  // Center between Sarah (33,60) and Alex (59,60)
  return (
    <motion.ellipse
      cx={46} cy={60} rx={22} ry={9}
      fill="rgba(190,240,130,0.45)"
      filter="url(#area-glow)"
      style={{ opacity }}
    />
  );
}

export function FullHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scene scale — zooms background + cards + connections together
  // 2.0x→1.0: starts close-up on Sarah/Alex (just the two + field silhouettes)
  // Full 10-person network reveals at 70% × 1260px = 882px scroll
  const sceneScale = useTransform(scrollYProgress, [0, 0.70], [2.0, 1.0]);
  const heroOp     = useTransform(scrollYProgress, [0, 0.13], [1,   0]);
  const heroY      = useTransform(scrollYProgress, [0, 0.15], [0,  -36]);
  const frameOp    = useTransform(scrollYProgress, [0.80, 1], [0,   1]);

  // Mouse-driven 3D parallax — background subtly shifts opposite to cursor
  // No React state re-renders — all through MotionValues
  const rawMX = useMotionValue(0);
  const rawMY = useMotionValue(0);
  const smoothMX = useSpring(rawMX, { stiffness: 80, damping: 22 });
  const smoothMY = useSpring(rawMY, { stiffness: 80, damping: 22 });
  const bgParallaxX = useTransform(smoothMX, [-0.5, 0.5], [14, -14]);
  const bgParallaxY = useTransform(smoothMY, [-0.5, 0.5], [8,  -8]);

  // Golden spotlight — follows cursor through the warm field, feels like sunlight
  const spotX = useTransform(smoothMX, [-0.5, 0.5], [12, 88]);
  const spotY = useTransform(smoothMY, [-0.5, 0.5], [12, 88]);
  const spotBg = useMotionTemplate`radial-gradient(circle 340px at ${spotX}% ${spotY}%, rgba(255,210,55,0.08) 0%, transparent 100%)`;

  // Collect the first scroll-start per member for node dot timing
  const memberFirstStart = MEMBERS.map((_, mi) => {
    const conn = CONNECTIONS.find(([a, b]) => a === mi || b === mi);
    return conn ? conn[2] + 0.05 : 0.5;
  });

  return (
    <div ref={containerRef} style={{ height: "240vh", position: "relative" }}>
      <div
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          rawMX.set((e.clientX - r.left) / r.width - 0.5);
          rawMY.set((e.clientY - r.top) / r.height - 0.5);
        }}
      >

        {/* ── SCENE — background + connections + cards all scale together ── */}
        {/* transformOrigin at Sarah(33%,60%)↔Alex(59%,60%) midpoint = 46%,60%           */}
        {/* At 2x: Sarah and Alex are large portrait cards filling the center screen      */}
        {/* At 1x: full network revealed — all 10 people zoomed out and connected         */}
        <motion.div
          style={{
            scale: sceneScale,
            transformOrigin: "46% 60%",
            position: "absolute", inset: 0,
            willChange: "transform",
          }}
        >
          {/* Background — mouse parallax only (scene scale handles the zoom) */}
          <motion.div
            style={{
              x: bgParallaxX,
              translateY: bgParallaxY,
              position: "absolute", inset: "-8%",
            }}
          >
            <BackgroundPhoto />
          </motion.div>

          {/* Bokeh */}
          <BokehLayer />

          {/* Distant people in the field — tiny silhouette gatherings */}
          <PeopleBackground />

          {/* Bottom garden tint — reinforces green grass / garden feel */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(80,130,40,0.09) 0%, transparent 35%)",
            zIndex: 1,
            pointerEvents: "none",
          }} />

          {/* ── Connection lines SVG ── */}
          <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 5, overflow: "visible" }}
        >
          {/* Gradient defs — each line glows brightest at its midpoint */}
          <defs>
            {/* Area glow filter for the featured pair pulse */}
            <filter id="area-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.8" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <defs>
            {CONNECTIONS.map(([fi, ti], idx) => (
              <linearGradient
                key={idx}
                id={`cg-${idx}`}
                x1={MEMBERS[fi].x} y1={MEMBERS[fi].y}
                x2={MEMBERS[ti].x} y2={MEMBERS[ti].y}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%"   stopColor="rgba(180,230,120,0.20)" />
                <stop offset="48%"  stopColor={idx === 0 ? "rgba(200,250,100,0.95)" : "rgba(180,230,120,0.80)"} />
                <stop offset="100%" stopColor="rgba(180,230,120,0.20)" />
              </linearGradient>
            ))}
          </defs>

          {/* Soft glow between the central matched pair */}
          <AnimatedConnectionGlow progress={scrollYProgress} />

          {/* Lines */}
          {CONNECTIONS.map(([fi, ti, s, e], idx) => (
            <AnimatedLine
              key={idx}
              from={MEMBERS[fi]}
              to={MEMBERS[ti]}
              progress={scrollYProgress}
              scrollStart={s}
              scrollEnd={e}
              isFeatured={idx === 0}
              gradientId={`cg-${idx}`}
              pathId={`cp-${idx}`}
            />
          ))}
          {/* Nodes */}
          {MEMBERS.map((m, i) => (
            <AnimatedNode
              key={i}
              member={m}
              progress={scrollYProgress}
              scrollStart={memberFirstStart[i]}
            />
          ))}
        </svg>

          {/* ── Member cards ── */}
          <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
            {MEMBERS.map((m, i) => (
              <AnimatedCard key={i} member={m} progress={scrollYProgress} idx={i} />
            ))}
          </div>

        </motion.div>
        {/* ── END SCENE ── */}

        {/* ── Golden spotlight — follows cursor, feels like warm sunlight ── */}
        <motion.div style={{
          position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none",
          background: spotBg,
        }} />

        {/* ── Hero text — outside scene scale, always full-size ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 21, pointerEvents: "none" }}
        >
        <motion.div
          style={{
            opacity: heroOp, y: heroY,
            paddingTop: 72,
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <div style={{
            fontFamily: "var(--font-fragment-mono)", fontSize: 11,
            letterSpacing: "0.06em", color: "#0a1d08",
            marginBottom: 22, textTransform: "uppercase",
            background: "rgba(215,232,181,0.90)", borderRadius: 9999,
            padding: "4px 14px",
            display: "inline-flex", alignItems: "center", gap: 7,
            backdropFilter: "blur(10px)",
          }}>
            {/* Live status dot */}
            <motion.div
              style={{ width: 5, height: 5, borderRadius: "50%", background: "#0a1d08", opacity: 0.7, flexShrink: 0 }}
              animate={{ opacity: [0.7, 0.15, 0.7] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            Community Infrastructure
          </div>

          <h1 style={{
            fontSize: "clamp(44px, 6vw, 70px)", fontWeight: 400,
            lineHeight: 1.0, letterSpacing: "-2.12px", color: "#0a1d08",
            margin: "0 0 22px", fontFamily: "var(--font-akkurat)",
            textShadow: "0 2px 44px rgba(255,248,225,0.95), 0 4px 16px rgba(255,248,225,0.75), 0 1px 4px rgba(255,248,225,0.55)",
          }}>
            Run the <span style={{
              fontStyle: "italic",
              textDecoration: "underline",
              textDecorationColor: "rgba(215,232,181,0.72)",
              textDecorationThickness: "2px",
              textUnderlineOffset: "7px",
            }}>community</span>.<br />Not the ops.
          </h1>

          <p style={{
            fontSize: 17, fontWeight: 400, lineHeight: 1.67,
            letterSpacing: "-0.68px", color: "#1a2d0e",
            maxWidth: 460, margin: "0 auto 34px",
            fontFamily: "var(--font-akkurat)",
            textShadow: "0 0 30px rgba(255,244,210,0.95), 0 1px 12px rgba(255,244,210,0.80), 0 2px 4px rgba(255,244,210,0.60)",
          }}>
            The platform behind private professional communities.
            We handle the ops so you can focus on your people.
          </p>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", pointerEvents: "all" }}>
            {/* Shimmer CTA — light sweep signals primary action */}
            <motion.a href="#" style={{
              background: "#4a3212", color: "#fbfdf6", borderRadius: 20,
              padding: "11px 26px", fontSize: 14, fontWeight: 700,
              letterSpacing: "-0.56px", textDecoration: "none",
              fontFamily: "var(--font-akkurat)",
              boxShadow: "0 4px 22px rgba(74,50,18,0.42)",
              position: "relative", overflow: "hidden", display: "inline-block",
            }}>
              Start building →
              <motion.span
                aria-hidden="true"
                style={{
                  position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,220,100,0.20) 50%, transparent 100%)",
                  pointerEvents: "none",
                }}
                animate={{ x: ["-110%", "110%"] }}
                transition={{ duration: 1.4, ease: "linear", delay: 2.5, repeat: Infinity, repeatDelay: 4.5 }}
              />
            </motion.a>
            <a href="#features" style={{
              background: "rgba(251,253,246,0.76)", color: "#0a1d08",
              border: "1px solid rgba(10,29,8,0.16)", borderRadius: 20,
              padding: "11px 26px", fontSize: 14, fontWeight: 700,
              letterSpacing: "-0.56px", textDecoration: "none",
              fontFamily: "var(--font-akkurat)", backdropFilter: "blur(8px)",
            }}>See how it works</a>
          </div>

          {/* Social proof micro-line */}
          <div style={{
            marginTop: 16,
            fontFamily: "var(--font-fragment-mono)",
            fontSize: 10,
            letterSpacing: "0.06em",
            color: "rgba(10,29,8,0.52)",
            textTransform: "uppercase",
            textShadow: "0 1px 10px rgba(255,244,210,0.90)",
          }}>
            2 communities · 847 members · 24 matches / week
          </div>

          {/* Communities using BubbleLab — real social proof */}
          {/* Social proof — real communities using BubbleLab */}
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {/* Thin separator — visual break from CTAs to social proof */}
            <div style={{ width: 36, height: 1, background: "rgba(10,29,8,0.18)", marginBottom: 2 }} />
            <div style={{
              fontFamily: "var(--font-fragment-mono)", fontSize: 9,
              letterSpacing: "0.10em", color: "rgba(10,29,8,0.45)",
              textTransform: "uppercase",
              textShadow: "0 1px 8px rgba(255,244,210,0.90)",
            }}>
              Powering communities like
            </div>
            <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
              <div style={{
                fontSize: 15, fontWeight: 700, letterSpacing: "-0.60px",
                color: "#7a3954", fontFamily: "var(--font-akkurat)",
                textShadow: "0 1px 14px rgba(255,244,210,0.88)",
                opacity: 0.92,
              }}>
                OGC
              </div>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(10,29,8,0.28)" }} />
              <div style={{
                fontSize: 15, fontWeight: 700, letterSpacing: "-0.60px",
                color: "#275a86", fontFamily: "var(--font-akkurat)",
                textShadow: "0 1px 14px rgba(255,244,210,0.88)",
                opacity: 0.92,
              }}>
                The Den
              </div>
            </div>
          </div>

          {/* Animated scroll arrow */}
          <svg
            width="14" height="20" viewBox="0 0 14 20" fill="none"
            style={{ marginTop: 28, animation: "arrow-bounce 1.8s ease-in-out infinite" }}
          >
            <path d="M7 1L7 19M1 13L7 19L13 13" stroke="#0a1d08" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

        </motion.div>
        </motion.div>

        {/* ── Product frame: materializes as the final reveal ── */}
        <ProductFrame opacity={frameOp} />
      </div>
    </div>
  );
}
