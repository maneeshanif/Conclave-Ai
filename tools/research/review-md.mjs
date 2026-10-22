import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("../../docs/review");
const m = JSON.parse(fs.readFileSync(path.join(OUT, "manifest.json"), "utf8"));

// PDF page 1 is the cover; shot i is on page i + 2.
const rows = m.map((x, i) => `| ${i + 2} | \`${x.id}\` | ${x.kind} | ${x.route} | ${x.source.join("; ")} |`).join("\n");
const pages = [...new Set(m.map((x) => x.page))];

const md = `# Conclave AI: design review pack

You are reviewing the current look of the Conclave AI website. This folder is a visual snapshot of **every page and every section**, at desktop (1440px) and mobile (390px), plus interactive states. Generated ${new Date().toISOString().slice(0, 10)}. ${m.length} shots across ${pages.length} groups.

## Files

| File | What it is |
| --- | --- |
| \`review.pdf\` | Every shot on its own PDF page at native size. Page 1 is a cover with a table of contents. Each page has a bar with the shot ID, route, viewport and source file. |
| \`board.html\` | A Figma-style canvas. Open it in a browser: one row per page, sections side by side, desktop and mobile rows. Drag to pan, scroll to zoom, type notes under any tile, then press **Export feedback** to download \`feedback.md\`. |
| \`manifest.json\` | Machine-readable index: id, route, viewport, kind, size, image path, source files. |
| \`shots/\` | The JPEG images (\`shots/<page>/<viewport>/NN-name.jpg\`). |
| \`REVIEW.md\` | This file. |

## How to review (for an agent)

1. Read this file, then look at the shots. The PDF is the easiest single file to read; the Read tool takes at most 20 PDF pages per request, so read it in chunks (pages 2 to 21, 22 to 41, and so on), or open \`shots/...\` images directly using the paths in the table below.
2. Start with \`home/desktop/full-page\` and \`home/mobile/full-page\` for the overall picture, then go section by section.
3. Give feedback **per shot ID** (for example \`home/desktop/04-services\`). Each ID lists the source file to edit.
4. Be specific: say what is wrong, what it should be, and why (reference the rules below). Prefer a few high-impact fixes over a long list of nitpicks.
Hidden or empty on purpose until real (Change Spec v3): metrics and write-ups on the four project pages (the projects themselves are shown; their tags, stack and role are working labels the owner still confirms), team profiles, WhatsApp number and reply time, prices ("Scoped on a call" until set), the Convene game and the build-your-own-agent wizard (built, behind a flag), Privacy and Terms (placeholder text, not indexed), and the Receipts ledger rows (they fill from real pilots). Mock-ups and dashboards use sample figures and are labelled "Example". Flow-generated assets (hero loop, service videos) are not in yet; the hero scene is the stud C in SVG. The Aria voice demo runs in demo mode until an AI key is set.

## The design brief the site must meet

- **Reference:** lemlist.com for about 90% of the layout (light page, floating white pill nav, full-bleed hero with headline at bottom left, product demo window straight under the hero, numbered feature cards with product visuals, persona tiles, 2-column FAQ, one dark closing block). Willows preview for about 10% of the style (oversized wide uppercase type, inline pill in the headline, skewed repeating word band, scroll-brightening statement). Pattern references only: nothing copied. v3 changes: the brick robots are replaced by face-less stud patterns on one 7x7 grid (Aria, Echo, Slot, Boomerang, Tally, Gate, Ledger) and a C mark made of studs; home is eleven sections; the Studio is Agents, Automations, ERP and CRM, Apps, Platforms.
- **Palette (flat, no gradients):** Ink #0B1512, Moss #14302A, Chalk #F1F4EC, Steel #8FA39A, Lime #C8F169, Violet #7C5CFF, Lilac #CFC4FF, plus light-surface tokens Paper #FBFCF8, Mist #E4E9DD, Slate #4A5C55, Plum #5B3FD6. Lime marks actions, violet marks anything live or speaking. WCAG AA on every text pair. Never Steel or Lime text on Chalk.
- **Type:** Syne 700 to 800 uppercase for hero and statement blocks; Outfit for headings and body; IBM Plex Mono for labels. Hero is 96px or larger on desktop (1200px and up).
- **Rules:** no gradients, no glassmorphism, no floating blobs, no heavy shadows, no needless icons, every visual must explain something, one primary action per section.
- **Audience and goal:** owners of clinics and local businesses, plus startups. The site has one job: get a visitor to hear a live agent and book a call within two minutes.
- **Reviewers to think like:** a first-time visitor (is it obvious what this is and what to do next?), a clinic owner (do I trust this?), a financial auditor (are there any claims, numbers or promises that are not backed up?).

## What stills cannot show

The site has scroll and micro animations (hero intro, sticky service cards, reveals, accordion, hover). These stills are captured with reduced motion so every section is visible. Judge motion in a browser, using \`docs/motion-implementation.md\`.

## Known placeholders (not design bugs)

Waiting on real content from the owner: proof and result numbers, project outcomes, WhatsApp number, time zone and reply time, team profiles, legal text, Flow-generated hero and service videos (the hero scene and persona figures are flat SVG stand-ins). The Aria voice demo, Convene game, missed-call calculator, demo line and the working contact form are not built yet; the Receipts ledger, prices and team profiles wait on real numbers and names, so those buttons lead to placeholder pages. Figures in the service mock-ups are sample data labelled "Example".

## Feedback template

\`\`\`markdown
## <shot id>
- Problem: what is wrong, one sentence
- Fix: what it should be
- Why: which rule or user need it serves
- Priority: high | medium | low
\`\`\`

## Rebuild this pack after changes

\`\`\`
cd tools/research
node review.mjs
\`\`\`

This builds the production site, starts a temporary server, recaptures everything and stops the server again.

## Index (PDF page, shot, kind, route, source)

| PDF page | Shot ID | Kind | Route | Source |
| --- | --- | --- | --- | --- |
${rows}
`;
fs.writeFileSync(path.join(OUT, "REVIEW.md"), md);
console.log("REVIEW.md written:", md.length, "chars");
