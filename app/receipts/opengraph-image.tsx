import { ogCard, ogSize } from "@/lib/og";

export const alt = "Conclave AI: Receipts";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ kicker: "Receipts", title: "Receipts, not claims" });
}

