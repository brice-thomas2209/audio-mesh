import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";
import {CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";
import Stats from 'three/examples/jsm/libs/stats.module'
import {AudioStore} from "../AudioInstance";
import {world} from "../WorldInstance";
import {updateMesh} from "./Mesh";

class Loop {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private css2dRenderer: CSS2DRenderer;
  private css3dRenderer: CSS3DRenderer;
  private stats: any;
  private prevTime: number;
  constructor(
    camera: PerspectiveCamera,
    scene: Scene,
    renderer: WebGLRenderer,
    css2dRenderer: CSS2DRenderer,
    css3dRenderer: CSS3DRenderer
  ) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.css2dRenderer = css2dRenderer;
    this.css3dRenderer = css3dRenderer;

    this.stats = Stats();
    this.stats.showPanel(0);
    this.stats.dom.style.position = 'absolute';
    this.stats.dom.style.bottom = '0px';
    this.stats.dom.style.top = 'auto';
    this.prevTime = 0;
    document.body.appendChild(this.stats.dom);
  }
  start() {
    this.renderer.setAnimationLoop((time) => {
      this.stats.begin();
      this.renderer.render(this.scene, this.camera);
      this.css2dRenderer.render(this.scene, this.camera);
      this.css3dRenderer.render(this.scene, this.camera);
      this.stats.end();
      if (AudioStore.data) {
        AudioStore.analyser?.getByteFrequencyData(AudioStore.data);
        world.material.uniforms.delta_time.value = time;
        world.material.uniforms.data.value = AudioStore.data;
        updateMesh(AudioStore.data);
      }
      if (this.prevTime < Math.trunc(time/1000)) {
        this.prevTime = Math.trunc(time/1000);
        // console.log(this.prevTime);
      }
    });
  }
  stop() {
    this.renderer.setAnimationLoop(null);
  }
}


export { Loop };
