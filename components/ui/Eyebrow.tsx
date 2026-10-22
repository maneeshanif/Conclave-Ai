import { cn } from "@/lib/utils";

/** Small mono pill above a headline (lemlist pattern): "01 / VOICE". */
export function Eyebrow({ n, children, className }: { n?: string; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("pill-label", className)}>
      {n ? <span className="mr-1.5 text-plum">{n} /</span> : null}
      {children}
    </span>
  );
}
