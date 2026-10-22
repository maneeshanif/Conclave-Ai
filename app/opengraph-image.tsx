import { ogCard, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return ogCard({ kicker: "Voice agents, AI automation, full-stack software", title: "Agents, convened." });
}
