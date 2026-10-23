// Cross-browser smoke run: Firefox and WebKit (Safari engine) against a running server.
// Checks per route: loads, no page errors, no horizontal overflow, no console errors. On the home page at 1440 it also drives the hero
// scroll split and checks the seven tiles end up below the headline and fully inside the viewport.
// Usage: node cross-browser.mjs [base=http://localhost:3001]
import { firefox, webkit } from "playwright";
import fs from "node:fs";
const BASE = process.argv[2] ?? "http://localhost:3001";
const ROUTES = ["/", "/work", "/studio", "/studio/erp-crm", "/crew", "/services", "/pricing", "/contact", "/security", "/demos"];
const SIZES = [{ w: 1440, h: 900 }, { w: 390, h: 844 }];
fs.mkdirSync("cross-shots", { recursive: true });
let fails = 0;
const bad = (m) => { fails++; console.log("  FAIL", m); };

for (const [name, type] of [["firefox", firefox], ["webkit", webkit]]) {
  console.log(`\n== ${name} ==`);
  const b = await type.launch();
  for (const s of SIZES) {
    const ctx = await b.newContext({ viewport: { width: s.w, height: s.h }, isMobile: s.w < 500 && name === "webkit", hasTouch: s.w < 500 });
    for (const r of ROUTES) {
      const p = await ctx.newPage();
      const errs = [];
      p.on("pageerror", (e) => errs.push("pageerror: " + e.message));
      p.on("console", (m) => { if (m.type() === "error" && !/favicon|Failed to load resource/.test(m.text())) errs.push("console: " + m.text().slice(0, 160)); });
      const res = await p.goto(BASE + r, { waitUntil: "load", timeout: 60000 }).catch((e) => ({ status: () => 0, err: e.message }));
      await p.waitForTimeout(1200);
      const status = res.status();
      const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth).catch(() => -1);
      const line = `${s.w}px ${r.padEnd(16)} ${status} overflow ${ov}`;
      if (status !== 200 || ov > 1 || errs.length) { bad(`${line} ${errs.slice(0, 2).join(" | ")}`); } else console.log("  ok  ", line);
      await p.close();
    }
    await ctx.close();
  }

  // hero scroll split
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "load" });
  await p.waitForTimeout(2500);
  await p.screenshot({ path: `cross-shots/${name}-hero-assembled.png` });
  const studs = await p.locator("[data-hero] [data-stud]").count();
  for (const y of [150, 300]) { await p.mouse.wheel(0, y); await p.waitForTimeout(900); }
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `cross-shots/${name}-hero-split.png` });
  const m = await p.evaluate(() => {
    const h1 = document.querySelector("[data-hero] h1")?.getBoundingClientRect();
    const tiles = [...document.querySelectorAll("[data-hero] [data-tile]")].map((t) => t.getBoundingClientRect());
    const vis = tiles.filter((t) => t.width > 20 && t.top >= 0 && t.bottom <= innerHeight);
    const below = tiles.filter((t) => h1 && t.top >= h1.bottom - 2);
    return { n: tiles.length, vis: vis.length, below: below.length };
  });
  console.log(`  hero: ${studs} studs, ${m.n} tiles, ${m.vis} inside viewport, ${m.below} below the headline`);
  if (m.n !== 7 || m.vis !== 7 || m.below !== 7) bad("hero split tiles not all visible below the headline");
  await ctx.close();
  await b.close();
}
console.log(fails ? `\n${fails} problem(s)` : "\nall clean");
process.exit(0);
