// collection of movers
class PhysicsEnvironment {
  constructor(parameters) {
    this.children = [];
    this.gravity = createVector(0, 9.8, 0);
  }

  addChild(c) {
    this.children.push(c);
  }

  update(dt) {
    // TODO: cleanup object if offscreen
    for (let child of this.children) {
      let g = p5.Vector.mult(this.gravity, dt);
      child.acceleration.add(g);

      child.update();
    }
  }

  display() {
    for (let child of this.children) child.display();
  }
}
