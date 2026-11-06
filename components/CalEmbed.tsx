"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { site } from "@/lib/site";

/** `NEXT_PUBLIC_CAL_LINK` may be a full URL (https://cal.com/name/30min) or just `name/30min`. The embed wants the latter. */
function slug(link: string) {
  return link.replace(/^https?:\/\/(www\.)?cal\.com\//i, "").replace(/^\/+|\/+$/g, "");
}

/**
 * Inline Cal.com booking. Cal.com collects the name and email and emails both sides itself,
 * so there is no mail service or database behind this. Without a link it falls back to plain email.
 */
export function CalEmbed({ theme = "light", className }: { theme?: "light" | "dark"; className?: string }) {
  const link = slug(site.calLink);

  useEffect(() => {
    if (!link) return;
    (async () => {
      const cal = await getCalApi();
      cal("ui", { theme, hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, [link, theme]);

  if (!link) {
    return (
      <div className={className}>
        <p className="label">Book a call</p>
        <p className="mt-3">
          Booking opens soon. Email us at{" "}
          <a href={`mailto:${site.email}`} className="u-link font-medium">
            {site.email}
          </a>{" "}
          and we will reply with times.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <Cal calLink={link} style={{ width: "100%", minHeight: 560 }} config={{ layout: "month_view", theme }} />
      <noscript>
        <a href={`https://cal.com/${link}`}>Book a call on Cal.com</a>
      </noscript>
    </div>
  );
}
