import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";
import {
  Hero,
  LiveAgent,
  Proof,
  Services,
  BuiltFor,
  WorkReel,
  Manifesto,
  Process,
  DemosTeaser,
  PricingTeaser,
  Faq,
  faqs,
  FinalCta,
} from "@/components/home/sections";
import { StudioSection, ReceiptsTeaser, StackScale, JoinGuild } from "@/components/home/sections2";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Voice agents, AI automation and full-stack software` },
  description: site.description,
  alternates: { canonical: "/" },
};

/** Order from the upgrade plan: hero, live agent, proof, services, studio, built-for, work, receipts, manifesto, process, demos, stack, pricing, guild, FAQ, close. */
export default async function Home() {
  const projects = await getProjects();
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
      <StudioSection />
      <BuiltFor />
      <WorkReel projects={projects} />
      <ReceiptsTeaser />
      <Manifesto />
      <Process />
      <DemosTeaser />
      <StackScale />
      <PricingTeaser />
      <JoinGuild />
      <Faq />
      <FinalCta />
    </>
  );
}
