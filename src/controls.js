let gamePaused = false,
  scoreElem,
  leftButton,
  rightButton,
  pauseButton,
  leftPressed = false,
  rightPressed = false,
  barLength = 100;

function createUI() {
  scoreElem = createDiv("TAPE UNROLLED: 0");
  scoreElem.id = "score";
  scoreElem.style("color", "black");
  scoreElem.style("position", "absolute");
  scoreElem.style("left", "calc(50%-50px)");
  scoreElem.style("top", +(heightScreen - 108) + "px");

  leftButton = createButton("⬅️");
  leftButton.mousePressed(turnLeft);
  leftButton.mouseReleased(releaseLeftButton);
  leftButton.addClass("controls");
  leftButton.style("left", "calc(50% - 165px)");

  pauseButton = createButton("▶️");
  pauseButton.mousePressed(pause);
  pauseButton.addClass("controls");
  pauseButton.style("font-bold", "bolder");
  pauseButton.style("left", "calc(50% - 95px)");

  rightButton = createButton("➡️");
  rightButton.mousePressed(turnRight);
  rightButton.mouseReleased(releaseRightButton);
  rightButton.addClass("controls");
  rightButton.style("left", "calc(50% - 25px)");

  newWheelButton = createButton("⏏️");
  newWheelButton.mousePressed(ejectWheel);
  newWheelButton.mouseReleased(releaseEjectWheelButton);
  newWheelButton.addClass("controls");
  newWheelButton.style("left", "calc(50% + 45px)");

  restartButton = createButton("🔄");
  restartButton.mousePressed(restartPage);
  restartButton.mouseReleased(releaseRestartButton);
  restartButton.addClass("controls");
  restartButton.style("left", "calc(50% + 115px)");
}

function updateUI() {
  rectMode(CORNER);
  fill(0);
  rect(
    widthScreen / 2 - barLength / 2,
    heightScreen - 150,
    barLength - timer.normalized() * barLength,
    18
  );
  stroke(0);
  noFill();
  strokeWeight(2);
  rect(
    widthScreen / 2 - barLength / 2 - 2,
    heightScreen - 150 - 2,
    barLength,
    20
  );

  scoreElem.html("TAPE UNROLLED: " + somma + "CM");
}

function checkButton() {
  if (keyIsDown(65) || keyIsDown(37)) {
    turnLeft();
    return;
  }

  if (keyIsDown(68) || keyIsDown(39)) {
    turnRight();
    return;
  }

  if (keyIsDown(32)) {
    pause();
    return;
  }

  if (keyIsDown(38) || keyIsDown(87)) {
    ejectWheel();
    return;
  }

  if (leftPressed) turnLeft();
  if (rightPressed) turnRight();

  return false; // prevent any default behavior
}

function keyReleased() {
  if (keyCode === 65 || keyCode === 37) {
    releaseLeftButton();
  }

  if (keyCode === 68 || keyCode === 39) {
    releaseRightButton();
  }

  if (keyCode === 38 || keyCode === 87) {
    releaseEjectWheelButton();
  }

  return false; // prevent any default behavior
}

function pause() {
  if (gamePaused) {
    unpauseGame();
  } else {
    pauseGame();
  }
}

function pauseGame() {
  gamePaused = true;
  pauseButton.removeClass("buttonPressed");
  pauseButton.html("▶️");
  timer.pauseTimer();
}

function unpauseGame() {
  gamePaused = false;
  pauseButton.addClass("buttonPressed");
  pauseButton.html("⏸");
  timer.restartTimer();
}

function turnLeft() {
  theta += 0.1;
  leftPressed = true;
  leftButton.addClass("buttonPressed");
}

function turnRight() {
  theta -= 0.1;
  rightPressed = true;
  rightButton.addClass("buttonPressed");
}

function restartPage() {
  restartButton.addClass("buttonPressed");
}

function ejectWheel() {
  newWheelButton.addClass("buttonPressed");
}

function releaseLeftButton() {
  leftPressed = false;
  leftButton.removeClass("buttonPressed");
}

function releaseRightButton() {
  rightPressed = false;
  rightButton.removeClass("buttonPressed");
}

function releaseRestartButton() {
  window.location.href = "index.html";
}

function releaseEjectWheelButton() {
  if (gamePaused) unpauseGame();

  // if ejecting instead of playing the first wheel
  if (particles.length == 3) unpauseGame();
  else stopWheels();

  newWheelButton.removeClass("buttonPressed");
}
