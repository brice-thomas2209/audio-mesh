import { HemisphereLight } from 'three';

export const createHemisphereLight = (): HemisphereLight => {
  const hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 0.7);
  hemisphereLight.position.set(400 , 400, 0);
  hemisphereLight.castShadow = true;
  return hemisphereLight;
};
