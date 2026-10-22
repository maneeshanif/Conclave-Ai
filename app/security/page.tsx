import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { security } from "@/lib/content";

export const metadata: Metadata = {
  title: "Security and data handling",
  description: "How Conclave AI handles data, call recording, consent, subprocessors and model training.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <>
      <PageHeader path="/security" eyebrow="Security" title="Calm answers to the risky questions." lead="The principles we build to. The specifics for your project are agreed in writing before we start." />
      <div className="frame border-t hair">
        <dl data-stagger className="grid gap-px bg-[rgb(11_21_18/0.12)] md:grid-cols-2">
          {security.map(([t, b]) => (
            <div key={t} className="bg-paper p-8">
              <dt className="text-lg font-semibold tracking-tight">{t}</dt>
              <dd className="mt-2 max-w-md text-slate">{b}</dd>
            </div>
          ))}
        </dl>
        <p className="border-t hair px-4 py-6 text-sm text-slate md:px-10">
          This page is a plain-language summary, not a certification. We do not claim certifications we do not hold. Questions about a specific requirement: write to us before you buy.
        </p>
      </div>
      <PageCta title="Need it in writing?" body="Ask for the data handling terms for your project before the first call is booked." />
    </>
  );
}
