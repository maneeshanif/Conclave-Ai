import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = { title: "Work", description: "Selected builds, outcome first." };

export default async function WorkPage() {
  const projects = await getProjects();
  const tags = [...new Set(projects.flatMap((p) => p.tags))];
  return (
    <>
      <PageHeader eyebrow="Work" title="Built, shipped, running." />
      <div className="frame px-4 md:px-10 pb-24">
        <ul className="mb-8 flex flex-wrap gap-2" aria-label="Project types">
          {tags.map((t) => (
            <li key={t} className="label rounded-chip bg-paper px-3 py-2 text-plum">
              {t}
            </li>
          ))}
        </ul>
        <ul className="grid gap-4 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="group block rounded-3xl border hair bg-paper p-6 transition-colors duration-150 hover:bg-chalk"
              >
                <div className="aspect-video rounded-2xl bg-mist" role="img" aria-label={`${p.title}, project video placeholder`} />
                <h2 className="display mt-6 text-[clamp(1.5rem,3vw,2.75rem)] leading-none transition-colors group-hover:text-plum">{p.title}</h2>
                <p className="mt-2 text-slate">{p.summary}</p>
                <p className="label mt-4 text-plum">{p.stack.join(" / ")}</p>
                <p className="label mt-1 text-slate">{p.role}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
