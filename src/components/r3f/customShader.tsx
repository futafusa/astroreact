import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CameraControls, Grid, Environment } from '@react-three/drei';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import vertexShader from '../../shaders/wobble/vertex.glsl';
import fragmentShader from '../../shaders/wobble/fragment.glsl';

function CustomObject() {  
  const uniforms = {
    uTime: { value: 0 },
    uPositionFrequency: { value: 0.5 },
    uTimeFrequency: { value: 0.5 },
    uStrength: { value: 0.5 },
    uWarpPositionFrequency: { value: 0.28 },
    uWarpTimeFrequency: { value: 0.12 },
    uWarpStrength: { value: 1.7 },
    uColorA: { value: new THREE.Color(0.0, 0.0, 1.0) },
    uColorB: { value: new THREE.Color(1.0, 0.0, 0.0) },
  }

  const material = new CustomShaderMaterial({
    baseMaterial: THREE.MeshPhysicalMaterial,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    metalness: 1.0,
    roughness: 0.1,
    // color: new THREE.Color(1.0, 0.0, 0.0),
    // wireframe: true,
    uniforms: uniforms, 
  });

  const depthMaterial = new CustomShaderMaterial({
    baseMaterial: THREE.MeshDepthMaterial,
    vertexShader: vertexShader,
    depthPacking: THREE.RGBADepthPacking,
    uniforms: uniforms,
  })

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
  })

  return (
    <mesh material={material} customDepthMaterial={depthMaterial}>
      <icosahedronGeometry args={[1, 32]} />
    </mesh>
  );
}

export default function CustomShader() {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [2, 2, -1.5],
      }}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      style={{
        background: '#000000'
      }}
    >
      <Environment preset="sunset" background={true} backgroundIntensity={0.5} />
      <CameraControls makeDefault />

      <CustomObject />

      <Grid position={[0, -2, 0]} infiniteGrid={true} fadeDistance={20} />
    </Canvas>
  );
}