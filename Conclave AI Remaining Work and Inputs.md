# Conclave AI: what is left and what I need from you

Updated 23 Oct 2026, after Change Spec v3. Repo: `C:\code\concave-ai` (nothing pushed yet: no remote). Section 1 is what only you can give me. Section 2 is what is still open on my side. Section 3 is what is done. The v3 acceptance checklist and every change are in `docs/v3-change-log.md`.

## 1. What I need from you

### A. First (small, unblocks a lot)

| # | What | Why | Blocks |
| --- | --- | --- | --- |
| 1 | GitHub (or other) **repo URL**, empty | No remote exists, so nothing is pushed | Push, Vercel deploy |
| 2 | **Domain**: confirm `conclaveai.com` as live | One line in `lib/site.ts`; the spec says confirm before I change anything | Email address, SEO, deploy |
| 3 | **Your verdict on the stud system** (`/crew`, the hero, the favicon) | It replaced the brick robots; tell me what is still off | Stickers, social art |

### B. Keys and accounts (I will not guess these). Put them in `.env.local` and `backend/.env`; never paste them in chat

| Item | Switches on |
| --- | --- |
| Supabase URL, anon key, service-role key | Leads, receipts and (if the flag is on) the leaderboard go to Supabase instead of local files |
| Resend key and a verified sender domain | The contact form and the closing "request a call" email you and the visitor; the newsletter |
| OpenAI key | Aria answers with the real model (and in Arabic and Urdu) instead of demo mode |
| Cal.com link (`NEXT_PUBLIC_CAL_LINK`) | The closing block and Contact point at your live calendar |
| Vapi or Retell keys | Phone-quality voice (the browser mic works without it) |
| Vercel and Railway (or Render) access | Deploy (`docs/DEPLOY.md`) |
| Google Search Console and Bing Webmaster | Submit the sitemap (your accounts) |

### C. Real content (the spec's open placeholders; I will not make up any of it)

| Item | Where it goes | Until then |
| --- | --- | --- |
| **Team**: photos and a one-line story for both founders | About (`team` array in `app/about/page.tsx`) | The block is hidden |
| **WhatsApp number** and **reply time** | Contact (`NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_REPLY_TIME`) | Not shown |
| **"From" prices** for Pilot, Build, Retainer and the Studio offers | Home, Pricing, Studio (`from` in `components/home/sections.tsx`) | "Scoped on a call" |
| **For each of Bazar Flow, CodeNexus AI, ScaleNexus AI, Task Whisper**: confirm or correct what I labelled (type, stack, role), one line on what it does, a screenshot (drop `public/work/<slug>.png`), and one real metric if there is one | Work, home, case pages (`lib/projects.ts`) | Cards show the name, my working labels and a stud glyph; no metric |
| **Legal text**: Privacy and Terms, reviewed by a professional | `/privacy`, `/terms` | Placeholder text, noindexed |
| **Social profile URLs** | Footer and the `sameAs` in structured data | Not shown |
| **Testimonials and logos**, in writing | Home, Work | None shown |
| **Receipts numbers**, real and sourced | Supabase `receipts` table (they appear on `/receipts` automatically) | The method table |

### D. Please confirm these are true (they sit on the site as promises)

1. "Live in 14 days. Fixed price. Hear it first." and the 14-day pilot. Audit 2 days, Build 7 to 10 days, Run weekly.
2. Languages: English, Arabic and Urdu.
3. "You own the code", "No lock-in", "Data stays yours".
4. Security page: no model training on customers' data, call recording off unless the client turns it on, subprocessors approved by the client, no certification claimed. (The spec also says: do not claim health-privacy compliance until reviewed by a professional. The site does not.)
5. Karachi, serving the US, Gulf and Europe.
6. The comparison tables on `/compare` and `/pricing` (typical cases, no company named).
7. Trademark and name check for "Conclave AI".
8. The spec says not to use the collaborator's med-spa product name in public copy without written permission. The site uses only the generic "med spas" and names no collaborator or client.

### E. Flow-generated assets

The six prompts from the spec are in `docs/google-flow-prompts.md` ("Revision 4"): stud C hero, stud crew set, scatter-to-C loop video, ERP and CRM visual, automations visual, email and social banner. Send the files back and I will wire them in.

## 2. What is still open on my side

| Item | State | Waiting on |
| --- | --- | --- |
| Aria on the **live AI model** | Code written (OpenAI Agents SDK with availability and booking tools). **Never run against a real key** | OpenAI key |
| **Phone-quality voice** and **demo phone line** | The line was removed from Demos per the spec. Vapi or Retell not added | Keys and a number |
| **Calendar booking** | The closing block and Contact switch to Cal.com when the link is set | Cal.com link |
| Hero **"settle into the Aria card"** on scroll | Not built. The hero is held 300px while the C splits into the seven tiles, then scrolls on | Your call |
| **Convene game and the wizard** | Built and tested, hidden behind `NEXT_PUBLIC_SHOW_EXTRA_DEMOS=1` | Polish, then flip the flag |
| **Rich Results check** | Structure verified by script; Google's own tool needs the live URL | Deploy |
| **Cross-browser pass** (Safari, Firefox) | Chromium only so far | Nothing |
| **Deploy** | Guide and `Procfile` written; nothing deployed | Accounts, domain |

## 3. Done

- **v3** (see `docs/v3-change-log.md`): 11-section home (7,969px with the hero hold), Systems in place of Studio/CMS, five studio sub-pages, clean Demos, your four projects on Work and home, Crew page, the stud system (`StudGlyph`, `StudMark`, `StudCrew`, the hero assembly), favicon and Apple icon from the stud C, per-page share images, breadcrumb, Service, FAQ and Article data, noindex on placeholder pages.
- **Working features** (all work with no keys and say when they are in demo or file mode): contact form, closing "request a call", newsletter, Aria demo (chat, browser voice, language switch, latency, transcript), missed-call calculator.
- **Backend** (`backend/`, 11 tests): `/leads`, `/subscribe`, `/scores`, `/aria/chat`, `/health`; Supabase when configured, local files otherwise.
- **Quality:** WCAG A and AA clean on all 33 pages, no broken links, no horizontal overflow at 1440, 390 and 360, LCP 1.5s on a throttled phone, CLS 0, SEO structure checks, 22 motion checks, 16 end-to-end checks.
- **Re-run the checks** (in `tools/research`): `verify.mjs`, `motion-verify.mjs`, `axe.mjs`, `perf.mjs`, `seo.mjs`, `e2e.mjs`, `review.mjs`; `pytest -q` in `backend`.
- **Review pack:** `docs/review` and `docs/conclave-design-review.zip`.

## 4. Known gaps to be honest about

- Anything marked "to be added", "planned" or "soon" is exactly that; no fake numbers, clients, faces or quotes are shown.
- The home Aria window plays scripted example conversations, labelled as examples. The real demo is on `/demos`.
- Example dashboards and mock-ups use sample figures and are labelled "Example".
- Dev servers: stop `next dev` before running `next build`. If dev shows "Jest worker" errors, close other heavy apps (the config already uses worker threads).
