import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { Accordion } from "@/components/ui/Accordion";
import { StudGlyph } from "@/components/studs/StudGlyph";
import { IndustryDash } from "@/components/IndustryDash";
import { industries } from "@/lib/content";
import { services } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const i = industries.find((x) => x.slug === slug);
  return i
    ? { title: `AI voice agents for ${i.name.toLowerCase()}`, description: `${i.pain} ${i.h1}.`, alternates: { canonical: `/industries/${i.slug}` } }
    : {};
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  const i = industries.find((x) => x.slug === slug);
  if (!i) notFound();

  return (
    <>
      <PageHeader path={`/industries/${i.slug}`} eyebrow={`For ${i.name.toLowerCase()}`} title={i.h1} lead={i.pain} />
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
            <Accordion items={[i.objection]} />
          </div>
        </section>

        <p className="px-4 py-6 text-sm text-slate md:px-10">
          Language: we build in English, Arabic and Urdu. A real {i.name.toLowerCase()} case is added with the first build in this field.
        </p>
      </div>
      <PageCta />
    </>
  );
}
