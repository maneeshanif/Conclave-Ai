import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { WorkGrid } from "@/components/WorkGrid";
import { getRealProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work: selected builds, outcome first",
  description: "Voice agents, agent apps, automation and web platforms built by Conclave AI.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const projects = await getRealProjects();
  return (
    <>
      <PageHeader path="/work"
        eyebrow="Work"
        title="Built, shipped, running."
        lead={projects.length ? "One metric per project, with where it came from." : "First case studies are being written with our pilot clients."}
      />
      <div className="frame border-t hair px-4 py-8 md:px-10">
        {projects.length > 0 ? (
          <WorkGrid projects={projects} />
        ) : (
          <div data-reveal className="grid gap-px overflow-hidden rounded-3xl border hair bg-[rgb(11_21_18/0.12)] md:grid-cols-2">
            <section className="bg-paper p-8">
              <h2 className="head">What you will find here</h2>
              <p className="mt-3 max-w-md text-slate">Each case shows a screenshot or loop, one metric and where it came from, the problem, the solution and what we would do differently. We publish only what a client has agreed we can share.</p>
            </section>
            <section className="bg-paper p-8">
              <h2 className="head">Until then</h2>
              <p className="mt-3 max-w-md text-slate">
                Hear the agent on the <Link href="/demos" className="u-link hover:text-plum">demos page</Link>, follow our numbers on the <Link href="/receipts" className="u-link hover:text-plum">receipts page</Link>, or see how a build works on the <Link href="/studio" className="u-link hover:text-plum">studio page</Link>.
              </p>
            </section>
          </div>
        )}
      </div>
      <PageCta />
    </>
  );
}
