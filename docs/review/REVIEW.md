# Conclave AI: design review pack

You are reviewing the current look of the Conclave AI website. This folder is a visual snapshot of **every page and every section**, at desktop (1440px) and mobile (390px), plus interactive states. Generated 2026-10-22. 136 shots across 12 groups.

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

## Known placeholders (not design bugs)

Waiting on real content from the owner: proof and result numbers, project outcomes, WhatsApp number, time zone and reply time, team profiles, legal text, Flow-generated hero and service videos (the hero scene and persona figures are flat SVG stand-ins). The Aria voice demo, Convene game, missed-call calculator and the working contact form are not built yet, so those buttons lead to placeholder pages. Figures in the service mock-ups are sample data labelled "Example".

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
| 5 | `home/desktop/03-proof` | section | / | components/home/sections.tsx (Proof) |
| 6 | `home/desktop/04-services` | section | / | components/home/sections.tsx (Services), components/home/visuals.tsx (service mock-ups) |
| 7 | `home/desktop/05-built-for` | section | / | components/home/sections.tsx (BuiltFor), components/home/visuals.tsx (PersonaFigure) |
| 8 | `home/desktop/06-work` | section | / | components/home/sections.tsx (WorkReel), lib/projects.ts |
| 9 | `home/desktop/07-manifesto` | section | / | components/home/sections.tsx (Manifesto) |
| 10 | `home/desktop/08-process` | section | / | components/home/sections.tsx (Process) |
| 11 | `home/desktop/09-demos` | section | / | components/home/sections.tsx (DemosTeaser) |
| 12 | `home/desktop/10-pricing` | section | / | components/home/sections.tsx (PricingTeaser) |
| 13 | `home/desktop/11-faq` | section | / | components/home/sections.tsx (Faq) |
| 14 | `home/desktop/12-final-cta` | section | / | components/home/sections.tsx (FinalCta) |
| 15 | `home/desktop/13-footer` | section | / | components/Footer.tsx |
| 16 | `services/desktop/full-page` | full | /services | app/services/page.tsx; app/layout.tsx |
| 17 | `services/desktop/01-five-jobs-one-agent-each` | section | /services | app/services/page.tsx |
| 18 | `services/desktop/02-voice-agents-that-answer-every-call` | section | /services | app/services/page.tsx |
| 19 | `services/desktop/03-follow-up-in-seconds-not-days` | section | /services | app/services/page.tsx |
| 20 | `services/desktop/04-bookings-straight-into-your-calendar` | section | /services | app/services/page.tsx |
| 21 | `services/desktop/05-reactivation-of-lapsed-customers` | section | /services | app/services/page.tsx |
| 22 | `services/desktop/06-reporting-you-can-read-in-a-minute` | section | /services | app/services/page.tsx |
| 23 | `services/desktop/07-need-a-custom-ai-agent-or-a-full-stack-w` | section | /services | app/services/page.tsx |
| 24 | `services/desktop/08-book-a-call` | section | /services | app/services/page.tsx |
| 25 | `services/desktop/09-footer` | section | /services | components/Footer.tsx |
| 26 | `work/desktop/full-page` | full | /work | app/work/page.tsx; app/layout.tsx |
| 27 | `work/desktop/01-built-shipped-running` | section | /work | app/work/page.tsx |
| 28 | `work/desktop/02-bazar-flow-plus-3-more` | section | /work | app/work/page.tsx |
| 29 | `work/desktop/03-footer` | section | /work | components/Footer.tsx |
| 30 | `work-detail/desktop/full-page` | full | /work/bazar-flow | app/work/[slug]/page.tsx; app/layout.tsx |
| 31 | `work-detail/desktop/01-bazar-flow` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 32 | `work-detail/desktop/02-project-hero-video-placeholder` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 33 | `work-detail/desktop/03-the-problem` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 34 | `work-detail/desktop/04-the-solution` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 35 | `work-detail/desktop/05-architecture` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 36 | `work-detail/desktop/06-results` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 37 | `work-detail/desktop/07-book-a-call-nextcodenexus-ai` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 38 | `work-detail/desktop/08-footer` | section | /work/bazar-flow | components/Footer.tsx |
| 39 | `demos/desktop/full-page` | full | /demos | app/demos/page.tsx; app/layout.tsx |
| 40 | `demos/desktop/01-try-it-don-t-take-our-word` | section | /demos | app/demos/page.tsx |
| 41 | `demos/desktop/02-live-voice-agent-plus-1-more` | section | /demos | app/demos/page.tsx |
| 42 | `demos/desktop/03-footer` | section | /demos | components/Footer.tsx |
| 43 | `about/desktop/full-page` | full | /about | app/about/page.tsx; app/layout.tsx |
| 44 | `about/desktop/01-agents-convened` | section | /about | app/about/page.tsx |
| 45 | `about/desktop/02-fixed-scope-plus-2-more` | section | /about | app/about/page.tsx |
| 46 | `about/desktop/03-footer` | section | /about | components/Footer.tsx |
| 47 | `pricing/desktop/full-page` | full | /pricing | app/pricing/page.tsx; app/layout.tsx |
| 48 | `pricing/desktop/01-pilot-build-retainer` | section | /pricing | app/pricing/page.tsx |
| 49 | `pricing/desktop/02-pilot-plus-2-more` | section | /pricing | app/pricing/page.tsx |
| 50 | `pricing/desktop/03-footer` | section | /pricing | components/Footer.tsx |
| 51 | `contact/desktop/full-page` | full | /contact | app/contact/page.tsx; app/layout.tsx |
| 52 | `contact/desktop/01-let-s-talk` | section | /contact | app/contact/page.tsx |
| 53 | `contact/desktop/02-footer` | section | /contact | components/Footer.tsx |
| 54 | `privacy/desktop/full-page` | full | /privacy | app/privacy/page.tsx; app/layout.tsx |
| 55 | `privacy/desktop/01-privacy` | section | /privacy | app/privacy/page.tsx |
| 56 | `privacy/desktop/02-text-to-be-added-before-launch` | section | /privacy | app/privacy/page.tsx |
| 57 | `privacy/desktop/03-footer` | section | /privacy | components/Footer.tsx |
| 58 | `terms/desktop/full-page` | full | /terms | app/terms/page.tsx; app/layout.tsx |
| 59 | `terms/desktop/01-terms` | section | /terms | app/terms/page.tsx |
| 60 | `terms/desktop/02-text-to-be-added-before-launch` | section | /terms | app/terms/page.tsx |
| 61 | `terms/desktop/03-footer` | section | /terms | components/Footer.tsx |
| 62 | `not-found/desktop/full-page` | full | /no-such-page | app/not-found.tsx; app/layout.tsx |
| 63 | `not-found/desktop/01-nothing-here` | section | /no-such-page | app/not-found.tsx |
| 64 | `not-found/desktop/02-footer` | section | /no-such-page | components/Footer.tsx |
| 65 | `states/desktop/aria-tab-answer-calls` | state | / | components/home/AriaWindow.tsx |
| 66 | `states/desktop/aria-tab-follow-up-fast` | state | / | components/home/AriaWindow.tsx |
| 67 | `states/desktop/aria-tab-book-the-slot` | state | / | components/home/AriaWindow.tsx |
| 68 | `states/desktop/aria-tab-win-back` | state | / | components/home/AriaWindow.tsx |
| 69 | `states/desktop/command-palette` | state | / | components/CommandPalette.tsx |
| 70 | `states/desktop/nav-hover` | state | / | components/Navbar.tsx |
| 71 | `home/mobile/full-page` | full | / | app/page.tsx; app/layout.tsx |
| 72 | `home/mobile/01-hero` | section | / | components/home/sections.tsx (Hero), components/home/visuals.tsx (HeroScene) |
| 73 | `home/mobile/02-live-agent` | section | / | components/home/sections.tsx (LiveAgent), components/home/AriaWindow.tsx |
| 74 | `home/mobile/03-proof` | section | / | components/home/sections.tsx (Proof) |
| 75 | `home/mobile/04-services` | section | / | components/home/sections.tsx (Services), components/home/visuals.tsx (service mock-ups) |
| 76 | `home/mobile/05-built-for` | section | / | components/home/sections.tsx (BuiltFor), components/home/visuals.tsx (PersonaFigure) |
| 77 | `home/mobile/06-work` | section | / | components/home/sections.tsx (WorkReel), lib/projects.ts |
| 78 | `home/mobile/07-manifesto` | section | / | components/home/sections.tsx (Manifesto) |
| 79 | `home/mobile/08-process` | section | / | components/home/sections.tsx (Process) |
| 80 | `home/mobile/09-demos` | section | / | components/home/sections.tsx (DemosTeaser) |
| 81 | `home/mobile/10-pricing` | section | / | components/home/sections.tsx (PricingTeaser) |
| 82 | `home/mobile/11-faq` | section | / | components/home/sections.tsx (Faq) |
| 83 | `home/mobile/12-final-cta` | section | / | components/home/sections.tsx (FinalCta) |
| 84 | `home/mobile/13-footer` | section | / | components/Footer.tsx |
| 85 | `services/mobile/full-page` | full | /services | app/services/page.tsx; app/layout.tsx |
| 86 | `services/mobile/01-five-jobs-one-agent-each` | section | /services | app/services/page.tsx |
| 87 | `services/mobile/02-voice-agents-that-answer-every-call` | section | /services | app/services/page.tsx |
| 88 | `services/mobile/03-follow-up-in-seconds-not-days` | section | /services | app/services/page.tsx |
| 89 | `services/mobile/04-bookings-straight-into-your-calendar` | section | /services | app/services/page.tsx |
| 90 | `services/mobile/05-reactivation-of-lapsed-customers` | section | /services | app/services/page.tsx |
| 91 | `services/mobile/06-reporting-you-can-read-in-a-minute` | section | /services | app/services/page.tsx |
| 92 | `services/mobile/07-need-a-custom-ai-agent-or-a-full-stack-w` | section | /services | app/services/page.tsx |
| 93 | `services/mobile/08-book-a-call` | section | /services | app/services/page.tsx |
| 94 | `services/mobile/09-footer` | section | /services | components/Footer.tsx |
| 95 | `work/mobile/full-page` | full | /work | app/work/page.tsx; app/layout.tsx |
| 96 | `work/mobile/01-built-shipped-running` | section | /work | app/work/page.tsx |
| 97 | `work/mobile/02-project-types` | section | /work | app/work/page.tsx |
| 98 | `work/mobile/03-bazar-flow-plus-3-more` | section | /work | app/work/page.tsx |
| 99 | `work/mobile/04-footer` | section | /work | components/Footer.tsx |
| 100 | `work-detail/mobile/full-page` | full | /work/bazar-flow | app/work/[slug]/page.tsx; app/layout.tsx |
| 101 | `work-detail/mobile/01-bazar-flow` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 102 | `work-detail/mobile/02-project-hero-video-placeholder` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 103 | `work-detail/mobile/03-the-problem` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 104 | `work-detail/mobile/04-the-solution` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 105 | `work-detail/mobile/05-architecture` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 106 | `work-detail/mobile/06-results` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 107 | `work-detail/mobile/07-book-a-call-nextcodenexus-ai` | section | /work/bazar-flow | app/work/[slug]/page.tsx |
| 108 | `work-detail/mobile/08-footer` | section | /work/bazar-flow | components/Footer.tsx |
| 109 | `demos/mobile/full-page` | full | /demos | app/demos/page.tsx; app/layout.tsx |
| 110 | `demos/mobile/01-try-it-don-t-take-our-word` | section | /demos | app/demos/page.tsx |
| 111 | `demos/mobile/02-live-voice-agent-plus-1-more` | section | /demos | app/demos/page.tsx |
| 112 | `demos/mobile/03-footer` | section | /demos | components/Footer.tsx |
| 113 | `about/mobile/full-page` | full | /about | app/about/page.tsx; app/layout.tsx |
| 114 | `about/mobile/01-agents-convened` | section | /about | app/about/page.tsx |
| 115 | `about/mobile/02-fixed-scope-plus-2-more` | section | /about | app/about/page.tsx |
| 116 | `about/mobile/03-footer` | section | /about | components/Footer.tsx |
| 117 | `pricing/mobile/full-page` | full | /pricing | app/pricing/page.tsx; app/layout.tsx |
| 118 | `pricing/mobile/01-pilot-build-retainer` | section | /pricing | app/pricing/page.tsx |
| 119 | `pricing/mobile/02-pilot` | section | /pricing | app/pricing/page.tsx |
| 120 | `pricing/mobile/03-build` | section | /pricing | app/pricing/page.tsx |
| 121 | `pricing/mobile/04-retainer` | section | /pricing | app/pricing/page.tsx |
| 122 | `pricing/mobile/05-footer` | section | /pricing | components/Footer.tsx |
| 123 | `contact/mobile/full-page` | full | /contact | app/contact/page.tsx; app/layout.tsx |
| 124 | `contact/mobile/01-let-s-talk` | section | /contact | app/contact/page.tsx |
| 125 | `contact/mobile/02-footer` | section | /contact | components/Footer.tsx |
| 126 | `privacy/mobile/full-page` | full | /privacy | app/privacy/page.tsx; app/layout.tsx |
| 127 | `privacy/mobile/01-privacy` | section | /privacy | app/privacy/page.tsx |
| 128 | `privacy/mobile/02-text-to-be-added-before-launch` | section | /privacy | app/privacy/page.tsx |
| 129 | `privacy/mobile/03-footer` | section | /privacy | components/Footer.tsx |
| 130 | `terms/mobile/full-page` | full | /terms | app/terms/page.tsx; app/layout.tsx |
| 131 | `terms/mobile/01-terms` | section | /terms | app/terms/page.tsx |
| 132 | `terms/mobile/02-text-to-be-added-before-launch` | section | /terms | app/terms/page.tsx |
| 133 | `terms/mobile/03-footer` | section | /terms | components/Footer.tsx |
| 134 | `not-found/mobile/full-page` | full | /no-such-page | app/not-found.tsx; app/layout.tsx |
| 135 | `not-found/mobile/01-nothing-here` | section | /no-such-page | app/not-found.tsx |
| 136 | `not-found/mobile/02-footer` | section | /no-such-page | components/Footer.tsx |
| 137 | `states/mobile/mobile-menu` | state | / | components/Navbar.tsx |
