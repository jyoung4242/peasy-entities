import { GOconfig, GameObject } from "./components/gameobject";
import { Physics, Vector } from "@peasy-lib/peasy-physics";

export class Player extends GameObject {
  static create(): GameObject {
    const myConfig: GOconfig = {
      name: "player",
      startingPosition: new Vector(25, 25),
      size: new Vector(16, 16),
      color: "blue",
      orientation: 0,
      maxSpeed: 100,
    };

    let player = GameObject.create(myConfig);
    const shape = {
      position: { x: 0, y: 0 },
      radius: undefined,
      size: new Vector(16, 16),
      alignment: undefined,
      types: ["player"],
      color: "blue",
    };
    player.shapes = [shape];
    player.physics = Physics.addEntities([player])[0];
    return player;
  }
}
