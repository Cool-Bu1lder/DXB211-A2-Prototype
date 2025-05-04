// https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5
// https://docs.ml5js.org/#/reference/handpose
// https://p5js.org/examples/math-and-physics-forces/
// https://p5js.org/reference/p5/p5.Vector/

let handController = new HandController();

let gameStateMachine;
let font;

function preload() {
  font = loadFont("data/CascadiaCode.ttf");

  handController.preload();
}

function setup() {
  createCanvas(1280, 720, WEBGL);
  textAlign(CENTER, CENTER);
  textFont(font);

  gameStateMachine = new GameStateMachine();
  handController.setup();
}

function draw() {
  background(0);
  //image(handController.video, -1280 / 2, -960 / 2, 1280, 960);

  let dt = deltaTime / 1000;

  gameStateMachine.update(dt);
  handController.draw();
}
