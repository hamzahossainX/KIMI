"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Sculpture() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = t * 0.18;
    mesh.current.rotation.y = t * 0.25;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.4}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1.15, 0.36, 240, 48]} />
        <MeshDistortMaterial
          color="#6d28d9"
          metalness={0.95}
          roughness={0.12}
          distort={0.32}
          speed={2.2}
        />
      </mesh>
    </Float>
  );
}

function PointerRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.45,
      0.045
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.25,
      0.045
    );
  });
  return <group ref={group}>{children}</group>;
}

export default function CanvasScene() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={["#050505", 7, 14]} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 6, 6]} intensity={1.6} color="#e9d5ff" />
        <pointLight position={[-6, -3, 2]} intensity={12} color="#a3e635" />
        <pointLight position={[6, 2, -4]} intensity={18} color="#7c3aed" />
        <PointerRig>
          <Sculpture />
        </PointerRig>
        <Sparkles count={140} scale={[12, 8, 8]} size={1.6} speed={0.35} color="#a3e635" opacity={0.55} />
      </Canvas>
    </div>
  );
}
