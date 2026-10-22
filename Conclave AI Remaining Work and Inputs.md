# Conclave AI: what is left and what I need from you

Updated 22 Oct 2026. Repo: `C:\code\concave-ai` (nothing pushed yet: no remote). Section 1 is what only you can give me. Section 2 is what is still open on my side. Section 3 is what is done.

## 1. What I need from you

### A. First (small, unblocks a lot)

| # | What | Why | Blocks |
| --- | --- | --- | --- |
| 1 | GitHub (or other) **repo URL**, empty | No remote exists, so nothing is pushed | Push, Vercel deploy |
| 2 | **Domain**: `conclaveai.com` or `conclave.ai`? Which is canonical, which redirects? | One line in `lib/site.ts`, currently `hello@conclaveai.com` | Email address, SEO, deploy |
| 3 | **Verdict on the Brick Crew** (see `/crew`, now glossy with moods): keep, change, add | You rated v1 5/10; v2 adds gloss, hands and feet, faces, moods. Tell me what is still off | Stickers, Flow prompts |

### B. Keys and accounts (I will not guess these). Put them in `.env.local` and `backend/.env`; never paste them in chat

| Item | Switches on |
| --- | --- |
| Supabase URL, anon key, service-role key | Leads, leaderboard and receipts go to Supabase instead of local files |
| Resend key and a verified sender domain | The contact form emails you and the visitor; the newsletter |
| OpenAI key | Aria answers with the real model (and in Arabic and Urdu) instead of demo mode |
| Vapi or Retell public key and assistant ID | Phone-quality voice (the browser mic works without it) |
| Cal.com link | The booking link on Contact |
| A phone number | "Call our demo line" |
| Vercel and Railway (or Render) access | Deploy (`docs/DEPLOY.md` has the steps) |
| Google Search Console and Bing Webmaster | Submit the sitemap (your accounts) |

### C. Real content (I will not make up numbers, names or prices)

| Item | Where it goes |
| --- | --- |
| **"From" prices** for Pilot, Build, Retainer and the Studio tiers | Pricing, Studio, home. Today it says "Scoped on a call" |
| **Real numbers** for a stats band (calls handled in demos, build hours, uptime) | Home, Receipts (rows go in the Supabase `receipts` table and appear automatically) |
| **Case studies**: for each project a screenshot or short loop, one metric, problem, solution, what you would do differently | Work, Work detail |
| **Team**: names, photos, one-line story | About |
| **WhatsApp, time zone, reply-time promise** | Contact, About |
| **Social profile URLs** (LinkedIn, GitHub, X, YouTube, Product Hunt, Crunchbase, Clutch, Google Business Profile) | Footer, structured data |
| **Legal text** (Privacy, Terms, DPA if you offer one) | `/privacy`, `/terms` |
| **Testimonials and logos**, with permission | Home, Work |
| **Careers roles; open-source repos to publish** | Join |
| **Notes**: who writes them and the next topics. One is live (missed-call math); four are planned | Notes |

### D. Please confirm these are true (they sit on the site as promises)

1. "Live in 14 days. Fixed price. Hear it first." and the 14-day pilot.
2. Audit 2 days, Build 7 to 10 days, Run weekly.
3. Languages: English, Arabic and Urdu.
4. "You own the code", "No lock-in", "Data stays yours".
5. Security page: no model training on customers' data, call recording off unless the client turns it on, subprocessors approved by the client, no certification claimed.
6. Karachi, serving the US, Gulf and Europe.
7. The comparison table on `/compare` (typical cases, no company named).
8. Trademark and name check for "Conclave AI" (your task, per the plan).

### E. Flow-generated assets

Prompts are in `docs/google-flow-prompts.md`: ten original assets plus six Brick Crew prompts (crew sheet, snap-into-C loop, call to calendar, founders, brick badges, sticker pack). Send the files back and I will wire them in.

## 2. What is still open on my side

| Item | State | Waiting on |
| --- | --- | --- |
| Aria on the **live AI model** | Code path written (OpenAI Agents SDK with availability and booking tools). **Not yet tried against a real key** | OpenAI key |
| **Phone-quality voice** (Vapi or Retell) | Browser speech works now. Vendor SDK not added | Vapi or Retell keys |
| **Calendar booking** on Contact | Link slot ready | Cal.com link |
| **Hero in Three.js** | Skipped on purpose: the SVG crew scene is lighter and reads better. Say so if you still want a WebGL scene | Your call |
| **Hero Flow loop** in place of the SVG scene | Not started | Flow files |
| **Crew assembling into the C on scroll**, sticker pack, more moods | Not started | Your verdict on the crew |
| **Per-page social images** | One site-wide share card done; per-page not done | Nothing, low priority |
| **Deploy** | Guide and `Procfile` written, nothing deployed | Accounts, domain |
| **Performance pass** (Lighthouse, image weights, bundle) | Not done | Nothing |
| **Cross-browser pass** (Safari, Firefox) | Chromium only so far | Nothing |

## 3. Done

- **Foundation:** Next.js 16, Tailwind v4, GSAP, Lenis, zustand; light lemlist-style design; palette and type system; logo pack.
- **Motion** (`docs/motion-implementation.md`): lemlist's measured transitions, sticky service stack, intro, reveals, mock-up playback, accordion, ring cursor, crew blink and drift; reduced-motion safe.
- **Pages:** Home, Services (+5 detail pages with call-flow diagrams), Studio, Industries (+6, each with an example dashboard), Work (filters) and case-study pages (architecture diagram), Demos, About, Pricing, Contact, Join, Security, Compare, Receipts (live from Supabase when rows exist), Notes (+1 post), Roadmap, Crew, Privacy, Terms, 404 and error pages with crew moods.
- **Working features** (all work with no keys; they say when they are in demo or file mode):
  - Contact form: honeypot, speed trap, consent, rate limit, server validation.
  - Newsletter signup.
  - Aria demo: chat, browser voice in and out, English, Arabic and Urdu recognition, latency readout, live transcript.
  - Missed-call calculator, with the working shown.
  - Convene game: 60 seconds, keyboard 1 to 7, streaks, leaderboard with an impossible-score check.
  - Four-question agent wizard, and the three-question agent picker on Services.
- **Backend** (`backend/`, 11 tests passing): `/leads`, `/subscribe`, `/scores`, `/aria/chat`, `/health`. Supabase when configured, local files otherwise.
- **Brick Crew v2** (`/crew`, `docs/mascot-research.md`): seven glossy toy-brick characters with blink, talk and four moods.
- **SEO:** titles with "Conclave AI", canonical URLs, Organization, WebSite, FAQ, Service and Article structured data, sitemap, robots, share card.
- **Fixes:** dev crash (Jest worker / EPIPE) and hydration warnings; accessibility (WCAG A and AA clean on all 34 routes); no broken internal links.
- **Checks you can re-run** (in `tools/research`): `node verify.mjs` (overflow and errors, 3 widths), `node motion-verify.mjs` (22), `node axe.mjs` (accessibility and links), `node e2e.mjs` (forms, Aria, calculator, game, wizard, newsletter, against the running servers), and `pytest -q` in `backend`.
- **Review pack:** `docs/review` and `docs/conclave-design-review.zip` (rebuild with `node review.mjs`).

## 4. Known gaps to be honest about

- Everything marked "to be added", "being built", "soon" or "planned" is exactly that. No fake numbers, clients, faces or quotes are shown.
- The home Aria window plays scripted example conversations, labelled as examples. The real demo is on `/demos`.
- Pricing, receipts and the stats band show their method, not figures, until you send real ones.
- Example dashboards and mock-ups use sample figures and are labelled "Example".
