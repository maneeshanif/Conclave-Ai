"use client";
import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPLIT_MIN_WIDTH, type HeroStud } from "./hero";

/**
 * Hero stud motion (spec section 5).
 *  1. On load the studs start scattered and assemble into the C in about 1.2s with a stagger, centre stud last.
 *  2. On scroll (screens 1024px and wider) the hero is held still for 300px while the C splits into the seven agent glyphs,
 *     one flock moving into a row of seven tiles directly below the headline. Pinning keeps the C where it is and keeps the
 *     row clear of the floating nav. Narrower screens and reduced motion show the assembled C only.
 * `ready` is false until the layout has been measured; the load assembly plays once, on the first ready run. When the window is
 * resized the studs are re-laid out and the split is rebuilt without replaying the assembly.
 */
export function useStudAssemble(svg: RefObject<SVGSVGElement | null>, studs: HeroStud[], trigger: () => Element | null, ready: boolean) {
  const played = useRef(false);
  useEffect(() => {
    const root = svg.current;
    if (!root || !ready) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const els = Array.from(root.querySelectorAll<SVGCircleElement>("[data-stud]"));
    const tiles = Array.from(root.querySelectorAll<SVGGElement>("[data-tile]"));
    const replay = !played.current;
    played.current = true;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const centre = els.findIndex((_, i) => studs[i].kind === "centre");
      const live = els.filter((_, i) => studs[i].kind !== "extra");

      const buildSplit = () => {
        const host = trigger();
        const wide = window.matchMedia(`(min-width: ${SPLIT_MIN_WIDTH}px)`).matches;
        if (!wide || !host || tiles.length === 0) return;
        const tl = gsap.timeline({ scrollTrigger: { trigger: host, start: "top top", end: "+=300", scrub: 0.6, pin: true, anticipatePin: 1 } });
        els.forEach((el, i) => {
          const s = studs[i];
          if (s.t) tl.to(el, { attr: { cx: s.t.x, cy: s.t.y, r: s.t.r }, fill: s.t.fill, opacity: 1, ease: "power2.inOut", duration: 1 }, 0);
          else tl.to(el, { opacity: 0, duration: 0.6 }, 0.2);
        });
        tl.to(tiles, { opacity: 1, duration: 0.6, stagger: 0.05 }, 0.3);
      };

      if (!replay) {
        buildSplit();
        return;
      }

      /* 1. scatter to the C */
      gsap.set(live, { attr: { cx: () => gsap.utils.random(-30, window.innerWidth + 30), cy: () => gsap.utils.random(-20, 420) }, opacity: 0, scale: 0.4 });
      const load = gsap.timeline({ delay: 0.45 });
      load.to(live, {
        attr: { cx: (i: number) => studs[els.indexOf(live[i])].c.x, cy: (i: number) => studs[els.indexOf(live[i])].c.y },
        opacity: (i: number) => studs[els.indexOf(live[i])].c.opacity,
        scale: 1,
        duration: 1.2,
        ease: "expo.out",
        stagger: { each: 0.012, from: "random" },
      });
      if (centre >= 0) load.fromTo(els[centre], { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(3)" }, ">-0.35");

      /* 2. split into the crew on scroll, built once the C is assembled */
      load.eventCallback("onComplete", buildSplit);
    });
    return () => mm.revert();
  }, [svg, studs, trigger, ready]);
}
