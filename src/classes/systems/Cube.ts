import { BoxBufferGeometry, Mesh, MeshStandardMaterial } from 'three';

export const createCube = () => {
  // create a geometry
  const geometry = new BoxBufferGeometry(10, 10, 10);
  const material = new MeshStandardMaterial({ color: 'purple' });
  const cube = new Mesh(geometry, material);
  cube.castShadow = true;
  cube.translateY(5);

  return cube;
};
