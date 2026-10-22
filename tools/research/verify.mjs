import { chromium } from "playwright";
import { spawn, execSync } from "node:child_process";
import fs from "node:fs";

const PORT = 3100;
const out = process.argv[2] ?? "../../docs/screens/light";
fs.mkdirSync(out, { recursive: true });

const server = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: "../..", shell: true, stdio: "ignore" });
const stop = () => { try { execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: "ignore" }); } catch {} };
process.on("exit", stop);

for (let i = 0; i < 40; i++) {
  try { if ((await fetch(`http://localhost:${PORT}/`)).ok) break; } catch {}
  await new Promise((r) => setTimeout(r, 500));
}

const routes = ["", "services", "work", "work/bazar-flow", "demos", "about", "pricing", "contact", "privacy"];
const b = await chromium.launch();
let bad = 0;
for (const [name, w, h] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  for (const r of routes) {
    await p.goto(`http://localhost:${PORT}/${r}`, { waitUntil: "networkidle" });
    const o = await p.evaluate(() => {
      const W = document.documentElement.clientWidth;
      const wide = [...document.querySelectorAll("body *")].filter((e) => !e.closest(".band") && e.getBoundingClientRect().right > W + 1).slice(0, 3).map((e) => e.tagName + "." + String(e.className).slice(0, 40));
      return { over: document.documentElement.scrollWidth > W, wide, h1: getComputedStyle(document.querySelector("h1")).fontSize, imgs: [...document.images].filter((i) => !i.naturalWidth).length };
    });
    if (o.over || o.imgs) bad++;
    console.log(name.padEnd(8), ("/" + r).padEnd(18), o.over ? "OVERFLOW " + o.wide.join(",") : "ok", "h1", o.h1, o.imgs ? "BROKEN IMG " + o.imgs : "");
    await p.screenshot({ path: `${out}/${name}-${r.replace("/", "-") || "home"}.png`, fullPage: true });
  }
  if (errors.length) console.log(name, "console errors:", [...new Set(errors)].slice(0, 5));
}

// interaction checks on home (desktop)
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle" });
await p.getByRole("tab", { name: "Follow up fast" }).click();
console.log("tab switch ->", await p.locator('[role="tabpanel"] li').first().innerText());
await p.screenshot({ path: `${out}/desktop-home-top.png` });
await p.keyboard.press("Control+k");
await p.waitForTimeout(300);
console.log("palette:", (await p.locator("[cmdk-root]").count()) > 0);
await b.close();
stop();
console.log(bad ? `PROBLEMS: ${bad}` : "ALL PAGES OK");
process.exit(0);
