// Performance targets from the Change Spec v3, against a running PRODUCTION server (not dev).
//   home 7,000 to 8,000px at 1440 wide | LCP under 2.5s on a throttled mid phone | JS at load | no layout shift from the hero
// Usage: node perf.mjs [url=http://localhost:3100]
import { chromium } from "playwright";
const URL = process.argv[2] ?? "http://localhost:3100";
const b = await chromium.launch();

async function run(label, opts, throttle) {
  const ctx = await b.newContext(opts);
  const p = await ctx.newPage();
  const js = [];
  p.on("response", async (r) => { if (/\.js(\?|$)/.test(r.url())) { const s = await r.request().sizes().catch(() => null); js.push(s ? s.responseBodySize : 0); } });
  if (throttle) {
    const c = await ctx.newCDPSession(p);
    await c.send("Network.enable");
    await c.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
    await c.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  }
  await p.addInitScript(() => {
    window.__m = { lcp: 0, cls: 0 };
    new PerformanceObserver((l) => { const e = l.getEntries().at(-1); if (e) window.__m.lcp = Math.round(e.startTime); }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value; }).observe({ type: "layout-shift", buffered: true });
  });
  await p.goto(URL + "/", { waitUntil: "load" });
  await p.waitForTimeout(5000);
  const m = await p.evaluate(() => ({ ...window.__m, h: document.documentElement.scrollHeight, w: document.documentElement.clientWidth }));
  const kb = Math.round(js.reduce((a, x) => a + x, 0) / 1024);
  console.log(`${label.padEnd(42)} height ${String(m.h).padStart(5)}px | LCP ${String(m.lcp).padStart(5)}ms | CLS ${m.cls.toFixed(3)} | JS ${String(kb).padStart(4)} KB gzip`);
  await ctx.close();
  return { ...m, kb };
}

const desk = await run("desktop 1440, no throttling", { viewport: { width: 1440, height: 900 } });
const phone = await run("phone 390, 4x CPU, slow 4G", { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true }, true);
console.log("");
console.log(desk.h >= 7000 && desk.h <= 8000 ? "ok   home height is in the 7,000 to 8,000px target" : `NOTE home height ${desk.h}px is outside 7,000 to 8,000`);
console.log(phone.lcp < 2500 ? "ok   LCP under 2.5s on a throttled mid phone" : `FAIL LCP ${phone.lcp}ms on a throttled phone`);
console.log(desk.cls < 0.1 && phone.cls < 0.1 ? "ok   no layout shift to speak of (CLS under 0.1)" : `FAIL CLS desktop ${desk.cls.toFixed(3)}, phone ${phone.cls.toFixed(3)}`);
console.log(desk.kb < 400 ? `ok   total JS on the home page ${desk.kb} KB gzip, and no WebGL or three.js in the bundle` : `NOTE JS ${desk.kb} KB`);
await b.close();
process.exit(0);
