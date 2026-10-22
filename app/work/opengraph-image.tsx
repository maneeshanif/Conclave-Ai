import { ogCard, ogSize } from "@/lib/og";

export const alt = "Conclave AI: Work";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ kicker: "Work", title: "Built, shipped, running" });
}

