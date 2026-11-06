import { formatUpdated } from "@/components/LandingPage";

/** Visible "last updated" line shown under the header of search-targeted pages. Bump the date when the copy is reviewed. */
export const PAGES_UPDATED = "2026-11-07";

export function LastUpdated({ iso = PAGES_UPDATED }: { iso?: string }) {
  return (
    <p className="frame border-t hair px-4 py-3 text-sm text-slate md:px-10">
      Last updated <time dateTime={iso}>{formatUpdated(iso)}</time>
    </p>
  );
}
