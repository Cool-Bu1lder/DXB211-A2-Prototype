class Cube extends RigidBody {
  constructor(colour, size) {
    super();
    this.colour = colour || "white";
    this.activated = false;
    this.wasActived = false;
    this.size = size || 50;
    this.range = this.size;
  }

  update() {
    // update physics
    super.update();
    this.activated = false;

    let mouseDist = dist(
      this.position.x,
      this.position.y,
      mouseX - width / 2,
      mouseY - height / 2
    );
    let lHandDist = dist(
      this.position.x,
      this.position.y,
      handController.leftPalm.x,
      handController.leftPalm.y
    );
    /*let rHandDist = dist(
      this.position.x,
      this.position.y,
      handController.rightPalm.x,
      handController.rightPalm.y
    );*/

    if (
      !this.wasActived &&
      //(mouseDist < this.range || lHandDist < this.range)
      (mouseDist < this.range || this.detectPalmHit())
    ) {
      this.wasActived = true;
      this.activated = true;

      let dx = mouseX - width / 2 - this.position.x;
      let dy = mouseY - height / 2 - this.position.y;
      let angle = atan2(dy, dx);

      this.effect(angle);
    }
  }

  detectPalmHit() {
    for (let p of handController.hitPoints) {
      let handDist = dist(this.position.x, this.position.y, p.x, p.y);
      if (handDist < this.range) return true;
    }
  }

  effect(angle) {
    let offsetX = sin(-angle) * (this.size / 4 + 2);
    let offsetY = cos(-angle) * (this.size / 4 + 2);
    let velocityX = sin(-angle) * 0.5;
    let velocityY = cos(-angle) * 0.5;

    let a = new SplitCube(this.colour, this.size);
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

    let b = new SplitCube(this.colour, this.size);
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
    push();

    stroke(0);
    strokeWeight(2);
    fill(this.colour);
    translate(this.position.x, this.position.y, this.position.z);
    rotateX(this.rotation.x);
    rotateY(this.rotation.y);
    rotateZ(this.rotation.z);
    box(this.size);

    pop();
  }
}
