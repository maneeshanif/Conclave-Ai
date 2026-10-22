import { ogCard, ogSize } from "@/lib/og";

export const alt = "Conclave AI: Services";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ kicker: "Services", title: "Five jobs. One agent each." });
}

