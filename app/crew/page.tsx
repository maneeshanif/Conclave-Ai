import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { StudGlyph } from "@/components/studs/StudGlyph";
import { StudMark } from "@/components/studs/StudMark";
import { AGENTS, AGENT_IDS } from "@/lib/studs/patterns";

export const metadata: Metadata = {
  title: "The Crew: seven agents, one job each",
  description: "Aria, Echo, Slot, Boomerang, Tally, Gate and Ledger: seven small agents, each a pattern on one stud grid.",
  alternates: { canonical: "/crew" },
};

export default function CrewPage() {
  return (
    <>
      <PageHeader path="/crew"
        eyebrow="The Crew"
        title="Seven agents. One job each."
        lead="Each is a pattern on the same seven-by-seven grid of studs, the same studs that make our C. Their personality is in how they move, not in a face."
      />
      <div className="frame border-t hair">
        <div data-reveal className="flex flex-wrap items-center gap-5 border-b hair bg-paper px-4 py-6 md:px-10">
          <StudMark size={88} tone="dark" label="The Conclave C, made of studs" />
          <p className="max-w-lg text-slate">
            <span className="label mr-2 text-plum">One system</span>
            Our C is built from the same studs as the crew: two rings and a centre stud, with a gap on the right. The logo and the agents are one family.
          </p>
        </div>
        <ul data-stagger className="grid gap-px bg-[rgb(11_21_18/0.12)] sm:grid-cols-2 lg:grid-cols-3">
          {AGENT_IDS.map((id, i) => {
            const a = AGENTS[id];
            return (
              <li key={id} className="group flex flex-col bg-mist p-6 md:p-8">
                <div className="lift-on-hover w-fit">
                  <StudGlyph agent={id} size={176} animate />
                </div>
                <p className="label mt-6 text-plum">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">{a.label}</h2>
                <p className="text-slate">{a.job}</p>
                <p className="mt-4 rounded-xl bg-paper px-3 py-2 text-sm">&ldquo;{a.voice}&rdquo;</p>
                <p className="mt-4 text-sm text-slate">
                  <span className="label mr-2">Does</span>
                  {a.does}
                </p>
              </li>
            );
          })}
        </ul>
        <p className="border-t hair px-4 py-6 text-sm text-slate md:px-10">Voice lines are sample copy for the agents, not customer quotes.</p>
      </div>
      <PageCta title="Want a crew of your own?" body="We pick the one or two that fix your biggest leak and start there." />
    </>
  );
}
