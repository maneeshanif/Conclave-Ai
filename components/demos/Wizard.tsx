"use client";
import Link from "next/link";
import { useState } from "react";
import { industries } from "@/lib/content";
import { services } from "@/lib/site";
import { Character } from "@/components/Cast";
import { cn } from "@/lib/utils";

const steps = [
  { q: "What kind of business?", options: industries.map((i) => ({ label: i.name, value: i.slug })) },
  { q: "Where do you lose the most?", options: services.map((s) => ({ label: s.short, value: s.slug })) },
  { q: "How do customers reach you?", options: [{ label: "By phone", value: "phone" }, { label: "Messages and forms", value: "messages" }, { label: "Both", value: "both" }] },
  { q: "How big is the team?", options: [{ label: "Just me", value: "solo" }, { label: "Two to ten", value: "small" }, { label: "More than ten", value: "large" }] },
] as const;

/** Four questions, one at a time, ending in a suggested agent and a link to book. Nothing is stored; answers stay in the page. */
export function Wizard() {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = i >= steps.length;

  const industry = industries.find((x) => x.slug === answers[0]);
  const service = services.find((x) => x.slug === answers[1]) ?? services[0];

  function choose(v: string) {
    setAnswers((a) => [...a.slice(0, i), v]);
    setI(i + 1);
  }

  return (
    <div className="rounded-2xl border hair bg-paper p-5 md:p-8">
      <div className="flex items-center justify-between">
        <p className="label text-slate">{done ? "Your suggestion" : `Question ${i + 1} of ${steps.length}`}</p>
        {i > 0 && (
          <button type="button" onClick={() => (done ? (setI(0), setAnswers([])) : setI(i - 1))} className="u-link text-sm hover:text-plum">
            {done ? "Start again" : "Back"}
          </button>
        )}
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-mist" aria-hidden="true">
        <div className="h-full rounded-full bg-ink transition-[width] duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)]" style={{ width: `${(Math.min(i, steps.length) / steps.length) * 100}%` }} />
      </div>

      {!done ? (
        <fieldset className="mt-6">
          <legend className="head">{steps[i].q}</legend>
          <div className="mt-5 flex flex-wrap gap-2">
            {steps[i].options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => choose(o.value)}
                className={cn("press min-h-11 rounded-xl border px-4 text-[0.9375rem] transition-colors duration-150", answers[i] === o.value ? "border-ink bg-ink text-paper" : "hair bg-paper hover:bg-mist")}
              >
                {o.label}
              </button>
            ))}
          </div>
        </fieldset>
      ) : (
        <div className="mt-6 grid items-center gap-6 sm:grid-cols-[auto_1fr]" aria-live="polite">
          <Character id={industry?.figure ?? "aria"} className="h-36 w-36" />
          <div>
            <h3 className="head">
              Start with <Link href={`/services/${service.slug}`} className="u-link hover:text-plum">{service.short.toLowerCase()}</Link>
              {industry ? ` for ${industry.name.toLowerCase()}` : ""}.
            </h3>
            <p className="mt-2 text-slate">The usual first step is a 14-day pilot on this one job, so you can see it work before you decide on more.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/contact" className="press inline-flex h-11 items-center rounded-xl bg-lime px-5 font-medium text-ink transition-colors duration-150 hover:bg-ink hover:text-lime">
                Book a call
              </Link>
              {industry && (
                <Link href={`/industries/${industry.slug}`} className="press inline-flex h-11 items-center rounded-xl border hair bg-paper px-5 font-medium transition-colors duration-150 hover:bg-mist">
                  See {industry.name.toLowerCase()}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
