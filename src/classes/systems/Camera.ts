import {PerspectiveCamera, Vector3} from 'three';
export const createCamera = ({ position }: { position: Vector3 } = { position: new Vector3(0, 0, 1000)}) => {
  const aspect = window.innerWidth / window.innerHeight;
  // const frustumSize = 1000;
  // const camera = new OrthographicCamera(
  //   (frustumSize * aspect) / -2,
  //   (frustumSize * aspect) / 2,
  //   frustumSize / 2,
  //   frustumSize / -2,
  //   1,
  //   10000
  // );
  const camera = new PerspectiveCamera(45, aspect, 0.1, 100000);
  camera.position.add(position);
  camera.zoom = 5;
  return camera;
};
