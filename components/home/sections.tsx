import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { services } from "@/lib/site";
import { Character, CastRow } from "@/components/Cast";
import { industries, processSteps, trust } from "@/lib/content";
import type { Project } from "@/lib/projects";
import { Accordion } from "@/components/ui/Accordion";
import { AriaWindow } from "./AriaWindow";
import { panelColours, serviceVisuals } from "./visuals";
import { HeroStage } from "./HeroStage";
import { cn } from "@/lib/utils";

/** Section header used across the page: pill label, then a sentence-case headline (lemlist pattern). */
export function Head({ eyebrow, children, className }: { eyebrow: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("border-b hair px-4 py-14 text-center md:px-10", className)}>
      <div data-reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2 data-reveal className="head mx-auto mt-5 max-w-3xl">
        {children}
      </h2>
    </div>
  );
}

/* 1. Hero: full-bleed lime panel, headline bottom left, support and actions bottom right. */
export function Hero() {
  const pill = [10, 22, 14, 26, 12];
  return (
    <section data-hero className="relative flex min-h-[92svh] flex-col justify-end bg-lime pb-24 pt-28 text-ink md:pb-28">
      <div
        data-hero-scene
        className="pointer-events-none absolute inset-x-4 top-24 h-56 md:inset-x-auto md:right-12 md:top-28 md:h-[38%] md:w-[36%] md:max-w-[480px]"
      >
        <HeroStage />
      </div>
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-10">
        <h1 className="display text-display-xl">
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              Agents
              <span
                data-hero-pill
                data-wave
                aria-hidden="true"
                className="mx-[0.12em] inline-flex h-[0.62em] w-[1.5em] items-center justify-center gap-[0.07em] rounded-full bg-ink align-[0.05em]"
              >
                {pill.map((h, i) => (
                  <span key={i} className="w-[0.06em] rounded-full bg-violet" style={{ height: `${h * 2.2}%` }} />
                ))}
              </span>
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              convened.
            </span>
          </span>
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-end">
          <div data-hero-fade>
            <p className="max-w-md text-lead">
              Voice agents, AI automation and full-stack software for clinics, local businesses and startups.
            </p>
            <p className="label mt-4 text-ink">Live in 14 days. Fixed price. Hear it first.</p>
          </div>
          <div data-hero-fade className="flex flex-wrap gap-3 md:justify-end">
            <Button href="/contact" variant="dark" magnetic>
              Book a call
            </Button>
            <Button href="/demos" variant="ghost" magnetic>
              Hear a live agent
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2. Live agent window, overlapping the hero like lemlist's product demo. */
export function LiveAgent() {
  return (
    <section className="relative z-10 -mt-16 px-4 pb-20 md:px-10">
      <div data-reveal className="mx-auto max-w-[1240px]">
        <AriaWindow />
      </div>
    </section>
  );
}

/* 3. Proof: four plain commitments, then the stack as a slim strip. A stats band replaces this only when real numbers exist. */
const stack = ["OpenAI", "Vapi", "LiveKit", "Supabase", "Next.js", "FastAPI", "Cal.com", "Twilio"];

export function Proof() {
  return (
    <section>
      <div className="frame border-y hair">
        <div data-stagger className="grid grid-cols-2 md:grid-cols-4">
          {trust.map(([t, b], i) => (
            <div key={t} className={cn("border-b hair bg-paper p-6 md:border-b-0 md:p-8", i > 0 && "md:border-l", i % 2 === 1 && "border-l md:border-l")}>
              <p className="label text-plum">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{t}</h3>
              <p className="mt-2 text-sm text-slate">{b}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t hair bg-mist/60 px-4 py-4 md:px-10">
          <span className="pill-label">Built on</span>
          {stack.map((s) => (
            <span key={s} className="text-sm font-medium text-slate">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
/* 4. Services: five numbered cards on a light band, alternating sides, each with a product mock-up. */
export function Services() {
  return (
    <section>
      <div className="frame">
        <Head eyebrow="Services">
          From the first ring to the booked slot, one agent for each job
        </Head>
        <div className="bg-mist/70 px-3 py-4 md:px-6 md:py-6">
          {/* lemlist feature stack: on large screens every card sticks at the same offset and the next one slides over it. */}
          <ol data-stack className="space-y-4 md:space-y-6">
            {services.map((s, i) => {
              const Visual = serviceVisuals[i];
              const flip = i % 2 === 1;
              return (
                <li
                  key={s.slug}
                  id={s.slug}
                  className="grid scroll-mt-28 gap-6 rounded-3xl border hair bg-paper p-5 md:grid-cols-2 md:gap-10 md:p-8 lg:sticky lg:top-28"
                >
                  <div className={cn("flex flex-col justify-center md:px-4", flip && "md:order-2")}>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-xs font-semibold text-paper">{s.n}</span>
                    <h3 className="mt-6 text-[clamp(1.5rem,2.6vw,2.125rem)] font-semibold leading-tight tracking-tight">{s.title}</h3>
                    <p className="mt-4 max-w-md text-slate">{s.body}</p>
                    <Link href={`/services/${s.slug}`} className="u-link mt-6 w-fit text-sm font-medium hover:text-plum">
                      How it works
                    </Link>
                  </div>
                  <div className={cn("grid min-h-80 place-items-center overflow-hidden rounded-2xl p-5", panelColours[i], flip && "md:order-1")}>
                    <Visual />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* 5. Built for: the cast, one character per trade, each with the pain it fixes. */
export function BuiltFor() {
  return (
    <section>
      <div className="frame border-t hair">
        <Head eyebrow="Built for">Made for teams who live on the phone</Head>
        <div data-stagger className="grid gap-px bg-[rgb(11_21_18/0.12)] sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((p, i) => (
            <Link
              key={p.slug}
              href={`/industries/${p.slug}`}
              className="group relative flex flex-col bg-mist p-6 transition-colors duration-150 hover:bg-chalk md:p-8">
              <div className="lift-on-hover">
                <Character id={p.figure} className="h-36 w-36 md:h-40 md:w-40" />
              </div>
              <span className="pill-label mt-6 w-fit">{p.name}</span>
              <p className="mt-3 max-w-xs text-slate">{p.pain}</p>
              <span className="u-link mt-4 w-fit text-sm font-medium group-hover:text-plum">See how it works for {p.name.toLowerCase()}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
/* 6. Work: three project cards, outcome first. Becomes a pinned horizontal reel in the implementation step. */
export function WorkReel({ projects }: { projects: Project[] }) {
  return (
    <section>
      <div className="frame border-t hair">
        <Head eyebrow="Work">Selected builds, outcome first</Head>
        <div data-stagger className="grid gap-4 px-4 py-6 md:grid-cols-3 md:px-6 md:py-8">
          {projects.slice(0, 3).map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border hair bg-paper transition-colors duration-150 hover:bg-chalk"
            >
              <div className={cn("grid aspect-[4/5] place-items-center overflow-hidden", ["bg-lime", "bg-lilac", "bg-moss"][i % 3])}>
                <span className={`zoom-on-hover display text-display-xl ${i % 3 === 2 ? "text-lime" : "text-ink"}`}>{p.title.slice(0, 1)}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="label text-plum">{p.tags.join(" / ")}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-1 text-slate">{p.summary}</p>
                <span className="mt-5 inline-flex h-9 w-fit items-center rounded-lg border hair bg-paper px-3 text-sm font-medium group-hover:bg-mist">
                  Learn more
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center border-t hair py-6">
          <Button href="/work" variant="ghost">
            See all work
          </Button>
        </div>
      </div>
    </section>
  );
}

/* 7. Manifesto: the Willows-style statement. Words brighten on scroll in the implementation step. */
export function Manifesto() {
  return (
    <section>
      <div className="frame border-t hair px-4 py-24 md:px-10 md:py-32">
        <Eyebrow>Manifesto</Eyebrow>
        <p id="manifesto" data-words className="mt-8 max-w-5xl text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.12] tracking-tight">
          A conclave is a closed room where a small group reaches one decision. We convene small, specific agents the same way:
          each with one job, working together so your business never misses a call.
        </p>
        <div className="mt-14 border-t hair pt-10">
          <p className="label text-slate">The council</p>
          <CastRow className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-7" />
        </div>
      </div>
    </section>
  );
}

/* 8. Process: Audit, Build, Run, each with a duration and a deliverable. */
export function Process() {
  return (
    <section>
      <div className="frame border-t hair">
        <Head eyebrow="Process">Three steps, no surprises</Head>
        <ol data-stagger className="grid md:grid-cols-3">
          {processSteps.map(([n, t, when, b, out], i) => (
            <li key={n} className={cn("flex flex-col bg-paper p-8 md:p-10", i > 0 && "border-t hair md:border-l md:border-t-0")}>
              <span className="flex items-center justify-between">
                <span className="label text-plum">{n}</span>
                <span className="pill-label">{when}</span>
              </span>
              <h3 className="display mt-10 text-display-m">{t}</h3>
              <p className="mt-4 max-w-xs text-slate">{b}</p>
              <p className="mt-6 border-t hair pt-4 text-sm">
                <span className="label mr-2 text-slate">You get</span>
                {out}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
/* 9. Demos teaser. */
export function DemosTeaser() {
  return (
    <section>
      <div className="frame border-t hair">
        <Head eyebrow="Demos">Try it before you talk to us</Head>
        <div data-stagger className="grid gap-4 px-4 py-6 md:grid-cols-2 md:px-6 md:py-8">
          <Link href="/demos#aria" className="group flex min-h-80 flex-col justify-between rounded-3xl bg-lime p-8 transition-colors hover:bg-ink hover:text-paper">
            <span className="pill-label w-fit">Live</span>
            <span>
              <span className="display block text-[clamp(1.5rem,3vw,2.75rem)]">Talk to Aria</span>
              <span className="mt-3 block max-w-sm">A live voice agent. Ask it to book you in.</span>
            </span>
          </Link>
          <Link href="/demos#convene" className="group flex min-h-80 flex-col justify-between rounded-3xl bg-moss p-8 text-paper transition-colors hover:bg-ink">
            <span className="pill-label w-fit">Game</span>
            <span>
              <span className="display block text-[clamp(1.5rem,3vw,2.75rem)]">Convene</span>
              <span className="mt-3 block max-w-sm text-chalk">A 60-second game. Answer every call before it goes cold.</span>
            </span>
          </Link>
          <Link href="/demos#calculator" className="group flex min-h-48 flex-col justify-between rounded-3xl border hair bg-paper p-8 transition-colors hover:bg-chalk">
            <span className="pill-label w-fit">Soon</span>
            <span>
              <span className="display block text-[clamp(1.25rem,2.4vw,2rem)]">Missed-call calculator</span>
              <span className="mt-3 block max-w-sm text-slate">Put in your calls and your average visit. See what the missed ones cost.</span>
            </span>
          </Link>
          <Link href="/demos#line" className="group flex min-h-48 flex-col justify-between rounded-3xl border hair bg-paper p-8 transition-colors hover:bg-chalk">
            <span className="pill-label w-fit">Soon</span>
            <span>
              <span className="display block text-[clamp(1.25rem,2.4vw,2rem)]">Call our demo line</span>
              <span className="mt-3 block max-w-sm text-slate">A real phone number you can ring and talk to the agent.</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* 10. Pricing: no invented prices; scope is agreed on a call. */
export const tiers = [
  { name: "Pilot", for: "Prove it on one line", points: ["One agent, one job", "A 14-day pilot, scoped up front", "Weekly summary"] },
  { name: "Build", for: "Fixed scope, fixed fee", points: ["Agent plus integrations", "Your calendar and CRM", "Handover and training"] },
  { name: "Retainer", for: "We run it for you", points: ["Monitoring and tuning", "New flows each month", "Priority support"] },
];

export function PricingTeaser() {
  return (
    <section>
      <div className="frame border-t hair">
        <Head eyebrow="Pricing">Start small, scale when it works</Head>
        <div data-stagger className="grid gap-4 px-4 py-6 md:grid-cols-3 md:px-6 md:py-8">
          {tiers.map((t, i) => {
            const dark = i === 1;
            return (
              <div key={t.name} className={cn("rounded-3xl border p-8", dark ? "border-ink bg-ink text-paper" : "hair bg-paper")}>
                <h3 className="display text-[clamp(1.5rem,2.6vw,2.5rem)]">{t.name}</h3>
                <p className={cn("mt-2", dark ? "text-lilac" : "text-plum")}>{t.for}</p>
                <ul className={cn("mt-6 space-y-2", dark ? "text-chalk" : "text-slate")}>
                  {t.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="label mt-8">Scoped on a call</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 11. FAQ: two columns, hairline rows. Native details for a baseline accessible accordion. */
export const faqs = [
  ["Will callers know it is an AI?", "We never hide it. Aria introduces itself plainly, and any caller can ask for a human at any time."],
  ["What happens when the agent cannot help?", "It takes a message, flags it as urgent if needed, and passes the call to a person on your team."],
  ["Does it work with our calendar and booking tool?", "We connect to the tool you already use. If an integration does not exist, we build it as part of the project."],
  ["How is patient or customer data handled?", "Only what the agent needs is stored, in an access-controlled database. The specifics are agreed in writing before we start."],
  ["How long until it is live?", "A pilot is planned for 14 days. The exact timeline is written into the scope before we start."],
  ["Which languages does it speak?", "English, Arabic and Urdu. Other languages are scoped on request."],
  ["Do you handle health data, and what about HIPAA?", "We design for privacy and agree data handling in writing before we start. We do not claim a certification we do not hold; any compliance requirement is scoped first."],
  ["Do I own the code?", "Yes. No lock-in: handover and training are part of every build."],
  ["What if the agent is wrong?", "It hands over to a person when unsure, every conversation is logged, and we review the log with you each week."],
  ["How is this different from a freelancer or an n8n flow?", "A flow works until it fails at 6pm on a Friday. We ship monitoring, retries and handover, and we use n8n where it fits and code you own where it does not."],
];

export function Faq() {
  return (
    <section>
      <div className="frame grid border-t hair md:grid-cols-2">
        <div className="px-4 py-14 md:px-10">
          <div data-reveal>
            <Eyebrow>FAQ</Eyebrow>
          </div>
          <h2 data-reveal className="head mt-5">
            Frequently asked questions
          </h2>
        </div>
        <div data-reveal className="border-t hair bg-paper md:border-l md:border-t-0">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}

/* 12. Closing block: the one dark section, like lemlist's. Flows into the footer. */
export function FinalCta() {
  return (
    <section className="on-ink bg-ink text-paper">
      <div className="mx-auto flex min-h-[70svh] max-w-[1280px] flex-col justify-center px-4 py-24 md:px-10">
        <h2 data-reveal className="display text-[clamp(1.75rem,6vw,5.5rem)] leading-[0.95]">
          Hear it.
          <br />
          <span className="text-lime">Then book it.</span>
        </h2>
        <p data-reveal className="mt-6 max-w-md text-lead text-steel">A short call. We listen first and tell you honestly if an agent will help.</p>
        <div data-reveal className="mt-10 flex flex-wrap gap-3">
          <Button href="/contact" magnetic>
            Book a call
          </Button>
          <Button href="/demos" variant="light" magnetic>
            Hear a live agent
          </Button>
        </div>
      </div>
    </section>
  );
}
