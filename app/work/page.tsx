import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { WorkGrid } from "@/components/WorkGrid";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work: selected builds, outcome first",
  description: "Voice agents, agent apps, automation and web platforms built by Conclave AI.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHeader eyebrow="Work" title="Built, shipped, running." lead="One metric per project, once it is confirmed. Until then each card says so." />
      <div className="frame border-t hair px-4 py-8 md:px-10">
        <WorkGrid projects={projects} />
        <section data-reveal className="mt-10 rounded-2xl border hair bg-paper p-6">
          <p className="label text-plum">Testimonial</p>
          <p className="mt-2 max-w-xl text-slate">Client quotes appear here with their permission. None are shown until a client agrees.</p>
        </section>
      </div>
      <PageCta />
    </>
  );
}
