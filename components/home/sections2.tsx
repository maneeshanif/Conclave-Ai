import { cn } from "@/lib/utils";
import { Head } from "./sections";

/**
 * Stack and scale: a drawn diagram of what sits under the friendly agents.
 * Moved off the home page (Change Spec v3); it lives on /studio and /studio/platforms.
 */
export function StackScale({ compact }: { compact?: boolean }) {
  const layers: { tone: string; label: string; items: string[]; note: string }[] = [
    { tone: "bg-lime text-ink", label: "Front", items: ["Next.js", "FastAPI", "Voice (Vapi, LiveKit)"], note: "What your customers touch" },
    { tone: "bg-lilac text-ink", label: "Between services", items: ["Dapr", "Kafka"], note: "So no call is dropped when volume jumps" },
    { tone: "bg-moss text-paper", label: "Underneath", items: ["Kubernetes", "Postgres", "Observability"], note: "So it keeps running, and we can see why when it does not" },
  ];
  const diagram = (
    <ol data-stagger className="space-y-3" aria-label="Architecture layers, top to bottom">
      {layers.map((l, i) => (
        <li key={l.label} className={cn("rounded-2xl border border-ink/80 p-5", l.tone)}>
          <p className="label opacity-80">
            {String(i + 1).padStart(2, "0")} / {l.label}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {l.items.map((t) => (
              <li key={t} className="rounded-lg border border-current/30 bg-paper/90 px-2.5 py-1 text-sm font-medium text-ink">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm opacity-90">{l.note}</p>
        </li>
      ))}
    </ol>
  );
  if (compact) return diagram;
  return (
    <section>
      <div className="frame border-t hair">
        <Head eyebrow="Stack and scale">Friendly on the surface. Serious underneath.</Head>
        <div className="grid gap-8 px-4 py-10 md:grid-cols-[1fr_1.1fr] md:items-center md:px-10 md:py-14">
          <p data-reveal className="max-w-md text-lead text-slate">
            An agent that answers one call is easy. One that keeps answering at ten times the volume needs an event backbone and boring infrastructure. We build that in from the start, and only list what we can demonstrate.
          </p>
          {diagram}
        </div>
      </div>
    </section>
  );
}
