import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Hero, LiveAgent, Proof, Services, Systems, BuiltFor, Process, PricingTeaser, Faq, faqs, GuildStrip, FinalCta } from "@/components/home/sections";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Voice agents, AI automation and full-stack software` },
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * Home, Change Spec v3: eleven sections or fewer, about 7,000 to 8,000px at 1440 wide.
 * Receipts, Stack and scale, the full Guild block, the Manifesto and the Demos teaser moved to their own pages.
 * The Work section returns when at least one real case has a screenshot and a metric.
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
          }),
        }}
      />
      <Hero />
      <LiveAgent />
      <Proof />
      <Services />
      <Systems />
      <BuiltFor />
      <Process />
      <PricingTeaser />
      <Faq />
      <GuildStrip />
      <FinalCta />
    </>
  );
}
