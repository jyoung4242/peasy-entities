import { GOconfig, GameObject } from "./components/gameobject";
import { Physics, Vector } from "@peasy-lib/peasy-physics";

export class Wall extends GameObject {
  static create(): GameObject {
    const myConfig: GOconfig = {
      name: "wall",
      startingPosition: new Vector(150, 150),
      size: new Vector(32, 16),
      color: "red",
      orientation: 0,
      maxSpeed: 0,
    };

    let wall = GameObject.create(myConfig);
    const shape = {
      position: { x: 0, y: 0 },
      radius: undefined,
      size: new Vector(16, 16),
      alignment: undefined,
      types: ["wall"],
      color: "red",
    };
    wall.shapes = [shape];
    wall.mass = 1000;
    wall.restitution = 0;

    wall.physics = Physics.addEntities([wall])[0];
    return wall;
  }
}
