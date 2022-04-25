import {
  SphereGeometry,
  IUniform,
  Material,
  Mesh,
  ShaderMaterial,
  UniformsUtils,
  ShaderLib
} from "three";
// @ts-ignore
import vertexShader from '../../shaders/terrainVertexShader.glsl';
// @ts-ignore
import fragmentShader from '../../shaders/terrainFragmentShader.glsl';
import {AudioStore} from "../AudioInstance";
import {getFragmentShader, getVertexShader} from "../../shaders/Shader";
import {world} from "../WorldInstance";

export const createPlaneMaterial = (): ShaderMaterial => {
  const uniforms = UniformsUtils.merge([
    ShaderLib.lambert.uniforms,
    {
      delta_time: { type: 'float', value: 1.0 } as IUniform,
      amplitude: { type: 'float', value: 5.0 } as IUniform,
      data: { type: 'float[64]', value: AudioStore.data || [] } as IUniform,
    }
  ]);
  return new ShaderMaterial({
    uniforms,
    fragmentShader: getFragmentShader(),
    vertexShader: getVertexShader(),
    wireframe: false,
    lights: true
  });
};

let positionClone: Float32Array;
let normalsClone: Float32Array;

export const createMesh = (width: number, height: number, material: Material): Mesh => {
  const geometry = new SphereGeometry(50, 50, 50);

  positionClone = JSON.parse(JSON.stringify(geometry.attributes.position.array)) as Float32Array;
  normalsClone = JSON.parse(JSON.stringify(geometry.attributes.normal.array)) as Float32Array;

  const plane = new Mesh(geometry, material);
  plane.receiveShadow = true;
  plane.castShadow = true;
  return plane;
};

export const config = {
  dampening: 50.0,
  amplitude: 2.5,
  rotation: true
};

export const updateMesh = (data: Uint8Array): void => {
  if (config.rotation) {
    world.mesh.rotation.set(world.mesh.rotation.x, world.mesh.rotation.y - 0.005, world.mesh.rotation.z);
  }

  const mesh =  world.mesh as Mesh;
  const geometry = mesh.geometry;
  for (let i = 0; i < geometry.attributes.position.count; i++) {
    const ix = i * 3
    const iy = i * 3 + 1
    const iz = i * 3 + 2

    const xsin = Math.sin(data[Math.floor(Math.abs(geometry.attributes.position.getX(i)))] / config.dampening) * config.amplitude;
    const ycos = Math.sin(data[Math.floor(Math.abs(geometry.attributes.position.getY(i)))] / config.dampening) * config.amplitude;

    geometry.attributes.position.setX(i, positionClone[ix] + normalsClone[ix] * (xsin + ycos))
    geometry.attributes.position.setY(i, positionClone[iy] + normalsClone[iy] * (xsin + ycos))
    geometry.attributes.position.setZ(i, positionClone[iz] + normalsClone[iz] * (xsin + ycos))
  }
  geometry.computeVertexNormals();
  geometry.attributes.position.needsUpdate = true;
}