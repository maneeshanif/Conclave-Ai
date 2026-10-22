"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ease, dur, stagger } from "@/lib/motion";

/**
 * One place that wires every scroll and micro animation from data attributes, so server components stay server components.
 *
 *   data-hero-line / -pill / -fade / -scene   hero intro timeline (the stud C scene runs its own assembly in lib/studs/useStudAssemble)
 *   data-reveal                               fade and rise once, batched so neighbours stagger
 *   data-stagger                              children rise in turn (total stagger capped at 0.6s)
 *   data-words                                words brighten with scroll (manifesto)
 *   data-stack                                sticky cards: the covered card scales back (lemlist feature stack)
 *   data-parallax="px"                        gentle scrubbed y drift
 *   data-visual > data-pop / data-bar / data-fill / data-count   product mock-up plays when it enters
 *   data-wave                                 idle voice waveform, paused off screen
 *   data-magnetic                             button leans toward the pointer (fine pointers only)
 *
 * Everything lives inside gsap.matchMedia, so it is reverted on route change and never runs under reduced motion.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    (window as unknown as { __motion?: boolean }).__motion = true;
    const all = <T extends Element = HTMLElement>(s: string) => gsap.utils.toArray<T>(s);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      /* Hero intro: lines slide up out of a mask, pill grows, support and actions follow, scene settles. */
      if (document.querySelector("[data-hero-line]") && window.matchMedia("(min-width: 768px)").matches) {
        const tl = gsap.timeline({ defaults: { ease: ease.outExpo } });
        tl.fromTo("[data-hero-line]", { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: dur.hero, stagger: 0.12 })
          .fromTo("[data-hero-pill]", { scaleX: 0, opacity: 0, transformOrigin: "left center" }, { scaleX: 1, opacity: 1, duration: 0.8 }, 0.35)
          .fromTo("[data-hero-fade]", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, clearProps: "transform" }, 0.7)
          .fromTo("[data-hero-scene]", { opacity: 0 }, { opacity: 1, duration: dur.hero }, 0.3);
      }

      /* Reveal: one batch per frame so items that enter together stagger. */
      const reveals = all("[data-reveal]");
      if (reveals.length) {
        gsap.set(reveals, { y: 28 });
        ScrollTrigger.batch(reveals, {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { y: 0, opacity: 1, duration: dur.reveal, ease: ease.outExpo, stagger: stagger.item, overwrite: true, clearProps: "transform" }),
        });
      }

      /* Stagger groups. */
      all("[data-stagger]").forEach((group) => {
        const items = Array.from(group.children) as HTMLElement[];
        if (!items.length) return;
        gsap.set(items, { y: 24 });
        ScrollTrigger.create({
          trigger: group,
          start: "top 85%",
          once: true,
          onEnter: () =>
            gsap.to(items, {
              y: 0,
              opacity: 1,
              duration: dur.reveal,
              ease: ease.outExpo,
              stagger: Math.min(stagger.card, stagger.cap / items.length),
              clearProps: "transform",
            }),
        });
      });

      /* Manifesto: words brighten as you read. */
      all("[data-words]").forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.18 },
          { opacity: 1, ease: "none", stagger: 0.05, scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 55%", scrub: 0.6 } },
        );
      });

      /* Parallax drift. */
      all("[data-parallax]").forEach((el) => {
        const d = Number(el.dataset.parallax) || 24;
        gsap.fromTo(el, { y: d }, { y: -d, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      });

      /* Product mock-ups play once when they enter: bars grow, bubbles pop, slots fill, numbers count. */
      all("[data-visual]").forEach((v) => {
        const bars = Array.from(v.querySelectorAll<HTMLElement>("[data-bar]"));
        const pops = Array.from(v.querySelectorAll<HTMLElement>("[data-pop]"));
        const fills = Array.from(v.querySelectorAll<HTMLElement>("[data-fill]"));
        const counts = Array.from(v.querySelectorAll<HTMLElement>("[data-count]"));
        const tl = gsap.timeline({ paused: true, defaults: { ease: ease.outExpo } });
        if (pops.length) tl.fromTo(pops, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.16, clearProps: "transform" }, 0);
        if (bars.length) tl.fromTo(bars, { scaleY: 0, opacity: 0, transformOrigin: "50% 100%" }, { scaleY: 1, opacity: 1, duration: 0.8, stagger: 0.06 }, 0.1);
        if (fills.length) tl.fromTo(fills, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2.4)", stagger: 0.1 }, 0.5);
        counts.forEach((c) => {
          const to = Number(c.dataset.count);
          const o = { v: 0 };
          tl.to(o, { v: to, duration: 1, ease: "power2.out", onUpdate: () => (c.textContent = String(Math.round(o.v))) }, 0.2);
        });
        ScrollTrigger.create({ trigger: v, start: "top 78%", once: true, onEnter: () => tl.play() });
      });

      /* Idle waveform: each bar breathes on its own beat; only runs while on screen. */
      all("[data-wave]").forEach((wave) => {
        const tweens = Array.from(wave.children).map((bar) =>
          gsap.to(bar, { scaleY: gsap.utils.random(0.45, 1.5), duration: gsap.utils.random(0.28, 0.6), repeat: -1, yoyo: true, ease: "sine.inOut", paused: true }),
        );
        ScrollTrigger.create({ trigger: wave, start: "top bottom", end: "bottom top", onToggle: (s) => tweens.forEach((t) => (s.isActive ? t.play() : t.pause())) });
      });
    });

    /* Sticky card stack (lemlist feature cards): the card being covered steps back. Large screens only. */
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      all("[data-stack]").forEach((stack) => {
        const cards = Array.from(stack.children) as HTMLElement[];
        cards.slice(0, -1).forEach((card, i) => {
          gsap.to(card, {
            scale: 0.95,
            transformOrigin: "50% 0%",
            ease: "none",
            scrollTrigger: { trigger: cards[i + 1], start: "top 80%", end: "top 112px", scrub: true },
          });
        });
      });
    });

    /* Buttons lean toward the pointer. Fine pointers only. */
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cleanups = all("[data-magnetic]").map((el) => {
        const qx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        const qy = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          qx((e.clientX - (r.left + r.width / 2)) * 0.22);
          qy((e.clientY - (r.top + r.height / 2)) * 0.3);
        };
        const leave = () => {
          qx(0);
          qy(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
      return () => cleanups.forEach((c) => c());
    });

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
