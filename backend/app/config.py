"""Settings read from the environment (backend/.env). Nothing here has a secret default."""
import os

from dotenv import load_dotenv

load_dotenv()


def env(key: str, default: str = "") -> str:
    return os.getenv(key, default).strip()


ALLOWED_ORIGINS = [o.strip() for o in env("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:3001,http://localhost:3100").split(",") if o.strip()]
SUPABASE_URL = env("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = env("SUPABASE_SERVICE_ROLE_KEY")
RESEND_API_KEY = env("RESEND_API_KEY")
FROM_EMAIL = env("FROM_EMAIL", "Conclave AI <onboarding@resend.dev>")
NOTIFY_EMAIL = env("NOTIFY_EMAIL")
OPENAI_API_KEY = env("OPENAI_API_KEY")
ARIA_MODEL = env("ARIA_MODEL", "gpt-4o-mini")
# Seconds a form must be open before a submit counts as human. Bots fill and send instantly.
MIN_FORM_SECONDS = float(env("MIN_FORM_SECONDS", "2.5"))
