// SkateConfigurator.jsx
import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Skateboard from './Skateboard';
import ColorPicker from './ColorPicker';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';
import CameraController from './CameraController';

const SkateConfigurator = () => {
  // Estados para as cores e textura dos componentes
  const [shapeTopColor, setShapeTopColor] = useState('#ff0000');
  const [shapeBottomColor, setShapeBottomColor] = useState('#0000ff');
  const [shapeBottomTexture, setShapeBottomTexture] = useState(null);
  const [truckColor, setTruckColor] = useState('#808080');
  const [wheelColor, setWheelColor] = useState('#ffffff');

  // Estado para a posição e nome do item alvo da câmera
  const [cameraTarget, setCameraTarget] = useState({ position: null, itemName: null });
  const controlsRef = useRef();

  // Função para lidar com o clique nos itens
  const handleItemClick = (itemName, event) => {
    const position = new THREE.Vector3();
    event.object.getWorldPosition(position);
    setCameraTarget({ position, itemName });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <Canvas camera={{ position: [0, 5, 12] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls ref={controlsRef} />

        {/* Controlador da câmera */}
        <CameraController cameraTarget={cameraTarget} controlsRef={controlsRef} />

        <Skateboard
          shapeTopColor={shapeTopColor}
          shapeBottomColor={shapeBottomColor}
          shapeBottomTexture={shapeBottomTexture}
          truckColor={truckColor}
          wheelColor={wheelColor}
          onItemClick={handleItemClick}
        />
      </Canvas>

      {/* Controles de cor e textura */}
      <div style={controlsStyle}>
        <ColorPicker
          label="Cor do Shape (Topo)"
          color={shapeTopColor}
          setColor={setShapeTopColor}
        />
        <ColorPicker
          label="Cor do Shape (Parte de Baixo)"
          color={shapeBottomColor}
          setColor={setShapeBottomColor}
        />
        {/* Input de arquivo para a textura do shape */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Textura do Shape (Parte de Baixo):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  setShapeBottomTexture(event.target.result);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
        <ColorPicker
          label="Cor do Truck"
          color={truckColor}
          setColor={setTruckColor}
        />
        <ColorPicker
          label="Cor das Rodinhas"
          color={wheelColor}
          setColor={setWheelColor}
        />
      </div>
    </div>
  );
};

const controlsStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  zIndex: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '10px',
  borderRadius: '8px',
};

export default SkateConfigurator;
