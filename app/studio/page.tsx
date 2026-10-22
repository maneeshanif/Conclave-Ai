import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { studio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Studio: full-stack software and agent apps",
  description: "Agents, agent apps, websites with a CMS, mobile apps and scalable platforms from one engineer-led team.",
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Studio"
        title="Agent-first software, built like a platform."
        lead="Voice agents are the front door. Full-stack builds and scalable systems are what keep clients for years."
      />
      <div className="frame border-t hair">
        {studio.map((s, i) => (
          <section data-reveal key={s.slug} id={s.slug} className="grid scroll-mt-28 gap-8 border-b hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
            <div>
              <Eyebrow n={String(i + 1).padStart(2, "0")}>{s.name}</Eyebrow>
              <h2 className="head mt-4">{s.name}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-lead">{s.job}</p>
                <p className="mt-4 text-slate">
                  <span className="label mr-2">For</span>
                  {s.buyer}
                </p>
              </div>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="label text-slate">Timeline</dt>
                  <dd className="mt-1 text-base">{s.timeline}</dd>
                </div>
                <div>
                  <dt className="label text-slate">Price</dt>
                  <dd className="mt-1 text-base">Scoped on a call, fixed before we start</dd>
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
        <p className="px-4 py-8 text-sm text-slate md:px-10">We list a tool here only when we can demonstrate it. Samples are added to Work as each one ships.</p>
      </div>
      <PageCta title="Have a build in mind?" body="Tell us what it should do. We will say what it takes and whether it is a fit." />
    </>
  );
}
