"use client";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { services, site } from "@/lib/site";
import { StudGlyph } from "@/components/studs/StudGlyph";
import { cn } from "@/lib/utils";

const budgets = ["Not sure yet", "Start with one job", "A larger build", "Ongoing support"];
const field = "mt-1.5 w-full rounded-xl border hair bg-paper px-3.5 text-[0.9375rem] transition-colors duration-150 placeholder:text-slate/70 hover:border-ink/30 focus-visible:border-ink";

type Status = "idle" | "sending" | "done" | "error";

/** Contact form. Honeypot (`website`), a speed trap (`opened_at`) and consent are all checked again on the server. */
export function ContactForm({ source = "contact" }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const opened = useRef<number>(0);
  useEffect(() => {
    opened.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    const res = await api<{ ok: boolean }>("/leads", {
      body: {
        name: String(f.get("name") ?? ""),
        email: String(f.get("email") ?? ""),
        company: String(f.get("company") ?? "") || null,
        needs,
        budget: String(f.get("budget") ?? "") || null,
        message: String(f.get("message") ?? "") || null,
        consent: f.get("consent") === "on",
        website: String(f.get("website") ?? ""),
        opened_at: opened.current,
        source,
      },
    });
    if (res.ok) setStatus("done");
    else {
      setError(res.message);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="flex flex-col items-center rounded-3xl border hair bg-lime p-10 text-center text-ink">
        <StudGlyph agent="aria" size={128} animate active label="Aria, answering" />
        <h2 className="head mt-4">Got it. Thank you.</h2>
        <p className="mt-2 max-w-sm">We will reply by email. If you do not hear from us, write to {site.email}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="rounded-3xl border hair bg-paper p-6 md:p-8" aria-describedby="form-note">
      <h2 className="head">Tell us what you need</h2>
      <p id="form-note" className="mt-1 text-sm text-slate">A few lines is plenty. We reply by email.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Name
          <input name="name" required maxLength={80} autoComplete="name" className={cn(field, "h-12")} />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" className={cn(field, "h-12")} />
        </label>
        <label className="block text-sm font-medium sm:col-span-2">
          Company <span className="font-normal text-slate">(optional)</span>
          <input name="company" maxLength={120} autoComplete="organization" className={cn(field, "h-12")} />
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium">What would help most?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {[...services.map((s) => s.short), "Full-stack build", "Not sure"].map((n) => {
            const on = needs.includes(n);
            return (
              <label
                key={n}
                className={cn(
                  "press flex min-h-11 cursor-pointer items-center rounded-xl border px-4 text-sm transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2",
                  on ? "border-ink bg-ink text-paper" : "hair bg-paper hover:bg-mist",
                )}
              >
                <input type="checkbox" className="sr-only" checked={on} onChange={() => setNeeds((c) => (on ? c.filter((x) => x !== n) : [...c, n]))} />
                {n}
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="mt-6 block text-sm font-medium">
        Where would you like to start?
        <select name="budget" defaultValue="" className={cn(field, "h-12")}>
          <option value="">Choose one</option>
          {budgets.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>

      <label className="mt-6 block text-sm font-medium">
        Message
        <textarea name="message" rows={4} maxLength={2000} className={cn(field, "py-3")} />
      </label>

      {/* Honeypot: people never see or reach this; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-ink" />
        <span>I agree to be contacted about this enquiry. We use your details only to reply.</span>
      </label>

      <div aria-live="polite" className="min-h-6 pt-3 text-sm text-[#9B1C1C]">
        {status === "error" ? error : ""}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="press mt-2 inline-flex h-12 items-center justify-center rounded-xl bg-lime px-6 font-medium text-ink transition-colors duration-150 hover:bg-ink hover:text-lime disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
