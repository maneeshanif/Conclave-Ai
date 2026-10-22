"use client";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

const WEEKS_PER_MONTH = 52 / 12;

function NumberField({ label, hint, value, onChange, min = 0, max, step = 1, suffix }: { label: string; hint: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number; suffix?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
          aria-describedby={`${id}-h`}
          className="h-12 w-full rounded-xl border hair bg-paper px-3.5 text-[0.9375rem] transition-colors duration-150 hover:border-ink/30 focus-visible:border-ink"
        />
        {suffix && <span className="text-sm text-slate">{suffix}</span>}
      </div>
      <p id={`${id}-h`} className="mt-1 text-xs text-slate">
        {hint}
      </p>
    </div>
  );
}

const fmt = (n: number) => (Number.isFinite(n) ? Math.round(n).toLocaleString("en-US") : "0");
const clean = (n: number, max = 1e7) => (Number.isFinite(n) ? Math.min(Math.max(n, 0), max) : 0);

/**
 * Missed-call calculator. Every number is the visitor's own input; the starting values are examples (and say so),
 * and the working is shown line by line so nothing is hidden.
 */
export function Calculator() {
  const [missed, setMissed] = useState(10);
  const [rate, setRate] = useState(30);
  const [value, setValue] = useState(100);
  const [answered, setAnswered] = useState(70);

  const m = clean(missed, 5000), r = clean(rate, 100), v = clean(value), a = clean(answered, 100);
  const bookings = m * (r / 100);
  const lostMonth = bookings * WEEKS_PER_MONTH * v;
  const lostYear = lostMonth * 12;
  const recoverYear = lostYear * (a / 100);

  const rows: [string, string][] = [
    [`${fmt(m)} missed calls a week × ${fmt(r)}% who would have booked`, `${bookings.toFixed(1)} bookings a week`],
    [`${bookings.toFixed(1)} bookings × ${WEEKS_PER_MONTH.toFixed(2)} weeks × ${fmt(v)} per visit`, `${fmt(lostMonth)} a month`],
    [`${fmt(lostMonth)} × 12 months`, `${fmt(lostYear)} a year left on the table`],
    [`${fmt(lostYear)} × ${fmt(a)}% an agent could answer`, `${fmt(recoverYear)} a year within reach`],
  ];

  return (
    <div>
      <p className="rounded-xl bg-mist px-3 py-2 text-sm">Starting values are examples. Replace them with your own; the working below updates as you type.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <NumberField label="Calls you miss in a week" hint="Check your phone log for a typical week." value={missed} onChange={setMissed} max={5000} />
        <NumberField label="Share that would have booked" hint="Out of 100 callers, how many book when you do pick up?" value={rate} onChange={setRate} max={100} suffix="%" />
        <NumberField label="Average value of a visit" hint="In your own currency." value={value} onChange={setValue} />
        <NumberField label="Share an agent could answer" hint="Your assumption. Urgent or unusual calls still go to a person." value={answered} onChange={setAnswered} max={100} suffix="%" />
      </div>

      <div className="mt-8 rounded-2xl bg-ink p-6 text-paper md:p-8" aria-live="polite">
        <p className="label text-lilac">Within reach each year</p>
        <p className="display mt-2 text-[clamp(2rem,6vw,3.5rem)] text-lime">{fmt(recoverYear)}</p>
        <p className="mt-1 text-sm text-steel">An estimate from your inputs, not a promise.</p>
      </div>

      <ol className="mt-6 divide-y divide-[rgb(11_21_18/0.12)] rounded-2xl border hair bg-paper text-sm">
        {rows.map(([sum, res], i) => (
          <li key={i} className={cn("flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3", i === rows.length - 1 && "font-medium")}>
            <span className="text-slate">{sum}</span>
            <span>{res}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
