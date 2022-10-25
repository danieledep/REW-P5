let gamePaused = false,
  leftButton,
  rightButton,
  pauseButton,
  leftPressed = false,
  rightPressed = false,
  barLength = 100
  date = new Date();

let bgColors = [
    "#33B1FF",
    "#FD5361",
    "#4CB5AE",
    "#BEEE62",
    "#36F1CD",
    "#F786AA",
    "#1B998B",
    "#6369D1",
    "#FFCF56",
    "#A0E8AF",
    "#F79824",
    "#FCEB00",
  ];

let randomColor = randomArrayItem(bgColors);
  document.documentElement.style.setProperty('--backgroundColor', randomColor);


function createUI() {

  controlsContainer = createDiv();
  controlsContainer.addClass("controlsContainer");

  screenshotButtonContainer = createDiv();
  screenshotButtonContainer.addClass("buttonContainer");
  screenshotButtonContainer.parent(controlsContainer);

  screenshotButton = createButton("⏺");
  screenshotButton.mousePressed(screenshotPage);
  screenshotButton.mouseReleased(releaseScreenshotButton);
  screenshotButton.touchStarted(screenshotPage);
  screenshotButton.touchEnded(releaseScreenshotButton);
  screenshotButton.addClass("button");
  screenshotButton.parent(screenshotButtonContainer);

  restartButtonContainer = createDiv();
  restartButtonContainer.addClass("buttonContainer");
  restartButtonContainer.parent(controlsContainer);

  restartButton = createButton("🔄");
  restartButton.mousePressed(restartPage);
  restartButton.mouseReleased(releaseRestartButton);
  restartButton.touchStarted(restartPage);
  restartButton.touchEnded(releaseRestartButton);
  restartButton.addClass("button");
  restartButton.parent(restartButtonContainer);

  newWheelButtonContainer = createDiv();
  newWheelButtonContainer.addClass("buttonContainer");
  newWheelButtonContainer.parent(controlsContainer);

  newWheelButton = createButton("⏏️");
  newWheelButton.mousePressed(ejectWheel);
  newWheelButton.mouseReleased(releaseEjectWheelButton);
  newWheelButton.touchStarted(ejectWheel);
  newWheelButton.touchEnded(releaseEjectWheelButton);
  newWheelButton.addClass("button");
  newWheelButton.parent(newWheelButtonContainer);

  leftButtonContainer = createDiv();
  leftButtonContainer.addClass("buttonContainer");
  leftButtonContainer.parent(controlsContainer);

  leftButton = createButton("⬅️");
  leftButton.mousePressed(turnLeft);
  leftButton.mouseReleased(releaseLeftButton);
  leftButton.touchStarted(turnLeft);
  leftButton.touchEnded(releaseLeftButton);
  leftButton.addClass("button");
  leftButton.parent(leftButtonContainer);

  pauseButtonContainer = createDiv();
  pauseButtonContainer.addClass("buttonContainer");
  pauseButtonContainer.parent(controlsContainer);

  pauseButton = createButton("▶️");
  pauseButton.mousePressed(stop);
  // pauseButton.touchStarted(stop);
  pauseButton.addClass("button");
  pauseButton.style("font-bold", "bolder");
  pauseButton.parent(pauseButtonContainer);

  rightButtonContainer = createDiv();
  rightButtonContainer.addClass("buttonContainer");
  rightButtonContainer.parent(controlsContainer);

  rightButton = createButton("➡️");
  rightButton.mousePressed(turnRight);
  rightButton.mouseReleased(releaseRightButton);
  rightButton.touchStarted(turnRight);
  rightButton.touchEnded(releaseRightButton);
  rightButton.addClass("button");
  rightButton.parent(rightButtonContainer);

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

  fill(0)
  .strokeWeight(0)
  .textSize(16);
  textFont(shareTechMono);
  textAlign(CENTER);
  text('[ TAPE ' + tapeUnrolled + 'CM ]     [ WHEELS ' + particles.length + ' ]' , widthScreen / 2, heightScreen - 83);
}

function randomArrayItem(items) {
  return items[Math.floor(Math.random()*items.length)];    
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

  if (keyIsDown(38) || keyIsDown(87)) {
    ejectWheel();
    return;
  }

  if (keyIsDown(82)) {
    screenshotPage();
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

  if (keyCode === 32) {
    stop();
  }

  if (keyCode === 38 || keyCode === 87) {
    releaseEjectWheelButton();
  }

  if (keyCode === 82) {
    releaseScreenshotButton();
  }

  return false; // prevent any default behavior
}

function stop() {
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
  theta = theta % (2 * PI);
  leftPressed = true;
  leftButton.addClass("buttonPressed");
}

function turnRight() {
  theta -= 0.1;
  theta = theta % (2 * PI);
  rightPressed = true;
  rightButton.addClass("buttonPressed");
}

function restartPage() {
  restartButton.addClass("buttonPressed");
}

function ejectWheel() {
  newWheelButton.addClass("buttonPressed");
}

function screenshotPage() {
  screenshotButton.addClass("buttonPressed");
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
  if (particles.at(-1).x == start.x && particles.at(-1).y == start.y)
    unpauseGame();
  else stopWheels();

  newWheelButton.removeClass("buttonPressed");
}

function releaseScreenshotButton() {
  let dateString = ('0' + date.getDate()).slice(-2) + '-'
  + ('0' + (date.getMonth()+1)).slice(-2) + '-'
  + date.getFullYear();

  // Save only the game canvas
  // saveCanvas('Screenshot-' + dateString , 'png');

  // Save the whole page with html2canvas
  html2canvas(document.querySelector('html')).then(function(canvas) {
    saveAs(canvas.toDataURL(), 'Screenshot-' + dateString + '.png');
  });

  screenshotButton.removeClass("buttonPressed");
}

function saveAs(uri, filename) {

  var link = document.createElement('a');

  if (typeof link.download === 'string') {

      link.href = uri;
      link.download = filename;
      //Firefox requires the link to be in the body
      document.body.appendChild(link);
      //simulate click
      link.click();
      //remove the link when done
      document.body.removeChild(link);

  } else {
      window.open(uri);
  }
}
