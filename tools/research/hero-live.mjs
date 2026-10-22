// Drives the hero scroll transition the way a visitor does: real mouse-wheel scrolling, down then back up, plus reload mid-scroll.
// Records the hero position, the stud state and the tile row at every step, and saves frames. Runs against a running server.
// Usage: BASE=http://localhost:3001 node hero-live.mjs
import { chromium } from "playwright";
import fs from "node:fs";
const ROOT = process.env.BASE ?? "http://localhost:3001";
const OUT = "../../docs/screens/hero-live";
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errs = [];
p.on("pageerror", (e) => errs.push("pageerror: " + e.message));
p.on("console", (m) => ["error", "warning"].includes(m.type()) && !/DevTools|Fast Refresh|Failed to load resource/.test(m.text()) && errs.push(m.type() + ": " + m.text().slice(0, 200)));

const state = () => p.evaluate(() => {
  const hero = document.querySelector("[data-hero]").getBoundingClientRect();
  const studs = [...document.querySelectorAll("[data-stud]")];
  const vis = studs.filter((s) => +getComputedStyle(s).opacity > 0.4);
  const lowest = Math.max(...vis.map((s) => s.getBoundingClientRect().bottom));
  const tiles = [...document.querySelectorAll("[data-tile]")];
  const tShown = tiles.filter((g) => +getComputedStyle(g).opacity > 0.9).length;
  const tr = tiles.map((g) => g.getBoundingClientRect());
  const pill = document.querySelector("[data-hero-pill]").getBoundingClientRect();
  const lines = [...document.querySelectorAll("[data-hero-line]")].map((l) => l.getBoundingClientRect());
  const h1Bottom = Math.round(Math.max(...lines.map((r) => r.bottom)));
  const sub = document.querySelector("[data-hero-fade] p").getBoundingClientRect();
  const btn = document.querySelector("[data-hero-fade] a").getBoundingClientRect();
  return {
    y: Math.round(scrollY), heroTop: Math.round(hero.top), tiles: tShown,
    tileTop: tShown ? Math.round(Math.min(...tr.map((r) => r.top))) : null, tileBottom: tShown ? Math.round(Math.max(...tr.map((r) => r.bottom))) : null,
    pillTop: Math.round(pill.top), h1Bottom, subTop: Math.round(sub.top), subRight: Math.round(sub.right), btnTop: Math.round(btn.top), studsVisible: vis.length, studsLowest: Math.round(lowest),
    sig: studs.slice(0, 12).map((s) => Math.round(+s.getAttribute("cx")) + "," + Math.round(+s.getAttribute("cy"))).join("|"),
  };
});

await p.goto(ROOT + "/", { waitUntil: "load" });
await p.mouse.move(700, 500);
await p.waitForTimeout(4500); // assembly finishes
const start = await state();
console.log("assembled   ", JSON.stringify({ y: start.y, studsVisible: start.studsVisible, h1Bottom: start.h1Bottom, subTop: start.subTop, btnTop: start.btnTop }));
await p.screenshot({ path: `${OUT}/00-assembled.png` });

const rows = [];
for (let i = 1; i <= 16; i++) {
  await p.mouse.wheel(0, 60);
  await p.waitForTimeout(260);
  const s = await state();
  rows.push(s);
  if ([2, 4, 6, 8, 10, 12, 16].includes(i)) await p.screenshot({ path: `${OUT}/down-${String(s.y).padStart(4, "0")}.png` });
}
await p.waitForTimeout(900);
console.log("\nscroll down (wheel 60px steps):");
for (const s of rows) console.log(`  y ${String(s.y).padStart(4)} | hero top ${String(s.heroTop).padStart(5)} | tiles ${s.tiles} ${s.tileTop !== null ? `(${s.tileTop}-${s.tileBottom})` : ""} | headline bottom ${s.h1Bottom} | studs ${s.studsVisible}`);

// jumps: the hero should be pinned at 0 for the hold, then move smoothly. Look for any single-step jump bigger than the wheel step.
const tops = rows.map((r) => r.heroTop);
let maxJump = 0;
for (let i = 1; i < tops.length; i++) maxJump = Math.max(maxJump, Math.abs(tops[i] - tops[i - 1]));
const pinnedSteps = rows.filter((r) => r.heroTop === 0).length;
console.log(`\npinned for ${pinnedSteps} of ${rows.length} steps; largest hero movement in one step: ${maxJump}px (a wheel step is about 60px)`);

// back up
const up = [];
for (let i = 0; i < 20; i++) { await p.mouse.wheel(0, -60); await p.waitForTimeout(240); up.push(await state()); }
await p.waitForTimeout(1500);
const back = await state();
console.log("\nback at top :", JSON.stringify({ y: back.y, heroTop: back.heroTop, tiles: back.tiles, studsVisible: back.studsVisible }));
console.log("C re-forms exactly as before:", back.sig === start.sig, "| tiles gone:", back.tiles === 0);
await p.screenshot({ path: `${OUT}/up-0000.png` });

// reload partway down: the page restores the scroll; the scene must still be coherent
await p.evaluate(() => scrollTo(0, 220));
await p.waitForTimeout(1200);
await p.reload({ waitUntil: "load" });
await p.waitForTimeout(5000);
const rl = await state();
console.log("\nreload at y", rl.y, "->", JSON.stringify({ heroTop: rl.heroTop, tiles: rl.tiles, studsVisible: rl.studsVisible }));
await p.screenshot({ path: `${OUT}/reload-mid.png` });

// fast flick: a big jump down and up should not leave studs stranded
await p.evaluate(() => scrollTo(0, 0));
await p.waitForTimeout(800);
await p.mouse.wheel(0, 1200); await p.waitForTimeout(700); await p.mouse.wheel(0, -1500); await p.waitForTimeout(1800);
const fl = await state();
console.log("after a fast flick down and up:", JSON.stringify({ y: fl.y, heroTop: fl.heroTop, tiles: fl.tiles, studsVisible: fl.studsVisible }), "C intact:", fl.sig === start.sig);

console.log("\nerrors:", errs.length ? errs.slice(0, 4) : "none");
await b.close();
