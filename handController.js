class HandController {
  constructor() {
    this.handPose;
    this.video;
    this.hands = [];
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
    this.handPose.detectStart(video, this.gotHands);
  }

  draw() {
    // Draw all the tracked hand points
    for (let i = 0; i < this.hands.length; i++) {
      let hand = this.hands[i];
      for (let j = 0; j < hand.keypoints.length; j++) {
        let keypoint = hand.keypoints[j];
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x - width / 2, keypoint.y - height / 2, 10);
      }
    }
  }

  // Callback function for when handPose outputs data
  gotHands(results) {
    // Save the output to the hands variable
    this.hands = results;
  }
}
