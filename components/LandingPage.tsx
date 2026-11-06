import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { Accordion } from "@/components/ui/Accordion";
import { site } from "@/lib/site";
import type { Landing } from "@/lib/landing";

/** "2026-11-07" -> "7 November 2026". Fixed locale so server and client never disagree. */
export function formatUpdated(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${d} ${months[m - 1]} ${y}`;
}

/**
 * Search landing page. Every page follows the strategy rules: the first paragraph answers the question in 2 to 3 sentences,
 * a visible "last updated" date, a FAQ with FAQPage schema, and links to the related pages.
 */
export function LandingPage({ page }: { page: Landing }) {
  const url = `${site.url}${page.path}`;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": `${url}#page`,
              url,
              name: page.metaTitle,
              description: page.metaDescription,
              dateModified: page.updated,
              isPartOf: { "@id": `${site.url}/#site` },
              about: { "@id": `${site.url}/#org` },
            },
            { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
          ]),
        }}
      />
      <PageHeader path={page.path} eyebrow={page.eyebrow} title={page.h1} lead={page.answer} />
      <div className="frame border-t hair">
        <p className="border-b hair px-4 py-3 text-sm text-slate md:px-10">
          Last updated <time dateTime={page.updated}>{formatUpdated(page.updated)}</time>
        </p>

        {page.sections.map((s) => (
          <section key={s.h} className="grid gap-8 border-b hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
            <h2 data-reveal className="head">{s.h}</h2>
            <div className="max-w-2xl space-y-4 text-slate">
              {s.p?.map((t) => <p key={t}>{t}</p>)}
              {s.list && (
                <ul className="list-disc space-y-2 ps-5">
                  {s.list.map((t) => <li key={t}>{t}</li>)}
                </ul>
              )}
            </div>
          </section>
        ))}

        <section className="grid gap-8 border-b hair md:grid-cols-[1fr_2fr]">
          <h2 data-reveal className="head px-4 pt-12 md:px-10">Questions</h2>
          <div data-reveal className="border-t hair bg-paper md:border-l md:border-t-0">
            <Accordion items={page.faq} />
          </div>
        </section>

        <nav aria-label="Related pages" className="flex flex-wrap gap-x-6 gap-y-2 px-4 py-6 text-sm md:px-10">
          <span className="text-slate">Related:</span>
          {page.related.map((r) => (
            <Link key={r.href} href={r.href} className="u-link font-medium hover:text-plum">{r.label}</Link>
          ))}
        </nav>
      </div>
      <PageCta />
    </>
  );
}
