import { Canvas, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CameraControls, ScrollControls, shaderMaterial, useScroll } from '@react-three/drei';

function Sphere() {
  const data = useScroll();
  const ref = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, '/sample1.png');

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uTexture: { value: texture },
    },
    vertexShader: `
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      uniform float uTime;
      uniform float uScroll;
      varying vec2 vUv;
      
      void main() {
        vec3 pos = position;
        
        float distortionStrength = uScroll;
        
        float wave = sin(position.x * 12.0 + uTime) * 0.2 * distortionStrength;
        wave += cos(position.y * 16.0 + uTime) * 0.15 * distortionStrength;
        
        float noise = random(pos.xy) * 0.05 * distortionStrength * 10.0;
        pos.z += wave + noise;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        vUv = uv;
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      varying vec2 vUv;

      void main() {
        vec4 texColor = texture2D(uTexture, vUv);
        gl_FragColor = texColor;
      }
    `,
    // wireframe: true,
    side: THREE.DoubleSide,
  });

  useFrame((state, delta) => {
    const amountScroll = data.range(0, 1);
    // console.log(amountScroll);

    if (ref.current) {
      material.uniforms.uTime.value += delta;
      material.uniforms.uScroll.value = amountScroll;
      ref.current.rotation.x = amountScroll * Math.PI * 2;
      ref.current.rotation.y = amountScroll * Math.PI * 2;
    }
  });

  return (
    <mesh ref={ref} material={material} rotation={[0, 0, 0]}>
      <planeGeometry args={[1, 1, 32, 32]} />
    </mesh>
  );
}

export default function TestScene() {
  return (
    <Canvas
      camera={{
        fov: 45,
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
      {/* <ambientLight intensity={1.0} /> */}
      {/* <pointLight position={[10, 10, 10]} /> */}
      {/* <CameraControls /> */}

      <ScrollControls pages={3} damping={0.4}>
        <Sphere />
      </ScrollControls>
    </Canvas>
  );
}
