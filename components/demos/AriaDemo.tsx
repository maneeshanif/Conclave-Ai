"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { StudGlyph } from "@/components/studs/StudGlyph";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };
type ChatOut = { reply: string; mode: "ai" | "demo"; ms: number };

/* Minimal typing for the browser Web Speech API (not in the default TypeScript DOM lib). */
interface Recognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start(): void;
  stop(): void;
  onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
}
type RecognitionCtor = new () => Recognition;

const LANGS = [
  { code: "en-US", label: "English" },
  { code: "ar-SA", label: "العربية" },
  { code: "ur-PK", label: "اردو" },
] as const;

const INTRO = "Hi, I'm Aria, a demo voice agent for a sample clinic. Ask me to book a check-up, or ask about opening hours.";
const suggestions = ["Can I book a check-up?", "Are you open Saturday?", "Can I talk to a person?"];

export function AriaDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", content: INTRO }]);
  const [text, setText] = useState("");
  const [interim, setInterim] = useState("");
  const [lang, setLang] = useState<(typeof LANGS)[number]["code"]>("en-US");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceOut, setVoiceOut] = useState(true);
  const [mode, setMode] = useState<"ai" | "demo" | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [micOk, setMicOk] = useState(false);
  const [micError, setMicError] = useState("");
  const rec = useRef<Recognition | null>(null);
  const log = useRef<HTMLDivElement>(null);
  const msgsRef = useRef(msgs);
  msgsRef.current = msgs;

  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
    setMicOk(!!(w.SpeechRecognition || w.webkitSpeechRecognition));
    return () => {
      rec.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [msgs, interim, busy]);

  function speak(s: string) {
    if (!voiceOut || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(s);
    u.lang = lang;
    u.rate = 1.02;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  }

  async function send(raw: string) {
    const content = raw.trim().slice(0, 400);
    if (!content || busy) return;
    window.speechSynthesis?.cancel();
    const next: Msg[] = [...msgsRef.current, { role: "user", content }];
    setMsgs(next);
    setText("");
    setInterim("");
    setBusy(true);
    const t0 = performance.now();
    const res = await api<ChatOut>("/aria/chat", { body: { messages: next.slice(-12) } });
    const total = performance.now() - t0;
    setBusy(false);
    if (res.ok) {
      setMode(res.data.mode);
      setLatency(total);
      setMsgs([...next, { role: "assistant", content: res.data.reply }]);
      speak(res.data.reply);
    } else {
      setMsgs([...next, { role: "assistant", content: res.status === 0 ? "I can't reach the demo server right now. Please try again in a moment, or book a call and we will show you live." : res.message }]);
    }
  }

  function toggleMic() {
    setMicError("");
    if (listening) {
      rec.current?.stop();
      return;
    }
    const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;
    window.speechSynthesis?.cancel();
    const r = new Ctor();
    r.lang = lang;
    r.interimResults = true;
    r.continuous = false;
    r.onresult = (e) => {
      let live = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) {
          setInterim("");
          void send(res[0].transcript);
          return;
        }
        live += res[0].transcript;
      }
      setInterim(live);
    };
    r.onend = () => setListening(false);
    r.onerror = (e) => {
      setListening(false);
      setMicError(e.error === "not-allowed" ? "Microphone access was blocked. You can type instead." : e.error === "no-speech" ? "I did not hear anything. Try again." : "Voice input is not available here. You can type instead.");
    };
    rec.current = r;
    setListening(true);
    r.start();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_16rem]">
      <div className="flex min-h-[30rem] flex-col overflow-hidden rounded-2xl border hair bg-paper">
        <div className="flex flex-wrap items-center gap-3 border-b hair bg-mist/60 px-4 py-2.5">
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className={cn("h-2 w-2 rounded-full", speaking || listening ? "bg-violet" : "bg-steel")} />
            Aria {listening ? "is listening" : speaking ? "is speaking" : "demo"}
          </span>
          <span className="ml-auto flex items-center gap-2">
            <label htmlFor="aria-lang" className="sr-only">
              Language
            </label>
            <select id="aria-lang" value={lang} onChange={(e) => setLang(e.target.value as typeof lang)} className="h-9 rounded-lg border hair bg-paper px-2 text-sm">
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setVoiceOut((v) => !v)} aria-pressed={voiceOut} className="press h-9 rounded-lg border hair px-3 text-sm transition-colors duration-150 hover:bg-mist">
              Voice {voiceOut ? "on" : "off"}
            </button>
          </span>
        </div>

        <div ref={log} role="log" aria-live="polite" aria-label="Conversation with Aria" className="flex-1 overflow-y-auto p-4 text-[0.9375rem]">
          <ol className="space-y-2.5">
          {msgs.map((m, i) => (
            <li key={i} className={cn("max-w-[85%] rounded-xl px-3.5 py-2.5", m.role === "assistant" ? "bg-ink text-paper" : "ml-auto bg-mist")}>
              {m.content}
            </li>
          ))}
          {interim && <li className="ml-auto max-w-[85%] rounded-xl bg-mist/60 px-3.5 py-2.5 italic text-slate">{interim}</li>}
          {busy && <li className="max-w-[85%] rounded-xl bg-ink/80 px-3.5 py-2.5 text-paper">…</li>}
          </ol>
        </div>

        <div className="border-t hair p-3">
          <div className="mb-2 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button key={s} type="button" onClick={() => void send(s)} disabled={busy} className="press rounded-lg border hair bg-paper px-3 py-1.5 text-sm transition-colors duration-150 hover:bg-mist disabled:opacity-50">
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(text);
            }}
            className="flex gap-2"
          >
            <label htmlFor="aria-input" className="sr-only">
              Message to Aria
            </label>
            <input id="aria-input" value={text} onChange={(e) => setText(e.target.value)} maxLength={400} placeholder="Type, or press the mic" className="h-12 min-w-0 flex-1 rounded-xl border hair bg-paper px-3.5 hover:border-ink/30 focus-visible:border-ink" />
            {micOk && (
              <button type="button" onClick={toggleMic} aria-pressed={listening} className={cn("press h-12 rounded-xl px-4 text-sm font-medium transition-colors duration-150", listening ? "bg-violet text-paper" : "border hair bg-paper hover:bg-mist")}>
                {listening ? "Stop" : "Mic"}
              </button>
            )}
            <button type="submit" disabled={busy || !text.trim()} className="press h-12 rounded-xl bg-lime px-5 font-medium text-ink transition-colors duration-150 hover:bg-ink hover:text-lime disabled:opacity-50">
              Send
            </button>
          </form>
          <p className="mt-2 min-h-5 text-xs text-[#9B1C1C]" aria-live="polite">
            {micError}
          </p>
        </div>
      </div>

      <aside className="rounded-2xl border hair bg-chalk p-5">
        <StudGlyph agent="aria" size={144} animate active={speaking || listening || busy} className="mx-auto" label="Aria, answers calls" />
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="label text-slate">Answered in</dt>
            <dd className="text-lg font-semibold">{latency === null ? "Ask something" : `${(latency / 1000).toFixed(1)}s`}</dd>
          </div>
          <div>
            <dt className="label text-slate">Running on</dt>
            <dd>{mode === "ai" ? "The live AI model" : mode === "demo" ? "Demo mode (no AI key set)" : "Not started"}</dd>
          </div>
          <div>
            <dt className="label text-slate">Voice</dt>
            <dd>{micOk ? "Your browser's speech tools" : "Typing only in this browser"}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-slate">
          Nothing is booked for real. Demo mode answers in English; Arabic and Urdu need the live model and a browser that supports those voices.{" "}
          <Link href="/contact" className="u-link hover:text-plum">
            Book a call
          </Link>{" "}
          to hear a real build.
        </p>
      </aside>
    </div>
  );
}
