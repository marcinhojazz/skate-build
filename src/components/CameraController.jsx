// CameraController.jsx
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import gsap from 'gsap';

const CameraController = ({ cameraTarget, controlsRef }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (cameraTarget && cameraTarget.position) {
      const { position, itemName } = cameraTarget;
      let newCameraPosition = { x: 0, y: 0, z: 0 };
      let duration = 1;

      // Ajustar a posição da câmera com base no item clicado
      if (itemName === 'wheel') {
        // Focar na rodinha clicada
        newCameraPosition = {
          x: position.x + 0.5, // Ajuste conforme necessário
          y: position.y + 0.5,
          z: position.z + 1.5, // Ajuste conforme necessário
        };
      } else if (itemName === 'truck') {
        // Focar no truck clicado
        newCameraPosition = {
          x: position.x,
          y: position.y + 1,
          z: position.z + 4, // Ajuste conforme necessário
        };
      } else if (itemName === 'shape') {
        // Visão em perspectiva do shape
        newCameraPosition = {
          x: position.x,
          y: position.y + 3,
          z: position.z + 8, // Ajuste conforme necessário
        };
      } else if (itemName === 'shapeBottom') {
        // Enquadrar a face inferior do shape
        newCameraPosition = {
          x: position.x,
          y: position.y - 3,
          z: position.z,
        };
      }

      // Animação da posição da câmera
      gsap.to(camera.position, {
        x: newCameraPosition.x,
        y: newCameraPosition.y,
        z: newCameraPosition.z,
        duration,
        onUpdate: () => {
          camera.lookAt(position.x, position.y, position.z);
          camera.updateProjectionMatrix();
        },
      });

      // Animação do alvo dos controles
      if (controlsRef && controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: position.x,
          y: position.y,
          z: position.z,
          duration,
          onUpdate: () => {
            controlsRef.current.update();
          },
        });
      }
    }
  }, [cameraTarget, camera, controlsRef]);

  return null;
};

export default CameraController;
