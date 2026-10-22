/** Single source for easing and timing. Mirrors docs/design-system.md section 5. */
export const ease = {
  outExpo: "expo.out",
  inOut: "power3.inOut",
  outQuart: "power3.out",
  css: {
    outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
    inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
    outQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
  },
} as const;

export const dur = { micro: 0.15, ui: 0.3, reveal: 0.8, hero: 1.2 } as const;
export const stagger = { letter: 0.02, word: 0.06, item: 0.08, card: 0.1, cap: 0.6 } as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
