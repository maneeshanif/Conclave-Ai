import { chromium } from "playwright";
const b = await chromium.launch();
const cases = [["mobile",360,780,["","services","work","work/bazar-flow"]],["desktop",1440,900,["","work","pricing"]]];
for (const [name,w,h,routes] of cases) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  for (const r of routes) {
    await p.goto(`http://localhost:3100/${r}`, { waitUntil: "networkidle" });
    const out = await p.evaluate(() => {
      const W = document.documentElement.clientWidth, res = [];
      for (const e of document.querySelectorAll("main *, footer *")) {
        const rect = e.getBoundingClientRect();
        if (rect.right > W + 1 && !e.closest(".band") && e.children.length === 0 || (rect.right > W + 1 && e.tagName === "H3")) res.push(`${e.tagName} "${(e.textContent||"").trim().slice(0,28)}" w=${Math.round(rect.width)} right=${Math.round(rect.right)}`);
      }
      return res.slice(0, 6);
    });
    console.log(name, "/" + r, out);
  }
}
await b.close();
