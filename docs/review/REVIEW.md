# Conclave AI: design review pack

You are reviewing the current look of the Conclave AI website. This folder is a visual snapshot of **every page and every section**, at desktop (1440px) and mobile (390px), plus interactive states. Generated 2026-10-22. 350 shots across 23 groups.

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
| 49 | `industry/desktop/02-three-workflows-we-set-up-first` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 50 | `industry/desktop/03-what-the-week-looks-like` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 51 | `industry/desktop/04-agents-that-do-the-work` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 52 | `industry/desktop/05-the-usual-objection-plus-1-more` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 53 | `industry/desktop/06-language-we-build-in-english-arabic-and-` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 54 | `industry/desktop/07-hear-it-then-book-it` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 55 | `industry/desktop/08-footer` | section | /industries/clinics | components/Footer.tsx |
| 56 | `crew/desktop/full-page` | full | /crew | app/crew/page.tsx; app/layout.tsx |
| 57 | `crew/desktop/01-seven-bricks-one-job-each` | section | /crew | app/crew/page.tsx |
| 58 | `crew/desktop/02-aria-plus-6-more` | section | /crew | app/crew/page.tsx |
| 59 | `crew/desktop/03-built-from-one-kit-so-they-read-as-a-fam` | section | /crew | app/crew/page.tsx |
| 60 | `crew/desktop/04-want-a-crew-of-your-own` | section | /crew | app/crew/page.tsx |
| 61 | `crew/desktop/05-footer` | section | /crew | components/Footer.tsx |
| 62 | `work/desktop/full-page` | full | /work | app/work/page.tsx; app/layout.tsx |
| 63 | `work/desktop/01-built-shipped-running` | section | /work | app/work/page.tsx |
| 64 | `work/desktop/02-filter-by-type` | section | /work | app/work/page.tsx |
| 65 | `work/desktop/03-bazar-flow-plus-3-more` | section | /work | app/work/page.tsx |
| 66 | `work/desktop/04-testimonial-client-quotes-appear-here-wi` | section | /work | app/work/page.tsx |
| 67 | `work/desktop/05-hear-it-then-book-it` | section | /work | app/work/page.tsx |
| 68 | `work/desktop/06-footer` | section | /work | components/Footer.tsx |
| 69 | `work-detail/desktop/full-page` | full | /work/bazar-flow | app/work/[slug]/page.tsx; app/layout.tsx |
| 70 | `work-detail/desktop/01-bazar-flow` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 71 | `work-detail/desktop/02-bazar-flow-preview` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 72 | `work-detail/desktop/03-result` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 73 | `work-detail/desktop/04-the-problem` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 74 | `work-detail/desktop/05-the-solution` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 75 | `work-detail/desktop/06-architecture` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 76 | `work-detail/desktop/07-what-we-would-do-differently` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 77 | `work-detail/desktop/08-next-project-codenexus-ai` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 78 | `work-detail/desktop/09-hear-it-then-book-it` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 79 | `work-detail/desktop/10-footer` | section | /work/bazar-flow | components/Footer.tsx |
| 80 | `demos/desktop/full-page` | full | /demos | app/demos/page.tsx; app/layout.tsx |
| 81 | `demos/desktop/01-try-it-don-t-take-our-word` | section | /demos | app/demos/page.tsx |
| 82 | `demos/desktop/02-a-voice-agent-for-a-sample-clinic` | section | /demos | app/demos/page.tsx |
| 83 | `demos/desktop/03-what-does-a-missed-call-cost-you` | section | /demos | app/demos/page.tsx |
| 84 | `demos/desktop/04-the-60-second-game-plus-1-more` | section | /demos | app/demos/page.tsx |
| 85 | `demos/desktop/05-build-your-own-agent-in-four-questions` | section | /demos | app/demos/page.tsx |
| 86 | `demos/desktop/06-call-our-demo-line` | section | /demos | app/demos/page.tsx |
| 87 | `demos/desktop/07-prefer-to-talk-to-a-person` | section | /demos | app/demos/page.tsx |
| 88 | `demos/desktop/08-footer` | section | /demos | components/Footer.tsx |
| 89 | `about/desktop/full-page` | full | /about | app/about/page.tsx; app/layout.tsx |
| 90 | `about/desktop/01-agents-convened` | section | /about | app/about/page.tsx |
| 91 | `about/desktop/02-fixed-scope-plus-4-more` | section | /about | app/about/page.tsx |
| 92 | `about/desktop/03-hear-it-then-book-it` | section | /about | app/about/page.tsx |
| 93 | `about/desktop/04-footer` | section | /about | components/Footer.tsx |
| 94 | `pricing/desktop/full-page` | full | /pricing | app/pricing/page.tsx; app/layout.tsx |
| 95 | `pricing/desktop/01-pilot-build-retainer` | section | /pricing | app/pricing/page.tsx |
| 96 | `pricing/desktop/02-pilot-plus-2-more` | section | /pricing | app/pricing/page.tsx |
| 97 | `pricing/desktop/03-what-is-included` | section | /pricing | app/pricing/page.tsx |
| 98 | `pricing/desktop/04-questions-about-pricing-plus-10-more` | section | /pricing | app/pricing/page.tsx |
| 99 | `pricing/desktop/05-hear-it-then-book-it` | section | /pricing | app/pricing/page.tsx |
| 100 | `pricing/desktop/06-footer` | section | /pricing | components/Footer.tsx |
| 101 | `contact/desktop/full-page` | full | /contact | app/contact/page.tsx; app/layout.tsx |
| 102 | `contact/desktop/01-let-s-talk` | section | /contact | app/contact/page.tsx |
| 103 | `contact/desktop/02-tell-us-what-you-need` | section | /contact | app/contact/page.tsx |
| 104 | `contact/desktop/03-footer` | section | /contact | components/Footer.tsx |
| 105 | `join/desktop/full-page` | full | /join | app/join/page.tsx; app/layout.tsx |
| 106 | `join/desktop/01-the-conclave-guild` | section | /join | app/join/page.tsx |
| 107 | `join/desktop/02-careers-plus-4-more` | section | /join | app/join/page.tsx |
| 108 | `join/desktop/03-prefer-to-hire-us` | section | /join | app/join/page.tsx |
| 109 | `join/desktop/04-footer` | section | /join | components/Footer.tsx |
| 110 | `security/desktop/full-page` | full | /security | app/security/page.tsx; app/layout.tsx |
| 111 | `security/desktop/01-calm-answers-to-the-risky-questions` | section | /security | app/security/page.tsx |
| 112 | `security/desktop/02-data-we-handle-only-what-the-agent-needs` | section | /security | app/security/page.tsx |
| 113 | `security/desktop/03-need-it-in-writing` | section | /security | app/security/page.tsx |
| 114 | `security/desktop/04-footer` | section | /security | components/Footer.tsx |
| 115 | `compare/desktop/full-page` | full | /compare | app/compare/page.tsx; app/layout.tsx |
| 116 | `compare/desktop/01-pick-the-right-tool-even-if-it-is-not-us` | section | /compare | app/compare/page.tsx |
| 117 | `compare/desktop/02-table-scrolls-sideways` | section | /compare | app/compare/page.tsx |
| 118 | `compare/desktop/03-not-sure-which-fits` | section | /compare | app/compare/page.tsx |
| 119 | `compare/desktop/04-footer` | section | /compare | components/Footer.tsx |
| 120 | `receipts/desktop/full-page` | full | /receipts | app/receipts/page.tsx; app/layout.tsx |
| 121 | `receipts/desktop/01-receipts-not-claims` | section | /receipts | app/receipts/page.tsx |
| 122 | `receipts/desktop/02-the-ledger` | section | /receipts | app/receipts/page.tsx |
| 123 | `receipts/desktop/03-build-logs-plus-1-more` | section | /receipts | app/receipts/page.tsx |
| 124 | `receipts/desktop/04-hear-it-then-book-it` | section | /receipts | app/receipts/page.tsx |
| 125 | `receipts/desktop/05-footer` | section | /receipts | components/Footer.tsx |
| 126 | `notes/desktop/full-page` | full | /notes | app/notes/page.tsx; app/layout.tsx |
| 127 | `notes/desktop/01-short-posts-with-a-real-number-or-a-diag` | section | /notes | app/notes/page.tsx |
| 128 | `notes/desktop/02-what-a-voice-agent-costs-to-run-line-by-` | section | /notes | app/notes/page.tsx |
| 129 | `notes/desktop/03-hear-it-then-book-it` | section | /notes | app/notes/page.tsx |
| 130 | `notes/desktop/04-footer` | section | /notes | components/Footer.tsx |
| 131 | `note/desktop/full-page` | full | /notes/missed-call-cost | app/notes/[slug]/page.tsx; app/layout.tsx |
| 132 | `note/desktop/01-what-a-missed-call-really-costs-a-clinic` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 133 | `note/desktop/02-most-owners-know-calls-are-being-missed-` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 134 | `note/desktop/03-the-formula` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 135 | `note/desktop/04-missed-calls-per-week-share-that-would-h` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 136 | `note/desktop/05-a-worked-example-made-up-round-numbers-n` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 137 | `note/desktop/06-10-missed-calls-30-3-bookings-lost-per-w` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 138 | `note/desktop/07-those-inputs-are-examples-to-show-the-me` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 139 | `note/desktop/08-where-each-input-comes-from` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 140 | `note/desktop/09-missed-calls-per-week-your-phone-provide` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 141 | `note/desktop/10-what-an-agent-changes-and-what-it-does-n` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 142 | `note/desktop/11-a-voice-agent-answers-the-call-in-one-ri` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 143 | `note/desktop/12-run-it-on-your-own-numbers` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 144 | `note/desktop/13-hear-it-then-book-it` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 145 | `note/desktop/14-footer` | section | /notes/missed-call-cost | components/Footer.tsx |
| 146 | `roadmap/desktop/full-page` | full | /roadmap | app/roadmap/page.tsx; app/layout.tsx |
| 147 | `roadmap/desktop/01-what-shipped-what-is-next` | section | /roadmap | app/roadmap/page.tsx |
| 148 | `roadmap/desktop/02-shipped-voice-follow-up-booking-reactiva` | section | /roadmap | app/roadmap/page.tsx |
| 149 | `roadmap/desktop/03-hear-it-then-book-it` | section | /roadmap | app/roadmap/page.tsx |
| 150 | `roadmap/desktop/04-footer` | section | /roadmap | components/Footer.tsx |
| 151 | `privacy/desktop/full-page` | full | /privacy | app/privacy/page.tsx; app/layout.tsx |
| 152 | `privacy/desktop/01-privacy` | section | /privacy | app/privacy/page.tsx |
| 153 | `privacy/desktop/02-text-to-be-added-before-launch` | section | /privacy | app/privacy/page.tsx |
| 154 | `privacy/desktop/03-footer` | section | /privacy | components/Footer.tsx |
| 155 | `terms/desktop/full-page` | full | /terms | app/terms/page.tsx; app/layout.tsx |
| 156 | `terms/desktop/01-terms` | section | /terms | app/terms/page.tsx |
| 157 | `terms/desktop/02-text-to-be-added-before-launch` | section | /terms | app/terms/page.tsx |
| 158 | `terms/desktop/03-footer` | section | /terms | components/Footer.tsx |
| 159 | `not-found/desktop/full-page` | full | /no-such-page | app/not-found.tsx; app/layout.tsx |
| 160 | `not-found/desktop/01-nothing-here` | section | /no-such-page | app/not-found.tsx |
| 161 | `not-found/desktop/02-footer` | section | /no-such-page | components/Footer.tsx |
| 162 | `states/desktop/aria-tab-answer-calls` | state | / | components/home/AriaWindow.tsx |
| 163 | `states/desktop/aria-tab-follow-up-fast` | state | / | components/home/AriaWindow.tsx |
| 164 | `states/desktop/aria-tab-book-the-slot` | state | / | components/home/AriaWindow.tsx |
| 165 | `states/desktop/aria-tab-win-back` | state | / | components/home/AriaWindow.tsx |
| 166 | `states/desktop/command-palette` | state | / | components/CommandPalette.tsx |
| 167 | `states/desktop/nav-hover` | state | / | components/Navbar.tsx |
| 168 | `home/mobile/full-page-part1` | full | / | app/page.tsx; app/layout.tsx |
| 169 | `home/mobile/full-page-part2` | full | / | app/page.tsx; app/layout.tsx |
| 170 | `home/mobile/full-page-part3` | full | / | app/page.tsx; app/layout.tsx |
| 171 | `home/mobile/full-page-part4` | full | / | app/page.tsx; app/layout.tsx |
| 172 | `home/mobile/full-page-part5` | full | / | app/page.tsx; app/layout.tsx |
| 173 | `home/mobile/full-page-part6` | full | / | app/page.tsx; app/layout.tsx |
| 174 | `home/mobile/01-hero` | section | / | components/home/sections.tsx (Hero), components/home/visuals.tsx (HeroScene) |
| 175 | `home/mobile/02-live-agent` | section | / | components/home/sections.tsx (LiveAgent), components/home/AriaWindow.tsx |
| 176 | `home/mobile/03-proof` | section | / | components/home/sections.tsx (Proof), lib/content.ts (trust) |
| 177 | `home/mobile/04-services` | section | / | components/home/sections.tsx (Services), components/home/visuals.tsx (service mock-ups) |
| 178 | `home/mobile/05-studio` | section | / | components/home/sections2.tsx (StudioSection), lib/content.ts (studio) |
| 179 | `home/mobile/06-built-for` | section | / | components/home/sections.tsx (BuiltFor), components/Cast.tsx, lib/content.ts (industries) |
| 180 | `home/mobile/07-work` | section | / | components/home/sections.tsx (WorkReel), lib/projects.ts |
| 181 | `home/mobile/08-receipts` | section | / | components/home/sections2.tsx (ReceiptsTeaser) |
| 182 | `home/mobile/09-manifesto` | section | / | components/home/sections.tsx (Manifesto), components/Cast.tsx (CastRow) |
| 183 | `home/mobile/10-process` | section | / | components/home/sections.tsx (Process), lib/content.ts (processSteps) |
| 184 | `home/mobile/11-demos` | section | / | components/home/sections.tsx (DemosTeaser) |
| 185 | `home/mobile/12-stack-scale` | section | / | components/home/sections2.tsx (StackScale) |
| 186 | `home/mobile/13-pricing` | section | / | components/home/sections.tsx (PricingTeaser) |
| 187 | `home/mobile/14-join-guild` | section | / | components/home/sections2.tsx (JoinGuild), lib/content.ts (guild) |
| 188 | `home/mobile/15-faq` | section | / | components/home/sections.tsx (Faq), components/ui/Accordion.tsx |
| 189 | `home/mobile/16-final-cta` | section | / | components/home/sections.tsx (FinalCta) |
| 190 | `home/mobile/17-footer` | section | / | components/Footer.tsx |
| 191 | `services/mobile/full-page` | full | /services | app/services/page.tsx; app/layout.tsx |
| 192 | `services/mobile/01-five-jobs-one-agent-each` | section | /services | app/services/page.tsx |
| 193 | `services/mobile/02-voice-agents-that-answer-every-call-plus` | section | /services | app/services/page.tsx |
| 194 | `services/mobile/03-which-agent-do-i-need` | section | /services | app/services/page.tsx |
| 195 | `services/mobile/04-works-with-the-tools-you-already-use` | section | /services | app/services/page.tsx |
| 196 | `services/mobile/05-hear-it-then-book-it` | section | /services | app/services/page.tsx |
| 197 | `services/mobile/06-footer` | section | /services | components/Footer.tsx |
| 198 | `service-detail/mobile/full-page` | full | /services/voice | app/services/[slug]/page.tsx; app/layout.tsx |
| 199 | `service-detail/mobile/01-voice-agents-that-answer-every-call` | section | /services/voice | app/services/[slug]/page.tsx |
| 200 | `service-detail/mobile/02-voice-waveform` | section | /services/voice | app/services/[slug]/page.tsx |
| 201 | `service-detail/mobile/03-how-a-call-flows` | section | /services/voice | app/services/[slug]/page.tsx |
| 202 | `service-detail/mobile/04-works-with` | section | /services/voice | app/services/[slug]/page.tsx |
| 203 | `service-detail/mobile/05-price-and-timeline` | section | /services/voice | app/services/[slug]/page.tsx |
| 204 | `service-detail/mobile/06-questions-plus-3-more` | section | /services/voice | app/services/[slug]/page.tsx |
| 205 | `service-detail/mobile/07-hear-it-on-the-demo-page-then-see-the-cl` | section | /services/voice | app/services/[slug]/page.tsx |
| 206 | `service-detail/mobile/08-hear-it-then-book-it` | section | /services/voice | app/services/[slug]/page.tsx |
| 207 | `service-detail/mobile/09-footer` | section | /services/voice | components/Footer.tsx |
| 208 | `studio/mobile/full-page` | full | /studio | app/studio/page.tsx; app/layout.tsx |
| 209 | `studio/mobile/01-agent-first-software-built-like-a-platfo` | section | /studio | app/studio/page.tsx |
| 210 | `studio/mobile/02-agents` | section | /studio | app/studio/page.tsx |
| 211 | `studio/mobile/03-agent-apps` | section | /studio | app/studio/page.tsx |
| 212 | `studio/mobile/04-websites-with-cms` | section | /studio | app/studio/page.tsx |
| 213 | `studio/mobile/05-mobile-apps` | section | /studio | app/studio/page.tsx |
| 214 | `studio/mobile/06-platforms` | section | /studio | app/studio/page.tsx |
| 215 | `studio/mobile/07-we-list-a-tool-here-only-when-we-can-dem` | section | /studio | app/studio/page.tsx |
| 216 | `studio/mobile/08-have-a-build-in-mind` | section | /studio | app/studio/page.tsx |
| 217 | `studio/mobile/09-footer` | section | /studio | components/Footer.tsx |
| 218 | `industry/mobile/full-page` | full | /industries/clinics | app/industries/[slug]/page.tsx; app/layout.tsx |
| 219 | `industry/mobile/01-a-front-desk-that-never-steps-away` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 220 | `industry/mobile/02-three-workflows-we-set-up-first` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 221 | `industry/mobile/03-what-the-week-looks-like` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 222 | `industry/mobile/04-agents-that-do-the-work` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 223 | `industry/mobile/05-the-usual-objection-plus-1-more` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 224 | `industry/mobile/06-language-we-build-in-english-arabic-and-` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 225 | `industry/mobile/07-hear-it-then-book-it` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 226 | `industry/mobile/08-footer` | section | /industries/clinics | components/Footer.tsx |
| 227 | `crew/mobile/full-page` | full | /crew | app/crew/page.tsx; app/layout.tsx |
| 228 | `crew/mobile/01-seven-bricks-one-job-each` | section | /crew | app/crew/page.tsx |
| 229 | `crew/mobile/02-aria-plus-6-more` | section | /crew | app/crew/page.tsx |
| 230 | `crew/mobile/03-built-from-one-kit-so-they-read-as-a-fam` | section | /crew | app/crew/page.tsx |
| 231 | `crew/mobile/04-want-a-crew-of-your-own` | section | /crew | app/crew/page.tsx |
| 232 | `crew/mobile/05-footer` | section | /crew | components/Footer.tsx |
| 233 | `work/mobile/full-page` | full | /work | app/work/page.tsx; app/layout.tsx |
| 234 | `work/mobile/01-built-shipped-running` | section | /work | app/work/page.tsx |
| 235 | `work/mobile/02-filter-by-type` | section | /work | app/work/page.tsx |
| 236 | `work/mobile/03-bazar-flow-plus-3-more` | section | /work | app/work/page.tsx |
| 237 | `work/mobile/04-testimonial-client-quotes-appear-here-wi` | section | /work | app/work/page.tsx |
| 238 | `work/mobile/05-hear-it-then-book-it` | section | /work | app/work/page.tsx |
| 239 | `work/mobile/06-footer` | section | /work | components/Footer.tsx |
| 240 | `work-detail/mobile/full-page` | full | /work/bazar-flow | app/work/[slug]/page.tsx; app/layout.tsx |
| 241 | `work-detail/mobile/01-bazar-flow` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 242 | `work-detail/mobile/02-bazar-flow-preview` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 243 | `work-detail/mobile/03-result` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 244 | `work-detail/mobile/04-the-problem` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 245 | `work-detail/mobile/05-the-solution` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 246 | `work-detail/mobile/06-architecture` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 247 | `work-detail/mobile/07-what-we-would-do-differently` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 248 | `work-detail/mobile/08-next-project-codenexus-ai` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 249 | `work-detail/mobile/09-hear-it-then-book-it` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 250 | `work-detail/mobile/10-footer` | section | /work/bazar-flow | components/Footer.tsx |
| 251 | `demos/mobile/full-page` | full | /demos | app/demos/page.tsx; app/layout.tsx |
| 252 | `demos/mobile/01-try-it-don-t-take-our-word` | section | /demos | app/demos/page.tsx |
| 253 | `demos/mobile/02-a-voice-agent-for-a-sample-clinic` | section | /demos | app/demos/page.tsx |
| 254 | `demos/mobile/03-what-does-a-missed-call-cost-you` | section | /demos | app/demos/page.tsx |
| 255 | `demos/mobile/04-the-60-second-game-plus-1-more` | section | /demos | app/demos/page.tsx |
| 256 | `demos/mobile/05-build-your-own-agent-in-four-questions` | section | /demos | app/demos/page.tsx |
| 257 | `demos/mobile/06-call-our-demo-line` | section | /demos | app/demos/page.tsx |
| 258 | `demos/mobile/07-prefer-to-talk-to-a-person` | section | /demos | app/demos/page.tsx |
| 259 | `demos/mobile/08-footer` | section | /demos | components/Footer.tsx |
| 260 | `about/mobile/full-page` | full | /about | app/about/page.tsx; app/layout.tsx |
| 261 | `about/mobile/01-agents-convened` | section | /about | app/about/page.tsx |
| 262 | `about/mobile/02-fixed-scope-plus-2-more` | section | /about | app/about/page.tsx |
| 263 | `about/mobile/03-the-brick-crew` | section | /about | app/about/page.tsx |
| 264 | `about/mobile/04-the-people` | section | /about | app/about/page.tsx |
| 265 | `about/mobile/05-where-we-are` | section | /about | app/about/page.tsx |
| 266 | `about/mobile/06-conclave-ai-is-an-agent-studio-not-affil` | section | /about | app/about/page.tsx |
| 267 | `about/mobile/07-hear-it-then-book-it` | section | /about | app/about/page.tsx |
| 268 | `about/mobile/08-footer` | section | /about | components/Footer.tsx |
| 269 | `pricing/mobile/full-page` | full | /pricing | app/pricing/page.tsx; app/layout.tsx |
| 270 | `pricing/mobile/01-pilot-build-retainer` | section | /pricing | app/pricing/page.tsx |
| 271 | `pricing/mobile/02-pilot` | section | /pricing | app/pricing/page.tsx |
| 272 | `pricing/mobile/03-build` | section | /pricing | app/pricing/page.tsx |
| 273 | `pricing/mobile/04-retainer` | section | /pricing | app/pricing/page.tsx |
| 274 | `pricing/mobile/05-what-is-included` | section | /pricing | app/pricing/page.tsx |
| 275 | `pricing/mobile/06-questions-about-pricing-plus-10-more` | section | /pricing | app/pricing/page.tsx |
| 276 | `pricing/mobile/07-hear-it-then-book-it` | section | /pricing | app/pricing/page.tsx |
| 277 | `pricing/mobile/08-footer` | section | /pricing | components/Footer.tsx |
| 278 | `contact/mobile/full-page` | full | /contact | app/contact/page.tsx; app/layout.tsx |
| 279 | `contact/mobile/01-let-s-talk` | section | /contact | app/contact/page.tsx |
| 280 | `contact/mobile/02-name-email-company-optional` | section | /contact | app/contact/page.tsx |
| 281 | `contact/mobile/03-what-would-help-most-voice-agents-follow` | section | /contact | app/contact/page.tsx |
| 282 | `contact/mobile/04-where-would-you-like-to-start-choose-one` | section | /contact | app/contact/page.tsx |
| 283 | `contact/mobile/05-message` | section | /contact | app/contact/page.tsx |
| 284 | `contact/mobile/06-send-message` | section | /contact | app/contact/page.tsx |
| 285 | `contact/mobile/07-footer` | section | /contact | components/Footer.tsx |
| 286 | `join/mobile/full-page` | full | /join | app/join/page.tsx; app/layout.tsx |
| 287 | `join/mobile/01-the-conclave-guild` | section | /join | app/join/page.tsx |
| 288 | `join/mobile/02-careers` | section | /join | app/join/page.tsx |
| 289 | `join/mobile/03-partner-programme` | section | /join | app/join/page.tsx |
| 290 | `join/mobile/04-open-source-templates` | section | /join | app/join/page.tsx |
| 291 | `join/mobile/05-bounties` | section | /join | app/join/page.tsx |
| 292 | `join/mobile/06-the-convene-leaderboard` | section | /join | app/join/page.tsx |
| 293 | `join/mobile/07-prefer-to-hire-us` | section | /join | app/join/page.tsx |
| 294 | `join/mobile/08-footer` | section | /join | components/Footer.tsx |
| 295 | `security/mobile/full-page` | full | /security | app/security/page.tsx; app/layout.tsx |
| 296 | `security/mobile/01-calm-answers-to-the-risky-questions` | section | /security | app/security/page.tsx |
| 297 | `security/mobile/02-data-we-handle-only-what-the-agent-needs` | section | /security | app/security/page.tsx |
| 298 | `security/mobile/03-this-page-is-a-plain-language-summary-no` | section | /security | app/security/page.tsx |
| 299 | `security/mobile/04-need-it-in-writing` | section | /security | app/security/page.tsx |
| 300 | `security/mobile/05-footer` | section | /security | components/Footer.tsx |
| 301 | `compare/mobile/full-page` | full | /compare | app/compare/page.tsx; app/layout.tsx |
| 302 | `compare/mobile/01-pick-the-right-tool-even-if-it-is-not-us` | section | /compare | app/compare/page.tsx |
| 303 | `compare/mobile/02-table-scrolls-sideways` | section | /compare | app/compare/page.tsx |
| 304 | `compare/mobile/03-not-sure-which-fits` | section | /compare | app/compare/page.tsx |
| 305 | `compare/mobile/04-footer` | section | /compare | components/Footer.tsx |
| 306 | `receipts/mobile/full-page` | full | /receipts | app/receipts/page.tsx; app/layout.tsx |
| 307 | `receipts/mobile/01-receipts-not-claims` | section | /receipts | app/receipts/page.tsx |
| 308 | `receipts/mobile/02-the-ledger` | section | /receipts | app/receipts/page.tsx |
| 309 | `receipts/mobile/03-build-logs-plus-1-more` | section | /receipts | app/receipts/page.tsx |
| 310 | `receipts/mobile/04-hear-it-then-book-it` | section | /receipts | app/receipts/page.tsx |
| 311 | `receipts/mobile/05-footer` | section | /receipts | components/Footer.tsx |
| 312 | `notes/mobile/full-page` | full | /notes | app/notes/page.tsx; app/layout.tsx |
| 313 | `notes/mobile/01-short-posts-with-a-real-number-or-a-diag` | section | /notes | app/notes/page.tsx |
| 314 | `notes/mobile/02-what-a-voice-agent-costs-to-run-line-by-` | section | /notes | app/notes/page.tsx |
| 315 | `notes/mobile/03-hear-it-then-book-it` | section | /notes | app/notes/page.tsx |
| 316 | `notes/mobile/04-footer` | section | /notes | components/Footer.tsx |
| 317 | `note/mobile/full-page` | full | /notes/missed-call-cost | app/notes/[slug]/page.tsx; app/layout.tsx |
| 318 | `note/mobile/01-what-a-missed-call-really-costs-a-clinic` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 319 | `note/mobile/02-most-owners-know-calls-are-being-missed-` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 320 | `note/mobile/03-the-formula` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 321 | `note/mobile/04-missed-calls-per-week-share-that-would-h` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 322 | `note/mobile/05-a-worked-example-made-up-round-numbers-n` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 323 | `note/mobile/06-10-missed-calls-30-3-bookings-lost-per-w` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 324 | `note/mobile/07-those-inputs-are-examples-to-show-the-me` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 325 | `note/mobile/08-where-each-input-comes-from` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 326 | `note/mobile/09-missed-calls-per-week-your-phone-provide` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 327 | `note/mobile/10-what-an-agent-changes-and-what-it-does-n` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 328 | `note/mobile/11-a-voice-agent-answers-the-call-in-one-ri` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 329 | `note/mobile/12-run-it-on-your-own-numbers` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 330 | `note/mobile/13-hear-it-then-book-it` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 331 | `note/mobile/14-footer` | section | /notes/missed-call-cost | components/Footer.tsx |
| 332 | `roadmap/mobile/full-page` | full | /roadmap | app/roadmap/page.tsx; app/layout.tsx |
| 333 | `roadmap/mobile/01-what-shipped-what-is-next` | section | /roadmap | app/roadmap/page.tsx |
| 334 | `roadmap/mobile/02-shipped-voice-follow-up-booking-reactiva` | section | /roadmap | app/roadmap/page.tsx |
| 335 | `roadmap/mobile/03-building-now-live-voice-with-the-ai-mode` | section | /roadmap | app/roadmap/page.tsx |
| 336 | `roadmap/mobile/04-later-public-build-logs-and-bounties-ope` | section | /roadmap | app/roadmap/page.tsx |
| 337 | `roadmap/mobile/05-something-you-need-that-is-not-here-tell` | section | /roadmap | app/roadmap/page.tsx |
| 338 | `roadmap/mobile/06-hear-it-then-book-it` | section | /roadmap | app/roadmap/page.tsx |
| 339 | `roadmap/mobile/07-footer` | section | /roadmap | components/Footer.tsx |
| 340 | `privacy/mobile/full-page` | full | /privacy | app/privacy/page.tsx; app/layout.tsx |
| 341 | `privacy/mobile/01-privacy` | section | /privacy | app/privacy/page.tsx |
| 342 | `privacy/mobile/02-text-to-be-added-before-launch` | section | /privacy | app/privacy/page.tsx |
| 343 | `privacy/mobile/03-footer` | section | /privacy | components/Footer.tsx |
| 344 | `terms/mobile/full-page` | full | /terms | app/terms/page.tsx; app/layout.tsx |
| 345 | `terms/mobile/01-terms` | section | /terms | app/terms/page.tsx |
| 346 | `terms/mobile/02-text-to-be-added-before-launch` | section | /terms | app/terms/page.tsx |
| 347 | `terms/mobile/03-footer` | section | /terms | components/Footer.tsx |
| 348 | `not-found/mobile/full-page` | full | /no-such-page | app/not-found.tsx; app/layout.tsx |
| 349 | `not-found/mobile/01-nothing-here` | section | /no-such-page | app/not-found.tsx |
| 350 | `not-found/mobile/02-footer` | section | /no-such-page | components/Footer.tsx |
| 351 | `states/mobile/mobile-menu` | state | / | components/Navbar.tsx |
