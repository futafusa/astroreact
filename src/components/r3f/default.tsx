import { CameraControls } from '@react-three/drei';

export default function DefaultReact() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CameraControls />
      <mesh receiveShadow castShadow>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
}

