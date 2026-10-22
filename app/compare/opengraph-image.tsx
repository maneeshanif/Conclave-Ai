import { ogCard, ogSize } from "@/lib/og";

export const alt = "Conclave AI: Compare";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ kicker: "Compare", title: "Pick the right tool, even if it is not us" });
}

