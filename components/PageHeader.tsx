import { Eyebrow } from "./ui/Eyebrow";

export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <header className="frame px-4 pb-14 pt-36 md:px-10">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="display mt-5 text-display-l">{title}</h1>
      {lead ? <p className="mt-6 max-w-2xl text-lead text-slate">{lead}</p> : null}
    </header>
  );
}
