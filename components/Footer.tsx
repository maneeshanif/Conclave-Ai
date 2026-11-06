import Link from "next/link";
import { services, site } from "@/lib/site";
import { studio } from "@/lib/content";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

const columns: { title: string; links: [string, string][] }[] = [
  {
    title: "Services",
    links: [
      ...services.map((s): [string, string] => [s.short, `/services/${s.slug}`]),
      ["Outbound calling", "/services/outbound-calling"],
      ["After hours answering", "/after-hours-answering-service"],
    ],
  },
  { title: "Studio", links: studio.map((s) => [s.name, `/studio/${s.slug}`]) },
  {
    title: "Resources",
    links: [
      ["Notes", "/notes"],
      ["Receipts", "/receipts"],
      ["Compare", "/compare"],
      ["AI receptionist UK", "/ai-receptionist-uk"],
      ["AI receptionist Canada", "/ai-receptionist-canada"],
      ["Gulf clinics", "/ai-receptionist-gulf-clinics"],
      ["Dental", "/industries/dental"],
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

const iconCls = "h-5 w-5";

/** Official profiles shown as icons. Links come from site.social so the schema and the footer never disagree. */
const socials: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "LinkedIn",
    href: site.social.linkedin,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={iconCls} fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: site.social.instagram,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X",
    href: site.social.x,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={iconCls} fill="currentColor">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    ),
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
          <nav aria-label="Social profiles" className="mt-5">
            <ul className="flex gap-3">
              {socials.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    className="grid h-11 w-11 place-items-center rounded-full border border-paper/20 text-chalk transition-colors duration-150 hover:border-lime hover:bg-lime hover:text-ink"
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
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
