import { AmbientLight } from 'three';

export const createAmbientLight = () => {
  return new AmbientLight(0xffffff, 0);
};
