// precondition: assumed hand exists
function updatePalmPosition(hand) {
  let wrist = hand.wrist;
  let middleFingerBase = hand.middle_finger_mcp;

  let palmX = (wrist.x + middleFingerBase.x) / 2;
  let palmY = (wrist.y + middleFingerBase.y) / 2;

  return createVector(-1 * (-1280 / 2 + palmX), -960 / 2 + palmY);
}

function ghostEffect(previousPalms, palm) {
  previousPalms.push(palm);

  // wanted to only have a think line between points, didnt work with WEBGL
  // end result may feel more like a slice effect
  // https://p5js.org/reference/p5/beginShape/
  fill(0, 255, 255);
  noStroke();
  strokeWeight(2);
  beginShape();
  for (let pLeftPalm of previousPalms) {
    vertex(pLeftPalm.x, pLeftPalm.y);
    circle(pLeftPalm.x, pLeftPalm.y, 10);
    // line function
  }
  endShape();

  // remove from front of array until 10 values left
  previousPalms = previousPalms.slice(-10);

  return previousPalms;
}

// adapted from https://docs.ml5js.org/#/reference/handpose
class HandController {
  constructor() {
    this.handPose;
    this.video;
    this.hands = [];
    this.leftPalm = {};
    this.rightPalm = {};
    this.pLeftPalm;
    this.pRightPalm;
    this.pLeftPalms = [];
    this.pRightPalms = [];

    this.hitPoints = [];
  }

  preload() {
    this.handPose = ml5.handPose();
  }

  setup() {
    // Create the video and hide it
    this.video = createCapture(VIDEO);
    //640, 480
    this.video.size(1280, 960);
    this.video.hide();

    // Start detecting hands from the webcam video
    this.handPose.detectStart(this.video, (results) => {
      this.gotHands(results);
    });
  }

  draw() {
    // Draw all the tracked hand points

    //this.debug2D();

    this.hitPoints = [];

    // left palm
    if (this.leftPalm) {
      this.pLeftPalm = this.leftPalm;
      this.pLeftPalms = ghostEffect(this.pLeftPalms, this.leftPalm);
    }

    if (this.hands[0]) {
      this.leftPalm = updatePalmPosition(this.hands[0]);
    }

    // draw palm
    if (this.leftPalm) {
      fill(0, 255, 255);
      noStroke();
      circle(this.leftPalm.x, this.leftPalm.y, 2);
    }

    if (this.pLeftPalm) {
      let distance = dist(
        this.leftPalm.x,
        this.leftPalm.y,
        this.pLeftPalm.x,
        this.pLeftPalm.y
      );
      let spacing = 40;

      if (distance > spacing) {
        let steps = max(1, floor(distance / spacing));

        let dx = this.leftPalm.x - this.pLeftPalm.x;
        let dy = this.leftPalm.y - this.pLeftPalm.y;

        for (let i = 0; i <= steps; i++) {
          let t = i / steps;
          let xhit = this.pLeftPalm.x + dx * t;
          let yhit = this.pLeftPalm.y + dy * t;

          this.hitPoints.push({ x: xhit, y: yhit });
        }
      }
    }

    /*for (let hitPoint of this.hitPoints) {
      fill(255, 0, 0);
      noStroke();
      circle(hitPoint.x, hitPoint.y, 10);
    }*/

    /*// right palm
    if (this.rightPalm) {
      this.pRightPalms = ghostEffect(this.pRightPalms, this.rightPalm);
    }

    if (this.hands[1]) {
      this.rightPalm = updatePalmPosition(this.hands[1]);
    }

    // draw palm
    if (this.rightPalm) {
      fill(0, 255, 255);
      noStroke();
      circle(this.rightPalm.x, this.rightPalm.y, 10);
    }*/
  }

  debug2D() {
    for (let i = 0; i < this.hands.length; i++) {
      let hand = this.hands[i];

      for (let j = 0; j < hand.keypoints.length; j++) {
        let keypoint = hand.keypoints[j];
        fill(255, 0, 0);
        noStroke();
        circle(-1280 / 2 + keypoint.x, -960 / 2 + keypoint.y, 10);
      }
    }
  }

  debug3D() {
    for (let i = 0; i < this.hands.length; i++) {
      let hand = this.hands[i];

      for (let j = 0; j < hand.keypoints3D.length; j++) {
        let keypoint = hand.keypoints3D[j];
        fill(0, 255, 0);
        noStroke();

        push();

        translate(keypoint.x * 2000, keypoint.y * 2000, keypoint.z * 2000);
        sphere(10);
        pop();
      }
    }
  }

  debug2DPalms() {
    if (this.hands[0]) {
      let hand = this.hands[0];
      let wrist = hand.wrist;
      let middleFingerBase = hand.middle_finger_mcp;
      let palmX = (wrist.x + middleFingerBase.x) / 2;
      let palmY = (wrist.y + middleFingerBase.y) / 2;
      fill(255, 0, 255);
      noStroke();
      circle(-1280 / 2 + palmX, -960 / 2 + palmY, 10);
    }

    if (this.hands[1]) {
      let hand = this.hands[1];
      let wrist = hand.wrist;
      let middleFingerBase = hand.middle_finger_mcp;
      let palmX = (wrist.x + middleFingerBase.x) / 2;
      let palmY = (wrist.y + middleFingerBase.y) / 2;
      fill(255, 0, 255);
      noStroke();
      circle(-1280 / 2 + palmX, -960 / 2 + palmY, 10);
    }
  }

  // Callback function for when handPose outputs data
  gotHands(results) {
    // Save the output to the hands variable
    this.hands = results;
    //console.log(results);
  }
}
