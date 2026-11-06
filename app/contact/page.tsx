import type { Metadata } from "next";
import { CalEmbed } from "@/components/CalEmbed";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact: book a call",
  description: "Book a call with Conclave AI. Pick a time that suits you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="frame grid gap-12 px-4 pb-24 pt-40 md:px-10 lg:grid-cols-2">
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
            <dt className="label text-slate">Where</dt>
            <dd className="text-title">
              {site.city}, serving {site.serving}
            </dd>
          </div>
          {site.whatsapp && (
            <div>
              <dt className="label text-slate">WhatsApp</dt>
              <dd>
                <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`} className="text-title hover:text-plum" rel="noopener">
                  {site.whatsapp}
                </a>
              </dd>
            </div>
          )}
          {site.replyTime && (
            <div>
              <dt className="label text-slate">Reply time</dt>
              <dd className="text-title">{site.replyTime}</dd>
            </div>
          )}
        </dl>
        <p className="mt-6 text-sm text-slate">Not sure where to start? Try the &ldquo;Which agent do I need?&rdquo; picker on the services page.</p>
      </div>
      <CalEmbed className="rounded-3xl border hair bg-paper p-4 md:p-6" />
    </div>
  );
}
