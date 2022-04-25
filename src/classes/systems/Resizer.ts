import { PerspectiveCamera, WebGLRenderer } from 'three';
import {CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";
import {CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";

class Resizer {
  constructor(
    container: HTMLElement,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
    css2dRenderer: CSS2DRenderer,
    css3dRenderer: CSS3DRenderer
  ) {
    this.setSize(container, camera, renderer, css2dRenderer, css3dRenderer);
    window.addEventListener('resize', () => {
      this.setSize(container, camera, renderer, css2dRenderer, css3dRenderer);
    });
  }
  private setSize(
    container: HTMLElement | Element,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
    css2dRenderer: CSS2DRenderer,
    css3dRenderer: CSS3DRenderer
  ) {
    const aspect = window.innerWidth / window.innerHeight;
    // For orthographic camera
    // const frustumSize = 1000;
    // camera.left = (-frustumSize * aspect) / 2;
    // camera.right = (frustumSize * aspect) / 2;
    // camera.top = frustumSize / 2;
    // camera.bottom = -frustumSize / 2;

    camera.aspect = aspect;

    camera.updateProjectionMatrix();
    css2dRenderer.setSize(window.innerWidth, window.innerHeight);
    css3dRenderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}

export { Resizer };
