import { ogCard, ogSize } from "@/lib/og";

export const alt = "Conclave AI: Join";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ kicker: "Join", title: "The Conclave AI Guild" });
}

