import { ImageResponse } from "next/og";
import { site } from "./site";
import { markStuds } from "./studs/mark";

export const ogSize = { width: 1200, height: 630 };

/**
 * Share card for a page: flat lime, the stud C, the page's own title and one line. Palette only.
 * Used by each route's opengraph-image file so every indexable page has its own image (Change Spec v3, section 6).
 */
export function ogCard({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  const studs = markStuds(110, 110, 96);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#C8F169", color: "#0B1512", padding: 64, justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 760 }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>{site.name}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, textTransform: "uppercase", opacity: 0.7 }}>{kicker}</div>
            <div style={{ display: "flex", fontSize: title.length > 34 ? 66 : 84, fontWeight: 800, lineHeight: 1, letterSpacing: -2, marginTop: 14 }}>{title}</div>
          </div>
          <div style={{ display: "flex", fontSize: 28, opacity: 0.85 }}>{sub ?? site.description}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 300 }}>
          <svg width="260" height="260" viewBox="0 0 220 220">
            {studs.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.kind === "centre" ? "#5E8A00" : "#0B1512"} opacity={s.opacity} />
            ))}
          </svg>
        </div>
      </div>
    ),
    ogSize,
  );
}
