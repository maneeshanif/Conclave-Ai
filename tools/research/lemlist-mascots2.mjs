import { chromium } from "playwright";
import path from "node:path";
const OUT = path.resolve("../../docs/research/lemlist-mascots");
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("https://www.lemlist.com/", { waitUntil: "domcontentloaded", timeout: 60000 });
await p.waitForTimeout(3500);
for (const t of ["Reject all", "Decline", "No"]) { const el = p.getByRole("button", { name: new RegExp(`^${t}$`, "i") }).first(); if (await el.count()) { await el.click().catch(() => {}); break; } }
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 140)); } scrollTo(0, 0); });
await p.waitForTimeout(800);
const grab = async (name, sel, i = 0) => { const e = p.locator(sel).nth(i); if (await e.count()) { await e.scrollIntoViewIfNeeded(); await p.waitForTimeout(500); await e.screenshot({ path: path.join(OUT, name) }); console.log("saved", name); } };
// persona section: the section containing "For Sales Reps"
const sec = p.locator("section", { hasText: "Built to back outbound pros" }).first();
await sec.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
await sec.screenshot({ path: path.join(OUT, "personas.png") }); console.log("saved personas.png");
const tip = p.locator("section", { hasText: "Steal the outbound playbooks" }).first();
await tip.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
await tip.screenshot({ path: path.join(OUT, "playbooks.png") }); console.log("saved playbooks.png");
await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(500);
await p.screenshot({ path: path.join(OUT, "hero.png") });
await b.close();
