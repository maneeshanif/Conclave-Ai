import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";
import { Button } from "@/components/ui/Button";
import { getPost, posts } from "@/lib/notes";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  return p ? { title: p.title, description: p.summary, alternates: { canonical: `/notes/${p.slug}` }, openGraph: { type: "article", publishedTime: p.date } } : {};
}

export default async function NotePage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.summary,
            datePublished: post.date,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name },
            mainEntityOfPage: `${site.url}/notes/${post.slug}`,
          }),
        }}
      />
      <PageHeader eyebrow={post.topic} title={post.title} lead={post.summary} />
      <article className="frame border-t hair px-4 py-12 md:px-10">
        <div className="mx-auto max-w-2xl space-y-5 text-[1.0625rem]">
          <p className="label text-slate">
            <time dateTime={post.date}>{post.date}</time> · {site.name}
          </p>
          {post.blocks.map((b, i) => {
            switch (b.t) {
              case "p":
                return <p key={i} data-reveal>{b.text}</p>;
              case "h2":
                return <h2 key={i} data-reveal className="head pt-4">{b.text}</h2>;
              case "list":
                return (
                  <ul key={i} data-reveal className="list-disc space-y-2 pl-5 text-slate">
                    {b.items.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                );
              case "callout":
                return <p key={i} data-reveal className="rounded-xl bg-lime px-4 py-3 text-[0.9375rem] text-ink">{b.text}</p>;
              case "formula":
                return (
                  <ol key={i} data-reveal className="divide-y divide-[rgb(11_21_18/0.12)] rounded-2xl border hair bg-paper text-[0.9375rem]">
                    {b.lines.map(([sum, res]) => (
                      <li key={sum} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3">
                        <span className="text-slate">{sum}</span>
                        <b className="font-medium">{res}</b>
                      </li>
                    ))}
                  </ol>
                );
            }
          })}
          <div className="pt-4">
            <Button href={post.cta.href}>{post.cta.label}</Button>
          </div>
          <p className="pt-4 text-sm text-slate">
            <Link href="/notes" className="u-link hover:text-plum">All notes</Link>
          </p>
        </div>
      </article>
      <PageCta />
    </>
  );
}
