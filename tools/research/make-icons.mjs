// Builds the favicon (app/icon.svg) and Apple touch icon (app/apple-icon.png) from the stud C on the dark tile (Change Spec v3).
// The favicon is a simplified C (one ring, bigger studs) so it holds up at 16px; the Apple icon uses the full two-ring mark.
import fs from "node:fs";
import { chromium } from "playwright";

const r3 = (n) => Math.round(n * 1000) / 1000;
const ring = (cx, cy, R, n, r, color, op = 1) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((40 + (280 * i) / (n - 1)) * Math.PI) / 180;
    return `<circle cx="${r3(cx + R * Math.cos(a))}" cy="${r3(cy - R * Math.sin(a))}" r="${r3(r)}" fill="${color}"${op < 1 ? ` opacity="${op}"` : ""}/>`;
  }).join("");

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" rx="44" fill="#0B1512"/>${ring(100, 100, 66, 22, 11, "#C8F169")}<circle cx="100" cy="100" r="17" fill="#C8F169"/></svg>`;
fs.writeFileSync("../../app/icon.svg", favicon);

const R = 72;
const full = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#0B1512"/>${ring(100, 100, R, 44, 0.072 * R, "#C8F169")}${ring(100, 100, 0.72 * R, 32, 0.05 * R, "#C8F169", 0.55)}<circle cx="100" cy="100" r="${r3(0.145 * R)}" fill="#C8F169"/></svg>`;
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 })).newPage();
await p.setContent(`<body style="margin:0">${full.replace("<svg ", '<svg width="180" height="180" ')}</body>`);
await p.screenshot({ path: "../../app/apple-icon.png" });
await b.close();
console.log("wrote app/icon.svg and app/apple-icon.png");
