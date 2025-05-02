class Cube extends RigidBody {
  constructor() {
    super();
    this.color = 255;
    this.activated = false;
  }

  update() {
    // update physics
    super.update();

    if (
      dist(
        this.position.x,
        this.position.y,
        mouseX - width / 2,
        mouseY - height / 2
      ) < 32
    ) {
      this.activated = true;
      this.color = [255, 0, 0];
    }
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
