import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import DefaultThree from './r3f/default';
import TestScene from './r3f/testScene';
import DemoThree from './r3f/demoThree';

export default function Threejs() {
  return (
    <>
      {/* <TestScene /> */}
      <DemoThree />
    </>
  );
}
