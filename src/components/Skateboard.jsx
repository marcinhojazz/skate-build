// Skateboard.jsx
import React, { useMemo, useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { Edges, Html } from '@react-three/drei';

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

  // Estados de hover para cada parte
  const [hoveredItem, setHoveredItem] = useState(null);

  // Funções de clique e hover
  const handleShapeClick = (event) => {
    event.stopPropagation();
    onItemClick('shape', event);
  };

  const handleShapeHover = (hovered) => (event) => {
    event.stopPropagation();
    if (hovered) {
      setHoveredItem({ name: 'Shape', position: event.point });
    } else {
      setHoveredItem(null);
    }
  };

  const handleTruckClick = (event) => {
    event.stopPropagation();
    onItemClick('truck', event);
  };

  const handleTruckHover = (hovered) => (event) => {
    event.stopPropagation();
    if (hovered) {
      setHoveredItem({ name: 'Truck', position: event.point });
    } else {
      setHoveredItem(null);
    }
  };

  const handleWheelClick = (event) => {
    event.stopPropagation();
    onItemClick('wheel', event);
  };

  const handleWheelHover = (hovered) => (event) => {
    event.stopPropagation();
    if (hovered) {
      setHoveredItem({ name: 'Rodinha', position: event.point });
    } else {
      setHoveredItem(null);
    }
  };

  return (
    <>
      {/* Shape (Prancha) */}
      <mesh
        position={[0, 0, 0]}
        material={materials}
        onClick={handleShapeClick}
        onPointerOver={handleShapeHover(true)}
        onPointerOut={handleShapeHover(false)}
      >
        <boxGeometry args={[8, 0.2, 2]} />
        {hoveredItem && hoveredItem.name === 'Shape' && (
          <>
            <Edges scale={1.05} threshold={15} color="cyan" />
            <mesh>
              <boxGeometry args={[8.1, 0.21, 2.1]} />
              <meshStandardMaterial color="cyan" opacity={0.2} transparent={true} />
            </mesh>
            <Html position={[0, 1, 0]}>
              <div style={popoverStyle}>{hoveredItem.name}</div>
            </Html>
          </>
        )}
      </mesh>

      {/* Truck dianteiro */}
      <mesh
        position={[-2.5, -0.3, 0]}
        onClick={handleTruckClick}
        onPointerOver={handleTruckHover(true)}
        onPointerOut={handleTruckHover(false)}
      >
        <boxGeometry args={[2, 0.3, 1]} />
        <meshStandardMaterial color={truckColor} />
        {hoveredItem && hoveredItem.name === 'Truck' && (
          <>
            <Edges scale={1.05} threshold={15} color="cyan" />
            <mesh>
              <boxGeometry args={[2.1, 0.31, 1.1]} />
              <meshStandardMaterial color="cyan" opacity={0.2} transparent={true} />
            </mesh>
            <Html position={[-2.5, 0.5, 0]}>
              <div style={popoverStyle}>{hoveredItem.name}</div>
            </Html>
          </>
        )}
      </mesh>

      {/* Truck traseiro */}
      <mesh
        position={[2.5, -0.3, 0]}
        onClick={handleTruckClick}
        onPointerOver={handleTruckHover(true)}
        onPointerOut={handleTruckHover(false)}
      >
        <boxGeometry args={[2, 0.3, 1]} />
        <meshStandardMaterial color={truckColor} />
        {hoveredItem && hoveredItem.name === 'Truck' && (
          <>
            <Edges scale={1.05} threshold={15} color="cyan" />
            <mesh>
              <boxGeometry args={[2.1, 0.31, 1.1]} />
              <meshStandardMaterial color="cyan" opacity={0.2} transparent={true} />
            </mesh>
            <Html position={[2.5, 0.5, 0]}>
              <div style={popoverStyle}>{hoveredItem.name}</div>
            </Html>
          </>
        )}
      </mesh>

      {/* Rodinhas dianteiras */}
      <Wheel
        position={[-2.5, -0.8, -0.6]}
        wheelColor={wheelColor}
        onClick={handleWheelClick}
        onPointerOver={handleWheelHover(true)}
        onPointerOut={handleWheelHover(false)}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
      />
      <Wheel
        position={[-2.5, -0.8, 0.6]}
        wheelColor={wheelColor}
        onClick={handleWheelClick}
        onPointerOver={handleWheelHover(true)}
        onPointerOut={handleWheelHover(false)}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
      />

      {/* Rodinhas traseiras */}
      <Wheel
        position={[2.5, -0.8, -0.6]}
        wheelColor={wheelColor}
        onClick={handleWheelClick}
        onPointerOver={handleWheelHover(true)}
        onPointerOut={handleWheelHover(false)}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
      />
      <Wheel
        position={[2.5, -0.8, 0.6]}
        wheelColor={wheelColor}
        onClick={handleWheelClick}
        onPointerOver={handleWheelHover(true)}
        onPointerOut={handleWheelHover(false)}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
      />
    </>
  );
};

const Wheel = ({
  position,
  wheelColor,
  onClick,
  onPointerOver,
  onPointerOut,
  hoveredItem,
  setHoveredItem,
}) => {
  return (
    <mesh
      position={position}
      rotation={[Math.PI / 2, 0, 0]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
      <meshStandardMaterial color={wheelColor} />
      {hoveredItem && hoveredItem.name === 'Rodinha' && (
        <>
          <Edges scale={1.05} threshold={15} color="cyan" />
          <mesh>
            <cylinderGeometry args={[0.42, 0.42, 0.42, 32]} />
            <meshStandardMaterial color="cyan" opacity={0.2} transparent={true} />
          </mesh>
          <Html position={[0, 0, 0]}>
            <div style={popoverStyle}>{hoveredItem.name}</div>
          </Html>
        </>
      )}
    </mesh>
  );
};

// Estilo para o popover
const popoverStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '5px',
  fontSize: '14px',
};

export default Skateboard;
