// https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5
// https://docs.ml5js.org/#/reference/handpose
// https://p5js.org/examples/math-and-physics-forces/
// https://p5js.org/reference/p5/p5.Vector/

let world;
let gameStateMachine;
let font;

function preload() {
  font = loadFont("data/CascadiaCode.ttf");
}

function setup() {
  createCanvas(1280, 720, WEBGL);

  world = new PhysicsEnvironment();
  gameStateMachine = new GameStateMachine();

  textAlign(CENTER, CENTER);
  textFont(font);
}

function draw() {
  background(0);

  let dt = deltaTime / 1000;

  gameStateMachine.update(dt);

  world.update(dt);
  world.display();
}
