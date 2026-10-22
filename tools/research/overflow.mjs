import { chromium } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
console.log(await p.evaluate(() => {
  const W = document.documentElement.clientWidth, out = [];
  for (const e of document.querySelectorAll("body *")) {
    const r = e.getBoundingClientRect();
    if (r.right > W + 1 && !e.closest(".band")) out.push(`${e.tagName}.${String(e.className).slice(0,50)} right=${Math.round(r.right)}`);
  }
  return { sw: document.documentElement.scrollWidth, W, out: out.slice(0, 8) };
}));
await b.close();
