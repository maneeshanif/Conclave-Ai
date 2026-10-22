import { ogCard, ogSize } from "@/lib/og";

export const alt = "Conclave AI: Roadmap";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ kicker: "Roadmap", title: "What shipped, what is next" });
}

