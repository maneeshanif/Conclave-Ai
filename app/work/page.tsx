import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { WorkGrid } from "@/components/WorkGrid";
import { getShowcaseProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work: selected builds",
  description: "Voice agents, agent apps, automation and web apps built by Conclave AI.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const projects = await getShowcaseProjects();
  return (
    <>
      <PageHeader path="/work" eyebrow="Work" title="Built, shipped, running." lead="Builds we can show openly. Screenshots and results are added to each as they are written up." />
      <div className="frame border-t hair px-4 py-8 md:px-10">
        <WorkGrid projects={projects} />
        <p className="mt-8 text-sm text-slate">Numbers appear on a project only when they are real and sourced. A client is named only with their agreement.</p>
      </div>
      <PageCta />
    </>
  );
}
