// What illustration / character style does lemlist use? Lists images and screenshots the character-like ones.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("../../docs/research/lemlist-mascots");
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
for (const url of ["https://www.lemlist.com/", "https://www.lemlist.com/about"]) {
  const tag = url.endsWith("about") ? "about" : "home";
  await p.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForTimeout(3500);
  for (const t of ["Reject all", "Decline", "No"]) { const el = p.getByRole("button", { name: new RegExp(`^${t}$`, "i") }).first(); if (await el.count()) { await el.click().catch(() => {}); break; } }
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 140)); } scrollTo(0, 0); });
  await p.waitForTimeout(800);
  const imgs = await p.evaluate(() => [...document.images].map((i) => ({ src: i.currentSrc.split("?")[0].slice(-70), alt: i.alt.slice(0, 50), w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height), y: Math.round(i.getBoundingClientRect().top + scrollY) })).filter((i) => i.w > 80));
  console.log(tag, "images >80px:", imgs.length);
  for (const i of imgs.slice(0, 40)) console.log("  ", `${i.w}x${i.h}`, `y=${i.y}`, i.alt || "-", "|", i.src);
  const kw = await p.evaluate(() => [...document.querySelectorAll("img,svg")].filter((e) => /mascot|character|lemon|illustration|lego|brick|dot/i.test((e.getAttribute("alt") || "") + (e.getAttribute("src") || "") + (e.getAttribute("class") || "") + (e.getAttribute("aria-label") || ""))).length);
  console.log(tag, "elements mentioning mascot/character/lemon/brick/dot:", kw);
  await p.screenshot({ path: path.join(OUT, `${tag}-top.png`) });
  const sections = await p.evaluate(() => [...document.querySelectorAll("section")].map((s, i) => { const r = s.getBoundingClientRect(); return { i, y: Math.round(r.top + scrollY), h: Math.round(r.height), t: (s.querySelector("h2,h1")?.textContent || "").trim().slice(0, 50) }; }).filter((s) => s.h > 300));
  console.log(tag, "sections:", sections.map((s) => `${s.i}@${s.y}(${s.h}) ${s.t}`).join(" | "));
}
await b.close();
