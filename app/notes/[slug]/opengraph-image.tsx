import { ogCard, ogSize } from "@/lib/og";
import { getPost } from "@/lib/notes";

export const alt = "Conclave AI note";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  return ogCard({ kicker: p?.topic ?? "Notes", title: p?.title ?? "Notes", sub: p?.summary });
}
