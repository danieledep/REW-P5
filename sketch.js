let widthScreen = 800,
    heightScreen = 600,
    wheelRadius = 10,
    scoreElem,
    start1 = {
      x : widthScreen/3,
      y : heightScreen-30,
    },
    start2 = {
      x : 2*widthScreen/3,
      y : heightScreen-300,
    },
    newWheel,
    theta = Math.PI/2,
    speed = 2,
    wheels =[],
    tapeLeft = {
      x : 0,
      y : heightScreen-50,
    },
    tapeRight = {
      x : widthScreen,
      y : heightScreen-50,
    },
    tape = [],
    sectionCross,
    crossDirection,
    barLength = 100;

    class NewWheel {
      constructor () {
        if ((wheels.length % 2) == 0) {
          this.x = start1.x;
          this.y = start1.y;
        }
        else {
          this.x = start2.x;
          this.y = start2.y;
        }
      }
    }

function setup() {
  createCanvas(widthScreen, heightScreen);
  tape.push(tapeLeft, tapeRight);
  // SCORE SECTION
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');
  timer= new Timer;
  newWheel = new NewWheel;
}


function draw() {
  background(220);

  checkTimer();
  checkButton();
  moveWheel();
  checkCross();
  drawArray();
  drawTape();
  drawBar();

}



function createNewWheel () {
wheels.push (newWheel);
theta = Math.PI/2
timer.resetTimer();
newWheel = new NewWheel;
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

function moveWheel() {
    newWheel.x += speed  * cos(theta);
    newWheel.y -= speed  * sin(theta);
ellipse (newWheel.x, newWheel.y,wheelRadius, wheelRadius);
}

function checkTimer() {
  if (timer.isFinished()) {
    createNewWheel();
  }
}

function drawBar () {
  rect(20, 50, barLength-(timer.normalized()*barLength),10);
}


function drawArray() {
  for (let i = 0; i<wheels.length; i++) {
      //console.log(i);
    ellipse (wheels[i].x, wheels[i].y,wheelRadius, wheelRadius);
  }
}

function drawTape() {


  for (let i = 0; i<tape.length-1; i++) {

    let dst = (dist(tape[i].x, tape[i].y, tape[i+1].x, tape[i+1].y))/2;
    let angle = atan2(( tape[i+1].y-tape[i].y),(tape[i+1].x-tape[i].x)) ;
    let angle2 = acos ((wheelRadius)/dst);

    line (tape[i].x, tape[i].y,tape[i+1].x, tape[i+1].y);
  }
}

function checkCross () {

  for (let l = 0; (l< tape.length-1); l++) {

    // Translate everything so that line segment start point to (0, 0)
  let a = (tape[l+1].x-tape[l].x); // Line segment end point horizontal coordinate
  let b = (tape[l+1].y-tape[l].y); // Line segment end point vertical coordinate
  let c = newWheel.x-tape[l].x; // Circle center horizontal coordinate
  let d = newWheel.y-tape[l].y; // Circle center vertical coordinate


  // Collision computation
   if ((d*a - c*b)*(d*a - c*b) <= wheelRadius*wheelRadius*(a*a + b*b)) {

    if ( ((c*a + d*b >= 0) && (c*a + d*b <= a*a + b*b)) || ((a-c)*(a-c) + (b-d)*(b-d) <= wheelRadius*wheelRadius) || (c*c + d*d <= wheelRadius*wheelRadius) ){

      sectionCross = l;
    //console.log(l)

       // orientation computation
           if (d*a - c*b < 0) {
            // Circle center is on left side looking from (x0, y0) to (x1, y1)
            crossDirection = 1;
            }

        // console.log(sectionCross);
        insertMovingPoint(sectionCross);
        }
  }
  }
  }

function insertMovingPoint (sectionCross) {

  if ((newWheel != tape[sectionCross]) && (newWheel != tape[sectionCross+1])){
  tape.splice(sectionCross+1, 0, newWheel);
  }

}

//function checkGameStatus() {
//  if () {
//    noLoop();
 //   const scoreVal = parseInt(scoreElem.html().substring(8));
 //   scoreElem.html('Game ended! Your score was : ' + scoreVal);
 // }
//}
