import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card: flat lime, big wordmark text, one line. Palette only. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#C8F169", padding: 72, color: "#0B1512" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 700 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "#FBFCF8", border: "3px solid #0B1512", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38 }}>C</div>
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -4, lineHeight: 0.95, textTransform: "uppercase" }}>Agents,</div>
          <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -4, lineHeight: 0.95, textTransform: "uppercase" }}>convened.</div>
        </div>
        <div style={{ fontSize: 30 }}>{site.description}</div>
      </div>
    ),
    size,
  );
}
