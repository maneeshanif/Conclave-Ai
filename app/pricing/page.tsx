import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { faqs, tiers } from "@/components/home/sections";

export const metadata: Metadata = {
  title: "Pricing: 14-day pilot, fixed-scope build, retainer",
  description: "Start with a 14-day pilot, move to a fixed-scope build, then keep it tuned on a retainer. Scoped on a call.",
  alternates: { canonical: "/pricing" },
};

const included = [
  ["One agent, one job", "Pilot, Build, Retainer"],
  ["Your calendar and CRM connected", "Build, Retainer"],
  ["Handover and training", "Build, Retainer"],
  ["Weekly one-page summary", "Pilot, Build, Retainer"],
  ["Monitoring and tuning", "Retainer"],
  ["New flows each month", "Retainer"],
];

export default function PricingPage() {
  return (
    <>
      <PageHeader eyebrow="Pricing" title="Pilot, Build, Retainer." lead="Fixed scope, quoted on a call. Start with a 14-day pilot and see it work before you commit to more." />
      <div data-stagger className="frame grid gap-4 border-t hair px-4 py-8 md:grid-cols-3 md:px-10">
        {tiers.map((t) => (
          <div key={t.name} className="flex flex-col rounded-3xl border hair bg-paper p-8">
            <h2 className="display text-[clamp(1.5rem,2.6vw,2.5rem)]">{t.name}</h2>
            <p className="mt-2 text-plum">{t.for}</p>
            <ul className="mt-6 flex-1 space-y-2 text-slate">
              {t.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="label mt-6 text-slate">Price shown here once confirmed</p>
            <Button href="/contact" className="mt-4">
              Book a call
            </Button>
          </div>
        ))}
      </div>

      <section data-reveal className="frame border-t hair px-4 py-12 md:px-10">
        <h2 className="head">What is included</h2>
        <div tabIndex={0} role="region" aria-label="Table, scrolls sideways" className="mt-6 overflow-x-auto rounded-2xl border hair bg-paper">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <caption className="sr-only">What each plan includes</caption>
            <tbody className="divide-y divide-[rgb(11_21_18/0.12)]">
              {included.map(([what, plans]) => (
                <tr key={what}>
                  <th scope="row" className="px-5 py-3.5 font-medium">{what}</th>
                  <td className="px-5 py-3.5 text-slate">{plans}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-slate">
          Wondering how this compares with hiring a receptionist or an agency? See the{" "}
          <Link href="/compare" className="u-link hover:text-plum">comparison</Link>.
        </p>
      </section>

      <section className="frame grid border-t hair md:grid-cols-2">
        <h2 data-reveal className="head px-4 py-12 md:px-10">Questions about pricing</h2>
        <div data-reveal className="border-t hair bg-paper md:border-l md:border-t-0">
          <Accordion items={faqs} />
        </div>
      </section>
      <PageCta />
    </>
  );
}
