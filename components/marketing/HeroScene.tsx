"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A procedural scaffolding/space-frame lattice — a grid of structural bars
// with diagonal cross-bracing on the long faces, built once from raw line
// segments rather than a sourced/loaded model. Reads as structural steelwork
// (trusses, scaffolding) rather than a generic abstract shape, and costs
// nothing at runtime beyond a rigid group rotation — no per-frame geometry
// work, no textures, no postprocessing.
function buildLatticeGeometry() {
  const nx = 5;
  const ny = 3;
  const nz = 3;
  const w = 5.6;
  const h = 3.2;
  const d = 3.2;

  const node = (x: number, y: number, z: number) =>
    new THREE.Vector3((x / nx - 0.5) * w, (y / ny - 0.5) * h, (z / nz - 0.5) * d);

  const segments: [THREE.Vector3, THREE.Vector3][] = [];

  for (let x = 0; x <= nx; x++) {
    for (let y = 0; y <= ny; y++) {
      for (let z = 0; z <= nz; z++) {
        if (x < nx) segments.push([node(x, y, z), node(x + 1, y, z)]);
        if (y < ny) segments.push([node(x, y, z), node(x, y + 1, z)]);
        if (z < nz) segments.push([node(x, y, z), node(x, y, z + 1)]);
      }
    }
  }

  // Diagonal cross-bracing on the two long side faces only (z = 0, z = nz),
  // alternating direction per cell — the classic Warren-truss zigzag.
  for (let x = 0; x < nx; x++) {
    for (let y = 0; y < ny; y++) {
      const flip = (x + y) % 2 === 0;
      for (const z of [0, nz]) {
        segments.push(
          flip
            ? [node(x, y, z), node(x + 1, y + 1, z)]
            : [node(x + 1, y, z), node(x, y + 1, z)],
        );
      }
    }
  }

  const positions = new Float32Array(segments.length * 6);
  segments.forEach(([a, b], i) => {
    positions.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geometry;
}

function Lattice() {
  const group = useRef<THREE.Group>(null);
  const autoRotation = useRef(0);
  const geometry = useMemo(() => buildLatticeGeometry(), []);

  useFrame((state, delta) => {
    if (!group.current) return;
    autoRotation.current += delta * 0.05;
    // Ambient auto-rotation plus a small, damped pointer-driven tilt — no
    // orbit controls, nothing that reads as "interactive toy."
    const targetY = autoRotation.current + state.pointer.x * 0.12;
    const targetX = state.pointer.y * 0.1;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
  });

  return (
    <group ref={group}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="#ff6600" transparent opacity={0.22} />
      </lineSegments>
    </group>
  );
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={() => onReady?.()}
    >
      <Lattice />
    </Canvas>
  );
}
