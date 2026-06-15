import { FullHeroSection } from "./scroll-zoom";

// ── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    num: "01",
    title: "Applications & Vetting",
    body: "A configurable form, approval pipeline, and Stripe checkout. Every new member is vetted, welcomed, and activated automatically — zero manual work.",
  },
  {
    num: "02",
    title: "Member Directory",
    body: "Searchable, filterable, with list and map view. Members find each other by role, industry, company, and location.",
  },
  {
    num: "03",
    title: "1:1 Matchmaking",
    body: "AI-powered weekly pairings with a why, shared themes, and conversation starters. Drafted and ready to send in one click.",
  },
  {
    num: "04",
    title: "Event Calendar",
    body: "Native Luma integration for IRL and virtual events. Members see everything in one place, inside the dashboard they already use.",
  },
  {
    num: "05",
    title: "Lifecycle Messaging",
    body: "Automated emails and Slack DMs triggered by member events. A simple rules engine: on event → delay → send template.",
  },
  {
    num: "06",
    title: "Slack Integration",
    body: "Auto-invite to your workspace, structured intro posts, and DM automation. Your Slack becomes the community's beating heart.",
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
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
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
          What we handle
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.num}
              style={{
                background: "#fbfdf6",
                border: "1px solid #e0e5d5",
                borderRadius: 8,
                padding: "28px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-fragment-mono)",
                  fontSize: 10,
                  letterSpacing: "0.06em",
                  color: "#4a3212",
                  marginBottom: 14,
                  opacity: 0.7,
                }}
              >
                {f.num}
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
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 48,
          }}
        >
          {STEPS.map((step, i) => (
            <div key={step.num} style={{ position: "relative" }}>
              <div
                style={{
                  fontFamily: "var(--font-fragment-mono)",
                  fontSize: 44,
                  fontWeight: 400,
                  color: "#c5ccb6",
                  letterSpacing: "-1.76px",
                  lineHeight: 1,
                  marginBottom: 20,
                }}
              >
                {step.num}
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

              {i < 2 && (
                <div
                  style={{
                    position: "absolute",
                    top: 22,
                    right: -24,
                    width: 48,
                    borderTop: "1px dashed #c5ccb6",
                  }}
                />
              )}
            </div>
          ))}
        </div>
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
      </div>
    </section>
  );
}

function Footer() {
  return (
    <div style={{ borderTop: "1px solid #e0e5d5" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "28px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
        <div
          style={{
            fontFamily: "var(--font-fragment-mono)",
            fontSize: 10,
            letterSpacing: "0.04em",
            color: "#4a3212",
            opacity: 0.5,
          }}
        >
          © 2026 BubbleLab
        </div>
      </div>
    </div>
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
      <Nav />
      <FullHeroSection />
      <Features />
      <HowItWorks />
      <CtaSection />
      <Footer />
    </div>
  );
}
