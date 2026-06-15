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

export const metadata: Metadata = {
  title: "BubbleLab Community — Run the community. Not the ops.",
  description:
    "The infrastructure platform for private professional communities. Applications, directories, matchmaking, events, and automations — all handled.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preload hero background so it's ready before first paint */}
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1567853042143-8d8480f022ad?auto=format&fit=crop&w=1920&q=85"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
