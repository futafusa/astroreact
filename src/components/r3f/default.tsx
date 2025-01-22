import { CameraControls, Grid } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import vertexShader from '../../shaders/default/vertex.glsl';
import fragmentShader from '../../shaders/default/fragment.glsl';

export default function DefaultReact() {
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });

  const material2 = new CustomShaderMaterial({
    baseMaterial: THREE.MeshPhysicalMaterial,
    vertexShader: `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      void main() {
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
      }
    `,
  });

  return (
    <>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <CameraControls />
        <mesh receiveShadow castShadow position={[0, 1, 0]} material={material2}>
          <boxGeometry />
        </mesh>
        <Grid position={[0, 0, 0]}  infiniteGrid={true} fadeDistance={20} />
      </Canvas>
    </>
  );
}
