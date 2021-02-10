let gamePaused = false,
  scoreElem, 
  leftButton, rightButton, pauseButton,
  leftPressed = false, rightPressed = false, pausePressed = false,
  barLength = 100;

function createUI() {
  scoreElem = createDiv("TAPE UNROLLED: 0");
  //scoreElem.position(widthScreen/2-barLength/2, heightScreen-65);
  scoreElem.id = "score";
  scoreElem.style("color", "black");
  scoreElem.style("font-family", "Share Tech Mono");
  scoreElem.style("position", "absolute");
  scoreElem.style("left", "calc(50%-50px)");
  scoreElem.style("top", +(heightScreen - 65) + "px");

  leftButton = createButton("⤷");
  leftButton.mousePressed(turnLeft);
  leftButton.mouseReleased(releaseLeftButton);
  leftButton.style("position", "absolute");
  leftButton.style("left", "calc(50% - 90px)");

  rightButton = createButton("⤶");
  rightButton.mousePressed(turnRight);
  rightButton.mouseReleased(releaseRightButton);
  rightButton.style("position", "absolute");
  rightButton.style("left", "calc(50% - 20px)");

  pauseButton = createButton("||");
  pauseButton.mousePressed(pause);
  // pauseButton.mouseReleased(releaseRightButton);
  pauseButton.style("position", "absolute");
  pauseButton.style("left", "calc(50% + 50px)");


  leftButton.style("color", "black");
  leftButton.style("background-color", "white");
  leftButton.style("transform", "rotate(180deg)");
  leftButton.style("border", "2px solid");
  leftButton.style("border-radius", "10px");
  leftButton.style("box-shadow", "0px -8px black");
  leftButton.style("font-family", "Share Tech Mono");
  leftButton.style("font-size", "35px");
  leftButton.style("width", "60px");
  leftButton.style("height", "60px");
  leftButton.style("top", +(heightScreen + 40) + "px");

  rightButton.style("color", "black");
  rightButton.style("background-color", "white");
  rightButton.style("transform", "rotate(180deg)");
  rightButton.style("border", "2px solid");
  rightButton.style("border-radius", "10px");
  rightButton.style("box-shadow", "0px -8px black");
  rightButton.style("font-family", "Share Tech Mono");
  rightButton.style("font-size", "35px");
  rightButton.style("width", "60px");
  rightButton.style("height", "60px");
  rightButton.style("top", +(heightScreen + 40) + "px");

  pauseButton.style("color", "black");
  pauseButton.style("background-color", "white");
  pauseButton.style("transform", "rotate(180deg)");
  pauseButton.style("border", "2px solid");
  pauseButton.style("border-radius", "10px");
  pauseButton.style("box-shadow", "0px -8px black");
  pauseButton.style("font-family", "Share Tech Mono");
  pauseButton.style("font-size", "20px");
  pauseButton.style("width", "60px");
  pauseButton.style("height", "60px");
  pauseButton.style("top", +(heightScreen + 40) + "px");
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

/*
function mouseClicked() {
  pause();
}
*/

function pause() {
  if (gamePaused) {
    gamePaused = false;
    pauseButton.style("box-shadow", "0px -8px black");
    pauseButton.style("top", +(heightScreen + 40) + "px");
    timer.restartTimer();
  } else {
    gamePaused = true;
    pauseButton.style("box-shadow", "0px -2px black");
    pauseButton.style("top", +(heightScreen + 46) + "px");
    timer.pauseTimer();
  }
}

function turnLeft() {
  theta += 0.1;
  leftPressed = true;

  leftButton.style("box-shadow", "0px -2px black");
  leftButton.style("top", +(heightScreen + 46) + "px");
}

function turnRight() {
  theta -= 0.1;
  rightPressed = true;
  rightButton.style("box-shadow", "0px -2px black");
  rightButton.style("top", +(heightScreen + 46) + "px");
}

function releaseLeftButton() {

  leftPressed = false;
  leftButton.style("box-shadow", "0px -8px black");
  leftButton.style("top", +(heightScreen + 40) + "px");
  
}

function releaseRightButton() {

  rightPressed = false;
  rightButton.style("box-shadow", "0px -8px black");
  rightButton.style("top", +(heightScreen + 40) + "px");
  
}
