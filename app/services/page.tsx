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
      <PageHeader
        eyebrow="Services"
        title="Five jobs. One agent each."
        lead="We deliver fixed-scope services now. What we repeat becomes product later."
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
                <section data-reveal key={s.slug} id={s.slug} className="grid scroll-mt-28 gap-8 border-b hair px-4 py-12 md:grid-cols-2 md:px-10">
                  <div>
                    <Eyebrow n={s.n}>{s.slug}</Eyebrow>
                    <h2 className="display mt-4 text-display-m">{s.title}</h2>
                    <p className="mt-4 max-w-md text-slate">{s.body}</p>
                    <Link href={`/services/${s.slug}`} className="u-link mt-5 inline-block w-fit text-sm font-medium hover:text-plum">
                      How it works, step by step
                    </Link>
                  </div>
                  <div className={cn("grid min-h-80 place-items-center overflow-hidden rounded-3xl p-5", panelColours[i])}>
                    <Visual />
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>

      <div className="frame border-t hair px-4 py-12 md:px-10">
        <AgentPicker />
      </div>

      <section data-reveal className="frame border-t hair px-4 py-12 md:px-10">
        <h2 className="head">Works with the tools you already use</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {integrations.map((t) => (
            <li key={t} className="rounded-lg border hair bg-paper px-3 py-1.5 text-sm font-medium">
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-slate">
          Comparing options? See how this stacks up against a freelancer, a no-code flow, an agency and a receptionist on the{" "}
          <Link href="/compare" className="u-link hover:text-plum">compare page</Link>. Need a custom agent or a full-stack build? See the{" "}
          <Link href="/studio" className="u-link hover:text-plum">studio</Link>.
        </p>
      </section>
      <PageCta />
    </>
  );
}
