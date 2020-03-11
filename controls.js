let gamePaused = false;

function createUI (){

  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');

};

function drawBar () {
  rectMode(CORNER);
  rect(20, 50, barLength-(timer.normalized()*barLength),10);
}

function checkButton () {

  if (keyIsDown(65)) {
      theta += 0.1;
    }
  if (keyIsDown(68)) {
      theta -= 0.1;
    }
}

function mouseClicked() {
  if (gamePaused) {
    //speed = 2;
    gamePaused = false;
    timer.restartTimer();
  } else {
    //speed = 0;
    gamePaused = true;
    timer.pauseTimer();
  }
}

function mousePressed() {
}

function mouseReleased() {
}
