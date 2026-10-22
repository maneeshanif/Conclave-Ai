// Measures how lemlist.com animates: libraries, scroll reveals, hover and transition values.
// Pattern research only. Output: docs/research/lemlist-motion/{motion.json,notes}
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("../../docs/research/lemlist-motion");
fs.mkdirSync(OUT, { recursive: true });

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("https://www.lemlist.com/", { waitUntil: "domcontentloaded", timeout: 60000 });
await p.waitForTimeout(4000);
// dismiss cookie banners if present (decline non-essential)
for (const t of ["Reject all", "Decline", "Only necessary", "Refuse"]) {
  const el = p.getByRole("button", { name: new RegExp(t, "i") }).first();
  if (await el.count()) { await el.click().catch(() => {}); break; }
}

const result = {};

// 1. Libraries
result.libs = await p.evaluate(() => ({
  gsap: !!window.gsap, ScrollTrigger: !!window.ScrollTrigger, Lenis: !!window.Lenis || !!window.lenis,
  webflow: !!window.Webflow, ix2: !!document.querySelector("[data-w-id]"),
  aos: !!document.querySelector("[data-aos]"), framer: !!document.querySelector("[data-framer-name]"),
  lottie: !!window.lottie || !!document.querySelector("lottie-player, [data-animation-type='lottie']"),
  nextjs: !!window.__NEXT_DATA__, nuxt: !!window.__NUXT__,
  scripts: [...document.scripts].map((s) => s.src).filter(Boolean).slice(0, 40),
  htmlClasses: document.documentElement.className.slice(0, 200),
  scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
}));

// 2. Transition inventory
result.transitions = await p.evaluate(() => {
  const m = new Map();
  for (const el of document.querySelectorAll("*")) {
    const cs = getComputedStyle(el);
    if (cs.transitionDuration && cs.transitionDuration !== "0s") {
      const k = `${cs.transitionProperty} | ${cs.transitionDuration} | ${cs.transitionTimingFunction}`;
      const e = m.get(k) || { n: 0, sample: "" };
      e.n++; if (!e.sample) e.sample = `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 50)}`;
      m.set(k, e);
    }
  }
  return [...m.entries()].sort((a, b) => b[1].n - a[1].n).slice(0, 25).map(([k, v]) => ({ k, ...v }));
});

// 3. Keyframes defined
result.keyframes = await p.evaluate(() => {
  const out = [];
  for (const ss of document.styleSheets) {
    let rules; try { rules = ss.cssRules; } catch { continue; }
    for (const r of rules) if (r.type === CSSRule.KEYFRAMES_RULE) out.push(`${r.name}: ${r.cssText.replace(/\s+/g, " ").slice(0, 160)}`);
  }
  return out.slice(0, 30);
});
result.animatedElements = await p.evaluate(() =>
  [...document.querySelectorAll("*")].filter((el) => getComputedStyle(el).animationName !== "none").slice(0, 25).map((el) => {
    const cs = getComputedStyle(el);
    return `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)} -> ${cs.animationName} ${cs.animationDuration} ${cs.animationTimingFunction} ${cs.animationIterationCount}`;
  }));

// 4. Scroll reveals: sample transform/opacity of every visible-ish element at scroll steps
const H = await p.evaluate(() => document.documentElement.scrollHeight);
result.pageHeight = H;
const snap = () => p.evaluate(() => {
  const o = {};
  document.querySelectorAll("h1,h2,h3,p,img,video,svg,section,[class*=card],[class*=Card],a,button").forEach((el, i) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    o[i] = [cs.opacity, cs.transform === "none" ? "" : cs.transform, Math.round(r.top + scrollY), el.tagName.toLowerCase() + "." + String(el.className.baseVal ?? el.className).slice(0, 40), (el.textContent || "").trim().slice(0, 30)];
  });
  return o;
});
const before = await snap();
const changed = new Map();
for (let y = 0; y < Math.min(H, 14000); y += 450) {
  await p.mouse.wheel(0, 450);
  await p.waitForTimeout(260);
  const s = await snap();
  for (const k of Object.keys(s)) {
    const a = s[k], c = before[k];
    if (c && (a[0] !== c[0] || a[1] !== c[1]) && !changed.has(k)) changed.set(k, { from: { opacity: c[0], transform: c[1] }, to: { opacity: a[0], transform: a[1] }, at: y, el: a[3], text: a[4] });
  }
}
result.scrollChanges = [...changed.values()].slice(0, 60);
result.scrollChangeCount = changed.size;

// 5. Hover states: buttons, nav links, cards
await p.evaluate(() => scrollTo(0, 0));
await p.waitForTimeout(600);
const targets = await p.evaluate(() => {
  const pick = (sel, n) => [...document.querySelectorAll(sel)].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 40 && r.height > 20; }).slice(0, n).map((e) => { e.setAttribute("data-mt", Math.random().toString(36).slice(2)); return e.getAttribute("data-mt"); });
  return { nav: pick("nav a", 3), btn: pick("a[class*=utton], button", 4), card: pick("[class*=card], [class*=Card]", 3) };
});
const props = ["backgroundColor", "color", "transform", "boxShadow", "borderColor", "opacity"];
result.hover = [];
for (const [kind, ids] of Object.entries(targets)) {
  for (const id of ids) {
    const el = p.locator(`[data-mt="${id}"]`).first();
    await el.scrollIntoViewIfNeeded().catch(() => {});
    const read = () => el.evaluate((e, pr) => { const cs = getComputedStyle(e); return Object.fromEntries(pr.map((k) => [k, cs[k]])).constructor === Object ? { ...Object.fromEntries(pr.map((k) => [k, cs[k]])), tr: cs.transition.slice(0, 80), text: (e.textContent || "").trim().slice(0, 24) } : {}; }, props);
    const a = await read();
    await el.hover({ timeout: 2000 }).catch(() => {});
    await p.waitForTimeout(450);
    const c = await read();
    const diff = Object.fromEntries(props.filter((k) => a[k] !== c[k]).map((k) => [k, `${a[k]} -> ${c[k]}`]));
    result.hover.push({ kind, text: a.text, transition: a.tr, diff });
  }
}

// 6. Cursor + scroll-driven (parallax) check: compare element y shift for first image vs scroll
result.cursor = await p.evaluate(() => getComputedStyle(document.body).cursor);

fs.writeFileSync(path.join(OUT, "motion.json"), JSON.stringify(result, null, 2));
console.log("libs:", JSON.stringify({ ...result.libs, scripts: result.libs.scripts.length }));
console.log("top transitions:\n" + result.transitions.slice(0, 10).map((t) => `  ${t.n}x ${t.k}  (${t.sample})`).join("\n"));
console.log("keyframes:", result.keyframes.length, result.keyframes.slice(0, 6));
console.log("scroll-changed elements:", result.scrollChangeCount);
for (const c of result.scrollChanges.slice(0, 14)) console.log("  ", c.el.slice(0, 30), JSON.stringify(c.from), "->", JSON.stringify(c.to), "@", c.at);
console.log("hover:");
for (const h of result.hover) console.log("  ", h.kind, JSON.stringify(h.text), JSON.stringify(h.diff), "|", h.transition);
await b.close();
