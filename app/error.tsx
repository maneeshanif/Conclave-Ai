"use client";
import { useEffect } from "react";
import { Character } from "@/components/Cast";

/** Route-level error boundary: a friendly state and a retry, instead of a blank screen. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="frame grid items-center gap-8 px-4 pb-24 pt-40 md:grid-cols-[1fr_auto] md:px-10">
      <div>
        <p className="label text-slate">Something broke</p>
        <h1 className="display mt-4 text-display-l">That one needs a person.</h1>
        <p className="mt-4 max-w-md text-slate">Gate has passed it on. Try again, and if it keeps happening, write to us.</p>
        <button type="button" onClick={reset} className="press mt-8 inline-flex h-11 items-center rounded-xl bg-lime px-5 font-medium text-ink transition-colors duration-150 hover:bg-ink hover:text-lime">
          Try again
        </button>
      </div>
      <Character id="gate" mood="oops" className="mx-auto h-56 w-56 md:h-72 md:w-72" label="Gate, passing it to a person" />
    </div>
  );
}
