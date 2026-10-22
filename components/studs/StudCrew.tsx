import { StudGlyph } from "./StudGlyph";
import { AGENTS, AGENT_IDS, type AgentId } from "@/lib/studs/patterns";
import { cn } from "@/lib/utils";

/** The agents as a grid of glyphs with their job underneath. `agents` picks a subset (the Built-for tiles use four). */
export function StudCrew({ agents = AGENT_IDS, className, glyphClass = "h-28 w-28 md:h-32 md:w-32", animate = false }: { agents?: readonly AgentId[]; className?: string; glyphClass?: string; animate?: boolean }) {
  return (
    <ul className={className} aria-label="The crew">
      {agents.map((id) => (
        <li key={id} className={cn("text-center")}>
          <StudGlyph agent={id} size="100%" animate={animate} className={cn("mx-auto", glyphClass)} />
          <p className="mt-2 text-sm font-medium">{AGENTS[id].label}</p>
          <p className="label text-slate">{AGENTS[id].job}</p>
        </li>
      ))}
    </ul>
  );
}
