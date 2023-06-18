import { Vector } from "@peasy-lib/peasy-physics";
import { Shape } from "@peasy-lib/peasy-physics/dist/types/shape";

export type GOconfig = {
  startingPosition: Vector;
  size: Vector;
  shape: Shape;
  color: string;
};

export class GameObject {
  position = new Vector(0, 0);
  size = new Vector(0, 0);

  constructor(config: GOconfig) {
    this.position = config.startingPosition;
    this.size = config.size;
  }

  static create(config: GOconfig) {
    return new GameObject(config);
  }
}
