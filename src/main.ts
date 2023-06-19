import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Assets } from "@peasy-lib/peasy-assets";
import { Input } from "@peasy-lib/peasy-input";
import { Physics, Vector } from "@peasy-lib/peasy-physics";
import { Lighting } from "@peasy-lib/peasy-lighting";
import { GOconfig, GameObject } from "./components/gameobject";
import { Engine } from "@peasy-lib/peasy-engine";
import { Shape } from "@peasy-lib/peasy-physics/dist/types/shape";

const model = {
  objects: <any>[],
  canvas: <any>undefined,
};
const template = `
    <viewport-layer>
        <object-layers class="object" \${obj<=*objects} style="width: \${obj.size.x}px ;height: \${obj.size.y}px; transform: translate(\${obj.position.x}px,\${obj.position.y}px);"></object-layers>
        <canvas class="physics-canvas" \${==>canvas} width="100%" height="100%"></canvas>
    </viewport-layer>
    
`;

const myView = UI.create(document.body, model, template);
await myView.attached;

Physics.initialize({
  collisions: {},
  ctx: model.canvas.getContext("2d"),
  showAreas: true,
});
const myEngine = Engine.create({ callback: updatePeasy });

function createObject() {
  let newObject: GameObject;
  const myConfig: GOconfig = {
    startingPosition: new Vector(5, 5),
    size: new Vector(16, 16),
    color: "blue",
    orientation: 0,
    maxSpeed: 100,
  };

  newObject = GameObject.create(myConfig);
  console.log(newObject);

  const shape = {
    position: { x: 0, y: 0 },
    radius: undefined,
    size: new Vector(16, 16),
    alignment: undefined,
    types: ["rect"],
    color: "blue",
  };
  newObject.shapes = [shape];
  Physics.addEntities([newObject]);
  model.objects.push(newObject);
}

function updatePeasy(deltaTime: number, now: number) {
  Physics.update(deltaTime, now);
  UI.update();
}

Input.map(
  {
    ArrowLeft: { action: "walk-left", repeat: false },
    ArrowRight: { action: "walk-right", repeat: false },
    ArrowUp: { action: "walk-up", repeat: false },
    ArrowDown: { action: "walk-down", repeat: false },
  },
  (action: string, doing: boolean) => {
    if (doing) {
      //pressed
      switch (action) {
        case "walk-left":
          Physics.entities[0].addForce({
            name: action,
            magnitude: 5,
            maxMagnitude: 10,
            direction: new Vector(-1, 0),
            duration: 0,
          });
          break;
        case "walk-up":
          Physics.entities[0].addForce({
            name: action,
            magnitude: 5,
            maxMagnitude: 10,
            direction: new Vector(0, -1),
            duration: 0,
          });
          break;
        case "walk-right":
          Physics.entities[0].addForce({
            name: action,
            magnitude: 5,
            maxMagnitude: 10,
            direction: new Vector(1, 0),
            duration: 0,
          });

          break;
        case "walk-down":
          Physics.entities[0].addForce({
            name: action,
            magnitude: 5,
            maxMagnitude: 10,
            direction: new Vector(0, 1),
            duration: 0,
          });

          break;
      }
      console.log(Physics.entities[0]);
    } else {
      //released
      Physics.removeForce(action);
    }
  }
);

createObject();
myEngine.start();
