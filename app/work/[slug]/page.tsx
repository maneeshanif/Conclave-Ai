import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/projects";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const found = await getProject((await params).slug);
  return found ? { title: found.project.title, description: found.project.summary } : {};
}

const sections = ["The problem", "The solution", "Architecture"] as const;

export default async function ProjectPage({ params }: Params) {
  const found = await getProject((await params).slug);
  if (!found) notFound();
  const { project: p, next } = found;

  return (
    <article>
      <header className="frame px-4 md:px-10 pb-12 pt-40">
        <Eyebrow>Case study</Eyebrow>
        <h1 className="display mt-4 text-display-l">{p.title}</h1>
        <p className="mt-6 max-w-2xl text-lead text-slate">{p.summary}</p>
        <p className="label mt-6 text-plum">{p.stack.join(" / ")}</p>
      </header>

      <div className="frame px-4 md:px-10">
        {/* Flat poster until the real loop exists, so the page never shows an empty box. */}
        <div data-reveal className="relative grid aspect-video place-items-center overflow-hidden rounded-3xl bg-lime" role="img" aria-label={`${p.title} preview`}>
          <span className="display text-display-xl text-ink">{p.title.slice(0, 1)}</span>
          <span className="pill-label absolute bottom-4 left-4">Preview video to come</span>
        </div>

        {sections.map((s) => (
          <section data-reveal key={s} className="grid gap-6 border-t hair py-12 md:grid-cols-[1fr_2fr]">
            <h2 className="label text-slate">{s}</h2>
            <p className="max-w-xl text-slate">{p.body || "Write-up to be added."}</p>
          </section>
        ))}

        <section data-reveal className="grid gap-6 border-t hair py-12 md:grid-cols-[1fr_2fr]">
          <h2 className="label text-slate">Results</h2>
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
            <p className="text-slate">Real numbers only. Added once confirmed.</p>
          )}
        </section>

        <div className="flex flex-wrap items-center justify-between gap-6 border-t hair py-12">
          <Button href="/contact">Book a call</Button>
          <Link href={`/work/${next.slug}`} className="display text-display-m hover:text-plum">
            <span className="label mr-3 text-slate">Next</span>
            {next.title}
          </Link>
        </div>
      </div>
    </article>
  );
}
