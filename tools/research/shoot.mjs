import { chromium } from "playwright";
const b = await chromium.launch();
for (const [name, w, h] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  const fs = await p.evaluate(() => getComputedStyle(document.querySelector("h1")).fontSize);
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  console.log(name, "h1 font-size", fs, "horizontal overflow", overflow);
  await p.screenshot({ path: `../../docs/screens/step3/home-${name}-top.png` });
  await p.screenshot({ path: `../../docs/screens/step3/home-${name}-full.png`, fullPage: true });
}
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
for (const r of ["services","work","work/bazar-flow","demos","about","pricing","contact"]) {
  const res = await p.goto(`http://localhost:3100/${r}`, { waitUntil: "networkidle" });
  console.log(r, res.status());
}
await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await p.keyboard.press("Control+k");
await p.waitForTimeout(400);
console.log("palette open:", await p.locator("[cmdk-dialog],[cmdk-root]").count() > 0);
await p.screenshot({ path: "../../docs/screens/step3/palette.png" });
await b.close();
