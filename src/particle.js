let friction = 0.4,
  initialSpeed = 3,
  start = {
    x: widthScreen / 2,
    y: heightScreen - 150,
  };

class Particle {
  constructor() {
    this.x = start.x;
    this.y = start.y;
    this.r = wheelRadius;
    (this.speed = initialSpeed),
      (this.color = "gray"),
      (this.vx = 0),
      (this.vy = 0),
      (this.moving = true);
    //html image
    this.img = createImg("assets/wheelB.png", "");
    this.img.position(this.x - wheelRadius, this.y - wheelRadius);
    this.img.hide();
  }
  setup(x, y, speed, movement) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.moving = movement;
    //html image
    this.img.position(this.x - wheelRadius, this.y - wheelRadius);
  }

  move() {
    if (!gamePaused) {
      this.x += this.speed * Math.cos(theta) + this.vx;
      this.y -= this.speed * Math.sin(theta) + this.vy;

      this.vx *= friction;
      this.vy *= friction;

      // friction to zero when really small
      if (this.vx < 0.01) this.vx = 0;
      if (this.vy < 0.01) this.vy = 0;
      //html image
      this.img.position(this.x - wheelRadius, this.y - wheelRadius);
    }
  }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
  }

  exits() {
    if (this.moving) {
      
      if (this.x < 0 + wheelRadius) {
        this.x = max(0 + wheelRadius, this.x);
        theta = PI - theta ;
      }
      if (this.x > widthScreen - wheelRadius) {
        this.x = min(widthScreen - wheelRadius, this.x);
        theta = PI - theta;
      }
      if (this.y > heightScreen - wheelRadius) {
        this.y = min(heightScreen - wheelRadius, this.y);
        theta = 2 * PI - theta;
      }
      if (this.y < 0 + wheelRadius) {
        this.y = max(0 + wheelRadius, this.y);
        theta = 2 * PI - theta;
      }

      //html image
      this.img.position(this.x - wheelRadius, this.y - wheelRadius);
      //setTimeout(1000);
    }
  }

  collide(other) {
    let dx = other.x - this.x;
    let dy = other.y - this.y;
    // angle of hitting
    let angle = atan2(dy, dx);
    let targetX = this.x + Math.cos(angle) * (this.r + other.r);
    let targetY = this.y + Math.sin(angle) * (this.r + other.r);
    let ax = (targetX - other.x) * 0.05;
    let ay = (targetY - other.y) * 0.05;
    this.vx -= ax;
    this.vy -= ay;
    // move the target ball
    other.moving = true;
    other.x = targetX;
    other.y = targetY;
    //html image
    other.img.position(targetX - wheelRadius, targetY - wheelRadius);
  }

  render(idx) {
    /*
    //DEBUG MOVING
    if (!this.moving) this.color='grey'
    else this.color='red'
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
    */

    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    angleMode(RADIANS);
    if (idx == particles.length - 1) rotate(-theta);
    image(this.img, 0, 0, this.r * 2.5, this.r * 2.5);
    pop();

    //DEBUG INDEX
    //  fill(0);
    //  text(idx, this.x + 15, this.y-15);
  }
}
