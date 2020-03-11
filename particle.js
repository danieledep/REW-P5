// Original code by
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// QuadTree
// https://www.youtube.com/watch?v=z0YFFg_nBjw

// For more:
// https://github.com/CodingTrain/QuadTree

let friction = 0.4,
    initialSpeed = 4;

class Particle {
  constructor() {
    if ((particles.length % 2) == 0) {
      this.x = start1.x;
      this.y = start1.y;
    }
    else {
      this.x = start2.x;
      this.y = start2.y;
    }
    this.r = wheelRadius;
    this.speed = initialSpeed,
    this.color = 'gray',
    this.vx=0,
    this.vy=0,
    this.moving = true;
  }

    move() {
      if (!gamePaused) {
        this.x += this.speed  * cos(theta) +this.vx;
        this.y -= this.speed  * sin(theta) + this.vy;

        this.vx *= friction;
        this.vy *= friction;

        // friction to zero when really small
        if (this.vx < 0.01) this.vx=0
        if (this.vy < 0.01) this.vy=0

      }
    }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    // check when they are no more colliding
    if (d > this.r + other.r) other.moving = false;

    return (d < this.r + other.r);
  }

  collide(other) {
    let dx = other.x - this.x;
    let dy = other.y - this.y;
    // angle of hitting
    let angle = atan2(dy, dx);
    let targetX = this.x + cos(angle) * (this.r + other.r);
    let targetY = this.y + sin(angle) * (this.r + other.r);
    let ax = (targetX - other.x)*0.05;
    let ay = (targetY - other.y)*0.05;
    this.vx -= ax;
    this.vy -= ay;
    // move the target ball
    other.moving = true;
    other.x = targetX;
    other.y = targetY;
  }

  render(idx) {
    noStroke();

    //DEBUG MOVING
    if (!this.moving) this.color='grey'
    else this.color='red'
    fill(this.color);

    ellipse(this.x, this.y, this.r * 2);
    //DEBUG INDEX
    fill(0);
    text(idx, this.x + 15, this.y-15);
  }

}
