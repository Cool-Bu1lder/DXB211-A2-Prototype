class PlayController {
  constructor(parameters) {
    this.world = new PhysicsEnvironment();
    this.world.gravity = createVector(0, 9.8, 0);

    this.roundTimer = 30;
    this.score = 0;

    this.gameEnded = false;
    this.endTimer = 2;
  }

  update(dt) {
    if (!this.gameEnded) {
      this.roundTimer -= dt;

      fill(255);
      textSize(24);
      text(ceil(this.roundTimer), -width / 2 + 30, -height / 2 + 30);
      text(this.world.cubesActivated, width / 2 - 30, -height / 2 + 30);

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
