import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { StackScale } from "@/components/home/sections2";
import { studio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Studio: agents, automations, ERP and CRM, apps and platforms",
  description: "Agents, automations, custom business systems, apps and scalable platforms from one engineer-led team.",
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  return (
    <>
      <PageHeader path="/studio"
        eyebrow="Studio"
        title="Agent-first software, built like a platform."
        lead="Voice agents are the front door. Automations, business systems and scalable platforms are what keep clients for years."
      />
      <div className="frame border-t hair">
        {studio.map((s, i) => (
          <section data-reveal key={s.slug} id={s.slug} className="grid scroll-mt-28 gap-6 border-b hair px-4 py-10 md:grid-cols-[1fr_2fr] md:px-10">
            <div>
              <span className="label text-plum">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="head mt-2">{s.name}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="text-lead">{s.job}</p>
                <p className="mt-3 text-slate">
                  <span className="label mr-2">For</span>
                  {s.buyer}
                </p>
                <Link href={`/studio/${s.slug}`} className="u-link mt-4 inline-block text-sm font-medium hover:text-plum">
                  How we build it
                </Link>
              </div>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="label text-slate">Timeline</dt>
                  <dd className="mt-1 text-base">{s.tag}</dd>
                </div>
                <div>
                  <dt className="label text-slate">Stack</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {s.stack.map((t) => (
                      <span key={t} className="rounded-md bg-mist px-2 py-0.5 text-xs text-slate">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        ))}
        <p className="px-4 py-6 text-sm text-slate md:px-10">We list a tool here only when we can demonstrate it.</p>
      </div>
      <StackScale />
      <PageCta title="Have a build in mind?" body="Tell us what it should do. We will say what it takes and whether it is a fit." />
    </>
  );
}
