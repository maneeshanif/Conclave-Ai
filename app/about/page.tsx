import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { StudCrew } from "@/components/studs/StudCrew";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Conclave AI",
  description: "Conclave AI is an agent studio in Karachi serving the US, Gulf and Europe. Small agents, engineer-led.",
  alternates: { canonical: "/about" },
};

const approach = [
  ["Listen first", "We start with your calls and workflows, then build what fits."],
  ["One job per agent", "A council of narrow agents beats one fragile mega-bot. Small agents are easier to test, trust and fix."],
  ["Product later", "What we repeat for clients becomes software."],
];

/** Founders appear here with a photo and a one-line story once they are supplied. Until then the section is not shown. */
const team: { name: string; role: string; story: string; photo: string }[] = [];

export default function AboutPage() {
  return (
    <>
      <PageHeader path="/about"
        eyebrow="About"
        title="Agents, convened."
        lead="A conclave is a closed room where a small group reaches one decision. We convene small, specific agents the same way: each with one job, working together so your business never misses a call."
      />
      <div className="frame border-t hair">
        {team.length > 0 && (
          <section data-reveal className="border-b hair px-4 py-12 md:px-10">
            <h2 className="head">The people</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {team.map((p) => (
                <li key={p.name} className="rounded-2xl border hair bg-paper p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.photo} alt={`${p.name}, ${p.role}`} className="h-40 w-40 rounded-2xl object-cover" />
                  <h3 className="mt-4 text-lg font-semibold">{p.name}</h3>
                  <p className="label text-slate">{p.role}</p>
                  <p className="mt-2 text-slate">{p.story}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <ul data-stagger className="grid md:grid-cols-3">
          {approach.map(([t, b], i) => (
            <li key={t} className={`px-4 py-8 md:px-10 ${i > 0 ? "border-t hair md:border-l md:border-t-0" : ""}`}>
              <h2 className="text-title">{t}</h2>
              <p className="mt-3 text-slate">{b}</p>
            </li>
          ))}
        </ul>

        <section data-reveal className="border-t hair px-4 py-12 md:px-10">
          <Eyebrow>The crew</Eyebrow>
          <StudCrew className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-7" glyphClass="h-24 w-24 md:h-28 md:w-28" />
        </section>

        <section data-reveal className="grid gap-8 border-t hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
          <h2 className="head">Where we are</h2>
          <p className="max-w-xl text-slate">
            {site.city}, serving {site.serving}.
          </p>
        </section>

        <p className="border-t hair px-4 py-6 text-sm text-slate md:px-10">Conclave AI is an agent studio. Not affiliated with AWS AI Conclave events or Conclave VDR.</p>
      </div>
      <PageCta />
    </>
  );
}
