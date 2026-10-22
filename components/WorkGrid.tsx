"use client";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/projects";
import { StudGlyph } from "@/components/studs/StudGlyph";
import type { AgentId } from "@/lib/studs/patterns";
import { cn } from "@/lib/utils";
import Image from "next/image";

const tones = ["bg-lime", "bg-lilac", "bg-moss", "bg-steel"];
const glyphFor = (p: Project): AgentId => {
  const t = p.tags.join(" ").toLowerCase();
  return t.includes("voice") ? "aria" : t.includes("agent") ? "gate" : t.includes("automation") ? "echo" : t.includes("platform") ? "ledger" : "tally";
};

/** Filter chips (real buttons) over the project cards. "All" first. Cards show a screenshot when one exists, else the project's stud glyph. */
export function WorkGrid({ projects }: { projects: Project[] }) {
  const tags = [...new Set(projects.flatMap((p) => p.tags))];
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? projects.filter((p) => p.tags.includes(tag)) : projects;

  return (
    <>
      {tags.length > 1 && (
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
      )}
      <ul className="grid gap-4 md:grid-cols-2" aria-live="polite">
        {shown.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className="group block overflow-hidden rounded-3xl border hair bg-paper transition-colors duration-150 hover:bg-chalk">
              {p.image ? (
                <div className="relative aspect-video overflow-hidden bg-mist">
                  <Image src={p.image} alt={`${p.title} screenshot`} fill sizes="(min-width: 768px) 50vw, 100vw" className="zoom-on-hover object-cover object-top" />
                </div>
              ) : (
                <div className={cn("grid aspect-video place-items-center overflow-hidden", tones[i % tones.length])}>
                  <div className="zoom-on-hover">
                    <StudGlyph agent={glyphFor(p)} size={144} animate decorative />
                  </div>
                </div>
              )}
              <div className="p-6">
                <p className="label text-plum">{p.tags.join(" / ")}</p>
                <h2 className="display mt-2 text-[clamp(1.5rem,3vw,2.5rem)] leading-none transition-colors group-hover:text-plum">{p.title}</h2>
                {p.summary && <p className="mt-2 text-slate">{p.summary}</p>}
                {p.results[0] && (
                  <p className="mt-3 inline-flex items-baseline gap-2 rounded-lg bg-lime px-3 py-1.5 text-ink">
                    <b className="text-lg">{p.results[0].value}</b>
                    <span className="text-sm">{p.results[0].label}</span>
                  </p>
                )}
                {p.stack.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <li key={t} className="rounded-md bg-mist px-2 py-0.5 text-xs text-slate">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
