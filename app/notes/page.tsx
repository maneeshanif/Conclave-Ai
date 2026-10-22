import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { notesPlanned } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notes: playbooks and engineering posts",
  description: "Short, practical posts on missed-call math, voice agent costs, privacy basics and engineering trade-offs.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  return (
    <>
      <PageHeader eyebrow="Notes" title="Short posts with a real number or a diagram." lead="Playbooks for owners and honest engineering notes. Each one links to the service it supports." />
      <div className="frame border-t hair">
        <ul data-stagger className="divide-y divide-[rgb(11_21_18/0.12)]">
          {notesPlanned.map(([slug, title, topic]) => (
            <li key={slug} className="grid gap-2 px-4 py-6 md:grid-cols-[10rem_1fr_auto] md:items-center md:px-10">
              <span className="pill-label w-fit">{topic}</span>
              <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
              <span className="label text-slate">Planned</span>
            </li>
          ))}
        </ul>
        <p className="border-t hair px-4 py-6 text-sm text-slate md:px-10">Posts publish only when they carry a real figure or diagram, so this list grows slowly on purpose.</p>
      </div>
      <PageCta />
    </>
  );
}
