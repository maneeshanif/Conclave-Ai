import type { Metadata, Viewport } from "next";
import { Syne, Outfit, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { Cursor } from "@/components/motion/Cursor";
import { site } from "@/lib/site";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-syne", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-outfit", display: "swap" });
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // "Conclave AI" is always two words in titles so the brand phrase repeats; never just "Conclave".
  title: { default: `${site.name} | Voice agents, AI automation and full-stack software`, template: `%s | ${site.name}` },
  description: `${site.description} Hear a live agent, then book a call.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    siteName: site.name,
    type: "website",
    images: [{ url: "/brand/conclave-logo-on-dark-bg.png" }],
  },
};

export const viewport: Viewport = { themeColor: "#F1F4EC" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable} ${plex.variable}`} suppressHydrationWarning>
      <body>
        {/* Arms the motion start states unless the visitor prefers reduced motion; removed again if MotionRoot never boots. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'var d=document.documentElement;if(!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("motion-ok");setTimeout(function(){if(!window.__motion)d.classList.remove("motion-ok")},4000)}',
          }}
        />
        {/* Organization and WebSite structured data. sameAs is added when the profiles (LinkedIn, GitHub, X) exist. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                { "@type": "Organization", "@id": `${site.url}/#org`, name: site.name, url: site.url, logo: `${site.url}/brand/conclave-logo-on-light.svg`, email: site.email, description: site.description, address: { "@type": "PostalAddress", addressLocality: site.city } },
                { "@type": "WebSite", "@id": `${site.url}/#site`, url: site.url, name: site.name, publisher: { "@id": `${site.url}/#org` } },
              ],
            }),
          }}
        />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[70] -translate-y-20 rounded-xl bg-ink px-4 py-2 text-paper focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Navbar />
          <CommandPalette />
          <MotionRoot />
          <Cursor />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
