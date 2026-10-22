import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { Character } from "@/components/Cast";
import { cast } from "@/lib/content";

export const metadata: Metadata = {
  title: "Meet the Brick Crew",
  description: "Seven small agents built from one toy-brick kit: Aria, Echo, Slot, Boomerang, Tally, Gate and Ledger. One job each.",
  alternates: { canonical: "/crew" },
};

export default function CrewPage() {
  return (
    <>
      <PageHeader
        eyebrow="The crew"
        title="Seven bricks. One job each."
        lead="Every agent we build is small and specific. So are they: stacked from the same kit, studs on top, each with one thing it is great at."
      />
      <div className="frame border-t hair">
        <ul data-stagger className="grid gap-px bg-[rgb(11_21_18/0.12)] sm:grid-cols-2 lg:grid-cols-3">
          {cast.map((c, i) => (
            <li key={c.id} className="group flex flex-col bg-mist p-6 md:p-8">
              <div className="lift-on-hover">
                <Character id={c.id} className="h-48 w-auto" />
              </div>
              <p className="label mt-6 text-plum">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">{c.name}</h2>
              <p className="text-slate">{c.job}</p>
              <p className="mt-4 rounded-xl bg-paper px-3 py-2 text-sm">&ldquo;{c.line}&rdquo;</p>
              <dl className="mt-4 space-y-1 text-sm text-slate">
                <div className="flex gap-2">
                  <dt className="label">Mood</dt>
                  <dd>{c.trait}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="label">Look</dt>
                  <dd>{c.sig}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
        <p className="border-t hair px-4 py-6 text-sm text-slate md:px-10">
          Built from one kit so they read as a family at any size. Lines above are sample voice for the characters, not customer quotes.
        </p>
      </div>
      <PageCta title="Want a crew of your own?" body="We pick the one or two that fix your biggest leak and start there." />
    </>
  );
}
