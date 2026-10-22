import { site } from "./site";

export type ApiResult<T> = { ok: true; data: T } | { ok: false; status: number; message: string };

/** Calls the FastAPI backend. Never throws: a down server or a 4xx becomes a plain message the UI can show. */
export async function api<T>(path: string, init?: { method?: "GET" | "POST"; body?: unknown }): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${site.apiUrl}${path}`, {
      method: init?.method ?? (init?.body ? "POST" : "GET"),
      headers: init?.body ? { "Content-Type": "application/json" } : undefined,
      body: init?.body ? JSON.stringify(init.body) : undefined,
    });
    if (!res.ok) {
      let message = "Something went wrong. Please try again.";
      try {
        const j = await res.json();
        if (typeof j.detail === "string") message = j.detail;
        else if (Array.isArray(j.detail) && j.detail[0]?.msg) message = String(j.detail[0].msg).replace(/^Value error, /, "");
      } catch {}
      if (res.status === 429) message = "Too many tries. Please wait a little and try again.";
      return { ok: false, status: res.status, message };
    }
    return { ok: true, data: (await res.json()) as T };
  } catch {
    return { ok: false, status: 0, message: "We could not reach the server. Please try again, or email us instead." };
  }
}
