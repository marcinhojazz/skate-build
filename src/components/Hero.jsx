// src/components/Hero.jsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber"; // Corrigido o import de useFrame
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";

const RotatingCube = () => {
  const meshRef = useRef();

  // Animação de rotação contínua
  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  useEffect(() => {
    gsap.to(meshRef.current.scale, { x: 2, y: 2, z: 2, duration: 1.5, repeat: -1, yoyo: true });
  }, []);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"#4FD1C5"} />
    </mesh>
  );
};

const Hero = () => {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingCube />
        <OrbitControls enableZoom={false} />
      </Canvas>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Welcome to My Portfolio
        </h1>
        <p className="mt-4 text-lg md:text-2xl">
          Crafting 3D experiences with <span className="text-teal-400">Three.js</span> & <span className="text-teal-400">React</span>
        </p>
        <button className="mt-8 bg-teal-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-teal-600 transition-all">
          Explore Projects
        </button>
      </div>
    </div>
  );
};

export default Hero;
