import { ogCard, ogSize } from "@/lib/og";
import { services } from "@/lib/site";

export const alt = "Conclave AI service";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return ogCard({ kicker: "Service", title: s?.title ?? "Services", sub: s?.body });
}
