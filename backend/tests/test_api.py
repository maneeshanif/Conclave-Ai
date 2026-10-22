import time

import pytest
from fastapi.testclient import TestClient

from app import aria, config, guards, main, store


@pytest.fixture(autouse=True)
def isolated(tmp_path, monkeypatch):
    """Every test writes to a temp folder, uses file storage and starts with fresh rate limits."""
    monkeypatch.setattr(store, "DATA_DIR", tmp_path)
    monkeypatch.setattr(config, "SUPABASE_URL", "")
    monkeypatch.setattr(config, "RESEND_API_KEY", "")
    monkeypatch.setattr(config, "OPENAI_API_KEY", "")
    for limiter in (main.lead_limit, main.subscribe_limit, main.score_limit, main.chat_limit):
        limiter.hits.clear()
    return tmp_path


client = TestClient(main.app)
GOOD = {"name": "Sam", "email": "sam@example.com", "message": "Hello", "consent": True, "opened_at": (time.time() - 30) * 1000}


def test_health_reports_fallbacks():
    body = client.get("/health").json()
    assert body["storage"] == "file" and body["aria"] == "demo"


def test_lead_is_saved():
    assert client.post("/leads", json=GOOD).status_code == 200
    rows = store.read_all("leads")
    assert len(rows) == 1 and rows[0]["email"] == "sam@example.com"


def test_lead_needs_consent_and_valid_email():
    assert client.post("/leads", json={**GOOD, "consent": False}).status_code == 422
    assert client.post("/leads", json={**GOOD, "email": "nope"}).status_code == 422


def test_honeypot_and_speed_trap_store_nothing_but_look_successful():
    assert client.post("/leads", json={**GOOD, "website": "http://spam"}).status_code == 200
    assert client.post("/leads", json={**GOOD, "opened_at": time.time() * 1000}).status_code == 200
    assert store.read_all("leads") == []


def test_lead_rate_limit():
    codes = [client.post("/leads", json=GOOD).status_code for _ in range(7)]
    assert codes[:5] == [200] * 5 and codes[5] == 429


def test_newsletter():
    assert client.post("/subscribe", json={"email": "a@b.co"}).status_code == 200
    assert client.post("/subscribe", json={"email": "bot@b.co", "website": "x"}).status_code == 200
    assert [r["email"] for r in store.read_all("subscribers")] == ["a@b.co"]


def test_scores_sorted_and_sanity_checked():
    assert client.post("/scores", json={"handle": "ana", "score": 40, "seconds": 60}).status_code == 200
    assert client.post("/scores", json={"handle": "bo", "score": 90, "seconds": 60}).status_code == 200
    assert client.post("/scores", json={"handle": "cheat", "score": 2000, "seconds": 60}).status_code == 422
    assert client.post("/scores", json={"handle": "fast", "score": 5, "seconds": 3}).status_code == 422
    assert [s["handle"] for s in client.get("/scores").json()] == ["bo", "ana"]


def test_handle_is_cleaned():
    client.post("/scores", json={"handle": "<b>ana</b>", "score": 10, "seconds": 60})
    handle = client.get("/scores").json()[0]["handle"]
    assert "<" not in handle and ">" not in handle and handle == "banab"


def test_aria_demo_flow_books_a_sample_slot_and_says_it_is_a_demo():
    r = client.post("/aria/chat", json={"messages": [{"role": "user", "content": "Can I book a check-up?"}]}).json()
    assert r["mode"] == "demo" and "Which suits you" in r["reply"]
    msgs = [{"role": "user", "content": "book a check-up"}, {"role": "assistant", "content": r["reply"]}, {"role": "user", "content": "Thursday at 10:30 please"}]
    done = client.post("/aria/chat", json={"messages": msgs}).json()
    assert "Booked for Thursday at 10:30" in done["reply"] and "demo" in done["reply"]


def test_aria_hands_over_and_does_not_invent_prices():
    assert "pass this to a person" in aria.demo_reply([{"role": "user", "content": "I want to talk to a human"}])
    assert "can't quote real prices" in aria.demo_reply([{"role": "user", "content": "how much does it cost"}])


def test_rate_limiter_unit():
    limiter = guards.RateLimit(2, 60)

    class Req:
        headers: dict = {}
        client = type("C", (), {"host": "1.2.3.4"})()
        url = type("U", (), {"path": "/x"})()

    limiter(Req())  # type: ignore[arg-type]
    limiter(Req())  # type: ignore[arg-type]
    with pytest.raises(Exception):
        limiter(Req())  # type: ignore[arg-type]
