# Conclave AI design system

> **Revision 2 (light version):** surfaces, nav, buttons and section structure changed after feedback. See `docs/redesign-changes.md`. Added tokens: Paper #FBFCF8, Mist #E4E9DD, Slate #4A5C55 (secondary text on light, 5.76 to 6.90:1), Plum #5B3FD6 (small violet text on light, 6.04 to 6.52:1). The type scale and motion system below still apply; section headings now use Outfit 600 sentence case, Syne uppercase is kept for hero and a few statement blocks.

All values are flat. No gradients, no glass, no blobs, no heavy shadows.

## 1. Colour tokens and WCAG contrast

Ratios computed with `tools/research/contrast.mjs` (WCAG 2.x relative luminance).

| Token | Hex | Role |
| --- | --- | --- |
| `ink` | #0B1512 | Main background |
| `moss` | #14302A | Cards, raised surfaces |
| `chalk` | #F1F4EC | Light sections, primary text on dark |
| `steel` | #8FA39A | Secondary text, borders (dark sections only) |
| `lime` | #C8F169 | Actions, brand, highlights |
| `violet` | #7C5CFF | Live or speaking: waveform, graphics, hover |
| `lilac` | #CFC4FF | Small violet text on dark |

| Pair (text on background) | Ratio | Result | Rule |
| --- | --- | --- | --- |
| Chalk on Ink | 16.71 | AAA | Body text on dark |
| Chalk on Moss | 12.71 | AAA | Body text on cards |
| Ink on Chalk | 16.71 | AAA | Body text on light sections |
| Moss on Chalk | 12.71 | AAA | Secondary text on light sections |
| Lime on Ink | 14.37 | AAA | Lime text and borders on dark |
| Lime on Moss | 10.93 | AAA | Same, on cards |
| Ink on Lime | 14.37 | AAA | **Button label on lime** |
| Moss on Lime | 10.93 | AAA | Alternate label |
| Steel on Ink | 6.97 | AA | Secondary text |
| Steel on Moss | 5.30 | AA | Secondary text on cards (minimum size 14px) |
| Lilac on Ink | 11.50 | AAA | Small violet-family text |
| Lilac on Moss | 8.74 | AAA | Same, on cards |
| Violet on Ink | 4.28 | Large/UI only | Waveform, icons, focus ring, 24px+ text |
| Violet on Moss | 3.25 | Large/UI only | Graphics only, never text |
| Chalk on Violet | 3.91 | Large/UI only | Large bold labels only (24px+ or 18.7px bold+) |
| **Steel on Chalk** | **2.40** | **FAIL** | Never. On Chalk use Moss for secondary text |
| **Lime on Chalk** | **1.16** | **FAIL** | Never. On Chalk, primary button is Ink with Chalk text (16.71) |

Findings that change the PRD slightly:
1. Steel does not work on Chalk sections. Use Moss for secondary text there.
2. Lime does not work on Chalk. The primary button on light sections flips to Ink fill and Chalk label; on the final lime CTA section, text is Ink.
3. Violet is graphics and large text only. Small violet text uses Lilac.
4. Focus ring: 2px Lime on dark, 2px Ink on Chalk, offset 3px. Both are far above the 3:1 needed.

Proportions: about 70% Ink and Moss, 20% Chalk, 8% Lime, 2% Violet. Lime marks actions, violet marks anything live.

Tailwind tokens (v4, CSS-first, in `styles/globals.css`):
```css
@theme {
  --color-ink: #0B1512;  --color-moss: #14302A;  --color-chalk: #F1F4EC;
  --color-steel: #8FA39A; --color-lime: #C8F169; --color-violet: #7C5CFF; --color-lilac: #CFC4FF;
}
```

## 2. Type scale

Fonts via `next/font` (self-hosted, `display: swap`): Syne (700, 800), Outfit (300 to 600), IBM Plex Mono (400, 500).

| Step | Use | Font | Size (clamp, 360 to 1440px) | Line | Tracking | Case |
| --- | --- | --- | --- | --- | --- | --- |
| display-xl | Hero headline | Syne 800 | clamp(2rem, 8.6vw, 9.5rem) (96px or larger from 1200px) | 0.92 | -0.02em | Upper |
| display-l | Section words, final CTA | Syne 800 | clamp(1.75rem, 7vw, 6.5rem) | 0.95 | -0.02em | Upper |
| display-m | Section headings | Syne 700 | clamp(1.5rem, 4.5vw, 4rem) | 1.0 | -0.01em | Upper |
| h3 | Card and block titles | Outfit 500 | clamp(1.5rem, 2.4vw, 2.25rem) | 1.15 | -0.01em | Sentence |
| body-l | Lead paragraph | Outfit 400 | clamp(1.125rem, 1.4vw, 1.375rem) | 1.5 | 0 | Sentence |
| body | Default | Outfit 400 | 1rem (16px) | 1.6 | 0 | Sentence |
| small | Captions | Outfit 400 | 0.875rem (14px) | 1.5 | 0 | Sentence |
| label | Eyebrows, numerals, chips | IBM Plex Mono 500 | 0.75rem (12px) | 1.3 | 0.08em | Upper |

Rules: body measure 60 to 70ch; no text under 12px, labels only; Syne never used for body; `text-wrap: balance` on headings, `pretty` on paragraphs; tabular numerals in stats.

## 3. Layout grid and spacing

- **Container:** max 1440px, side gutter 16px (mobile), 32px (tablet), 40px (desktop). Full-bleed allowed for hero and media.
- **Grid:** 4 columns at <768px, 8 at 768 to 1199px, 12 at 1200px+; gap 16 / 24 / 24px.
- **Breakpoints:** 480, 768, 1024, 1280, 1536.
- **Spacing scale (4px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192. Section vertical padding: 96px mobile, 160px desktop. Between a section's eyebrow and heading: 16px; heading to body: 24px.
- **Radius:** 4px (chips, inputs), 12px (cards), 999px (pill nav, buttons, image pills). Nested radii follow concentric rule (inner = outer minus padding).
- **Borders:** 1px `steel` at 30% opacity on dark; 1px `ink` at 15% on Chalk. Solid colours, no shadows. One elevation cue only: a 1px border and a surface change (Ink to Moss).
- **Nav pill:** fixed, top 16px, height 56px, max width 1100px, Ink fill with Chalk text and a 1px Steel border.
- **Hit areas:** min 44x44px. Buttons 48px high (56px hero).

## 4. Component rules

- **Primary button:** Lime fill, Ink label (14.37). Hover: Chalk fill. Light sections: Ink fill, Chalk label.
- **Secondary:** 1px Chalk border, Chalk label; hover fills Chalk with Ink label.
- **Live element** (waveform, speaking indicator, live dot): Violet only, with a Lilac label.
- **Chips:** Plex Mono label, 4px radius, Moss fill on dark.
- **Cursor ring (desktop, fine pointer only):** 24px Lime ring; over media it grows to a 96px Lime circle with an Ink label ("VIEW", "BOOK"). Native cursor remains for text and inputs.
- **Icons:** only where they carry meaning (mic, play, arrow). 1.5px stroke, currentColor.

## 5. Motion system

**Easings** (defined once in `lib/motion.ts`, used by both GSAP and CSS):

| Name | Curve | Use |
| --- | --- | --- |
| `out-expo` | cubic-bezier(0.16, 1, 0.3, 1) | Reveals, entrances (default) |
| `in-out` | cubic-bezier(0.65, 0, 0.35, 1) | Position changes, pinned swaps |
| `out-quart` | cubic-bezier(0.25, 1, 0.5, 1) | Hover, UI state |
| `linear` | linear | Scrub-linked and marquee only |

**Durations:** micro (hover, press) 150ms; UI (menu, accordion, tooltip) 250 to 350ms; reveal 700 to 900ms; hero intro up to 1200ms; scrubbed motion follows scroll with `scrub: 0.6`. Nothing decorative over 1.2s. Exit is about 70% of entrance.

**Stagger:** letters 0.02s, words 0.06s, list items 0.08s, cards 0.1s; cap the total stagger at 0.6s so nothing waits. Reveal once (`once: true`), do not replay on scroll back.

**Properties:** transform and opacity only (plus `clip-path` for masks). No animating width, height, top or left. `will-change` set only during the tween.

**Scroll:** Lenis with `lerp: 0.1`, wired to GSAP's ticker so ScrollTrigger and Lenis share one RAF. Pinned sections: services (sticky left, media swap), work reel (horizontal), word band. Each ScrollTrigger is created inside `gsap.context()` and killed on unmount.

**Cursor/3D:** pointer-driven scene motion is lerped (factor 0.08), 30fps floor monitor; if frame time stays above 24ms for 2s, the scene drops to a static frame and Lenis turns off.

**Reduced motion (`prefers-reduced-motion: reduce`):** Lenis off (native scroll); no letter or word animation, content appears with a 150ms opacity fade; no pinned horizontal reel (becomes a vertical list); Three.js scene replaced by a static SVG of the C mark; manifesto words shown at full brightness; marquee paused; waveform keeps working because it reflects real audio, not decoration; videos show a poster and do not autoplay.

**Mobile:** Lenis off under 768px, 3D scene off, reel becomes a swipe list, cursor effects off (coarse pointer).

## 6. Skills I will use

From `docs/SKILLS.md` (50 skills installed in `.claude/skills`, 24 required ones confirmed):

| Skill | Why |
| --- | --- |
| taste-skill, redesign-skill | Keep the site away from template look; audit against slop patterns |
| frontend-design, impeccable | Overall visual direction and polish |
| better-colors, better-typography, better-layout, better-ui | Token checks, type scale, spacing, radius and hit areas |
| better-accessibility, better-writing, better-interface | WCAG, copy, a final combined review |
| animate, scroll-experience, lets-scroll, review-animations | Motion system, ScrollTrigger and frame-sequence scrubbing, motion review |
| nextjs-app-router-patterns, nextjs-best-practices, nextjs-seo-indexing | Routing, server/client split, SEO |
| tailwind-design-system, tailwind-patterns, shadcn, zustand-store-ts | Tokens, components, state |
| supabase, supabase-postgres-best-practices | Projects, leads and leaderboard tables, row-level security |
| imagegen-frontend-web, brandkit | Prompts for Google Flow assets |
| break, interface-review | Step 6 verification |

Deviations from the PRD prompt, for your information: Playwright MCP was not connected, so I installed the Playwright library directly and drove it with a script. The `supabase` skill note in `SKILLS.md` says "not used in v1", but this project does use Supabase, so I will use it.

## 7. Approval needed

Please confirm or change:
1. The Steel/Lime/Violet contrast rules in section 1 (these adjust the PRD slightly).
2. The type scale and the 12-column grid.
3. The motion budget (one WebGL scene, Lenis off on phones, reduced-motion fallbacks).

I stop here until you approve.
