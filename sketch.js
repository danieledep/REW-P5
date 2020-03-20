p5.disableFriendlyErrors = true; // disables FES

let widthScreen = 800,
    heightScreen = 540,
    wheelRadius = 15,
    tapeStart = {
      x : widthScreen/3,
      y : heightScreen/2-50,
    },
    tapeEnd = {
      x : 2*widthScreen/3,
      y : heightScreen/2-50,
    },
    theta = Math.PI/2,
    tapes = [],
    sectionCross,
    crossDirection=0,
    particles = [],
    targetArea,
    somma,
    bgColors =['#33B1FF', '#FD5361', '#4CB5AE',
               '#BEEE62', '#36F1CD', '#F786AA',
               '#1B998B', '#6369D1', '#FFCF56',
               '#A0E8AF', '#F79824', '#FCEB00'];


    class Tape {
      constructor (x, y, crossDir, movement, wheelMov) {
        this.x = x;
        this.y = y;
        this.cross = crossDir;
        this.moving = movement;
        this.wheelMov = wheelMov;
      }

      update (x, y, movement, wheelMov) {
        this.x = x;
        this.y = y;
        this.moving = movement;
        this.wheelMov = wheelMov;
      }
    }



function setup() {
  createCanvas(widthScreen, heightScreen);
  select('canvas').style('background-color', random(bgColors));
  createUI();
  timer= new Timer;

  boundary = new Rectangle(0, 0, widthScreen, heightScreen );
  qtree = new QuadTree(boundary, 4);

  // setup stopped wheels at sides of starting tape
  particles[0] = new Particle ();
  particles[0].setup(tapeStart.x, tapeStart.y+wheelRadius, 0, false)
  particles[1] = new Particle ();
  particles[1].setup(tapeEnd.x, tapeEnd.y+wheelRadius, 0, false)
  particles[2] = new Particle ();
  let point0 = new Point(particles[0].x, particles[0].y, particles[0]);
  let point1 = new Point(particles[1].x, particles[1].y, particles[1]);

  qtree.insert(point0);
  qtree.insert(point1);


  let tapeLeft = new Tape(tapeStart.x, tapeStart.y, 0, false, 0);
  let tapeRight = new Tape(tapeEnd.x, tapeEnd.y, 0, false, 1);
  tapes.push(tapeLeft, tapeRight);

}


function draw() {
  clear();
  //background(220);
  //DEBUG QTREE
  //qtree.show();

  checkTimer();
  checkButton();
  checkCross();
  moveLine();

  drawTape();
  drawWheels();


  checkCrash();
  updateUI();
  //getCassetteData();


}

function createNewWheel () {
particles[particles.length] = new Particle ();
theta = Math.PI/2
timer.resetTimer();
}

function checkTimer() {
  if (timer.isFinished()) {
    for (let p of particles){
      if (p.moving) {
        let point = new Point(p.x, p.y, p);
         qtree.insert(point);
      }
      p.speed = 0;
      p.moving = false;
    }
    for (let w of tapes) w.moving = false;
    //qtree = new QuadTree(boundary,4);
    createNewWheel();
  }
}


function drawWheels() {
  let index=0;
  for (let p of particles) {
    p.move();
    p.render(index);
    index++;
  }
}

function checkCrash() {
  for (let p of particles) {
    if (p.moving) p.exits();
    let range = new Circle(p.x, p.y, p.r);
    let points = qtree.query(range);
    for (let point of points) {
      let other = point.userData;
      if (p !== other)  {
         if (p.intersects(other)) {p.collide(other)}
         // check when they are no more colliding
         else if (other.moving) {
           other.moving = false;
           //let point = new Point(other.x, other.y, other);
           //qtree.insert(point);
         }
      }
    }
  }
}

function drawTape() {

  strokeWeight(2);
  stroke(0);
  somma = 0;
  //draw static tape
  for (let i = 0; i<tapes.length-1; i++) {
  somma += int((dist(tapes[i].x, tapes[i].y, tapes[i+1].x, tapes[i+1].y))/40)

  //don't draw the segments connecting behind wheels
  if (tapes[i].wheelMov != tapes[i+1].wheelMov) line (tapes[i].x, tapes[i].y, tapes[i+1].x, tapes[i+1].y );
  }
}



function checkCross () {

// for each wheel - particle
for (let j = 0; (j< particles.length); j++) {
  let p = new Particle();
  Object.assign(p, particles[j]);

  // check if it's passing between tapes points
  for (let l = 0; (l< tapes.length-1); l++) {
  // only between those that are not moving
  if ((tapes[l].wheelMov != j) &&  (tapes[l+1].wheelMov != j)  && (tapes[l].wheelMov != tapes[l+1].wheelMov )) {

  let crossDirection = 0;

  // Translate everything so that line segment start point to (0, 0)
  let a = (tapes[l+1].x-tapes[l].x); // Line segment end point horizontal coordinate
  let b = (tapes[l+1].y-tapes[l].y); // Line segment end point vertical coordinate
  let c = p.x-tapes[l].x; // Circle center horizontal coordinate
  let d = p.y-tapes[l].y; // Circle center vertical coordinate

  // Collision computation
   if ((d*a - c*b)*(d*a - c*b) <= wheelRadius*wheelRadius*(a*a + b*b))
    {

    if (((c*a + d*b >= 0) && (c*a + d*b <= a*a + b*b)) ||
        ((a-c)*(a-c) + (b-d)*(b-d) <= wheelRadius*wheelRadius) ||
        (c*c + d*d <= wheelRadius*wheelRadius))
        {

      sectionCross = l;
      //console.log(l)

       // orientation computation
           if (d*a - c*b < 0) {
                            // Circle center is on left side looking from (x0, y0) to (x1, y1)
                            crossDirection = 1;
                            }
         insertMovingPoint(p, sectionCross, crossDirection, j);
        }
    }
  }

  }
  }
}

function moveLine () {

  for (let i = 0; i<tapes.length-2; i++) {

    //draw dinamic tape
    if ((particles[tapes[i+1].wheelMov].moving) &&  (particles[tapes[i+1].wheelMov].moving) && (tapes[i+1].wheelMov == tapes[i+2].wheelMov)) {


  //console.log("movieLine: ", i, " - ", i+1)
  //let q = particles[tapes[ind].wheelMov]
  let leftWheel= new Particle (),
      rightWheel= new Particle(),
      q= new Particle();
  Object.assign(q, particles[tapes[i+1].wheelMov]);
  Object.assign(leftWheel, particles[tapes[i].wheelMov]);
  Object.assign(rightWheel, particles[tapes[i+3].wheelMov]);


//DEBUG
//strokeWeight(0);
//fill(20, 200,90);
//ellipse (leftWheel.x, leftWheel.y, wheelRadius+20, wheelRadius+20)
//ellipse (rightWheel.x, rightWheel.y, wheelRadius+20, wheelRadius+20)


    let lt = calculateTangent(leftWheel, q, tapes[i].cross, tapes[i+1].cross);
    tapes[i].update(lt.x1, lt.y1, false, tapes[i].wheelMov)
    tapes[i+1].update(lt.x2, lt.y2, true, tapes[i+1].wheelMov)
    let d1 = dist(lt.x1, lt.y1, lt.x2, lt.y2)

    let rt = calculateTangent(q, rightWheel, tapes[i+2].cross, tapes[i+3].cross);
    tapes[i+2].update(rt.x1, rt.y1, true, tapes[i+2].wheelMov)
    tapes[i+3].update(rt.x2, rt.y2, false, tapes[i+3].wheelMov)
    let d2 = dist(rt.x1, rt.y1, rt.x2, rt.y2)

    //distance tape in between tangents
    let d12 = dist(lt.x2, lt.y2, rt.x1, rt.y1)

    let distanza = dist(lt.x1, lt.y1, rt.x2, rt.y2);
    //console.log("d1+d2+d12: ", d1+d2+d12, " dist: ", distanza)
    //console.log("tapes[i+1].cross: ", tapes[i+1].cross)


    if (d1+d2+d12- distanza < 1)
      {
          let crossingBack;
          // Translate everything so that line segment start point to (0, 0)
          let a = (tapes[i+3].x-tapes[i].x); // Line segment end point horizontal coordinate
          let b = (tapes[i+3].y-tapes[i].y); // Line segment end point vertical coordinate
          let c = q.x-tapes[i].x; // Circle center horizontal coordinate
          let d = q.y-tapes[i].y; // Circle center vertical coordinate

          // Collision computation
           if ((d*a - c*b)*(d*a - c*b) <= wheelRadius*wheelRadius*(a*a + b*b))
            {

            if (((c*a + d*b >= 0) && (c*a + d*b <= a*a + b*b)) ||
                ((a-c)*(a-c) + (b-d)*(b-d) <= wheelRadius*wheelRadius) ||
                (c*c + d*d <= wheelRadius*wheelRadius))
                {

                  crossingBack = 0

               // orientation computation
                   if (d*a - c*b < 0) {
                                    // Circle center is on left side looking from (x0, y0) to (x1, y1)
                                    crossingBack = 1;
                                    }
                }
            }
          if (crossingBack != tapes[i+1].cross ) {
                                      //console.log("release")
                                      tapes.splice(i+1, 2);
                                    }
          //console.log("crossingBack: ", crossingBack)
        }

}
}
}


function insertMovingPoint (point, sectionCross, crossDirection, wheelCross) {


  let leftWheel= new Particle (),
      rightWheel= new Particle();

  Object.assign(leftWheel, particles[tapes[sectionCross].wheelMov]);
  Object.assign(rightWheel, particles[tapes[sectionCross+1].wheelMov]);

  let lt = calculateTangent(leftWheel, point, tapes[sectionCross].cross, crossDirection);
  tapes[sectionCross].update(lt.x1, lt.y1, false, tapes[sectionCross].wheelMov)
  let insertTapeLeft = new Tape (lt.x2, lt.y2, crossDirection, true, wheelCross);


  let rt = calculateTangent(point, rightWheel, crossDirection, tapes[sectionCross+1].cross);
  let insertTapeRight = new Tape (rt.x1, rt.y1, crossDirection, true, wheelCross);
  tapes[sectionCross+1].update(rt.x2, rt.y2, false, tapes[sectionCross+1].wheelMov)


  tapes.splice(sectionCross+1, 0, insertTapeLeft, insertTapeRight);
}


function calculateTangent(pointLeft, pointRight, crossLeft, crossRight) {


    let dst = (dist(pointLeft.x, pointLeft.y, pointRight.x, pointRight.y))/2;
    let angle = atan2(( pointRight.y-pointLeft.y),(pointRight.x-pointLeft.x)) ;
    let angle2 = acos ((wheelRadius*2)/dst);
    let x1, y1, x2, y2;



    if (crossLeft == 0 && crossRight == 0) {

        //  TANGENT ABOVE

         x1 = pointLeft.x+Math.sin(angle)*wheelRadius;
         y1 = pointLeft.y-Math.cos(angle)*wheelRadius;
         x2 = pointRight.x+Math.sin(angle)*wheelRadius;
         y2 = pointRight.y-Math.cos(angle)*wheelRadius;

        }

  else if (crossLeft == 0 &&  crossRight == 1) {

        //  TANGENT UP / DOWN

            x1 = pointLeft.x + Math.cos(angle-angle2)*wheelRadius;
            y1 = pointLeft.y + Math.sin(angle-angle2)*wheelRadius;
            x2 =  pointRight.x - Math.cos(angle-angle2)*wheelRadius;
            y2 =  pointRight.y - Math.sin(angle-angle2)*wheelRadius;

        }

   else if (crossLeft == 1 && crossRight == 0) {

        //  TANGENT DOWN / UP

             x1 = pointLeft.x + Math.cos(angle+angle2)*wheelRadius;
             y1 = pointLeft.y + Math.sin(angle+angle2)*wheelRadius;
             x2 =  pointRight.x - Math.cos(angle+angle2)*wheelRadius;
             y2 =  pointRight.y - Math.sin(angle+angle2)*wheelRadius;

        }

        else if (crossLeft == 1 && crossRight == 1) {

        //  TANGENT BELOW

             x1 = pointLeft.x - Math.sin(angle)*wheelRadius;
             y1 = pointLeft.y + Math.cos(angle)*wheelRadius;
             x2 =  pointRight.x - Math.sin(angle)*wheelRadius;
             y2 =  pointRight.y + Math.cos(angle)*wheelRadius;

        }

    let tangent = {x1, y1, x2, y2}
    return tangent;

}
