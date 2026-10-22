import { ogCard, ogSize } from "@/lib/og";

export const alt = "Conclave AI: Security";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ kicker: "Security", title: "Calm answers to the risky questions" });
}

