let gamePaused = false,
  scoreElem, 
  leftButton, rightButton, pauseButton,
  leftPressed = false, rightPressed = false, pausePressed = false,
  barLength = 100;

function createUI() {
  scoreElem = createDiv("TAPE UNROLLED: 0");
  scoreElem.id = "score";
  scoreElem.style("color", "black");
  scoreElem.style("position", "absolute");
  scoreElem.style("left", "calc(50%-50px)");
  scoreElem.style("top", +(heightScreen - 65) + "px");

  leftButton = createButton("⤷");
  leftButton.mousePressed(turnLeft);
  leftButton.mouseReleased(releaseLeftButton);
  leftButton.addClass('controls');
  leftButton.style("left", "calc(50% - 90px)");

  rightButton = createButton("⤶");
  rightButton.mousePressed(turnRight);
  rightButton.mouseReleased(releaseRightButton);
  rightButton.addClass('controls');
  rightButton.style("left", "calc(50% - 20px)");

  pauseButton = createButton("||");
  pauseButton.mousePressed(pause);
  pauseButton.addClass('controls');
  pauseButton.style("font-size", "20px");
  pauseButton.style("left", "calc(50% + 50px)");

}

function updateUI() {
  rectMode(CORNER);
  fill(0);
  rect(
    widthScreen / 2 - barLength / 2,
    heightScreen - 100,
    barLength - timer.normalized() * barLength,
    15
  );
  stroke(0);
  noFill();
  strokeWeight(2);
  rect(
    widthScreen / 2 - barLength / 2 - 2,
    heightScreen - 100 - 2,
    barLength,
    17
  );

  scoreElem.html("TAPE UNROLLED: " + somma + "CM");
}

function checkButton() {
  if ((keyIsDown(65)) || (keyIsDown(37))) {
    turnLeft();
    return
  }

  if ((keyIsDown(68)) || (keyIsDown(39))) {
    turnRight();
    return
  }

  if (keyIsDown(32)) {
    pause();
    return
  }

  if (leftPressed) turnLeft();
  if (rightPressed) turnRight();

  return false; // prevent any default behavior
}

function keyReleased(){
  if ((keyCode === 65) || (keyCode === 37)) {
    releaseLeftButton();
  }

  if ((keyCode === 68) || (keyCode === 39)) {
    releaseRightButton();
  }
  
  return false; // prevent any default behavior
}



function pause() {
  if (gamePaused) {
    gamePaused = false;
    pauseButton.removeClass('buttonPressed');
    timer.restartTimer();
  } else {
    gamePaused = true;
    pauseButton.addClass('buttonPressed');
    timer.pauseTimer();
  }
}

function turnLeft() {
  theta += 0.1;
  leftPressed = true;

  leftButton.addClass('buttonPressed');
}

function turnRight() {
  theta -= 0.1;
  rightPressed = true;
  rightButton.addClass('buttonPressed');
}

function releaseLeftButton() {

  leftPressed = false;
  leftButton.removeClass('buttonPressed');
  
}

function releaseRightButton() {

  rightPressed = false;
  rightButton.removeClass('buttonPressed');
  
}
