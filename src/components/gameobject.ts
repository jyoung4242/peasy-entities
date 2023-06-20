import { CollidingResolution, Entity, Intersection, Vector } from "@peasy-lib/peasy-physics";
import { Shape } from "@peasy-lib/peasy-physics/dist/types/shape";

export type GOconfig = {
  name: string;
  startingPosition: Vector;
  size: Vector;
  orientation: number;
  color?: string;
  maxSpeed?: number;
};

export class GameObject {
  public name: string;
  public position = new Vector(0, 0);
  public centerpoint = new Vector(0, 0);
  public size = new Vector(0, 0);
  public shapes = <any>[];
  public forces = [];
  public mass: number = 1;
  public restitution: number = 1;
  public color?: string;
  public maxSpeed?: number;
  public colliding?: (entity: Entity, intersection: Intersection) => CollidingResolution;
  public orientation: number;
  public physics: any;
  public audio: any;
  public lighting: any;

  constructor(config: GOconfig) {
    this.name = config.name;
    this.position = config.startingPosition;
    this.size = config.size;
    this.centerpoint = new Vector(config.size.x / 2, config.size.y / 2);
    this.orientation = config.orientation;
    if (config.color) this.color = config.color;
    if (config.maxSpeed) this.maxSpeed = config.maxSpeed;
  }

  static create(config: GOconfig) {
    return new GameObject(config);
  }
}
