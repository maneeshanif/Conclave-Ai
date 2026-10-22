import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getShowcaseProjects, hasWriteUp } from "@/lib/projects";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageCta } from "@/components/PageCta";
import { ArchDiagram } from "@/components/Diagrams";
import { ProjectCover } from "@/components/work/ProjectCover";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getShowcaseProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const found = await getProject((await params).slug);
  if (!found) return {};
  const p = found.project;
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    // A page with no write-up yet is thin: keep it out of search until there is something to read.
    robots: hasWriteUp(p) ? undefined : { index: false, follow: true },
  };
}

/** Sections appear only when there is real content for them. Nothing is padded with placeholder text. */
export default async function ProjectPage({ params }: Params) {
  const found = await getProject((await params).slug);
  if (!found) notFound();
  const { project: p, next } = found;
  const index = (await getShowcaseProjects()).findIndex((x) => x.slug === p.slug);

  return (
    <article>
      <header className="frame px-4 pb-10 pt-40 md:px-10">
        <Eyebrow>{p.tags.join(" / ") || "Case study"}</Eyebrow>
        <h1 className="display mt-4 text-display-l">{p.title}</h1>
        {p.summary && <p className="mt-6 max-w-2xl text-lead text-slate">{p.summary}</p>}
        {p.role && <p className="label mt-6 text-plum">{p.role}</p>}
      </header>

      <div className="frame border-t hair px-4 md:px-10">
        <ProjectCover project={p} index={index} priority className="mt-10 aspect-video rounded-3xl" />

        {p.results.length > 0 && (
          <section data-reveal className="grid gap-6 border-b hair py-12 md:grid-cols-[1fr_2fr]">
            <h2 className="head">Result</h2>
            <dl className="grid gap-6 sm:grid-cols-3">
              {p.results.map((r) => (
                <div key={r.label}>
                  <dt className="label text-slate">{r.label}</dt>
                  <dd className="display text-display-m">{r.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {p.body && (
          <section data-reveal className="grid gap-6 border-b hair py-12 md:grid-cols-[1fr_2fr]">
            <h2 className="head">The build</h2>
            <p className="max-w-xl whitespace-pre-line text-slate">{p.body}</p>
          </section>
        )}

        {p.stack.length > 0 && (
          <section data-reveal className="grid gap-6 border-b hair py-12 md:grid-cols-[1fr_2fr]">
            <h2 className="head">Built with</h2>
            <ArchDiagram stack={p.stack} />
          </section>
        )}

        <div className="flex flex-wrap items-center justify-between gap-6 py-12">
          <p className="label text-slate">Next project</p>
          <Link href={`/work/${next.slug}`} className="display text-display-m transition-colors duration-150 hover:text-plum">
            {next.title}
          </Link>
        </div>
      </div>
      <PageCta />
    </article>
  );
}
