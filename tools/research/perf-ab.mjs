// Fair LCP comparison on a noisy machine: alternate the home page and a simple control page (same throttled phone profile,
// same moment), 6 samples each, and compare medians. Absolute numbers move with machine load; the ratio does not.
// Usage: node perf-ab.mjs [control=/security]   (production server on :3100)
import { chromium } from "playwright";
const BASE = "http://localhost:3100";
const CONTROL = process.argv[2] ?? "/security";
const b = await chromium.launch();

async function lcp(path) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  const p = await ctx.newPage();
  const c = await ctx.newCDPSession(p);
  await c.send("Network.enable");
  await c.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await c.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await p.addInitScript(() => { window.__m = { lcp: 0, fcp: 0 }; new PerformanceObserver((l) => { const e = l.getEntries().at(-1); if (e) window.__m.lcp = Math.round(e.startTime); }).observe({ type: "largest-contentful-paint", buffered: true }); new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.name === "first-contentful-paint") window.__m.fcp = Math.round(e.startTime); }).observe({ type: "paint", buffered: true }); });
  await p.goto(BASE + path, { waitUntil: "load" });
  await p.waitForTimeout(3500);
  const m = await p.evaluate(() => window.__m);
  await ctx.close();
  return m;
}
const med = (a) => a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)];
const home = { lcp: [], fcp: [] }, ctl = { lcp: [], fcp: [] };
for (let i = 0; i < 6; i++) {
  const h = await lcp("/"); home.lcp.push(h.lcp); home.fcp.push(h.fcp);
  const c = await lcp(CONTROL); ctl.lcp.push(c.lcp); ctl.fcp.push(c.fcp);
}
console.log(`home      LCP median ${med(home.lcp)}ms (${home.lcp.join(", ")}) | FCP median ${med(home.fcp)}ms`);
console.log(`${CONTROL.padEnd(9)} LCP median ${med(ctl.lcp)}ms (${ctl.lcp.join(", ")}) | FCP median ${med(ctl.fcp)}ms`);
console.log(`home / control LCP ratio: ${(med(home.lcp) / med(ctl.lcp)).toFixed(2)}`);
await b.close();
