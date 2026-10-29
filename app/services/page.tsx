import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { AgentPicker } from "@/components/AgentPicker";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { services } from "@/lib/site";
import { serviceDetail } from "@/lib/content";
import { panelColours, serviceVisuals } from "@/components/home/visuals";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services: voice agents, follow-up, booking and more",
  description: "Voice agents, follow-up, booking, reactivation and reporting for clinics and local businesses. One agent per job.",
  alternates: { canonical: "/services" },
};

const integrations = [...new Set(Object.values(serviceDetail).flatMap((d) => d.integrations))];

export default function ServicesPage() {
  return (
    <>
      <PageHeader path="/services"
        eyebrow="Services"
        title="Five jobs. One agent each."
        lead="We start with services. What we repeat becomes product later."
      />
      <div className="frame border-t hair">
        <div className="grid lg:grid-cols-[14rem_1fr]">
          {/* Sticky list of jobs: jump to any card. Hidden below 1024px where the cards are short enough to scroll. */}
          <nav aria-label="Jobs" className="hidden border-r hair lg:block">
            <ul className="sticky top-28 space-y-1 p-4">
              {services.map((s) => (
                <li key={s.slug}>
                  <a href={`#${s.slug}`} className="flex items-baseline gap-2 rounded-lg px-3 py-2 text-sm transition-colors duration-150 hover:bg-mist">
                    <span className="label text-plum">{s.n}</span>
                    {s.short}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            {services.map((s, i) => {
              const Visual = serviceVisuals[i];
              return (
                <section data-reveal key={s.slug} id={s.slug} className="grid scroll-mt-28 gap-6 border-b hair px-4 py-8 md:grid-cols-2 md:px-10">
                  <div>
                    <Eyebrow n={s.n}>{s.slug}</Eyebrow>
                    <h2 className="display mt-4 text-display-m">{s.title}</h2>
                    <p className="mt-4 max-w-md text-slate">{s.body}</p>
                    <Link href={`/services/${s.slug}`} className="u-link mt-5 inline-block w-fit text-sm font-medium hover:text-plum">
                      How it works, step by step
                    </Link>
                  </div>
                  <div className={cn("grid min-h-64 place-items-center overflow-hidden rounded-3xl p-4", panelColours[i])}>
                    <Visual />
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>

      {/* Compact rows: the picker folds away until asked for, and integrations sit in one wrapped line. */}
      <div className="frame border-t hair px-4 py-6 md:px-10">
        <details className="group rounded-2xl border hair bg-paper">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 font-medium">
            Which agent do I need? <span className="text-sm font-normal text-slate">Three quick questions</span>
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-slate transition-transform duration-300 group-open:rotate-180">
              <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <div className="border-t hair p-2 md:p-4">
            <AgentPicker />
          </div>
        </details>
      </div>

      <section data-reveal className="frame flex flex-wrap items-center gap-x-4 gap-y-2 border-t hair px-4 py-5 md:px-10">
        <span className="label text-slate">Works with</span>
        {integrations.map((t) => (
          <span key={t} className="text-sm font-medium">
            {t}
          </span>
        ))}
      </section>

      <section data-reveal className="frame border-t hair bg-mist/60 px-4 py-5 md:px-10">
        <p className="text-sm">
          <span className="label mr-3 text-plum">Beyond agents</span>
          Automations, business systems and platforms are on the{" "}
          <Link href="/studio" className="u-link font-medium hover:text-plum">
            studio page
          </Link>
          . Comparing options? See the{" "}
          <Link href="/compare" className="u-link font-medium hover:text-plum">
            comparison
          </Link>
          .
        </p>
      </section>      <PageCta />
    </>
  );
}
