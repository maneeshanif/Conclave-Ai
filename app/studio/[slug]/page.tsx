import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { Accordion } from "@/components/ui/Accordion";
import { ArchDiagram, FlowDiagram, ModuleMap } from "@/components/Diagrams";
import { StackScale } from "@/components/home/sections2";
import { studio, studioDetail, type StudioSlug } from "@/lib/content";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return studio.map((s) => ({ slug: s.slug }));
}

const meta = (slug: string) => studio.find((s) => s.slug === slug);

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = meta(slug);
  const d = studioDetail[slug as StudioSlug];
  return s && d ? { title: `${s.name}: ${d.h1}`, description: `${s.job} ${d.problem}`, alternates: { canonical: `/studio/${s.slug}` } } : {};
}

export default async function StudioDetailPage({ params }: Params) {
  const { slug } = await params;
  const s = meta(slug);
  const d = studioDetail[slug as StudioSlug];
  if (!s || !d) notFound();
  const next = studio[(studio.findIndex((x) => x.slug === slug) + 1) % studio.length];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            { "@context": "https://schema.org", "@type": "Service", name: `${s.name} by ${site.name}`, description: s.job, provider: { "@type": "Organization", name: site.name, url: site.url }, areaServed: ["US", "Gulf", "Europe"] },
            { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: d.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
          ]),
        }}
      />
      <PageHeader path={`/studio/${slug}`} eyebrow={`Studio / ${s.name}`} title={d.h1} lead={d.problem} />

      <div className="frame border-t hair">
        <section data-reveal className="grid gap-8 border-b hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
          <h2 className="head">What we build</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {d.build.map((b) => (
              <li key={b} className="rounded-xl border hair bg-paper px-4 py-3 text-[0.9375rem]">
                {b}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-b hair px-4 py-12 md:px-10">
          <h2 data-reveal className="head">
            {d.diagram === "modules" ? "The modules" : d.diagram === "flow" ? "How it runs" : d.diagram === "stack" ? "What sits under it" : "What it is built with"}
          </h2>
          <div className="mt-8">
            {d.diagram === "flow" && d.steps && <FlowDiagram steps={d.steps} label="How it runs" />}
            {d.diagram === "modules" && d.modules && <ModuleMap modules={d.modules} />}
            {d.diagram === "arch" && <ArchDiagram stack={[...s.stack, "FastAPI", "Postgres"]} />}
            {d.diagram === "stack" && <StackScale compact />}
          </div>
        </section>

        {slug === "apps" && (
          <section data-reveal className="grid gap-8 border-b hair bg-lime/25 px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
            <h2 className="head">Marketing sites, when you need a face</h2>
            <div>
              <p className="max-w-xl text-slate">Animated Next.js sites with a headless CMS, SEO and booking built in, scoped as one milestone and handed over so your team can edit them.</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {["Next.js", "Tailwind", "GSAP", "Headless CMS"].map((t) => (
                  <li key={t} className="rounded-md bg-paper px-2 py-0.5 text-xs text-slate">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section data-reveal className="grid gap-8 border-b hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
          <h2 className="head">Engagement and stack</h2>
          <dl className="grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="label text-slate">Engagement</dt>
              <dd className="mt-1">{s.tag}</dd>
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
        </section>

        <section className="grid gap-8 border-b hair md:grid-cols-[1fr_2fr]">
          <h2 data-reveal className="head px-4 pt-12 md:px-10">
            Questions
          </h2>
          <div data-reveal className="border-t hair bg-paper md:border-l md:border-t-0">
            <Accordion items={d.faq} />
          </div>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-4 px-4 py-8 md:px-10">
          <p className="text-slate">{d.related}</p>
          <Link href={`/studio/${next.slug}`} className="u-link font-medium hover:text-plum">
            Next: {next.name}
          </Link>
        </section>
      </div>
      <PageCta />
    </>
  );
}
