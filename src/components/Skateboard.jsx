// Skateboard.jsx
import React, { useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

const Skateboard = ({
  shapeTopColor,
  shapeBottomColor,
  shapeBottomTexture,
  truckColor,
  wheelColor,
  onItemClick,
}) => {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (shapeBottomTexture) {
      const loader = new THREE.TextureLoader();
      loader.load(shapeBottomTexture, (tex) => {
        setTexture(tex);
      });
    } else {
      setTexture(null);
    }
  }, [shapeBottomTexture]);

  const materials = useMemo(() => {
    const matArray = [
      new THREE.MeshStandardMaterial({ color: shapeTopColor }), // Lado direito
      new THREE.MeshStandardMaterial({ color: shapeTopColor }), // Lado esquerdo
      new THREE.MeshStandardMaterial({ color: shapeTopColor }), // Topo
      new THREE.MeshStandardMaterial({ color: shapeBottomColor }), // Fundo
      new THREE.MeshStandardMaterial({ color: shapeTopColor }), // Frente
      new THREE.MeshStandardMaterial({ color: shapeTopColor }), // Traseira
    ];

    if (texture) {
      matArray[3] = new THREE.MeshStandardMaterial({ map: texture });
    }

    return matArray;
  }, [shapeTopColor, shapeBottomColor, texture]);

  // Funções de clique
  const handleShapeClick = (event) => {
    event.stopPropagation();
    const position = new THREE.Vector3();
    event.object.getWorldPosition(position);

    // Determinar qual face foi clicada
    const faceIndex = event.faceIndex;
    const faceNumber = Math.floor(faceIndex / 2);

    if (faceNumber === 3) {
      // Face inferior
      onItemClick('shapeBottom', event);
    } else {
      onItemClick('shape', event);
    }
  };

  const handleTruckClick = (event) => {
    event.stopPropagation();
    onItemClick('truck', event);
  };

  const handleWheelClick = (event) => {
    event.stopPropagation();
    onItemClick('wheel', event);
  };

  return (
    <>
      {/* Shape (Prancha) */}
      <mesh position={[0, 0, 0]} material={materials} onClick={handleShapeClick}>
        <boxGeometry args={[8, 0.2, 2]} />
      </mesh>

      {/* Truck dianteiro */}
      <mesh position={[-2.5, -0.3, 0]} onClick={handleTruckClick}>
        <boxGeometry args={[2, 0.3, 1]} />
        <meshStandardMaterial color={truckColor} />
      </mesh>

      {/* Truck traseiro */}
      <mesh position={[2.5, -0.3, 0]} onClick={handleTruckClick}>
        <boxGeometry args={[2, 0.3, 1]} />
        <meshStandardMaterial color={truckColor} />
      </mesh>

      {/* Rodinhas dianteiras */}
      <Wheel position={[-2.5, -0.8, -0.6]} wheelColor={wheelColor} onClick={handleWheelClick} />
      <Wheel position={[-2.5, -0.8, 0.6]} wheelColor={wheelColor} onClick={handleWheelClick} />

      {/* Rodinhas traseiras */}
      <Wheel position={[2.5, -0.8, -0.6]} wheelColor={wheelColor} onClick={handleWheelClick} />
      <Wheel position={[2.5, -0.8, 0.6]} wheelColor={wheelColor} onClick={handleWheelClick} />
    </>
  );
};

const Wheel = ({ position, wheelColor, onClick }) => {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]} onClick={onClick}>
      <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
      <meshStandardMaterial color={wheelColor} />
    </mesh>
  );
};

export default Skateboard;
