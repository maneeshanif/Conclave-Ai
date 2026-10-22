import { chromium } from "playwright";
import { spawn, execSync } from "node:child_process";
const server = spawn("npx", ["next", "start", "-p", "3100"], { cwd: "../..", shell: true, stdio: "ignore" });
const stop = () => { try { execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: "ignore" }); } catch {} };
for (let i = 0; i < 40; i++) { try { if ((await fetch("http://localhost:3100/")).ok) break; } catch {} await new Promise(r => setTimeout(r, 500)); }
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
const secs = await p.$$("main > section");
const names = ["hero","live","proof","services","builtfor","work","manifesto","process","demos","pricing","faq","cta"];
for (let i = 0; i < secs.length; i++) { await secs[i].scrollIntoViewIfNeeded(); await p.waitForTimeout(300); await secs[i].screenshot({ path: `../../docs/screens/light/sec-${String(i).padStart(2,"0")}-${names[i]}.png` }); }
console.log("sections:", secs.length);
await b.close(); stop(); process.exit(0);
