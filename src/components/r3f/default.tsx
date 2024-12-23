import { CameraControls, Grid } from '@react-three/drei';

export default function DefaultReact() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CameraControls />
      <mesh receiveShadow castShadow position={[0, 1, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
      <Grid position={[0, 0, 0]}  infiniteGrid={true} fadeDistance={20} />
    </>
  );
}

