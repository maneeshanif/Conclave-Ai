/**
 * Builds the design review pack in docs/review:
 *   shots/        every page, section and state as JPEG, desktop and mobile
 *   manifest.json machine-readable index (id, route, size, source files)
 *   board.html    Figma-style canvas: one row per page, sections side by side
 *   review.pdf    every shot on its own page at native size
 *   REVIEW.md     instructions and a feedback template for an agent
 * Starts its own production server and shuts it down at the end.
 */
import { chromium } from "playwright";
import { spawn, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("../..");
const OUT = path.join(ROOT, "docs/review");
const SHOTS = path.join(OUT, "shots");
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(SHOTS, { recursive: true });
const PORT = 3100;
const BASE = `http://localhost:${PORT}`;

const server = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: ROOT, shell: true, stdio: "ignore" });
const stop = () => { try { execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: "ignore" }); } catch {} };
process.on("exit", stop);
for (let i = 0; i < 60; i++) { try { if ((await fetch(BASE + "/")).ok) break; } catch {} await new Promise((r) => setTimeout(r, 500)); }

const HOME = [
  ["hero", "components/home/sections.tsx (Hero), components/home/HeroStuds.tsx, lib/studs/hero.ts"],
  ["live-agent", "components/home/sections.tsx (LiveAgent), components/home/AriaWindow.tsx"],
  ["proof", "components/home/sections.tsx (Proof), lib/content.ts (trust)"],
  ["services", "components/home/sections.tsx (Services), components/home/visuals.tsx (mock-ups), components/studs/StudGlyph.tsx"],
  ["systems", "components/home/sections.tsx (Systems), lib/content.ts (studio)"],
  ["built-for", "components/home/sections.tsx (BuiltFor), lib/content.ts (industries), lib/studs/patterns.ts"],
  ["process", "components/home/sections.tsx (Process), lib/content.ts (processSteps)"],
  ["pricing", "components/home/sections.tsx (PricingTeaser)"],
  ["faq", "components/home/sections.tsx (Faq), components/ui/Accordion.tsx"],
  ["guild-strip", "components/home/sections.tsx (GuildStrip)"],
  ["final-cta", "components/home/sections.tsx (FinalCta), components/QuickBook.tsx"],
];
const PAGES = [
  { slug: "home", route: "/", title: "Home", file: "app/page.tsx" },
  { slug: "services", route: "/services", title: "Services", file: "app/services/page.tsx" },
  { slug: "service-detail", route: "/services/voice", title: "Service detail", file: "app/services/[slug]/page.tsx" },
  { slug: "service-follow-up", route: "/services/follow-up", title: "Service: follow-up", file: "app/services/[slug]/page.tsx", compact: true },
  { slug: "service-booking", route: "/services/booking", title: "Service: booking", file: "app/services/[slug]/page.tsx", compact: true },
  { slug: "service-reactivation", route: "/services/reactivation", title: "Service: reactivation", file: "app/services/[slug]/page.tsx", compact: true },
  { slug: "service-reporting", route: "/services/reporting", title: "Service: reporting", file: "app/services/[slug]/page.tsx", compact: true },
  { slug: "studio", route: "/studio", title: "Studio", file: "app/studio/page.tsx" },
  { slug: "studio-agents", route: "/studio/agents", title: "Studio: agents", file: "app/studio/[slug]/page.tsx" },
  { slug: "studio-automations", route: "/studio/automations", title: "Studio: automations", file: "app/studio/[slug]/page.tsx" },
  { slug: "studio-erp-crm", route: "/studio/erp-crm", title: "Studio: ERP and CRM", file: "app/studio/[slug]/page.tsx" },
  { slug: "studio-apps", route: "/studio/apps", title: "Studio: apps", file: "app/studio/[slug]/page.tsx" },
  { slug: "studio-platforms", route: "/studio/platforms", title: "Studio: platforms", file: "app/studio/[slug]/page.tsx" },
  { slug: "industry", route: "/industries/clinics", title: "Industry page", file: "app/industries/[slug]/page.tsx" },
  { slug: "industry-med-spas", route: "/industries/med-spas", title: "Industry: med spas", file: "app/industries/[slug]/page.tsx", compact: true },
  { slug: "industry-dental", route: "/industries/dental", title: "Industry: dental", file: "app/industries/[slug]/page.tsx", compact: true },
  { slug: "industry-real-estate", route: "/industries/real-estate", title: "Industry: real estate", file: "app/industries/[slug]/page.tsx", compact: true },
  { slug: "industry-home-services", route: "/industries/home-services", title: "Industry: home services", file: "app/industries/[slug]/page.tsx", compact: true },
  { slug: "industry-startups", route: "/industries/startups", title: "Industry: startups", file: "app/industries/[slug]/page.tsx", compact: true },
  { slug: "crew", route: "/crew", title: "The Crew", file: "app/crew/page.tsx" },
  { slug: "work", route: "/work", title: "Work", file: "app/work/page.tsx" },
  { slug: "demos", route: "/demos", title: "Demos", file: "app/demos/page.tsx" },
  { slug: "about", route: "/about", title: "About", file: "app/about/page.tsx" },
  { slug: "pricing", route: "/pricing", title: "Pricing", file: "app/pricing/page.tsx" },
  { slug: "contact", route: "/contact", title: "Contact", file: "app/contact/page.tsx" },
  { slug: "join", route: "/join", title: "Join", file: "app/join/page.tsx" },
  { slug: "security", route: "/security", title: "Security", file: "app/security/page.tsx" },
  { slug: "compare", route: "/compare", title: "Compare", file: "app/compare/page.tsx" },
  { slug: "receipts", route: "/receipts", title: "Receipts", file: "app/receipts/page.tsx" },
  { slug: "notes", route: "/notes", title: "Notes", file: "app/notes/page.tsx" },
  { slug: "note", route: "/notes/missed-call-cost", title: "Note (post)", file: "app/notes/[slug]/page.tsx" },
  { slug: "roadmap", route: "/roadmap", title: "Roadmap", file: "app/roadmap/page.tsx" },
  { slug: "privacy", route: "/privacy", title: "Privacy (not indexed)", file: "app/privacy/page.tsx" },
  { slug: "terms", route: "/terms", title: "Terms (not indexed)", file: "app/terms/page.tsx" },
  { slug: "not-found", route: "/no-such-page", title: "404", file: "app/not-found.tsx" },
];const VIEWPORTS = [["desktop", 1440, 900], ["mobile", 390, 844]];

const manifest = [];
const pad = (n) => String(n).padStart(2, "0");
const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "section";

async function save(page, handleOrNull, rel, meta, opts = {}) {
  const file = path.join(SHOTS, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const o = { path: file, type: "jpeg", quality: 82, ...opts };
  for (let attempt = 1; ; attempt++) {
    try { if (handleOrNull) await handleOrNull.screenshot(o); else await page.screenshot(o); break; }
    catch (e) { if (attempt >= 3) throw e; await page.waitForTimeout(800); }
  }
  const dim = readJpegSize(file);
  manifest.push({ ...meta, file: "shots/" + rel.replace(/\\/g, "/"), width: dim.w, height: dim.h });
}

function readJpegSize(file) {
  const b = fs.readFileSync(file);
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xc0 && m <= 0xc3) return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
    i += 2 + b.readUInt16BE(i + 2);
  }
  return { w: 0, h: 0 };
}

const browser = await chromium.launch();

for (const [vp, w, h] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: vp === "mobile" ? 2 : 1, reducedMotion: "reduce" /* so reveal animations never hide content in a still */ });
  const page = await ctx.newPage();

  for (const pg of PAGES) {
    await page.goto(BASE + pg.route, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const base = { page: pg.slug, pageTitle: pg.title, route: pg.route, viewport: vp, pageFile: pg.file };

    // 1. full page. Chrome cannot capture past about 16k device px, so tall pages are saved in parts.
    const fullH = (await page.evaluate(() => document.documentElement.scrollHeight)) * (vp === "mobile" ? 2 : 1);
    if (fullH <= 15000) {
      await save(page, null, `${pg.slug}/${vp}/00-full-page.jpg`, { ...base, id: `${pg.slug}/${vp}/full-page`, kind: "full", name: "Full page", source: [pg.file, "app/layout.tsx"] }, { fullPage: true });
    } else {
      const step = 4000, cssH = fullH / (vp === "mobile" ? 2 : 1);
      for (let y = 0, n = 1; y < cssH; y += step, n++) {
        await save(page, null, `${pg.slug}/${vp}/00-full-page-part${n}.jpg`, { ...base, id: `${pg.slug}/${vp}/full-page-part${n}`, kind: "full", name: `Full page, part ${n}`, source: [pg.file, "app/layout.tsx"] }, { fullPage: true, clip: { x: 0, y, width: w, height: Math.min(step, cssH - y) } });
      }
    }
    if (pg.compact) continue; // sibling pages of a template already covered section by section: full page only
    // 2. sections: direct children of <main>; split a single wrapper into its sections
    // blocks: top-level children of <main>; wrappers (article, tall div) are expanded into their blocks, <section> stays whole
    const arr = await page.evaluateHandle(() => {
      const ok = (k) => k.getBoundingClientRect().height > 40;
      const expand = (el, d) => {
        const kids = [...el.children].filter(ok);
        const wrapper = el.tagName === "ARTICLE" || (!el.matches("section,header,ul,ol,dl") && kids.length >= 2 && el.getBoundingClientRect().height > 1000);
        return d < 3 && wrapper ? kids.flatMap((k) => expand(k, d + 1)) : [el];
      };
      return [...document.querySelectorAll("main > *")].filter(ok).flatMap((k) => expand(k, 0));
    });
    const handles = [...(await arr.getProperties()).values()].map((p) => p.asElement()).filter(Boolean);

    // hide the fixed nav for section shots, except the first one (it is part of the hero)
    const hideNav = () => page.addStyleTag({ content: "body.__sec header.fixed{visibility:hidden!important}" });
    await hideNav();
    let idx = 0;
    for (const el of handles) {
      const heading = await el.evaluate((e) => {
        const hs = [...e.querySelectorAll("h1,h2,h3")].map((h) => h.textContent.trim().replace(/\s+/g, " "));
        const clean = (t) => t.replace(/\s+/g, " ").trim().slice(0, 48);
        if (hs.length > 1) return clean(hs[0]) + " plus " + (hs.length - 1) + " more";
        return clean(hs[0] || e.getAttribute("aria-label") || e.querySelector("[aria-label]")?.getAttribute("aria-label") || e.getAttribute("id") || e.innerText || e.tagName);
      });
      const homeInfo = pg.slug === "home" ? HOME[idx] : null;
      const slug = homeInfo ? homeInfo[0] : kebab(heading || `section-${idx + 1}`);
      await el.scrollIntoViewIfNeeded();
      await page.evaluate((first) => document.body.classList.toggle("__sec", !first), idx === 0);
      await page.waitForTimeout(150);
      await save(page, el, `${pg.slug}/${vp}/${pad(idx + 1)}-${slug}.jpg`, {
        ...base, id: `${pg.slug}/${vp}/${pad(idx + 1)}-${slug}`, kind: "section", name: homeInfo ? slug : heading || slug, heading,
        source: homeInfo ? [homeInfo[1]] : [pg.file],
      });
      idx++;
    }
    await page.evaluate(() => document.body.classList.remove("__sec"));

    // 3. footer and nav for the page
    const footer = await page.$("footer");
    if (footer) {
      await footer.scrollIntoViewIfNeeded();
      await page.evaluate(() => document.body.classList.add("__sec"));
      await save(page, footer, `${pg.slug}/${vp}/${pad(idx + 1)}-footer.jpg`, { ...base, id: `${pg.slug}/${vp}/${pad(idx + 1)}-footer`, kind: "section", name: "footer", heading: "Footer", source: ["components/Footer.tsx"] });
      await page.evaluate(() => document.body.classList.remove("__sec"));
    }
  }

  // 4. states
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 0));
  const st = { page: "states", pageTitle: "Interactive states", route: "/", viewport: vp, pageFile: "components" };
  if (vp === "desktop") {
    const win = await page.$("section.relative.z-10");
    for (const [i, tab] of ["Answer calls", "Follow up fast", "Book the slot", "Win back"].entries()) {
      await page.getByRole("tab", { name: tab }).click();
      await win.scrollIntoViewIfNeeded();
      await page.evaluate(() => document.body.classList.add("__sec"));
      await page.waitForTimeout(150);
      await save(page, win, `states/${vp}/0${i + 1}-aria-tab-${kebab(tab)}.jpg`, { ...st, id: `states/${vp}/aria-tab-${kebab(tab)}`, kind: "state", name: `Aria window, tab "${tab}"`, source: ["components/home/AriaWindow.tsx"] });
    }
    await page.evaluate(() => { document.body.classList.remove("__sec"); window.scrollTo(0, 0); });
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(300);
    await save(page, null, `states/${vp}/05-command-palette.jpg`, { ...st, id: `states/${vp}/command-palette`, kind: "state", name: "Command palette (Ctrl+K)", source: ["components/CommandPalette.tsx"] });
    await page.keyboard.press("Escape");
    await page.getByRole("link", { name: "Work", exact: true }).first().hover();
    await page.waitForTimeout(200);
    await save(page, null, `states/${vp}/06-nav-hover.jpg`, { ...st, id: `states/${vp}/nav-hover`, kind: "state", name: "Nav item hover", source: ["components/Navbar.tsx"] }, { clip: { x: 0, y: 0, width: 1440, height: 110 } });
  } else {
    await page.getByRole("button", { name: "Menu" }).click();
    await page.waitForTimeout(250);
    await save(page, null, `states/${vp}/01-mobile-menu.jpg`, { ...st, id: `states/${vp}/mobile-menu`, kind: "state", name: "Mobile menu open", source: ["components/Navbar.tsx"] });
  }
  await ctx.close();
}
// Hero stud scene: the stills above use reduced motion (the assembled C), so capture the scatter, the C and the scroll split with motion on.
{
  const hb = await chromium.launch();
  const hp = await (await hb.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const st = { page: "states", pageTitle: "Interactive states", route: "/", viewport: "desktop", pageFile: "components" };
  await hp.goto(BASE + "/", { waitUntil: "commit" });
  await hp.waitForTimeout(900);
  await save(hp, null, "states/desktop/07-hero-studs-scatter.jpg", { ...st, id: "states/desktop/hero-studs-scatter", kind: "state", name: "Hero: studs scattering into the C (0.9s after load)", source: ["components/home/HeroStuds.tsx", "lib/studs/useStudAssemble.ts"] }, { clip: { x: 0, y: 0, width: 1440, height: 820 } });
  await hp.waitForTimeout(3500);
  await save(hp, null, "states/desktop/08-hero-studs-assembled.jpg", { ...st, id: "states/desktop/hero-studs-assembled", kind: "state", name: "Hero: the stud C assembled", source: ["components/home/HeroStuds.tsx", "lib/studs/mark.ts"] }, { clip: { x: 0, y: 0, width: 1440, height: 820 } });
  await hp.evaluate(() => scrollTo(0, 240));
  await hp.waitForTimeout(1800);
  await save(hp, null, "states/desktop/09-hero-studs-crew.jpg", { ...st, id: "states/desktop/hero-studs-crew", kind: "state", name: "Hero: the C split into the seven agents (after 240px of scroll)", source: ["lib/studs/hero.ts", "lib/studs/useStudAssemble.ts"] }, { clip: { x: 0, y: 0, width: 1440, height: 820 } });
  await hb.close();
}await browser.close();
stop();

fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log("shots:", manifest.length, "| pages:", new Set(manifest.map((m) => m.page)).size);

/* ---------- board.html ---------- */
const boardHtml = fs.readFileSync("./review-board.template.html", "utf8").replace("/*__MANIFEST__*/[]", JSON.stringify(manifest));
fs.writeFileSync(path.join(OUT, "board.html"), boardHtml);

/* ---------- print.html -> review.pdf (one shot per PDF page, native size) ---------- */
const CAP = 56;
const pages = manifest.map((m, i) => {
  const w = Math.max(m.width / (m.viewport === "mobile" ? 2 : 1), 720);
  const h = m.height / (m.viewport === "mobile" ? 2 : 1);
  const iw = m.width / (m.viewport === "mobile" ? 2 : 1);
  return { m, i, w, h: h + CAP, iw, ih: h };
});
const css = pages.map((p) => `@page p${p.i}{size:${p.w}px ${p.h}px;margin:0}.p${p.i}{page:p${p.i};width:${p.w}px;height:${p.h}px}`).join("");
const toc = PAGES.map((pg) => {
  const rows = manifest.filter((m) => m.page === pg.slug && m.viewport === "desktop" && (m.kind !== "full" || pg.compact));
  return `<h3>${pg.title} <small>${pg.route}</small></h3><ol>${rows.map((r) => `<li>${r.id}</li>`).join("")}</ol>`;
}).join("");
const printHtml = `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box}body{margin:0;font:14px/1.4 system-ui,sans-serif;color:#0B1512;background:#fff}
.cap{height:${CAP}px;display:flex;align-items:center;gap:16px;padding:0 20px;background:#0B1512;color:#F1F4EC;font-size:15px}
.cap b{color:#C8F169;font-family:monospace}.cap span{opacity:.7;font-size:12px}
.img{display:block;margin:0 auto;background:#fff}
.cover{padding:60px;background:#F1F4EC;page:cover}.cover h1{font-size:44px;margin:0 0 8px}.cover h3{margin:22px 0 4px}.cover ol{columns:3;font:12px monospace;margin:0;padding-left:18px}
@page cover{size:1440px 1800px;margin:0}
${css}</style>
<div class="cover" style="width:1440px;height:1800px"><h1>Conclave AI design review</h1>
<p>${manifest.length} shots: every page, section and state at desktop (1440px) and mobile (390px). Each PDF page is one shot at native size; the bar on top gives its ID and source file. Generated ${new Date().toISOString().slice(0, 10)}.</p>
<p>Desktop shots listed below. Mobile shots use the same names under <code>/mobile/</code>.</p>${toc}</div>
${pages.map((p) => `<section class="p${p.i}"><div class="cap"><b>${p.m.id}</b><span>${p.m.route} | ${p.m.viewport} | ${p.m.kind} | ${p.m.source.join(", ")}</span></div><img class="img" src="${p.m.file}" width="${p.iw}" height="${p.ih}"></section>`).join("")}`;
fs.writeFileSync(path.join(OUT, "print.html"), printHtml);

const b2 = await chromium.launch();
const pp = await (await b2.newContext()).newPage();
await pp.goto("file:///" + path.join(OUT, "print.html").replace(/\\/g, "/"), { waitUntil: "load" });
await pp.pdf({ path: path.join(OUT, "review.pdf"), preferCSSPageSize: true, printBackground: true });
await b2.close();
fs.rmSync(path.join(OUT, "print.html"));
const mb = (fs.statSync(path.join(OUT, "review.pdf")).size / 1048576).toFixed(1);
console.log("pdf MB:", mb);
await import("./review-md.mjs");
process.exit(0);
