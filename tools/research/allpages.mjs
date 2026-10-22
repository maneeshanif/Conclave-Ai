import { chromium } from "playwright";
const b = await chromium.launch();
for (const [name, w, h] of [["mobile", 360, 780], ["desktop", 1440, 900]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  for (const r of ["", "services","work","work/bazar-flow","demos","about","pricing","contact","privacy"]) {
    await p.goto(`http://localhost:3100/${r}`, { waitUntil: "networkidle" });
    const o = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, W: document.documentElement.clientWidth, h1: getComputedStyle(document.querySelector("h1")).fontSize }));
    console.log(name, "/" + r, o.sw > o.W ? "OVERFLOW " + o.sw : "ok", "h1", o.h1);
    await p.screenshot({ path: `../../docs/screens/step3/${name}-${r.replace("/", "-") || "home"}.png`, fullPage: true });
  }
}
await b.close();
