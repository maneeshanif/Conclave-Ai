import Image from "next/image";
import { StudGlyph } from "@/components/studs/StudGlyph";
import type { Project } from "@/lib/projects";
import type { AgentId } from "@/lib/studs/patterns";
import { cn } from "@/lib/utils";

const tones = ["bg-lime", "bg-lilac", "bg-moss", "bg-steel"];

/** Which stud glyph stands for a project when it has no screenshot yet. */
const glyphFor = (p: Project): AgentId => {
  const t = p.tags.join(" ").toLowerCase();
  if (t.includes("voice")) return "aria";
  if (t.includes("agent")) return "gate";
  if (t.includes("automation")) return "echo";
  if (t.includes("platform")) return "ledger";
  return "tally";
};

/**
 * Cover for a project card or case page. A real screenshot (public/work/<slug>.png, or the first gallery image) is used when it
 * exists; otherwise a flat panel with the project's stud glyph, so the card never looks empty or broken.
 */
export function ProjectCover({ project, index = 0, className, priority }: { project: Project; index?: number; className?: string; priority?: boolean }) {
  if (project.image) {
    return (
      <div className={cn("relative overflow-hidden bg-mist", className)}>
        <Image src={project.image} alt={`${project.title} screenshot`} fill sizes="(min-width: 1024px) 40vw, 100vw" className="zoom-on-hover object-cover object-top" priority={priority} />
      </div>
    );
  }
  return (
    <div className={cn("grid place-items-center overflow-hidden", tones[index % tones.length], className)}>
      <div className="zoom-on-hover">
        <StudGlyph agent={glyphFor(project)} size={128} animate decorative />
      </div>
    </div>
  );
};
