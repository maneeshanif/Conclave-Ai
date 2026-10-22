import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { compare } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Compare: Conclave AI vs freelancer, n8n, agency and receptionist",
  description: "An honest comparison of the ways to get an AI agent or a receptionist, and where each one fits.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <>
      <PageHeader eyebrow="Compare" title="Pick the right tool, even if it is not us." lead="A flow, a freelancer, an agency and a receptionist each fit some jobs. Here is where." />
      <div data-reveal className="frame border-t hair px-4 py-10 md:px-10">
        <div tabIndex={0} role="region" aria-label="Table, scrolls sideways" className="overflow-x-auto rounded-2xl border hair bg-paper">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <caption className="sr-only">Comparison of Conclave AI with four alternatives</caption>
            <thead>
              <tr className="bg-mist/60">
                <th scope="col" className="px-5 py-4 font-medium text-slate">What you need</th>
                {compare.cols.map((c, i) => (
                  <th key={c} scope="col" className={cn("px-5 py-4 font-semibold", i === 0 && "bg-lime text-ink")}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(11_21_18/0.12)]">
              {compare.rows.map(([need, ...cells]) => (
                <tr key={need}>
                  <th scope="row" className="px-5 py-4 font-medium">{need}</th>
                  {cells.map((c, i) => (
                    <td key={i} className={cn("px-5 py-4 text-slate", i === 0 && "bg-lime/25 font-medium text-ink")}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-slate">
          Entries describe typical cases, not any named company. We use n8n where it fits, and a freelancer is often the right call for a small, one-off flow.
        </p>
      </div>
      <PageCta title="Not sure which fits?" body="Tell us the job. If another route suits you better, we will say so." />
    </>
  );
}
