"use client";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const tones = ["bg-lime text-ink", "bg-lilac text-ink", "bg-moss text-lime", "bg-steel text-ink"];

/** Filter chips (real buttons) over the project cards. "All" first. */
export function WorkGrid({ projects }: { projects: Project[] }) {
  const tags = [...new Set(projects.flatMap((p) => p.tags))];
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? projects.filter((p) => p.tags.includes(tag)) : projects;

  return (
    <>
      <div role="group" aria-label="Filter by type" className="mb-8 flex flex-wrap gap-2">
        {[null, ...tags].map((t) => (
          <button
            key={t ?? "all"}
            type="button"
            aria-pressed={tag === t}
            onClick={() => setTag(t)}
            className={cn("press min-h-11 rounded-xl border px-4 text-sm font-medium transition-colors duration-150", tag === t ? "border-ink bg-ink text-paper" : "hair bg-paper hover:bg-mist")}
          >
            {t ?? "All"}
          </button>
        ))}
      </div>
      <ul className="grid gap-4 md:grid-cols-2" aria-live="polite">
        {shown.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className="group block overflow-hidden rounded-3xl border hair bg-paper transition-colors duration-150 hover:bg-chalk">
              <div className={cn("grid aspect-video place-items-center overflow-hidden", tones[i % tones.length])}>
                <span className="display zoom-on-hover text-display-xl">{p.title.slice(0, 1)}</span>
              </div>
              <div className="p-6">
                <h2 className="display text-[clamp(1.5rem,3vw,2.75rem)] leading-none transition-colors group-hover:text-plum">{p.title}</h2>
                <p className="mt-2 text-slate">{p.summary}</p>
                <p className="label mt-4 text-plum">{p.stack.join(" / ")}</p>
                <p className="label mt-1 text-slate">{p.role}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
