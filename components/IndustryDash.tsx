import { industryDash } from "@/lib/content";

const bars = [38, 52, 46, 64, 58, 78, 70];

/** Example dashboard for an industry page. Every figure is sample data and the card is labelled as such. */
export function IndustryDash({ slug }: { slug: string }) {
  const d = industryDash[slug];
  if (!d) return null;
  return (
    <div data-visual className="w-full max-w-md rounded-2xl border hair bg-paper p-4 shadow-[0_1px_0_rgb(11_21_18/0.06)]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{d.title}</span>
        <span className="label text-slate">Example</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate">
        {d.tiles.map(([l, v]) => (
          <div key={l} className="rounded-lg bg-mist p-2.5">
            {l}
            <p data-count={v} className="mt-1 text-lg font-semibold text-ink">
              {v}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-20 items-end gap-2" role="img" aria-label="Bar chart, example">
        {bars.map((h, i) => (
          <span data-bar key={i} className={i === bars.length - 1 ? "flex-1 rounded-t-md bg-lime" : "flex-1 rounded-t-md bg-ink"} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}
