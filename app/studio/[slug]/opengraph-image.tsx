import { ogCard, ogSize } from "@/lib/og";
import { studio, studioDetail, type StudioSlug } from "@/lib/content";

export const alt = "Conclave AI studio";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = studio.find((x) => x.slug === slug);
  return ogCard({ kicker: `Studio / ${s?.name ?? ""}`, title: studioDetail[slug as StudioSlug]?.h1 ?? "Studio", sub: s?.job });
}
