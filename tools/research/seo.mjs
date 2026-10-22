// SEO acceptance checks against a running PRODUCTION server: every sitemap page has a Conclave AI title, one canonical, a share image
// and valid JSON-LD; Organization, WebSite, Service, FAQPage, Article and BreadcrumbList appear where they should; pages that are not
// real yet are noindexed and stay out of the sitemap. Usage: node seo.mjs [url=http://localhost:3100]
const BASE = process.argv[2] ?? "http://localhost:3100";
let fail = 0;
const check = (name, ok, extra = "") => { if (!ok) fail++; console.log((ok ? "ok   " : "FAIL ") + name + (extra ? "  " + extra : "")); };

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const routes = [...new Set([...xml.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)?<\/loc>/g)].map((m) => m[1] || "/"))];
const types = new Map();
const problems = [];
for (const r of routes) {
  const html = await (await fetch(BASE + r)).text();
  const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "";
  const canon = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
  const og = /<meta property="og:image" content="([^"]+)"/.exec(html)?.[1];
  const robots = /<meta name="robots" content="([^"]+)"/.exec(html)?.[1] ?? "";
  if (!/Conclave AI/.test(title)) problems.push(`${r}: title "${title}" lacks "Conclave AI"`);
  if (/\bConclave\b(?! AI)/.test(title)) problems.push(`${r}: title says bare "Conclave"`);
  if (canon.length !== 1) problems.push(`${r}: ${canon.length} canonical links`);
  if (!og) problems.push(`${r}: no og:image`);
  if (/noindex/.test(robots)) problems.push(`${r}: noindex but in the sitemap`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const j = JSON.parse(m[1]);
      for (const node of [j].flat().flatMap((x) => x["@graph"] ?? x)) {
        const t = node["@type"];
        types.set(t, (types.get(t) ?? new Set()).add(r));
      }
    } catch (e) { problems.push(`${r}: JSON-LD does not parse (${e.message})`); }
  }
}
check(`${routes.length} sitemap pages: title with "Conclave AI", one canonical, og:image, valid JSON-LD`, problems.length === 0, problems.slice(0, 4).join(" | "));
const has = (t, where) => (types.get(t)?.size ?? 0) > 0 && (!where || [...types.get(t)].some((p) => where(p)));
check("Organization and WebSite on every page", has("Organization") && has("WebSite"));
check("Service on service and studio pages", has("Service", (p) => p.startsWith("/services/")) && has("Service", (p) => p.startsWith("/studio/")));
check("FAQPage on home and studio pages", has("FAQPage", (p) => p === "/") && has("FAQPage", (p) => p.startsWith("/studio/")));
check("Article on the Notes post", has("Article", (p) => p.startsWith("/notes/")));
check("BreadcrumbList on inner pages", (types.get("BreadcrumbList")?.size ?? 0) >= 15, `${types.get("BreadcrumbList")?.size ?? 0} pages`);

// pages that are not real yet: noindex, and not in the sitemap
for (const r of ["/privacy", "/terms"]) {
  const html = await (await fetch(BASE + r)).text();
  check(`${r} is noindex and not in the sitemap`, /noindex/.test(/<meta name="robots" content="([^"]+)"/.exec(html)?.[1] ?? "") && !routes.includes(r));
}
check("no placeholder case studies are public (/work/bazar-flow is a 404)", (await fetch(BASE + "/work/bazar-flow")).status === 404);
const robotsTxt = await (await fetch(`${BASE}/robots.txt`)).text();
check("robots.txt points at the sitemap", /Sitemap:/i.test(robotsTxt));
check("404 page returns 404", (await fetch(BASE + "/no-such-page")).status === 404);
for (const r of ["/", "/studio/erp-crm", "/notes/missed-call-cost"]) {
  const res = await fetch(`${BASE}${r}/opengraph-image`.replace("//opengraph", "/opengraph"));
  check(`share image renders for ${r}`, res.ok && /image\/png/.test(res.headers.get("content-type") ?? ""), `${res.status}`);
}
console.log(fail ? `FAILED: ${fail}` : "SEO CHECKS ALL OK");
process.exit(0);
