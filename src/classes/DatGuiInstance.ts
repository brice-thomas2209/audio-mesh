import { GUI } from 'dat.gui';
import { World } from './World';
import { ElevationCursor } from '../constants/ElevationCursor';
import { config } from './systems/Mesh';

export let gui: GUI;

export interface IGuiStore {
  colorA?: number;
  colorB?: number;
  cursor: ElevationCursor;
}

export const GuiStore: IGuiStore = {
  cursor: ElevationCursor.ADD
};

export const initGui = async (world: World): Promise<GUI> => {
  const { GUI } = await import('dat.gui');
  gui = new GUI();
  const meshFolder = gui.addFolder('Mesh');
  addWireframeGui(meshFolder, world);
  addDampeningGui(meshFolder);
  addAmplitudeGui(meshFolder);
  addRotationGui(meshFolder);
  return gui;
};

const addWireframeGui = (folder: GUI, world: World): void => {
  folder.add(world.material, 'wireframe').name('wireframe').listen();
};

const addDampeningGui = (folder: GUI): void => {
  folder.add(config, 'dampening', 30, 100).name('Dampening').listen();
};

const addAmplitudeGui = (folder: GUI): void => {
  folder.add(config, 'amplitude', 1, 10).name('Amplitude').listen();
};

const addRotationGui = (folder: GUI): void => {
  folder.add(config, 'rotation').name('Rotate').listen();
};
