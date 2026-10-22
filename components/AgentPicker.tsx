"use client";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/site";
import { cn } from "@/lib/utils";

type Score = Partial<Record<(typeof services)[number]["slug"], number>>;
type Q = { q: string; options: [string, Score][] };

const questions: Q[] = [
  {
    q: "Where do you lose the most business today?",
    options: [
      ["Calls nobody picks up", { voice: 2 }],
      ["Enquiries that wait too long for a reply", { "follow-up": 2 }],
      ["Scheduling back and forth", { booking: 2 }],
      ["Customers who stopped coming", { reactivation: 2 }],
      ["I cannot see what is working", { reporting: 2 }],
    ],
  },
  {
    q: "How do customers usually reach you?",
    options: [
      ["By phone", { voice: 1, booking: 1 }],
      ["Messages and web forms", { "follow-up": 1, booking: 1 }],
      ["Both", { voice: 1, "follow-up": 1 }],
    ],
  },
  {
    q: "What would help most next?",
    options: [
      ["A fuller diary", { booking: 1, reactivation: 1 }],
      ["Answering faster", { voice: 1, "follow-up": 1 }],
      ["Clear weekly numbers", { reporting: 2 }],
    ],
  },
];

/** Three questions, scored in the open (the scores are the options above), ends in one recommendation. */
export function AgentPicker() {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const done = answers.every((a) => a !== null);

  const totals: Record<string, number> = {};
  answers.forEach((a, qi) => {
    if (a === null) return;
    for (const [k, v] of Object.entries(questions[qi].options[a][1])) totals[k] = (totals[k] ?? 0) + (v ?? 0);
  });
  const best = done ? services.reduce((b, s) => ((totals[s.slug] ?? 0) > (totals[b.slug] ?? 0) ? s : b), services[0]) : null;

  return (
    <section aria-labelledby="picker-h" className="rounded-3xl border hair bg-paper p-6 md:p-10">
      <h2 id="picker-h" className="head">Which agent do I need?</h2>
      <p className="mt-2 text-slate">Three quick questions. No sign-up.</p>
      <div className="mt-8 space-y-8">
        {questions.map((q, qi) => (
          <fieldset key={q.q}>
            <legend className="font-medium">
              <span className="label mr-2 text-plum">{qi + 1}</span>
              {q.q}
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {q.options.map(([label], oi) => {
                const on = answers[qi] === oi;
                return (
                  <label
                    key={label}
                    className={cn(
                      "press flex min-h-11 cursor-pointer items-center rounded-xl border px-4 text-[0.9375rem] transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2",
                      on ? "border-ink bg-ink text-paper" : "hair bg-paper hover:bg-mist",
                    )}
                  >
                    <input
                      type="radio"
                      name={`q${qi}`}
                      checked={on}
                      onChange={() => setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))}
                      className="sr-only"
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <div aria-live="polite" className="mt-8 min-h-16">
        {best ? (
          <p className="rounded-2xl bg-lime p-5 text-ink">
            <span className="label mr-2">Start with</span>
            <Link href={`/services/${best.slug}`} className="u-link font-semibold">
              {best.title}
            </Link>
          </p>
        ) : (
          <p className="text-sm text-slate">Answer all three to see where to start.</p>
        )}
      </div>
    </section>
  );
}
