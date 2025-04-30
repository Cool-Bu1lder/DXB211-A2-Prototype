// https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5
// https://docs.ml5js.org/#/reference/handpose
// https://p5js.org/examples/math-and-physics-forces/
// https://p5js.org/reference/p5/p5.Vector/

let handPose;
let video;
let hands = [];
let movers = [];

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(1280, 720, WEBGL);

  // Create the video and hide it
  video = createCapture(VIDEO);
  //640, 480
  video.size(1280, 960);
  video.hide();

  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

  initializeMovers();
}

function draw() {
  background(0);
  //image(video, -width / 2, -height / 2, width, 960);

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x - width / 2, keypoint.y - height / 2, 10);
    }
  }

  for (let mover of movers) {
    // Gravitational force is proportional to the mass
    let gravity = createVector(0, 0.1 * mover.mass);

    // Apply gravitational force
    mover.applyForce(gravity);

    // Update and display
    mover.update();
    mover.display();
    mover.checkEdges();
    //console.log("CheckEdge");
    //console.log(mover.position.y);
    // console.log(-height / 2);
  }
  //console.log(movers[0].position.y);
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function initializeMovers() {
  // Calculate the spacing based on the width of the canvas
  let xSpacing = width / 9;

  // Fill the movers array with 9 Mover objects with random masses
  for (let i = 0; i < 9; i += 1) {
    let mass = random(0.5, 3);
    let xPosition = xSpacing * i + xSpacing / 2;
    movers[i] = new Mover(mass, xPosition - width / 2, 0, color(i, 100, 100));
  }
}
