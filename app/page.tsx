import type { CSSProperties, ReactNode } from "react";
import { FullHeroSection, SiteHeader, BOOK_DEMO } from "./scroll-zoom";
import {
  AnimatedFeatureCard,
  Reveal,
} from "./animated-section";

// ── Components ────────────────────────────────────────────────────────────────

// Small shared primitives for the bento graphics ------------------------------

function Av({ src, size = 34, ring = "#d7e8b5" }: { src: string; size?: number; ring?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", border: `2px solid ${ring}`, flexShrink: 0 }} />
  );
}

function Pill({ children, tone = "paper" }: { children: ReactNode; tone?: "paper" | "moss" | "ink" }) {
  const tones = {
    paper: { background: "#fbfdf6", color: "#4a3212", border: "1px solid #e0e5d5" },
    moss: { background: "#d7e8b5", color: "#0a1d08", border: "1px solid #c7dca0" },
    ink: { background: "#0a1d08", color: "#fbfdf6", border: "1px solid #0a1d08" },
  } as const;
  return (
    <span style={{
      ...tones[tone], borderRadius: 9999, padding: "3px 9px", fontSize: 10.5,
      letterSpacing: "0.01em", fontFamily: "var(--font-fragment-mono)", whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  );
}

// Line-style icons, one per card, give each block a distinct visual anchor so
// the bento scans as five different things, not five paragraphs.
const iconProps = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const CARD_ICONS: Record<string, ReactNode> = {
  match: (<svg {...iconProps}><circle cx="9" cy="8" r="3" /><circle cx="17" cy="11" r="2.4" /><path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /><path d="M15 16.5c2.2.2 4 1.6 4 3.5" /></svg>),
  applications: (<svg {...iconProps}><path d="M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1z" /><rect x="5" y="6" width="14" height="15" rx="2" /><path d="m9 14 2 2 4-4" /></svg>),
  automations: (<svg {...iconProps}><path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8z" /></svg>),
  directory: (<svg {...iconProps}><circle cx="10.5" cy="10.5" r="5.5" /><path d="m20 20-4.2-4.2" /><path d="M10.5 8.1l.7 1.7 1.7.7-1.7.7-.7 1.7-.7-1.7-1.7-.7 1.7-.7z" fill="currentColor" stroke="none" /></svg>),
  events: (<svg {...iconProps}><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" /><path d="m9 15 2 2 4-4" /></svg>),
  analytics: (<svg {...iconProps}><path d="M4 4v16h16" /><path d="m7 14 3.5-4 3 2.5L21 6" /><path d="M21 10V6h-4" /></svg>),
};

function CardHead({ title, body, icon }: { title: string; body: string; icon: string }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 9 }}>
        <span style={{ width: 32, height: 32, borderRadius: 9, background: "#eef4e0", border: "1px solid #dde7c8", display: "flex", alignItems: "center", justifyContent: "center", color: "#3c5a1e", flexShrink: 0 }}>
          {CARD_ICONS[icon]}
        </span>
        <div style={{ fontSize: 18.5, fontWeight: 700, letterSpacing: "-0.7px", color: "#0a1d08", fontFamily: "var(--font-akkurat)", lineHeight: 1.12, flex: 1, minWidth: 0 }}>
          {title}
        </div>
      </div>
      <div style={{ fontSize: 13.5, lineHeight: 1.55, letterSpacing: "-0.4px", color: "#4a3212", fontFamily: "var(--font-akkurat)", opacity: 0.9 }}>
        {body}
      </div>
    </div>
  );
}

const cardBase: CSSProperties = {
  background: "#fbfdf6",
  border: "1px solid #e0e5d5",
  borderRadius: 16,
  padding: 22,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  position: "relative",
};

// Each bento card's bespoke graphic, anchored to the bottom of the card -------

// Section header that separates the matchmaking card's two modes. A bolder,
// darker label + a fading rule so each mode reads as its own clear section.
function MatchLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <span style={{ fontFamily: "var(--font-fragment-mono)", fontSize: 10.5, letterSpacing: "0.09em", textTransform: "uppercase", color: "#3c5a1e", fontWeight: 700, whiteSpace: "nowrap" }}>{children}</span>
      <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(122,162,74,0.38), rgba(122,162,74,0))" }} />
    </div>
  );
}

// Smaller label for the sub-groups of what gets surfaced (person / threads).
function SubLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: "var(--font-fragment-mono)", fontSize: 8.5, letterSpacing: "0.07em", textTransform: "uppercase", color: "#4a3212", opacity: 0.48, marginBottom: 6 }}>
      {children}
    </div>
  );
}

// One person in the pairing: avatar on top, name + company stacked below it.
function PairPerson({ src, name, sub }: { src: string; name: string; sub: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, flex: 1, minWidth: 0 }}>
      <Av src={src} size={46} />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#0a1d08", fontFamily: "var(--font-akkurat)", letterSpacing: "-0.4px" }}>{name}</div>
        <div style={{ fontSize: 10.5, color: "#968e83", fontFamily: "var(--font-fragment-mono)", marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

function MatchmakingGraphic() {
  return (
    <div style={{ marginTop: 16, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: 0 }}>
      {/* ── Mode 1: weekly 1:1 pairing ─────────────────────────────────────── */}
      <div>
        <MatchLabel>Weekly 1:1 pairing</MatchLabel>
        <div style={{ position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          {/* connecting line that runs through both avatars, behind the pill */}
          <div aria-hidden style={{ position: "absolute", left: "19%", right: "19%", top: 22.5, height: 1.5, background: "linear-gradient(90deg, transparent, #c2d29c 22%, #c2d29c 78%, transparent)", zIndex: 0 }} />
          <PairPerson src="/avatars/sarah.jpg" name="Sarah M." sub="COO · Series A" />
          <div style={{ position: "relative", zIndex: 1, marginTop: 12 }}>
            <Pill tone="moss">✦ matched</Pill>
          </div>
          <PairPerson src="/avatars/alex.jpg" name="Alex K." sub="Head of People · Series B" />
        </div>

        {/* Why they were paired */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 13, flexWrap: "wrap" }}>
          <Pill>both based in SF</Pill>
          <Pill>first time at this stage</Pill>
        </div>

        {/* The intro email, drafted and sent automatically */}
        <div style={{ marginTop: 13, background: "#f4f7ee", border: "1px solid #e8ecdf", borderRadius: 10, padding: "11px 13px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
            <Pill>✉ intro email</Pill>
            <span style={{ fontSize: 10.5, color: "#968e83", fontFamily: "var(--font-fragment-mono)" }}>sent automatically</span>
          </div>
          <div style={{ fontSize: 12.5, lineHeight: 1.5, color: "#31200b", fontFamily: "var(--font-akkurat)" }}>
            &ldquo;Sarah, meet Alex, you&apos;re both scaling teams from 10 to 50 right now. Grab a virtual coffee?&rdquo;
          </div>
        </div>
      </div>

      {/* ── Mode 2: auto-surfaced intros from real conversations ───────────── */}
      <div>
        <MatchLabel>When someone needs help</MatchLabel>
        {/* The ask, picked up from a conversation */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
          <Av src="/avatars/maya.jpg" size={30} />
          <div style={{ flex: 1, background: "#fbfdf6", border: "1px solid #e8ecdf", borderRadius: "4px 12px 12px 12px", padding: "8px 11px", fontSize: 12, lineHeight: 1.45, color: "#31200b", fontFamily: "var(--font-akkurat)" }}>
            &ldquo;Anyone been through a SOC 2 audit recently? A little lost on where to start.&rdquo;
          </div>
        </div>

        {/* What we surface, indented under the ask */}
        <div style={{ marginTop: 11, marginLeft: 39, display: "flex", flexDirection: "column", gap: 11 }}>
          {/* The right person to ask */}
          <div>
            <SubLabel>The right person to ask</SubLabel>
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#f4f7ee", border: "1px solid #e8ecdf", borderRadius: 10, padding: "9px 11px" }}>
              <Av src="/avatars/jordan.jpg" size={32} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#0a1d08", fontFamily: "var(--font-akkurat)", letterSpacing: "-0.4px" }}>Jordan P.</div>
                <div style={{ fontSize: 10.5, color: "#4a3212", opacity: 0.82, fontFamily: "var(--font-akkurat)", marginTop: 1 }}>Ran SOC 2 end to end, start to cert</div>
              </div>
              <Pill tone="moss">✦ top match</Pill>
            </div>
          </div>

          {/* Past threads where this came up before */}
          <div>
            <SubLabel>Past threads on this</SubLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { snippet: "Here's the SOC 2 checklist we actually used, DM me", channel: "#compliance", meta: "3 mo ago · 14 replies" },
                { snippet: "We got through it in 6 weeks, happy to share our prep", channel: "#founders", meta: "5 mo ago · 9 replies" },
              ].map((t) => (
                <div key={t.channel} style={{ display: "flex", alignItems: "flex-start", gap: 8, background: "#fbfdf6", border: "1px solid #e8ecdf", borderRadius: 9, padding: "7px 10px" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a7b497" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1.5 }}>
                    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
                  </svg>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11.5, color: "#31200b", fontFamily: "var(--font-akkurat)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>&ldquo;{t.snippet}&rdquo;</div>
                    <div style={{ fontSize: 9.5, color: "#968e83", fontFamily: "var(--font-fragment-mono)", marginTop: 2 }}>{t.channel} · {t.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplicationsGraphic() {
  const rows = [
    { label: "New application", dot: "#c5ccb6", tag: <Pill>pending review</Pill> },
    { label: "Approved", dot: "#7aa24a", tag: <Pill tone="moss">✓ approved</Pill> },
    { label: "Stripe checkout", dot: "#635BFF", tag: <Pill>✓ paid</Pill> },
    { label: "Auto-invited to Slack", dot: "#4A154B", tag: <Pill tone="ink">✓ joined</Pill> },
    { label: "Welcome DM", dot: "#6f9a3f", tag: <Pill>day 0</Pill> },
    { label: "14-day check-in", dot: "#a8c47e", tag: <Pill>day 14</Pill> },
  ];
  return (
    <div style={{ marginTop: 18, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>
      {rows.map((r, i) => (
        <div key={r.label}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: r.dot, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#0a1d08", fontFamily: "var(--font-akkurat)", letterSpacing: "-0.4px" }}>{r.label}</div>
            </div>
            {r.tag}
          </div>
          {i < rows.length - 1 && (
            <div style={{ height: 10, marginLeft: 3.5, borderLeft: "1.5px dashed #d3dac6" }} />
          )}
        </div>
      ))}
    </div>
  );
}

// One automation: the rule on the left (bolt + action + trigger/tool), a small
// live-looking graphic of the result on the right.
function AutoRow({ action, when, tool, children }: { action: string; when: string; tool: string; children: ReactNode }) {
  return (
    <div style={{ background: "#f4f7ee", border: "1px solid #e8ecdf", borderRadius: 12, padding: "11px 13px", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#0a1d08", fontFamily: "var(--font-akkurat)", letterSpacing: "-0.4px", lineHeight: 1.3 }}>{action}</div>
        <div style={{ fontSize: 10.5, color: "#968e83", fontFamily: "var(--font-fragment-mono)", marginTop: 4 }}>{when} · {tool}</div>
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

function AutomationsGraphic() {
  return (
    <div style={{ marginTop: 16, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 11 }}>
      {/* 1. Intro auto-posted to #intros */}
      <AutoRow action="Post a new member's intro to #intros" when="the moment they pay" tool="Slack">
        <div style={{ width: 158, background: "#fbfdf6", border: "1px solid #e0e5d5", borderRadius: 9, padding: "8px 9px", display: "flex", alignItems: "center", gap: 7 }}>
          <Av src="/avatars/maya.jpg" size={26} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#0a1d08", fontFamily: "var(--font-akkurat)" }}>Maya joined 👋</div>
            <div style={{ fontSize: 9.5, color: "#968e83", fontFamily: "var(--font-akkurat)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>ex-Stripe, payments infra</div>
          </div>
        </div>
      </AutoRow>

      {/* 2. 📸-reacted photos collected into the gallery (real event photo card) */}
      <AutoRow action="Save every photo reacted with 📸 to the gallery" when="the moment it's reacted" tool="Slack">
        <div style={{ width: 158, borderRadius: 10, overflow: "hidden", border: "1px solid #e0e5d5", background: "#fbfdf6", boxShadow: "0 1px 4px rgba(10,29,8,0.12)" }}>
          <div style={{ position: "relative", height: 80 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gallery/sf-event.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 52%", display: "block" }} />
            {/* gradient so the tagged faces read over the photo */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,29,8,0.5) 0%, transparent 42%)" }} />
            {/* tagged members */}
            <div style={{ position: "absolute", bottom: 5, left: 6, display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ display: "flex" }}>
                {["/avatars/jordan.jpg", "/avatars/maya.jpg", "/avatars/alex.jpg"].map((p, i) => (
                  <span key={p} style={{ marginLeft: i === 0 ? 0 : -7 }}><Av src={p} size={18} ring="#fbfdf6" /></span>
                ))}
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#fbfdf6", fontFamily: "var(--font-fragment-mono)", textShadow: "0 1px 2px rgba(10,29,8,0.5)" }}>+5 tagged</span>
            </div>
          </div>
          <div style={{ padding: "5px 8px", display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#7a3954" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.4" />
            </svg>
            <span style={{ fontSize: 9.5, color: "#4a3212", fontFamily: "var(--font-fragment-mono)", letterSpacing: "0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Hacker House · SF</span>
          </div>
        </div>
      </AutoRow>

      {/* 3. Event reminder, the old Event Calendar graphic folded in here */}
      <AutoRow action="DM an event reminder the morning of" when="when they RSVP" tool="Luma">
        <div style={{ width: 158, background: "#fbfdf6", border: "1px solid #e0e5d5", borderRadius: 9, padding: "8px 9px", display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 34, flexShrink: 0, textAlign: "center", background: "#fbfdf6", border: "1px solid #e0e5d5", borderRadius: 7, overflow: "hidden" }}>
            <div style={{ fontSize: 7.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fbfdf6", background: "#4a3212", padding: "1px 0", fontFamily: "var(--font-fragment-mono)" }}>Jul</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0a1d08", fontFamily: "var(--font-akkurat)", padding: "1px 0 2px", letterSpacing: "-0.5px" }}>18</div>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#0a1d08", fontFamily: "var(--font-akkurat)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Founder Dinner</div>
            <div style={{ fontSize: 9.5, color: "#968e83", fontFamily: "var(--font-fragment-mono)" }}>6:30pm · NYC</div>
          </div>
        </div>
      </AutoRow>
    </div>
  );
}

function DirectoryGraphic() {
  const results = [
    { src: "/avatars/maya.jpg", name: "Priya N.", why: "ex-Goldman, now founder of a payments startup" },
    { src: "/avatars/jordan.jpg", name: "Dana R.", why: "left a hedge fund to build dev tools" },
  ];
  return (
    <div style={{ marginTop: 18, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
      {/* AI search, members ask in plain language, the right people surface */}
      <div style={{ borderRadius: 10, border: "1px solid #e0e5d5", background: "#f8faf3", padding: "11px 12px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#7aa24a" stroke="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M12 2l1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7z" />
          </svg>
          <span style={{ fontSize: 12.5, lineHeight: 1.4, color: "#31200b", fontWeight: 500, fontFamily: "var(--font-akkurat)" }}>
            &ldquo;Who are some other founders who pivoted from finance into tech?&rdquo;
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 11, marginBottom: 8 }}>
          <span style={{ fontSize: 10, color: "#968e83", fontFamily: "var(--font-fragment-mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>surfaced</span>
          <Pill tone="moss">3 strong matches</Pill>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {results.map((r) => (
            <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <Av src={r.src} size={26} ring="#f8faf3" />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0a1d08", fontFamily: "var(--font-akkurat)", letterSpacing: "-0.3px" }}>{r.name}</div>
                <div style={{ fontSize: 10.5, color: "#4a3212", opacity: 0.78, fontFamily: "var(--font-akkurat)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.why}</div>
              </div>
            </div>
          ))}
          <span style={{ fontSize: 10.5, color: "#968e83", fontFamily: "var(--font-fragment-mono)", marginLeft: 35 }}>+1 more</span>
        </div>
      </div>

      {/* Auto-enrichment, the data that makes the search possible */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
        <span style={{ fontSize: 10.5, color: "#968e83", fontFamily: "var(--font-fragment-mono)" }}>profiles auto-enriched from</span>
        <Pill>LinkedIn</Pill>
        <Pill>X</Pill>
        <Pill>the web</Pill>
      </div>
    </div>
  );
}

// A member-health signal: status dot, the finding, a category tag, the receipt.
function Signal({ dot, value, sub, tag, tagStyle }: { dot: string; value: string; sub: string; tag: string; tagStyle: CSSProperties }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: dot, flexShrink: 0, marginTop: 5 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0a1d08", fontFamily: "var(--font-akkurat)", letterSpacing: "-0.4px" }}>{value}</span>
          <span style={{ ...tagStyle, borderRadius: 9999, padding: "2px 8px", fontSize: 9.5, fontWeight: 600, fontFamily: "var(--font-fragment-mono)", whiteSpace: "nowrap", flexShrink: 0 }}>{tag}</span>
        </div>
        <div style={{ fontSize: 10.5, color: "#968e83", fontFamily: "var(--font-akkurat)", marginTop: 1 }}>{sub}</div>
      </div>
    </div>
  );
}

function AnalyticsGraphic() {
  return (
    <div style={{ marginTop: 18, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
      {/* Engagement trend, the "cool graphic" up top */}
      <div style={{ background: "#f8faf3", border: "1px solid #e0e5d5", borderRadius: 10, padding: "10px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 10, color: "#968e83", fontFamily: "var(--font-fragment-mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Weekly engagement</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#4a6a2a", fontFamily: "var(--font-akkurat)" }}>↑ 12%</span>
        </div>
        <svg viewBox="0 0 120 30" preserveAspectRatio="none" style={{ width: "100%", height: 30, display: "block" }}>
          <polyline points="0,25 17,21 34,23 51,15 68,17 85,9 102,11 120,4" fill="none" stroke="#7aa24a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Who needs attention, who's thriving, who's growing the community */}
      <Signal dot="#c1654a" value="5 members going quiet" sub="no activity in 30 days" tag="churn risk" tagStyle={{ background: "#f6e4dc", color: "#a14e32", border: "1px solid #ecccbd" }} />
      <Signal dot="#7aa24a" value="Jordan P." sub="42 messages, 3 intros made" tag="most active" tagStyle={{ background: "#d7e8b5", color: "#0a1d08", border: "1px solid #c7dca0" }} />
      <Signal dot="#4a3212" value="Sarah M." sub="referred 8 members, 3 joined" tag="top referrer" tagStyle={{ background: "#fbfdf6", color: "#4a3212", border: "1px solid #e0e5d5" }} />
    </div>
  );
}

// The bento cards, in render order. `area` carries grid placement (desktop).
const BENTO = [
  {
    title: "Smart Matchmaking", icon: "match",
    body: "Automatically pairs members every week, and when someone asks for help, surfaces the right person to introduce them to, intro drafted and ready.",
    area: { gridColumn: "span 4", gridRow: "span 2" }, graphic: <MatchmakingGraphic />,
  },
  {
    title: "Applications & Checkout", icon: "applications",
    body: "The whole approval pipeline and Stripe checkout in one place, customized to how you run things and handled automatically.",
    area: { gridColumn: "span 2" }, graphic: <ApplicationsGraphic />,
  },
  {
    title: "Member Analytics", icon: "analytics",
    body: "See who's engaging, who's about to churn, who's contributing most, and who's referring new members, at a glance.",
    area: { gridColumn: "span 2" }, graphic: <AnalyticsGraphic />,
  },
  {
    title: "Member Intelligence", icon: "directory",
    body: "Every profile auto-enriched from LinkedIn and the web, so members can find exactly who they need by asking in plain language.",
    area: { gridColumn: "span 3" }, graphic: <DirectoryGraphic />,
  },
  {
    title: "Custom Automations", icon: "automations",
    body: "Anything you can describe, we build and run for you, wired into the tools you already use.",
    area: { gridColumn: "span 3" }, graphic: <AutomationsGraphic />,
  },
];

function Features() {
  return (
    <section id="features" style={{ background: "#eff2e8", padding: "88px 32px", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            <div style={{
              fontFamily: "var(--font-fragment-mono)", fontSize: 11, letterSpacing: "0.06em",
              color: "#4a3212", textTransform: "uppercase", marginBottom: 14, opacity: 0.8,
            }}>
              The operational layer
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, letterSpacing: "-1.68px",
              color: "#0a1d08", fontFamily: "var(--font-akkurat)", margin: 0, lineHeight: 1.1,
            }}>
              Everything that runs<br />behind the scenes.
            </h2>
          </div>
        </Reveal>

        <div className="bento" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridAutoRows: "1fr", gap: 14 }}>
          {BENTO.map((c, i) => (
            <AnimatedFeatureCard key={c.title} index={i} style={c.area}>
              <div className="lift-card" style={cardBase}>
                <CardHead title={c.title} body={c.body} icon={c.icon} />
                {c.graphic}
              </div>
            </AnimatedFeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Real testimonial from OGC member (from the actual bubblelab-community-platform codebase) ──

function Communities() {
  return (
    // Warm gradient bridge from the golden hero into the cream sections
    <section id="communities" style={{ padding: "96px 32px", background: "linear-gradient(to bottom, rgba(245,220,160,0.10) 0%, #fbfdf6 28%)", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div style={{
            fontFamily: "var(--font-fragment-mono)", fontSize: 11, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "#4a3212", marginBottom: 16, opacity: 0.7,
          }}>
            Highlighted customer testimonial
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, letterSpacing: "-1.68px",
            color: "#0a1d08", fontFamily: "var(--font-akkurat)", margin: 0, lineHeight: 1.1,
          }}>
            Trusted by communities that take<br />membership seriously.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <figure style={{ maxWidth: 600, margin: "44px auto 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* decorative quote mark */}
            <span aria-hidden="true" style={{
              fontFamily: "var(--font-akkurat)", fontSize: 60, lineHeight: 0.5,
              color: "rgba(122,57,84,0.22)", marginBottom: 18, userSelect: "none",
            }}>&ldquo;</span>
            {/* TODO: swap in Mallory's real quote once she sends it */}
            <blockquote style={{
              fontSize: "clamp(16px, 1.55vw, 20px)", fontWeight: 400, lineHeight: 1.62,
              letterSpacing: "-0.3px", color: "#31200b",
              fontFamily: "var(--font-akkurat)", margin: 0,
            }}>
              Running OGC used to mean living in spreadsheets and endless DMs. Now
              the ops just happen in the background, I get to spend my time with
              our members, not managing them.
            </blockquote>
            <figcaption style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 30 }}>
              <img
                src="/communities/mallory.png"
                alt="Mallory Contois"
                style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", objectPosition: "center 45%", border: "1.5px solid #d7a9b8" }}
              />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0a1d08", fontFamily: "var(--font-akkurat)", letterSpacing: "-0.2px" }}>
                  Mallory Contois
                </div>
                <div style={{ fontSize: 11, color: "#7a3954", fontFamily: "var(--font-fragment-mono)", letterSpacing: "0.04em", marginTop: 3 }}>
                  Old Girls Club Founder
                </div>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

const FAQS: { q: string; a: string }[] = [
  {
    q: "I'm already running a community across a dozen tools. Can you migrate it?",
    a: "That's exactly who we're built for. If you're juggling separate tools for applications, payments, the directory, events, and messaging, we pull all of it into one platform and migrate you off your existing stack. And we do a no-risk build out: we set everything up in parallel and you only switch once it's ready, so you're never paying for two systems at the same time.",
  },
  {
    q: "How fast can my community go live?",
    a: "Fast. You tell us who it's for, what it values, and how you want it run, and we configure the whole machine around you: applications, checkout, onboarding, the member directory, matchmaking, analytics, and automations. Most communities are up and running by week one.",
  },
  {
    q: "Does it work with my existing Slack?",
    a: "Yes, and Slack is where we shine. Approved members get auto-invited, intros post themselves, photos collect into a gallery, event reminders go out, and DM automations run in the background. We also work with communities that run on Discord, WhatsApp, and more, so wherever your community lives, we can handle it.",
  },
  {
    q: "Do I have to manage another inbox on top of Slack?",
    a: "No. Every message auto-syncs between Slack and Bubble Lab, so you never have to work in two places. We surface the matches, intros, and insights on top of the conversations already happening in Slack. We're not replacing your communication layer, we enrich the Slack experience and add the functionality around it.",
  },
  {
    q: "Who decides which members get in?",
    a: "You do, always. You set the bar, and the application form, approvals, and Stripe checkout all live in one place. Every applicant is collected and organized for your one-click yes or no, no spreadsheets, no chasing payments.",
  },
  {
    q: "How does the matchmaking work?",
    a: "Two ways. Every week it pairs members who should know each other, with the shared context and an intro drafted and ready to send. And when someone asks for help, it surfaces the right person to talk to, plus the past threads where it came up before.",
  },
  {
    q: "How do members find each other?",
    a: "Every profile is auto-enriched from LinkedIn and the web, so members can search in plain language. Ask for “founders who pivoted from finance into tech” and the right people come back, not a list of keyword matches.",
  },
  {
    q: "Can I see how my community is doing?",
    a: "Yes. You see who's engaging, who's drifting toward churn, who's contributing most, and who's referring new members, so you can step in where it matters instead of guessing.",
  },
];

function FAQ() {
  return (
    <section id="faq" style={{ padding: "84px 32px", background: "#eff2e8", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{
              fontFamily: "var(--font-fragment-mono)", fontSize: 11, letterSpacing: "0.06em",
              textTransform: "uppercase", color: "#0a1d08", marginBottom: 14,
            }}>
              Questions
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, letterSpacing: "-1.68px",
              color: "#0a1d08", fontFamily: "var(--font-akkurat)", margin: 0, lineHeight: 1.1,
            }}>
              You bring your vision,<br />we build the machine.
            </h2>
          </div>
        </Reveal>
        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((f) => (
              <details key={f.q} className="faq-item" style={{
                background: "#fbfdf6", border: "1px solid #e0e5d5", borderRadius: 12,
                padding: "18px 22px",
              }}>
                <summary style={{
                  fontSize: 16, fontWeight: 700, letterSpacing: "-0.5px", color: "#0a1d08",
                  fontFamily: "var(--font-akkurat)", cursor: "pointer", listStyle: "none",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                }}>
                  {f.q}
                  <span className="faq-mark" style={{ color: "#4a3212", fontSize: 20, lineHeight: 1, flexShrink: 0 }}>+</span>
                </summary>
                <p style={{
                  fontSize: 15, lineHeight: 1.65, letterSpacing: "-0.3px", color: "#31200b",
                  fontFamily: "var(--font-akkurat)", margin: "12px 0 2px",
                }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section
      id="cta"
      style={{
        background: "#0a1d08",
        padding: "88px 32px",
        textAlign: "center",
        scrollMarginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
        <div
          style={{
            fontFamily: "var(--font-fragment-mono)",
            fontSize: 11,
            letterSpacing: "0.06em",
            color: "#d7e8b5",
            textTransform: "uppercase",
            marginBottom: 24,
            opacity: 0.7,
          }}
        >
          Ready to start
        </div>
        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: "-2.12px",
            color: "#fbfdf6",
            margin: "0 0 24px",
            fontFamily: "var(--font-akkurat)",
          }}
        >
          Stop juggling tools.
          <br />
          Start running your community.
        </h2>
        <p
          style={{
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.67,
            letterSpacing: "-0.64px",
            color: "#d7e8b5",
            maxWidth: 420,
            margin: "0 auto 44px",
            fontFamily: "var(--font-akkurat)",
            opacity: 0.8,
          }}
        >
          Ready to hand off the ops? Let&apos;s get your community off the
          ground, or take the one you&apos;re running and make it scale.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href={BOOK_DEMO}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-hover cta-solid"
            style={{
              background: "#d7e8b5",
              color: "#0a1d08",
              borderRadius: 20,
              padding: "14px 34px",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "-0.56px",
              textDecoration: "none",
              fontFamily: "var(--font-akkurat)",
            }}
          >
            Book a demo →
          </a>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    // Dark, continues the CTA section for a cohesive dark base to the page
    <footer style={{ background: "#0a1d08", borderTop: "1px solid rgba(251,253,246,0.08)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        {/* Bottom bar */}
        <div style={{ padding: "26px 0 30px", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-fragment-mono)", fontSize: 10, letterSpacing: "0.04em", color: "rgba(251,253,246,0.4)" }}>
            © 2026 Bubble Lab · Run the community. Not the ops.
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy", "Terms"].map((l) => (
              <a key={l} href="#" style={{ fontFamily: "var(--font-fragment-mono)", fontSize: 10, letterSpacing: "0.04em", color: "rgba(251,253,246,0.4)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div
      id="top"
      style={{
        background: "#fbfdf6",
        minHeight: "100dvh",
        fontFamily: "var(--font-akkurat)",
      }}
    >
      <SiteHeader />
      <FullHeroSection />
      <Communities />
      <Features />
      <FAQ />
      <CtaSection />
      <Footer />
    </div>
  );
}
