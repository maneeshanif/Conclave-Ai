"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { Character } from "@/components/Cast";
import { cast, type CastId } from "@/lib/content";
import { cn } from "@/lib/utils";

const GAME_SECONDS = 60;
const CALL_SECONDS = 4.5;

/** Each incoming call belongs to exactly one crew member. */
const calls: { text: string; who: CastId }[] = [
  { text: "“Hi, are you open on Saturday?”", who: "aria" },
  { text: "Web form: “Do you have anything tomorrow?”", who: "echo" },
  { text: "“Can I move my Tuesday visit?”", who: "slot" },
  { text: "A customer has not visited in nine months", who: "boomerang" },
  { text: "Owner: “How did we do this week?”", who: "tally" },
  { text: "Caller is upset and wants a person", who: "gate" },
  { text: "“Where did that number come from?”", who: "ledger" },
  { text: "“Hello? Is anyone there?” (the phone is ringing)", who: "aria" },
  { text: "Enquiry sat unanswered for an hour", who: "echo" },
  { text: "Two people want the same 10:30 slot", who: "slot" },
];

type Phase = "ready" | "playing" | "over";
type Row = { handle: string; score: number };

export function Convene() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [left, setLeft] = useState(GAME_SECONDS);
  const [call, setCall] = useState(0);
  const [callLeft, setCallLeft] = useState(CALL_SECONDS);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [flash, setFlash] = useState<"good" | "bad" | null>(null);
  const [board, setBoard] = useState<Row[] | null>(null);
  const [boardError, setBoardError] = useState("");
  const [handle, setHandle] = useState("");
  const [saved, setSaved] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveMsg, setSaveMsg] = useState("");
  const startedAt = useRef(0);
  const last = useRef(0);
  const correct = useRef(0);

  const loadBoard = useCallback(async () => {
    const r = await api<Row[]>("/scores?limit=10");
    if (r.ok) {
      setBoard(r.data);
      setBoardError("");
    } else setBoardError("The leaderboard is not reachable right now.");
  }, []);
  useEffect(() => void loadBoard(), [loadBoard]);

  const nextCall = useCallback(() => {
    setCall((c) => {
      let n = Math.floor(Math.random() * calls.length);
      if (n === c) n = (n + 1) % calls.length;
      return n;
    });
    setCallLeft(CALL_SECONDS);
  }, []);

  function start() {
    setScore(0);
    setCombo(0);
    setLeft(GAME_SECONDS);
    setSaved("idle");
    setSaveMsg("");
    correct.current = 0;
    startedAt.current = performance.now();
    last.current = performance.now();
    nextCall();
    setPhase("playing");
  }

  // clock: one frame loop drives the game timer and the call timer together
  useEffect(() => {
    if (phase !== "playing") return;
    let raf = 0;
    const tick = (now: number) => {
      const dt = (now - last.current) / 1000;
      last.current = now;
      const remaining = GAME_SECONDS - (now - startedAt.current) / 1000;
      setLeft(Math.max(0, remaining));
      setCallLeft((c) => {
        const n = c - dt;
        if (n <= 0) {
          setCombo(0);
          setFlash("bad");
          setCall((x) => (x + 1 + Math.floor(Math.random() * (calls.length - 1))) % calls.length);
          return CALL_SECONDS;
        }
        return n;
      });
      if (remaining <= 0) {
        setPhase("over");
        void loadBoard();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, loadBoard]);

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 260);
    return () => clearTimeout(t);
  }, [flash]);

  const pick = useCallback(
    (who: CastId) => {
      if (phase !== "playing") return;
      if (calls[call].who === who) {
        correct.current += 1;
        const c = combo + 1;
        setCombo(c);
        setScore((s) => s + 1 + (c % 5 === 0 ? 2 : 0));
        setFlash("good");
        nextCall();
      } else {
        setCombo(0);
        setScore((s) => Math.max(0, s - 1));
        setFlash("bad");
      }
    },
    [phase, call, combo, nextCall],
  );

  // keyboard: 1 to 7 choose a crew member
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== "playing" || (e.target as HTMLElement)?.closest("input,textarea,select")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= 7) pick(cast[n - 1].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, pick]);

  async function save() {
    setSaved("saving");
    const seconds = Math.max(20, GAME_SECONDS - left);
    const r = await api<{ ok: boolean }>("/scores", { body: { handle: handle.trim() || "player", score, seconds } });
    if (r.ok) {
      setSaved("saved");
      void loadBoard();
    } else {
      setSaved("error");
      setSaveMsg(r.message);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_17rem]">
      <div className={cn("rounded-2xl border bg-paper p-4 transition-colors duration-150 md:p-6", flash === "good" ? "border-ink bg-lime/30" : flash === "bad" ? "border-[#9B1C1C]" : "hair")}>
        {phase === "ready" && (
          <div className="text-center">
            <p className="mx-auto max-w-md text-slate">Calls come in. Tap the crew member whose job it is, before the call goes cold. Keys 1 to 7 work too. 60 seconds.</p>
            <button type="button" onClick={start} className="press mt-5 inline-flex h-12 items-center rounded-xl bg-lime px-6 font-medium text-ink transition-colors duration-150 hover:bg-ink hover:text-lime">
              Start the game
            </button>
          </div>
        )}

        {phase === "playing" && (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="pill-label">{Math.ceil(left)}s</span>
              <span aria-live="polite">
                Score <b className="text-lg">{score}</b>
                {combo >= 2 && <span className="ml-2 rounded-md bg-lime px-2 py-0.5 text-xs font-medium">streak {combo}</span>}
              </span>
            </div>
            <div className="mt-4 overflow-hidden rounded-xl bg-ink p-5 text-paper" role="status">
              <p className="label text-lilac">Incoming</p>
              <p className="mt-2 text-lg font-medium">{calls[call].text}</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-paper/20" aria-hidden="true">
                <div className="h-full rounded-full bg-lime" style={{ width: `${(callLeft / CALL_SECONDS) * 100}%` }} />
              </div>
            </div>
            <ul className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
              {cast.map((c, i) => (
                <li key={c.id}>
                  <button type="button" onClick={() => pick(c.id)} className="press group flex w-full flex-col items-center rounded-xl border hair bg-mist p-1.5 transition-colors duration-150 hover:bg-chalk" aria-label={`${i + 1}. ${c.name}: ${c.job}`}>
                    <Character id={c.id} className="h-14 w-14 sm:h-16 sm:w-16" label="" />
                    <span className="label mt-1">
                      {i + 1} {c.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {phase === "over" && (
          <div className="text-center">
            <p className="label text-slate">Time</p>
            <p className="display text-[clamp(2.5rem,8vw,4.5rem)]">{score}</p>
            <p className="text-slate">{correct.current} calls handled</p>
            {saved === "saved" ? (
              <p className="mt-4 font-medium">Saved to the leaderboard.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void save();
                }}
                className="mx-auto mt-5 flex max-w-xs gap-2"
              >
                <label htmlFor="handle" className="sr-only">
                  Your name for the leaderboard
                </label>
                <input id="handle" value={handle} onChange={(e) => setHandle(e.target.value)} maxLength={20} placeholder="Your name" className="h-12 min-w-0 flex-1 rounded-xl border hair bg-paper px-3.5 hover:border-ink/30 focus-visible:border-ink" />
                <button type="submit" disabled={saved === "saving" || score === 0} className="press h-12 rounded-xl bg-lime px-5 font-medium text-ink transition-colors duration-150 hover:bg-ink hover:text-lime disabled:opacity-50">
                  Save
                </button>
              </form>
            )}
            {saved === "error" && <p className="mt-2 text-sm text-[#9B1C1C]">{saveMsg}</p>}
            <button type="button" onClick={start} className="press mt-5 inline-flex h-11 items-center rounded-xl border hair bg-paper px-5 text-sm font-medium transition-colors duration-150 hover:bg-mist">
              Play again
            </button>
          </div>
        )}
      </div>

      <aside className="rounded-2xl border hair bg-chalk p-5">
        <h3 className="label text-slate">Top 10</h3>
        {board === null && !boardError && <p className="mt-3 text-sm text-slate">Loading…</p>}
        {boardError && <p className="mt-3 text-sm text-slate">{boardError}</p>}
        {board && board.length === 0 && (
          <div className="mt-3 text-center">
            <Character id="tally" mood="sleepy" className="mx-auto h-24 w-24" label="Tally, asleep" />
            <p className="mt-1 text-sm text-slate">No scores yet. Be the first.</p>
          </div>
        )}
        {board && board.length > 0 && (
          <ol className="mt-3 space-y-1.5 text-sm">
            {board.map((r, i) => (
              <li key={i} className="flex items-baseline justify-between gap-3">
                <span className="truncate">
                  <span className="label mr-2 text-plum">{i + 1}</span>
                  {r.handle}
                </span>
                <b>{r.score}</b>
              </li>
            ))}
          </ol>
        )}
        <p className="mt-4 text-xs text-slate">Top scorers get an interview. See the guild page.</p>
      </aside>
    </div>
  );
}
