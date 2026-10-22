import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = { title: "Demos", description: "Talk to a live voice agent and play Convene." };

export default function DemosPage() {
  return (
    <>
      <PageHeader eyebrow="Demos" title="Try it, don't take our word." />
      <div data-stagger className="frame px-4 md:px-10 grid gap-4 pb-24 md:grid-cols-2">
        <section id="aria" className="scroll-mt-28 rounded-3xl border hair bg-paper p-8">
          <Eyebrow>Talk to Aria</Eyebrow>
          <h2 className="display mt-4 text-display-m">Live voice agent.</h2>
          <p className="mt-4 text-slate">The microphone demo and a text-chat fallback land here.</p>
        </section>
        <section id="convene" className="scroll-mt-28 rounded-3xl border hair bg-paper p-8">
          <Eyebrow>Convene</Eyebrow>
          <h2 className="display mt-4 text-display-m">60-second game.</h2>
          <p className="mt-4 text-slate">Drag agents onto incoming calls. The leaderboard lands here.</p>
        </section>
      </div>
    </>
  );
}
