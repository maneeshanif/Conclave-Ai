import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { tiers } from "@/components/home/sections";

export const metadata: Metadata = { title: "Pricing", description: "Pilot, Build and Retainer packages." };

export default function PricingPage() {
  return (
    <>
      <PageHeader eyebrow="Pricing" title="Pilot, Build, Retainer." lead="Fixed scope. We quote on a call." />
      <div className="frame px-4 md:px-10 grid gap-4 pb-24 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.name} className="flex flex-col rounded-3xl border hair bg-paper p-8">
            <h2 className="display text-[clamp(1.5rem,2.6vw,2.5rem)]">{t.name}</h2>
            <p className="mt-2 text-plum">{t.for}</p>
            <ul className="mt-6 flex-1 space-y-2 text-slate">
              {t.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <Button href="/contact" className="mt-8">
              Book a call
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
