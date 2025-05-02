class RigidBody {
  constructor() {
    this.mass = 3;
    this.position = createVector(0, 0, 0);
    this.velocity = createVector(0, 0, 0);
    this.acceleration = createVector(0, 0, 0);
    this.rotation = createVector(0, 0, 0);
    this.angularVelocity = createVector(0, 0, 0);
    this.parent = null;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.rotation.add(this.angularVelocity);
  }
}
