import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Assets } from "@peasy-lib/peasy-assets";
import { Input } from "@peasy-lib/peasy-input";
import { Physics, Vector } from "@peasy-lib/peasy-physics";
import { Lighting } from "@peasy-lib/peasy-lighting";
import { GameObject } from "./components/gameobject";
import { Engine } from "@peasy-lib/peasy-engine";

const model = {
  objects: [],
  canvas: <any>undefined,
};
const template = `
    <viewport-layer>
        <object-layers \${obj<=*objects}></object-layers>
        <canvas class="physics-canvas" \${==>canvas} width:"100%" height:"100%"></canvas>
    </viewport-layer>
    
`;

const myView = UI.create(document.body, model, template);
await myView.attached;
console.log(model.canvas);

Physics.initialize({
  collisions: {
    rect: ["circle", "stadium", "rect"],
    circle: ["rect", "stadium", "circle"],
    stadium: ["rect", "circle", "stadium"],
  },
  ctx: model.canvas?.getContext("2d"),
  showAreas: true,
});

Engine.create({ fps: 240, callback: updatePeasy });

function createObject(config: any) {}

function updatePeasy(deltaTime: number, now: number) {
  Physics.update(deltaTime, now);
}
