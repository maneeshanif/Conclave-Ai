# Conclave AI: design review pack

You are reviewing the current look of the Conclave AI website. This folder is a visual snapshot of **every page and every section**, at desktop (1440px) and mobile (390px), plus interactive states. Generated 2026-10-22. 445 shots across 40 groups.

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
Hidden or empty on purpose until real (Change Spec v3): metrics and write-ups on the four project pages (the projects themselves are shown; their tags, stack and role are working labels the owner still confirms), team profiles, WhatsApp number and reply time, prices ("Scoped on a call" until set), the Convene game and the build-your-own-agent wizard (built, behind a flag), Privacy and Terms (placeholder text, not indexed), and the Receipts ledger rows (they fill from real pilots). Mock-ups and dashboards use sample figures and are labelled "Example". Flow-generated assets (hero loop, service videos) are not in yet; the hero scene is the stud C in SVG. The Aria voice demo runs in demo mode until an AI key is set.

## The design brief the site must meet

- **Reference:** lemlist.com for about 90% of the layout (light page, floating white pill nav, full-bleed hero with headline at bottom left, product demo window straight under the hero, numbered feature cards with product visuals, persona tiles, 2-column FAQ, one dark closing block). Willows preview for about 10% of the style (oversized wide uppercase type, inline pill in the headline, skewed repeating word band, scroll-brightening statement). Pattern references only: nothing copied. v3 changes: the brick robots are replaced by face-less stud patterns on one 7x7 grid (Aria, Echo, Slot, Boomerang, Tally, Gate, Ledger) and a C mark made of studs; home is eleven sections; the Studio is Agents, Automations, ERP and CRM, Apps, Platforms.
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
| 3 | `home/desktop/01-hero` | section | / | components/home/sections.tsx (Hero), components/home/HeroStuds.tsx, lib/studs/hero.ts |
| 4 | `home/desktop/02-live-agent` | section | / | components/home/sections.tsx (LiveAgent), components/home/AriaWindow.tsx |
| 5 | `home/desktop/03-proof` | section | / | components/home/sections.tsx (Proof), lib/content.ts (trust) |
| 6 | `home/desktop/04-services` | section | / | components/home/sections.tsx (Services), components/home/visuals.tsx (mock-ups), components/studs/StudGlyph.tsx |
| 7 | `home/desktop/05-systems` | section | / | components/home/sections.tsx (Systems), lib/content.ts (studio) |
| 8 | `home/desktop/06-built-for` | section | / | components/home/sections.tsx (BuiltFor), lib/content.ts (industries), lib/studs/patterns.ts |
| 9 | `home/desktop/07-work` | section | / | components/home/sections.tsx (WorkReel), components/work/ProjectCover.tsx, lib/projects.ts |
| 10 | `home/desktop/08-process` | section | / | components/home/sections.tsx (Process), lib/content.ts (processSteps) |
| 11 | `home/desktop/09-pricing` | section | / | components/home/sections.tsx (PricingTeaser) |
| 12 | `home/desktop/10-faq` | section | / | components/home/sections.tsx (Faq), components/ui/Accordion.tsx |
| 13 | `home/desktop/11-final-cta` | section | / | components/home/sections.tsx (FinalCta), components/QuickBook.tsx |
| 14 | `home/desktop/12-footer` | section | / | components/Footer.tsx |
| 15 | `services/desktop/full-page` | full | /services | app/services/page.tsx; app/layout.tsx |
| 16 | `services/desktop/01-five-jobs-one-agent-each` | section | /services | app/services/page.tsx |
| 17 | `services/desktop/02-voice-agents-that-answer-every-call-plus` | section | /services | app/services/page.tsx |
| 18 | `services/desktop/03-which-agent-do-i-need` | section | /services | app/services/page.tsx |
| 19 | `services/desktop/04-works-with-twilio-vapi-livekit-google-ca` | section | /services | app/services/page.tsx |
| 20 | `services/desktop/05-beyond-agentsautomations-business-system` | section | /services | app/services/page.tsx |
| 21 | `services/desktop/06-hear-it-then-book-it` | section | /services | app/services/page.tsx |
| 22 | `services/desktop/07-footer` | section | /services | components/Footer.tsx |
| 23 | `service-detail/desktop/full-page` | full | /services/voice | app/services/[slug]/page.tsx; app/layout.tsx |
| 24 | `service-detail/desktop/01-voice-agents-that-answer-every-call` | section | /services/voice | app/services/[slug]/page.tsx |
| 25 | `service-detail/desktop/02-voice-waveform` | section | /services/voice | app/services/[slug]/page.tsx |
| 26 | `service-detail/desktop/03-how-a-call-flows` | section | /services/voice | app/services/[slug]/page.tsx |
| 27 | `service-detail/desktop/04-works-with` | section | /services/voice | app/services/[slug]/page.tsx |
| 28 | `service-detail/desktop/05-price-and-timeline` | section | /services/voice | app/services/[slug]/page.tsx |
| 29 | `service-detail/desktop/06-questions-plus-3-more` | section | /services/voice | app/services/[slug]/page.tsx |
| 30 | `service-detail/desktop/07-hear-it-on-the-demo-page-then-see-the-cl` | section | /services/voice | app/services/[slug]/page.tsx |
| 31 | `service-detail/desktop/08-hear-it-then-book-it` | section | /services/voice | app/services/[slug]/page.tsx |
| 32 | `service-detail/desktop/09-footer` | section | /services/voice | components/Footer.tsx |
| 33 | `service-follow-up/desktop/full-page` | full | /services/follow-up | app/services/[slug]/page.tsx; app/layout.tsx |
| 34 | `service-booking/desktop/full-page` | full | /services/booking | app/services/[slug]/page.tsx; app/layout.tsx |
| 35 | `service-reactivation/desktop/full-page` | full | /services/reactivation | app/services/[slug]/page.tsx; app/layout.tsx |
| 36 | `service-reporting/desktop/full-page` | full | /services/reporting | app/services/[slug]/page.tsx; app/layout.tsx |
| 37 | `studio/desktop/full-page` | full | /studio | app/studio/page.tsx; app/layout.tsx |
| 38 | `studio/desktop/01-agent-first-software-built-like-a-platfo` | section | /studio | app/studio/page.tsx |
| 39 | `studio/desktop/02-agents` | section | /studio | app/studio/page.tsx |
| 40 | `studio/desktop/03-automations` | section | /studio | app/studio/page.tsx |
| 41 | `studio/desktop/04-erp-and-crm` | section | /studio | app/studio/page.tsx |
| 42 | `studio/desktop/05-apps` | section | /studio | app/studio/page.tsx |
| 43 | `studio/desktop/06-platforms` | section | /studio | app/studio/page.tsx |
| 44 | `studio/desktop/07-we-list-a-tool-here-only-when-we-can-dem` | section | /studio | app/studio/page.tsx |
| 45 | `studio/desktop/08-friendly-on-the-surface-serious-undernea` | section | /studio | app/studio/page.tsx |
| 46 | `studio/desktop/09-have-a-build-in-mind` | section | /studio | app/studio/page.tsx |
| 47 | `studio/desktop/10-footer` | section | /studio | components/Footer.tsx |
| 48 | `studio-agents/desktop/full-page` | full | /studio/agents | app/studio/[slug]/page.tsx; app/layout.tsx |
| 49 | `studio-agents/desktop/01-agents-that-take-the-calls` | section | /studio/agents | app/studio/[slug]/page.tsx |
| 50 | `studio-agents/desktop/02-what-we-build` | section | /studio/agents | app/studio/[slug]/page.tsx |
| 51 | `studio-agents/desktop/03-how-it-runs` | section | /studio/agents | app/studio/[slug]/page.tsx |
| 52 | `studio-agents/desktop/04-timeline-price-and-stack` | section | /studio/agents | app/studio/[slug]/page.tsx |
| 53 | `studio-agents/desktop/05-questions-plus-3-more` | section | /studio/agents | app/studio/[slug]/page.tsx |
| 54 | `studio-agents/desktop/06-see-the-five-service-pages-for-each-job-` | section | /studio/agents | app/studio/[slug]/page.tsx |
| 55 | `studio-agents/desktop/07-hear-it-then-book-it` | section | /studio/agents | app/studio/[slug]/page.tsx |
| 56 | `studio-agents/desktop/08-footer` | section | /studio/agents | components/Footer.tsx |
| 57 | `studio-automations/desktop/full-page` | full | /studio/automations | app/studio/[slug]/page.tsx; app/layout.tsx |
| 58 | `studio-automations/desktop/01-workflows-that-move-your-data` | section | /studio/automations | app/studio/[slug]/page.tsx |
| 59 | `studio-automations/desktop/02-what-we-build` | section | /studio/automations | app/studio/[slug]/page.tsx |
| 60 | `studio-automations/desktop/03-how-it-runs` | section | /studio/automations | app/studio/[slug]/page.tsx |
| 61 | `studio-automations/desktop/04-timeline-price-and-stack` | section | /studio/automations | app/studio/[slug]/page.tsx |
| 62 | `studio-automations/desktop/05-questions-plus-3-more` | section | /studio/automations | app/studio/[slug]/page.tsx |
| 63 | `studio-automations/desktop/06-pairs-with-agents-an-agent-takes-the-cal` | section | /studio/automations | app/studio/[slug]/page.tsx |
| 64 | `studio-automations/desktop/07-hear-it-then-book-it` | section | /studio/automations | app/studio/[slug]/page.tsx |
| 65 | `studio-automations/desktop/08-footer` | section | /studio/automations | components/Footer.tsx |
| 66 | `studio-erp-crm/desktop/full-page` | full | /studio/erp-crm | app/studio/[slug]/page.tsx; app/layout.tsx |
| 67 | `studio-erp-crm/desktop/01-a-system-built-around-you` | section | /studio/erp-crm | app/studio/[slug]/page.tsx |
| 68 | `studio-erp-crm/desktop/02-what-we-build` | section | /studio/erp-crm | app/studio/[slug]/page.tsx |
| 69 | `studio-erp-crm/desktop/03-the-modules` | section | /studio/erp-crm | app/studio/[slug]/page.tsx |
| 70 | `studio-erp-crm/desktop/04-timeline-price-and-stack` | section | /studio/erp-crm | app/studio/[slug]/page.tsx |
| 71 | `studio-erp-crm/desktop/05-questions-plus-3-more` | section | /studio/erp-crm | app/studio/[slug]/page.tsx |
| 72 | `studio-erp-crm/desktop/06-example-screens-are-added-here-labelled-` | section | /studio/erp-crm | app/studio/[slug]/page.tsx |
| 73 | `studio-erp-crm/desktop/07-hear-it-then-book-it` | section | /studio/erp-crm | app/studio/[slug]/page.tsx |
| 74 | `studio-erp-crm/desktop/08-footer` | section | /studio/erp-crm | components/Footer.tsx |
| 75 | `studio-apps/desktop/full-page` | full | /studio/apps | app/studio/[slug]/page.tsx; app/layout.tsx |
| 76 | `studio-apps/desktop/01-apps-with-agent-features` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 77 | `studio-apps/desktop/02-what-we-build` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 78 | `studio-apps/desktop/03-what-it-is-built-with` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 79 | `studio-apps/desktop/04-marketing-sites-when-you-need-a-face` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 80 | `studio-apps/desktop/05-timeline-price-and-stack` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 81 | `studio-apps/desktop/06-questions-plus-3-more` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 82 | `studio-apps/desktop/07-need-the-agent-first-and-the-app-later-s` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 83 | `studio-apps/desktop/08-hear-it-then-book-it` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 84 | `studio-apps/desktop/09-footer` | section | /studio/apps | components/Footer.tsx |
| 85 | `studio-platforms/desktop/full-page` | full | /studio/platforms | app/studio/[slug]/page.tsx; app/layout.tsx |
| 86 | `studio-platforms/desktop/01-built-to-keep-running-at-volume` | section | /studio/platforms | app/studio/[slug]/page.tsx |
| 87 | `studio-platforms/desktop/02-what-we-build` | section | /studio/platforms | app/studio/[slug]/page.tsx |
| 88 | `studio-platforms/desktop/03-what-sits-under-it` | section | /studio/platforms | app/studio/[slug]/page.tsx |
| 89 | `studio-platforms/desktop/04-timeline-price-and-stack` | section | /studio/platforms | app/studio/[slug]/page.tsx |
| 90 | `studio-platforms/desktop/05-questions-plus-3-more` | section | /studio/platforms | app/studio/[slug]/page.tsx |
| 91 | `studio-platforms/desktop/06-friendly-on-the-surface-serious-undernea` | section | /studio/platforms | app/studio/[slug]/page.tsx |
| 92 | `studio-platforms/desktop/07-hear-it-then-book-it` | section | /studio/platforms | app/studio/[slug]/page.tsx |
| 93 | `studio-platforms/desktop/08-footer` | section | /studio/platforms | components/Footer.tsx |
| 94 | `industry/desktop/full-page` | full | /industries/clinics | app/industries/[slug]/page.tsx; app/layout.tsx |
| 95 | `industry/desktop/01-a-front-desk-that-never-steps-away` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 96 | `industry/desktop/02-three-workflows-we-set-up-first` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 97 | `industry/desktop/03-what-the-week-looks-like` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 98 | `industry/desktop/04-agents-that-do-the-work` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 99 | `industry/desktop/05-the-usual-objection-plus-1-more` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 100 | `industry/desktop/06-language-we-build-in-english-arabic-and-` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 101 | `industry/desktop/07-hear-it-then-book-it` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 102 | `industry/desktop/08-footer` | section | /industries/clinics | components/Footer.tsx |
| 103 | `industry-med-spas/desktop/full-page` | full | /industries/med-spas | app/industries/[slug]/page.tsx; app/layout.tsx |
| 104 | `industry-dental/desktop/full-page` | full | /industries/dental | app/industries/[slug]/page.tsx; app/layout.tsx |
| 105 | `industry-real-estate/desktop/full-page` | full | /industries/real-estate | app/industries/[slug]/page.tsx; app/layout.tsx |
| 106 | `industry-home-services/desktop/full-page` | full | /industries/home-services | app/industries/[slug]/page.tsx; app/layout.tsx |
| 107 | `industry-startups/desktop/full-page` | full | /industries/startups | app/industries/[slug]/page.tsx; app/layout.tsx |
| 108 | `crew/desktop/full-page` | full | /crew | app/crew/page.tsx; app/layout.tsx |
| 109 | `crew/desktop/01-seven-agents-one-job-each` | section | /crew | app/crew/page.tsx |
| 110 | `crew/desktop/02-the-conclave-c-made-of-studs` | section | /crew | app/crew/page.tsx |
| 111 | `crew/desktop/03-aria-plus-6-more` | section | /crew | app/crew/page.tsx |
| 112 | `crew/desktop/04-voice-lines-are-sample-copy-for-the-agen` | section | /crew | app/crew/page.tsx |
| 113 | `crew/desktop/05-want-a-crew-of-your-own` | section | /crew | app/crew/page.tsx |
| 114 | `crew/desktop/06-footer` | section | /crew | components/Footer.tsx |
| 115 | `work/desktop/full-page` | full | /work | app/work/page.tsx; app/layout.tsx |
| 116 | `work/desktop/01-built-shipped-running` | section | /work | app/work/page.tsx |
| 117 | `work/desktop/02-filter-by-type` | section | /work | app/work/page.tsx |
| 118 | `work/desktop/03-bazar-flow-plus-3-more` | section | /work | app/work/page.tsx |
| 119 | `work/desktop/04-hear-it-then-book-it` | section | /work | app/work/page.tsx |
| 120 | `work/desktop/05-footer` | section | /work | components/Footer.tsx |
| 121 | `work-detail/desktop/full-page` | full | /work/bazar-flow | app/work/[slug]/page.tsx; app/layout.tsx |
| 122 | `work-detail/desktop/01-bazar-flow` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 123 | `work-detail/desktop/02-div` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 124 | `work-detail/desktop/03-built-with` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 125 | `work-detail/desktop/04-next-project-codenexus-ai` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 126 | `work-detail/desktop/05-hear-it-then-book-it` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 127 | `work-detail/desktop/06-footer` | section | /work/bazar-flow | components/Footer.tsx |
| 128 | `work-codenexus-ai/desktop/full-page` | full | /work/codenexus-ai | app/work/[slug]/page.tsx; app/layout.tsx |
| 129 | `work-scalenexus-ai/desktop/full-page` | full | /work/scalenexus-ai | app/work/[slug]/page.tsx; app/layout.tsx |
| 130 | `work-task-whisper/desktop/full-page` | full | /work/task-whisper | app/work/[slug]/page.tsx; app/layout.tsx |
| 131 | `demos/desktop/full-page` | full | /demos | app/demos/page.tsx; app/layout.tsx |
| 132 | `demos/desktop/01-try-it-don-t-take-our-word` | section | /demos | app/demos/page.tsx |
| 133 | `demos/desktop/02-a-voice-agent-for-a-sample-clinic` | section | /demos | app/demos/page.tsx |
| 134 | `demos/desktop/03-what-does-a-missed-call-cost-you` | section | /demos | app/demos/page.tsx |
| 135 | `demos/desktop/04-hear-it-then-book-it` | section | /demos | app/demos/page.tsx |
| 136 | `demos/desktop/05-footer` | section | /demos | components/Footer.tsx |
| 137 | `about/desktop/full-page` | full | /about | app/about/page.tsx; app/layout.tsx |
| 138 | `about/desktop/01-agents-convened` | section | /about | app/about/page.tsx |
| 139 | `about/desktop/02-fixed-scope-plus-3-more` | section | /about | app/about/page.tsx |
| 140 | `about/desktop/03-hear-it-then-book-it` | section | /about | app/about/page.tsx |
| 141 | `about/desktop/04-footer` | section | /about | components/Footer.tsx |
| 142 | `pricing/desktop/full-page` | full | /pricing | app/pricing/page.tsx; app/layout.tsx |
| 143 | `pricing/desktop/01-pilot-build-retainer` | section | /pricing | app/pricing/page.tsx |
| 144 | `pricing/desktop/02-pilot-plus-2-more` | section | /pricing | app/pricing/page.tsx |
| 145 | `pricing/desktop/03-agent-receptionist-or-answering-service` | section | /pricing | app/pricing/page.tsx |
| 146 | `pricing/desktop/04-what-is-included` | section | /pricing | app/pricing/page.tsx |
| 147 | `pricing/desktop/05-questions-about-pricing-plus-10-more` | section | /pricing | app/pricing/page.tsx |
| 148 | `pricing/desktop/06-hear-it-then-book-it` | section | /pricing | app/pricing/page.tsx |
| 149 | `pricing/desktop/07-footer` | section | /pricing | components/Footer.tsx |
| 150 | `contact/desktop/full-page` | full | /contact | app/contact/page.tsx; app/layout.tsx |
| 151 | `contact/desktop/01-let-s-talk` | section | /contact | app/contact/page.tsx |
| 152 | `contact/desktop/02-tell-us-what-you-need` | section | /contact | app/contact/page.tsx |
| 153 | `contact/desktop/03-footer` | section | /contact | components/Footer.tsx |
| 154 | `join/desktop/full-page` | full | /join | app/join/page.tsx; app/layout.tsx |
| 155 | `join/desktop/01-the-conclave-ai-guild` | section | /join | app/join/page.tsx |
| 156 | `join/desktop/02-careers-plus-3-more` | section | /join | app/join/page.tsx |
| 157 | `join/desktop/03-prefer-to-hire-us` | section | /join | app/join/page.tsx |
| 158 | `join/desktop/04-footer` | section | /join | components/Footer.tsx |
| 159 | `security/desktop/full-page` | full | /security | app/security/page.tsx; app/layout.tsx |
| 160 | `security/desktop/01-calm-answers-to-the-risky-questions` | section | /security | app/security/page.tsx |
| 161 | `security/desktop/02-data-we-handle-only-what-the-agent-needs` | section | /security | app/security/page.tsx |
| 162 | `security/desktop/03-need-it-in-writing` | section | /security | app/security/page.tsx |
| 163 | `security/desktop/04-footer` | section | /security | components/Footer.tsx |
| 164 | `compare/desktop/full-page` | full | /compare | app/compare/page.tsx; app/layout.tsx |
| 165 | `compare/desktop/01-pick-the-right-tool-even-if-it-is-not-us` | section | /compare | app/compare/page.tsx |
| 166 | `compare/desktop/02-table-scrolls-sideways` | section | /compare | app/compare/page.tsx |
| 167 | `compare/desktop/03-not-sure-which-fits` | section | /compare | app/compare/page.tsx |
| 168 | `compare/desktop/04-footer` | section | /compare | components/Footer.tsx |
| 169 | `receipts/desktop/full-page` | full | /receipts | app/receipts/page.tsx; app/layout.tsx |
| 170 | `receipts/desktop/01-receipts-not-claims` | section | /receipts | app/receipts/page.tsx |
| 171 | `receipts/desktop/02-the-ledger` | section | /receipts | app/receipts/page.tsx |
| 172 | `receipts/desktop/03-build-logs-plus-1-more` | section | /receipts | app/receipts/page.tsx |
| 173 | `receipts/desktop/04-hear-it-then-book-it` | section | /receipts | app/receipts/page.tsx |
| 174 | `receipts/desktop/05-footer` | section | /receipts | components/Footer.tsx |
| 175 | `notes/desktop/full-page` | full | /notes | app/notes/page.tsx; app/layout.tsx |
| 176 | `notes/desktop/01-short-posts-with-a-real-number-or-a-diag` | section | /notes | app/notes/page.tsx |
| 177 | `notes/desktop/02-what-a-voice-agent-costs-to-run-line-by-` | section | /notes | app/notes/page.tsx |
| 178 | `notes/desktop/03-hear-it-then-book-it` | section | /notes | app/notes/page.tsx |
| 179 | `notes/desktop/04-footer` | section | /notes | components/Footer.tsx |
| 180 | `note/desktop/full-page` | full | /notes/missed-call-cost | app/notes/[slug]/page.tsx; app/layout.tsx |
| 181 | `note/desktop/01-what-a-missed-call-really-costs-a-clinic` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 182 | `note/desktop/02-most-owners-know-calls-are-being-missed-` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 183 | `note/desktop/03-the-formula` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 184 | `note/desktop/04-missed-calls-per-week-share-that-would-h` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 185 | `note/desktop/05-a-worked-example-made-up-round-numbers-n` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 186 | `note/desktop/06-10-missed-calls-30-3-bookings-lost-per-w` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 187 | `note/desktop/07-those-inputs-are-examples-to-show-the-me` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 188 | `note/desktop/08-where-each-input-comes-from` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 189 | `note/desktop/09-missed-calls-per-week-your-phone-provide` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 190 | `note/desktop/10-what-an-agent-changes-and-what-it-does-n` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 191 | `note/desktop/11-a-voice-agent-answers-the-call-in-one-ri` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 192 | `note/desktop/12-run-it-on-your-own-numbers` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 193 | `note/desktop/13-hear-it-then-book-it` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 194 | `note/desktop/14-footer` | section | /notes/missed-call-cost | components/Footer.tsx |
| 195 | `roadmap/desktop/full-page` | full | /roadmap | app/roadmap/page.tsx; app/layout.tsx |
| 196 | `roadmap/desktop/01-what-shipped-what-is-next` | section | /roadmap | app/roadmap/page.tsx |
| 197 | `roadmap/desktop/02-shipped-voice-follow-up-booking-reactiva` | section | /roadmap | app/roadmap/page.tsx |
| 198 | `roadmap/desktop/03-hear-it-then-book-it` | section | /roadmap | app/roadmap/page.tsx |
| 199 | `roadmap/desktop/04-footer` | section | /roadmap | components/Footer.tsx |
| 200 | `privacy/desktop/full-page` | full | /privacy | app/privacy/page.tsx; app/layout.tsx |
| 201 | `privacy/desktop/01-privacy` | section | /privacy | app/privacy/page.tsx |
| 202 | `privacy/desktop/02-text-to-be-added-before-launch` | section | /privacy | app/privacy/page.tsx |
| 203 | `privacy/desktop/03-footer` | section | /privacy | components/Footer.tsx |
| 204 | `terms/desktop/full-page` | full | /terms | app/terms/page.tsx; app/layout.tsx |
| 205 | `terms/desktop/01-terms` | section | /terms | app/terms/page.tsx |
| 206 | `terms/desktop/02-text-to-be-added-before-launch` | section | /terms | app/terms/page.tsx |
| 207 | `terms/desktop/03-footer` | section | /terms | components/Footer.tsx |
| 208 | `not-found/desktop/full-page` | full | /no-such-page | app/not-found.tsx; app/layout.tsx |
| 209 | `not-found/desktop/01-nothing-here` | section | /no-such-page | app/not-found.tsx |
| 210 | `not-found/desktop/02-footer` | section | /no-such-page | components/Footer.tsx |
| 211 | `states/desktop/aria-tab-answer-calls` | state | / | components/home/AriaWindow.tsx |
| 212 | `states/desktop/aria-tab-follow-up-fast` | state | / | components/home/AriaWindow.tsx |
| 213 | `states/desktop/aria-tab-book-the-slot` | state | / | components/home/AriaWindow.tsx |
| 214 | `states/desktop/aria-tab-win-back` | state | / | components/home/AriaWindow.tsx |
| 215 | `states/desktop/command-palette` | state | / | components/CommandPalette.tsx |
| 216 | `states/desktop/nav-hover` | state | / | components/Navbar.tsx |
| 217 | `home/mobile/full-page-part1` | full | / | app/page.tsx; app/layout.tsx |
| 218 | `home/mobile/full-page-part2` | full | / | app/page.tsx; app/layout.tsx |
| 219 | `home/mobile/full-page-part3` | full | / | app/page.tsx; app/layout.tsx |
| 220 | `home/mobile/full-page-part4` | full | / | app/page.tsx; app/layout.tsx |
| 221 | `home/mobile/01-hero` | section | / | components/home/sections.tsx (Hero), components/home/HeroStuds.tsx, lib/studs/hero.ts |
| 222 | `home/mobile/02-live-agent` | section | / | components/home/sections.tsx (LiveAgent), components/home/AriaWindow.tsx |
| 223 | `home/mobile/03-proof` | section | / | components/home/sections.tsx (Proof), lib/content.ts (trust) |
| 224 | `home/mobile/04-services` | section | / | components/home/sections.tsx (Services), components/home/visuals.tsx (mock-ups), components/studs/StudGlyph.tsx |
| 225 | `home/mobile/05-systems` | section | / | components/home/sections.tsx (Systems), lib/content.ts (studio) |
| 226 | `home/mobile/06-built-for` | section | / | components/home/sections.tsx (BuiltFor), lib/content.ts (industries), lib/studs/patterns.ts |
| 227 | `home/mobile/07-work` | section | / | components/home/sections.tsx (WorkReel), components/work/ProjectCover.tsx, lib/projects.ts |
| 228 | `home/mobile/08-process` | section | / | components/home/sections.tsx (Process), lib/content.ts (processSteps) |
| 229 | `home/mobile/09-pricing` | section | / | components/home/sections.tsx (PricingTeaser) |
| 230 | `home/mobile/10-faq` | section | / | components/home/sections.tsx (Faq), components/ui/Accordion.tsx |
| 231 | `home/mobile/11-final-cta` | section | / | components/home/sections.tsx (FinalCta), components/QuickBook.tsx |
| 232 | `home/mobile/12-footer` | section | / | components/Footer.tsx |
| 233 | `services/mobile/full-page` | full | /services | app/services/page.tsx; app/layout.tsx |
| 234 | `services/mobile/01-five-jobs-one-agent-each` | section | /services | app/services/page.tsx |
| 235 | `services/mobile/02-voice-agents-that-answer-every-call-plus` | section | /services | app/services/page.tsx |
| 236 | `services/mobile/03-which-agent-do-i-need` | section | /services | app/services/page.tsx |
| 237 | `services/mobile/04-works-with-twilio-vapi-livekit-google-ca` | section | /services | app/services/page.tsx |
| 238 | `services/mobile/05-beyond-agentsautomations-business-system` | section | /services | app/services/page.tsx |
| 239 | `services/mobile/06-hear-it-then-book-it` | section | /services | app/services/page.tsx |
| 240 | `services/mobile/07-footer` | section | /services | components/Footer.tsx |
| 241 | `service-detail/mobile/full-page` | full | /services/voice | app/services/[slug]/page.tsx; app/layout.tsx |
| 242 | `service-detail/mobile/01-voice-agents-that-answer-every-call` | section | /services/voice | app/services/[slug]/page.tsx |
| 243 | `service-detail/mobile/02-voice-waveform` | section | /services/voice | app/services/[slug]/page.tsx |
| 244 | `service-detail/mobile/03-how-a-call-flows` | section | /services/voice | app/services/[slug]/page.tsx |
| 245 | `service-detail/mobile/04-works-with` | section | /services/voice | app/services/[slug]/page.tsx |
| 246 | `service-detail/mobile/05-price-and-timeline` | section | /services/voice | app/services/[slug]/page.tsx |
| 247 | `service-detail/mobile/06-questions-plus-3-more` | section | /services/voice | app/services/[slug]/page.tsx |
| 248 | `service-detail/mobile/07-hear-it-on-the-demo-page-then-see-the-cl` | section | /services/voice | app/services/[slug]/page.tsx |
| 249 | `service-detail/mobile/08-hear-it-then-book-it` | section | /services/voice | app/services/[slug]/page.tsx |
| 250 | `service-detail/mobile/09-footer` | section | /services/voice | components/Footer.tsx |
| 251 | `service-follow-up/mobile/full-page` | full | /services/follow-up | app/services/[slug]/page.tsx; app/layout.tsx |
| 252 | `service-booking/mobile/full-page` | full | /services/booking | app/services/[slug]/page.tsx; app/layout.tsx |
| 253 | `service-reactivation/mobile/full-page` | full | /services/reactivation | app/services/[slug]/page.tsx; app/layout.tsx |
| 254 | `service-reporting/mobile/full-page` | full | /services/reporting | app/services/[slug]/page.tsx; app/layout.tsx |
| 255 | `studio/mobile/full-page` | full | /studio | app/studio/page.tsx; app/layout.tsx |
| 256 | `studio/mobile/01-agent-first-software-built-like-a-platfo` | section | /studio | app/studio/page.tsx |
| 257 | `studio/mobile/02-agents` | section | /studio | app/studio/page.tsx |
| 258 | `studio/mobile/03-automations` | section | /studio | app/studio/page.tsx |
| 259 | `studio/mobile/04-erp-and-crm` | section | /studio | app/studio/page.tsx |
| 260 | `studio/mobile/05-apps` | section | /studio | app/studio/page.tsx |
| 261 | `studio/mobile/06-platforms` | section | /studio | app/studio/page.tsx |
| 262 | `studio/mobile/07-we-list-a-tool-here-only-when-we-can-dem` | section | /studio | app/studio/page.tsx |
| 263 | `studio/mobile/08-friendly-on-the-surface-serious-undernea` | section | /studio | app/studio/page.tsx |
| 264 | `studio/mobile/09-have-a-build-in-mind` | section | /studio | app/studio/page.tsx |
| 265 | `studio/mobile/10-footer` | section | /studio | components/Footer.tsx |
| 266 | `studio-agents/mobile/full-page` | full | /studio/agents | app/studio/[slug]/page.tsx; app/layout.tsx |
| 267 | `studio-agents/mobile/01-agents-that-take-the-calls` | section | /studio/agents | app/studio/[slug]/page.tsx |
| 268 | `studio-agents/mobile/02-what-we-build` | section | /studio/agents | app/studio/[slug]/page.tsx |
| 269 | `studio-agents/mobile/03-how-it-runs` | section | /studio/agents | app/studio/[slug]/page.tsx |
| 270 | `studio-agents/mobile/04-timeline-price-and-stack` | section | /studio/agents | app/studio/[slug]/page.tsx |
| 271 | `studio-agents/mobile/05-questions-plus-3-more` | section | /studio/agents | app/studio/[slug]/page.tsx |
| 272 | `studio-agents/mobile/06-see-the-five-service-pages-for-each-job-` | section | /studio/agents | app/studio/[slug]/page.tsx |
| 273 | `studio-agents/mobile/07-hear-it-then-book-it` | section | /studio/agents | app/studio/[slug]/page.tsx |
| 274 | `studio-agents/mobile/08-footer` | section | /studio/agents | components/Footer.tsx |
| 275 | `studio-automations/mobile/full-page` | full | /studio/automations | app/studio/[slug]/page.tsx; app/layout.tsx |
| 276 | `studio-automations/mobile/01-workflows-that-move-your-data` | section | /studio/automations | app/studio/[slug]/page.tsx |
| 277 | `studio-automations/mobile/02-what-we-build` | section | /studio/automations | app/studio/[slug]/page.tsx |
| 278 | `studio-automations/mobile/03-how-it-runs` | section | /studio/automations | app/studio/[slug]/page.tsx |
| 279 | `studio-automations/mobile/04-timeline-price-and-stack` | section | /studio/automations | app/studio/[slug]/page.tsx |
| 280 | `studio-automations/mobile/05-questions-plus-3-more` | section | /studio/automations | app/studio/[slug]/page.tsx |
| 281 | `studio-automations/mobile/06-pairs-with-agents-an-agent-takes-the-cal` | section | /studio/automations | app/studio/[slug]/page.tsx |
| 282 | `studio-automations/mobile/07-hear-it-then-book-it` | section | /studio/automations | app/studio/[slug]/page.tsx |
| 283 | `studio-automations/mobile/08-footer` | section | /studio/automations | components/Footer.tsx |
| 284 | `studio-erp-crm/mobile/full-page` | full | /studio/erp-crm | app/studio/[slug]/page.tsx; app/layout.tsx |
| 285 | `studio-erp-crm/mobile/01-a-system-built-around-you` | section | /studio/erp-crm | app/studio/[slug]/page.tsx |
| 286 | `studio-erp-crm/mobile/02-what-we-build` | section | /studio/erp-crm | app/studio/[slug]/page.tsx |
| 287 | `studio-erp-crm/mobile/03-the-modules` | section | /studio/erp-crm | app/studio/[slug]/page.tsx |
| 288 | `studio-erp-crm/mobile/04-timeline-price-and-stack` | section | /studio/erp-crm | app/studio/[slug]/page.tsx |
| 289 | `studio-erp-crm/mobile/05-questions-plus-3-more` | section | /studio/erp-crm | app/studio/[slug]/page.tsx |
| 290 | `studio-erp-crm/mobile/06-example-screens-are-added-here-labelled-` | section | /studio/erp-crm | app/studio/[slug]/page.tsx |
| 291 | `studio-erp-crm/mobile/07-hear-it-then-book-it` | section | /studio/erp-crm | app/studio/[slug]/page.tsx |
| 292 | `studio-erp-crm/mobile/08-footer` | section | /studio/erp-crm | components/Footer.tsx |
| 293 | `studio-apps/mobile/full-page` | full | /studio/apps | app/studio/[slug]/page.tsx; app/layout.tsx |
| 294 | `studio-apps/mobile/01-apps-with-agent-features` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 295 | `studio-apps/mobile/02-what-we-build` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 296 | `studio-apps/mobile/03-what-it-is-built-with` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 297 | `studio-apps/mobile/04-marketing-sites-when-you-need-a-face` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 298 | `studio-apps/mobile/05-timeline-price-and-stack` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 299 | `studio-apps/mobile/06-questions-plus-3-more` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 300 | `studio-apps/mobile/07-need-the-agent-first-and-the-app-later-s` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 301 | `studio-apps/mobile/08-hear-it-then-book-it` | section | /studio/apps | app/studio/[slug]/page.tsx |
| 302 | `studio-apps/mobile/09-footer` | section | /studio/apps | components/Footer.tsx |
| 303 | `studio-platforms/mobile/full-page` | full | /studio/platforms | app/studio/[slug]/page.tsx; app/layout.tsx |
| 304 | `studio-platforms/mobile/01-built-to-keep-running-at-volume` | section | /studio/platforms | app/studio/[slug]/page.tsx |
| 305 | `studio-platforms/mobile/02-what-we-build` | section | /studio/platforms | app/studio/[slug]/page.tsx |
| 306 | `studio-platforms/mobile/03-what-sits-under-it` | section | /studio/platforms | app/studio/[slug]/page.tsx |
| 307 | `studio-platforms/mobile/04-timeline-price-and-stack` | section | /studio/platforms | app/studio/[slug]/page.tsx |
| 308 | `studio-platforms/mobile/05-questions-plus-3-more` | section | /studio/platforms | app/studio/[slug]/page.tsx |
| 309 | `studio-platforms/mobile/06-friendly-on-the-surface-serious-undernea` | section | /studio/platforms | app/studio/[slug]/page.tsx |
| 310 | `studio-platforms/mobile/07-hear-it-then-book-it` | section | /studio/platforms | app/studio/[slug]/page.tsx |
| 311 | `studio-platforms/mobile/08-footer` | section | /studio/platforms | components/Footer.tsx |
| 312 | `industry/mobile/full-page` | full | /industries/clinics | app/industries/[slug]/page.tsx; app/layout.tsx |
| 313 | `industry/mobile/01-a-front-desk-that-never-steps-away` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 314 | `industry/mobile/02-three-workflows-we-set-up-first` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 315 | `industry/mobile/03-what-the-week-looks-like` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 316 | `industry/mobile/04-agents-that-do-the-work` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 317 | `industry/mobile/05-the-usual-objection-plus-1-more` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 318 | `industry/mobile/06-language-we-build-in-english-arabic-and-` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 319 | `industry/mobile/07-hear-it-then-book-it` | section | /industries/clinics | app/industries/[slug]/page.tsx |
| 320 | `industry/mobile/08-footer` | section | /industries/clinics | components/Footer.tsx |
| 321 | `industry-med-spas/mobile/full-page` | full | /industries/med-spas | app/industries/[slug]/page.tsx; app/layout.tsx |
| 322 | `industry-dental/mobile/full-page` | full | /industries/dental | app/industries/[slug]/page.tsx; app/layout.tsx |
| 323 | `industry-real-estate/mobile/full-page` | full | /industries/real-estate | app/industries/[slug]/page.tsx; app/layout.tsx |
| 324 | `industry-home-services/mobile/full-page` | full | /industries/home-services | app/industries/[slug]/page.tsx; app/layout.tsx |
| 325 | `industry-startups/mobile/full-page` | full | /industries/startups | app/industries/[slug]/page.tsx; app/layout.tsx |
| 326 | `crew/mobile/full-page` | full | /crew | app/crew/page.tsx; app/layout.tsx |
| 327 | `crew/mobile/01-seven-agents-one-job-each` | section | /crew | app/crew/page.tsx |
| 328 | `crew/mobile/02-the-conclave-c-made-of-studs` | section | /crew | app/crew/page.tsx |
| 329 | `crew/mobile/03-aria-plus-6-more` | section | /crew | app/crew/page.tsx |
| 330 | `crew/mobile/04-voice-lines-are-sample-copy-for-the-agen` | section | /crew | app/crew/page.tsx |
| 331 | `crew/mobile/05-want-a-crew-of-your-own` | section | /crew | app/crew/page.tsx |
| 332 | `crew/mobile/06-footer` | section | /crew | components/Footer.tsx |
| 333 | `work/mobile/full-page` | full | /work | app/work/page.tsx; app/layout.tsx |
| 334 | `work/mobile/01-built-shipped-running` | section | /work | app/work/page.tsx |
| 335 | `work/mobile/02-filter-by-type` | section | /work | app/work/page.tsx |
| 336 | `work/mobile/03-bazar-flow-plus-3-more` | section | /work | app/work/page.tsx |
| 337 | `work/mobile/04-hear-it-then-book-it` | section | /work | app/work/page.tsx |
| 338 | `work/mobile/05-footer` | section | /work | components/Footer.tsx |
| 339 | `work-detail/mobile/full-page` | full | /work/bazar-flow | app/work/[slug]/page.tsx; app/layout.tsx |
| 340 | `work-detail/mobile/01-bazar-flow` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 341 | `work-detail/mobile/02-built-with` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 342 | `work-detail/mobile/03-hear-it-then-book-it` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 343 | `work-detail/mobile/04-footer` | section | /work/bazar-flow | components/Footer.tsx |
| 344 | `work-codenexus-ai/mobile/full-page` | full | /work/codenexus-ai | app/work/[slug]/page.tsx; app/layout.tsx |
| 345 | `work-scalenexus-ai/mobile/full-page` | full | /work/scalenexus-ai | app/work/[slug]/page.tsx; app/layout.tsx |
| 346 | `work-task-whisper/mobile/full-page` | full | /work/task-whisper | app/work/[slug]/page.tsx; app/layout.tsx |
| 347 | `demos/mobile/full-page` | full | /demos | app/demos/page.tsx; app/layout.tsx |
| 348 | `demos/mobile/01-try-it-don-t-take-our-word` | section | /demos | app/demos/page.tsx |
| 349 | `demos/mobile/02-a-voice-agent-for-a-sample-clinic` | section | /demos | app/demos/page.tsx |
| 350 | `demos/mobile/03-what-does-a-missed-call-cost-you` | section | /demos | app/demos/page.tsx |
| 351 | `demos/mobile/04-hear-it-then-book-it` | section | /demos | app/demos/page.tsx |
| 352 | `demos/mobile/05-footer` | section | /demos | components/Footer.tsx |
| 353 | `about/mobile/full-page` | full | /about | app/about/page.tsx; app/layout.tsx |
| 354 | `about/mobile/01-agents-convened` | section | /about | app/about/page.tsx |
| 355 | `about/mobile/02-fixed-scope-plus-2-more` | section | /about | app/about/page.tsx |
| 356 | `about/mobile/03-the-crew` | section | /about | app/about/page.tsx |
| 357 | `about/mobile/04-where-we-are` | section | /about | app/about/page.tsx |
| 358 | `about/mobile/05-conclave-ai-is-an-agent-studio-not-affil` | section | /about | app/about/page.tsx |
| 359 | `about/mobile/06-hear-it-then-book-it` | section | /about | app/about/page.tsx |
| 360 | `about/mobile/07-footer` | section | /about | components/Footer.tsx |
| 361 | `pricing/mobile/full-page` | full | /pricing | app/pricing/page.tsx; app/layout.tsx |
| 362 | `pricing/mobile/01-pilot-build-retainer` | section | /pricing | app/pricing/page.tsx |
| 363 | `pricing/mobile/02-pilot` | section | /pricing | app/pricing/page.tsx |
| 364 | `pricing/mobile/03-build` | section | /pricing | app/pricing/page.tsx |
| 365 | `pricing/mobile/04-retainer` | section | /pricing | app/pricing/page.tsx |
| 366 | `pricing/mobile/05-agent-receptionist-or-answering-service` | section | /pricing | app/pricing/page.tsx |
| 367 | `pricing/mobile/06-what-is-included` | section | /pricing | app/pricing/page.tsx |
| 368 | `pricing/mobile/07-questions-about-pricing-plus-10-more` | section | /pricing | app/pricing/page.tsx |
| 369 | `pricing/mobile/08-hear-it-then-book-it` | section | /pricing | app/pricing/page.tsx |
| 370 | `pricing/mobile/09-footer` | section | /pricing | components/Footer.tsx |
| 371 | `contact/mobile/full-page` | full | /contact | app/contact/page.tsx; app/layout.tsx |
| 372 | `contact/mobile/01-let-s-talk` | section | /contact | app/contact/page.tsx |
| 373 | `contact/mobile/02-name-email-company-optional` | section | /contact | app/contact/page.tsx |
| 374 | `contact/mobile/03-what-would-help-most-voice-agents-follow` | section | /contact | app/contact/page.tsx |
| 375 | `contact/mobile/04-where-would-you-like-to-start-choose-one` | section | /contact | app/contact/page.tsx |
| 376 | `contact/mobile/05-message` | section | /contact | app/contact/page.tsx |
| 377 | `contact/mobile/06-send-message` | section | /contact | app/contact/page.tsx |
| 378 | `contact/mobile/07-footer` | section | /contact | components/Footer.tsx |
| 379 | `join/mobile/full-page` | full | /join | app/join/page.tsx; app/layout.tsx |
| 380 | `join/mobile/01-the-conclave-ai-guild` | section | /join | app/join/page.tsx |
| 381 | `join/mobile/02-careers` | section | /join | app/join/page.tsx |
| 382 | `join/mobile/03-partner-programme` | section | /join | app/join/page.tsx |
| 383 | `join/mobile/04-open-source-templates` | section | /join | app/join/page.tsx |
| 384 | `join/mobile/05-bounties` | section | /join | app/join/page.tsx |
| 385 | `join/mobile/06-prefer-to-hire-us` | section | /join | app/join/page.tsx |
| 386 | `join/mobile/07-footer` | section | /join | components/Footer.tsx |
| 387 | `security/mobile/full-page` | full | /security | app/security/page.tsx; app/layout.tsx |
| 388 | `security/mobile/01-calm-answers-to-the-risky-questions` | section | /security | app/security/page.tsx |
| 389 | `security/mobile/02-data-we-handle-only-what-the-agent-needs` | section | /security | app/security/page.tsx |
| 390 | `security/mobile/03-this-page-is-a-plain-language-summary-no` | section | /security | app/security/page.tsx |
| 391 | `security/mobile/04-need-it-in-writing` | section | /security | app/security/page.tsx |
| 392 | `security/mobile/05-footer` | section | /security | components/Footer.tsx |
| 393 | `compare/mobile/full-page` | full | /compare | app/compare/page.tsx; app/layout.tsx |
| 394 | `compare/mobile/01-pick-the-right-tool-even-if-it-is-not-us` | section | /compare | app/compare/page.tsx |
| 395 | `compare/mobile/02-table-scrolls-sideways` | section | /compare | app/compare/page.tsx |
| 396 | `compare/mobile/03-not-sure-which-fits` | section | /compare | app/compare/page.tsx |
| 397 | `compare/mobile/04-footer` | section | /compare | components/Footer.tsx |
| 398 | `receipts/mobile/full-page` | full | /receipts | app/receipts/page.tsx; app/layout.tsx |
| 399 | `receipts/mobile/01-receipts-not-claims` | section | /receipts | app/receipts/page.tsx |
| 400 | `receipts/mobile/02-the-ledger` | section | /receipts | app/receipts/page.tsx |
| 401 | `receipts/mobile/03-build-logs-plus-1-more` | section | /receipts | app/receipts/page.tsx |
| 402 | `receipts/mobile/04-hear-it-then-book-it` | section | /receipts | app/receipts/page.tsx |
| 403 | `receipts/mobile/05-footer` | section | /receipts | components/Footer.tsx |
| 404 | `notes/mobile/full-page` | full | /notes | app/notes/page.tsx; app/layout.tsx |
| 405 | `notes/mobile/01-short-posts-with-a-real-number-or-a-diag` | section | /notes | app/notes/page.tsx |
| 406 | `notes/mobile/02-what-a-voice-agent-costs-to-run-line-by-` | section | /notes | app/notes/page.tsx |
| 407 | `notes/mobile/03-hear-it-then-book-it` | section | /notes | app/notes/page.tsx |
| 408 | `notes/mobile/04-footer` | section | /notes | components/Footer.tsx |
| 409 | `note/mobile/full-page` | full | /notes/missed-call-cost | app/notes/[slug]/page.tsx; app/layout.tsx |
| 410 | `note/mobile/01-what-a-missed-call-really-costs-a-clinic` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 411 | `note/mobile/02-most-owners-know-calls-are-being-missed-` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 412 | `note/mobile/03-the-formula` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 413 | `note/mobile/04-missed-calls-per-week-share-that-would-h` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 414 | `note/mobile/05-a-worked-example-made-up-round-numbers-n` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 415 | `note/mobile/06-10-missed-calls-30-3-bookings-lost-per-w` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 416 | `note/mobile/07-those-inputs-are-examples-to-show-the-me` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 417 | `note/mobile/08-where-each-input-comes-from` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 418 | `note/mobile/09-missed-calls-per-week-your-phone-provide` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 419 | `note/mobile/10-what-an-agent-changes-and-what-it-does-n` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 420 | `note/mobile/11-a-voice-agent-answers-the-call-in-one-ri` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 421 | `note/mobile/12-run-it-on-your-own-numbers` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 422 | `note/mobile/13-hear-it-then-book-it` | section | /notes/missed-call-cost | app/notes/[slug]/page.tsx |
| 423 | `note/mobile/14-footer` | section | /notes/missed-call-cost | components/Footer.tsx |
| 424 | `roadmap/mobile/full-page` | full | /roadmap | app/roadmap/page.tsx; app/layout.tsx |
| 425 | `roadmap/mobile/01-what-shipped-what-is-next` | section | /roadmap | app/roadmap/page.tsx |
| 426 | `roadmap/mobile/02-shipped-voice-follow-up-booking-reactiva` | section | /roadmap | app/roadmap/page.tsx |
| 427 | `roadmap/mobile/03-building-now-live-voice-with-the-ai-mode` | section | /roadmap | app/roadmap/page.tsx |
| 428 | `roadmap/mobile/04-later-convene-game-and-the-build-your-ow` | section | /roadmap | app/roadmap/page.tsx |
| 429 | `roadmap/mobile/05-something-you-need-that-is-not-here-tell` | section | /roadmap | app/roadmap/page.tsx |
| 430 | `roadmap/mobile/06-hear-it-then-book-it` | section | /roadmap | app/roadmap/page.tsx |
| 431 | `roadmap/mobile/07-footer` | section | /roadmap | components/Footer.tsx |
| 432 | `privacy/mobile/full-page` | full | /privacy | app/privacy/page.tsx; app/layout.tsx |
| 433 | `privacy/mobile/01-privacy` | section | /privacy | app/privacy/page.tsx |
| 434 | `privacy/mobile/02-text-to-be-added-before-launch` | section | /privacy | app/privacy/page.tsx |
| 435 | `privacy/mobile/03-footer` | section | /privacy | components/Footer.tsx |
| 436 | `terms/mobile/full-page` | full | /terms | app/terms/page.tsx; app/layout.tsx |
| 437 | `terms/mobile/01-terms` | section | /terms | app/terms/page.tsx |
| 438 | `terms/mobile/02-text-to-be-added-before-launch` | section | /terms | app/terms/page.tsx |
| 439 | `terms/mobile/03-footer` | section | /terms | components/Footer.tsx |
| 440 | `not-found/mobile/full-page` | full | /no-such-page | app/not-found.tsx; app/layout.tsx |
| 441 | `not-found/mobile/01-nothing-here` | section | /no-such-page | app/not-found.tsx |
| 442 | `not-found/mobile/02-footer` | section | /no-such-page | components/Footer.tsx |
| 443 | `states/mobile/mobile-menu` | state | / | components/Navbar.tsx |
| 444 | `states/desktop/hero-studs-scatter` | state | / | components/home/HeroStuds.tsx; lib/studs/useStudAssemble.ts |
| 445 | `states/desktop/hero-studs-assembled` | state | / | components/home/HeroStuds.tsx; lib/studs/mark.ts |
| 446 | `states/desktop/hero-studs-crew` | state | / | lib/studs/hero.ts; lib/studs/useStudAssemble.ts |
