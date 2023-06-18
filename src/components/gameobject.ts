import { CollidingResolution, Entity, Intersection, Vector } from "@peasy-lib/peasy-physics";
import { Shape } from "@peasy-lib/peasy-physics/dist/types/shape";

export type GOconfig = {
  startingPosition: Vector;
  size: Vector;
  orientation: number;
  color?: string;
  maxSpeed?: number;
};

export class GameObject {
  public position = new Vector(0, 0);
  public size = new Vector(0, 0);
  public shapes = <any>[];
  public forces = [];
  public mass: number = 1;
  public restitution: number = 1;
  public color?: string;
  public maxSpeed?: number;
  public colliding?: (entity: Entity, intersection: Intersection) => CollidingResolution;
  public orientation: number;

  constructor(config: GOconfig) {
    this.position = config.startingPosition;
    this.size = config.size;
    this.orientation = config.orientation;
    if (config.color) this.color = config.color;
  }

  static create(config: GOconfig) {
    return new GameObject(config);
  }
}
