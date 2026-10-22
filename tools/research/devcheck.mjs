// Reproduces dev-mode crashes: starts `next dev`, requests every route, prints server log errors. Self-stopping.
import { spawn, execSync } from "node:child_process";
const PORT = 3101;
let log = "";
const server = spawn("npx", ["next", "dev", "-p", String(PORT)], { cwd: "../..", shell: true, stdio: ["ignore", "pipe", "pipe"] });
server.stdout.on("data", (d) => (log += d));
server.stderr.on("data", (d) => (log += d));
const stop = () => { try { execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: "ignore" }); } catch {} };
process.on("exit", stop);
for (let i = 0; i < 90; i++) { try { await fetch(`http://localhost:${PORT}/`); break; } catch {} await new Promise((r) => setTimeout(r, 500)); }
const routes = ["/", "/services", "/services/voice", "/studio", "/crew", "/industries/clinics", "/work", "/work/bazar-flow", "/demos", "/about", "/pricing", "/contact", "/join", "/security", "/compare", "/receipts", "/notes", "/privacy", "/terms", "/sitemap.xml", "/robots.txt", "/nope"];
for (const r of routes) {
  const t = Date.now();
  let status = "ERR";
  try { status = (await fetch(`http://localhost:${PORT}${r}`, { signal: AbortSignal.timeout(90000) })).status; } catch (e) { status = "ERR " + e.message; }
  console.log(String(status).padEnd(8), r.padEnd(24), `${Date.now() - t}ms`);
}
await new Promise((r) => setTimeout(r, 1500));
const bad = log.split("\n").filter((l) => /error|exception|jest|worker|ELIFECYCLE|heap|memory|⨯|Unhandled/i.test(l));
console.log("--- suspicious log lines:", bad.length);
console.log(bad.slice(0, 25).join("\n"));
console.log("--- log tail:\n" + log.split("\n").slice(-15).join("\n"));
stop();
process.exit(0);
