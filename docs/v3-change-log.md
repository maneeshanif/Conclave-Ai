# v3 change log (Change Spec v3, 23 Oct 2026)

What changed from v2, against the spec's acceptance checklist. Every check below is re-runnable (commands at the end).

## Acceptance checklist

| Item | Result |
| --- | --- |
| Home has 11 sections or fewer and is under 8,000px at 1440 wide | **Yes.** 11 sections plus footer, 7,969px including the 300px hero hold (was 17 sections, 13,305px) |
| No brick robot anywhere; no faces on crew glyphs | **Yes.** Robot art, the 3D hero, `three` and `@react-three/fiber` are deleted. The only face is the one optional lime square with two stud eyes (404 and error pages) |
| Studio shows Agents, Automations, ERP and CRM, Apps, Platforms; no CMS card | **Yes.** CMS content is a section on `/studio/apps` |
| Demos has only Aria and the calculator visible; no demo phone line | **Yes.** Convene and the wizard are built and kept behind `NEXT_PUBLIC_SHOW_EXTRA_DEMOS=1` |
| Receipts table, Stack and Guild sections are off home | **Yes.** Receipts on `/receipts`; Stack and scale on `/studio` and `/studio/platforms`; Guild is a one-line strip |
| StudMark and all seven StudGlyphs render from `patterns.ts`, with reduced-motion fallback | **Yes.** `lib/studs/patterns.ts` is the spec's data verbatim; static final state under reduced motion (checked) |
| Home LCP under 2.5s on a throttled mid phone | **Yes.** 1.5s (4x CPU, slow 4G, 390px). CLS 0.000 |
| Every placeholder is filled or its section hidden | **Yes**, with two visible exceptions: Privacy and Terms still say "Text to be added before launch" (noindexed, out of the sitemap) and the Receipts ledger lists metrics that start with the first pilot |
| Metadata, JSON-LD and sitemap pass a Rich Results check | **Structure verified by script** (titles, canonicals, share images, valid JSON-LD, expected types). Google's Rich Results tool itself needs the live URL, so run it after deploy |
| Review pack rebuilt and re-read; no new broken layouts on mobile (390) | **Rebuilt** (423 shots). Overflow sweep at 1440, 390 and 360 passes |

## What changed

**Home** (spec section 2): hero is the stud C (studs scatter, assemble into the C in 1.2s, then split into the seven agents while the hero is held for 300px of scroll; phones and reduced motion get the assembled C). Live agent keeps the demo window, with Aria's glyph pulsing while she speaks. Proof strip is three plain facts. Services are five compact sticky cards with a corner glyph. Studio became **Systems**. Built-for is four stud tiles. Work shows the owner's showable projects. Process shows durations. Pricing links to `/pricing`. FAQ gained the four required questions. The closing block has an inline **request a call** form (or the Cal.com link when set).

**Studio** (section 3): five offers and five sub-pages (`/studio/agents`, `automations`, `erp-crm`, `apps`, `platforms`), each with problem, what we build, a diagram (flow, module map, stack, architecture), stack, timeline, price from, FAQ, related and CTA.

**Other pages:** Services is shorter (picker folds away, integrations in one line, a "Beyond agents" strip). Demos is Aria plus the calculator. Work lists the four projects; each has a page that shows only content that exists. The Crew page shows glyph, role, sample voice and what each does. Pricing has the agent / receptionist / answering service comparison. About leads with the manifesto and hides the team block until photos exist. Contact shows WhatsApp and reply time only when set.

**Stud system** (section 4): `lib/studs/patterns.ts`, `mark.ts`, `hero.ts`, `useStudAssemble.ts`; `StudGlyph` (per-agent motion), `StudMark`, `StudCrew`, `StudFace`, `StudPulse`. Favicon and Apple icon are the stud C on the dark tile.

**SEO** (section 6): per-page share images, BreadcrumbList, Service, FAQPage and Article data, "Conclave AI" in every title (the check caught and fixed `/join`), noindex on Privacy and Terms, real-cases-only sitemap.

## Deliberate choices

- **Three.js removed.** The spec says SVG with GSAP is enough, and dropping the 241 KB WebGL chunk keeps the hero light.
- **"Settle into the Aria card" is not built.** The hero C splits into the seven glyph tiles and stays there; flying the studs into the live-agent card needs a pinned scroll scene and was left out to keep one simple scene.
- **The logo in the nav is still your logo pack.** The stud C is used for the hero, favicon and app icon, as the spec lists.
- **Your projects are shown** (change after the first v3 pass): Bazar Flow, CodeNexus AI, ScaleNexus AI and Task Whisper appear on Work and on the home page, because the PRD lists them as showable. The spec had said to hide Work until a case has a screenshot and a metric. Cards use a screenshot when `public/work/<slug>.png` exists, else the project's stud glyph. Metrics and write-ups appear only when real; a project page is noindexed until it has a write-up. **Their tags, stack and role are working labels to confirm in `lib/projects.ts`.**
- **Hero split is pinned.** The hero is held still for 300px of scroll while the C splits, so the C stays in place and the seven tiles land just below it, clear of the floating nav, the headline and the waveform pill. Moving the tiles lower in the scene instead made them collide with the headline.
- **Quick-book without Cal.com** asks for a time of day and an email instead of showing fake slots.

## Re-run the checks

In `tools/research` (build first, stop `next dev` first): `node verify.mjs`, `node motion-verify.mjs`, `node axe.mjs`, `node perf.mjs` and `node seo.mjs` (the last two against a running `next start -p 3100`), `node e2e.mjs <web> <api>` against running servers, `node review.mjs` to rebuild the review pack. Backend: `pytest -q`.

Quick fix applied in this pass: **seo.mjs** now expects project pages to be live and noindexed (not 404), and the pack gained the project pages and the pinned hero states.
