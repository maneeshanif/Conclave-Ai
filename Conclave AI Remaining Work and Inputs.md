# Conclave AI: what is left and what I need from you

Updated 22 Oct 2026. Repo: `C:\code\concave-ai` (3 commits, nothing pushed yet). Read this top to bottom: section 1 is what you must send, section 2 is what I build next, section 3 is what is already done.

## 1. What I need from you (blocks the items in the right column)

### A. Needed first (small, unblocks a lot)

| # | What | Why | Blocks |
| --- | --- | --- | --- |
| 1 | GitHub (or other) **repo URL**, empty | There is no remote, so nothing is pushed. Send it and I add `origin` and push `main` | Push, Vercel deploy |
| 2 | **Domain**: do you own `conclaveai.com` or `conclave.ai`? Which is canonical, which redirects? | Set in one line (`lib/site.ts`), currently `hello@conclaveai.com`. Also email address and all SEO tags | Contact page, JSON-LD, sitemap, deploy |
| 3 | **Approve the Brick Crew** (see `/crew`): roster, names, jobs, look. Say keep, change or add | New mascot system replaces the round dots. Names and personalities feed copy and the sticker pack | Stickers, Flow prompts, per-section art |

### B. Keys and accounts (I will not invent or guess these)

| Item | Needed for |
| --- | --- |
| Supabase project URL, anon key, service-role key | Leads, leaderboard, projects, receipts |
| Resend API key and a verified sending domain | Contact form email, weekly reports |
| Vapi (or Retell) public key and an assistant ID, plus OpenAI key | The live Aria voice demo |
| Cal.com link or username | Booking widget on the closing CTA and Contact |
| A phone number (Twilio or the Vapi number) | The "Call our demo line" card |
| Vercel and Railway (or Render) access, or tell me to give you steps | Deploy |
| Google Search Console and Bing Webmaster verification | SEO: sitemap submission (your accounts) |

Put keys in `.env.local` (frontend) and `backend/.env`. Both are gitignored. Never paste keys in chat.

### C. Real content (I will not make up numbers, names or prices)

| Item | Where it goes | Notes |
| --- | --- | --- |
| **Prices**: "from" price for Pilot, Build, Retainer, plus Studio tiers | Pricing, Studio, home | Today it says "Scoped on a call". The plan wants "from" prices |
| **Real numbers** for a stats band: calls handled in demos, build hours, uptime | Home Proof, Receipts | Real only. Until then the page shows the method |
| **Case studies**: for each of the 3 projects: screenshots or short loop, one metric, stack, problem and solution, what you would do differently | Work, Work detail | Order the plan wants: voice agent, MedSpa site, platform build |
| **Team**: names, photos, one-line story, roles | About | Faces help trust more than anything else here |
| **WhatsApp number, time zone, reply-time promise** | Contact, About | Currently "To be added" |
| **Social profile URLs**: LinkedIn, GitHub, X, YouTube, Product Hunt, Crunchbase, Clutch, Google Business Profile | Footer, JSON-LD `sameAs` | Same name and logo on all of them |
| **Legal text**: Privacy, Terms (and a DPA if you offer one) | `/privacy`, `/terms` | Needs your lawyer or your chosen template. I will not draft legal claims |
| **Testimonials and logos**, with permission | Home, Work | None until a client agrees |
| **Careers**: any open roles; **open-source**: which repos you will publish | Join | Currently "none yet" |
| **Notes**: who writes the posts (the plan says two a week for 8 weeks) and the first topics | Notes | Each needs a real number or diagram |

### D. Please confirm these statements are true for your business

I wrote them from your plan. They sit on the site as promises, so confirm or tell me to soften them:

1. "Live in 14 days. Fixed price. Hear it first." and the 14-day pilot.
2. Audit takes 2 days, Build 7 to 10 days, Run is weekly.
3. Languages: English, Arabic and Urdu.
4. "You own the code", "No lock-in", "Data stays yours".
5. Security page: no model training on customers' data, call recording off unless the client turns it on, subprocessors listed and approved by the client, no certification claimed.
6. Location: Karachi, serving the US, Gulf and Europe.
7. The comparison table on `/compare` (typical cases, no company named).
8. Trademark and name check for "Conclave AI" (the plan marks this as your task).

### E. Flow-generated assets (send files back)

All prompts are in `docs/google-flow-prompts.md`: ten original assets (hero loop, five service videos, demo backdrop, closing CTA, story, receptionist) plus **six new Brick Crew prompts** (crew sheet, snap-into-C loop, call to calendar, founders, brick badges, sticker pack). Flat style, palette only.

## 2. What I build next (in order)

| # | Item | Needs from you | Size |
| --- | --- | --- | --- |
| 1 | **Missed-call calculator** (no backend needed) | Nothing | Small |
| 2 | **Contact form end to end**: FastAPI endpoint, Supabase `leads`, Resend email, honeypot, rate limit, Cal.com widget | Keys A.2 to A.4, domain | Medium |
| 3 | **Aria live voice demo** with a text fallback, language switch, latency readout and a filling transcript | Vapi or Retell and OpenAI keys | Large |
| 4 | **Convene game + leaderboard** (Supabase), feeds the Join page | Supabase | Medium |
| 5 | **"Build your own agent" wizard** (4 questions, ends in a booking) | Cal.com | Small |
| 6 | **Work detail rebuild**: real hero loop, problem, solution, architecture diagram, results, "what we'd do differently" | Case-study content (C) | Medium |
| 7 | **Per-service call-flow diagrams** and per-industry mock dashboards | Nothing | Medium |
| 8 | **Brick Crew v2**: blink and talk expressions, stickers, a mascot in each empty and error state, crew assembling into the C on scroll | Approval (A.3), Flow assets | Medium |
| 9 | **Receipts ledger live** from Supabase, build-log entries, bounty board | Real numbers | Small |
| 10 | **Notes** as MDX posts, newsletter signup, Roadmap page | Post content, Resend | Medium |
| 11 | **Hero upgrade**: the one Three.js scene from the PRD, or the Flow loop in place of the SVG scene | Flow loop | Medium |
| 12 | **SEO pass 2**: per-page OG images, Service and Article schema, internal-link audit | Domain, social URLs | Small |
| 13 | **Step 6 QA**: accessibility audit (axe), performance (Lighthouse), cross-browser, the break and interface-review skills, motion review | Nothing | Medium |
| 14 | **Deploy**: Vercel (frontend) and Railway or Render (FastAPI), env, domain, redirects | Accounts, domain | Small |

## 3. Already done

- **Foundation:** Next.js 16 App Router, Tailwind v4, GSAP, Lenis, zustand, FastAPI skeleton (port 8010), Supabase schema, logo pack in use.
- **Design:** light lemlist-style redesign, palette and type system, contrast fixes, design-system doc.
- **Motion** (`docs/motion-implementation.md`): lemlist's measured transitions, sticky service card stack, GSAP intro, reveals, mock-up playback, manifesto word brightening, accordion, ring cursor, reduced-motion safe. 22 automated checks pass.
- **Upgrade plan** (build list items 3 to 7): Studio, Join, Security, Compare, Receipts, Notes, five service pages, six industry pages, Company dropdown, richer footer, trust strip, stack-and-scale diagram, join-the-guild, agent picker, FAQ, SEO basics (titles, canonical, JSON-LD, sitemap, robots), mobile fixes.
- **Brick Crew** (`/crew`, `docs/mascot-research.md`): seven toy-brick characters from one kit, used in the hero (snap in, drift, lean from the pointer), Built-for, Manifesto, About and industry pages.
- **Review pack**: `docs/review` and `docs/conclave-design-review.zip` (rebuild with `node review.mjs` in `tools/research`).
- **Checks:** 60-page overflow sweep at 1440, 390 and 360 wide, plus motion checks. Commands: `node verify.mjs`, `node motion-verify.mjs` in `tools/research`.

## 4. Known gaps to be honest about

- Everything marked "to be added", "being built", "soon" or "planned" on the site is exactly that. No fake numbers, clients, faces or quotes are shown.
- The Aria window on the home page plays scripted example conversations, labelled as examples.
- The pricing, receipts and stats sections show their method, not figures, until you send real ones.
