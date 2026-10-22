# Motion implementation (lemlist research + GSAP layer)

Measured on lemlist.com with Playwright (`tools/research/motion-lemlist.mjs`, `motion-lemlist2.mjs`; raw data and frames in `docs/research/lemlist-motion/`). Pattern research only, nothing copied.

## What lemlist actually does

| Finding | Value |
| --- | --- |
| Animation libraries | None. No GSAP, Lenis, Lottie or Webflow IX. Next.js + Tailwind, `scroll-behavior: smooth` |
| Hero on load | No intro animation. Everything is at opacity 1 from the first frame |
| Colour and border hover | 150ms, `cubic-bezier(0.4, 0, 0.2, 1)`. Nav ghost "Log in": transparent to #EFEFEF, text #7D7D7D to #18181A |
| Language switch focus | Border #DEDEDE to #316BFF with a 3px ring |
| Icon turn | 200ms, same curve |
| Card image zoom | `transition-transform` 300ms, scales on hover |
| Accordion | `grid-template-rows` 0fr to 1fr, 320ms, `cubic-bezier(0.32, 0.72, 0, 1)`; text fades with 0 to 1 opacity and blur |
| Feature section | Pure CSS stack: every card is `position: sticky` at the same top offset (stage top + 40px), so each next card slides over the previous one. Media crossfades with opacity 0.7s `cubic-bezier(0.22, 1, 0.36, 1)` |
| Hairline frame | Diamond joints at the section lines |

## What we built

| Where | Behaviour | Source |
| --- | --- | --- |
| Hero | Headline lines rise out of a mask (1.2s expo.out, 0.12s stagger), the waveform pill grows, support line and buttons follow, scene settles. Our addition: lemlist has none | `MotionRoot` |
| Hero scene | Nodes drift on their own beat and lean away from the pointer (lerp 0.08), links flow, mark breathes. One ticker, only while the hero is on screen | `MotionRoot`, `HeroScene` |
| Waveform | Each bar breathes on its own beat. Paused off screen | `data-wave` |
| Reveals | Fade and rise 28px, 0.8s, batched so neighbours stagger 0.08s, once | `data-reveal` |
| Groups | Children rise in turn, stagger capped at 0.6s total | `data-stagger` |
| Services | lemlist sticky stack on screens 1024px and up; the covered card scales to 0.95 as the next covers it | `data-stack` |
| Mock-ups | Play once on entering: bubbles pop in turn, slots fill with a small overshoot, bars grow, numbers count up | `data-visual` |
| Manifesto | Words brighten with scroll (scrub 0.6) | `data-words` |
| Aria window | Each tab plays its conversation in line by line | `AriaWindow` |
| FAQ | lemlist's accordion curve and timings, one row open | `Accordion` |
| Buttons | 150ms colour, press scale 0.98; hero and closing buttons lean toward the pointer | `Button`, `data-magnetic` |
| Cards | Work image zoom 300ms, persona figure lift 200ms | `.zoom-on-hover`, `.lift-on-hover` |
| Nav | Pill gains a soft shadow after 8px of scroll; mobile menu items rise in turn | `Navbar` |
| Cursor | Ring follows (lerp), grows over links and buttons. Additive: native cursor stays. Fine pointers only | `Cursor` |

## Rules kept from the approved motion budget

- Content is hidden only while `html.motion-ok` is set. The inline script in `app/layout.tsx` never sets it under `prefers-reduced-motion`, and removes it after 4s if `MotionRoot` fails to boot, so reduced-motion and broken-JS visitors always see everything.
- All GSAP work lives in `gsap.matchMedia`, so it reverts on route change and never runs under reduced motion.
- Lenis stays off on phones, coarse pointers and reduced motion. Sticky stack and cursor are desktop only.
- One RAF: Lenis, ScrollTrigger and the hero ticker share GSAP's ticker.

## Verify

`cd tools/research && node motion-verify.mjs` (starts and stops its own server; needs `npm run build` first). 22 checks: start states, hero intro, scene, waveform, cursor, reveals, sticky stack, mock-ups, manifesto, accordion, nothing stuck hidden, route change, reduced motion, mobile overflow and tab fit. Frames land in `docs/screens/motion/`.

## WebGL hero (added)

`components/home/HeroScene3D.tsx` renders the Brick Crew as real 3D toy bricks (rounded bricks, cylinder studs, clear-coat plastic, ink outline, glossy eyes that blink) around the Conclave mark. `HeroStage.tsx` decides whether to use it.

| Rule | Detail |
| --- | --- |
| Baseline | The SVG crew scene always renders and is the fallback |
| Loads only when likely good | width 900px or more, a mouse, no reduced-motion preference, WebGL2 available |
| Never blocks first paint | Loaded in an idle callback after the page, as one lazy chunk |
| Pauses off screen | IntersectionObserver sets the canvas to `frameloop="never"` |
| Quality guard | If smoothed frame time stays above 24ms for 2s, it steps aside for the SVG scene and remembers for the session |
| Kill switch | `NEXT_PUBLIC_HERO_3D=off`. Add `?hero3d=force` to skip the speed guard when testing on software GL |
| Motion | Drop-in with overshoot, idle bob, pointer lean (lerp 0.08), blink, dashed links to the core |

Measured on a production build (`node hero3d-weight.mjs` in `tools/research`): the 3D chunk is **241 KB gzip**, requested about 2 seconds after the page, so JavaScript at load stays at 234 KB and the load event is unchanged (about 330 to 360 ms in both cases). Phones, reduced motion and no-WebGL visitors never download it. Software rendering in headless Chrome runs about 5 frames per second, so frame-rate on real hardware was not measured here.
