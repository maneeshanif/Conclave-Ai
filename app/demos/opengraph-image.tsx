import { ogCard, ogSize } from "@/lib/og";

export const alt = "Conclave AI: Demos";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ kicker: "Demos", title: "Try it, do not take our word" });
}

