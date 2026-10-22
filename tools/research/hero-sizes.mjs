// The crew row must sit below the headline and clear of the supporting text and buttons at every desktop size,
// and must follow the headline when the window is resized. Runs against a running server.
// Usage: BASE=http://localhost:3001 node hero-sizes.mjs
import { chromium } from "playwright";
const ROOT = process.env.BASE ?? "http://localhost:3001";
const b = await chromium.launch();
let fail = 0;
const ok = (n, c, x = "") => { if (!c) fail++; console.log((c ? "ok   " : "FAIL ") + n + (x ? "  " + x : "")); };

const measure = (p) => p.evaluate(() => {
  const r = (e) => e.getBoundingClientRect();
  const tiles = [...document.querySelectorAll("[data-tile]")].filter((g) => +getComputedStyle(g).opacity > 0.9).map((g) => r(g));
  if (tiles.length !== 7) return { tiles: tiles.length };
  const lines = [...document.querySelectorAll("[data-hero-line]")].map(r);
  const sub = r(document.querySelector("[data-hero-fade] p"));
  const btns = [...document.querySelectorAll("[data-hero-fade] a")].map(r);
  return {
    tiles: 7,
    top: Math.min(...tiles.map((t) => t.top)), bottom: Math.max(...tiles.map((t) => t.bottom)),
    left: Math.min(...tiles.map((t) => t.left)), right: Math.max(...tiles.map((t) => t.right)),
    h1Bottom: Math.max(...lines.map((l) => l.bottom)), subRight: sub.right, subTop: sub.top,
    btnTop: Math.min(...btns.map((x) => x.top)), btnLeft: Math.min(...btns.map((x) => x.left)),
    size: tiles[0].width, vw: innerWidth,
  };
});

for (const [w, h] of [[1024, 768], [1280, 720], [1366, 768], [1440, 900], [1536, 864], [1920, 1080], [2560, 1300]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  await p.goto(ROOT + "/", { waitUntil: "load" });
  await p.mouse.move(w / 2, h / 2);
  await p.waitForTimeout(4500);
  for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 60); await p.waitForTimeout(220); }
  await p.waitForTimeout(1500);
  const m = await measure(p);
  if (m.tiles !== 7) { ok(`${w}x${h}: all seven tiles shown`, false, JSON.stringify(m)); await p.close(); continue; }
  const belowTitle = m.top >= m.h1Bottom + 8;
  const clearOfText = !(m.left < m.subRight + 12 && m.bottom > m.subTop);     // not on top of the supporting text
  const clearOfBtns = m.bottom <= m.btnTop - 8 || m.right <= m.btnLeft - 8;  // not on top of the buttons
  const inView = m.left >= 0 && m.right <= m.vw;
  ok(`${w}x${h}: row is below the title, clear of the text and buttons, inside the window`, belowTitle && clearOfText && clearOfBtns && inView,
    `tiles ${Math.round(m.size)}px at y ${Math.round(m.top)}-${Math.round(m.bottom)}; title ends ${Math.round(m.h1Bottom)}; buttons start ${Math.round(m.btnTop)}`);
  const wrap = await p.evaluate(() => { const l = [...document.querySelectorAll("[data-hero-line]")]; const fs = parseFloat(getComputedStyle(document.querySelector("h1")).fontSize); return { lines: l.map((e) => Math.round(e.getBoundingClientRect().height / fs * 100) / 100), fs: Math.round(fs) }; });
  ok(`${w}x${h}: each headline line stays on one line (no stray letters)`, wrap.lines.every((x) => x < 1.5), JSON.stringify(wrap));
  await p.screenshot({ path: `../../docs/screens/hero-live/size-${w}x${h}.png` });
  await p.close();
}

// resize: start wide, shrink, and the row must follow the headline
{
  const p = await (await b.newContext({ viewport: { width: 1600, height: 900 } })).newPage();
  await p.goto(ROOT + "/", { waitUntil: "load" });
  await p.waitForTimeout(4500);
  await p.setViewportSize({ width: 1180, height: 760 });
  await p.waitForTimeout(1200);
  for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 60); await p.waitForTimeout(220); }
  await p.waitForTimeout(1500);
  const m = await measure(p);
  ok("after resizing 1600 to 1180: row re-laid out below the title", m.tiles === 7 && m.top >= m.h1Bottom + 8 && m.right <= m.vw, JSON.stringify({ top: Math.round(m.top), h1Bottom: Math.round(m.h1Bottom), right: Math.round(m.right), vw: m.vw }));
  await p.screenshot({ path: "../../docs/screens/hero-live/after-resize.png" });
}
// narrow desktop and phone: no split, the assembled C only
for (const [w, h] of [[900, 800], [390, 844]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  await p.goto(ROOT + "/", { waitUntil: "load" });
  await p.waitForTimeout(4500);
  for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 60); await p.waitForTimeout(150); }
  const m = await p.evaluate(() => ({ tiles: document.querySelectorAll("[data-tile]").length, top: Math.round(document.querySelector("[data-hero]").getBoundingClientRect().top), over: document.documentElement.scrollWidth > innerWidth }));
  ok(`${w}px: no split (assembled C only), no overflow`, m.tiles === 0 && !m.over, JSON.stringify(m));
  await p.close();
}
await b.close();
console.log(fail ? `FAILED: ${fail}` : "HERO SIZES ALL OK");
