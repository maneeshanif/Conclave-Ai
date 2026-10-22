import { ogCard, ogSize } from "@/lib/og";
import { industries } from "@/lib/content";

export const alt = "Conclave AI for your industry";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = industries.find((x) => x.slug === slug);
  return ogCard({ kicker: `For ${i?.name.toLowerCase() ?? ""}`, title: i?.h1 ?? "Built for your trade", sub: i?.pain });
}
