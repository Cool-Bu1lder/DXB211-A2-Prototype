let instructions = [
  "This Cube\nowes you money",
  "That cube insulted\nyour haircut",
  "Cube says you\ncan't do it",
  "Do it",
  "The one the cubes\nfear is you",
  "No cubes allowed",
  "Slice the Cube",
];
let texts = [];
let currentInstructionIndex = 0;
let playRandomInstructions = false;

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
    /*image(
      backgroundImg,
      (-width * scale) / 2,
      (-height * scale) / 2,
      width * scale,
      height * scale
    );*/
    background("black");
    pop();

    this.world.update(dt);
    this.world.display();

    if (random() > 0.99) {
      let instruction;

      if (!playRandomInstructions) {
        instruction = instructions[currentInstructionIndex++];
        if (currentInstructionIndex >= instructions.length) {
          randomMode = true;
        }
      } else {
        instruction = random(instructions);
      }

      // I would prefer to push a textEffect class, but this works right now.
      texts.push([instruction, 2 * (random() - 0.5), 2 * (random() - 0.5), 0]);
    }

    for (let t of texts) {
      textSize(t[3] + 30);
      textAlign(CENTER);
      let alpha = sin((t[3] / 10) * PI) * 255;
      fill(255, alpha);
      text(t[0], (width / 2 - 80) * t[1], (height / 2 - 40) * t[2]);

      t[3] += dt * 3;
    }
    texts = texts.filter((t) => t[3] < 10);

    if (this.playCube.activated) {
      this.isStarting = true;
    }

    if (!this.isStarting) {
      textSize(30);
      textAlign(CENTER);
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
