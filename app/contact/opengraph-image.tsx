import { ogCard, ogSize } from "@/lib/og";

export const alt = "Conclave AI: Contact";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ kicker: "Contact", title: "Let us talk" });
}

