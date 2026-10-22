import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AriaDemo } from "@/components/demos/AriaDemo";
import { Calculator } from "@/components/demos/Calculator";
import { Convene } from "@/components/demos/Convene";
import { Wizard } from "@/components/demos/Wizard";

export const metadata: Metadata = {
  title: "Demos: talk to a live voice agent",
  description: "Talk to Aria, try the missed-call calculator, play Convene and build your own agent in four questions.",
  alternates: { canonical: "/demos" },
};

function Block({ id, tag, title, lead, children }: { id: string; tag: string; title: string; lead: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-b hair px-4 py-12 md:px-10">
      <div data-reveal>
        <Eyebrow>{tag}</Eyebrow>
        <h2 className="head mt-4">{title}</h2>
        <p className="mt-2 max-w-2xl text-slate">{lead}</p>
      </div>
      <div data-reveal className="mt-8">
        {children}
      </div>
    </section>
  );
}

export default function DemosPage() {
  return (
    <>
      <PageHeader eyebrow="Demos" title="Try it, don't take our word." lead="Talk to it, count it, play it. Each demo says plainly what it is." />
      <div className="frame border-t hair">
        <Block id="aria" tag="Talk to Aria" title="A voice agent for a sample clinic" lead="Type or use the mic. It answers, says how fast, and hands over to a person when asked. Nothing is booked for real.">
          <AriaDemo />
        </Block>

        <Block id="calculator" tag="Calculator" title="What does a missed call cost you?" lead="Your numbers in, the working shown line by line.">
          <Calculator />
        </Block>

        <Block id="convene" tag="Convene" title="The 60-second game" lead="Send each call to the right crew member before it goes cold. Top scorers get an interview.">
          <Convene />
        </Block>

        <Block id="wizard" tag="Wizard" title="Build your own agent in four questions" lead="It ends with a suggested first agent and a link to book.">
          <Wizard />
        </Block>

        <section id="line" className="scroll-mt-28 px-4 py-12 md:px-10">
          <Eyebrow>Demo line</Eyebrow>
          <h2 className="head mt-4">Call our demo line</h2>
          <p className="mt-2 max-w-2xl text-slate">A real phone number you can ring from your own phone and hear the agent answer. The number is added when the line is live.</p>
          <p className="label mt-4 text-slate">Number to be added</p>
        </section>
      </div>
      <PageCta title="Prefer to talk to a person?" body="Book a call and we will walk through it live." />
    </>
  );
}
