"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * FAQ rows. The panel animates grid-template-rows 0fr to 1fr over 320ms with lemlist's measured curve
 * cubic-bezier(0.32, 0.72, 0, 1), and the text eases in with opacity and a short blur. One row open at a time.
 */
export function Accordion({ items }: { items: readonly (readonly string[])[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-[rgb(11_21_18/0.12)]">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q}>
            <h3>
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-6 py-4 text-left font-medium transition-colors duration-150 hover:bg-mist/60"
              >
                {q}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className={cn("h-4 w-4 shrink-0 text-slate transition-transform duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)]", isOpen && "rotate-180")}
                >
                  <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </h3>
            <div
              id={`faq-a-${i}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-[320ms] [transition-timing-function:cubic-bezier(0.32,0.72,0,1)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    "max-w-xl px-6 pb-5 text-slate transition-[opacity,filter] duration-[320ms] [transition-timing-function:cubic-bezier(0.32,0.72,0,1)]",
                    isOpen ? "opacity-100 blur-0" : "opacity-0 blur-[2px]",
                  )}
                >
                  {a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
