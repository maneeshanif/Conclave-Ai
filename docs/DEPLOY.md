# Deploy guide

Frontend on Vercel, API on Railway (or Render). Nothing here has been deployed yet: it needs your accounts, your domain and your keys.

## 1. Before you start
1. Push the repo (send the remote URL and I will push, or run `git remote add origin <url> && git push -u origin main`).
2. Decide the canonical domain (`conclaveai.com` or `conclave.ai`) and set it in `lib/site.ts` (`site.url`, `site.email`).
3. Run `supabase/schema.sql` in the Supabase SQL editor. Create a public storage bucket named `media`.

## 2. API (Railway or Render)
- Root directory: `backend`. Python 3.11.
- Install: `pip install -r requirements.txt`. Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT` (the `Procfile` has it).
- Environment variables (see `backend/.env.example`): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `FROM_EMAIL` (a sender on a domain you verified in Resend), `NOTIFY_EMAIL`, `OPENAI_API_KEY`, and **`ALLOWED_ORIGINS`** = your site origin, for example `https://conclaveai.com,https://www.conclaveai.com`.
- Check: open `<api-url>/health`. It reports `storage: supabase`, `email: true`, `aria: ai` once the keys are in.
- The rate limiter is in memory, which is right for one instance. If you scale to several, move it to Redis.

## 3. Frontend (Vercel)
- Framework: Next.js. Root directory: the repo root. Build: `npm run build`.
- Environment variables: `NEXT_PUBLIC_API_URL` = the API URL above, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_CAL_LINK`.
- Add the domain, and redirect the other one to it.

## 4. After it is live
- Submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Send a test message through the contact form and check the Supabase `leads` table and your inbox.
- Run `node axe.mjs`, `node verify.mjs` and `node motion-verify.mjs` in `tools/research` against a build, and `node e2e.mjs <web-url> <api-url>` against the running site.

## Local development
- Frontend: `npm run dev -- -p 3001`. API: `cd backend && .venv\Scripts\python -m uvicorn app.main:app --port 8010`.
- Do not run `npm run build` while `npm run dev` is running; stop dev first.
- If dev shows "Jest worker encountered 2 child process exceptions" the machine ran short of memory. `next.config.ts` already runs the PostCSS/Tailwind pool in worker threads, which uses less. Close other heavy apps and restart dev.
