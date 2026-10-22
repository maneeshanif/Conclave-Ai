# Conclave AI: design review pack

You are reviewing the current look of the Conclave AI website. This folder is a visual snapshot of **every page and every section**, at desktop (1440px) and mobile (390px), plus interactive states. Generated 2026-10-22. 287 shots across 21 groups.

## Files

| File | What it is |
| --- | --- |
| `review.pdf` | Every shot on its own PDF page at native size. Page 1 is a cover with a table of contents. Each page has a bar with the shot ID, route, viewport and source file. |
| `board.html` | A Figma-style canvas. Open it in a browser: one row per page, sections side by side, desktop and mobile rows. Drag to pan, scroll to zoom, type notes under any tile, then press **Export feedback** to download `feedback.md`. |
| `manifest.json` | Machine-readable index: id, route, viewport, kind, size, image path, source files. |
| `shots/` | The JPEG images (`shots/<page>/<viewport>/NN-name.jpg`). |
| `REVIEW.md` | This file. |

## How to review (for an agent)

1. Read this file, then look at the shots. The PDF is the easiest single file to read; the Read tool takes at most 20 PDF pages per request, so read it in chunks (pages 2 to 21, 22 to 41, and so on), or open `shots/...` images directly using the paths in the table below.
2. Start with `home/desktop/full-page` and `home/mobile/full-page` for the overall picture, then go section by section.
3. Give feedback **per shot ID** (for example `home/desktop/04-services`). Each ID lists the source file to edit.
4. Be specific: say what is wrong, what it should be, and why (reference the rules below). Prefer a few high-impact fixes over a long list of nitpicks.
5. Do not invent facts. Anything marked as a placeholder below is waiting on real content from the owner.

## The design brief the site must meet

- **Reference:** lemlist.com for about 90% of the layout (light page, floating white pill nav, full-bleed hero with headline at bottom left, product demo window straight under the hero, numbered feature cards with product visuals, persona tiles, 2-column FAQ, one dark closing block). Willows preview for about 10% of the style (oversized wide uppercase type, inline pill in the headline, skewed repeating word band, scroll-brightening statement). Pattern references only: nothing copied.
- **Palette (flat, no gradients):** Ink #0B1512, Moss #14302A, Chalk #F1F4EC, Steel #8FA39A, Lime #C8F169, Violet #7C5CFF, Lilac #CFC4FF, plus light-surface tokens Paper #FBFCF8, Mist #E4E9DD, Slate #4A5C55, Plum #5B3FD6. Lime marks actions, violet marks anything live or speaking. WCAG AA on every text pair. Never Steel or Lime text on Chalk.
- **Type:** Syne 700 to 800 uppercase for hero and statement blocks; Outfit for headings and body; IBM Plex Mono for labels. Hero is 96px or larger on desktop (1200px and up).
- **Rules:** no gradients, no glassmorphism, no floating blobs, no heavy shadows, no needless icons, every visual must explain something, one primary action per section.
- **Audience and goal:** owners of clinics and local businesses, plus startups. The site has one job: get a visitor to hear a live agent and book a call within two minutes.
- **Reviewers to think like:** a first-time visitor (is it obvious what this is and what to do next?), a clinic owner (do I trust this?), a financial auditor (are there any claims, numbers or promises that are not backed up?).

## What stills cannot show

The site has scroll and micro animations (hero intro, sticky service cards, reveals, accordion, hover). These stills are captured with reduced motion so every section is visible. Judge motion in a browser, using `docs/motion-implementation.md`.

## Known placeholders (not design bugs)

Waiting on real content from the owner: proof and result numbers, project outcomes, WhatsApp number, time zone and reply time, team profiles, legal text, Flow-generated hero and service videos (the hero scene and persona figures are flat SVG stand-ins). The Aria voice demo, Convene game, missed-call calculator, demo line and the working contact form are not built yet; the Receipts ledger, prices and team profiles wait on real numbers and names, so those buttons lead to placeholder pages. Figures in the service mock-ups are sample data labelled "Example".

## Feedback template

```markdown
## <shot id>
- Problem: what is wrong, one sentence
- Fix: what it should be
- Why: which rule or user need it serves
- Priority: high | medium | low
```

## Rebuild this pack after changes

```
cd tools/research
node review.mjs
```

This builds the production site, starts a temporary server, recaptures everything and stops the server again.

## Index (PDF page, shot, kind, route, source)

| PDF page | Shot ID | Kind | Route | Source |
| --- | --- | --- | --- | --- |
| 2 | `home/desktop/full-page` | full | / | app/page.tsx; app/layout.tsx |
| 3 | `home/desktop/01-hero` | section | / | components/home/sections.tsx (Hero), components/home/visuals.tsx (HeroScene) |
| 4 | `home/desktop/02-live-agent` | section | / | components/home/sections.tsx (LiveAgent), components/home/AriaWindow.tsx |
| 5 | `home/desktop/03-proof` | section | / | components/home/sections.tsx (Proof), lib/content.ts (trust) |
| 6 | `home/desktop/04-services` | section | / | components/home/sections.tsx (Services), components/home/visuals.tsx (service mock-ups) |
| 7 | `home/desktop/05-studio` | section | / | components/home/sections2.tsx (StudioSection), lib/content.ts (studio) |
| 8 | `home/desktop/06-built-for` | section | / | components/home/sections.tsx (BuiltFor), components/Cast.tsx, lib/content.ts (industries) |
| 9 | `home/desktop/07-work` | section | / | components/home/sections.tsx (WorkReel), lib/projects.ts |
| 10 | `home/desktop/08-receipts` | section | / | components/home/sections2.tsx (ReceiptsTeaser) |
| 11 | `home/desktop/09-manifesto` | section | / | components/home/sections.tsx (Manifesto), components/Cast.tsx (CastRow) |
| 12 | `home/desktop/10-process` | section | / | components/home/sections.tsx (Process), lib/content.ts (processSteps) |
| 13 | `home/desktop/11-demos` | section | / | components/home/sections.tsx (DemosTeaser) |
| 14 | `home/desktop/12-stack-scale` | section | / | components/home/sections2.tsx (StackScale) |
| 15 | `home/desktop/13-pricing` | section | / | components/home/sections.tsx (PricingTeaser) |
| 16 | `home/desktop/14-join-guild` | section | / | components/home/sections2.tsx (JoinGuild), lib/content.ts (guild) |
| 17 | `home/desktop/15-faq` | section | / | components/home/sections.tsx (Faq), components/ui/Accordion.tsx |
| 18 | `home/desktop/16-final-cta` | section | / | components/home/sections.tsx (FinalCta) |
| 19 | `home/desktop/17-footer` | section | / | components/Footer.tsx |
| 20 | `services/desktop/full-page` | full | /services | app/services/page.tsx; app/layout.tsx |
| 21 | `services/desktop/01-five-jobs-one-agent-each` | section | /services | app/services/page.tsx |
| 22 | `services/desktop/02-voice-agents-that-answer-every-call-plus` | section | /services | app/services/page.tsx |
| 23 | `services/desktop/03-which-agent-do-i-need` | section | /services | app/services/page.tsx |
| 24 | `services/desktop/04-works-with-the-tools-you-already-use` | section | /services | app/services/page.tsx |
| 25 | `services/desktop/05-hear-it-then-book-it` | section | /services | app/services/page.tsx |
| 26 | `services/desktop/06-footer` | section | /services | components/Footer.tsx |
| 27 | `service-detail/desktop/full-page` | full | /services/voice | app/services/[slug]/page.tsx; app/layout.tsx |
| 28 | `service-detail/desktop/01-voice-agents-that-answer-every-call` | section | /services/voice | app/services/[slug]/page.tsx |
| 29 | `service-detail/desktop/02-voice-waveform` | section | /services/voice | app/services/[slug]/page.tsx |
| 30 | `service-detail/desktop/03-how-a-call-flows` | section | /services/voice | app/services/[slug]/page.tsx |
| 31 | `service-detail/desktop/04-works-with` | section | /services/voice | app/services/[slug]/page.tsx |
| 32 | `service-detail/desktop/05-price-and-timeline` | section | /services/voice | app/services/[slug]/page.tsx |
| 33 | `service-detail/desktop/06-questions-plus-3-more` | section | /services/voice | app/services/[slug]/page.tsx |
| 34 | `service-detail/desktop/07-hear-it-on-the-demo-page-then-see-the-cl` | section | /services/voice | app/services/[slug]/page.tsx |
| 35 | `service-detail/desktop/08-hear-it-then-book-it` | section | /services/voice | app/services/[slug]/page.tsx |
| 36 | `service-detail/desktop/09-footer` | section | /services/voice | components/Footer.tsx |
| 37 | `studio/desktop/full-page` | full | /studio | app/studio/page.tsx; app/layout.tsx |
| 38 | `studio/desktop/01-agent-first-software-built-like-a-platfo` | section | /studio | app/studio/page.tsx |
| 39 | `studio/desktop/02-agents` | section | /studio | app/studio/page.tsx |
| 40 | `studio/desktop/03-agent-apps` | section | /studio | app/studio/page.tsx |
| 41 | `studio/desktop/04-websites-with-cms` | section | /studio | app/studio/page.tsx |
| 42 | `studio/desktop/05-mobile-apps` | section | /studio | app/studio/page.tsx |
| 43 | `studio/desktop/06-platforms` | section | /studio | app/studio/page.tsx |
| 44 | `studio/desktop/07-we-list-a-tool-here-only-when-we-can-dem` | section | /studio | app/studio/page.tsx |
| 45 | `studio/desktop/08-have-a-build-in-mind` | section | /studio | app/studio/page.tsx |
| 46 | `studio/desktop/09-footer` | section | /studio | components/Footer.tsx |
| 47 | `industry/desktop/full-page` | full | /industries/clinics | app/industries/[slug]/page.tsx; app/layout.tsx |
| 48 | `industry/desktop/01-a-front-desk-that-never-steps-away` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 49 | `industry/desktop/02-three-workflows-we-set-up-first-plus-3-m` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 50 | `industry/desktop/03-hear-it-then-book-it` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 51 | `industry/desktop/04-footer` | section | /industries/clinics | components/Footer.tsx |
| 52 | `crew/desktop/full-page` | full | /crew | app/crew/page.tsx; app/layout.tsx |
| 53 | `crew/desktop/01-seven-bricks-one-job-each` | section | /crew | app/crew/page.tsx |
| 54 | `crew/desktop/02-aria-plus-6-more` | section | /crew | app/crew/page.tsx |
| 55 | `crew/desktop/03-built-from-one-kit-so-they-read-as-a-fam` | section | /crew | app/crew/page.tsx |
| 56 | `crew/desktop/04-want-a-crew-of-your-own` | section | /crew | app/crew/page.tsx |
| 57 | `crew/desktop/05-footer` | section | /crew | components/Footer.tsx |
| 58 | `work/desktop/full-page` | full | /work | app/work/page.tsx; app/layout.tsx |
| 59 | `work/desktop/01-built-shipped-running` | section | /work | app/work/page.tsx |
| 60 | `work/desktop/02-bazar-flow-plus-3-more` | section | /work | app/work/page.tsx |
| 61 | `work/desktop/03-footer` | section | /work | components/Footer.tsx |
| 62 | `work-detail/desktop/full-page` | full | /work/bazar-flow | app/work/[slug]/page.tsx; app/layout.tsx |
| 63 | `work-detail/desktop/01-bazar-flow` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 64 | `work-detail/desktop/02-bazar-flow-preview` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 65 | `work-detail/desktop/03-the-problem` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 66 | `work-detail/desktop/04-the-solution` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 67 | `work-detail/desktop/05-architecture` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 68 | `work-detail/desktop/06-results` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 69 | `work-detail/desktop/07-book-a-call-nextcodenexus-ai` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 70 | `work-detail/desktop/08-footer` | section | /work/bazar-flow | components/Footer.tsx |
| 71 | `demos/desktop/full-page` | full | /demos | app/demos/page.tsx; app/layout.tsx |
| 72 | `demos/desktop/01-try-it-don-t-take-our-word` | section | /demos | app/demos/page.tsx |
| 73 | `demos/desktop/02-live-voice-agent` | section | /demos | app/demos/page.tsx |
| 74 | `demos/desktop/03-call-our-demo-line` | section | /demos | app/demos/page.tsx |
| 75 | `demos/desktop/04-missed-call-calculator` | section | /demos | app/demos/page.tsx |
| 76 | `demos/desktop/05-60-second-game` | section | /demos | app/demos/page.tsx |
| 77 | `demos/desktop/06-build-your-own-agent` | section | /demos | app/demos/page.tsx |
| 78 | `demos/desktop/07-prefer-to-talk-to-a-person` | section | /demos | app/demos/page.tsx |
| 79 | `demos/desktop/08-footer` | section | /demos | components/Footer.tsx |
| 80 | `about/desktop/full-page` | full | /about | app/about/page.tsx; app/layout.tsx |
| 81 | `about/desktop/01-agents-convened` | section | /about | app/about/page.tsx |
| 82 | `about/desktop/02-fixed-scope-plus-4-more` | section | /about | app/about/page.tsx |
| 83 | `about/desktop/03-hear-it-then-book-it` | section | /about | app/about/page.tsx |
| 84 | `about/desktop/04-footer` | section | /about | components/Footer.tsx |
| 85 | `pricing/desktop/full-page` | full | /pricing | app/pricing/page.tsx; app/layout.tsx |
| 86 | `pricing/desktop/01-pilot-build-retainer` | section | /pricing | app/pricing/page.tsx |
| 87 | `pricing/desktop/02-pilot-plus-2-more` | section | /pricing | app/pricing/page.tsx |
| 88 | `pricing/desktop/03-what-is-included` | section | /pricing | app/pricing/page.tsx |
| 89 | `pricing/desktop/04-questions-about-pricing-plus-10-more` | section | /pricing | app/pricing/page.tsx |
| 90 | `pricing/desktop/05-hear-it-then-book-it` | section | /pricing | app/pricing/page.tsx |
| 91 | `pricing/desktop/06-footer` | section | /pricing | components/Footer.tsx |
| 92 | `contact/desktop/full-page` | full | /contact | app/contact/page.tsx; app/layout.tsx |
| 93 | `contact/desktop/01-let-s-talk` | section | /contact | app/contact/page.tsx |
| 94 | `contact/desktop/02-footer` | section | /contact | components/Footer.tsx |
| 95 | `join/desktop/full-page` | full | /join | app/join/page.tsx; app/layout.tsx |
| 96 | `join/desktop/01-the-conclave-guild` | section | /join | app/join/page.tsx |
| 97 | `join/desktop/02-careers-plus-4-more` | section | /join | app/join/page.tsx |
| 98 | `join/desktop/03-prefer-to-hire-us` | section | /join | app/join/page.tsx |
| 99 | `join/desktop/04-footer` | section | /join | components/Footer.tsx |
| 100 | `security/desktop/full-page` | full | /security | app/security/page.tsx; app/layout.tsx |
| 101 | `security/desktop/01-calm-answers-to-the-risky-questions` | section | /security | app/security/page.tsx |
| 102 | `security/desktop/02-data-we-handle-only-what-the-agent-needs` | section | /security | app/security/page.tsx |
| 103 | `security/desktop/03-need-it-in-writing` | section | /security | app/security/page.tsx |
| 104 | `security/desktop/04-footer` | section | /security | components/Footer.tsx |
| 105 | `compare/desktop/full-page` | full | /compare | app/compare/page.tsx; app/layout.tsx |
| 106 | `compare/desktop/01-pick-the-right-tool-even-if-it-is-not-us` | section | /compare | app/compare/page.tsx |
| 107 | `compare/desktop/02-comparison-of-conclave-ai-with-four-alte` | section | /compare | app/compare/page.tsx |
| 108 | `compare/desktop/03-not-sure-which-fits` | section | /compare | app/compare/page.tsx |
| 109 | `compare/desktop/04-footer` | section | /compare | components/Footer.tsx |
| 110 | `receipts/desktop/full-page` | full | /receipts | app/receipts/page.tsx; app/layout.tsx |
| 111 | `receipts/desktop/01-receipts-not-claims` | section | /receipts | app/receipts/page.tsx |
| 112 | `receipts/desktop/02-the-ledger` | section | /receipts | app/receipts/page.tsx |
| 113 | `receipts/desktop/03-build-logs-plus-1-more` | section | /receipts | app/receipts/page.tsx |
| 114 | `receipts/desktop/04-hear-it-then-book-it` | section | /receipts | app/receipts/page.tsx |
| 115 | `receipts/desktop/05-footer` | section | /receipts | components/Footer.tsx |
| 116 | `notes/desktop/full-page` | full | /notes | app/notes/page.tsx; app/layout.tsx |
| 117 | `notes/desktop/01-short-posts-with-a-real-number-or-a-diag` | section | /notes | app/notes/page.tsx |
| 118 | `notes/desktop/02-what-a-missed-call-really-costs-a-clinic` | section | /notes | app/notes/page.tsx |
| 119 | `notes/desktop/03-hear-it-then-book-it` | section | /notes | app/notes/page.tsx |
| 120 | `notes/desktop/04-footer` | section | /notes | components/Footer.tsx |
| 121 | `privacy/desktop/full-page` | full | /privacy | app/privacy/page.tsx; app/layout.tsx |
| 122 | `privacy/desktop/01-privacy` | section | /privacy | app/privacy/page.tsx |
| 123 | `privacy/desktop/02-text-to-be-added-before-launch` | section | /privacy | app/privacy/page.tsx |
| 124 | `privacy/desktop/03-footer` | section | /privacy | components/Footer.tsx |
| 125 | `terms/desktop/full-page` | full | /terms | app/terms/page.tsx; app/layout.tsx |
| 126 | `terms/desktop/01-terms` | section | /terms | app/terms/page.tsx |
| 127 | `terms/desktop/02-text-to-be-added-before-launch` | section | /terms | app/terms/page.tsx |
| 128 | `terms/desktop/03-footer` | section | /terms | components/Footer.tsx |
| 129 | `not-found/desktop/full-page` | full | /no-such-page | app/not-found.tsx; app/layout.tsx |
| 130 | `not-found/desktop/01-nothing-here` | section | /no-such-page | app/not-found.tsx |
| 131 | `not-found/desktop/02-footer` | section | /no-such-page | components/Footer.tsx |
| 132 | `states/desktop/aria-tab-answer-calls` | state | / | components/home/AriaWindow.tsx |
| 133 | `states/desktop/aria-tab-follow-up-fast` | state | / | components/home/AriaWindow.tsx |
| 134 | `states/desktop/aria-tab-book-the-slot` | state | / | components/home/AriaWindow.tsx |
| 135 | `states/desktop/aria-tab-win-back` | state | / | components/home/AriaWindow.tsx |
| 136 | `states/desktop/command-palette` | state | / | components/CommandPalette.tsx |
| 137 | `states/desktop/nav-hover` | state | / | components/Navbar.tsx |
| 138 | `home/mobile/full-page-part1` | full | / | app/page.tsx; app/layout.tsx |
| 139 | `home/mobile/full-page-part2` | full | / | app/page.tsx; app/layout.tsx |
| 140 | `home/mobile/full-page-part3` | full | / | app/page.tsx; app/layout.tsx |
| 141 | `home/mobile/full-page-part4` | full | / | app/page.tsx; app/layout.tsx |
| 142 | `home/mobile/full-page-part5` | full | / | app/page.tsx; app/layout.tsx |
| 143 | `home/mobile/full-page-part6` | full | / | app/page.tsx; app/layout.tsx |
| 144 | `home/mobile/01-hero` | section | / | components/home/sections.tsx (Hero), components/home/visuals.tsx (HeroScene) |
| 145 | `home/mobile/02-live-agent` | section | / | components/home/sections.tsx (LiveAgent), components/home/AriaWindow.tsx |
| 146 | `home/mobile/03-proof` | section | / | components/home/sections.tsx (Proof), lib/content.ts (trust) |
| 147 | `home/mobile/04-services` | section | / | components/home/sections.tsx (Services), components/home/visuals.tsx (service mock-ups) |
| 148 | `home/mobile/05-studio` | section | / | components/home/sections2.tsx (StudioSection), lib/content.ts (studio) |
| 149 | `home/mobile/06-built-for` | section | / | components/home/sections.tsx (BuiltFor), components/Cast.tsx, lib/content.ts (industries) |
| 150 | `home/mobile/07-work` | section | / | components/home/sections.tsx (WorkReel), lib/projects.ts |
| 151 | `home/mobile/08-receipts` | section | / | components/home/sections2.tsx (ReceiptsTeaser) |
| 152 | `home/mobile/09-manifesto` | section | / | components/home/sections.tsx (Manifesto), components/Cast.tsx (CastRow) |
| 153 | `home/mobile/10-process` | section | / | components/home/sections.tsx (Process), lib/content.ts (processSteps) |
| 154 | `home/mobile/11-demos` | section | / | components/home/sections.tsx (DemosTeaser) |
| 155 | `home/mobile/12-stack-scale` | section | / | components/home/sections2.tsx (StackScale) |
| 156 | `home/mobile/13-pricing` | section | / | components/home/sections.tsx (PricingTeaser) |
| 157 | `home/mobile/14-join-guild` | section | / | components/home/sections2.tsx (JoinGuild), lib/content.ts (guild) |
| 158 | `home/mobile/15-faq` | section | / | components/home/sections.tsx (Faq), components/ui/Accordion.tsx |
| 159 | `home/mobile/16-final-cta` | section | / | components/home/sections.tsx (FinalCta) |
| 160 | `home/mobile/17-footer` | section | / | components/Footer.tsx |
| 161 | `services/mobile/full-page` | full | /services | app/services/page.tsx; app/layout.tsx |
| 162 | `services/mobile/01-five-jobs-one-agent-each` | section | /services | app/services/page.tsx |
| 163 | `services/mobile/02-voice-agents-that-answer-every-call-plus` | section | /services | app/services/page.tsx |
| 164 | `services/mobile/03-which-agent-do-i-need` | section | /services | app/services/page.tsx |
| 165 | `services/mobile/04-works-with-the-tools-you-already-use` | section | /services | app/services/page.tsx |
| 166 | `services/mobile/05-hear-it-then-book-it` | section | /services | app/services/page.tsx |
| 167 | `services/mobile/06-footer` | section | /services | components/Footer.tsx |
| 168 | `service-detail/mobile/full-page` | full | /services/voice | app/services/[slug]/page.tsx; app/layout.tsx |
| 169 | `service-detail/mobile/01-voice-agents-that-answer-every-call` | section | /services/voice | app/services/[slug]/page.tsx |
| 170 | `service-detail/mobile/02-voice-waveform` | section | /services/voice | app/services/[slug]/page.tsx |
| 171 | `service-detail/mobile/03-how-a-call-flows` | section | /services/voice | app/services/[slug]/page.tsx |
| 172 | `service-detail/mobile/04-works-with` | section | /services/voice | app/services/[slug]/page.tsx |
| 173 | `service-detail/mobile/05-price-and-timeline` | section | /services/voice | app/services/[slug]/page.tsx |
| 174 | `service-detail/mobile/06-questions-plus-3-more` | section | /services/voice | app/services/[slug]/page.tsx |
| 175 | `service-detail/mobile/07-hear-it-on-the-demo-page-then-see-the-cl` | section | /services/voice | app/services/[slug]/page.tsx |
| 176 | `service-detail/mobile/08-hear-it-then-book-it` | section | /services/voice | app/services/[slug]/page.tsx |
| 177 | `service-detail/mobile/09-footer` | section | /services/voice | components/Footer.tsx |
| 178 | `studio/mobile/full-page` | full | /studio | app/studio/page.tsx; app/layout.tsx |
| 179 | `studio/mobile/01-agent-first-software-built-like-a-platfo` | section | /studio | app/studio/page.tsx |
| 180 | `studio/mobile/02-agents` | section | /studio | app/studio/page.tsx |
| 181 | `studio/mobile/03-agent-apps` | section | /studio | app/studio/page.tsx |
| 182 | `studio/mobile/04-websites-with-cms` | section | /studio | app/studio/page.tsx |
| 183 | `studio/mobile/05-mobile-apps` | section | /studio | app/studio/page.tsx |
| 184 | `studio/mobile/06-platforms` | section | /studio | app/studio/page.tsx |
| 185 | `studio/mobile/07-we-list-a-tool-here-only-when-we-can-dem` | section | /studio | app/studio/page.tsx |
| 186 | `studio/mobile/08-have-a-build-in-mind` | section | /studio | app/studio/page.tsx |
| 187 | `studio/mobile/09-footer` | section | /studio | components/Footer.tsx |
| 188 | `industry/mobile/full-page` | full | /industries/clinics | app/industries/[slug]/page.tsx; app/layout.tsx |
| 189 | `industry/mobile/01-a-front-desk-that-never-steps-away` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 190 | `industry/mobile/02-three-workflows-we-set-up-first` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 191 | `industry/mobile/03-agents-that-do-the-work` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 192 | `industry/mobile/04-the-usual-objection-plus-1-more` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 193 | `industry/mobile/05-language-we-build-in-english-arabic-and-` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 194 | `industry/mobile/06-hear-it-then-book-it` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 195 | `industry/mobile/07-footer` | section | /industries/clinics | components/Footer.tsx |
| 196 | `crew/mobile/full-page` | full | /crew | app/crew/page.tsx; app/layout.tsx |
| 197 | `crew/mobile/01-seven-bricks-one-job-each` | section | /crew | app/crew/page.tsx |
| 198 | `crew/mobile/02-aria-plus-6-more` | section | /crew | app/crew/page.tsx |
| 199 | `crew/mobile/03-built-from-one-kit-so-they-read-as-a-fam` | section | /crew | app/crew/page.tsx |
| 200 | `crew/mobile/04-want-a-crew-of-your-own` | section | /crew | app/crew/page.tsx |
| 201 | `crew/mobile/05-footer` | section | /crew | components/Footer.tsx |
| 202 | `work/mobile/full-page` | full | /work | app/work/page.tsx; app/layout.tsx |
| 203 | `work/mobile/01-built-shipped-running` | section | /work | app/work/page.tsx |
| 204 | `work/mobile/02-project-types` | section | /work | app/work/page.tsx |
| 205 | `work/mobile/03-bazar-flow-plus-3-more` | section | /work | app/work/page.tsx |
| 206 | `work/mobile/04-footer` | section | /work | components/Footer.tsx |
| 207 | `work-detail/mobile/full-page` | full | /work/bazar-flow | app/work/[slug]/page.tsx; app/layout.tsx |
| 208 | `work-detail/mobile/01-bazar-flow` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 209 | `work-detail/mobile/02-bazar-flow-preview` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 210 | `work-detail/mobile/03-the-problem` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 211 | `work-detail/mobile/04-the-solution` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 212 | `work-detail/mobile/05-architecture` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 213 | `work-detail/mobile/06-results` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 214 | `work-detail/mobile/07-book-a-call-nextcodenexus-ai` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 215 | `work-detail/mobile/08-footer` | section | /work/bazar-flow | components/Footer.tsx |
| 216 | `demos/mobile/full-page` | full | /demos | app/demos/page.tsx; app/layout.tsx |
| 217 | `demos/mobile/01-try-it-don-t-take-our-word` | section | /demos | app/demos/page.tsx |
| 218 | `demos/mobile/02-live-voice-agent` | section | /demos | app/demos/page.tsx |
| 219 | `demos/mobile/03-call-our-demo-line` | section | /demos | app/demos/page.tsx |
| 220 | `demos/mobile/04-missed-call-calculator` | section | /demos | app/demos/page.tsx |
| 221 | `demos/mobile/05-60-second-game` | section | /demos | app/demos/page.tsx |
| 222 | `demos/mobile/06-build-your-own-agent` | section | /demos | app/demos/page.tsx |
| 223 | `demos/mobile/07-prefer-to-talk-to-a-person` | section | /demos | app/demos/page.tsx |
| 224 | `demos/mobile/08-footer` | section | /demos | components/Footer.tsx |
| 225 | `about/mobile/full-page` | full | /about | app/about/page.tsx; app/layout.tsx |
| 226 | `about/mobile/01-agents-convened` | section | /about | app/about/page.tsx |
| 227 | `about/mobile/02-fixed-scope-plus-2-more` | section | /about | app/about/page.tsx |
| 228 | `about/mobile/03-the-brick-crew` | section | /about | app/about/page.tsx |
| 229 | `about/mobile/04-the-people` | section | /about | app/about/page.tsx |
| 230 | `about/mobile/05-where-we-are` | section | /about | app/about/page.tsx |
| 231 | `about/mobile/06-conclave-ai-is-an-agent-studio-not-affil` | section | /about | app/about/page.tsx |
| 232 | `about/mobile/07-hear-it-then-book-it` | section | /about | app/about/page.tsx |
| 233 | `about/mobile/08-footer` | section | /about | components/Footer.tsx |
| 234 | `pricing/mobile/full-page` | full | /pricing | app/pricing/page.tsx; app/layout.tsx |
| 235 | `pricing/mobile/01-pilot-build-retainer` | section | /pricing | app/pricing/page.tsx |
| 236 | `pricing/mobile/02-pilot` | section | /pricing | app/pricing/page.tsx |
| 237 | `pricing/mobile/03-build` | section | /pricing | app/pricing/page.tsx |
| 238 | `pricing/mobile/04-retainer` | section | /pricing | app/pricing/page.tsx |
| 239 | `pricing/mobile/05-what-is-included` | section | /pricing | app/pricing/page.tsx |
| 240 | `pricing/mobile/06-questions-about-pricing-plus-10-more` | section | /pricing | app/pricing/page.tsx |
| 241 | `pricing/mobile/07-hear-it-then-book-it` | section | /pricing | app/pricing/page.tsx |
| 242 | `pricing/mobile/08-footer` | section | /pricing | components/Footer.tsx |
| 243 | `contact/mobile/full-page` | full | /contact | app/contact/page.tsx; app/layout.tsx |
| 244 | `contact/mobile/01-let-s-talk` | section | /contact | app/contact/page.tsx |
| 245 | `contact/mobile/02-footer` | section | /contact | components/Footer.tsx |
| 246 | `join/mobile/full-page` | full | /join | app/join/page.tsx; app/layout.tsx |
| 247 | `join/mobile/01-the-conclave-guild` | section | /join | app/join/page.tsx |
| 248 | `join/mobile/02-careers` | section | /join | app/join/page.tsx |
| 249 | `join/mobile/03-partner-programme` | section | /join | app/join/page.tsx |
| 250 | `join/mobile/04-open-source-templates` | section | /join | app/join/page.tsx |
| 251 | `join/mobile/05-bounties` | section | /join | app/join/page.tsx |
| 252 | `join/mobile/06-the-convene-leaderboard` | section | /join | app/join/page.tsx |
| 253 | `join/mobile/07-prefer-to-hire-us` | section | /join | app/join/page.tsx |
| 254 | `join/mobile/08-footer` | section | /join | components/Footer.tsx |
| 255 | `security/mobile/full-page` | full | /security | app/security/page.tsx; app/layout.tsx |
| 256 | `security/mobile/01-calm-answers-to-the-risky-questions` | section | /security | app/security/page.tsx |
| 257 | `security/mobile/02-data-we-handle-only-what-the-agent-needs` | section | /security | app/security/page.tsx |
| 258 | `security/mobile/03-this-page-is-a-plain-language-summary-no` | section | /security | app/security/page.tsx |
| 259 | `security/mobile/04-need-it-in-writing` | section | /security | app/security/page.tsx |
| 260 | `security/mobile/05-footer` | section | /security | components/Footer.tsx |
| 261 | `compare/mobile/full-page` | full | /compare | app/compare/page.tsx; app/layout.tsx |
| 262 | `compare/mobile/01-pick-the-right-tool-even-if-it-is-not-us` | section | /compare | app/compare/page.tsx |
| 263 | `compare/mobile/02-comparison-of-conclave-ai-with-four-alte` | section | /compare | app/compare/page.tsx |
| 264 | `compare/mobile/03-not-sure-which-fits` | section | /compare | app/compare/page.tsx |
| 265 | `compare/mobile/04-footer` | section | /compare | components/Footer.tsx |
| 266 | `receipts/mobile/full-page` | full | /receipts | app/receipts/page.tsx; app/layout.tsx |
| 267 | `receipts/mobile/01-receipts-not-claims` | section | /receipts | app/receipts/page.tsx |
| 268 | `receipts/mobile/02-the-ledger` | section | /receipts | app/receipts/page.tsx |
| 269 | `receipts/mobile/03-build-logs-plus-1-more` | section | /receipts | app/receipts/page.tsx |
| 270 | `receipts/mobile/04-hear-it-then-book-it` | section | /receipts | app/receipts/page.tsx |
| 271 | `receipts/mobile/05-footer` | section | /receipts | components/Footer.tsx |
| 272 | `notes/mobile/full-page` | full | /notes | app/notes/page.tsx; app/layout.tsx |
| 273 | `notes/mobile/01-short-posts-with-a-real-number-or-a-diag` | section | /notes | app/notes/page.tsx |
| 274 | `notes/mobile/02-what-a-missed-call-really-costs-a-clinic` | section | /notes | app/notes/page.tsx |
| 275 | `notes/mobile/03-hear-it-then-book-it` | section | /notes | app/notes/page.tsx |
| 276 | `notes/mobile/04-footer` | section | /notes | components/Footer.tsx |
| 277 | `privacy/mobile/full-page` | full | /privacy | app/privacy/page.tsx; app/layout.tsx |
| 278 | `privacy/mobile/01-privacy` | section | /privacy | app/privacy/page.tsx |
| 279 | `privacy/mobile/02-text-to-be-added-before-launch` | section | /privacy | app/privacy/page.tsx |
| 280 | `privacy/mobile/03-footer` | section | /privacy | components/Footer.tsx |
| 281 | `terms/mobile/full-page` | full | /terms | app/terms/page.tsx; app/layout.tsx |
| 282 | `terms/mobile/01-terms` | section | /terms | app/terms/page.tsx |
| 283 | `terms/mobile/02-text-to-be-added-before-launch` | section | /terms | app/terms/page.tsx |
| 284 | `terms/mobile/03-footer` | section | /terms | components/Footer.tsx |
| 285 | `not-found/mobile/full-page` | full | /no-such-page | app/not-found.tsx; app/layout.tsx |
| 286 | `not-found/mobile/01-nothing-here` | section | /no-such-page | app/not-found.tsx |
| 287 | `not-found/mobile/02-footer` | section | /no-such-page | components/Footer.tsx |
| 288 | `states/mobile/mobile-menu` | state | / | components/Navbar.tsx |
