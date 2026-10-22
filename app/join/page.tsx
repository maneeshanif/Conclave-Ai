import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join the Conclave AI Guild",
  description: "Careers, open-source agent templates, bounties and a partner programme for engineers who ship.",
  alternates: { canonical: "/join" },
};

const blocks = [
  { id: "careers", title: "Careers", body: "No open roles are listed yet. When we hire, they appear here with the stack, the pay model and how we work. Until then, send a short note and a link to your best work.", action: ["Write to us", `mailto:${site.email}?subject=Careers`] },
  { id: "partners", title: "Partner programme", body: "Vetted freelancers and engineers take pilot work with us on revenue share. You build one job well; we handle scoping, the client and the infrastructure underneath.", action: ["Ask about partnering", `mailto:${site.email}?subject=Partner`] },
  { id: "open-source", title: "Open-source templates", body: "A voice agent starter, a retrieval starter and a booking agent starter, published on GitHub so you can judge the code before you ever talk to us. Repositories are linked here when they are public." },
  { id: "bounties", title: "Bounties", body: "Small, paid tasks with clear acceptance tests, posted on the receipts page next to the build logs." },
] as const;

export default function JoinPage() {
  return (
    <>
      <PageHeader path="/join" eyebrow="Join" title="The Conclave AI Guild." lead="Engineers who like small agents, boring infrastructure and shipping on a Friday." />
      <div className="frame border-t hair">
        {blocks.map((b) => (
          <section data-reveal key={b.id} id={b.id} className="grid scroll-mt-28 gap-6 border-b hair px-4 py-10 md:grid-cols-[1fr_2fr] md:px-10">
            <h2 className="head">{b.title}</h2>
            <div>
              <p className="max-w-xl text-slate">{b.body}</p>
              {"action" in b ? (
                <Button href={b.action[1]} variant="ghost" className="mt-5">
                  {b.action[0]}
                </Button>
              ) : null}
            </div>
          </section>
        ))}
      </div>
      <PageCta title="Prefer to hire us?" body="If you are here as a client rather than a candidate, start with a call." />
    </>
  );
}
