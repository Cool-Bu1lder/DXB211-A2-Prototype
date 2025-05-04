class Cube extends RigidBody {
  constructor() {
    super();
    this.color = 255;
    this.activated = false;
    this.wasActived = false;
  }

  update() {
    // update physics
    super.update();
    this.activated = false;

    if (
      (!this.wasActived &&
        dist(
          this.position.x,
          this.position.y,
          mouseX - width / 2,
          mouseY - height / 2
        ) < 32) ||
      dist(
        this.position.x,
        this.position.y,
        handController.leftPalm.x,
        handController.leftPalm.y
      ) < 32 ||
      dist(
        this.position.x,
        this.position.y,
        handController.rightPalm.x,
        handController.rightPalm.y
      ) < 32
    ) {
      this.wasActived = true;
      this.activated = true;
      this.color = [255, 0, 0];

      let dx = mouseX - width / 2 - this.position.x;
      let dy = mouseY - height / 2 - this.position.y;
      let angle = atan2(dy, dx);

      this.effect(angle);
    }
  }

  effect(angle) {
    let offsetX = sin(-angle) * 14;
    let offsetY = cos(-angle) * 14;
    let velocityX = sin(-angle) * 0.5;
    let velocityY = cos(-angle) * 0.5;

    let a = new SplitCube();
    a.rotation = createVector(0, 0, angle);
    a.position = createVector(
      this.position.x + offsetX,
      this.position.y + offsetY,
      this.position.z
    );
    a.velocity = createVector(
      this.velocity.x * 0.5 + velocityX,
      this.velocity.y * 0.5 + velocityY,
      this.velocity.z * 0.5
    );
    a.angularVelocity = createVector(
      this.angularVelocity.x * 0.1,
      this.angularVelocity.y * 0.1,
      this.angularVelocity.z * 0.1
    );
    this.parent.addChild(a);

    let b = new SplitCube();
    b.rotation = createVector(0, 0, angle);
    b.position = createVector(
      this.position.x - offsetX,
      this.position.y - offsetY,
      this.position.z
    );
    b.velocity = createVector(
      this.velocity.x * 0.5 - velocityX,
      this.velocity.y * 0.5 - velocityY,
      this.velocity.z * 0.5
    );
    b.angularVelocity = createVector(
      this.angularVelocity.x * 0.1,
      this.angularVelocity.y * 0.1,
      this.angularVelocity.z * 0.1
    );
    this.parent.addChild(b);

    this.parent.removeChild(this);
  }

  display() {
    push(); // save previous state

    stroke(0);
    strokeWeight(2);
    fill(this.color);
    translate(this.position.x, this.position.y, this.position.z);
    rotateX(this.rotation.x);
    rotateY(this.rotation.y);
    rotateZ(this.rotation.z);
    box(this.mass * 16);

    pop();
  }
}
