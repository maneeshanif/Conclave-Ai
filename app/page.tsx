import { getProjects } from "@/lib/projects";
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
  FinalCta,
} from "@/components/home/sections";

export default async function Home() {
  const projects = await getProjects();
  return (
    <>
      <Hero />
      <LiveAgent />
      <Proof />
      <Services />
      <BuiltFor />
      <WorkReel projects={projects} />
      <Manifesto />
      <Process />
      <DemosTeaser />
      <PricingTeaser />
      <Faq />
      <FinalCta />
    </>
  );
}
