function checkButton () {

  if (keyIsDown(65)) {
      theta += 0.1;
    }
  if (keyIsDown(68)) {
      theta -= 0.1;
    }
}

function mouseClicked() {
  if (speed === 0) {
    speed = 2;
    timer.restartTimer();
  } else {
    speed = 0;
    timer.pauseTimer();
  }
}

function mousePressed() {
}

function mouseReleased() {
}
