# Conclave AI Website PRD

Oct 22, 2026 · @Mohummad Anees

## Overview

This is the startup website of Conclave AI, an early-stage startup that delivers fixed-scope services now and turns repeated work into a product later. The site has one job: turn a visiting clinic owner or founder into a booked call within two minutes. It does that by letting them hear a live agent, see real projects, and book without friction.

- **Audience:** owners of clinics and local businesses in the US, Gulf and Europe, plus startups that need agents or full-stack builds.
- **Offer shown:** voice agents, AI agents, workflow automation, and full-stack web apps.
- **Layout reference (about 90%):** lemlist.com. I opened it in the browser: a floating pill navigation, a full-bleed hero image with the headline at bottom left, a live product demo directly under the hero, then numbered feature blocks with a small eyebrow label above a centred headline.
- **Style reference (about 10%):** the Willows preview. It uses an oversized wide uppercase hero with small image pills inside the headline, a brush-stroke cursor that turns into a circular "LEARN MORE" button, paragraphs whose words brighten as you scroll, and a skewed repeating word band.
- **Rule:** use both only as pattern references. No copied text, images or code.
- **Success measure:** visitors who start the voice demo, and visitors who book a call.

## Colour and type

The new palette keeps your lime and forest-black logo colours, drops the warm paper and coral that felt off, and adds one cool violet so the lime has a partner. All colours are flat, with no gradients.

| Token | Hex | Use |
| --- | --- | --- |
| Ink | #0B1512 | Main background |
| Moss | #14302A | Cards and raised surfaces |
| Chalk | #F1F4EC | Light sections and primary text on dark |
| Steel | #8FA39A | Secondary text and borders |
| Lime | #C8F169 | Brand, buttons, highlights |
| Violet | #7C5CFF | Voice waveform, graphics, hover states |
| Lilac | #CFC4FF | Violet text on dark backgrounds |

**Proportions:** about 70% Ink and Moss, 20% Chalk, 8% Lime, 2% Violet. Lime marks actions, and violet marks anything that is live or speaking.

**Contrast:** Violet on Ink is fine for graphics and large text but too low for small text, so use Lilac for small violet text. Run a WCAG AA check on every pair before building.

**Type:**

- **Display:** Syne, 700 to 800, oversized and uppercase for the hero and section words (the Willows influence).
- **Body and interface:** Outfit, to match the logo.
- **Labels and numbers:** IBM Plex Mono.

If you would rather try a warmer pairing, swap Violet for an ember orange (#FF6B35) and keep everything else.

## Stack and architecture

One Next.js frontend talks to one FastAPI backend, and Supabase holds all data and files. I assumed your "cloud storage and cloud database" means Supabase for both, and that "OpenAI Agent SDK" means the OpenAI Agents SDK.

| Layer | Tool | Job |
| --- | --- | --- |
| Framework | Next.js (App Router), TypeScript | Routing, SEO, server rendering |
| Styling | Tailwind CSS, shadcn/ui | Design tokens and accessible components |
| State | Zustand | Menu, cursor, audio and demo state |
| Motion | GSAP with ScrollTrigger, Lenis | Scroll storytelling and smooth scroll |
| 3D | Three.js with React Three Fiber | One hero scene only |
| API | FastAPI | Contact form, demo sessions, leaderboard |
| Database and files | Supabase (Postgres, Storage) | Projects, leads, scores, videos, images |
| Agents | OpenAI Agents SDK | The website's own demo agent |
| Voice | Vapi or Retell web SDK | Live "talk to Aria" widget |
| Email and booking | Resend, Cal.com | Notifications and calls |
| Hosting | Vercel (frontend), Railway or Render (FastAPI) | Deployment |

**Decisions:**

- Skip a separate CMS such as Sanity. Projects live in a Supabase table, so there is one source of truth.
- Use Three.js for one hero scene only. Everything else stays 2D so the site stays fast.
- Respect prefers-reduced-motion everywhere, and turn off Lenis and the 3D scene on phones if frame rate drops.

## Pages and navbar

Launch with eight pages and a navbar of four links plus one button.

**Navbar:** the logo on the left, then Services, Work, Demos and About, and a lime "Book a call" button on the right. On desktop it is a floating pill like lemlist's. On phones it becomes a full-screen menu. A Cmd+K command palette (shadcn Command) jumps to any page.

| Page | Route | Purpose |
| --- | --- | --- |
| Home | / | The full story and the main conversion |
| Services | /services | Voice agents, AI agents, automation, full-stack builds, with anchors |
| Work | /work | Filterable grid of projects |
| Project detail | /work/\[slug\] | One case study per project |
| Demos | /demos | Live voice agent and the mini game |
| About | /about | Team, approach and the "agents, convened" idea |
| Pricing | /pricing | Pilot, Build and Retainer packages |
| Contact | /contact | Form, booking and direct channels |

**Footer:** Privacy, Terms, social links and the contact email. Add a blog at /blog only once you have three posts ready.

## Home page sections

Twelve sections, in this order. Each has one job, and each visual must earn its place.

| # | Section | Content | Visual | Motion |
| --- | --- | --- | --- | --- |
| 1 | Hero | Oversized uppercase headline, one line of support, "Book a call" and "Hear a live agent" | One Three.js scene: agent nodes converge into the "C" mark; small image pills inside the headline | Headline letters rise in; scene reacts to the cursor |
| 2 | Live agent | "Talk to Aria" panel with a waveform and transcript, right under the hero | Waveform in violet | Waveform responds to real audio |
| 3 | Proof | Three real numbers and the tool logos you use | Plain stat row | Numbers count up on scroll |
| 4 | Services 01 to 05 | One job per block: voice, follow-up, booking, reactivation, reporting | A short screen recording per service | Sticky left column, right media swaps as you scroll |
| 5 | Work | 4 to 6 projects, outcome first | Looping project videos | Pinned horizontal reel; cursor becomes a "VIEW" circle |
| 6 | Manifesto | Two sentences on why "agents, convened" | Text only | Words brighten one by one on scroll |
| 7 | Process | Audit, Build, Run as 001 to 003 | Large numerals | Lines draw across on scroll |
| 8 | Demos teaser | Voice agent and the mini game | Two large tiles | Hover reveals a short clip |
| 9 | Pricing | Pilot, Build, Retainer | Three flat cards | Hover emphasis only |
| 10 | FAQ | Five objections answered | None | Smooth accordion |
| 11 | Final call to action | One headline and one button | Large type on lime | Words reveal on enter |
| 12 | Footer | Links, contact, and the "AGENTS, CONVENED" line | The mark | A skewed repeating word band |

**Rules for every section:** flat colour only, one primary action, real content or an honest placeholder, and no decoration that does not explain something.

## Projects showcase and contact page

**Showcasing sub projects.** Pick 4 to 6 builds you can show openly, such as Bazar Flow, CodeNexus AI, ScaleNexus AI and Task Whisper. Keep the med spa project off the public site unless Nimra agrees. Each project appears in two places.

1. **Card on /work:** a looping 6 to 8 second screen recording, the title, a one-line outcome, stack chips and your role.
2. **Case page at /work/\[slug\]:** a hero video, the problem, the solution, a simple architecture sketch, the stack, results (real numbers only), a "try it" link if a demo exists, and a link to the next project.

Store each project as one row in a Supabase `projects` table: slug, title, summary, tags, stack, cover video URL, gallery, body, results, featured flag and sort order. Videos and images go in Supabase Storage.

**Contact page.** Split layout with a large "LET'S TALK" on the left and the form on the right.

- **Form fields:** name, email, company, what you need (chips: Voice agent, AI agent, Automation, Web app), budget range, and a message.
- **Booking:** a Cal.com embed beside the form, so a visitor can book instead of writing.
- **Direct channels:** hello@ email, WhatsApp (important for Gulf clients), and your time zone with typical reply time.
- **Behind the form:** it posts to FastAPI, which saves the lead in Supabase, sends a Resend email to you and a confirmation to the visitor, and alerts you on Telegram or Slack.
- **Spam control:** a honeypot field and rate limiting, with a CAPTCHA only if spam appears.
- **States:** clear loading, success and error states.

## Standout features

Four things that make the site more than a brochure, each tied to what you sell.

1. **Talk to Aria (voice demo).** Visitors speak to a live agent from the browser using the Vapi or Retell web SDK. Show a live transcript, ask for mic permission clearly, offer a text-chat fallback, and cap calls per visitor to control cost.
2. **"Convene", a 60-second mini game on /demos.** Calls ring in and you drag agent nodes onto them before they go unanswered. It teaches the product in a minute, ends with a "book a call" prompt, and a Supabase leaderboard keeps people coming back.
3. **Missed-call calculator.** Sliders for calls a week and the value of a booking show what missed calls cost. The result captures an email.
4. **Cursor and command palette.** A brush-style ring cursor on desktop only, and Cmd+K navigation for fast jumps.

Build order: contact form first, then the voice demo, then the calculator, then the game last.

## Build prompt for Claude Code

Paste this into Claude Code in an empty repo. It follows the structure of your women-entrepreneurs prompt and uses everything decided above.

```markdown
# ROLE
You are an experienced creative frontend and full-stack team in one agent. Build a premium, award-level startup website for Conclave AI. It must feel built by a senior creative team, NOT generated from a generic SaaS template.

# PRODUCT
Conclave AI is an early-stage AI startup that builds voice agents, AI agents, workflow automation and full-stack apps for clinics, local businesses and startups in the US, Gulf and Europe. Tagline: Agents, convened. The site's one goal is to get visitors to hear a live agent and book a call.

# HARD CONSTRAINTS (check before every step)
1. NO AI slop and no generic SaaS template look.
2. NO gradients anywhere. Flat solid colours only.
3. NO strange or decorative graphics. Every visual must explain something.
4. Avoid glassmorphism, floating blobs, repeated card grids, heavy shadows, needless icons and random animation.
5. Palette (flat): Ink #0B1512, Moss #14302A, Chalk #F1F4EC, Steel #8FA39A, Lime #C8F169, Violet #7C5CFF, Lilac #CFC4FF. Proportions about 70 percent Ink and Moss, 20 Chalk, 8 Lime, 2 Violet. Lime marks actions, violet marks anything live or speaking. Meet WCAG AA on every pair.
6. Type: Syne (display, 700-800, oversized, uppercase), Outfit (body and interface), IBM Plex Mono (labels).
7. Logo: an open-arc C with a centred lime dot, wordmark Conclave with AI in lime. Do not redraw it. I will supply the SVG files.

# STACK (fixed)
Frontend: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Zustand, GSAP with ScrollTrigger, Lenis, Three.js via React Three Fiber (one hero scene only).
Backend: FastAPI. Database and file storage: Supabase (Postgres plus Storage). Agents: OpenAI Agents SDK. Voice: Vapi or Retell web SDK. Email: Resend. Booking: Cal.com. Hosting: Vercel plus Railway or Render.

# STEP 0: SETUP
1. Create the Next.js structure (app/, components/, lib/, hooks/, stores/, styles/, public/) and a separate backend/ folder for FastAPI. Show the tree.
2. Check these skills exist (global or project .claude/skills); if missing, copy them from https://github.com/nimranaz148/divine-group-website/tree/main/.claude/skills: frontend-design, impeccable, taste-skill, redesign-skill, better-ui, better-layout, better-typography, better-colors, better-accessibility, better-writing, better-interface, animate, scroll-experience, lets-scroll, review-animations, nextjs-app-router-patterns, nextjs-best-practices, tailwind-design-system, tailwind-patterns, shadcn, imagegen-frontend-web, brandkit, break, interface-review.
3. Read SKILLS.md, then tell me which skills you will use and why.

# STEP 1: RESEARCH (do not skip)
Use the Playwright MCP server on https://www.lemlist.com/ (about 90 percent of the layout) and https://preview.treethemes.com/elementor/willows/jane/ (about 10 percent of the style). Scroll every section slowly, hover every button, card and nav item, and screenshot each section and state. Note: floating pill nav, full-bleed hero with headline at bottom left, live product demo right under the hero, numbered feature blocks with an eyebrow label, oversized wide hero type with image pills, brush-stroke cursor that becomes a circular LEARN MORE button, scroll-brightening paragraph, skewed repeating word band. Also study 3 to 5 other award-winning GSAP sites. Save findings to docs/motion-research.md. Do not copy any site.

# STEP 2: DESIGN SYSTEM (then stop for my approval)
Show colour tokens with contrast ratios, the type scale, the layout grid and spacing, and the motion system (easing, durations, stagger rules, reduced-motion fallback). Wait for my OK.

# STEP 3: STRUCTURE
Pages: / , /services , /work , /work/[slug] , /demos , /about , /pricing , /contact. Navbar: logo, Services, Work, Demos, About, and a lime Book a call button; floating pill on desktop, full-screen menu on mobile; Cmd+K command palette. Home sections in order: hero, live agent panel, proof, services 01-05, work reel, manifesto, process 001-003, demos teaser, pricing, FAQ, final call to action, footer. Work data comes from a Supabase projects table.

# STEP 4: HERO ASSETS
Write me detailed prompts for images and short videos for Google Flow (flat style, the palette above, no gradients, nothing weird). I will generate them and send them back. For any video I send, extract frames with ffmpeg at the native frame rate (cap 60fps), convert to WebP, and build a canvas image sequence scrubbed by GSAP ScrollTrigger.

# STEP 5: IMPLEMENT
Use GSAP only where it improves storytelling. Build the contact form end to end (FastAPI, Supabase leads table, Resend emails, honeypot and rate limit). Then the Talk to Aria voice demo with a text fallback, then the missed-call calculator, then the Convene mini game with a Supabase leaderboard. Be production quality, responsive, accessible, SEO-friendly, and respect prefers-reduced-motion.

# STEP 6: VERIFY
Screenshot every page at desktop and mobile with Playwright. Check against the hard constraints. Run the break and interface-review skills, fix issues, then show me.

# WORKING STYLE
Work step by step, report briefly after each step, and ask me only when truly blocked.
```

**Google Flow prompts to start with.**

1. "Flat vector illustration, a friendly receptionist agent shown as a simple rounded character with a headset, seated at a desk, solid colours only: deep forest black background #0B1512, lime #C8F169 and violet #7C5CFF accents, no gradients, no shadows, clean shapes, wide format."
2. "Six-second looping video, flat style: small circles (agents) drift in from the edges and settle into an open-arc letter C with a lime dot in the centre, solid colours only, forest black background, no gradients, smooth easing."
3. "Flat vector scene of a phone ringing and a calendar slot turning lime as it is booked, solid colours, forest black background, violet sound-wave lines, no gradients, minimal."
