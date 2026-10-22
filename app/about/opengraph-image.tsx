import { ogCard, ogSize } from "@/lib/og";

export const alt = "Conclave AI: About";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ kicker: "About", title: "Agents, convened" });
}

