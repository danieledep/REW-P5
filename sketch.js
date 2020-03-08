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
    tapeLeft,
    tapeRight,
    insertTape,
    tapes = [],
    sectionCross,
    crossDirection=0,
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
        this.color = 'white';
      }
      display() {
        fill(this.color)
        ellipse (this.x, this.y,wheelRadius*2, wheelRadius*2);
      }

      update() {
        this.x += speed  * cos(theta);
        this.y -= speed  * sin(theta);
      }
    }

    class Tape {
      constructor (x, y) {
        this.x = x;
        this.y = y;
        this.cross = 1;
        this.moving = false;
      }
    }

function setup() {
  createCanvas(widthScreen, heightScreen);
  tapeLeft = new Tape(0, heightScreen-50);
  tapeRight = new Tape(widthScreen, heightScreen-50);
  tapes.push(tapeLeft, tapeRight);
  // SCORE SECTION
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');
  timer= new Timer;
  newWheel = new NewWheel;
  insertTape = new Tape(newWheel.x, newWheel.y);
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
  checkCrash();

}

function createNewWheel () {
wheels.push (newWheel);
theta = Math.PI/2
timer.resetTimer();
newWheel = new NewWheel;
for (let g = 0; (g< tapes.length-1); g++) if (tapes[g].moving) tapes[g].moving = false;
insertTape = new Tape(newWheel.x, newWheel.y);
}

function moveWheel() {
    newWheel.update();
    newWheel.display();
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
    if (checkCrash()) fill('red')
    else fill('white');

    wheels[i].display();

  }
}

function drawTape() {


  for (let i = 0; i<tapes.length-1; i++) {

    let dst = (dist(tapes[i].x, tapes[i].y, tapes[i+1].x, tapes[i+1].y))/2;
    let angle = atan2(( tapes[i+1].y-tapes[i].y),(tapes[i+1].x-tapes[i].x)) ;
    let angle2 = acos ((wheelRadius)/dst);

    if (tapes[i].cross == 0 && tapes[i+1].cross == 0) {

        //  TANGENT ABOVE

         let x1 = tapes[i].x+sin(angle)*wheelRadius;
         let y1 = tapes[i].y-cos(angle)*wheelRadius;
         let x2 = tapes[i+1].x+sin(angle)*wheelRadius;
         let y2 = tapes[i+1].y-cos(angle)*wheelRadius;


       line (x1, y1, x2, y2 );

        }

  else if (tapes[i].cross == 0 && tapes[i+1].cross == 1) {

        //  TANGENT UP / DOWN

             let x3 = tapes[i].x + cos(angle-angle2)*wheelRadius;
             let y3 = tapes[i].y + sin(angle-angle2)*wheelRadius;
             let x4 =  tapes[i+1].x - cos(angle-angle2)*wheelRadius;
             let y4 =  tapes[i+1].y - sin(angle-angle2)*wheelRadius;


       line (x3, y3, x4, y4 );

        }

   else if (tapes[i].cross == 1 && tapes[i+1].cross == 0) {

        //  TANGENT DOWN / UP


             let x5 = tapes[i].x + cos(angle+angle2)*wheelRadius;
             let y5 = tapes[i].y + sin(angle+angle2)*wheelRadius;
             let x6 =  tapes[i+1].x - cos(angle+angle2)*wheelRadius;
             let y6 =  tapes[i+1].y - sin(angle+angle2)*wheelRadius;


       line (x5, y5, x6, y6 );

        }

        else if (tapes[i].cross == 1 && tapes[i+1].cross == 1) {

        //  TANGENT BELOW


             let x7 = tapes[i].x - sin(angle)*wheelRadius;
             let y7 = tapes[i].y + cos(angle)*wheelRadius;
             let x8 =  tapes[i+1].x - sin(angle)*wheelRadius;
             let y8 =  tapes[i+1].y + cos(angle)*wheelRadius;

       line (x7, y7, x8, y8 );

        }


    //line (tapes[i].x, tapes[i].y,tapes[i+1].x, tapes[i+1].y);
  }
}

function checkCross () {

  for (let l = 0; (l< tapes.length-1); l++) {

  let crossDirection = 0;
    // Translate everything so that line segment start point to (0, 0)
  let a = (tapes[l+1].x-tapes[l].x); // Line segment end point horizontal coordinate
  let b = (tapes[l+1].y-tapes[l].y); // Line segment end point vertical coordinate
  let c = newWheel.x-tapes[l].x; // Circle center horizontal coordinate
  let d = newWheel.y-tapes[l].y; // Circle center vertical coordinate



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

         if ((!tapes[sectionCross].moving) && (!tapes[sectionCross+1].moving) && !(checkCrash())) insertMovingPoint(sectionCross, crossDirection);
         else if ((tapes[sectionCross].moving) )  movePoint(sectionCross, crossDirection);
        }
  }
  }
  }

function insertMovingPoint (sectionCross, crossDirection) {

  insertTape.x = newWheel.x;
  insertTape.y = newWheel.y;
  insertTape.cross = crossDirection;
  insertTape.moving = true;
  tapes.splice(sectionCross+1, 0, insertTape);
}

function movePoint (sectionCross, crossDirection) {

  insertTape.x = newWheel.x;
  insertTape.y = newWheel.y;
  tapes.splice(sectionCross, 1, insertTape);
}

function checkCrash () {
  for (let k = 0; k< wheels.length; k++) {
  console.log(wheels.length)
  if ( dist(newWheel.x, newWheel.y, wheels[k].x, wheels[k].y) < wheelRadius*2)
  {
    console.log("crash: ", k)
    theta += Math.PI/2;
    return true
  }
  else return false
}
}

//function checkGameStatus() {
//  if () {
//    noLoop();
 //   const scoreVal = parseInt(scoreElem.html().substring(8));
 //   scoreElem.html('Game ended! Your score was : ' + scoreVal);
 // }
//}
