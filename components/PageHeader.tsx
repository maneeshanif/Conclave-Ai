import { Eyebrow } from "./ui/Eyebrow";
import { site } from "@/lib/site";

const names: Record<string, string> = {
  services: "Services", studio: "Studio", industries: "Industries", work: "Work", demos: "Demos", about: "About", pricing: "Pricing",
  contact: "Contact", compare: "Compare", security: "Security", crew: "The Crew", join: "Join", receipts: "Receipts", roadmap: "Roadmap", notes: "Notes",
};

/**
 * Page header. Pass `path` (for example "/studio/erp-crm") to emit BreadcrumbList structured data: Home, each parent, then this page's title.
 * Parents without a page of their own (such as /industries) are skipped.
 */
export function PageHeader({ eyebrow, title, lead, path }: { eyebrow: string; title: string; lead?: string; path?: string }) {
  const segs = (path ?? "").split("/").filter(Boolean);
  const hasOwnPage = (seg: string) => seg !== "industries";
  const trail = segs.length
    ? [
        { name: "Home", url: site.url },
        ...segs.map((seg, i) => ({ seg, i })).filter(({ seg, i }) => i === segs.length - 1 || hasOwnPage(seg)).map(({ seg, i }) => ({
          name: i === segs.length - 1 ? title : (names[seg] ?? seg),
          url: `${site.url}/${segs.slice(0, i + 1).join("/")}`,
        })),
      ]
    : [];
  return (
    <header className="frame px-4 pb-14 pt-36 md:px-10">
      {trail.length > 1 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: t.url })),
            }),
          }}
        />
      )}
      <div data-reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h1 data-reveal className="display mt-5 text-display-l">
        {title}
      </h1>
      {lead ? (
        <p data-reveal className="mt-6 max-w-2xl text-lead text-slate">
          {lead}
        </p>
      ) : null}
    </header>
  );
}
