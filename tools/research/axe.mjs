// Accessibility (axe-core, WCAG 2 A and AA) on every route at desktop and mobile, plus an internal link crawl.
// Starts and stops its own production server (build first). Motion is reduced so animation start states do not skew contrast.
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { spawn, execSync } from "node:child_process";

const PORT = 3100;
const server = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: "../..", shell: true, stdio: "ignore" });
const stop = () => { try { execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: "ignore" }); } catch {} };
process.on("exit", stop);
for (let i = 0; i < 60; i++) { try { if ((await fetch(`http://localhost:${PORT}/`)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 500)); }
const BASE = `http://localhost:${PORT}`;

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const routes = [...new Set([...xml.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)?<\/loc>/g)].map((m) => m[1] || "/"))];
routes.push("/no-such-page");
console.log("routes:", routes.length);

const b = await chromium.launch();
const seen = new Map();
let total = 0;
for (const [name, w, h] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  for (const r of routes) {
    await p.goto(BASE + r, { waitUntil: "networkidle" });
    const res = await new AxeBuilder({ page: p }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    for (const v of res.violations) {
      const key = `${v.id}|${v.impact}`;
      const e = seen.get(key) ?? { help: v.help, where: new Set(), sample: "" };
      e.where.add(`${name}:${r}`);
      if (!e.sample) e.sample = `${v.nodes[0].target.join(" ")} :: ${(v.nodes[0].failureSummary || "").split("\n").slice(1, 3).join(" ").slice(0, 160)}`;
      seen.set(key, e);
      total += v.nodes.length;
    }
  }
  await ctx.close();
}
if (!seen.size) console.log("axe: no WCAG A/AA violations on any route");
for (const [k, e] of seen) console.log(`AXE ${k}  ${e.help}\n     on ${[...e.where].slice(0, 6).join(", ")}${e.where.size > 6 ? ` (+${e.where.size - 6})` : ""}\n     e.g. ${e.sample}`);

// link crawl: every internal link on every page must resolve
const p = await (await b.newContext({ reducedMotion: "reduce" })).newPage();
const links = new Set();
for (const r of routes.filter((x) => x !== "/no-such-page")) {
  await p.goto(BASE + r, { waitUntil: "domcontentloaded" });
  (await p.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")))).forEach((h) => h && /^\/(?!\/)/.test(h) && links.add(h.split("#")[0] || "/"));
}
let broken = 0;
for (const l of links) {
  const s = (await fetch(BASE + l)).status;
  if (s >= 400) { broken++; console.log("BROKEN LINK", s, l); }
}
console.log(`links checked: ${links.size}, broken: ${broken}`);
await b.close();
stop();
console.log(seen.size || broken ? `ISSUES: ${seen.size} axe rule(s), ${broken} broken link(s)` : "A11Y AND LINKS ALL OK");
process.exit(0);
