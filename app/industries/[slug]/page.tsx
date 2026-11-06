import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { Accordion } from "@/components/ui/Accordion";
import { StudGlyph } from "@/components/studs/StudGlyph";
import { IndustryDash } from "@/components/IndustryDash";
import { industries } from "@/lib/content";
import { industryGuides } from "@/lib/guides";
import { LastUpdated } from "@/components/LastUpdated";
import { services } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const i = industries.find((x) => x.slug === slug);
  return i
    ? { title: i.slug === "startups" ? `AI voice agents for ${i.name.toLowerCase()}` : i.slug === "dental" ? "Dental AI receptionist: books, reminds and flags emergencies" : `AI receptionist for ${i.name.toLowerCase()}`, description: i.slug === "startups" ? `${i.pain} ${i.h1}.` : `An AI receptionist and voice agents for ${i.name.toLowerCase()}. ${i.pain} ${i.h1}.`, alternates: { canonical: `/industries/${i.slug}` } }
    : {};
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  const i = industries.find((x) => x.slug === slug);
  if (!i) notFound();

  const guide = industryGuides[slug];
  const faq = guide ? [i.objection as unknown as [string, string], ...guide.faq] : [i.objection as unknown as [string, string]];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
          }),
        }}
      />
      <PageHeader path={`/industries/${i.slug}`} eyebrow={`For ${i.name.toLowerCase()}`} title={i.h1} lead={guide ? guide.intro : i.pain} />
      {guide && <LastUpdated />}
      <div className="frame border-t hair">
        <section className="grid gap-8 border-b hair md:grid-cols-[1fr_2fr]">
          <div data-reveal className="grid place-items-center bg-mist p-8">
            <StudGlyph agent={i.figure} size={208} animate />
          </div>
          <div className="px-4 py-12 md:px-10">
            <h2 data-reveal className="head">Three workflows we set up first</h2>
            <ol data-stagger className="mt-6 space-y-3">
              {i.flows.map((f, n) => (
                <li key={f} className="flex gap-4 rounded-xl border hair bg-paper p-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-xs font-semibold text-paper">{n + 1}</span>
                  {f}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section data-reveal className="grid items-center gap-8 border-b hair bg-lime/25 px-4 py-12 md:grid-cols-[1fr_1fr] md:px-10">
          <div>
            <h2 className="head">What the week looks like</h2>
            <p className="mt-2 max-w-sm text-slate">A sample weekly summary for {i.name.toLowerCase()}. Figures are examples to show the shape, not results.</p>
          </div>
          <div className="grid place-items-center">
            <IndustryDash slug={i.slug} />
          </div>
        </section>

        <section data-reveal className="grid gap-8 border-b hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
          <h2 className="head">Agents that do the work</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="block rounded-xl border hair bg-paper px-4 py-3 transition-colors duration-150 hover:bg-mist">
                  <span className="label text-plum">{s.n}</span>
                  <span className="block font-medium">{s.short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-8 border-b hair md:grid-cols-[1fr_2fr]">
          <h2 data-reveal className="head px-4 pt-12 md:px-10">The usual objection</h2>
          <div data-reveal className="border-t hair bg-paper md:border-l md:border-t-0">
            <Accordion items={faq} />
          </div>
        </section>

        {guide && (
          <article className="grid gap-8 border-b hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
            <h2 data-reveal className="head">{guide.title}</h2>
            <div className="max-w-2xl space-y-10">
              {guide.sections.map((sec) => (
                <section key={sec.h}>
                  <h3 className="head text-xl">{sec.h}</h3>
                  <div className="mt-3 space-y-4 text-slate">
                    {sec.p.map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                  </div>
                </section>
              ))}
              {slug === "clinics" && (
                <p className="text-slate">
                  In the Gulf? <Link href="/ai-receptionist-gulf-clinics" className="u-link font-medium hover:text-plum">AI receptionist for clinics in Dubai and the Gulf</Link>.
                </p>
              )}
            </div>
          </article>
        )}

        <p className="px-4 py-6 text-sm text-slate md:px-10">
          Language: we build in English, Arabic and Urdu. A real {i.name.toLowerCase()} case is added with the first build in this field.
        </p>
      </div>
      <PageCta />
    </>
  );
}
