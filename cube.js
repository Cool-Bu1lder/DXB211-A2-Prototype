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

    //console.log(dist(this.position.x, this.position.y, mouseX, mouseY));
    if (
      dist(
        this.position.x,
        this.position.y,
        mouseX - width / 2,
        mouseY - height / 2
      ) < 30
    )
      this.color = 0;
  }
}
