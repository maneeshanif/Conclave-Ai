// Hero stud scene frames (scatter, assembled C, scroll morph into the crew) and the crew page, against a running server.
// Usage: BASE=http://localhost:3001 node v3-shots.mjs
import { chromium } from "playwright";
const ROOT = process.env.BASE ?? "http://localhost:3001";
const OUT = "../../docs/screens/v3";
import fs from "node:fs";
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errs = [];
p.on("pageerror", (e) => errs.push("pageerror: " + e.message));
p.on("console", (m) => ["error", "warning"].includes(m.type()) && !/DevTools|Fast Refresh|Failed to load resource/.test(m.text()) && errs.push(m.type() + ": " + m.text().slice(0, 220)));
await p.goto(ROOT + "/", { waitUntil: "commit" });
for (const t of [600, 1100, 1900]) { await p.waitForTimeout(t === 600 ? 600 : t - (t === 1100 ? 600 : 1100)); await p.screenshot({ path: `${OUT}/hero-${t}ms.png`, clip: { x: 800, y: 60, width: 640, height: 420 } }); }
await p.waitForTimeout(2500);
await p.screenshot({ path: `${OUT}/hero-assembled.png` });
for (const y of [160, 320, 520]) {
  await p.evaluate((v) => scrollTo(0, v), y);
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `${OUT}/hero-scroll-${y}.png`, clip: { x: 800, y: 0, width: 640, height: 480 } });
}
console.log("errors:", errs.length ? errs.slice(0, 5) : "none");
await b.close();
