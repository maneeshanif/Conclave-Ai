import { chromium } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("http://localhost:3100/work", { waitUntil: "networkidle" });
const info = await p.evaluate(() => {
  const band = document.querySelector(".band"), span = band.querySelector("span");
  const r = span.getBoundingClientRect(), br = band.getBoundingClientRect();
  return { bandT: getComputedStyle(band).transform, skew: getComputedStyle(band).skew, anim: getComputedStyle(band).animationName,
    span: { x: Math.round(r.x), w: Math.round(r.width), color: getComputedStyle(span).color, fs: getComputedStyle(span).fontSize, ff: getComputedStyle(span).fontFamily.slice(0,30) },
    band: { x: Math.round(br.x), w: Math.round(br.width), h: Math.round(br.height) } };
});
console.log(JSON.stringify(info));
await p.evaluate(() => document.querySelector("footer").scrollIntoView());
await p.waitForTimeout(500);
await p.screenshot({ path: "../../docs/screens/step3/footer-check.png" });
await b.close();
