import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import DefaultThree from './r3f/default';

export default function Threejs() {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [2, 2, -2],
      }}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      style={{
        background: '#000000'
      }}
    >
      <DefaultThree />
    </Canvas>
  );
}
