/**
 * Flat product mock-ups, one per service. HTML + Tailwind only, palette colours only.
 * All data is sample data and every card says so ("Example"). Replaced by Flow recordings later.
 */
import { cn } from "@/lib/utils";

const card = "rounded-xl border hair bg-paper shadow-[0_1px_0_rgb(11_21_18/0.06)]";

function ExampleTag() {
  return <span className="label text-slate">Example</span>;
}

function Waveform({ n = 18, className }: { n?: number; className?: string }) {
  const h = [8, 18, 12, 28, 16, 34, 14, 24, 10, 30, 18, 36, 12, 22, 16, 28, 10, 20];
  return (
    <div data-wave className={cn("flex h-10 items-center gap-1", className)} role="img" aria-label="Voice waveform">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="w-1 rounded-full bg-violet" style={{ height: h[i % h.length] }} />
      ))}
    </div>
  );
}

/* 01 Voice: an answered call */
export function VoiceVisual() {
  return (
    <div data-visual data-parallax="10" className={cn(card, "w-full max-w-sm p-4")}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-violet" /> Call answered
        </span>
        <ExampleTag />
      </div>
      <Waveform className="mt-4" />
      <div className="mt-4 space-y-2 text-sm">
        <p data-pop className="rounded-lg bg-mist px-3 py-2">Hi, I&apos;d like to book a cleaning this week.</p>
        <p data-pop className="rounded-lg bg-ink px-3 py-2 text-paper">Of course. I have Thursday at 10:30 or Friday at 2.</p>
        <p data-pop className="rounded-lg bg-mist px-3 py-2">Thursday works.</p>
      </div>
      <p className="mt-4 flex items-center justify-between border-t hair pt-3 text-xs text-slate">
        <span>Answered in 1 ring</span>
        <span>00:42</span>
      </p>
    </div>
  );
}

/* 02 Follow-up: a fast reply thread */
export function FollowUpVisual() {
  return (
    <div data-visual data-parallax="10" className={cn(card, "w-full max-w-sm p-4")}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">New enquiry</span>
        <ExampleTag />
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <p data-pop className="w-4/5 rounded-lg bg-mist px-3 py-2">Do you have any appointments left today?</p>
        <p data-pop className="ml-auto w-4/5 rounded-lg bg-ink px-3 py-2 text-paper">Yes, 4:15 pm is open. Want me to hold it for you?</p>
        <p data-pop className="w-1/2 rounded-lg bg-mist px-3 py-2">Yes please.</p>
      </div>
      <div className="mt-4 flex items-center justify-between border-t hair pt-3 text-xs">
        <span data-pop className="rounded-md bg-lime px-2 py-1 font-medium text-ink">Replied in 8 seconds</span>
        <span className="text-slate">SMS</span>
      </div>
    </div>
  );
}

/* 03 Booking: a week grid with one slot filled */
export function BookingVisual() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const rows = [
    [1, 0, 1, 0, 0],
    [0, 1, 0, 2, 1],
    [1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0],
  ];
  return (
    <div data-visual data-parallax="10" className={cn(card, "w-full max-w-sm p-4")}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">This week</span>
        <ExampleTag />
      </div>
      <div className="mt-4 grid grid-cols-5 gap-1.5 text-center text-xs text-slate">
        {days.map((d) => (
          <span key={d}>{d}</span>
        ))}
        {rows.flat().map((v, i) => (
          <span
            key={i}
            data-fill={v === 2 ? "" : undefined} className={cn("h-9 rounded-md border hair", v === 1 && "border-transparent bg-mist", v === 2 && "border-transparent bg-lime")}
            role="img" aria-label={v === 2 ? "Booked slot" : v === 1 ? "Busy" : "Free"}
          />
        ))}
      </div>
      <p data-pop className="mt-4 flex items-center gap-2 border-t hair pt-3 text-xs">
        <span className="h-2.5 w-2.5 rounded-sm bg-lime" /> Booked by Aria, Thursday 10:30
      </p>
    </div>
  );
}

/* 04 Reactivation: lapsed customers brought back */
export function ReactivationVisual() {
  const rows: [string, string, boolean][] = [
    ["Last visit 8 months ago", "Returned", true],
    ["Last visit 11 months ago", "Replied", false],
    ["Last visit 14 months ago", "Returned", true],
    ["Last visit 9 months ago", "Contacted", false],
  ];
  return (
    <div data-visual data-parallax="10" className={cn(card, "w-full max-w-sm p-4")}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Lapsed customers</span>
        <ExampleTag />
      </div>
      <ul className="mt-4 divide-y divide-[rgb(11_21_18/0.12)] text-sm">
        {rows.map(([a, b, done], i) => (
          <li data-pop key={i} className="flex items-center justify-between py-2.5">
            <span className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-mist" />
              {a}
            </span>
            <span className={cn("rounded-md px-2 py-0.5 text-xs", done ? "bg-lime font-medium text-ink" : "bg-mist text-slate")}>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 05 Reporting: stat tiles and a bar chart */
export function ReportVisual() {
  const bars = [38, 52, 46, 64, 58, 78, 70];
  return (
    <div data-visual data-parallax="10" className={cn(card, "w-full max-w-sm p-4")}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Weekly summary</span>
        <ExampleTag />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate">
        {(
          [
            ["Calls answered", "128"],
            ["Slots booked", "41"],
            ["Missed", "3"],
          ] as const
        ).map(([l, v]) => (
          <div key={l} className="rounded-lg bg-mist p-2.5">
            {l}
            <p data-count={v} className="mt-1 text-lg font-semibold text-ink">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-24 items-end gap-2" role="img" aria-label="Bar chart, example">
        {bars.map((h, i) => (
          <span data-bar key={i} className={cn("flex-1 rounded-t-md", i === bars.length - 1 ? "bg-lime" : "bg-ink")} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export const serviceVisuals = [VoiceVisual, FollowUpVisual, BookingVisual, ReactivationVisual, ReportVisual];

/** Flat panel colours behind each visual, cycling lime, lilac, moss, steel, lime. */
export const panelColours = ["bg-lime", "bg-lilac", "bg-moss", "bg-steel", "bg-lime"];
