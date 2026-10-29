import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Hero, LiveAgent, Proof, Services, Systems, BuiltFor, WorkReel, Process, Faq, faqs, FinalCta } from "@/components/home/sections";
import { getShowcaseProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Voice agents, AI automation and full-stack software` },
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * Home, Change Spec v3: eleven sections, about 7,000 to 8,000px at 1440 wide.
 * Receipts, Stack and scale, the Guild block, the Manifesto and the Demos teaser live on their own pages.
 * Work shows the builds the owner has marked showable (lib/projects.ts), with screenshots when public/work/<slug>.png exists.
 */
export default async function Home() {
  const projects = await getShowcaseProjects();
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
      {projects.length > 0 && <WorkReel projects={projects} />}
      <Process />
      <Faq />
      <FinalCta />
    </>
  );
}
