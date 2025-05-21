// adapted from https://docs.ml5js.org/#/reference/handpose

class HandController {
  constructor() {
    this.handPose;
    this.video;
    this.hands = [];
    this.leftPalm = {};
    this.rightPalm = {};
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

    if (this.hands[0]) {
      let hand = this.hands[0];
      let wrist = hand.wrist;
      let middleFingerBase = hand.middle_finger_mcp;
      let palmX = (wrist.x + middleFingerBase.x) / 2;
      let palmY = (wrist.y + middleFingerBase.y) / 2;
      this.leftPalm = createVector(-1 * (-1280 / 2 + palmX), -960 / 2 + palmY);
      fill(0, 255, 255);
      noStroke();
      circle(this.leftPalm.x, this.leftPalm.y, 10);
    }

    if (this.hands[1]) {
      let hand = this.hands[1];
      let wrist = hand.wrist;
      let middleFingerBase = hand.middle_finger_mcp;
      let palmX = (wrist.x + middleFingerBase.x) / 2;
      let palmY = (wrist.y + middleFingerBase.y) / 2;
      this.rightPalm = createVector(-1 * (-1280 / 2 + palmX), -960 / 2 + palmY);
      fill(0, 0, 255);
      noStroke();
      circle(this.rightPalm.x, this.rightPalm.y, 10);
    }
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
    console.log(results);
  }
}
