import type { Metadata, Viewport } from "next";
import { Syne, Outfit, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-syne", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-outfit", display: "swap" });
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description:
    "Voice agents, AI agents, workflow automation and full-stack builds for clinics, local businesses and startups. Hear a live agent, then book a call.",
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
    images: [{ url: "/brand/conclave-logo-on-dark-bg.png" }],
  },
};

export const viewport: Viewport = { themeColor: "#F1F4EC" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable} ${plex.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[70] -translate-y-20 rounded-xl bg-ink px-4 py-2 text-paper focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Navbar />
          <CommandPalette />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
