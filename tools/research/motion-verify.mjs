// Verifies the motion system on the production build: start states, hero intro, scroll reveals, sticky stack,
// accordion, waveform, hero scene, cursor, reduced-motion fallback and the mobile tab fix. Starts and stops its own server.
import { chromium } from "playwright";
import { spawn, execSync } from "node:child_process";
import fs from "node:fs";

const PORT = 3100;
const OUT = "../../docs/screens/motion";
fs.mkdirSync(OUT, { recursive: true });
const server = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: "../..", shell: true, stdio: "ignore" });
const stop = () => { try { execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: "ignore" }); } catch {} };
process.on("exit", stop);
for (let i = 0; i < 60; i++) { try { if ((await fetch(`http://localhost:${PORT}/`)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 500)); }

const URL = `http://localhost:${PORT}/`;
const b = await chromium.launch();
let fail = 0;
const check = (name, ok, extra = "") => { if (!ok) fail++; console.log((ok ? "ok   " : "FAIL ") + name + (extra ? "  " + extra : "")); };

/* ---------- desktop, motion on ---------- */
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errors = [];
p.on("pageerror", (e) => errors.push(e.message));
p.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await p.goto(URL, { waitUntil: "commit" });
const frames = [];
for (const t of [120, 450, 900, 1800]) {
  await p.waitForTimeout(t - (frames.at(-1)?.t ?? 0));
  frames.push({ t, ...(await p.evaluate(() => {
    const l = [...document.querySelectorAll("[data-hero-line]")].map((e) => { const c = getComputedStyle(e); return `${(+c.opacity).toFixed(2)}`; });
    return { lines: l, armed: document.documentElement.classList.contains("motion-ok") };
  })) });
  await p.screenshot({ path: `${OUT}/hero-${t}ms.png` });
}
console.log("hero frames:", JSON.stringify(frames.map((f) => [f.t, f.lines.join("/")])));
check("motion armed by inline script", frames[1].armed);
check("hero lines start hidden and end visible", Number(frames[0].lines[0]) < 0.9 && frames.at(-1).lines.every((v) => v === "1.00"));
await p.waitForLoadState("networkidle");

/* hero scene drifts */
const cx = () => p.evaluate(() => document.querySelector("[data-node]")?.getAttribute("transform"));
const a = await cx(); await p.mouse.move(300, 200); await p.waitForTimeout(700); const c = await cx();
check("hero scene nodes move with time and pointer", a !== c, `${a} -> ${c}`);

/* waveform breathes */
const bar = () => p.evaluate(() => getComputedStyle(document.querySelector("[data-hero-pill] span")).transform);
const w1 = await bar(); await p.waitForTimeout(500); const w2 = await bar();
check("hero waveform animates", w1 !== w2, `${w1.slice(0, 28)} -> ${w2.slice(0, 28)}`);

/* cursor ring follows */
await p.mouse.move(700, 450); await p.waitForTimeout(500);
const ring = await p.evaluate(() => { const r = document.querySelector("body > div.fixed[aria-hidden]")?.getBoundingClientRect(); return r && [Math.round(r.left + r.width / 2), Math.round(r.top + r.height / 2)]; });
check("cursor ring follows pointer", ring && Math.abs(ring[0] - 700) < 6 && Math.abs(ring[1] - 450) < 6, JSON.stringify(ring));

/* scroll reveal on a fresh page: below-fold items start hidden, then play when reached (once) */
const fresh = await ctx.newPage();
await fresh.goto(URL, { waitUntil: "networkidle" });
await fresh.waitForTimeout(800);
const op = () => fresh.evaluate(() => { const e = document.querySelector("#manifesto").closest("section").previousElementSibling.querySelector("[data-reveal]"); return e ? +getComputedStyle(e).opacity : -1; });
const hiddenBefore = await op();
check("below-fold reveal starts hidden", hiddenBefore >= 0 && hiddenBefore < 0.5, `opacity ${hiddenBefore}`);
/* manifesto words dim at first and brighten as you scroll */
const wordsAt = async (frac) => { await fresh.evaluate((f) => { const r = document.querySelector("#manifesto").getBoundingClientRect(); scrollTo(0, scrollY + r.top - innerHeight * f); }, frac); await fresh.waitForTimeout(900); return fresh.evaluate(() => { const o = [...document.querySelectorAll("#manifesto *")].map((e) => +getComputedStyle(e).opacity); return { dim: o.filter((v) => v < 0.9).length, total: o.length }; }); };
const early = await wordsAt(0.75), late = await wordsAt(0.15);
check("manifesto words dim, then brighten with scroll", early.dim > late.dim && early.dim > 5, `dim at entry ${early.dim}/${early.total} -> after scrolling ${late.dim}`);
await fresh.close();
/* sticky services stack */
const stack = await p.evaluate(() => { const ol = document.querySelector("[data-stack]"); const li = ol.children[0]; ol.scrollIntoView(); return { n: ol.children.length, sticky: getComputedStyle(li).position }; });
check("services stack uses sticky cards", stack.sticky === "sticky" && stack.n === 5, JSON.stringify(stack));
const info = await p.evaluate(() => { const li = document.querySelectorAll("[data-stack] > li"); const r = li[1].getBoundingClientRect(); return { y: scrollY + r.top, h: li[0].getBoundingClientRect().height }; });
let scaled = 1, pinned = null;
for (let i = 0; i < 7; i++) {
  await p.evaluate((y) => scrollTo(0, y), info.y - 700 + i * 150);
  await p.waitForTimeout(350);
  const s = await p.evaluate(() => { const li = document.querySelectorAll("[data-stack] > li"); return { t0: Math.round(li[0].getBoundingClientRect().top), tf: li[0].style.transform }; });
  const m = /matrix\(([\d.]+)/.exec(await p.evaluate(() => getComputedStyle(document.querySelectorAll("[data-stack] > li")[0]).transform));
  if (m) scaled = Math.min(scaled, +m[1]);
  pinned = s.t0;
  await p.screenshot({ path: `${OUT}/stack-${i}.png` });
}
check("covered card scales back while next slides over", scaled < 0.99, `min scale ${scaled.toFixed(3)}, first card pinned top ${pinned}`);

/* mock-ups play on entering view */
await p.evaluate(() => document.querySelector("#voice")?.scrollIntoView({ block: "center" })); await p.waitForTimeout(1800);
const popped = await p.evaluate(() => [...document.querySelectorAll("#voice [data-pop]")].every((e) => +getComputedStyle(e).opacity === 1));
check("voice mock-up bubbles popped in", popped);
await p.evaluate(() => document.querySelector("#reporting")?.scrollIntoView({ block: "center" })); await p.waitForTimeout(2200);
const rep = await p.evaluate(() => ({ count: document.querySelector("#reporting [data-count]")?.textContent, bars: [...document.querySelectorAll("#reporting [data-bar]")].every((e) => +getComputedStyle(e).opacity === 1) }));
check("report numbers counted up and bars grew", rep.count === "128" && rep.bars, JSON.stringify(rep));

/* accordion animates */
const q = p.getByRole("button", { name: /Will callers know/ });
await q.scrollIntoViewIfNeeded();
const rows = () => p.evaluate(() => getComputedStyle(document.getElementById("faq-a-0")).gridTemplateRows);
const r0 = await rows(); await q.click(); await p.waitForTimeout(90); const r1 = await rows(); await p.waitForTimeout(500); const r2 = await rows();
check("accordion height animates (0 -> mid -> full)", r0 === "0px" && parseFloat(r1) > 0 && parseFloat(r1) < parseFloat(r2), `${r0} -> ${r1} -> ${r2}`);
check("accordion aria-expanded", (await q.getAttribute("aria-expanded")) === "true");

/* nothing is left stuck hidden after scrolling the whole page */
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } });
await p.waitForTimeout(1500);
const stuck = await p.evaluate(() => [...document.querySelectorAll("[data-reveal],[data-stagger]>*,[data-hero-fade],[data-hero-line]")].filter((e) => +getComputedStyle(e).opacity < 0.99).map((e) => e.tagName + "." + String(e.className).slice(0, 30)));
check("no element stuck hidden after a full scroll", stuck.length === 0, stuck.slice(0, 4).join(", "));
check("no console or page errors (desktop)", errors.length === 0, [...new Set(errors)].slice(0, 3).join(" | "));
await p.screenshot({ path: `${OUT}/desktop-end.png` });

/* route change re-arms motion on an inner page */
await p.evaluate(() => scrollTo(0, 0));
await p.click('a[href="/services"]'); await p.waitForTimeout(1500);
const inner = await p.evaluate(() => [...document.querySelectorAll("h1")].map((e) => +getComputedStyle(e).opacity));
check("inner page header revealed after client navigation", inner.length > 0 && inner.every((v) => v === 1), JSON.stringify(inner));
await ctx.close();

/* ---------- reduced motion: everything visible, nothing armed ---------- */
const rctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const rp = await rctx.newPage();
await rp.goto(URL, { waitUntil: "networkidle" });
const red = await rp.evaluate(() => ({ armed: document.documentElement.classList.contains("motion-ok"), hidden: [...document.querySelectorAll("[data-reveal],[data-hero-line],[data-stagger]>*")].filter((e) => +getComputedStyle(e).opacity < 1).length, ring: !!document.querySelector("body > div.fixed[aria-hidden]") && +getComputedStyle(document.querySelector("body > div.fixed[aria-hidden]")).opacity }));
check("reduced motion: not armed, nothing hidden, cursor ring stays off", !red.armed && red.hidden === 0 && red.ring === 0, JSON.stringify(red));
await rctx.close();

/* ---------- mobile ---------- */
const mctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const mp = await mctx.newPage();
const merr = [];
mp.on("pageerror", (e) => merr.push(e.message));
await mp.goto(URL, { waitUntil: "networkidle" });
await mp.waitForTimeout(1600);
const mob = await mp.evaluate(() => {
  const W = document.documentElement.clientWidth;
  const tabs = [...document.querySelectorAll('[role="tab"]')].map((t) => t.scrollWidth <= t.clientWidth + 1 && t.getBoundingClientRect().right <= W);
  const sticky = getComputedStyle(document.querySelector("[data-stack] > li")).position;
  return { over: document.documentElement.scrollWidth > W, tabsFit: tabs.every(Boolean), n: tabs.length, sticky, ring: !!document.querySelector("body > div.fixed[aria-hidden]") && +getComputedStyle(document.querySelector("body > div.fixed[aria-hidden]")).opacity };
});
check("mobile: no horizontal overflow", !mob.over);
check("mobile: all four demo tabs fit without cut-off labels", mob.tabsFit && mob.n === 4);
check("mobile: services cards not sticky, cursor ring off", mob.sticky === "static" && mob.ring === 0, JSON.stringify(mob));
check("mobile: no page errors", merr.length === 0, merr.join("|"));
await mp.screenshot({ path: `${OUT}/mobile-top.png` });
await mp.evaluate(() => document.querySelector('[role="tablist"]').scrollIntoView({ block: "center" })); await mp.waitForTimeout(900);
await mp.screenshot({ path: `${OUT}/mobile-tabs.png` });
await mctx.close();

await b.close();
stop();
console.log(fail ? `FAILED: ${fail}` : "MOTION CHECKS ALL OK");
process.exit(0);
