import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accordion } from "@/components/ui/Accordion";
import { StudGlyph } from "@/components/studs/StudGlyph";
import { ProjectCover } from "@/components/work/ProjectCover";
import { QuickBook } from "@/components/QuickBook";
import { industries, processSteps, studio, trust } from "@/lib/content";
import { services } from "@/lib/site";
import { AGENTS, type AgentId } from "@/lib/studs/patterns";
import type { Project } from "@/lib/projects";
import { AriaWindow } from "./AriaWindow";
import { HeroStuds } from "./HeroStuds";
import { panelColours, serviceVisuals } from "./visuals";
import { cn } from "@/lib/utils";

/** Section header used across the page: pill label, then a sentence-case headline (lemlist pattern). */
export function Head({ eyebrow, children, className }: { eyebrow: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("border-b hair px-4 py-12 text-center md:px-10", className)}>
      <div data-reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2 data-reveal className="head mx-auto mt-5 max-w-3xl">
        {children}
      </h2>
    </div>
  );
}

/* 01 Hero: lime, headline bottom left, support and actions bottom right. The scene is the stud C that assembles on load and splits into the crew on scroll. */
export function Hero() {
  const pill = [10, 22, 14, 26, 12];
  return (
    // ScrollTrigger wraps the pinned hero in a spacer element. Wrapping it in a React-owned div keeps that spacer inside a node React can remove cleanly.
    <div>
    <section data-hero className="relative flex min-h-[92svh] flex-col justify-end bg-lime pb-24 pt-28 text-ink md:pb-28">
      {/* The stud scene is a full-hero overlay in the hero's own pixels. The headline and actions sit above it. */}
      <div data-hero-scene className="pointer-events-none absolute inset-0 overflow-hidden">
        <HeroStuds />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 md:px-10">
        <div className="relative">
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
        {/* Invisible anchor for the crew row: directly under the headline, right aligned, clear of the supporting text on the left. */}
        <div data-crew-slot aria-hidden="true" className="pointer-events-none absolute right-0 top-full mt-4 hidden h-[76px] w-[min(576px,calc(100%-31rem))] lg:block" />
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-end lg:mt-[4.5rem]">
          <div data-hero-fade>
            <p className="max-w-md text-lead">Voice agents, AI automation and full-stack software for clinics, local businesses and startups.</p>
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
    </div>
  );
}

/* 02 Live agent: the demo window overlapping the hero, like lemlist's product demo. */
export function LiveAgent() {
  return (
    <section className="relative z-10 -mt-16 px-4 pb-14 md:px-10">
      <div data-reveal className="mx-auto max-w-[1240px]">
        <AriaWindow />
      </div>
    </section>
  );
}

/* 03 Proof strip: three plain facts. A stats row replaces this only when real numbers exist. */
export function Proof() {
  return (
    <section>
      <div className="frame border-y hair">
        <div data-stagger className="grid divide-y divide-[rgb(11_21_18/0.12)] bg-paper sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {trust.map(([t, b], i) => (
            <div key={t} className="flex items-start gap-4 p-6 md:p-8">
              <span className="label mt-1 text-plum">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{t}</h3>
                <p className="mt-1 text-sm text-slate">{b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 04 Services: five sticky cards, each cut to a headline, one line and a mock-up. */
const serviceGlyphs: AgentId[] = ["aria", "echo", "slot", "boomerang", "tally"];

export function Services() {
  return (
    <section>
      <div className="frame">
        <Head eyebrow="Services">From the first ring to the booked slot, one agent for each job</Head>
        <div className="bg-mist/70 px-3 py-3 md:px-6 md:py-5">
          {/* lemlist feature stack: on large screens every card sticks at the same offset and the next one slides over it. */}
          <ol data-stack className="space-y-3 md:space-y-4">
            {services.map((s, i) => {
              const Visual = serviceVisuals[i];
              const flip = i % 2 === 1;
              return (
                <li key={s.slug} id={s.slug} className="relative grid scroll-mt-28 gap-4 rounded-3xl border hair bg-paper p-4 md:grid-cols-2 md:gap-8 md:p-5 lg:sticky lg:top-28">
                  <div className={cn("flex flex-col justify-center md:px-3", flip && "md:order-2")}>
                    <span className="flex items-center gap-3">
                      <StudGlyph agent={serviceGlyphs[i]} size={44} decorative className="shrink-0" />
                      <span className="label text-plum">{s.n}</span>
                    </span>
                    <h3 className="mt-3 text-[clamp(1.375rem,2.2vw,1.875rem)] font-semibold leading-tight tracking-tight">{s.title}</h3>
                    <p className="mt-2 max-w-md text-slate">{s.body}</p>
                    <Link href={`/services/${s.slug}`} className="u-link mt-4 w-fit text-sm font-medium hover:text-plum">
                      How it works
                    </Link>
                  </div>
                  <div className={cn("grid h-48 place-items-center overflow-hidden rounded-2xl", panelColours[i], flip && "md:order-1")}>
                    <div className="w-full origin-center scale-[0.74] px-4">
                      <Visual />
                    </div>
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

/* 05 Systems: the studio in five columns (replaces the old Studio and CMS card). */
export function Systems() {
  return (
    <section>
      <div className="frame border-t hair">
        <Head eyebrow="Systems">Agents, automations and the systems behind them</Head>
        <div data-stagger className="grid gap-px bg-[rgb(11_21_18/0.12)] sm:grid-cols-2 lg:grid-cols-5">
          {studio.map((s, i) => (
            <Link key={s.slug} href={`/studio/${s.slug}`} className="group flex flex-col bg-paper p-5 transition-colors duration-150 hover:bg-chalk">
              <span className="label text-plum">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{s.name}</h3>
              <p className="mt-2 flex-1 text-sm text-slate">{s.job}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {s.stack.map((t) => (
                  <li key={t} className="rounded-md bg-mist px-2 py-0.5 text-xs text-slate">
                    {t}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
        <div className="flex justify-center border-t hair py-5">
          <Button href="/studio" variant="ghost">
            See the studio
          </Button>
        </div>
      </div>
    </section>
  );
}

/* 06 Built for: four tiles with their stud glyph. Dental and real estate stay as pages. */
const builtFor = ["clinics", "med-spas", "home-services", "startups"] as const;

export function BuiltFor() {
  const items = builtFor.map((slug) => industries.find((i) => i.slug === slug)!);
  return (
    <section>
      <div className="frame border-t hair">
        <Head eyebrow="Built for">Made for teams who live on the phone</Head>
        <div data-stagger className="grid gap-px bg-[rgb(11_21_18/0.12)] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <Link key={p.slug} href={`/industries/${p.slug}`} className="group flex flex-col bg-mist p-6 transition-colors duration-150 hover:bg-chalk">
              <div className="lift-on-hover w-fit">
                <StudGlyph agent={p.figure} size={104} label={`${AGENTS[p.figure].label}, ${AGENTS[p.figure].job.toLowerCase()}`} />
              </div>
              <span className="pill-label mt-5 w-fit">{p.name}</span>
              <p className="mt-3 text-sm text-slate">{p.pain}</p>
              <span className="u-link mt-3 w-fit text-sm font-medium group-hover:text-plum">See how it works</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 07 Work: the builds we can show openly. Cards use a screenshot when public/work/<slug>.png exists, else the project's stud glyph. */
export function WorkReel({ projects }: { projects: Project[] }) {
  return (
    <section>
      <div className="frame border-t hair">
        <Head eyebrow="Work">Things we have built</Head>
        <div data-stagger className="grid gap-4 px-4 py-6 sm:grid-cols-2 md:px-6 md:py-8 lg:grid-cols-4">
          {projects.slice(0, 4).map((p, i) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="group flex flex-col overflow-hidden rounded-3xl border hair bg-paper transition-colors duration-150 hover:bg-chalk">
              <ProjectCover project={p} index={i} className="aspect-[4/3]" />
              <div className="flex flex-1 flex-col p-5">
                <p className="label text-plum">{p.tags.join(" / ")}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-plum">{p.title}</h3>
                {p.summary && <p className="mt-1 text-sm text-slate">{p.summary}</p>}
                {p.results[0] && (
                  <p className="mt-3 w-fit rounded-lg bg-lime px-2.5 py-1 text-sm text-ink">
                    <b>{p.results[0].value}</b> {p.results[0].label}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center border-t hair py-5">
          <Button href="/work" variant="ghost">
            See all work
          </Button>
        </div>
      </div>
    </section>
  );
}
/* 08 Process: Audit, Build, Run, each with a duration and a deliverable. */
export function Process() {
  return (
    <section>
      <div className="frame border-t hair">
        <Head eyebrow="Process">Three steps, no surprises</Head>
        <ol data-stagger className="grid md:grid-cols-3">
          {processSteps.map(([n, t, when, b, out], i) => (
            <li key={n} className={cn("flex flex-col bg-paper p-7 md:p-8", i > 0 && "border-t hair md:border-l md:border-t-0")}>
              <span className="flex items-center justify-between">
                <span className="label text-plum">{n}</span>
                <span className="pill-label">{when}</span>
              </span>
              <h3 className="display mt-8 text-display-m">{t}</h3>
              <p className="mt-3 max-w-xs text-slate">{b}</p>
              <p className="mt-5 border-t hair pt-3 text-sm">
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

/* 09 Pricing: three plans. "From" prices are added when set; until then each says it is scoped on a call. */
export const tiers = [
  { name: "Pilot", for: "Prove it on one line", points: ["One agent, one job", "A 14-day pilot, scoped up front", "Weekly summary"], from: null as string | null },
  { name: "Build", for: "Fixed scope, fixed fee", points: ["Agent plus integrations", "Your calendar and CRM", "Handover and training"], from: null as string | null },
  { name: "Retainer", for: "We run it for you", points: ["Monitoring and tuning", "New flows each month", "Priority support"], from: null as string | null },
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
              <div key={t.name} className={cn("rounded-3xl border p-7", dark ? "border-ink bg-ink text-paper" : "hair bg-paper")}>
                <h3 className="display text-[clamp(1.5rem,2.6vw,2.25rem)]">{t.name}</h3>
                <p className={cn("mt-2", dark ? "text-lilac" : "text-plum")}>{t.for}</p>
                <ul className={cn("mt-5 space-y-1.5", dark ? "text-chalk" : "text-slate")}>
                  {t.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="label mt-6">{t.from ? `From ${t.from}` : "Scoped on a call"}</p>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center border-t hair py-5">
          <Button href="/pricing" variant="ghost">
            See the full table
          </Button>
        </div>
      </div>
    </section>
  );
}

/* 10 FAQ: two columns, hairline rows. */
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
  ["How is this different from a freelancer or a no-code flow?", "A flow works until it fails at 6pm on a Friday. We ship monitoring, retries and handover, and we use n8n where it fits and code you own where it does not."],
];

export function Faq() {
  return (
    <section>
      <div className="frame grid border-t hair md:grid-cols-2">
        <div className="px-4 py-12 md:px-10">
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

/* 11 Closing block: the one dark section, like lemlist's. Flows into the footer. */
export function FinalCta() {
  return (
    <section className="on-ink bg-ink text-paper">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-20 md:grid-cols-[1.2fr_1fr] md:items-center md:px-10 md:py-24">
        <div>
          <h2 data-reveal className="display text-[clamp(1.75rem,5.4vw,5rem)] leading-[0.95]">
            Hear it.
            <br />
            <span className="text-lime">Then book it.</span>
          </h2>
          <p data-reveal className="mt-6 max-w-md text-lead text-steel">
            A short call. We listen first and tell you honestly if an agent will help.
          </p>
          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            <Button href="/demos" variant="light" magnetic>
              Hear a live agent
            </Button>
          </div>
        </div>
        <div data-reveal>
          <QuickBook />
        </div>
      </div>
    </section>
  );
}
