class PlayController {
  constructor(parameters) {
    this.world = new PhysicsEnvironment();
    this.world.gravity = createVector(0, 9.8 / 2, 0);

    this.roundTimer = 30;
    this.score = 0;

    this.gameStarted = false;
    this.startTimer = 3;

    this.gameEnded = false;
    this.endTimer = 3;

    this.resultsDisplayed = false;
    this.resultsTimer = 3;
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

    // game start timer
    if (!this.gameStarted) {
      fill(255);
      textSize(24);
      textAlign(CENTER);
      text("GAME STARTING IN", 0, -20);
      text(ceil(this.startTimer), 0, 20);
      this.startTimer -= dt;
      if (this.startTimer <= 0) this.gameStarted = true;
    }

    if (this.gameStarted) {
      if (!this.gameEnded) {
        this.roundTimer -= dt;

        fill(255);
        textSize(24);
        textAlign(LEFT);
        text(
          "TIME: " + ceil(this.roundTimer),
          -width / 2 + 30,
          -height / 2 + 30
        );
        textAlign(RIGHT);
        text(
          "SCORE: " + this.world.cubesActivated,
          width / 2 - 30,
          -height / 2 + 30
        );

        if (random() > 0.95) {
          let randomDirection = (random() - 0.5) * 4;
          //let randomForce = (random() - 0.5) * 4;
          let r = (random() - 0.5) * 2;
          let origin = r * (width / 2);
          let direction = -r * 10 + randomDirection;

          // generate cubes
          let data = random(cubeData);
          let cube = new Cube(data.colour, data.size, data.speed);
          cube.position = createVector(origin, height / 2, -10);
          //cube.acceleration = createVector(direction, (-11 + randomForce) / 1, 0); //createVector(-10, -11, 0);
          cube.acceleration = createVector(direction, data.speed / 1, 0);
          cube.angularVelocity = createVector(0.025, 0.025, 0.025);
          this.world.addChild(cube);
        }

        if (this.roundTimer <= 0) {
          this.gameEnded = true;
        }
      } else {
        this.endTimer -= dt;
        if (this.endTimer <= 0) this.resultsDisplayed = true;
      }

      if (this.resultsDisplayed) {
        background(0, 255 / 4);
        fill(255);
        textSize(24);
        textAlign(CENTER);
        text("SCORE: " + this.world.cubesActivated, 0, 0);
        this.resultsTimer -= dt;
        if (this.resultsTimer <= 0) gameStateMachine.setState(gameStates.MENU);
      }
    }

    this.world.update(dt);
    this.world.display();
  }
}
