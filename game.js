class PlayController {
  constructor(parameters) {
    this.world = new PhysicsEnvironment();
    this.world.gravity = createVector(0, 9.8, 0);

    this.roundTimer = 30;
    this.score = 0;

    this.gameEnded = false;
    this.endTimer = 2;

    /*let cube = new Cube();
    cube.position = createVector(0, 0, -10);
    cube.acceleration = createVector(-10, -5, 0);
    cube.angularVelocity = createVector(0.025, 0.025, 0.025);
    this.world.addChild(cube);

    let cubeBottomLeft = new Cube();
    cubeBottomLeft.position = createVector(width / 2, height / 2, -10);
    cubeBottomLeft.acceleration = createVector(-10, -11, 0);
    cubeBottomLeft.angularVelocity = createVector(0.025, 0.025, 0.025);
    this.world.addChild(cubeBottomLeft);

    let cubeBottomRight = new Cube();
    cubeBottomRight.position = createVector(-width / 2, height / 2, -10);
    cubeBottomRight.acceleration = createVector(10, -11, 0);
    cubeBottomRight.angularVelocity = createVector(0.025, 0.025, 0.025);
    this.world.addChild(cubeBottomRight);

    let cubeBottomMiddle = new Cube();
    cubeBottomMiddle.position = createVector(0, height / 2, -10);
    cubeBottomMiddle.acceleration = createVector(0, -11, 0);
    cubeBottomMiddle.angularVelocity = createVector(0.025, 0.025, 0.025);
    this.world.addChild(cubeBottomMiddle);*/
  }

  update(dt) {
    if (!this.gameEnded) {
      this.roundTimer -= dt;

      textSize(24);
      text(ceil(this.roundTimer), -width / 2 + 30, -height / 2 + 30);

      if (random() > 0.95) {
        let rd = (random() - 0.5) * 4;
        let rf = (random() - 0.5) * 4;
        let r = (random() - 0.5) * 2;
        let origin = r * (width / 2);
        let direction = -r * 10 + rd;

        let cube = new Cube();
        cube.position = createVector(origin, height / 2, -10);
        cube.acceleration = createVector(direction, -11 + rf, 0); //createVector(-10, -11, 0);
        cube.angularVelocity = createVector(0.025, 0.025, 0.025);
        this.world.addChild(cube);
      }

      if (this.roundTimer <= 0) {
        this.gameEnded = true;
      }
    } else {
      this.endTimer -= dt;
      if (this.endTimer <= 0) gameStateMachine.setState(gameStates.MENU);
    }

    this.world.update(dt);
    this.world.display();
  }
}
