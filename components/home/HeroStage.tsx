"use client";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { HeroScene } from "./visuals";
import type { HeroScene3DProps } from "./HeroScene3D";
import { cn } from "@/lib/utils";

/**
 * Hero scene switcher. The SVG crew scene is the baseline and always renders. The WebGL scene loads only when it is
 * likely to be good: a wide screen, a mouse, no reduced-motion preference, WebGL available. It loads after first paint
 * (idle callback) so it never delays the page, pauses off screen, and steps aside for the SVG if frames run slow.
 * Switch off with NEXT_PUBLIC_HERO_3D=off, or add ?hero3d=force to skip the speed guard when testing.
 */
export function HeroStage() {
  const wrap = useRef<HTMLDivElement>(null);
  const [Scene, setScene] = useState<ComponentType<HeroScene3DProps> | null>(null);
  const [ready, setReady] = useState(false);
  const [dropped, setDropped] = useState(false);
  const [active, setActive] = useState(true);
  const [guard, setGuard] = useState(true);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_HERO_3D === "off") return;
    let dead = false;
    try {
      if (sessionStorage.getItem("hero3d-dropped") === "1") return;
    } catch {}
    const force = new URLSearchParams(window.location.search).get("hero3d") === "force";
    setGuard(!force);
    const good = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    const gl = (() => {
      try {
        return !!document.createElement("canvas").getContext("webgl2");
      } catch {
        return false;
      }
    })();
    if (!good || !gl) return;
    const start = () => import("./HeroScene3D").then((m) => !dead && setScene(() => m.default)).catch(() => {});
    const w = window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 2500 }) : window.setTimeout(start, 1200);
    return () => {
      dead = true;
      if (w.requestIdleCallback) (window as unknown as { cancelIdleCallback: (n: number) => void }).cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show3d = Scene && !dropped;
  return (
    <div ref={wrap} className="relative h-full w-full">
      <div className={cn("absolute inset-0 transition-opacity duration-500", ready && show3d ? "opacity-0" : "opacity-100")}>
        <HeroScene />
      </div>
      {show3d && (
        <div className={cn("absolute inset-0 transition-opacity duration-500", ready ? "opacity-100" : "opacity-0")}>
          <Scene
            active={active}
            guard={guard}
            onReady={() => setReady(true)}
            onDegrade={() => {
              setDropped(true);
              setReady(false);
              try {
                sessionStorage.setItem("hero3d-dropped", "1");
              } catch {}
            }}
          />
        </div>
      )}
    </div>
  );
}
