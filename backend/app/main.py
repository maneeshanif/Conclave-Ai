"""Conclave AI API: leads, newsletter, Convene leaderboard and the Aria demo chat."""
import logging
import re
import time
from typing import Annotated, Literal

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, field_validator

from . import aria, config, mailer, store
from .guards import RateLimit

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("conclave.api")

app = FastAPI(title="Conclave AI API", version="0.2.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

lead_limit = RateLimit(5, 3600)
subscribe_limit = RateLimit(5, 3600)
score_limit = RateLimit(20, 3600)
chat_limit = RateLimit(40, 600)


@app.get("/health")
def health() -> dict:
    return {
        "status": "ok",
        "storage": "supabase" if config.SUPABASE_URL and config.SUPABASE_SERVICE_ROLE_KEY else "file",
        "email": bool(config.RESEND_API_KEY),
        "aria": "ai" if config.OPENAI_API_KEY else "demo",
    }


# ---------- leads ----------
class LeadIn(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    email: EmailStr
    company: str | None = Field(default=None, max_length=120)
    needs: list[str] = Field(default_factory=list, max_length=8)
    budget: str | None = Field(default=None, max_length=60)
    message: str | None = Field(default=None, max_length=2000)
    source: str = Field(default="contact", max_length=40)
    consent: bool = False
    # Bot traps. `website` is hidden from people; `opened_at` is when the form appeared (ms since epoch).
    website: str = ""
    opened_at: float | None = None

    @field_validator("needs")
    @classmethod
    def short_needs(cls, v: list[str]) -> list[str]:
        return [n[:60] for n in v]


class Ok(BaseModel):
    ok: bool = True


@app.post("/leads", response_model=Ok)
def create_lead(lead: LeadIn, _: Annotated[None, Depends(lead_limit)]) -> Ok:
    if not lead.consent:
        from fastapi import HTTPException

        raise HTTPException(status_code=422, detail="Please tick the box to agree to be contacted.")
    elapsed = (time.time() * 1000 - lead.opened_at) / 1000 if lead.opened_at else None
    if lead.website.strip() or (elapsed is not None and elapsed < config.MIN_FORM_SECONDS):
        # Looks like a bot. Answer as if it worked so the bot learns nothing, and store nothing.
        log.info("Lead dropped by bot trap (honeypot=%s elapsed=%s)", bool(lead.website.strip()), elapsed)
        return Ok()
    row = {
        "name": lead.name.strip(),
        "email": str(lead.email),
        "company": lead.company,
        "needs": lead.needs,
        "budget": lead.budget,
        "message": lead.message,
        "source": lead.source,
    }
    where = store.insert("leads", row)
    log.info("Lead saved to %s", where)
    mailer.send(config.NOTIFY_EMAIL, f"New enquiry from {lead.name}", mailer.lead_notification(row), reply_to=str(lead.email))
    mailer.send(str(lead.email), "We got your message", mailer.lead_confirmation(lead.name))
    return Ok()


# ---------- newsletter ----------
class SubscribeIn(BaseModel):
    email: EmailStr
    website: str = ""


@app.post("/subscribe", response_model=Ok)
def subscribe(body: SubscribeIn, _: Annotated[None, Depends(subscribe_limit)]) -> Ok:
    if body.website.strip():
        return Ok()
    store.insert("subscribers", {"email": str(body.email)})
    return Ok()


# ---------- Convene leaderboard ----------
class ScoreIn(BaseModel):
    handle: str = Field(min_length=1, max_length=20)
    score: int = Field(ge=0, le=2000)
    seconds: float = Field(ge=0)

    @field_validator("handle")
    @classmethod
    def clean_handle(cls, v: str) -> str:
        v = re.sub(r"[^\w .\-]", "", v, flags=re.UNICODE).strip()
        if not v:
            raise ValueError("handle is empty")
        return v[:20]


@app.get("/scores")
def scores(limit: int = 10) -> list[dict]:
    return store.top_scores(max(1, min(limit, 25)))


@app.post("/scores", response_model=Ok)
def post_score(s: ScoreIn, _: Annotated[None, Depends(score_limit)]) -> Ok:
    # The game lasts 60 seconds and a call is worth at most a few points, so reject impossible runs.
    if s.seconds < 20 or s.score > s.seconds * 4:
        from fastapi import HTTPException

        raise HTTPException(status_code=422, detail="That score does not look right.")
    store.insert("scores", {"handle": s.handle, "score": s.score})
    return Ok()


# ---------- Aria demo ----------
class Message(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(max_length=800)


class ChatIn(BaseModel):
    messages: list[Message] = Field(default_factory=list, max_length=30)


class ChatOut(BaseModel):
    reply: str
    mode: Literal["ai", "demo"]
    ms: int


@app.post("/aria/chat", response_model=ChatOut)
def aria_chat(body: ChatIn, _: Annotated[None, Depends(chat_limit)]) -> ChatOut:
    t = time.perf_counter()
    text, mode = aria.reply([m.model_dump() for m in body.messages])
    return ChatOut(reply=text, mode=mode, ms=round((time.perf_counter() - t) * 1000))
