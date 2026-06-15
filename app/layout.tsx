import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

const OG_IMAGE = "https://assets.mixkit.co/videos/23131/23131-thumb-1080-0.jpg";
const DESCRIPTION =
  "The infrastructure platform for private professional communities. Applications, directories, matchmaking, events, and automations — all handled, so you can focus on your people.";

export const metadata: Metadata = {
  title: "BubbleLab Community — Run the community. Not the ops.",
  description: DESCRIPTION,
  openGraph: {
    title: "Run the community. Not the ops.",
    description: DESCRIPTION,
    siteName: "BubbleLab Community",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1920, height: 1080, alt: "A community gathered around a warm garden dinner" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Run the community. Not the ops.",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preconnect to the video CDN so the hero clip starts fast */}
        <link rel="preconnect" href="https://assets.mixkit.co" crossOrigin="" />
        {/* Preload the hero poster so the first frame paints instantly */}
        <link
          rel="preload"
          as="image"
          href="https://assets.mixkit.co/videos/23131/23131-thumb-1080-0.jpg"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
