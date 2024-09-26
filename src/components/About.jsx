// src/components/About.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

const AnimatedSphere = () => {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#4FD1C5"
        attach="material"
        distort={0.4} // A quantidade de distorção
        speed={2} // Velocidade da distorção
        roughness={0.1}
      />
    </Sphere>
  );
};

const About = () => {
  return (
    <div className="relative h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
      <div className="absolute inset-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      <div className="relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold">
          Sobre Mim
        </h2>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Sou um desenvolvedor frontend especializado em criar experiências interativas e imersivas na web usando <span className="text-teal-400">Three.js</span> e <span className="text-teal-400">React</span>. Combinando criatividade e tecnologia, transformo ideias em interfaces visuais impactantes.
        </p>
        <p className="mt-2 text-lg md:text-xl max-w-2xl mx-auto">
          Minha paixão por tecnologia me impulsiona a explorar novas possibilidades em interfaces 3D, sempre buscando entregar o melhor para os meus clientes e projetos.
        </p>
      </div>
    </div>
  );
};

export default About;
