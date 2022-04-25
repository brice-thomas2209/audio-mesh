import {SpotLight, Vector3} from "three";

export const createSpotLights = (): Array<SpotLight> => {
  const spotlights: Array<SpotLight> = [];
  for (const config of spotlightConfig) {
    spotlights.push(createSpotLight(config))
  }
  return spotlights;
}

const createSpotLight = ({ color, position, intensity, distance, decay}: Config): SpotLight => {
  const spotLight = new SpotLight(color, intensity, distance, 2);
  spotLight.decay = decay;
  spotLight.castShadow = false;
  spotLight.position.set(...position.toArray());
  return spotLight;
}

interface Config {
  color: number;
  position: Vector3;
  intensity: number;
  distance: number;
  decay: number;
}

export const spotlightConfig: Array<Config> = [
  {
    color: 0xF2785C,
    position: new Vector3(100, 100, 100),
    intensity: 0.8,
    distance: 3000,
    decay: 0.3
  },
  {
    color: 0xADA2F2,
    position: new Vector3(-100, -100, 100),
    intensity: 0.8,
    distance: 3000,
    decay: 0.3
  },
  {
    color: 0xF2E963,
    position: new Vector3(800, -800, 100),
    intensity: 0.9,
    distance: 5000,
    decay: 0.5
  },
  {
    color: 0x5854BF,
    position: new Vector3(-500, 500, 500),
    intensity: 0.9,
    distance: 5000,
    decay: 0.5
  },
  {
    color: 0xF2785C,
    position: new Vector3(-400, 300, -800),
    intensity: 1.5,
    distance: 3000,
    decay: 0.3
  }
]