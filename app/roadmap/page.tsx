import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roadmap: what shipped and what is next",
  description: "What Conclave AI has shipped, what is being built now and what comes later.",
  alternates: { canonical: "/roadmap" },
};

const columns = [
  { title: "Shipped", tone: "bg-lime", items: ["Voice, follow-up, booking, reactivation and reporting service pages", "Studio, industries, compare, security and receipts pages", "Aria demo (demo mode), missed-call calculator, Convene game and leaderboard", "Contact form with spam protection", "The Brick Crew"] },
  { title: "Building now", tone: "bg-lilac", items: ["Live voice with the AI model and a phone demo line", "Case studies with real results", "Calendar booking on the contact page"] },
  { title: "Later", tone: "bg-mist", items: ["Public build logs and bounties", "Open-source agent templates", "More Notes, weekly for the first eight weeks", "A yearly Agent Radar"] },
];

export default function RoadmapPage() {
  return (
    <>
      <PageHeader eyebrow="Roadmap" title="What shipped, what is next." lead="Plain and dated by order, not by promise. Items move left as they ship." />
      <div className="frame border-t hair">
        <div data-stagger className="grid gap-px bg-[rgb(11_21_18/0.12)] md:grid-cols-3">
          {columns.map((c) => (
            <section key={c.title} className="bg-paper p-6 md:p-8">
              <span className={`pill-label ${c.tone}`}>{c.title}</span>
              <ul className="mt-5 space-y-3">
                {c.items.map((i) => (
                  <li key={i} className="rounded-xl border hair bg-chalk px-4 py-3 text-[0.9375rem]">{i}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="border-t hair px-4 py-6 text-sm text-slate md:px-10">
          Something you need that is not here?{" "}
          <a href={`mailto:${site.email}?subject=Roadmap%20suggestion`} className="u-link hover:text-plum">Tell us</a>.
        </p>
      </div>
      <PageCta />
    </>
  );
}
