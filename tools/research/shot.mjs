// Usage: node shot.mjs <route> <out.png> [width=1440] [height=900] [waitMs=2500] [fullPage=0]
// Starts and stops its own production server (build first). Motion on, so intros are captured as a visitor sees them.
import { chromium } from "playwright";
import { spawn, execSync } from "node:child_process";
const [route = "/", out = "../../docs/screens/shot.png", w = "1440", h = "900", wait = "2500", full = "0"] = process.argv.slice(2);
const PORT = 3100;
const server = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: "../..", shell: true, stdio: "ignore" });
const stop = () => { try { execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: "ignore" }); } catch {} };
process.on("exit", stop);
for (let i = 0; i < 60; i++) { try { if ((await fetch(`http://localhost:${PORT}/`)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 500)); }
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: +w, height: +h } })).newPage();
await p.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle" });
await p.waitForTimeout(+wait);
if (full === "1") await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); } scrollTo(0, 0); });
await p.waitForTimeout(600);
await p.screenshot({ path: out, fullPage: full === "1" });
await b.close(); stop();
console.log("saved", out);
process.exit(0);
