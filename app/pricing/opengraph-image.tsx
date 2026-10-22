import { ogCard, ogSize } from "@/lib/og";

export const alt = "Conclave AI: Pricing";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ kicker: "Pricing", title: "Pilot, Build, Retainer" });
}

