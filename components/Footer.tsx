import Link from "next/link";
import { services, site } from "@/lib/site";
import { studio } from "@/lib/content";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

const columns: { title: string; links: [string, string][] }[] = [
  { title: "Services", links: services.map((s) => [s.short, `/services/${s.slug}`]) },
  { title: "Studio", links: studio.map((s) => [s.name, `/studio/${s.slug}`]) },
  {
    title: "Resources",
    links: [
      ["Notes", "/notes"],
      ["Receipts", "/receipts"],
      ["Compare", "/compare"],
      ["Security", "/security"],
      ["Demos", "/demos"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Work", "/work"],
      ["Join the guild", "/join"],
      ["Contact", "/contact"],
    ],
  },
];

/** Skewed repeating word band (Willows influence): flat colour, CSS-only, paused for reduced motion. The skew sits on a viewport-wide wrapper; only the strip translates. */
function WordBand() {
  const words = Array.from({ length: 8 }, (_, i) => i);
  return (
    <div className="overflow-hidden bg-lime py-6 text-ink" aria-hidden="true">
      <div className="-skew-y-2">
        <div className="band flex w-max whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0">
              {words.map((i) => (
                <span key={i} className="display px-6 text-display-l">
                  Agents, convened /
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .band { animation: band 40s linear infinite; }
        @keyframes band { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .band { animation: none; } }
      `}</style>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="on-ink bg-ink text-paper">
      <WordBand />
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-16 md:grid-cols-[1.5fr_repeat(4,1fr)] md:px-10">
        <div>
          <Logo tone="dark" />
          <p className="mt-6 max-w-xs text-steel">Agents, convened. Voice agents, automation and full-stack builds.</p>
          <a href={`mailto:${site.email}`} className="mt-4 block text-chalk underline-offset-4 hover:text-lime hover:underline">
            {site.email}
          </a>
          <p className="mt-3 text-sm text-steel">
            {site.city}, serving {site.serving}.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="label text-paper">{c.title}</p>
            <ul className="mt-5 space-y-3 text-steel">
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="transition-colors duration-150 hover:text-lime">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-paper/15 px-4 py-6 text-sm text-steel md:px-10">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="flex gap-5">
          <Link href="/privacy" className="hover:text-lime">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-lime">
            Terms
          </Link>
        </p>
      </div>
    </footer>
  );
}
