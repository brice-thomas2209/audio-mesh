import {
  GridHelper,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  SpotLight,
  WebGLRenderer
} from 'three';
import { createCamera } from './systems/Camera';
import { createOrbitControls } from './systems/OrbitControls';
import { createScene } from './systems/Scene';
import { createCss2dRenderer, createCss3dRenderer, createRenderer } from './systems/Renderer';
import { Resizer } from './systems/Resizer';
import { Loop } from './systems/Loop';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createGrid } from './systems/Grid';
import { createMesh, createPlaneMaterial } from './systems/Mesh';
import { createSpotLights } from './systems/Spotlights';

class World {
  public scene: Scene;
  public renderer: WebGLRenderer;
  public css2dRenderer: CSS2DRenderer;
  public css3dRenderer: CSS3DRenderer;
  public camera: PerspectiveCamera;
  public grid: GridHelper;
  public loop: Loop;
  public mesh: Mesh;
  public spotlights: Array<SpotLight> = [];
  public orbitControl: OrbitControls;
  public material: ShaderMaterial;
  constructor(container: HTMLElement | Element) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.css2dRenderer = createCss2dRenderer();
    this.css3dRenderer = createCss3dRenderer();
    this.orbitControl = createOrbitControls(this.camera, this.renderer);
    this.loop = new Loop(
      this.camera,
      this.scene,
      this.renderer,
      this.css2dRenderer,
      this.css3dRenderer
    );
    container.append(this.css2dRenderer.domElement);
    container.append(this.css3dRenderer.domElement);
    container.append(this.renderer.domElement);
    this.grid = createGrid(200, 200);
    this.material = createPlaneMaterial();
    this.mesh = createMesh(200, 10, this.material);
    this.spotlights = createSpotLights();
    this.scene.add(this.mesh, ...this.spotlights);
    new Resizer(
      container as HTMLElement,
      this.camera,
      this.renderer,
      this.css2dRenderer,
      this.css3dRenderer
    );
  }
  render() {
    this.renderer.render(this.scene, this.camera);
    this.css2dRenderer.render(this.scene, this.camera);
    this.css3dRenderer.render(this.scene, this.camera);
  }
  start() {
    this.loop.start();
  }
  stop() {
    this.loop.stop();
  }
}

export { World };
