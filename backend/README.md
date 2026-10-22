# Backend

```
python -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8010
```

Runs on port 8010 (8000 is often taken by other local apps).

Planned routes (Step 5): `POST /leads`, `POST /demo/session`, `GET /scores`, `POST /scores`.
