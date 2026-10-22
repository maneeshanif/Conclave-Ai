"""Small abuse guards: a sliding-window rate limit per client and route. In-memory, fine for one instance; use Redis if it scales out."""
import time
from collections import defaultdict, deque

from fastapi import HTTPException, Request


def client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


class RateLimit:
    """Use as a dependency: `Depends(RateLimit(5, 60))` allows 5 calls per 60 seconds per IP."""

    def __init__(self, calls: int, per_seconds: int) -> None:
        self.calls = calls
        self.window = per_seconds
        self.hits: dict[str, deque[float]] = defaultdict(deque)

    def __call__(self, request: Request) -> None:
        key = f"{client_ip(request)}:{request.url.path}"
        now = time.monotonic()
        q = self.hits[key]
        while q and now - q[0] > self.window:
            q.popleft()
        if len(q) >= self.calls:
            raise HTTPException(status_code=429, detail="Too many requests. Please wait a moment and try again.")
        q.append(now)
        # keep the table from growing forever
        if len(self.hits) > 5000:
            for k in [k for k, v in self.hits.items() if not v]:
                del self.hits[k]
