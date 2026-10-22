"""Aria, the demo agent. Two modes, and the reply always says which one it used:

  ai    OpenAI Agents SDK with two tools (availability, booking) against a sample calendar. Needs OPENAI_API_KEY.
  demo  A small rules engine, so the demo works with no keys. It says plainly that it is a demo.

Nothing here books anything real. The calendar is a fixed sample.
"""
import logging
import re
from typing import Literal

from . import config

log = logging.getLogger("conclave.aria")

Mode = Literal["ai", "demo"]
SLOTS = ["Thursday at 10:30", "Thursday at 2:00 pm", "Friday at 9:15"]
INTRO = "Hi, I'm Aria, a demo voice agent for a sample clinic. Ask me to book a check-up, or ask about opening hours."

INSTRUCTIONS = (
    "You are Aria, a demo voice agent for a sample clinic called Riverside Clinic. Be warm, brief (one or two short sentences) and plain. "
    "Say you are an AI if asked. You can check sample availability and book a sample slot with the tools. "
    "You cannot give real medical advice, real prices or real bookings; say so if asked. If the caller wants a person, say you will pass them to the team. "
    "Open Monday to Saturday, 9 to 5. Reply in the caller's language when you can."
)


def _last(messages: list[dict], role: str) -> str:
    return next((m["content"] for m in reversed(messages) if m["role"] == role), "")


def demo_reply(messages: list[dict]) -> str:
    said = _last(messages, "user").lower()
    prev_aria = _last(messages, "assistant").lower()
    if not said.strip():
        return INTRO
    if re.search(r"\b(human|person|someone|real people|staff|receptionist)\b", said):
        return "Of course. I'll pass this to a person on the team with a short summary, so you do not have to repeat yourself."
    # choosing a slot after being offered some
    if "which suits" in prev_aria or "i have" in prev_aria:
        for slot in SLOTS:
            day, _, t = slot.partition(" at ")
            if day.lower() in said or t.split()[0].replace(":", "") in said.replace(":", "") or re.search(rf"\b{re.escape(t.split()[0])}\b", said):
                return f"Booked for {slot}. In the real thing I'd text you a reminder. This was a demo, so nothing was actually booked."
        if re.search(r"\b(first|1st|one)\b", said):
            return f"Booked for {SLOTS[0]}. This was a demo, so nothing was actually booked."
        if re.search(r"\b(second|2nd|two)\b", said):
            return f"Booked for {SLOTS[1]}. This was a demo, so nothing was actually booked."
    if re.search(r"\b(book|appointment|slot|schedule|visit|check-?up|reserve|see (a|the) doctor)\b", said):
        return f"Happy to. I have {SLOTS[0]} or {SLOTS[1]}. Which suits you?"
    if re.search(r"\b(open|hours|when are you|saturday|sunday|weekend|close)\b", said):
        return "We're open Monday to Saturday, 9 to 5. Would you like me to book you in?"
    if re.search(r"\b(price|cost|how much|fee|insurance)\b", said):
        return "I'm a demo, so I can't quote real prices. A real agent would read yours from your price list. Want to see how booking works?"
    if re.search(r"\b(ai|robot|bot|real)\b", said):
        return "Yes, I'm an AI, and I always say so. You can ask for a person at any time."
    if re.search(r"\b(hi|hello|hey|salam|assalam|marhaba)\b", said):
        return "Hello! I'm Aria, a demo agent. Try asking me to book a check-up."
    if re.search(r"\b(thanks|thank you|bye|goodbye)\b", said):
        return "You're welcome. If you'd like a real agent for your business, you can book a call with the team."
    return "I'm only a demo, so I know a few things: booking, opening hours, and handing over to a person. Try one of those."


def _ai_reply(messages: list[dict]) -> str | None:
    """Run the Agents SDK. Returns None on any problem so the caller can fall back to demo mode."""
    if not config.OPENAI_API_KEY:
        return None
    try:
        from agents import Agent, Runner, function_tool  # type: ignore[import-not-found]

        @function_tool
        def check_availability() -> str:
            """List the sample slots that are free."""
            return "Free slots: " + ", ".join(SLOTS)

        @function_tool
        def book_slot(slot: str) -> str:
            """Book one of the sample slots. Nothing real is booked."""
            return f"Sample booking confirmed for {slot}."

        agent = Agent(name="Aria", instructions=INSTRUCTIONS, model=config.ARIA_MODEL, tools=[check_availability, book_slot])
        transcript = "\n".join(f"{'Caller' if m['role'] == 'user' else 'Aria'}: {m['content']}" for m in messages[-12:])
        result = Runner.run_sync(agent, transcript + "\nAria:")
        text = str(result.final_output or "").strip()
        return text or None
    except Exception:  # noqa: BLE001
        log.exception("Agents SDK call failed; falling back to demo mode")
        return None


def reply(messages: list[dict]) -> tuple[str, Mode]:
    ai = _ai_reply(messages)
    if ai:
        return ai, "ai"
    return demo_reply(messages), "demo"
