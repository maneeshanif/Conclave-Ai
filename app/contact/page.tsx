import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact: book a call or send a message",
  description: "Book a call with Conclave AI or send a message. We reply by email.",
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
          <div>
            <dt className="label text-slate">WhatsApp</dt>
            <dd className="text-title">Number to be added</dd>
          </div>
          <div>
            <dt className="label text-slate">Time zone and reply time</dt>
            <dd className="text-title">To be added</dd>
          </div>
        </dl>
        <div className="mt-10 rounded-2xl border hair bg-paper p-5">
          <p className="label text-plum">Book a time</p>
          {site.calLink ? (
            <a href={site.calLink} className="u-link mt-2 inline-block font-medium hover:text-plum" rel="noopener">
              Pick a slot on our calendar
            </a>
          ) : (
            <p className="mt-2 text-sm text-slate">The calendar link is added with the Cal.com account. Until then, send the form and we will reply with times.</p>
          )}
        </div>
        <p className="mt-6 text-sm text-slate">Not sure where to start? Try the &ldquo;Which agent do I need?&rdquo; picker on the services page.</p>
      </div>
      <ContactForm />
    </div>
  );
}
