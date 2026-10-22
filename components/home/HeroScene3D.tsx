"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import type { CastId } from "@/lib/content";
import { cast } from "@/lib/content";

/**
 * Hero scene in WebGL: the Brick Crew as real 3D toy bricks (rounded bricks, cylinder studs, clear-coat plastic) with an ink
 * outline so they match the flat brand look. Lazy-loaded by HeroStage, which keeps the SVG scene as the fallback.
 * Quality guard: if frames stay slow it asks HeroStage to drop back to the SVG scene. Pointer-driven motion is lerped (0.08).
 */

const INK = "#0B1512", PAPER = "#FBFCF8", LIME = "#C8F169", VIOLET = "#7C5CFF", LILAC = "#CFC4FF";
const DARK = new Set(["#0B1512", "#14302A", "#7C5CFF"]);

/* ---------- shared geometry and materials (built once) ---------- */
const geoCache = new Map<string, THREE.BufferGeometry>();
const rbox = (w: number, h: number, d: number, r = 0.1) => {
  const k = `r${w}|${h}|${d}|${r}`;
  if (!geoCache.has(k)) geoCache.set(k, new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2.1, h / 2.1, d / 2.1)));
  return geoCache.get(k)!;
};
const cyl = (r: number, h: number, seg = 18) => {
  const k = `c${r}|${h}|${seg}`;
  if (!geoCache.has(k)) geoCache.set(k, new THREE.CylinderGeometry(r, r, h, seg));
  return geoCache.get(k)!;
};
const ball = (r: number) => {
  const k = `s${r}`;
  if (!geoCache.has(k)) geoCache.set(k, new THREE.SphereGeometry(r, 18, 14));
  return geoCache.get(k)!;
};
const ring = (r: number, tube: number, arc: number) => {
  const k = `t${r}|${tube}|${arc}`;
  if (!geoCache.has(k)) geoCache.set(k, new THREE.TorusGeometry(r, tube, 8, 28, arc));
  return geoCache.get(k)!;
};
const matCache = new Map<string, THREE.Material>();
const mat = (color: string, opts: { opacity?: number } = {}) => {
  const k = color + (opts.opacity ?? 1);
  if (!matCache.has(k)) {
    matCache.set(
      k,
      new THREE.MeshPhysicalMaterial({ color, roughness: 0.5, clearcoat: 0.55, clearcoatRoughness: 0.22, transparent: opts.opacity !== undefined, opacity: opts.opacity ?? 1 }),
    );
  }
  return matCache.get(k)!;
};
const inkMat = new THREE.MeshBasicMaterial({ color: INK, side: THREE.BackSide });

type V3 = [number, number, number];

/** One mesh with an inverted-hull ink outline. */
function Part({ geo, color, pos = [0, 0, 0], rot = [0, 0, 0], scale = 1, outline = 1.09, opacity }: { geo: THREE.BufferGeometry; color: string; pos?: V3; rot?: V3; scale?: number | V3; outline?: number | null; opacity?: number }) {
  return (
    <group position={pos} rotation={rot} scale={scale as number}>
      <mesh geometry={geo} material={mat(color, { opacity })} />
      {outline ? <mesh geometry={geo} material={inkMat} scale={outline} /> : null}
    </group>
  );
}

function Brick({ size, color, pos, studs = 0, studRow = "x" }: { size: V3; color: string; pos: V3; studs?: number; studRow?: "x" }) {
  const [w, h, d] = size;
  return (
    <group position={pos}>
      <Part geo={rbox(w, h, d, 0.12)} color={color} />
      {Array.from({ length: studs }, (_, i) => (
        <Part key={i} geo={cyl(0.17, 0.14)} color={color} pos={[(w * (i + 0.5)) / studs - w / 2, h / 2 + 0.06, 0]} outline={1.12} />
      ))}
    </group>
  );
}

function Eye({ x, y, z, dark }: { x: number; y: number; z: number; dark: boolean }) {
  return (
    <group position={[x, y, z]}>
      {dark ? (
        <>
          <Part geo={ball(0.12)} color={PAPER} outline={null} />
          <Part geo={ball(0.07)} color={INK} pos={[0.01, 0, 0.07]} outline={null} />
        </>
      ) : (
        <Part geo={ball(0.1)} color={INK} outline={null} />
      )}
      <Part geo={ball(0.032)} color="#ffffff" pos={[-0.035, 0.04, 0.09]} outline={null} />
    </group>
  );
}

/** One crew member, built from bricks. `eyesRef` lets the frame loop blink them. */
function Crew({ id, eyesRef }: { id: CastId; eyesRef: (g: THREE.Group | null) => void }) {
  const c = cast.find((x) => x.id === id)!;
  const color = c.fill;
  const dark = DARK.has(color);
  const wide = id === "ledger";
  const bodyW = wide ? 2.05 : 1.55, bodyH = wide ? 0.72 : id === "tally" ? 1.2 : 0.95;
  const headW = wide ? 1.55 : id === "tally" ? 1.0 : 1.25, headH = wide ? 0.7 : id === "tally" ? 0.78 : 0.85;
  const headY = bodyH / 2 + headH / 2 - 0.02;
  const headStuds = wide ? 3 : 2;
  const faceZ = 0.95 / 2 + 0.01;

  return (
    <group>
      {/* feet, body, arms */}
      {[-0.4, 0.4].map((x) => (
        <Part key={x} geo={rbox(0.62, 0.16, 0.9, 0.06)} color={color} pos={[x * (wide ? 1.4 : 1), -bodyH / 2 - 0.06, 0.05]} outline={1.1} />
      ))}
      <Brick size={[bodyW, bodyH, 1]} color={color} pos={[0, 0, 0]} />
      {!wide &&
        [-1, 1].map((s) => (
          <group key={s} position={[s * (bodyW / 2 + 0.18), -0.02, 0]}>
            <Part geo={rbox(0.3, bodyH * 0.66, 0.42, 0.1)} color={color} />
            <Part geo={ball(0.17)} color={color} pos={[0, -bodyH * 0.38, 0]} outline={1.1} />
          </group>
        ))}
      <Brick size={[headW, headH, 0.95]} color={color} pos={[0, headY, 0]} studs={headStuds} />

      {/* face */}
      <group ref={eyesRef} position={[0, headY + 0.08, 0]}>
        {id === "tally" ? null : null}
        <Eye x={-headW * 0.24} y={0} z={faceZ} dark={dark} />
        <Eye x={headW * 0.24} y={0} z={faceZ} dark={dark} />
      </group>
      {id === "aria" ? (
        [0.08, 0.16, 0.24, 0.16, 0.08].map((h, i) => <Part key={i} geo={rbox(0.06, h, 0.05, 0.02)} color={INK} pos={[(i - 2) * 0.12, headY - 0.2, faceZ + 0.01]} outline={null} />)
      ) : id === "ledger" ? (
        <Part geo={rbox(0.2, 0.04, 0.04, 0.015)} color={INK} pos={[0, headY - 0.2, faceZ + 0.01]} outline={null} />
      ) : (
        <Part geo={ring(0.13, 0.026, Math.PI)} color={dark ? PAPER : INK} pos={[0, headY - 0.1, faceZ + 0.01]} rot={[0, 0, Math.PI]} outline={null} />
      )}

      {/* signatures */}
      {id === "aria" && (
        <>
          <Part geo={ring(headW * 0.58, 0.06, Math.PI)} color={INK} pos={[0, headY + 0.02, 0]} outline={null} />
          <Part geo={cyl(0.17, 0.16)} color={VIOLET} pos={[-headW * 0.58, headY + 0.02, 0]} rot={[0, 0, Math.PI / 2]} outline={1.12} />
          <Part geo={rbox(0.9, 0.5, 0.05, 0.05)} color={color} pos={[0, 0, 0.51]} outline={null} />
          {[-2, -1, 0, 1, 2].map((i) => [0.1, -0.1].map((j) => <Part key={`${i}${j}`} geo={ball(0.04)} color={INK} pos={[i * 0.17, j, 0.55]} outline={null} />))}
        </>
      )}
      {id === "echo" &&
        [1, 2].map((k) => (
          <Part key={k} geo={rbox(headW, headH, 0.95, 0.12)} color={LILAC} pos={[k * 0.55, headY + k * 0.22, -0.4 * k]} opacity={0.28 / k} outline={null} />
        ))}
      {id === "slot" && (
        <>
          <Part geo={rbox(1.0, 0.62, 0.06, 0.04)} color={PAPER} pos={[0, -0.02, 0.52]} outline={1.04} />
          <Part geo={rbox(1.0, 0.16, 0.07, 0.04)} color={LIME} pos={[0, 0.2, 0.53]} outline={null} />
          {[-0.36, -0.12, 0.12, 0.36].map((x) => [-0.04, -0.2].map((y) => <Part key={`${x}${y}`} geo={rbox(0.17, 0.12, 0.07, 0.03)} color={x === 0.12 && y === -0.04 ? LIME : "#E4E9DD"} pos={[x, y, 0.53]} outline={null} />))}
        </>
      )}
      {id === "boomerang" && (
        <>
          <Part geo={ring(0.42, 0.11, Math.PI * 1.15)} color={LIME} pos={[bodyW / 2 + 0.55, 0.15, 0]} rot={[0, 0, Math.PI * 0.55]} outline={1.12} />
          <Part geo={rbox(0.9, 0.5, 0.05, 0.05)} color={"#6a4de0"} pos={[0, 0, 0.51]} outline={null} />
        </>
      )}
      {id === "tally" && (
        <>
          <Part geo={rbox(1.0, 0.8, 0.06, 0.05)} color={PAPER} pos={[0, -0.02, 0.52]} outline={1.04} />
          {[0, 1, 2, 3].map((i) => <Part key={i} geo={rbox(0.15, 0.14 + i * 0.12, 0.08, 0.03)} color={i === 3 ? LIME : VIOLET} pos={[-0.33 + i * 0.22, -0.3 + (0.14 + i * 0.12) / 2, 0.54]} outline={null} />)}
          {[-1, 1].map((s) => <Part key={s} geo={ring(0.17, 0.03, Math.PI * 2)} color={INK} pos={[s * headW * 0.24, headY + 0.08, faceZ + 0.02]} outline={null} />)}
        </>
      )}
      {id === "gate" && (
        <>
          <Part geo={rbox(0.62, 0.78, 0.06, 0.2)} color={INK} pos={[0, -0.06, 0.52]} outline={null} />
          <Part geo={rbox(0.42, 0.74, 0.06, 0.06)} color={LIME} pos={[0.34, -0.06, 0.62]} rot={[0, -0.9, 0]} outline={1.05} />
        </>
      )}
      {id === "ledger" && (
        <>
          <Part geo={rbox(1.5, 0.46, 0.06, 0.05)} color={PAPER} pos={[0, -0.04, 0.52]} outline={1.04} />
          <Part geo={cyl(0.13, 0.04, 20)} color={LIME} pos={[0.5, -0.02, 0.56]} rot={[Math.PI / 2, 0, 0]} outline={null} />
          <Part geo={cyl(0.05, 0.6, 12)} color={LIME} pos={[0.55, headY + headH / 2 + 0.28, 0.1]} rot={[0.2, 0, -0.35]} outline={1.3} />
        </>
      )}
    </group>
  );
}

/** Ring layout around the core; depth drives how far each leans with the pointer. */
const spots: [CastId, number, number, number][] = [
  ["aria", -3.1, 2.0, 0.1], ["echo", -0.1, 2.9, -0.5], ["slot", 3.2, 1.8, 0.2], ["boomerang", 3.6, -0.5, -0.2], ["tally", 2.2, -2.5, 0.3], ["gate", -0.2, -2.75, 0.1], ["ledger", -3.75, -0.95, -0.3],
];

const easeBack = (p: number) => 1 + 2.1 * Math.pow(p - 1, 3) + 1.1 * Math.pow(p - 1, 2);

function Env() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const env = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.3;
    return () => {
      scene.environment = null;
      env.dispose();
      pm.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Scene({ guard, onReady, onDegrade, pointer }: { guard: boolean; onReady: () => void; onDegrade: () => void; pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const groups = useRef<(THREE.Group | null)[]>([]);
  const eyes = useRef<(THREE.Group | null)[]>([]);
  const core = useRef<THREE.Group>(null);
  const world = useRef<THREE.Group>(null);
  const sm = useRef({ x: 0, y: 0 });
  const stats = useRef({ ema: 0.016, slowSince: 0, ready: false, frames: 0 });
  const nextBlink = useRef(spots.map((_, i) => 1.5 + i * 0.7));
  const logo = useMemo(() => {
    const t = new THREE.TextureLoader().load("/brand/conclave-mark.svg");
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, []);
  const lines = useMemo(
    () =>
      spots.map(() => {
        const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
        const l = new THREE.Line(g, new THREE.LineDashedMaterial({ color: INK, dashSize: 0.14, gapSize: 0.18, transparent: true, opacity: 0.4 }));
        l.frustumCulled = false;
        return l;
      }),
    [],
  );

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    sm.current.x += (pointer.current.x - sm.current.x) * 0.08;
    sm.current.y += (pointer.current.y - sm.current.y) * 0.08;
    if (world.current) {
      world.current.rotation.y = sm.current.x * 0.22;
      world.current.rotation.x = -sm.current.y * 0.12;
    }
    if (core.current) {
      core.current.rotation.y = Math.sin(t * 0.6) * 0.12 + sm.current.x * 0.2;
      core.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.012);
    }
    spots.forEach(([, x, y, z], i) => {
      const g = groups.current[i];
      if (!g) return;
      const p = Math.min(Math.max((t - (0.5 + i * 0.1)) / 0.9, 0), 1);
      const e = p === 0 ? 0 : easeBack(p);
      g.visible = p > 0;
      const bob = Math.sin(t * 0.7 + i * 1.7) * 0.12;
      g.position.set(x - sm.current.x * 0.35 * (1 + i * 0.05), y + bob + (1 - e) * 5, z);
      g.scale.setScalar(0.5 + 0.5 * e);
      g.rotation.y = sm.current.x * 0.5 + Math.sin(t * 0.5 + i) * 0.1;
      g.rotation.x = -sm.current.y * 0.12;
      const pos = lines[i].geometry.attributes.position as THREE.BufferAttribute;
      pos.setXYZ(0, g.position.x, g.position.y, g.position.z);
      pos.setXYZ(1, 0, 0, 0);
      pos.needsUpdate = true;
      lines[i].computeLineDistances();
      lines[i].visible = p > 0.5;
      // blink
      const eg = eyes.current[i];
      if (eg) {
        if (t > nextBlink.current[i]) {
          const k = (t - nextBlink.current[i]) / 0.16;
          eg.scale.y = k < 0.5 ? 1 - k * 1.8 : k < 1 ? 0.1 + (k - 0.5) * 1.8 : 1;
          if (k >= 1) nextBlink.current[i] = t + 2.2 + ((i * 1.31 + t) % 3.4);
        } else eg.scale.y = 1;
      }
    });

    // quality guard: smoothed frame time; if it stays above ~24ms for 2s (after warm-up) ask to drop to the SVG scene
    const s = stats.current;
    s.frames += 1;
    s.ema += (dt - s.ema) * 0.1;
    if (!s.ready && s.frames === 3) {
      s.ready = true;
      onReady();
    }
    if (guard && s.frames > 90) {
      if (s.ema > 0.024) {
        s.slowSince ||= t;
        if (t - s.slowSince > 2) onDegrade();
      } else s.slowSince = 0;
    }
  });

  return (
    <>
      <Env />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 7]} intensity={1.15} />
      <directionalLight position={[-4, -2, 3]} intensity={0.25} color={LILAC} />
      <group ref={world} scale={0.86}>
        <group ref={core}>
          <Part geo={rbox(1.9, 1.9, 0.7, 0.34)} color={PAPER} outline={1.05} />
          <mesh position={[0, 0, 0.36]}>
            <planeGeometry args={[1.35, 1.35]} />
            <meshBasicMaterial map={logo} transparent toneMapped={false} />
          </mesh>
          <Part geo={ball(0.1)} color={VIOLET} pos={[0.82, 0.82, 0.4]} outline={null} />
        </group>
        {lines.map((l, i) => <primitive key={i} object={l} />)}
        {spots.map(([id], i) => (
          <group key={id} ref={(g) => void (groups.current[i] = g)} visible={false}>
            <Crew id={id} eyesRef={(g) => void (eyes.current[i] = g)} />
          </group>
        ))}
      </group>
    </>
  );
}

export interface HeroScene3DProps {
  active: boolean;
  guard: boolean;
  onReady: () => void;
  onDegrade: () => void;
}

export default function HeroScene3D({ active, guard, onReady, onDegrade }: HeroScene3DProps) {
  const pointer = useRef({ x: 0, y: 0 });
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const r = box.current?.getBoundingClientRect();
      if (!r) return;
      pointer.current.x = Math.max(-1, Math.min(1, ((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 2));
      pointer.current.y = Math.max(-1, Math.min(1, ((e.clientY - (r.top + r.height / 2)) / window.innerHeight) * 2));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div ref={box} className="h-full w-full" data-hero-3d>
      <Canvas
        flat
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 14], fov: 32 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        style={{ pointerEvents: "none" }}
      >
        <Scene guard={guard} onReady={onReady} onDegrade={onDegrade} pointer={pointer} />
      </Canvas>
    </div>
  );
}
