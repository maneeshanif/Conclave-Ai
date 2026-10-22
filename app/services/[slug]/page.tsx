import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { Accordion } from "@/components/ui/Accordion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FlowDiagram } from "@/components/Diagrams";
import { site } from "@/lib/site";
import { panelColours, serviceVisuals } from "@/components/home/visuals";
import { serviceDetail } from "@/lib/content";
import { services } from "@/lib/site";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.title, description: s.body, alternates: { canonical: `/services/${s.slug}` } } : {};
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const i = services.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const s = services[i];
  const d = serviceDetail[slug];
  const Visual = serviceVisuals[i];
  const next = services[(i + 1) % services.length];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            description: s.body,
            provider: { "@type": "Organization", name: site.name, url: site.url },
            areaServed: ["US", "Gulf", "Europe"],
          }),
        }}
      />
      <PageHeader path={`/services/${slug}`} eyebrow={`Service ${s.n}`} title={s.title} lead={s.body} />

      <div className="frame border-t hair">
        <section data-reveal className="grid gap-8 border-b hair px-4 py-12 md:grid-cols-2 md:px-10">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <p className="head mt-4">{d.problem}</p>
          </div>
          <div className={cn("grid min-h-80 place-items-center overflow-hidden rounded-3xl p-5", panelColours[i])}>
            <Visual />
          </div>
        </section>

        <section className="border-b hair px-4 py-12 md:px-10">
          <h2 data-reveal className="head">How a call flows</h2>
          <div className="mt-8">
            <FlowDiagram steps={d.flow} />
          </div>
        </section>

        <section data-reveal className="grid gap-8 border-b hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
          <h2 className="head">Works with</h2>
          <ul className="flex flex-wrap content-start gap-2">
            {d.integrations.map((t) => (
              <li key={t} className="rounded-lg border hair bg-paper px-3 py-1.5 text-sm font-medium">
                {t}
              </li>
            ))}
            <li className="w-full pt-2 text-sm text-slate">Not on the list? If the tool has an API, we can usually connect it.</li>
          </ul>
        </section>

        <section data-reveal className="grid gap-8 border-b hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
          <h2 className="head">Price and timeline</h2>
          <p className="max-w-lg text-slate">Starts as a 14-day pilot. Scope and price are fixed on a call before any work begins, so there are no surprises.</p>
        </section>

        <section className="grid gap-8 border-b hair md:grid-cols-[1fr_2fr]">
          <h2 data-reveal className="head px-4 pt-12 md:px-10">Questions</h2>
          <div data-reveal className="border-t hair bg-paper md:border-l md:border-t-0">
            <Accordion items={d.faq} />
          </div>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-4 px-4 py-8 md:px-10">
          <p className="text-slate">{d.related}</p>
          <Link href={`/services/${next.slug}`} className="u-link font-medium hover:text-plum">
            Next: {next.short}
          </Link>
        </section>
      </div>
      <PageCta />
    </>
  );
}
