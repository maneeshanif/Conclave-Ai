# Redesign 2: light version (lemlist-led)

Feedback: the first build scored 2/10. Dark sections everywhere, no product shown, little resemblance to the lemlist reference that was meant to be 90% of the layout.

## What lemlist actually does (measured with Playwright, `docs/research/lemlist-detail/`)

| Measured | Value |
| --- | --- |
| Page surface | White, text #18181A, secondary #7D7D7D, light-grey bands #EFEFEF / #F7F8FA |
| Only dark area | Closing block and footer (#010113) |
| Nav | White pill, 16px radius, 68px high, 16px from top, 1240px wide |
| Buttons | 12px radius, 44px high; one dark primary |
| Headings | Manrope 600, 40/44, tracking -0.02em, sentence case; hero 56/64 |
| Section opener | Small mono pill label, then a centred headline |
| Layout | One framed 1280px column with hairline sides; hairline grids with joints |
| Features | Large white 24px-radius cards on a grey band, alternating sides, number badge, product screenshot on a coloured panel |
| Other blocks | Persona tiles, video cards, integrations, playbook cards, 2-column FAQ |

## Before and after

| Area | Before | After |
| --- | --- | --- |
| Page surface | Ink (near black) | Chalk with white (Paper) cards |
| Dark full-width sections | 10 of 13 blocks | 1 (closing block and footer, like lemlist) |
| Colour tokens | 7 | 11 (added Paper, Mist, Slate, Plum for light surfaces; contrast checked) |
| Hero | Dark, text only | Lime full-bleed, headline bottom left, support and actions bottom right, flat agent scene with the real logo mark, inline waveform pill |
| Nav | Dark pill, 4 links | White pill 16px radius, 5 links, Ctrl K, Hear Aria, Book a call |
| Live demo | Static panel | Tabbed window under the hero with 4 working tabs and example conversations |
| Proof | 3 "Add real figure" placeholders | Hairline logo grid of the real stack, no fake numbers |
| Services | Text list with grey boxes | 5 numbered cards, alternating sides, each with a product mock-up on a flat colour panel |
| Product visuals | 0 | 7 (hero scene, Aria window, 5 service mock-ups) |
| New section | none | "Built for" persona tiles (the 13th block; lemlist has it) |
| Work | Text rows | 3 rounded cards with big initial, tags, "Learn more" |
| Process, Demos, Pricing, FAQ | Dark cards | Light framed blocks; FAQ is 2-column with hairline rows |
| Footer | One line plus links | Dark, logo, 3 link columns, word band |
| Section headings | Syne uppercase everywhere | Outfit sentence case (lemlist, 90%); Syne uppercase kept for hero, process, demos, closing (Willows, 10%) |
| Other pages | Dark | All 10 re-skinned light; Services page now shows the same mock-ups |

## Copy cleaned up (an auditor would flag these)

Removed invented claims: "two-week trial", "30-minute call", "running in weeks", "we sign a data processing agreement", "live within two weeks". Replaced with statements the PRD supports (fixed scope, fixed fee, timeline agreed on the call). Report-tile figures in the mock-up are clearly marked "Example".

## Still placeholders (need your real data)

Project outcomes and results, WhatsApp number, time zone and reply time, team profiles, legal text, customer proof numbers. Flow videos replace the flat mock-ups later.

## Counts

- 24 files changed or added: 1 stylesheet, 10 components (3 new), 1 layout, 1 home page, 10 inner pages, 1 data file.
- 14 lemlist reference images plus `structure.json` captured.
- Checks: type-check clean, production build clean, 18 page and width checks (9 pages x desktop and phone) with no overflow, tabs and Ctrl K verified.
