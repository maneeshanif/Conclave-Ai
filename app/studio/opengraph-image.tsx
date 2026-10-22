import { ogCard, ogSize } from "@/lib/og";

export const alt = "Conclave AI: Studio";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ kicker: "Studio", title: "Agent-first software, built like a platform" });
}

