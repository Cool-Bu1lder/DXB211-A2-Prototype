class SplitCube extends RigidBody {
  constructor(colour, size) {
    super();
    this.color = colour || 255;
    this.size = size || 50;
  }

  update() {
    // update physics
    super.update();
  }

  display() {
    push();

    stroke(0);
    strokeWeight(2);
    fill(this.color);
    translate(this.position.x, this.position.y, this.position.z);
    rotateX(this.rotation.x);
    rotateY(this.rotation.y);
    rotateZ(this.rotation.z);
    box(this.size, this.size / 2, this.size);

    pop();
  }
}
