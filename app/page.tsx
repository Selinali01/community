import { FullHeroSection } from "./scroll-zoom";
import {
  AnimatedFeatureCard,
  AnimatedStep,
  AnimatedSectionLabel,
  Reveal,
  CountUp,
} from "./animated-section";

// ── Data ─────────────────────────────────────────────────────────────────────

const FEATURES: { num: string; title: string; body: string; icon: string }[] = [
  {
    num: "01", title: "Applications & Vetting",
    body: "A configurable form, approval pipeline, and Stripe checkout. Every new member is vetted, welcomed, and activated automatically — zero manual work.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    num: "02", title: "Member Directory",
    body: "Searchable, filterable, with list and map view. Members find each other by role, industry, company, and location.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    num: "03", title: "1:1 Matchmaking",
    body: "AI-powered weekly pairings with a why, shared themes, and conversation starters. Drafted and ready to send in one click.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    num: "04", title: "Event Calendar",
    body: "Native Luma integration for IRL and virtual events. Members see everything in one place, inside the dashboard they already use.",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    num: "05", title: "Lifecycle Messaging",
    body: "Automated emails and Slack DMs triggered by member events. A simple rules engine: on event → delay → send template.",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    num: "06", title: "Slack Integration",
    body: "Auto-invite to your workspace, structured intro posts, and DM automation. Your Slack becomes the community's beating heart.",
    icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Bring your vision",
    body: "Tell us who your community is for, what it values, and how you want it to run. We configure everything around you.",
  },
  {
    num: "02",
    title: "We build the machine",
    body: "Application form, onboarding flow, member directory, weekly matchmaking, events, and automations — all running from day one.",
  },
  {
    num: "03",
    title: "You show up for your people",
    body: "Community building is a human job. We make sure the infrastructure never makes it feel like an operations job.",
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        // Frosted glass — always readable against the animated hero background
        background: "rgba(251,253,246,0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(224,229,213,0.35)",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "-0.56px",
            color: "#0a1d08",
            fontFamily: "var(--font-akkurat)",
          }}
        >
          BubbleLab
        </div>
        <a
          href="#"
          style={{
            background: "#4a3212",
            color: "#fbfdf6",
            borderRadius: 20,
            padding: "8px 20px",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "-0.56px",
            textDecoration: "none",
            fontFamily: "var(--font-akkurat)",
          }}
        >
          Get started
        </a>
      </nav>
    </div>
  );
}


function Features() {
  return (
    <section
      id="features"
      style={{
        background: "#eff2e8",
        padding: "88px 32px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div
            style={{
              fontFamily: "var(--font-fragment-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "#0a1d08",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            What we handle
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400,
            letterSpacing: "-1.68px", color: "#0a1d08",
            fontFamily: "var(--font-akkurat)", margin: 0, lineHeight: 1.1,
          }}>
            Everything it takes to run a community.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {FEATURES.map((f, i) => (
            <AnimatedFeatureCard key={f.num} index={i}>
            <div
              className="lift-card"
              style={{
                background: "#fbfdf6",
                border: "1px solid #e0e5d5",
                borderRadius: 8,
                padding: "28px",
                height: "100%",
              }}
            >
              {/* Feature icon + number row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#203b14" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                  style={{ opacity: 0.75 }}
                >
                  <path d={f.icon} />
                </svg>
                <div style={{
                  fontFamily: "var(--font-fragment-mono)", fontSize: 10,
                  letterSpacing: "0.06em", color: "#4a3212", opacity: 0.6,
                }}>
                  {f.num}
                </div>
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "-0.64px",
                  color: "#0a1d08",
                  marginBottom: 10,
                  lineHeight: 1.25,
                  fontFamily: "var(--font-akkurat)",
                }}
              >
                {f.title}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  letterSpacing: "-0.56px",
                  lineHeight: 1.57,
                  color: "#31200b",
                  fontFamily: "var(--font-akkurat)",
                }}
              >
                {f.body}
              </div>
            </div>
            </AnimatedFeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={{ padding: "88px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "var(--font-fragment-mono)",
            fontSize: 11,
            letterSpacing: "0.06em",
            color: "#0a1d08",
            textTransform: "uppercase",
            marginBottom: 52,
            textAlign: "center",
          }}
        >
          How it works
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 48,
          }}
        >
          {STEPS.map((step, i) => (
            <AnimatedStep key={step.num} index={i}>
            <div style={{ position: "relative" }}>
              {/* Numbered badge — warm loam circle, cream numeral */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: "#4a3212", color: "#fbfdf6",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-fragment-mono)", fontSize: 15, fontWeight: 700,
                  letterSpacing: "-0.4px", flexShrink: 0,
                  boxShadow: "0 6px 18px -6px rgba(74,50,18,0.5)",
                }}>
                  {step.num}
                </div>
                {i < 2 && <div style={{ flex: 1, borderTop: "1px dashed #c5ccb6" }} />}
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "-0.72px",
                  color: "#0a1d08",
                  marginBottom: 12,
                  lineHeight: 1.2,
                  fontFamily: "var(--font-akkurat)",
                }}
              >
                {step.title}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  letterSpacing: "-0.60px",
                  lineHeight: 1.6,
                  color: "#31200b",
                  fontFamily: "var(--font-akkurat)",
                }}
              >
                {step.body}
              </div>
            </div>
            </AnimatedStep>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Real testimonial from OGC member (from the actual bubblelab-community-platform codebase) ──

function Testimonial() {
  return (
    // Subtle warm gradient at top — visual bridge from the golden hero to cream sections
    <section style={{ padding: "80px 32px", background: "linear-gradient(to bottom, rgba(245,220,160,0.10) 0%, #fbfdf6 28%)", textAlign: "center" }}>
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <div style={{
          fontFamily: "var(--font-fragment-mono)", fontSize: 10,
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: "#4a3212", marginBottom: 28, opacity: 0.6,
        }}>
          From the community
        </div>
        <Reveal>
        <blockquote style={{
          fontSize: 22, fontWeight: 400, lineHeight: 1.55,
          letterSpacing: "-0.88px", color: "#0a1d08",
          fontFamily: "var(--font-akkurat)", fontStyle: "italic",
          margin: "0 0 24px",
        }}>
          &ldquo;OGC has become a part of my daily life. I didn&rsquo;t think a Slack community
          could make such a big impact on me, but I can&rsquo;t go without it now.
          It&rsquo;s a place where I feel zero judgement.&rdquo;
        </blockquote>
        </Reveal>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Lindsay Rios"
            style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "1.5px solid #d7e8b5" }}
          />
          <div style={{ fontSize: 12, color: "#4a3212", fontFamily: "var(--font-fragment-mono)", letterSpacing: "0.02em" }}>
            — Lindsay Rios, <span style={{ color: "#7a3954", fontWeight: 700 }}>OGC</span> Member
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Product UI preview — what the dashboard actually looks like ──────────────

const PREVIEW_MEMBERS = [
  { name: "Sarah M.", role: "Head of Growth", co: "Figma",  brand: "#7B61FF", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Alex K.",  role: "VP Engineering", co: "Linear", brand: "#5D64CF", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Jordan L.",role: "Chief of Staff",  co: "Stripe", brand: "#635BFF", photo: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Maya P.",  role: "Head of Product", co: "Notion", brand: "#37352F", photo: "https://randomuser.me/api/portraits/women/22.jpg" },
];

function ProductPreview() {
  return (
    <section style={{ padding: "80px 32px", background: "#eff2e8" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            fontFamily: "var(--font-fragment-mono)", fontSize: 11,
            letterSpacing: "0.06em", textTransform: "uppercase",
            color: "#0a1d08", marginBottom: 12,
          }}>
            The platform
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400,
            letterSpacing: "-1.68px", color: "#0a1d08",
            fontFamily: "var(--font-akkurat)", margin: 0, lineHeight: 1.1,
          }}>
            Your whole community, in one place.
          </h2>
        </div>

        {/* Product window mockup */}
        <Reveal>
        <div style={{
          background: "#fbfdf6", border: "1px solid #0a1d08",
          borderRadius: 20, overflow: "hidden",
          boxShadow: "0 32px 80px -16px rgba(10,29,8,0.16), rgba(99,143,61,0.1) 0px 0px 0px 1px",
        }}>
          {/* Chrome bar */}
          <div style={{
            height: 44, borderBottom: "1px solid #e0e5d5",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 20px", background: "#fbfdf6",
          }}>
            <div style={{ display: "flex", gap: 6 }}>
              {(["#c5ccb6", "#e0e5d5", "#d7e8b5"] as const).map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, border: "1px solid rgba(10,29,8,0.10)" }} />
              ))}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#0a1d08", letterSpacing: "-0.48px", fontFamily: "var(--font-akkurat)" }}>
              BubbleLab Community
            </div>
            <div className="preview-tabs" style={{ display: "flex", gap: 4 }}>
              {(["Directory", "Matchmaking", "Events"] as const).map((label) => (
                <div key={label} style={{
                  padding: "3px 10px", borderRadius: 9999, fontSize: 11,
                  letterSpacing: "-0.44px", fontFamily: "var(--font-akkurat)",
                  fontWeight: label === "Directory" ? 700 : 400,
                  color: label === "Directory" ? "#fbfdf6" : "#4a3212",
                  background: label === "Directory" ? "#0a1d08" : "transparent",
                }}>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Search bar + filter chips — makes it feel like a real product */}
          <div style={{
            padding: "10px 20px", borderBottom: "1px solid #e0e5d5",
            display: "flex", alignItems: "center", gap: 8,
            flexWrap: "wrap", rowGap: 8,
          }}>
            <div style={{
              flex: 1, height: 32, borderRadius: 8, border: "1px solid #e0e5d5",
              background: "#f8faf3", display: "flex", alignItems: "center",
              padding: "0 10px", gap: 6,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c5ccb6" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <span style={{ fontSize: 11, color: "#c5ccb6", fontFamily: "var(--font-akkurat)" }}>
                Search 847 members…
              </span>
            </div>
            {(["Engineering", "Design", "Growth", "Operations"] as const).map((tag) => (
              <div key={tag} style={{
                padding: "3px 10px", borderRadius: 9999,
                border: "1px solid #e0e5d5", fontSize: 10,
                color: "#4a3212", fontFamily: "var(--font-fragment-mono)",
                letterSpacing: "0.02em", background: "#fbfdf6",
              }}>
                {tag}
              </div>
            ))}
          </div>

          {/* Member directory grid */}
          <div className="preview-grid" style={{ padding: "16px 20px 20px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {PREVIEW_MEMBERS.map((m, i) => (
              <div key={i} style={{
                background: "#fbfdf6", border: "1px solid #e0e5d5", borderRadius: 12,
                padding: "16px 12px", display: "flex", flexDirection: "column",
                alignItems: "center", gap: 8, textAlign: "center",
              }}>
                <img src={m.photo} alt={m.name}
                  style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid #d7e8b5" }}
                />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#0a1d08", letterSpacing: "-0.48px", fontFamily: "var(--font-akkurat)" }}>{m.name}</div>
                  <div style={{ fontSize: 10, color: "#4a3212", letterSpacing: "-0.40px", marginTop: 2, fontFamily: "var(--font-akkurat)" }}>{m.role}</div>
                  <div style={{ marginTop: 5, display: "inline-flex", alignItems: "center", gap: 3 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: m.brand }} />
                    <span style={{ fontSize: 9, color: "#4a3212", fontFamily: "var(--font-fragment-mono)", letterSpacing: "0.02em" }}>{m.co}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* This week's match — demonstrates the matchmaking feature */}
          <div style={{
            padding: "10px 20px 14px", borderTop: "1px solid #e0e5d5",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{
                fontFamily: "var(--font-fragment-mono)", fontSize: 9,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "#4a3212", opacity: 0.6,
              }}>
                This week&apos;s match
              </span>
              <div style={{ height: 1, flex: 1, background: "#e0e5d5" }} />
              <span style={{
                fontSize: 9, background: "#d7e8b5", borderRadius: 9999,
                padding: "2px 8px", fontFamily: "var(--font-fragment-mono)",
                color: "#0a1d08", letterSpacing: "0.04em",
              }}>
                ✦ matched
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img src={PREVIEW_MEMBERS[0].photo} alt="" style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover", border: "1.5px solid #d7e8b5" }} />
              <div style={{ flex: 1, borderTop: "1.5px dashed #c5ccb6" }} />
              <img src={PREVIEW_MEMBERS[1].photo} alt="" style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover", border: "1.5px solid #d7e8b5" }} />
              <span style={{ fontSize: 11, color: "#0a1d08", fontFamily: "var(--font-akkurat)", letterSpacing: "-0.44px", fontWeight: 600 }}>
                Sarah M. × Alex K.
              </span>
            </div>
            <div style={{ marginTop: 4, fontSize: 10, color: "#968e83", fontFamily: "var(--font-akkurat)", letterSpacing: "-0.40px" }}>
              &ldquo;growth strategy × engineering alignment&rdquo;
            </div>
          </div>

          {/* Bottom stats bar */}
          <div style={{
            padding: "10px 20px", borderTop: "1px solid #e0e5d5",
            display: "flex", gap: 20, alignItems: "center",
          }}>
            {[["847", "members"], ["24", "matches / week"], ["12", "events"]].map(([v, l]) => (
              <div key={l} style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#0a1d08", letterSpacing: "-0.52px", fontFamily: "var(--font-fragment-mono)" }}><CountUp to={Number(v)} /></span>
                <span style={{ fontSize: 10, color: "#4a3212", letterSpacing: "0.02em", fontFamily: "var(--font-fragment-mono)", opacity: 0.65 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section
      style={{
        background: "#0a1d08",
        padding: "88px 32px",
        textAlign: "center",
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
          Stop managing spreadsheets.
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
          ground — or take the one you&apos;re running and make it scale.
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
            href="#"
            className="cta-hover cta-solid"
            style={{
              background: "#d7e8b5",
              color: "#0a1d08",
              borderRadius: 20,
              padding: "12px 28px",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "-0.56px",
              textDecoration: "none",
              fontFamily: "var(--font-akkurat)",
            }}
          >
            Get started →
          </a>
          <a
            href="#"
            className="cta-hover"
            style={{
              background: "transparent",
              color: "#fbfdf6",
              border: "1px solid rgba(251,253,246,0.25)",
              borderRadius: 20,
              padding: "12px 28px",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "-0.56px",
              textDecoration: "none",
              fontFamily: "var(--font-akkurat)",
            }}
          >
            Talk to us
          </a>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

const FOOTER_COLS: { heading: string; links: string[] }[] = [
  { heading: "Platform", links: ["Directory", "Matchmaking", "Events", "Applications", "Automations"] },
  { heading: "Communities", links: ["OGC", "The Den", "Start your own"] },
  { heading: "Company", links: ["About", "Pricing", "Journal", "Contact"] },
];

function Footer() {
  return (
    // Dark — continues the CTA section for a cohesive dark base to the page
    <footer style={{ background: "#0a1d08", borderTop: "1px solid rgba(251,253,246,0.08)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 32px 0" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, justifyContent: "space-between" }}>
          {/* Brand block */}
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 1, fontWeight: 700, fontSize: 19, letterSpacing: "-0.7px", color: "#fbfdf6", fontFamily: "var(--font-akkurat)" }}>
              BubbleLab
              <sup style={{ fontSize: 9, fontWeight: 400, opacity: 0.7, fontFamily: "var(--font-fragment-mono)" }}>®</sup>
            </div>
            <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.6, letterSpacing: "-0.3px", color: "rgba(251,253,246,0.55)", fontFamily: "var(--font-akkurat)" }}>
              The infrastructure behind private professional communities. Run the community — we run the ops.
            </p>
            <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-fragment-mono)", fontSize: 11, letterSpacing: "0.04em" }}>
              <span style={{ color: "rgba(251,253,246,0.4)", textTransform: "uppercase", fontSize: 9 }}>Powering</span>
              <span style={{ color: "#e7c6cf", fontWeight: 700, fontFamily: "var(--font-akkurat)", fontSize: 13 }}>OGC</span>
              <span style={{ color: "rgba(251,253,246,0.3)" }}>·</span>
              <span style={{ color: "#aecbe6", fontWeight: 700, fontFamily: "var(--font-akkurat)", fontSize: 13 }}>The Den</span>
            </div>
          </div>

          {/* Link columns */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 56 }}>
            {FOOTER_COLS.map((col) => (
              <div key={col.heading}>
                <div style={{ fontFamily: "var(--font-fragment-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(251,253,246,0.45)", marginBottom: 16 }}>
                  {col.heading}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {col.links.map((l) => (
                    <a key={l} href="#" style={{ fontSize: 14, letterSpacing: "-0.3px", color: "rgba(251,253,246,0.72)", textDecoration: "none", fontFamily: "var(--font-akkurat)" }}>
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: 56, padding: "22px 0 28px", borderTop: "1px solid rgba(251,253,246,0.08)", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-fragment-mono)", fontSize: 10, letterSpacing: "0.04em", color: "rgba(251,253,246,0.4)" }}>
            © 2026 BubbleLab · Run the community. Not the ops.
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy", "Terms", "Status"].map((l) => (
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
      style={{
        background: "#fbfdf6",
        minHeight: "100dvh",
        fontFamily: "var(--font-akkurat)",
      }}
    >
      <FullHeroSection />
      <Testimonial />
      <Features />
      <ProductPreview />
      <HowItWorks />
      <CtaSection />
      <Footer />
    </div>
  );
}
