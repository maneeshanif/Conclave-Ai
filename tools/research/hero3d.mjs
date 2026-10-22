// Loads the home page with the WebGL hero (software GL), screenshots it and reports canvas, errors and frame rate.
// Usage: node hero3d.mjs [url=http://localhost:3001/?hero3d=force] [out]  (runs against an already-running server)
import { chromium } from "playwright";
const url = process.argv[2] ?? "http://localhost:3001/?hero3d=force";
const out = process.argv[3] ?? "../../docs/screens/hero3d.png";
const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--enable-webgl"] });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errs = [];
p.on("pageerror", (e) => errs.push("pageerror: " + e.message));
p.on("console", (m) => ["error", "warning"].includes(m.type()) && !/Download the React DevTools|Failed to load resource|Fast Refresh/.test(m.text()) && errs.push(m.type() + ": " + m.text().slice(0, 200)));
await p.goto(url, { waitUntil: "load" });
await p.mouse.move(900, 300);
await p.waitForTimeout(7000);
const info = await p.evaluate(() => {
  const c = document.querySelector("[data-hero-3d] canvas");
  const svgWrap = document.querySelector("[data-hero-scene] svg")?.closest("div");
  return { canvas: !!c, size: c ? `${c.width}x${c.height}` : null, svgOpacity: svgWrap ? getComputedStyle(svgWrap).opacity : null };
});
const fps = await p.evaluate(() => new Promise((res) => { let n = 0; const t0 = performance.now(); const f = () => { n++; performance.now() - t0 < 2000 ? requestAnimationFrame(f) : res(Math.round(n / 2)); }; requestAnimationFrame(f); }));
console.log("canvas:", JSON.stringify(info), "| fps (software GL):", fps);
console.log("errors:", errs.length ? errs.slice(0, 5) : "none");
await p.screenshot({ path: out });
console.log("saved", out);
await b.close();
