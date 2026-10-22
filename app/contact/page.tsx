import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Book a call or send a message." };

export default function ContactPage() {
  return (
    <div className="frame px-4 md:px-10 grid gap-12 pb-24 pt-40 lg:grid-cols-2">
      <div>
        <p className="label text-slate">Contact</p>
        <h1 className="display mt-4 text-display-xl">Let&apos;s talk</h1>
        <dl className="mt-12 space-y-6">
          <div>
            <dt className="label text-slate">Email</dt>
            <dd>
              <a href={`mailto:${site.email}`} className="text-title hover:text-plum">
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="label text-slate">WhatsApp</dt>
            <dd className="text-title">Number to be added</dd>
          </div>
          <div>
            <dt className="label text-slate">Time zone and reply time</dt>
            <dd className="text-title">To be added</dd>
          </div>
        </dl>
      </div>
      <div className="rounded-3xl border hair bg-paper p-8">
        <p className="label text-plum">Form and Cal.com booking</p>
        <p className="mt-4 text-slate">The contact form and booking embed are built end to end in the implementation step.</p>
      </div>
    </div>
  );
}
