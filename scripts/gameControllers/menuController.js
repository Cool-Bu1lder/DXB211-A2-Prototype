class MenuController {
  constructor(parameters) {
    this.world = new PhysicsEnvironment();
    this.world.gravity = createVector(0, 0, 0);

    this.playCube = new Cube();
    this.playCube.position = createVector(0, 0, 0);
    this.playCube.angularVelocity = createVector(0.025, 0.025, 0.025);
    this.world.addChild(this.playCube);

    this.transitionTimer = 2;
    this.isStarting = false;
  }

  update(dt) {
    let scale = 1.15;
    push();
    translate(0, 0, -100);
    image(
      backgroundImg,
      (-width * scale) / 2,
      (-height * scale) / 2,
      width * scale,
      height * scale
    );
    pop();

    this.world.update(dt);
    this.world.display();

    if (this.playCube.activated) {
      this.isStarting = true;
    }

    if (!this.isStarting) {
      textSize(30);
      fill(255);
      text("PLAY", 0, -65);
      return;
    }

    this.world.gravity = createVector(0, 9.8, 0);
    this.transitionTimer -= dt;
    if (this.transitionTimer >= 0) return;
    gameStateMachine.setState(gameStates.PLAYING);
  }
}
