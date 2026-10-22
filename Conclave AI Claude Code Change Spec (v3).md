# Conclave AI: Claude Code Change Spec (v3)

Oct 23, 2026 · @Mohummad Anees

## 1. Goal, rules and what changes

This spec turns the reviewed v2 build (375 shots) into v3: a shorter, sharper home page, a business-systems offer (ERP, CRM, automations) in place of the CMS card, and a mature face-less stud mascot system in place of the brick robots. Keep everything that already works: the lime/ink/violet palette, Syne + Outfit + IBM Plex Mono, the floating pill nav, the Services cards, the browser Aria demo and calculator.

### What changes at a glance

| Area | v2 now | v3 |
| --- | --- | --- |
| Home length | 17 sections, 13,305px | About 11 sections, 7,000 to 8,000px |
| Studio cards | Agents, Agent apps, Websites with CMS, Mobile apps, Platforms | Agents, Automations, ERP and CRM, Apps, Platforms |
| Demos page | Aria, calculator, Convene game, wizard, demo phone line, "talk to a person" | Aria and calculator only until the rest are built |
| Mascots | Seven brick robots with faces and antennae | Seven face-less stud patterns on one 7x7 grid, plus the C mark made of studs |
| Home Receipts, Stack, Guild, Manifesto | Full sections | Moved to their own pages; slim strips on home |
| Persona tiles | Six robot tiles | Four stud tiles |

### Non-negotiable rules (unchanged)

- Flat colour only: no gradients, glassmorphism, blobs or heavy shadows.
- Lime marks actions, violet marks anything live or speaking.
- Every visual must explain something. One primary action per section.
- WCAG AA on all text. Reduced-motion users see a static version of every animation.
- Never show a number, logo, quote or result that is not real. Mock-ups are labelled "Example".
- Do not name any client or reuse a collaborator's project without written permission.

### Files likely touched

Home page and section components, the Studio and Services pages, the Demos page, the Crew page, the persona tile component, hero scene, nav and footer, sitemap and metadata. Delete the brick-robot SVGs and any imports of them once the stud glyphs replace them.

## 2. Home page: new order and edits

Target: 11 sections, 7,000 to 8,000px at desktop. Each section keeps one headline, one visual and one action.

| # | Section | Action | Details |
| --- | --- | --- | --- |
| 01 | Hero | Edit | Keep the headline and subline. Replace the brick-robot orbit with the stud scene: studs scatter, then assemble into the C on load and again on scroll. Keep the proof line ("Live in 14 days. Fixed price. Hear it first.") |
| 02 | Live agent | Keep | Keep the Aria demo window. Add the Aria stud glyph in the side card with its waveform pulsing while speaking |
| 03 | Proof strip | Replace | Remove the stack-name grid. Use a single row: "Answers in about 1 ring" and similar only when real; until then use three plain facts ("Fixed scope", "You own the code", "Live in 14 days") |
| 04 | Services | Shorten | Keep the five sticky cards but cut each to a headline, one line and a mock-up. Target 1,200px total, down from about 2,000px |
| 05 | Systems (replaces Studio) | Edit | Five columns: Agents, Automations, ERP and CRM, Apps, Platforms. One line and one stack chip row each. Link "See the studio" |
| 06 | Built for | Edit | Four tiles only: Clinics, Med spas, Home services, Startups. Use stud glyphs (Aria, Echo, Boomerang, Gate). Dental and real estate stay as pages |
| 07 | Work | Hide until real | Show only when at least one real case has a screenshot and one real metric. Otherwise remove the section and keep /work |
| 08 | Process | Keep | Add duration under each step: Audit 2 days, Build 7 to 10 days, Run weekly |
| 09 | Pricing | Edit | Three plans with "from" prices once set; link to /pricing for the table |
| 10 | FAQ | Keep | Add: Which languages? Do I own the code? What if the agent is wrong? How is this different from a freelancer or a no-code flow? |
| 11 | Final CTA | Keep | Dark block. "Hear it. Then book it." with one inline booking widget |

### Move off the home page

- **Receipts table:** to /receipts only. Remove it from home until real numbers exist.
- **Stack and scale:** to /studio and /studio/platforms.
- **Join the guild:** shrink to a one-line strip above the footer ("Developers: join the guild").
- **Manifesto:** two sentences in the About page hero; remove from home.
- **Demos section on home:** remove; the live agent already covers it.
- **Work tiles with letters:** remove until real screenshots exist.

### Footer

Keep the five-column footer and newsletter. Remove links to pages that are hidden. Keep the domain as hello@conclaveai.com.

## 3. Studio, services, demos and other pages

### Studio (/studio and sub-pages)

Replace "Websites with CMS" with business systems and add automations. New cards, each with one line, a stack chip row and a price or timeline tag:

| Card | One line | Stack chips | Tag |
| --- | --- | --- | --- |
| Agents | Voice, follow-up, booking, reactivation, reporting agents | Vapi, LiveKit, OpenAI | 14-day pilot |
| Automations | Workflows that move data between your tools and run on triggers | n8n, webhooks, Zapier, APIs | 1 to 2 week build |
| ERP and CRM | Custom business systems: customers, orders, inventory, billing, POS | Next.js, FastAPI, Postgres | Fixed scope per module |
| Apps | Web and mobile apps with agent features; marketing sites included when needed | Next.js, React Native, Flutter | Fixed scope per milestone |
| Platforms | Multi-service systems with an event backbone and monitoring | Dapr, Kafka, Kubernetes | Retainer or milestone |

Add sub-pages: /studio/automations, /studio/erp-crm, /studio/apps, /studio/platforms (keep /studio/agents). Each page: problem, what we build, a drawn architecture or module diagram, stack, timeline, price from, FAQ, related work, CTA. Only list a stack item we can demonstrate. Fold the old "Websites with CMS" content into /studio/apps as a section (sites with a headless CMS, SEO and booking built in).

Suggested ERP and CRM module list for the page: customers and leads, appointments, inventory, invoicing, staff and roles, reports, integrations. Label any example screenshots "Example".

### Services

- Keep the five jobs. Reduce page length (currently 5,833px) by collapsing the "Which agent do I need?" and "Works with" blocks into compact rows.
- Add a small "Beyond agents" strip that links to /studio.

### Demos

- Keep: Talk to Aria, Missed-call calculator.
- Remove: Call our demo line, Prefer to talk to a person.
- Hide until built and polished: Convene game, Build your own agent wizard. Keep the code behind a flag.
- Add a single CTA block at the end: "Hear it. Then book it."

### Work

- Show only real cases. If none yet, show a short note ("First case studies are being written with our pilot clients") and the build logs, not placeholder tiles.
- Work detail pages need a real screenshot or loop in the hero; fix the blank white box.

### Crew page

Rename to "The Crew" with stud glyphs (see section 4). Each agent: glyph, role, a one-line sample voice, and what it does. Remove the faces and antennae.

### Pricing, About, Contact, Join

- Pricing: show "from" prices and the pilot guarantee only if you will honour it; add the comparison row (agent vs receptionist vs answering service).
- About: put the two founders, faces and one-line stories, above the principles; remove the "Team profiles to be added" placeholder when photos are ready.
- Contact: Cal.com embed beside the form; add WhatsApp number and reply time when ready.
- Join: keep the Guild and Careers; add open-source starters when published.

## 4. The stud mascot system

**Idea:** the brand's "characters" are not creatures. They are patterns on one 7x7 stud grid (like the OpenAI dots), so they feel engineered, scale to a favicon, and animate cleanly. Personality comes from motion and colour, not faces. The Conclave C mark is built from the same studs, so the logo and the crew are one system.

### Why this replaces the brick robots

- Robots with faces and antennae read as a toy cast to clinic and startup buyers.
- A silhouette made of dots survives at 16px and in loading states.
- Seven near-identical robots in persona tiles confused the message; patterns carry meaning (a waveform means voice, a calendar means booking).
- It avoids copying any real toy brand: use generic round studs, no brand marks or minifigures.

### Grid and tokens

| Token | Value |
| --- | --- |
| Grid | 7 x 7 |
| Viewbox | 0 0 200 200 |
| Pitch | 24 |
| Origin | 28, 28 (so the grid is centred) |
| Lit stud radius | 9 |
| Dim stud radius | 4.5, opacity 0.18 |
| Accent stud | radius 9, accent colour |
| Tile radius | 36 |
| Tile padding | 16 |

### The seven agents (data file)

Save as `lib/studs/patterns.ts`. Coordinates are `[col, row]`, 0-indexed, origin top-left.

```ts
export type Cell = [number, number];
export const GRID = 7;

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

const wave: Cell[] = [[0, 3], [2, 7], [4, 5], [6, 3]].flatMap(([c, h]) => {
  const top = Math.floor((GRID - h) / 2);
  return range(0, h - 1).map((i) => [c, top + i] as Cell);
});

const ripple: Cell[] = [];
for (let r = 0; r < GRID; r++)
  for (let c = 0; c < GRID; c++) {
    const d = Math.hypot(c - 3, r - 3);
    if (d < 0.6 || (d > 1.9 && d < 2.4) || (d > 3.0 && d < 3.4)) ripple.push([c, r]);
  }

export const AGENTS = {
  aria:      { label: 'Aria',      job: 'Answers calls',     bg: '#0B1512', lit: '#C8F169', dots: wave,  accent: [] as Cell[] },
  echo:      { label: 'Echo',      job: 'Follows up',        bg: '#14302A', lit: '#CFC4FF', dots: ripple, accent: [] as Cell[] },
  slot:      { label: 'Slot',      job: 'Books the slot',    bg: '#0B1512', lit: '#F1F4EC',
               dots: [...range(1, 5).map((c) => [c, 1] as Cell), ...range(3, 5).flatMap((r) => range(1, 5).map((c) => [c, r] as Cell))],
               accent: [[4, 4]] as Cell[], accentColor: '#C8F169' },
  boomerang: { label: 'Boomerang', job: 'Wins customers back', bg: '#7C5CFF', lit: '#F1F4EC',
               dots: [[0, 2], [1, 3], [2, 4], [3, 4], [4, 4], [5, 3], [6, 2], [6, 1]] as Cell[],
               accent: [[6, 1]] as Cell[], accentColor: '#C8F169' },
  tally:     { label: 'Tally',     job: 'Reports the week',  bg: '#F1F4EC', lit: '#0B1512',
               dots: [[1, 5], [1, 6], ...range(3, 6).map((r) => [3, r] as Cell), ...range(1, 6).map((r) => [5, r] as Cell)] as Cell[],
               accent: [[5, 1]] as Cell[], accentColor: '#7C5CFF' },
  gate:      { label: 'Gate',      job: 'Hands over to a human', bg: '#14302A', lit: '#8FA39A',
               dots: range(1, 6).flatMap((r) => range(1, 5).map((c) => [c, r] as Cell)).filter(([c, r]) => !([2, 3, 4].includes(c) && r >= 3)),
               accent: [[4, 4]] as Cell[], accentColor: '#C8F169' },
  ledger:    { label: 'Ledger',    job: 'Keeps the receipts', bg: '#8FA39A', lit: '#0B1512',
               dots: [...range(1, 5).map((c) => [c, 1] as Cell), ...range(1, 4).map((c) => [c, 3] as Cell), ...range(1, 3).map((c) => [c, 5] as Cell)],
               accent: [[5, 5], [6, 4]] as Cell[], accentColor: '#C8F169' },
} as const;
```

### Components

- `<StudGlyph agent="aria" size={160} animate />`: renders the 7x7 grid as SVG circles from the data above. Lit studs use `lit`, accent studs use `accentColor`, all other cells render dim.
- `<StudMark size={320} tone="lime|dark|light" />`: the Conclave C. Outer ring of 44 studs on radius R from 40 to 320 degrees (gap on the right), inner ring of 32 studs on radius 0.72R at 55% opacity, centre stud radius 0.145R. Ring stud radius 0.072R and 0.05R. Centre colour `#5E8A00` on light and lime, `#C8F169` on dark.
- `<StudCrew />`: the 7 glyphs in a grid for the Crew page and a 4-up variant for Built-for tiles.
- `useStudAssemble()`: GSAP timeline that scatters then assembles the C (used in the hero).

### Where each agent appears

| Place | Glyph |
| --- | --- |
| Live agent side card | Aria |
| Services cards 01 to 05 | Aria, Echo, Slot, Boomerang, Tally (small corner glyph) |
| Built-for tiles | Clinics: Aria, Med spas: Echo, Home services: Boomerang, Startups: Gate |
| Pricing, Receipts, FAQ headers | Ledger and Gate as small marks |
| Favicon and app icon | The C mark on the dark tile |
| Loading and empty states | A single stud pulsing |

### Optional single character

If a face is still wanted for stickers and social, create **one** minimal character: a rounded square with two stud eyes and no mouth, in lime. Use it sparingly (loading, 404, stickers), never in persona tiles.

## 5. Motion, performance and accessibility

### Motion per agent (GSAP)

| Agent | Idle motion | Active motion |
| --- | --- | --- |
| Aria | Bars breathe in height, 1.2s loop | Bars follow live audio level when the voice demo runs |
| Echo | Rings pulse outward in sequence | Rings speed up while a message is sending |
| Slot | One accent stud blinks once every 4s | Accent stud moves to the booked cell with a snap |
| Boomerang | Studs light along the arc, out and back | Loops faster while reactivation runs |
| Tally | Bars grow in sequence on enter | Top accent stud lifts one row on a good week |
| Gate | Door studs open and close slowly | Opens fully on handover |
| Ledger | Rows draw left to right | Check studs light when a figure is sourced |

### Hero scene

- On load: studs start scattered, then assemble into the C in 1.2s with a stagger, centre stud last.
- On scroll: the C splits into the seven glyphs as the page moves to the live agent, then they settle into the Aria card. Keep it one scene.
- Implementation: SVG with GSAP is enough. Use Three.js (instanced spheres) only if the effect needs real depth; otherwise skip it to protect performance.
- Mobile: show the assembled C only, no scroll split.

### Performance targets

- Home Largest Contentful Paint under 2.5s on a mid phone; total JS for the hero under 120 KB.
- All glyphs are inline SVG generated from the data file; no raster images for the crew.
- Lazy-load below-the-fold sections; no layout shift from the hero.

### Accessibility

- Every glyph has a text label ("Aria, answers calls") via `role="img"` and `aria-label`; decorative repeats use `aria-hidden`.
- `prefers-reduced-motion`: render the final static state, no looping animation.
- Contrast: lit studs against their tile meet at least 3:1 (graphics); all text meets AA.
- Keyboard: every card, tab and the command palette are reachable; focus rings visible.

## 6. SEO, content rules and placeholders

### SEO changes

- **Titles:** always "Conclave AI" (two words). Home: `Conclave AI | Voice agents, AI automation and full-stack software`. Pages: `<Page> | Conclave AI`.
- **Schema:** Organization and WebSite JSON-LD with `sameAs` to every profile; Service on each service and studio page; FAQPage on FAQ blocks; Article on Notes; BreadcrumbList site-wide.
- **Pages to keep indexable:** home, services and each service, studio and each sub-page (agents, automations, erp-crm, apps, platforms), industries, pricing, compare, security, notes, about, contact, join.
- **About page disambiguation:** "Conclave AI is an agent studio. Not affiliated with AWS AI Conclave events or Conclave VDR."
- **Technical:** one canonical domain (conclaveai.com), sitemap, robots, canonical tags, OG images per page, 404 page, fast images, alt text on every non-decorative visual.
- **Hide or noindex** pages with placeholder text (Privacy, Terms until real; Work detail until real).

### Content rules

- Replace every placeholder before launch or hide the section: team, WhatsApp, reply time, legal text, results, project outcomes.
- Never publish a stat you cannot trace. Use ranges or "example" labels for illustrations.
- Do not use the collaborator's med spa product name or details in public copy without written permission.
- Do not claim health-privacy compliance until reviewed by a qualified professional.
- Do not invent client logos, testimonials or reviews.

### Open placeholders to fill

| Item | Needed from you |
| --- | --- |
| Team profiles | Photos and one-line stories for both founders |
| WhatsApp number | The number you will use |
| Time zone and reply time | Hours and the promise you can keep |
| Prices | "From" prices for pilot, build, retainer |
| Work | At least one real case with screenshot and metric |
| Legal | Privacy and Terms text reviewed by a professional |
| Domain | Confirm conclaveai.com as the live domain |

## 7. Checklist, paste-ready prompt and Flow prompts

### Acceptance checklist

- [ ] Home has 11 sections or fewer and is under 8,000px at 1440 wide.
- [ ] No brick robot appears anywhere; no faces on crew glyphs.
- [ ] Studio shows Agents, Automations, ERP and CRM, Apps, Platforms; no CMS card.
- [ ] Demos has only Aria and the calculator visible; no demo phone line.
- [ ] Receipts table, Stack and Guild sections are off home.
- [ ] StudMark and all seven StudGlyphs render from `patterns.ts`, with reduced-motion fallback.
- [ ] Home LCP under 2.5s on a throttled mid phone.
- [ ] Every placeholder is either filled or its section hidden.
- [ ] Metadata, JSON-LD and sitemap pass a Rich Results check.
- [ ] Review pack rebuilt and re-read; no new broken layouts on mobile (390).

### Paste-ready prompt for Claude Code

```
You are updating the Conclave AI Next.js site from v2 to v3. Read this spec fully before editing. Work in small commits and rebuild the review pack at the end.

Goals:
1. Shorten the home page to 11 sections (see spec section 2). Move Receipts, Stack and Scale, Guild, Manifesto and the home Demos section off home; hide the Work section until a real case exists.
2. Replace the Studio "Websites with CMS" card with ERP and CRM, and add Automations. Cards: Agents, Automations, ERP and CRM, Apps, Platforms. Add sub-pages /studio/automations, /studio/erp-crm, /studio/apps, /studio/platforms and keep /studio/agents. Fold the old CMS content into /studio/apps.
3. Clean the Demos page: keep Talk to Aria and the Missed-call calculator; remove Call our demo line and Prefer to talk to a person; hide Convene and the wizard behind a flag.
4. Replace the brick-robot mascots with the stud system in section 4: create lib/studs/patterns.ts, components StudGlyph, StudMark and StudCrew, and the useStudAssemble hook. Rebuild the hero scene, Built-for tiles (4), Crew page and favicon from them. Delete the old robot SVGs.
5. Apply the motion, performance and accessibility rules in section 5.
6. Apply the SEO and content rules in section 6. Never invent numbers, logos or quotes; hide sections that still hold placeholders.

Constraints: keep the palette, fonts, flat style and one-primary-action-per-section rule. Do not add gradients or heavy shadows. After the build, run lint and type checks, then run tools/research/review.mjs to regenerate the review pack and summarise what changed.

Stop and ask me before: changing the domain, adding any third-party script, or publishing.
```

### Google Flow prompts (generate, then send me the files)

1. **Stud C mark, hero:** "Flat vector, lime background (#C8F169), a bold letter C made of two rings of round dark studs with a gap on the right and one olive dot in the centre, minimal, no text."
2. **Stud crew set:** "Flat vector grid of seven rounded square tiles, each with a 7x7 grid of round studs forming a simple pattern: a waveform, concentric ripples, a calendar, a curved arc, rising bars, an arch door, ruled lines. Dark green, ink, violet, chalk and lime palette, no faces, no text."
3. **Hero scatter-to-C loop (video):** "Seamless 6-second loop: scattered round studs fly in and assemble into a letter C on a lime background, smooth easing, flat vector, no text."
4. **ERP and CRM visual:** "Flat vector illustration of a business dashboard built from round studs: a table, a chart and a calendar, lime and violet palette, minimal, no text."
5. **Automations visual:** "Flat vector diagram of stud nodes connected by lines flowing left to right, one lime node lit, dark green background, no text."
6. **Email header and social post:** "Wide flat vector banner of a row of seven stud patterns on dark green with lime accents, minimal, no text."
