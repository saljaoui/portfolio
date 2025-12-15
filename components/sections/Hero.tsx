"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// 3D Scene Component
function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.007;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial color="#00ff88" emissive="#00aa44" />
    </mesh>
  );
}

function Scene3D() {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#00ff88" />

      {/* Objects */}
      <RotatingCube />
    </>
  );
}

export default function Hero() {
  return (
    <section className="w-screen h-screen flex-shrink-0 bg-black text-white overflow-hidden flex items-center justify-center relative">
      {/* 3D Canvas - Background */}
      <Canvas
        className="absolute inset-0 z-0"
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ pointerEvents: "none",
          position: 'absolute'
         }}
      >
        <Scene3D />
      </Canvas>

      {/* Text content - Foreground */}
      <div className="relative z-30 text-center">
        <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">Hero Section</h1>
        <p className="text-sm font-mono text-gray-400 uppercase tracking-widest drop-shadow-lg">
          3D Interactive Experience
        </p>
      </div>
    </section>
  );
}
