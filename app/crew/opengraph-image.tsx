import { ogCard, ogSize } from "@/lib/og";

export const alt = "Conclave AI: The Crew";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ kicker: "The Crew", title: "Seven agents. One job each." });
}

