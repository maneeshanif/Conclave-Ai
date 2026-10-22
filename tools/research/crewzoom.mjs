import { chromium } from "playwright";
import { spawn, execSync } from "node:child_process";
const PORT = 3100;
const server = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: "../..", shell: true, stdio: "ignore" });
const stop = () => { try { execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: "ignore" }); } catch {} };
process.on("exit", stop);
for (let i = 0; i < 60; i++) { try { if ((await fetch(`http://localhost:${PORT}/`)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 500)); }
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" })).newPage();
await p.goto(`http://localhost:${PORT}/crew`, { waitUntil: "networkidle" });
const svgs = p.locator("main li svg");
await p.evaluate(() => { document.querySelectorAll("main li svg").forEach((s) => s.setAttribute("style", "height:300px;width:300px")); });
// contact sheet: 4 + 3 characters
await p.locator("main ul").first().scrollIntoViewIfNeeded();
await p.locator("main ul").first().screenshot({ path: "../../docs/screens/crew-zoom.png" });
await b.close(); stop(); process.exit(0);
