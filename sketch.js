// https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5
// https://docs.ml5js.org/#/reference/handpose
// https://p5js.org/examples/math-and-physics-forces/
// https://p5js.org/reference/p5/p5.Vector/

let world;

function preload() {}

function setup() {
  createCanvas(1280, 720, WEBGL);

  world = new PhysicsEnvironment();

  let cube = new Cube();
  cube.position = createVector(0, 0, -10);
  cube.acceleration = createVector(-10, -5, 0);
  cube.angularVelocity = createVector(0.025, 0.025, 0.025);
  world.addChild(cube);

  let cubeBottomLeft = new Cube();
  cubeBottomLeft.position = createVector(width / 2, height / 2, -10);
  cubeBottomLeft.acceleration = createVector(-10, -11, 0);
  cubeBottomLeft.angularVelocity = createVector(0.025, 0.025, 0.025);
  world.addChild(cubeBottomLeft);

  let cubeBottomRight = new Cube();
  cubeBottomRight.position = createVector(-width / 2, height / 2, -10);
  cubeBottomRight.acceleration = createVector(10, -11, 0);
  cubeBottomRight.angularVelocity = createVector(0.025, 0.025, 0.025);
  world.addChild(cubeBottomRight);

  let cubeBottomMiddle = new Cube();
  cubeBottomMiddle.position = createVector(0, height / 2, -10);
  cubeBottomMiddle.acceleration = createVector(0, -11, 0);
  cubeBottomMiddle.angularVelocity = createVector(0.025, 0.025, 0.025);
  world.addChild(cubeBottomMiddle);
}

function draw() {
  background(0);

  let dt = deltaTime / 1000;

  world.update(dt);
  world.display();
}
