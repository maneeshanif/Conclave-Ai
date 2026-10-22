import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = { title: "About", description: "Why we build small, specific agents." };

const approach = [
  ["Fixed scope", "You know what you get and what it costs before we start."],
  ["One job per agent", "Small agents are easier to test, trust and fix."],
  ["Product later", "What we repeat for clients becomes software."],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="Agents, convened." lead="A conclave is a small group, in one room, reaching one decision." />
      <div className="frame px-4 md:px-10 pb-24">
        <ul data-stagger className="grid gap-0 md:grid-cols-3">
          {approach.map(([t, b]) => (
            <li key={t} className="border-t hair py-8 pr-8">
              <h2 className="text-title">{t}</h2>
              <p className="mt-3 text-slate">{b}</p>
            </li>
          ))}
        </ul>
        <section data-reveal className="border-t hair pt-12">
          <Eyebrow>Team</Eyebrow>
          <p className="mt-4 text-slate">Team profiles to be added.</p>
        </section>
      </div>
    </>
  );
}
