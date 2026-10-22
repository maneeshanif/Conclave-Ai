import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { guild, studio } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Head } from "./sections";

/* Studio: the full-stack offer ladder, so a startup or an agency buyer sees it is more than voice agents. */
export function StudioSection() {
  return (
    <section>
      <div className="frame border-t hair">
        <Head eyebrow="Studio">Agent-first software, built like a platform</Head>
        <div data-stagger className="grid gap-px bg-[rgb(11_21_18/0.12)] sm:grid-cols-2 lg:grid-cols-5">
          {studio.map((s, i) => (
            <Link key={s.slug} href={`/studio#${s.slug}`} className="group flex flex-col bg-paper p-6 transition-colors duration-150 hover:bg-chalk">
              <span className="label text-plum">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.name}</h3>
              <p className="mt-2 flex-1 text-sm text-slate">{s.job}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {s.stack.slice(0, 3).map((t) => (
                  <li key={t} className="rounded-md bg-mist px-2 py-0.5 text-xs text-slate">
                    {t}
                  </li>
                ))}
              </ul>
              <span className="pill-label mt-5 w-fit">{s.timeline}</span>
            </Link>
          ))}
        </div>
        <div className="flex justify-center border-t hair py-6">
          <Button href="/studio" variant="ghost">
            See the studio
          </Button>
        </div>
      </div>
    </section>
  );
}

/* Receipts: the method, not made-up figures. Rows fill in from real demos and pilots. */
const ledger = [
  ["Time to answer a call", "Demo line logs", "Tracking from the first demo"],
  ["Bookings made by the agent", "Calendar entries", "Tracking from the first pilot"],
  ["Hours saved per week", "Call and message logs", "Tracking from the first pilot"],
  ["Build time per agent", "Our own build logs", "Published with each case"],
];

export function ReceiptsTeaser() {
  return (
    <section>
      <div className="frame border-t hair">
        <Head eyebrow="Receipts">Numbers in public, only when they are real</Head>
        <div data-reveal className="px-4 py-8 md:px-10">
          <div tabIndex={0} role="region" aria-label="Table, scrolls sideways" className="overflow-x-auto rounded-2xl border hair bg-paper">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <caption className="sr-only">What we will publish, where it comes from and its status</caption>
              <thead className="bg-mist/60">
                <tr className="label text-slate">
                  <th scope="col" className="px-5 py-3 font-medium">Metric</th>
                  <th scope="col" className="px-5 py-3 font-medium">Comes from</th>
                  <th scope="col" className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgb(11_21_18/0.12)]">
                {ledger.map(([m, src, status]) => (
                  <tr key={m}>
                    <th scope="row" className="px-5 py-3.5 font-medium">{m}</th>
                    <td className="px-5 py-3.5 text-slate">{src}</td>
                    <td className="px-5 py-3.5"><span className="rounded-md bg-mist px-2 py-0.5 text-xs text-slate">{status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-xl text-sm text-slate">
            Big firms hide behind logos. We publish the work: what we measured, how, and what we would change. No client is named until they agree.
          </p>
          <Link href="/receipts" className="u-link mt-3 inline-block w-fit text-sm font-medium hover:text-plum">
            Read the receipts page
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Stack and scale: a drawn diagram of what sits under the friendly agents. */
export function StackScale() {
  const layers: { tone: string; label: string; items: string[]; note: string }[] = [
    { tone: "bg-lime text-ink", label: "Front", items: ["Next.js", "FastAPI", "Voice (Vapi, LiveKit)"], note: "What your customers touch" },
    { tone: "bg-lilac text-ink", label: "Between services", items: ["Dapr", "Kafka"], note: "So no call is dropped when volume jumps" },
    { tone: "bg-moss text-paper", label: "Underneath", items: ["Kubernetes", "Postgres", "Observability"], note: "So it keeps running, and we can see why when it does not" },
  ];
  return (
    <section>
      <div className="frame border-t hair">
        <Head eyebrow="Stack and scale">Friendly on the surface. Serious underneath.</Head>
        <div className="grid gap-8 px-4 py-10 md:grid-cols-[1fr_1.1fr] md:items-center md:px-10 md:py-14">
          <p data-reveal className="max-w-md text-lead text-slate">
            An agent that answers one call is easy. One that keeps answering at ten times the volume needs an event backbone and boring infrastructure. We build that in from the start, and only list what we can demonstrate.
          </p>
          <ol data-stagger className="space-y-3" aria-label="Architecture layers, top to bottom">
            {layers.map((l, i) => (
              <li key={l.label} className={cn("rounded-2xl border border-ink/80 p-5", l.tone)}>
                <p className="label opacity-80">{String(i + 1).padStart(2, "0")} / {l.label}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {l.items.map((t) => (
                    <li key={t} className="rounded-lg border border-current/30 bg-paper/90 px-2.5 py-1 text-sm font-medium text-ink">{t}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm opacity-90">{l.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* Join the guild: what pulls developers in. */
export function JoinGuild() {
  return (
    <section>
      <div className="frame border-t hair">
        <Head eyebrow="Join the guild">Build with a small team that ships</Head>
        <div data-stagger className="grid gap-px bg-[rgb(11_21_18/0.12)] sm:grid-cols-2 lg:grid-cols-4">
          {guild.map(([t, b, href]) => (
            <Link key={t} href={href} className="group flex flex-col bg-paper p-6 transition-colors duration-150 hover:bg-chalk md:p-8">
              <h3 className="text-lg font-semibold tracking-tight">{t}</h3>
              <p className="mt-2 flex-1 text-sm text-slate">{b}</p>
              <span className="u-link mt-5 w-fit text-sm font-medium group-hover:text-plum">Learn more</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
