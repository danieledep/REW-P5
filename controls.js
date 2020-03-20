let gamePaused = false,
    scoreElem,
    barLength = 100;


function createUI (){

  scoreElem = createDiv('TAPE UNROLLED: 0');
  //scoreElem.position(widthScreen/2-barLength/2, heightScreen-65);
  scoreElem.id = 'score';
  scoreElem.style('color', 'black');
  scoreElem.style('font-family', 'Share Tech Mono');
  scoreElem.style('position', 'absolute')
  scoreElem.style('left', 'calc(50%-50px)')
  scoreElem.style('top', + (heightScreen-65) + 'px')
}

function updateUI () {

  rectMode(CORNER);
  fill(0);
  rect(widthScreen/2-barLength/2,heightScreen-100, barLength-(timer.normalized()*barLength),15);
  stroke(0);
  noFill();
  strokeWeight(2);
  rect(widthScreen/2-barLength/2-2,heightScreen-100-2, barLength,17);

  scoreElem.html('TAPE UNROLLED: ' + somma + 'CM');
}

function checkButton () {

  if (keyIsDown(65))
    {
      theta += 0.1;
    }
    if (keyIsDown(37))
      {
        theta += 0.1;
      }

  if (keyIsDown(68))
    {
      theta -= 0.1;
    }
  if (keyIsDown(39))
    {
      theta -= 0.1;
    }

    return false; // prevent any default behavior
}



function mouseClicked() {
  pause();
}

function mousePressed() {
}

function mouseReleased() {
}

function pause() {
  if (gamePaused) {
    gamePaused = false;
    timer.restartTimer();
  } else {
    gamePaused = true;
    timer.pauseTimer();
  }
}
