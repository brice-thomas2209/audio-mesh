import { GridHelper } from 'three';

export const createGrid = (size: number, divisions: number): GridHelper => {
  const grid = new GridHelper(size, divisions, 0xe9e9e9, 0xe9e9e9);
  grid.rotation.x = -Math.PI / 2;
  grid.name = 'Grid';
  return grid;
};
