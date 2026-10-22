/**
 * Feature flags. Things that are built but not yet polished stay in the repo behind a flag (Change Spec v3).
 * Turn the extra demos on locally with NEXT_PUBLIC_SHOW_EXTRA_DEMOS=1 in .env.local.
 */
export const flags = {
  /** The Convene game and the "build your own agent" wizard. Hidden until built and polished. */
  extraDemos: process.env.NEXT_PUBLIC_SHOW_EXTRA_DEMOS === "1",
};
