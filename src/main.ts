import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Assets } from "@peasy-lib/peasy-assets";
import { Input } from "@peasy-lib/peasy-input";
import { Physics, Vector } from "@peasy-lib/peasy-physics";
import { Lighting } from "@peasy-lib/peasy-lighting";
import { GOconfig, GameObject } from "./components/gameobject";
import { Engine } from "@peasy-lib/peasy-engine";
import { Shape } from "@peasy-lib/peasy-physics/dist/types/shape";
import { Player } from "./player";
import { Wall } from "./wall";

let leftpushed = false,
  rightpushed = false,
  uppushed = false,
  downpushed = false;

const model = {
  objects: <any>[],
  canvas: <any>undefined,
  canvaswidth: 0,
  canvasheight: 0,
  arrowangle: -90,
  arrowhide: "arrowhide",
};
const template = `
    <viewport-layer class="viewport">
        <object-layers class="object" \${obj<=*objects} style="width: \${obj.size.x}px ;height: \${obj.size.y}px; transform: translate3d(\${obj.position.x}px,\${obj.position.y}px,0); top:-\${obj.centerpoint.y}px;left: -\${obj.centerpoint.x}px "></object-layers>
        <div class='arrowpos'>
          <div class="arrowimg \${arrowhide}" style="rotate: \${arrowangle}deg"></div>
        </div>
        
        <canvas class="physics-canvas" \${==>canvas} width="\${canvaswidth}px" height="\${canvasheight}px"></canvas>
    </viewport-layer>
    
`;

const myView = UI.create(document.body, model, template);
await myView.attached;
model.canvas.width = 400;
model.canvas.height = 400 * (3 / 2);
model.canvaswidth = model.canvas.width;
model.canvasheight = model.canvas.height;

Physics.initialize({
  collisions: {
    player: ["wall"],
  },
  ctx: model.canvas.getContext("2d"),
  showAreas: true,
});
const myEngine = Engine.create({ callback: updatePeasy });

function createObject(object: any) {
  let newObject: any;
  newObject = object.create();
  model.objects.push(newObject);
  return;
}

function updatePeasy(deltaTime: number, now: number) {
  const diagobject = Physics.update(deltaTime / 1000, now);
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
          leftpushed = true;
          model.arrowangle = 90;
          model.objects[0].physics.addForce({
            name: action,
            maxMagnitude: 100,
            direction: new Vector(-1, 0),
            duration: 0,
          });
          break;
        case "walk-up":
          model.arrowangle = 180;
          uppushed = true;
          model.objects[0].physics.addForce({
            name: action,
            maxMagnitude: 100,
            direction: new Vector(0, -1),
            duration: 0,
          });
          break;
        case "walk-right":
          model.arrowangle = -90;
          rightpushed = true;
          model.objects[0].physics.addForce({
            name: action,
            maxMagnitude: 100,
            direction: new Vector(1, 0),
            duration: 0,
          });

          break;
        case "walk-down":
          model.arrowangle = 0;
          downpushed = true;
          model.objects[0].physics.addForce({
            name: action,
            maxMagnitude: 100,
            direction: new Vector(0, 1),
            duration: 0,
          });

          break;
      }
      model.arrowhide = "";
      console.log(model.objects[0].physics.forces);
    } else {
      //released
      const currentVelocity = model.objects[0].physics.velocity;

      switch (action) {
        case "walk-left":
          leftpushed = false;

          //model.objects[0].physics.velocity = new Vector(0, currentVelocity.y);
          model.objects[0].physics.addForce({
            name: `stop_${action}`,
            direction: new Vector(-currentVelocity.x, 0),
            duration: 0,
          });
          break;
        case "walk-up":
          uppushed = false;

          //model.objects[0].physics.velocity = new Vector(currentVelocity.x, 0);
          model.objects[0].physics.addForce({
            name: `stop_${action}`,
            direction: new Vector(0, -currentVelocity.y),
            duration: 0,
          });

          break;
        case "walk-right":
          rightpushed = false;
          //model.objects[0].physics.velocity = new Vector(0, currentVelocity.y);
          model.objects[0].physics.addForce({
            name: `stop_${action}`,
            direction: new Vector(-currentVelocity.x, 0),
            duration: 0,
          });

          break;
        case "walk-down":
          downpushed = false;
          //model.objects[0].physics.velocity = new Vector(currentVelocity.x, 0);
          model.objects[0].physics.addForce({
            name: `stop_${action}`,
            direction: new Vector(0, -currentVelocity.y),
            duration: 0,
          });
          break;
      }
      if (!leftpushed && !rightpushed && !uppushed && !downpushed) model.arrowhide = "arrowhide";
    }
  }
);

createObject(Player);
createObject(Wall);
myEngine.start();
