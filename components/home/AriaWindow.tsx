"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Button } from "@/components/ui/Button";

const bars = [10, 24, 14, 36, 20, 44, 18, 30, 12, 26, 16, 38, 22, 10, 28, 16];

type Line = { who: "caller" | "aria"; text: string };

/** Example conversations only. The real voice session arrives in the implementation step. */
const tabs: { id: string; label: string; ask: string; lines: Line[] }[] = [
  {
    id: "voice",
    label: "Answer calls",
    ask: "A caller rings after hours and wants an appointment",
    lines: [
      { who: "caller", text: "Hi, are you open Saturday? I need a check-up." },
      { who: "aria", text: "We are, from 9 to 1. I have 10:15 or 11:30. Which suits you?" },
      { who: "caller", text: "10:15 please." },
      { who: "aria", text: "Booked for Saturday at 10:15. I'll text you a reminder." },
    ],
  },
  {
    id: "follow",
    label: "Follow up fast",
    ask: "A web enquiry comes in while the team is busy",
    lines: [
      { who: "caller", text: "Form: Do you do same-day appointments?" },
      { who: "aria", text: "Hi Sam, yes. We have 4:15 pm today. Shall I hold it?" },
      { who: "caller", text: "Yes please." },
      { who: "aria", text: "Held for you. Reply CANCEL any time to release it." },
    ],
  },
  {
    id: "book",
    label: "Book the slot",
    ask: "A returning customer wants to move their visit",
    lines: [
      { who: "caller", text: "Can I move my Tuesday visit?" },
      { who: "aria", text: "Sure. Wednesday 9:30 or Thursday 3:00 are free." },
      { who: "caller", text: "Wednesday." },
      { who: "aria", text: "Done. Your calendar invite is on its way." },
    ],
  },
  {
    id: "win",
    label: "Win back",
    ask: "A customer who has not visited in 9 months",
    lines: [
      { who: "aria", text: "Hi Alex, it has been a while. We have a few openings this month if you'd like a visit." },
      { who: "caller", text: "Actually yes, I was meaning to call." },
      { who: "aria", text: "Great, would Friday morning work?" },
    ],
  },
];

export function AriaWindow() {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active)!;
  const lines = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  /* Each tab plays its conversation in: lines rise in turn like messages arriving. Skipped for reduced motion. */
  useEffect(() => {
    if (reduced || !lines.current) return;
    const items = Array.from(lines.current.children);
    const tween = gsap.fromTo(items, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: ease.outExpo, stagger: 0.22, clearProps: "transform" });
    return () => {
      tween.kill();
    };
  }, [active, reduced]);

  return (
    <div className="overflow-hidden rounded-2xl border hair bg-paper shadow-[0_1px_0_rgb(11_21_18/0.06)]">
      <div className="flex items-center gap-4 border-b hair bg-mist/60 px-3 py-2 md:px-4">
        <span className="hidden shrink-0 gap-1.5 sm:flex" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-ink/20" />
          <span className="h-3 w-3 rounded-full bg-ink/20" />
          <span className="h-3 w-3 rounded-full bg-ink/20" />
        </span>
        {/* Two by two on phones so no label is ever cut off; one row from 640px. */}
        <div role="tablist" aria-label="What Aria can do" className="grid min-w-0 flex-1 grid-cols-2 gap-1 sm:flex sm:flex-none">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => setActive(t.id)}
              className={cn(
                "press h-9 rounded-lg px-3 text-sm transition-[color,background-color,transform] duration-150",
                active === t.id ? "bg-paper font-medium text-ink" : "text-slate hover:text-ink",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div id={`panel-${tab.id}`} role="tabpanel" aria-labelledby={`tab-${tab.id}`} className="grid gap-8 p-5 md:grid-cols-[1.1fr_1fr] md:p-8">
        <div>
          <div className="flex items-center gap-3 border-b hair pb-4">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-xs font-semibold text-lime">A</span>
            <span className="text-sm font-medium">Aria</span>
            <span className="text-sm text-slate">{tab.ask}</span>
          </div>
          <ol ref={lines} className="mt-5 min-h-[14rem] space-y-2.5 text-[0.9375rem]">
            {tab.lines.map((l, i) => (
              <li
                key={i}
                className={cn(
                  "max-w-[85%] rounded-xl px-3.5 py-2.5",
                  l.who === "aria" ? "ml-auto bg-ink text-paper" : "bg-mist text-ink",
                )}
              >
                {l.text}
              </li>
            ))}
          </ol>
          <p className="label mt-4 text-slate">Example conversation, not a recording</p>
        </div>

        <div className="flex flex-col justify-between gap-6 rounded-2xl bg-chalk p-6">
          <div>
            <span className="pill-label">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-violet" /> Live demo
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">Talk to Aria yourself</h2>
            <p className="mt-2 text-slate">Speak to the agent from your browser. Ask it to book you in. No sign-up needed.</p>
          </div>
          <div data-wave className="flex h-16 items-center gap-1.5" role="img" aria-label="Voice waveform, idle">
            {bars.map((h, i) => (
              <span key={i} className="w-1.5 rounded-full bg-violet" style={{ height: h }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/demos">Start the voice demo</Button>
            <Link href="/contact" className="inline-flex h-11 items-center px-2 text-[0.9375rem] underline-offset-4 hover:underline">
              or book a call
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
