import {PCFSoftShadowMap, ReinhardToneMapping, WebGLRenderer} from 'three';
import {CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";
import {CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";

export const createRenderer = () => {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true
  });
  // renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = ReinhardToneMapping;
  // renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  return renderer;
};

export const createCss2dRenderer = () => {
  const css2dRenderer = new CSS2DRenderer();
  css2dRenderer.setSize(window.innerWidth, window.innerHeight);
  css2dRenderer.domElement.style.position = 'absolute';
  css2dRenderer.domElement.style.top = '0px';
  css2dRenderer.domElement.style.pointerEvents = 'none';
  return css2dRenderer;
};

export const createCss3dRenderer = () => {
  const css3dRenderer = new CSS3DRenderer();
  css3dRenderer.setSize(window.innerWidth, window.innerHeight);
  css3dRenderer.domElement.style.position = 'absolute';
  css3dRenderer.domElement.style.top = '0px';
  css3dRenderer.domElement.style.pointerEvents = 'none';
  return css3dRenderer;
};
