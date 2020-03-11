let widthScreen = 800,
    heightScreen = 600,
    wheelRadius = 15,
    scoreElem,
    start1 = {
      x : widthScreen/3,
      y : heightScreen-30,
    },
    start2 = {
      x : 2*widthScreen/3,
      y : heightScreen-300,
    },
    theta = Math.PI/2,
    tapeLeft,
    tapeRight,
    insertTape,
    tapes = [],
    sectionCross,
    crossDirection=0,
    barLength = 100,
    particles = [];


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
  createUI();

  timer= new Timer;

  boundary = new Rectangle(0, 0, widthScreen, heightScreen );
  qtree = new QuadTree(boundary, 4);
  particles[0] = new Particle ();

  tapeLeft = new Tape(0, heightScreen-50);
  tapeRight = new Tape(widthScreen, heightScreen-50);
  tapes.push(tapeLeft, tapeRight);

}


function draw() {
  background(220);
  //DEBUG QTREE
  //qtree.show();

  checkTimer();
  checkButton();
  checkCross();
  drawArray();
  drawTape();
  checkCrash();
  drawBar();


}

function createNewWheel () {
particles[particles.length] = new Particle ();
theta = Math.PI/2
timer.resetTimer();
for (let g = 0; (g< tapes.length-1); g++) if (tapes[g].moving) tapes[g].moving = false;
}

function checkTimer() {
  if (timer.isFinished()) {
    for (let p of particles){
      if (p.speed != 0) p.speed = 0;
      p.moving = false;
    }
    createNewWheel();
  }
}


function drawArray() {
  let index=0;
  for (let p of particles) {
    let point = new Point(p.x, p.y, p);
    qtree.insert(point);
    p.move();
    p.render(index);
    index++;
  }
}

function checkCrash() {
  for (let p of particles) {
    let range = new Circle(p.x, p.y, p.r);
    let points = qtree.query(range);
    for (let point of points) {
      let other = point.userData;
      // for (let other of particles) {
      if (p !== other && p.intersects(other)) {
        p.collide(other)
      }
    }
  }

}
function drawTape() {

  stroke(0);

  for (let i = 0; i<tapes.length-1; i++) {

    let dst = (dist(tapes[i].x, tapes[i].y, tapes[i+1].x, tapes[i+1].y))/2;
    let angle = atan2(( tapes[i+1].y-tapes[i].y),(tapes[i+1].x-tapes[i].x)) ;
    let angle2 = acos ((wheelRadius*2)/dst);

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

for (let p of particles) {
  if (p.moving) {
  for (let l = 0; (l< tapes.length-1); l++) {

  let crossDirection = 0;
    // Translate everything so that line segment start point to (0, 0)
  let a = (tapes[l+1].x-tapes[l].x); // Line segment end point horizontal coordinate
  let b = (tapes[l+1].y-tapes[l].y); // Line segment end point vertical coordinate
  let c = p.x-tapes[l].x; // Circle center horizontal coordinate
  let d = p.y-tapes[l].y; // Circle center vertical coordinate



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

         if ((!tapes[sectionCross].moving) && (!tapes[sectionCross+1].moving)) insertMovingPoint(p.x, p.y, sectionCross, crossDirection);
         else if ((tapes[sectionCross].moving) )  movePoint(p.x, p.y,sectionCross, crossDirection);
        }
  }
  }
  }
  }
}

function insertMovingPoint (x, y, sectionCross, crossDirection) {
  insertTape = new Tape();
  insertTape.x = x;
  insertTape.y = y;
  insertTape.cross = crossDirection;
  insertTape.moving = true;
  tapes.splice(sectionCross+1, 0, insertTape);
}

function movePoint (x, y, sectionCross, crossDirection) {

  insertTape.x = x;
  insertTape.y = y;
  tapes.splice(sectionCross, 1, insertTape);
}



//function checkGameStatus() {
//  if () {
//    noLoop();
 //   const scoreVal = parseInt(scoreElem.html().substring(8));
 //   scoreElem.html('Game ended! Your score was : ' + scoreVal);
 // }
//}
