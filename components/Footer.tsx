import Link from "next/link";
import { services, site } from "@/lib/site";
import { Logo } from "./Logo";

const columns: { title: string; links: [string, string][] }[] = [
  { title: "Services", links: services.map((s) => [s.short, `/services#${s.slug}`]) },
  {
    title: "Company",
    links: [
      ["Work", "/work"],
      ["Demos", "/demos"],
      ["About", "/about"],
      ["Pricing", "/pricing"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
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
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-10">
        <div>
          <Logo tone="dark" />
          <p className="mt-6 max-w-xs text-steel">Agents, convened. Voice agents, automation and full-stack builds.</p>
          <a href={`mailto:${site.email}`} className="mt-4 block text-chalk underline-offset-4 hover:text-lime hover:underline">
            {site.email}
          </a>
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
      <p className="mx-auto max-w-[1280px] border-t border-paper/15 px-4 py-6 text-sm text-steel md:px-10">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
