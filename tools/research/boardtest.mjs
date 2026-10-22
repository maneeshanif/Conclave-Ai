import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const url = "file:///" + path.resolve("../../docs/review/board.html").split(path.sep).join("/");
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1600, height: 900 }, acceptDownloads: true });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(e.message));
p.on("dialog", (d) => d.accept());

await p.goto(url, { waitUntil: "load" });
await p.waitForTimeout(1500);
console.log("tiles:", await p.locator(".tile").count(), "| rows:", await p.locator(".row").count());
console.log("broken imgs:", await p.evaluate(() => [...document.images].filter((i) => i.complete && !i.naturalWidth).length));
console.log("bar:", await p.locator("#count").innerText());
await p.screenshot({ path: "../../docs/screens/board-fit.png" });

await p.click("#z100");
await p.waitForTimeout(500);
await p.screenshot({ path: "../../docs/screens/board-100.png" });

await p.locator(".tile").nth(3).locator("textarea").fill("Hero scene is too small; make the C mark bigger.");
await p.locator(".tile").nth(5).locator("textarea").fill("Services card needs more air.");
console.log("after notes:", await p.locator("#count").innerText(), "| highlighted:", await p.locator(".tile.has-note").count());

const [dl] = await Promise.all([p.waitForEvent("download"), p.click("#export")]);
const f = "../../docs/screens/feedback-test.md";
await dl.saveAs(f);
console.log("--- exported:\n" + fs.readFileSync(f, "utf8"));

await p.click("#clear");
console.log("after clear:", await p.locator("#count").innerText());
console.log("page errors:", errs);
await b.close();
fs.rmSync(f);
