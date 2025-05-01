class Cube extends RigidBody {
  constructor() {
    super();

    this.color = 255;
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
