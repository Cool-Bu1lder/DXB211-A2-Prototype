class MenuController {
  constructor(parameters) {
    world.gravity = createVector(0, 0, 0);

    this.playCube = new Cube();
    this.playCube.position = createVector(0, 0, 0);
    this.playCube.angularVelocity = createVector(0.025, 0.025, 0.025);
    world.addChild(this.playCube);

    this.transitionTimer = 0;
  }

  update(dt) {
    if (!this.playCube.activated) {
      textSize(24);
      text("PLAY", 0, -65);
      return;
    }

    world.gravity = createVector(0, 9.8, 0);
    this.transitionTimer += dt;
    if (this.transitionTimer < 2) return;
    gameStateMachine.setState(gameStates.PLAYING);
  }
}
