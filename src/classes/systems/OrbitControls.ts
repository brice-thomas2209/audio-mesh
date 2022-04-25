import { Camera, WebGLRenderer, MOUSE } from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export const createOrbitControls = (
  camera: Camera,
  renderer: WebGLRenderer
) => {
  const orbitControl = new OrbitControls(camera, renderer?.domElement);
  orbitControl.mouseButtons = {
    RIGHT: MOUSE.ROTATE,
    MIDDLE: MOUSE.DOLLY,
    LEFT: MOUSE.PAN
  };
  orbitControl.target.set(0, 0, 0);
  orbitControl.update();
  orbitControl.minZoom = 10;
  // orbitControl.enabled = false;
  // orbitControl.enableRotate = false;
  return orbitControl;
};
