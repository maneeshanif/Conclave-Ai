"use client";
import { useState } from "react";
import { api } from "@/lib/api";

/** Footer signup. Dark-surface styling. Honeypot field, and the server rate-limits per IP. */
export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    const r = await api<{ ok: boolean }>("/subscribe", { body: { email: String(f.get("email") ?? ""), website: String(f.get("website") ?? "") } });
    if (r.ok) setState("done");
    else {
      setState("error");
      setMsg(r.message);
    }
  }

  if (state === "done") return <p role="status" className="text-sm text-lime">Thanks. You are on the list.</p>;

  return (
    <form onSubmit={onSubmit} className="max-w-xs">
      <label htmlFor="nl-email" className="label text-paper">
        Notes by email
      </label>
      <p className="mt-1 text-sm text-steel">Playbooks and build logs. No spam.</p>
      <div className="mt-3 flex gap-2">
        <input id="nl-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="h-11 min-w-0 flex-1 rounded-xl border border-paper/25 bg-transparent px-3 text-sm text-paper placeholder:text-steel hover:border-paper/50 focus-visible:border-lime" />
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <input name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <button type="submit" disabled={state === "sending"} className="press h-11 rounded-xl bg-lime px-4 text-sm font-medium text-ink transition-colors duration-150 hover:bg-paper disabled:opacity-60">
          Join
        </button>
      </div>
      <p aria-live="polite" className="mt-2 min-h-5 text-xs text-[#F4A6A6]">
        {state === "error" ? msg : ""}
      </p>
    </form>
  );
}
