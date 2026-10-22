import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Demos: talk to a live voice agent",
  description: "Hear a live voice agent, try the missed-call calculator, ring the demo line and play Convene.",
  alternates: { canonical: "/demos" },
};

/** Status is honest: only the example conversations on the home page exist today. */
const demos = [
  { id: "aria", tag: "Talk to Aria", title: "Live voice agent.", body: "Speak to the agent from your browser, with a language switch (English, Arabic, Urdu), a latency readout and a transcript that fills as you talk. A text-chat fallback sits beside it.", status: "Being built", tone: "bg-lime" },
  { id: "line", tag: "Demo line", title: "Call our demo line.", body: "A real phone number you can ring from your own phone and hear the agent answer.", status: "Number to be added", tone: "bg-paper" },
  { id: "calculator", tag: "Calculator", title: "Missed-call calculator.", body: "Put in how many calls you miss and what a visit is worth. See the cost of the gap, with the working shown.", status: "Being built", tone: "bg-paper" },
  { id: "convene", tag: "Convene", title: "60-second game.", body: "Drag agents onto incoming calls before they go cold. The leaderboard feeds the careers page: top scorers get an interview.", status: "Being built", tone: "bg-moss text-paper" },
  { id: "wizard", tag: "Wizard", title: "Build your own agent.", body: "Four questions about your business. It ends with a suggested agent and a booking link.", status: "Being built", tone: "bg-paper" },
];

export default function DemosPage() {
  return (
    <>
      <PageHeader eyebrow="Demos" title="Try it, don't take our word." lead="Hear it, count it, play it. Each demo says plainly whether it is live yet." />
      <div data-stagger className="frame grid gap-4 border-t hair px-4 py-8 md:grid-cols-2 md:px-10">
        {demos.map((d) => (
          <section key={d.id} id={d.id} className={`scroll-mt-28 rounded-3xl border hair p-6 md:p-8 ${d.tone}`}>
            <div className="flex items-center justify-between gap-3">
              <Eyebrow>{d.tag}</Eyebrow>
              <span className="label opacity-70">{d.status}</span>
            </div>
            <h2 className="display mt-6 text-[clamp(1.125rem,5.4vw,2.5rem)]">{d.title}</h2>
            <p className="mt-4 max-w-md opacity-90">{d.body}</p>
          </section>
        ))}
      </div>
      <PageCta title="Prefer to talk to a person?" body="Book a call and we will walk through it live." />
    </>
  );
}
