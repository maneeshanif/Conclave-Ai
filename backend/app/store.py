"""Storage with a safe fallback: Supabase when configured, otherwise append-only JSON lines in backend/data/ (gitignored)."""
import json
import logging
import threading
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from . import config

log = logging.getLogger("conclave.store")
DATA_DIR = Path(__file__).resolve().parent.parent / "data"
_lock = threading.Lock()
_client: Any = None


def _supabase() -> Any | None:
    """Lazy client. Returns None when Supabase is not configured or the library cannot connect."""
    global _client
    if not (config.SUPABASE_URL and config.SUPABASE_SERVICE_ROLE_KEY):
        return None
    if _client is None:
        try:
            from supabase import create_client

            _client = create_client(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY)
        except Exception:  # noqa: BLE001 - never let storage setup break a request
            log.exception("Supabase client could not be created; using file storage")
            return None
    return _client


def _file(table: str) -> Path:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    return DATA_DIR / f"{table}.jsonl"


def insert(table: str, row: dict[str, Any]) -> str:
    """Save a row. Returns where it went: 'supabase' or 'file'."""
    client = _supabase()
    if client is not None:
        try:
            client.table(table).insert(row).execute()
            return "supabase"
        except Exception:  # noqa: BLE001
            log.exception("Supabase insert into %s failed; falling back to file", table)
    stamped = {"id": str(uuid.uuid4()), "created_at": datetime.now(timezone.utc).isoformat(), **row}
    with _lock, _file(table).open("a", encoding="utf-8") as f:
        f.write(json.dumps(stamped, ensure_ascii=False) + "\n")
    return "file"


def read_all(table: str) -> list[dict[str, Any]]:
    path = _file(table)
    if not path.exists():
        return []
    with _lock, path.open(encoding="utf-8") as f:
        return [json.loads(line) for line in f if line.strip()]


def top_scores(limit: int = 10) -> list[dict[str, Any]]:
    client = _supabase()
    if client is not None:
        try:
            res = client.table("scores").select("handle,score,created_at").order("score", desc=True).limit(limit).execute()
            return list(res.data or [])
        except Exception:  # noqa: BLE001
            log.exception("Supabase score read failed; using file")
    rows = read_all("scores")
    return sorted(({"handle": r["handle"], "score": r["score"], "created_at": r.get("created_at")} for r in rows), key=lambda r: -r["score"])[:limit]
