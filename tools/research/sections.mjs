import { chromium } from "playwright";
import fs from "node:fs";

const out = "../../docs/research/lemlist-detail";
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("https://www.lemlist.com/", { waitUntil: "domcontentloaded", timeout: 60000 });
await p.waitForTimeout(4000);
// decline cookies
const no = p.getByRole("button", { name: /^No$/ }).first();
if (await no.count()) await no.click({ timeout: 2000 }).catch(() => {});

// scroll through once so lazy content and reveal animations settle
const H = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < H; y += 600) { await p.mouse.wheel(0, 600); await p.waitForTimeout(350); }
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(1200);

const data = await p.evaluate(() => {
  const px = (v) => v;
  const secs = [...document.querySelectorAll("main > *, body > section, body > div > section")]
    .filter((e) => e.getBoundingClientRect().height > 200);
  const uniq = [...new Set(secs)];
  return uniq.map((e, i) => {
    const r = e.getBoundingClientRect();
    const cs = getComputedStyle(e);
    const h = e.querySelector("h1,h2,h3");
    const hs = h ? getComputedStyle(h) : null;
    const btn = e.querySelector("a[class*=btn i],a[class*=button i],button");
    const bs = btn ? getComputedStyle(btn) : null;
    return {
      i, tag: e.tagName, cls: String(e.className).slice(0, 80), top: Math.round(r.top + scrollY), h: Math.round(r.height),
      bg: cs.backgroundColor, color: cs.color, padTop: cs.paddingTop,
      heading: h ? h.innerText.trim().replace(/\s+/g, " ").slice(0, 80) : null,
      hFont: hs ? `${hs.fontFamily.split(",")[0]} ${hs.fontSize}/${hs.lineHeight} w${hs.fontWeight} ls${hs.letterSpacing}` : null,
      btn: btn ? { text: btn.innerText.trim().slice(0, 30), bg: bs.backgroundColor, color: bs.color, radius: bs.borderRadius, h: Math.round(btn.getBoundingClientRect().height) } : null,
    };
  });
});

const tokens = await p.evaluate(() => {
  const g = (sel) => { const e = document.querySelector(sel); return e ? getComputedStyle(e) : null; };
  const nav = document.querySelector("nav, header");
  const nr = nav?.getBoundingClientRect();
  const navInner = nav ? [...nav.querySelectorAll("*")].find((e) => getComputedStyle(e).borderRadius.includes("px") && e.getBoundingClientRect().width > 800) : null;
  const ns = navInner ? getComputedStyle(navInner) : null;
  return {
    bodyBg: g("body").backgroundColor, bodyColor: g("body").color, bodyFont: g("body").fontFamily.split(",")[0], bodySize: g("body").fontSize,
    nav: ns ? { bg: ns.backgroundColor, radius: ns.borderRadius, w: Math.round(navInner.getBoundingClientRect().width), h: Math.round(navInner.getBoundingClientRect().height), top: Math.round(navInner.getBoundingClientRect().top), shadow: ns.boxShadow.slice(0, 80) } : null,
    h1: (() => { const s = g("h1"); return s ? `${s.fontSize}/${s.lineHeight} w${s.fontWeight} ls${s.letterSpacing}` : null; })(),
    h2: (() => { const s = g("h2"); return s ? `${s.fontSize}/${s.lineHeight} w${s.fontWeight} ls${s.letterSpacing}` : null; })(),
    colors: [...new Set([...document.querySelectorAll("section *, main *")].slice(0, 1500).map((e) => getComputedStyle(e).backgroundColor).filter((c) => c !== "rgba(0, 0, 0, 0)"))].slice(0, 14),
    textColors: [...new Set([...document.querySelectorAll("h1,h2,h3,p,a")].slice(0, 400).map((e) => getComputedStyle(e).color))].slice(0, 10),
    radii: [...new Set([...document.querySelectorAll("section *")].slice(0, 1500).map((e) => getComputedStyle(e).borderRadius).filter((r) => r !== "0px"))].slice(0, 12),
  };
});

fs.writeFileSync(`${out}/structure.json`, JSON.stringify({ sections: data, tokens }, null, 2));

// one screenshot per section, full width
let n = 0;
const handles = await p.$$("main > *, body > section, body > div > section");
for (const h of handles) {
  const box = await h.boundingBox().catch(() => null);
  if (!box || box.height < 200) continue;
  await h.scrollIntoViewIfNeeded().catch(() => {});
  await p.waitForTimeout(900);
  const name = `sec-${String(n).padStart(2, "0")}.png`;
  await h.screenshot({ path: `${out}/${name}`, timeout: 15000 }).catch(() => {});
  n++;
  if (n > 24) break;
}
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(800);
await p.screenshot({ path: `${out}/full-page.png`, fullPage: true });

// mobile view
const m = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
await m.goto("https://www.lemlist.com/", { waitUntil: "domcontentloaded" });
await m.waitForTimeout(3500);
await m.screenshot({ path: `${out}/mobile-top.png` });

// nav hover + dropdown state
await p.goto("https://www.lemlist.com/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(3000);
const prod = p.getByText("Product", { exact: true }).first();
await prod.hover().catch(() => {});
await p.waitForTimeout(800);
await p.screenshot({ path: `${out}/nav-dropdown.png` });

console.log(JSON.stringify({ sections: data.length, shots: n, tokens }, null, 2));
await b.close();
