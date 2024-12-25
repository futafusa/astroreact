import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import DefaultThree from './r3f/default';
import TestScene from './r3f/testScene';
import DemoThree from './r3f/demoThree';
import CustomShader from './r3f/customShader';

export default function Threejs() {
  return (
    <>
      {/* <DefaultThree /> */}
      {/* <TestScene /> */}
      {/* <DemoThree /> */}
      <CustomShader />
    </>
  );
}
