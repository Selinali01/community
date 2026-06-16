import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Brand wordmark face, a distinctive geometric grotesque (reads as a logotype).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const OG_IMAGE = "/hero-poster.jpg"; // resolved absolute via metadataBase
const DESCRIPTION =
  "The infrastructure platform for private professional communities. Applications, matchmaking, member intelligence, analytics, and automations, all handled across Slack, Discord, and WhatsApp, so you can focus on your people.";

export const metadata: Metadata = {
  metadataBase: new URL("https://community.bubblelab.ai"),
  title: "Bubble Lab Communities, Run the community. Not the ops.",
  description: DESCRIPTION,
  openGraph: {
    title: "Run the community. Not the ops.",
    description: DESCRIPTION,
    siteName: "Bubble Lab Communities",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1600, height: 900, alt: "A community gathered around a warm fire at night" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Run the community. Not the ops.",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

// Tint mobile browser chrome to the brand (matches the dark hero)
export const viewport = {
  themeColor: "#0a1d08",
};

// Structured data, helps search engines + social tools understand the product
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Bubble Lab Communities",
  applicationCategory: "BusinessApplication",
  description: DESCRIPTION,
  url: "https://community.bubblelab.ai",
  image: "https://community.bubblelab.ai/hero-poster.jpg",
  offers: { "@type": "Offer", category: "Community infrastructure platform" },
  featureList: [
    "Applications & checkout", "Smart matchmaking", "Member intelligence",
    "Member analytics", "Custom automations",
    "Slack, Discord & WhatsApp communities",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Preload the self-hosted hero poster so the first frame paints instantly */}
        <link rel="preload" as="image" href="/hero-poster.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
