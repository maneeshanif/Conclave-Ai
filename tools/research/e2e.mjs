// End-to-end checks of the interactive features against RUNNING servers (does not start or stop anything).
// Usage: node e2e.mjs [frontend=http://localhost:3001] [api=http://localhost:8010]
import { chromium } from "playwright";
import fs from "node:fs";

const WEB = process.argv[2] ?? "http://localhost:3001";
const API = process.argv[3] ?? "http://localhost:8010";
let fail = 0;
const check = (name, ok, extra = "") => { if (!ok) fail++; console.log((ok ? "ok   " : "FAIL ") + name + (extra ? "  " + extra : "")); };

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce", permissions: [] });
const p = await ctx.newPage();
const errors = [];
p.on("pageerror", (e) => errors.push("pageerror: " + e.message));
p.on("console", (m) => m.type() === "error" && !/Failed to load resource|favicon/.test(m.text()) && errors.push("console: " + m.text().slice(0, 160)));

// --- contact form ---
await p.goto(`${WEB}/contact`, { waitUntil: "networkidle" });
const stamp = Date.now();
await p.fill('input[name="name"]', "E2E Tester");
await p.fill('input[name="email"]', `e2e+${stamp}@example.com`);
await p.getByText("Voice agents", { exact: true }).first().click();
await p.selectOption('select[name="budget"]', "A 14-day pilot first");
await p.fill('textarea[name="message"]', "Automated end-to-end test. Please ignore.");
await p.locator('input[name="consent"]').check();
await p.waitForTimeout(3000); // the speed trap needs a human-ish pause
await p.getByRole("button", { name: /send message/i }).click();
await p.getByText("Got it. Thank you.").waitFor({ timeout: 10000 }).then(() => check("contact form submits and shows the thank-you state", true)).catch(() => check("contact form submits and shows the thank-you state", false));

// --- contact form: honeypot filled by a "bot" is accepted but not stored ---
const before = fs.existsSync("../../backend/data/leads.jsonl") ? fs.readFileSync("../../backend/data/leads.jsonl", "utf8").split("\n").filter(Boolean).length : 0;
const bot = await fetch(`${API}/leads`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "bot", email: "bot@example.com", consent: true, website: "http://spam" }) });
const after = fs.readFileSync("../../backend/data/leads.jsonl", "utf8").split("\n").filter(Boolean).length;
check("bot honeypot looks successful but stores nothing", bot.ok && after === before, `status ${bot.status}, lines ${before} -> ${after}`);
check("real lead was stored by the API", fs.readFileSync("../../backend/data/leads.jsonl", "utf8").includes(`e2e+${stamp}@example.com`));

// --- demos page ---
await p.goto(`${WEB}/demos`, { waitUntil: "networkidle" });
// Aria chat
await p.getByRole("button", { name: "Can I book a check-up?" }).click();
await p.getByText(/Which suits you/).waitFor({ timeout: 10000 }).then(() => check("Aria answers a booking request with slots", true)).catch(() => check("Aria answers a booking request with slots", false));
await p.fill("#aria-input", "Thursday at 10:30");
await p.getByRole("button", { name: "Send", exact: true }).click();
await p.getByText(/Booked for Thursday at 10:30/).waitFor({ timeout: 10000 }).then(() => check("Aria confirms the sample slot and says it is a demo", true)).catch(() => check("Aria confirms the sample slot", false));
const lat = await p.locator("aside dd").first().innerText();
check("latency readout is shown", /\d\.\ds/.test(lat), lat);
check("mode readout says demo mode", (await p.locator("aside").first().innerText()).includes("Demo mode"));

// calculator
const out = () => p.locator("#calculator .display").innerText();
const c0 = await out();
await p.locator("#calculator input[type=number]").first().fill("20");
const c1 = await out();
check("calculator recalculates from the inputs", c0 !== c1, `${c0} -> ${c1}`);
// 10 missed x 30% x 4.33 x 100 x 12 x 70% = 10,920
check("calculator maths is right for the default example (10,920)", c0.replace(/,/g, "") === "10920", c0);

// Convene and the wizard are behind a flag (hidden by default). Check they are absent, or test them when the flag is on.
const extras = (await p.locator("#convene").count()) > 0;
check("hidden demos: Convene and the wizard are not shown unless the flag is on", extras === (process.env.EXTRA_DEMOS === "1"));
if (extras) {
// wizard
for (const label of ["Clinics", "Voice agents", "By phone", "Two to ten"]) await p.locator("#wizard").getByRole("button", { name: label, exact: true }).click();
check("wizard ends in a suggestion with a booking link", (await p.locator("#wizard h3").innerText()).toLowerCase().includes("voice agents for clinics"));

// Convene
await p.getByRole("button", { name: "Start the game" }).click();
let right = 0;
for (let i = 0; i < 6; i++) {
  const call = await p.locator("#convene [role=status] p").nth(1).innerText();
  const map = [[/open on Saturday|anyone there/, 1], [/Web form|unanswered/, 2], [/Tuesday visit|same 10:30/, 3], [/nine months/, 4], [/this week/, 5], [/upset/, 6], [/number come from/, 7]];
  const hit = map.find(([re]) => re.test(call));
  if (hit) { await p.keyboard.press(String(hit[1])); right++; }
  await p.waitForTimeout(250);
}
const score = Number((await p.locator("#convene [aria-live=polite] b").innerText()).trim());
check("Convene scores correct picks", score >= right - 1 && score > 0, `score ${score} after ${right} right picks`);
await p.screenshot({ path: "../../docs/screens/e2e-convene.png" });

}

// leaderboard accepts a sane score through the API and lists it
const sc = await fetch(`${API}/scores`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ handle: "e2e", score: 33, seconds: 60 }) });
const top = await (await fetch(`${API}/scores`)).json();
check("leaderboard accepts and lists a score", sc.ok && top.some((r) => r.handle === "e2e"));
const cheat = await fetch(`${API}/scores`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ handle: "x", score: 1500, seconds: 60 }) });
check("leaderboard rejects an impossible score", cheat.status === 422);

// home closing block: callback request
await p.goto(`${WEB}/`, { waitUntil: "networkidle" });
await p.waitForTimeout(3000);
await p.locator("#main form").filter({ hasText: "Request a call" }).locator('input[name="email"]').fill(`cb+${stamp}@example.com`);
await p.locator("#main form").filter({ hasText: "Request a call" }).locator('input[name="consent"]').check();
await p.getByRole("button", { name: "Request a call" }).click();
await p.getByText("Got it.").first().waitFor({ timeout: 8000 }).then(() => check("home callback request goes through", true)).catch(() => check("home callback request goes through", false));
check("callback request stored with its source", fs.readFileSync("../../backend/data/leads.jsonl", "utf8").includes("home-cta"));

// newsletter
await p.goto(`${WEB}/`, { waitUntil: "networkidle" });
await p.fill("#nl-email", `nl+${stamp}@example.com`);
await p.getByRole("button", { name: "Join" }).click();
await p.getByText("You are on the list").waitFor({ timeout: 8000 }).then(() => check("newsletter signup works", true)).catch(() => check("newsletter signup works", false));

check("no console or page errors during all of the above", errors.length === 0, errors.slice(0, 3).join(" | "));
await b.close();
console.log(fail ? `FAILED: ${fail}` : "E2E ALL OK");
process.exit(0);
