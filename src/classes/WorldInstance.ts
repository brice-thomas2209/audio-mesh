import { World } from './World';

export let world: World;

export const initWorld = ({ elementId }: { elementId: string }): World | undefined => {
  if (typeof window !== 'undefined') {
    const container = document.querySelector(elementId);

    if (container) {
      world = new World(container);
      world.start();
      // eslint-disable-next-line
      (window as any).world = world;
      return world;
    }
  }
};
