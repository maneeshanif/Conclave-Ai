import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { CastRow } from "@/components/Cast";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Conclave AI",
  description: "Conclave AI is an agent studio in Karachi serving the US, Gulf and Europe. Small agents, fixed scope, engineer-led.",
  alternates: { canonical: "/about" },
};

const approach = [
  ["Fixed scope", "You know what you get and what it costs before we start."],
  ["One job per agent", "A council of narrow agents beats one fragile mega-bot. Small agents are easier to test, trust and fix."],
  ["Product later", "What we repeat for clients becomes software."],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="Agents, convened." lead="A conclave is a small group, in one room, reaching one decision. We build the same way: engineer-led, not agency-led." />
      <div className="frame border-t hair">
        <ul data-stagger className="grid md:grid-cols-3">
          {approach.map(([t, b], i) => (
            <li key={t} className={`px-4 py-8 md:px-10 ${i > 0 ? "border-t hair md:border-l md:border-t-0" : ""}`}>
              <h2 className="text-title">{t}</h2>
              <p className="mt-3 text-slate">{b}</p>
            </li>
          ))}
        </ul>

        <section data-reveal className="border-t hair px-4 py-12 md:px-10">
          <Eyebrow>The council</Eyebrow>
          <CastRow className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-7" />
        </section>

        <section data-reveal className="grid gap-8 border-t hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
          <h2 className="head">The people</h2>
          <div>
            <p className="max-w-xl text-slate">Two humans you can talk to. Founder profiles, with faces and a one-line story each, are added here.</p>
            <p className="label mt-4 text-slate">Profiles to be added</p>
          </div>
        </section>

        <section data-reveal className="grid gap-8 border-t hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
          <h2 className="head">Where we are</h2>
          <p className="max-w-xl text-slate">
            {site.city}, serving {site.serving}. Time zone and reply time are added with the contact details.
          </p>
        </section>

        <p className="border-t hair px-4 py-6 text-sm text-slate md:px-10">
          Conclave AI is an agent studio. Not affiliated with AWS AI Conclave events or Conclave VDR.
        </p>
      </div>
      <PageCta />
    </>
  );
}
