# Backend (FastAPI)

```
python -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8010
pytest -q
```

Runs on port 8010 (8000 is often taken by other local apps). Interactive docs at `/docs`.

## Works with no keys

| Route | What it does | Without keys | With keys |
| --- | --- | --- | --- |
| `GET /health` | Shows the active modes | | |
| `POST /leads` | Contact form. Honeypot, 2.5s speed trap, 5 per hour per IP, consent required | Saved to `data/leads.jsonl`, email logged | Supabase `leads` row, Resend notification and confirmation |
| `POST /subscribe` | Newsletter signup | `data/subscribers.jsonl` | Supabase `subscribers` |
| `GET/POST /scores` | Convene leaderboard, with a sanity check on score versus time | `data/scores.jsonl` | Supabase `scores` |
| `POST /aria/chat` | The Aria demo | Rules engine in demo mode, says it is a demo | OpenAI Agents SDK with availability and booking tools (needs `OPENAI_API_KEY`) |

`data/` is gitignored. Run the SQL in `../supabase/schema.sql` before switching Supabase on.

The Agents SDK path has not been exercised against a live key yet; if it errors it logs and falls back to demo mode.
