import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/projects";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageCta } from "@/components/PageCta";
import { ArchDiagram } from "@/components/Diagrams";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const found = await getProject((await params).slug);
  return found ? { title: found.project.title, description: found.project.summary, alternates: { canonical: `/work/${found.project.slug}` } } : {};
}

const pending = "Write-up to be added once the client has agreed what we can share.";

export default async function ProjectPage({ params }: Params) {
  const found = await getProject((await params).slug);
  if (!found) notFound();
  const { project: p, next } = found;

  return (
    <article>
      <header className="frame px-4 pb-12 pt-40 md:px-10">
        <Eyebrow>Case study</Eyebrow>
        <h1 className="display mt-4 text-display-l">{p.title}</h1>
        <p className="mt-6 max-w-2xl text-lead text-slate">{p.summary}</p>
        <p className="label mt-6 text-plum">{p.role}</p>
      </header>

      <div className="frame border-t hair px-4 md:px-10">
        {/* Flat poster until the real loop exists, so the page never shows an empty box. */}
        <div data-reveal className="relative mt-10 grid aspect-video place-items-center overflow-hidden rounded-3xl bg-lime" role="img" aria-label={`${p.title} preview`}>
          <span className="display text-display-xl text-ink">{p.title.slice(0, 1)}</span>
          <span className="pill-label absolute bottom-4 left-4">Preview video to come</span>
        </div>

        <section data-reveal className="grid gap-6 border-b hair py-12 md:grid-cols-[1fr_2fr]">
          <h2 className="head">Result</h2>
          {p.results.length ? (
            <dl className="grid gap-6 sm:grid-cols-3">
              {p.results.map((r) => (
                <div key={r.label}>
                  <dt className="label text-slate">{r.label}</dt>
                  <dd className="display text-display-m">{r.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="max-w-xl text-slate">One headline number appears here, with where it came from. Real numbers only; none until confirmed.</p>
          )}
        </section>

        {(
          [
            ["The problem", p.body],
            ["The solution", p.body],
          ] as const
        ).map(([h, body]) => (
          <section data-reveal key={h} className="grid gap-6 border-b hair py-12 md:grid-cols-[1fr_2fr]">
            <h2 className="head">{h}</h2>
            <p className="max-w-xl text-slate">{body || pending}</p>
          </section>
        ))}

        <section data-reveal className="grid gap-6 border-b hair py-12 md:grid-cols-[1fr_2fr]">
          <h2 className="head">Architecture</h2>
          <ArchDiagram stack={p.stack} />
        </section>

        <section data-reveal className="grid gap-6 border-b hair py-12 md:grid-cols-[1fr_2fr]">
          <h2 className="head">What we would do differently</h2>
          <p className="max-w-xl text-slate">An honest note from the team after launch. Added with the write-up.</p>
        </section>

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
