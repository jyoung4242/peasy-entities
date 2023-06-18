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

console.log(Physics);

const myEngine = Engine.create({ fps: 240, callback: updatePeasy });

function createObject() {
  let newObject: GameObject;
  const myConfig: GOconfig = {
    startingPosition: new Vector(5, 5),
    size: new Vector(16, 16),
    color: "blue",
    orientation: 0,
  };

  newObject = GameObject.create(myConfig);
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
}

createObject();
myEngine.start();
