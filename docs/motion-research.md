# Motion and layout research (Step 1)

Captured with Playwright (Chromium, 1440x900) on 2026-10-22 using `tools/research/capture.mjs`.
Screenshots: `docs/research/<site>/scroll-NN.png` (one per ~700px scroll) and `hover-NN.png` (nav, buttons). Raw notes: `notes.json` in each folder.
Pattern references only. No text, images or code are copied.

## 1. lemlist.com (about 90% of layout)

Page height about 11,476px, 17 scroll captures. Fonts: Inter. Nav is `position: fixed`. No GSAP, no WebGL; 2 videos. Motion is mostly CSS and light JS.

| Pattern | What it does | What Conclave takes |
| --- | --- | --- |
| Floating pill nav | White rounded pill with a gutter from the viewport edge. Logo, 3 dropdown links, Pricing, then a ghost "Get a demo" and a dark primary button. Stays fixed on scroll. | Ink pill with Chalk text, 4 links, one lime "Book a call". No dropdowns. |
| Full-bleed hero | Edge-to-edge image behind the nav. Headline at bottom left in large sentence-case type. Support copy and two buttons sit at bottom right on the same baseline. | Same composition, with the flat Three.js scene as the hero. Headline in Syne uppercase. |
| Live product demo under hero | A browser-window frame with tabs (traffic lights, 5 tabs) sits straight under the hero. Tabs switch the demo content. | "Talk to Aria" panel under the hero, with the same tabbed window frame and a violet waveform. |
| Numbered feature blocks | Small numbered badge, then a centred or left headline, 2 lines of body, and a framed product visual in a rounded card on a pale background with faint line ornaments. | Eyebrow in IBM Plex Mono ("01 / VOICE"), headline, one-line body, one screen recording per service. |
| Social proof strip | "Built to back outbound pros", then a G2 badge row, then testimonials. | Proof section: 3 real numbers and tool logos. Placeholders until real data exists. |
| Playbook/case cards | Three cards with a person, a result headline ("Achieve 145% quota") and a link. | Work reel cards, outcome first. |
| FAQ | Plain accordion, 5+ questions. | Five objections answered. |
| Final CTA | Closing headline plus a trial button before the footer. | Large type on lime, one button. |

Notes:
- A cookie banner appears bottom left (decline-by-default is the right call for us; keep ours small and non-blocking).
- Personalised greeting banners appear at the top (we skip these).
- Hover on buttons is a subtle background and border change, no scale. Calm.

## 2. Willows / Jane preview (about 10% of style)

Page height about 14,584px, 21 scroll captures. Fonts: Clash Grotesk, Overused Grotesk, Plus Jakarta Sans. Uses GSAP and ScrollTrigger and one canvas. No Lenis detected.

| Pattern | What it does | What Conclave takes |
| --- | --- | --- |
| Oversized wide uppercase hero | Name and role set at about 130px, extra-wide grotesk, 3 lines. Two image pills (a round avatar and a rounded-rect photo) sit inline inside the headline. A thick diagonal slash cuts through the type. | Syne 700 to 800 uppercase. Image pills inline in "AGENTS, CONVENED". Skip the diagonal slash. |
| Nav | Transparent, fixed. Uppercase small tracking, a dot marker on the active item, outlined pill CTA at right. Goes solid black when over dark sections. | Our pill is separate from this, but the active-dot marker and outlined hover are worth keeping. |
| Scroll word stack | Black section. "EVOLUTION / THROUGH / DESIGN" in huge type, words staggered left and right, small 001/002/003 numerals beside them, a skewed duplicate of the last word, and a circular "LEARN MORE" button below. | Process section 001 to 003 and the manifesto. Skew only as a short reveal, not a permanent effect. |
| Circular button | Cursor becomes a hollow circle with a centred label ("LEARN MORE", "LET'S TALK"). | Brush-ring cursor turns into a lime circle with "VIEW" or "BOOK". Desktop only. |
| Section header | Tiny uppercase label left, "DISCOVER MORE ->" right, 1px rule under, then the big heading. A 1px vertical rule with a dot marker splits the 2-column layout. | Eyebrow plus rule pattern. Use the vertical rule with a live dot (violet) for the services sticky split. |
| Services | Sticky left column with heading, right-hand image that changes as you scroll. | Same mechanic, with screen recordings. |
| Footer | Giant brand word at the bottom, "back to top" button, circular "LET'S TALK". | Giant "AGENTS, CONVENED" band. The reference fades the word with a gradient. **Do not copy that: flat colour only.** |

## 3. Other sites studied

| Site | Folder | What to learn |
| --- | --- | --- |
| locomotive.ca | `docs/research/locomotive` | Lenis smooth scroll detected, 2 canvases. A work list of full-width rows with hairline rules and large condensed serif titles; hover reveals the project. A big paragraph set as a statement. Lesson: rows with rules scale better than card grids and avoid the repeated-card look. |
| makemepulse.com | `docs/research/makemepulse` | Lenis, 3 canvases. Dark to light section handover with a centred, inset case-study image, and a small title and tag below. A minimal 3-dot logo and a two-line menu icon. Lesson: generous empty space, one image at a time, plain captions. |
| immersive-garden.com | `docs/research/immersive-garden` | Lenis, 12 canvases (WebGL-heavy). Only 2 captures survived headless, so treat as a performance warning: many canvases are what we avoid. One scene only. |

Not captured: lusion.co (page error in headless) and activetheory.net (headless browser reported "Not Supported"). They need a GPU browser, so they are skipped rather than guessed.

## 4. Decisions for Conclave

1. **Layout:** lemlist skeleton. Pill nav, full-bleed hero with headline bottom left, live demo directly under it, numbered feature blocks.
2. **Style accent:** Willows-style oversized uppercase type, inline image pills, circular cursor button, scroll-brightening manifesto, one skewed word band in the footer.
3. **Smooth scroll:** Lenis (3 of 5 studied sites use it). Disable on phones and when `prefers-reduced-motion` is set.
4. **WebGL budget:** one canvas total (hero). immersive-garden shows the cost of more.
5. **Flat only:** both references use image gradients or fades in places (Willows footer word, lemlist hero photo). Conclave uses flat fills and flat vector media only.
6. **Lists over card grids:** where possible use ruled rows (locomotive pattern) so the work and services do not read as a repeated card grid.
7. **Hover:** quiet, colour or border changes and the cursor circle. No scale pops.
8. **Cookie banner:** small, bottom corner, decline equal in weight to accept.

## 5. Re-run

```
cd tools/research
node capture.mjs <url> ../../docs/research/<name>
```
