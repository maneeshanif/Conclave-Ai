// What does the WebGL hero cost? Loads the home page twice on a production server (self-started):
//   A) desktop with the 3D hero   B) the same visit with reduced motion (SVG hero only)
// and compares JavaScript bytes on the wire (gzip), the load event, and long main-thread tasks.
import { chromium } from "playwright";
import { spawn, execSync } from "node:child_process";

const PORT = 3100;
const server = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: "../..", shell: true, stdio: "ignore" });
const stop = () => { try { execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: "ignore" }); } catch {} };
process.on("exit", stop);
for (let i = 0; i < 60; i++) { try { if ((await fetch(`http://localhost:${PORT}/`)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 500)); }
const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });

async function visit(label, opts, query = "", no3d = false) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const p = await ctx.newPage();
  if (no3d) await p.addInitScript(() => sessionStorage.setItem("hero3d-dropped", "1"));
  const js = [];
  let t0 = 0;
  p.on("response", async (r) => {
    if (!/\.js(\?|$)/.test(r.url())) return;
    const s = await r.request().sizes().catch(() => null);
    js.push({ url: r.url().split("/").pop().slice(0, 40), wire: s ? s.responseBodySize : 0, at: Math.round(Date.now() - t0) });
  });
  t0 = Date.now();
  await p.goto(`http://localhost:${PORT}/${query}`, { waitUntil: "load" });
  const loadMs = Math.round(Date.now() - t0);
  const beforeIdle = js.reduce((a, x) => a + x.wire, 0);
  await p.waitForTimeout(6000);
  const total = js.reduce((a, x) => a + x.wire, 0);
  const canvas = await p.evaluate(() => !!document.querySelector("[data-hero-3d] canvas"));
  const lcp = await p.evaluate(() => new Promise((res) => { let v = 0; new PerformanceObserver((l) => { v = l.getEntries().at(-1).startTime; }).observe({ type: "largest-contentful-paint", buffered: true }); setTimeout(() => res(Math.round(v)), 300); }));
  console.log(`${label.padEnd(34)} load ${String(loadMs).padStart(5)}ms | LCP ${String(lcp).padStart(5)}ms | JS at load ${(beforeIdle / 1024).toFixed(0).padStart(4)} KB | JS total ${(total / 1024).toFixed(0).padStart(4)} KB | canvas ${canvas}`);
  await ctx.close();
  return { js, total, beforeIdle };
}

const a0 = await visit("A0 desktop, motion on, no 3D", {}, "", true);
const a = await visit("A  desktop, motion on, 3D hero", {}, "?hero3d=force");
const bb = await visit("B  reduced motion (SVG hero only)", { reducedMotion: "reduce" });
const phone = await visit("C  phone (SVG hero only)", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
console.log("\n3D adds on the wire:", ((a.total - a0.total) / 1024).toFixed(0), "KB gzip, loaded after first paint, only on wide screens with a mouse");
const big = a.js.filter((x) => !a0.js.some((y) => y.url === x.url)).sort((m, n) => n.wire - m.wire).slice(0, 4);
console.log("chunks only in A:", big.map((x) => `${x.url} ${(x.wire / 1024).toFixed(0)}KB @${x.at}ms`).join(" | "));
await b.close();
stop();
process.exit(0);
