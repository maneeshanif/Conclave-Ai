"""Email through Resend. If no key is set the message is logged and the call reports False, so forms still work in development."""
import logging
from html import escape

from . import config

log = logging.getLogger("conclave.mail")


def send(to: str, subject: str, html: str, reply_to: str | None = None) -> bool:
    if not (config.RESEND_API_KEY and to):
        log.info("Email not sent (Resend not configured). To=%s Subject=%s", to or "-", subject)
        return False
    try:
        import resend

        resend.api_key = config.RESEND_API_KEY
        params: dict = {"from": config.FROM_EMAIL, "to": [to], "subject": subject, "html": html}
        if reply_to:
            params["reply_to"] = reply_to
        resend.Emails.send(params)
        return True
    except Exception:  # noqa: BLE001
        log.exception("Resend failed for %s", subject)
        return False


def lead_notification(lead: dict) -> str:
    rows = "".join(f"<tr><td><b>{escape(k)}</b></td><td>{escape(str(v))}</td></tr>" for k, v in lead.items() if v)
    return f"<p>New enquiry from the website.</p><table cellpadding='6'>{rows}</table>"


def lead_confirmation(name: str) -> str:
    return (
        f"<p>Hi {escape(name)},</p><p>Thanks for getting in touch with Conclave AI. We have your message and will reply by email. "
        "If you have not heard from us, reply to this email.</p><p>Conclave AI</p>"
    )
