import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { compare } from "@/lib/content";
import { Accordion } from "@/components/ui/Accordion";
import { LastUpdated, PAGES_UPDATED } from "@/components/LastUpdated";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Best AI receptionist: how to compare your options",
  description: "How to choose the best AI receptionist: an honest comparison of Conclave AI, a freelancer, a no-code flow, an agency and an in-house receptionist, with a checklist of what to ask.",
  alternates: { canonical: "/compare" },
};

const checklist = [
  "Can you hear it on a real call before you commit?",
  "Does it book into your actual calendar, or only take a message?",
  "What happens when it is unsure, or the caller is upset? Is there a clear handover to a person?",
  "Does it tell callers it is an AI, and can they ask for a human?",
  "Which languages does it speak well, and has anyone on your side heard them?",
  "Where is call data stored, who can see it and is recording optional?",
  "Who monitors it and fixes it when something breaks at 6pm on a Friday?",
];

const faq: [string, string][] = [
  ["What is the best AI receptionist?", "It depends on your calls. The best one for you books into your calendar, hands off cleanly to a person, speaks your callers' languages and can be heard on a real call first. Use the checklist on this page to compare any option, including ours."],
  ["How do I compare AI receptionists?", "Hear a live call, check what happens when the agent is unsure, ask where data is stored, and ask who fixes problems. The comparison table and checklist on this page cover the main points."],
  ["When is a human receptionist better?", "When calls are rare, emotionally sensitive or need judgment on every call. Many practices keep a person for those and use an AI for volume, after hours and routine bookings."],
  ["Is a no-code flow enough?", "For a small, one-off flow, often yes. It needs monitoring and retries as volume grows, which is where a managed build helps."],
];

export default function ComparePage() {
  return (
    <>
      <PageHeader path="/compare" eyebrow="Compare" title="Pick the right AI receptionist, even if it is not us." lead="The best AI receptionist for you is the one you can hear on a real call, that books into your actual calendar and hands off cleanly to a person. A flow, a freelancer, an agency and an in-house receptionist each fit some jobs. Here is where." />
      <LastUpdated />
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
      <div className="frame border-t hair">
        <section className="grid gap-8 border-b hair px-4 py-12 md:grid-cols-[1fr_2fr] md:px-10">
          <h2 data-reveal className="head">What to ask any AI receptionist provider</h2>
          <ul className="max-w-2xl list-disc space-y-2 ps-5 text-slate">
            {checklist.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
        <section className="grid gap-8 border-b hair md:grid-cols-[1fr_2fr]">
          <h2 data-reveal className="head px-4 pt-12 md:px-10">Questions</h2>
          <div data-reveal className="border-t hair bg-paper md:border-l md:border-t-0">
            <Accordion items={faq} />
          </div>
        </section>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            { "@context": "https://schema.org", "@type": "WebPage", name: "Best AI receptionist: how to compare your options", dateModified: PAGES_UPDATED },
            { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
          ]),
        }}
      />
      <PageCta title="Not sure which fits?" body="Tell us the job. If another route suits you better, we will say so." />
    </>
  );
}
