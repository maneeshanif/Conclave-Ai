import { chromium } from "playwright";
const b = await chromium.launch();
for (const [name,w,h] of [["desktop",1440,900],["mobile",360,780]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  for (const r of ["","services","work","pricing","contact"]) {
    await p.goto(`http://localhost:3100/${r}`, { waitUntil: "networkidle" });
    const o = await p.evaluate(() => {
      const W = document.documentElement.clientWidth, res = [];
      for (const e of document.querySelectorAll("body *")) {
        const rect = e.getBoundingClientRect();
        if (rect.right > W + 1) res.push(`${e.tagName}.${String(e.className).replace(/\s+/g,".").slice(0,40)} right=${Math.round(rect.right)} band=${!!e.closest(".band")}`);
      }
      return { over: document.documentElement.scrollWidth > W, sw: document.documentElement.scrollWidth, first: res.filter(x=>!x.endsWith("band=true")).slice(0,4) };
    });
    console.log(name, "/"+r, o.over ? "OVER "+o.sw : "ok", o.first.join(" | "));
  }
}
await b.close();
