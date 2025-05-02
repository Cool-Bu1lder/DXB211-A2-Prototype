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
      !this.wasActived &&
      dist(
        this.position.x,
        this.position.y,
        mouseX - width / 2,
        mouseY - height / 2
      ) < 32
    ) {
      this.wasActived = true;
      this.activated = true;
      this.color = [255, 0, 0];
      this.effect();
    }
  }

  effect() {
    let a = new SplitCube();
    a.position = createVector(
      this.position.x,
      this.position.y + 14,
      this.position.z
    );
    a.velocity = createVector(
      this.velocity.x * 0.5,
      this.velocity.y * 0.5 + 0.5,
      this.velocity.z * 0.5
    );
    a.angularVelocity = createVector(
      this.angularVelocity.x * 0.1,
      this.angularVelocity.y * 0.1,
      this.angularVelocity.z * 0.1
    );
    this.parent.addChild(a);

    let b = new SplitCube();
    b.position = createVector(
      this.position.x,
      this.position.y - 14,
      this.position.z
    );
    b.velocity = createVector(
      this.velocity.x * 0.5,
      this.velocity.y * 0.5 - 0.5,
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
