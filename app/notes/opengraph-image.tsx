import { ogCard, ogSize } from "@/lib/og";

export const alt = "Conclave AI: Notes";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ kicker: "Notes", title: "Short posts with a real number or a diagram" });
}

