import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [, , url, outDir] = process.argv;
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(4000);

// dismiss common cookie banners (decline / reject)
for (const t of ["Reject all", "Decline", "Reject", "Only necessary", "Refuse"]) {
  const b = page.getByRole("button", { name: new RegExp(t, "i") }).first();
  if (await b.count()) { await b.click({ timeout: 1500 }).catch(() => {}); break; }
}

const notes = { url, title: await page.title(), sections: [], hovers: [] };
const total = await page.evaluate(() => document.documentElement.scrollHeight);
notes.pageHeight = total;

// slow scroll, one screenshot per viewport
let i = 0;
for (let y = 0; y < total; y += 700) {
  await page.mouse.wheel(0, y === 0 ? 0 : 700);
  await page.waitForTimeout(1200);
  const file = `scroll-${String(i).padStart(2, "0")}.png`;
  await page.screenshot({ path: path.join(outDir, file) });
  const heads = await page.evaluate(() =>
    [...document.querySelectorAll("h1,h2,h3")]
      .filter((e) => { const r = e.getBoundingClientRect(); return r.top >= 0 && r.top < innerHeight; })
      .map((e) => e.innerText.trim().replace(/\s+/g, " ").slice(0, 90))
  );
  notes.sections.push({ file, scrollY: y, headings: heads });
  i++;
  if (i > 40) break;
}

// hover states: nav items + buttons
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1000);
const targets = await page.$$("header a, nav a, header button, a[class*='button' i], a[class*='btn' i], button");
let h = 0;
for (const el of targets.slice(0, 14)) {
  if (!(await el.isVisible().catch(() => false))) continue;
  const label = ((await el.innerText().catch(() => "")) || "").trim().replace(/\s+/g, " ").slice(0, 40);
  await el.scrollIntoViewIfNeeded().catch(() => {});
  await el.hover({ timeout: 2000 }).catch(() => {});
  await page.waitForTimeout(500);
  const file = `hover-${String(h).padStart(2, "0")}.png`;
  await page.screenshot({ path: path.join(outDir, file) });
  notes.hovers.push({ file, label });
  h++;
  if (h >= 10) break;
}

// motion/library fingerprints
notes.stack = await page.evaluate(() => ({
  gsap: !!window.gsap, scrollTrigger: !!window.ScrollTrigger, lenis: !!window.Lenis || !!document.querySelector(".lenis"),
  three: !!window.THREE, videos: document.querySelectorAll("video").length, canvases: document.querySelectorAll("canvas").length,
  fonts: [...new Set([...document.querySelectorAll("h1,h2,p,a")].slice(0, 30).map((e) => getComputedStyle(e).fontFamily.split(",")[0]))],
  navPosition: (() => { const n = document.querySelector("nav,header"); return n ? getComputedStyle(n).position : null; })(),
  cursorHidden: getComputedStyle(document.body).cursor,
}));

fs.writeFileSync(path.join(outDir, "notes.json"), JSON.stringify(notes, null, 2));
console.log(JSON.stringify({ shots: i, hovers: h, stack: notes.stack, title: notes.title }, null, 2));
await browser.close();
