import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/site";
import { panelColours, serviceVisuals } from "@/components/home/visuals";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description: "Voice agents, follow-up, booking, reactivation and reporting for clinics and local businesses.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Five jobs. One agent each."
        lead="We deliver fixed-scope services now. What we repeat becomes product later."
      />
      <div className="frame px-4 md:px-10 pb-24">
        {services.map((s, i) => {
          const Visual = serviceVisuals[i];
          return (
          <section data-reveal key={s.slug} id={s.slug} className="grid scroll-mt-28 gap-8 border-t hair py-12 md:grid-cols-2">
            <div>
              <Eyebrow n={s.n}>{s.slug}</Eyebrow>
              <h2 className="display mt-4 text-display-m">{s.title}</h2>
              <p className="mt-4 max-w-md text-slate">{s.body}</p>
            </div>
            <div className={cn("grid min-h-80 place-items-center rounded-3xl p-5", panelColours[i])}>
              <Visual />
            </div>
          </section>
          );
        })}
        <p className="border-t hair pt-12 text-slate">
          Need a custom AI agent or a full-stack web app? We build those too.
        </p>
        <Button href="/contact" className="mt-6">
          Book a call
        </Button>
      </div>
    </>
  );
}
