import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { ScrollControls, useScroll } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Plane() {
  const refPlane = useRef<THREE.Mesh>(null);
  const data = useScroll();

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `,
    wireframe: true,
    side: THREE.DoubleSide,
  });

  useFrame((state, delta) => {
    const amountScroll = data.range(0, 1);

    if (refPlane.current) {
      refPlane.current.rotation.x = amountScroll * Math.PI * 2;
    }
  });

  return (
    <mesh ref={refPlane} material={material} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[1, 1, 32, 32]} />
    </mesh>
  );
}

export default function DemoThree() {
  return (
    <Canvas
      camera={{
        fov: 50,
        near: 0.1,
        far: 200,
        position: [0, 0, -1.5],
      }}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      style={{
        background: '#000000'
      }}
    >
      <ScrollControls pages={3} damping={0.4}>
        <Plane />
      </ScrollControls>
    </Canvas>
  );
}
