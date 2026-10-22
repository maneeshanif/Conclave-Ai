"use client";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { site } from "@/lib/site";
import { StudGlyph } from "@/components/studs/StudGlyph";

const windows = ["Morning", "Afternoon", "Evening"];
const input = "mt-1.5 h-12 w-full rounded-xl border border-paper/25 bg-transparent px-3.5 text-[0.9375rem] text-paper placeholder:text-steel hover:border-paper/50 focus-visible:border-lime";

/**
 * Inline booking block for the closing section. With a Cal.com link configured it points at the live calendar.
 * Without one it asks for a preferred time of day and an email and sends a callback request through the contact API,
 * so it never shows slots that do not exist.
 */
export function QuickBook() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [when, setWhen] = useState(windows[1]);
  const opened = useRef(0);
  useEffect(() => {
    opened.current = Date.now();
  }, []);

  if (site.calLink) {
    return (
      <div className="rounded-3xl border border-paper/20 p-6">
        <p className="label text-lilac">Book a call</p>
        <p className="mt-3 text-paper">Pick a time on our calendar.</p>
        <a href={site.calLink} rel="noopener" className="press mt-5 inline-flex h-12 items-center rounded-xl bg-lime px-6 font-medium text-ink transition-colors duration-150 hover:bg-paper">
          See open times
        </a>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    const r = await api<{ ok: boolean }>("/leads", {
      body: {
        name: String(f.get("name") ?? "") || "Callback request",
        email: String(f.get("email") ?? ""),
        needs: ["Book a call"],
        message: `Callback request. Preferred time of day: ${when}.`,
        source: "home-cta",
        consent: f.get("consent") === "on",
        website: String(f.get("website") ?? ""),
        opened_at: opened.current,
      },
    });
    if (r.ok) setState("done");
    else {
      setMsg(r.message);
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="rounded-3xl border border-paper/20 p-6 text-center">
        <StudGlyph agent="aria" size={96} animate active className="mx-auto" />
        <p className="mt-3 text-lg font-medium text-lime">Got it.</p>
        <p className="mt-1 text-sm text-steel">We will email you with times that suit {when.toLowerCase()}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-paper/20 p-6">
      <p className="label text-lilac">Request a call</p>
      <label className="mt-4 block text-sm font-medium text-paper">
        Your email
        <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={input} />
      </label>
      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-paper">Best time of day</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {windows.map((w) => (
            <label key={w} className={`press flex min-h-11 cursor-pointer items-center rounded-xl border px-4 text-sm transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lime ${when === w ? "border-lime bg-lime text-ink" : "border-paper/25 text-paper hover:border-paper/50"}`}>
              <input type="radio" name="when" value={w} checked={when === w} onChange={() => setWhen(w)} className="sr-only" />
              {w}
            </label>
          ))}
        </div>
      </fieldset>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="mt-4 flex items-start gap-3 text-sm text-steel">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-[#C8F169]" />
        <span>I agree to be emailed about this request.</span>
      </label>
      <p aria-live="polite" className="mt-2 min-h-5 text-xs text-[#F4A6A6]">
        {state === "error" ? msg : ""}
      </p>
      <button type="submit" disabled={state === "sending"} className="press mt-1 inline-flex h-12 w-full items-center justify-center rounded-xl bg-lime px-6 font-medium text-ink transition-colors duration-150 hover:bg-paper disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Request a call"}
      </button>
    </form>
  );
}
