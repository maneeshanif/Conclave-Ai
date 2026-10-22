// Second pass: hero load sequence, sticky feature stack, accordion, card hover scale. Frames saved for review.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("../../docs/research/lemlist-motion");
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();

// A. Hero load: sample opacity/transform of first headings and nav at 0,150,400,900,1800ms
await p.goto("https://www.lemlist.com/", { waitUntil: "commit" });
const load = [];
for (const t of [60, 200, 450, 900, 1800, 3000]) {
  await p.waitForTimeout(t - (load.at(-1)?.t ?? 0));
  load.push({ t, ...(await p.evaluate(() => {
    const q = (s) => { const e = document.querySelector(s); if (!e) return null; const c = getComputedStyle(e); return `${c.opacity} ${c.transform === "none" ? "-" : c.transform}`; };
    return { h1: q("h1"), nav: q("nav"), p: q("h1 ~ p, h1 + div p"), ctaFirst: q("main a[href*=demo], main a[class*=button], main button") };
  })) });
  if (t === 450 || t === 3000) await p.screenshot({ path: path.join(OUT, `hero-${t}ms.png`) });
}
console.log("hero load:", JSON.stringify(load));
await p.waitForTimeout(1500);

// B. Sticky elements and the feature-card region
const sticky = await p.evaluate(() => [...document.querySelectorAll("*")].filter((e) => getComputedStyle(e).position === "sticky").map((e) => `${e.tagName.toLowerCase()}.${String(e.className).slice(0, 60)} top=${getComputedStyle(e).top} h=${Math.round(e.getBoundingClientRect().height)}`).slice(0, 12));
console.log("sticky:", sticky);

const feat = await p.evaluate(() => {
  const h = [...document.querySelectorAll("a,div")].find((e) => /^01\s*Find leads/.test((e.textContent || "").trim()) && e.getBoundingClientRect().height > 100);
  if (!h) return null;
  h.scrollIntoView({ block: "center" });
  const r = h.getBoundingClientRect();
  return { y: Math.round(r.top + scrollY), h: Math.round(r.height), cls: String(h.className).slice(0, 120), parentCls: String(h.parentElement.className).slice(0, 120) };
});
console.log("feature card:", JSON.stringify(feat));
if (feat) {
  for (let i = 0; i < 6; i++) {
    await p.evaluate((y) => scrollTo(0, y), feat.y - 300 + i * 220);
    await p.waitForTimeout(700);
    await p.screenshot({ path: path.join(OUT, `feat-${i}.png`) });
  }
  // hover: image scale
  const card = p.locator("a.group").filter({ hasText: /Find leads/ }).first();
  if (await card.count()) {
    await card.scrollIntoViewIfNeeded();
    const sc = () => card.evaluate((e) => [...e.querySelectorAll("*")].map((x) => getComputedStyle(x).transform).filter((t) => t !== "none").slice(0, 3));
    const a = await sc(); await card.hover(); await p.waitForTimeout(500); const c = await sc();
    console.log("card hover transforms:", JSON.stringify(a), "->", JSON.stringify(c));
    await p.screenshot({ path: path.join(OUT, "card-hover.png") });
  }
}

// C. Accordion (FAQ): open one, time it
const sum = p.locator("button:has-text('?')").first();
if (await sum.count()) {
  await sum.scrollIntoViewIfNeeded();
  const grid = () => p.evaluate(() => [...document.querySelectorAll("div.grid")].filter((e) => getComputedStyle(e).transitionProperty.includes("grid-template-rows")).slice(0, 3).map((e) => getComputedStyle(e).gridTemplateRows));
  console.log("accordion rows before:", await grid());
  await sum.click(); await p.waitForTimeout(100);
  console.log("accordion rows +100ms:", await grid());
  await p.waitForTimeout(500);
  console.log("accordion rows +600ms:", await grid());
}
await b.close();
