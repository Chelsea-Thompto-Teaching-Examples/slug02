let micVar;
let mic;
let look = 0;
let lowerMove = 0;
let lowerMove2 = 0;
let lowerMoveL = 0;
let lowerMoveR = 0;
let moveSpeed = 0.0001;
let moveDir = 0;
let moveDir2 = 0;
let moveDirL = 0;
let moveDirR = 0;
let myClovers =  [];

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  noStroke();
  mic = new p5.AudioIn();
  mic.start();
  for (let i = 0; i <30; i++) {
    let x = random(width*0.075,width*0.925);
    let y = random(width*0.075,width*0.925);
    let r;
    let g;
    let b;
    if (i<10) {
      r = 82;
      g = 120; 
      b = 67;
    } else if (i<20) {
      r = 12;
      g = 140; 
      b = 67;
    } else if (i<30) {
      r = 12;
      g = 220; 
      b = 67;
    }
    myClovers[i] = new clover(x,y,r,g,b);
  }
}

function draw() {
  //Animations/Movement
  spotAnimation();
  eyestalkMovement();
  lowerantennaMovement();
  
  //Drawing/Rendering
  background(42, 99, 17);
  for (let i = 0; i <30; i++) {
    myClovers[i].display();
    myClovers[i].move();
  }
  lowerAntenna();
  eyeStalks(250,244,97);
  tailSection();
  torsoSection();
}

function spotAnimation() {
  //Microphone mapping
  micVar = map(mic.getLevel(), 0 ,0.1, 0, 245);
}

function eyestalkMovement() {
  if (mouseX > width*0.65 && mouseX < width*0.8 ) {
    if (mouseY > height*0.15 && mouseY < height*0.3 ) {
      look = 1;
    } else {
      look = 0;
    }
  } else {
    look = 0;
  }
}

function lowerantennaMovement() {
   if (moveDir == 0) {
    if (lowerMove <= 0.01) {
      lowerMove = lowerMove + random(moveSpeed);
    } else if (lowerMove > 0.01) {
      moveDir = 1;
    }
  } else if (moveDir == 1) {
    if (lowerMove > 0) {
      lowerMove = lowerMove - random(moveSpeed);
    } else if (lowerMove <= 0) {
      moveDir = 0;
    }
  }
  if (moveDir2 == 0) {
    if (lowerMove2 <= 0.01) {
      lowerMove2 = lowerMove2 + random(moveSpeed);
    } else if (lowerMove2 > 0.01) {
      moveDir2 = 1;
    }
  } else if (moveDir2 == 1) {
    if (lowerMove2 > 0) {
      lowerMove2 = lowerMove2 - random(moveSpeed);
    } else if (lowerMove2 <= 0) {
      moveDir2 = 0;
    }
  }
  //Increment Over Time (Y Direction)
  if (moveDirL == 0) {
    if (lowerMoveL <= 0.01) {
      lowerMoveL = lowerMoveL + random(moveSpeed);
    } else if (lowerMoveL > 0.01) {
      moveDirL = 1;
    }
  } else if (moveDirL == 1) {
    if (lowerMoveL > 0) {
      lowerMoveL = lowerMoveL - random(moveSpeed);
    } else if (lowerMoveL <= 0) {
      moveDirL = 0;
    }
  }
  if (moveDirR == 0) {
    if (lowerMoveR <= 0.01) {
      lowerMoveR = lowerMoveR + random(moveSpeed);
    } else if (lowerMoveR > 0.01) {
      moveDirR = 1;
    }
  } else if (moveDirR == 1) {
    if (lowerMoveR > 0) {
      lowerMoveR = lowerMoveR - random(moveSpeed);
    } else if (lowerMoveR <= 0) {
      moveDirR = 0;
    }
  }
}

function eyeStalks(r, g, b) {
   //Eye Stalks
  //fill(250, 244, 97);
  fill(r, g, b);
  if (look == 0) {
    ellipse(width*0.65, height*0.155, width*0.05);
    ellipse(width*0.797, height*0.155, width*0.05);
    triangle(width*0.65, height*0.13, width*0.645, height*0.35, width*0.69, height*0.35);
    triangle(width*0.8, height*0.13, width*0.8, height*0.35, width*0.76, height*0.35);
  } else if (look == 1) {
    ellipse(width*0.69, height*0.155, width*0.05);
    ellipse(width*0.747, height*0.155, width*0.05);
    triangle(width*0.69, height*0.13, width*0.645, height*0.35, width*0.69, height*0.35);
    triangle(width*0.75, height*0.13, width*0.8, height*0.35, width*0.76, height*0.35);
  }
}


function lowerAntenna() {
  //lowerAntenna
  fill(250, 244, 97);
  ellipse(width*(0.625+lowerMove), height*(0.3+lowerMoveL), width*0.02);
  ellipse(width*(0.815+lowerMove2), height*(0.3+lowerMoveR), width*0.02);
  triangle(width*(0.625+lowerMove), height*(0.3+lowerMoveL), width*0.645, height*0.33, width*0.69, height*0.32);
  triangle(width*(0.815+lowerMove2), height*(0.3+lowerMoveR), width*0.795, height*0.34, width*0.76, height*0.32);
}

function tailSection() {
  //Tail Section
  fill(245, 238, 69);
  ellipse(width*0.16, height*0.5, width*0.12, height*0.32);
  push();
  translate(width*0.2, height*0.63);
  rotate(-20);
  ellipse(0, 0, width*0.17, height*0.37);
  pop();
  ellipse(width*0.44, height*0.72, width*0.55, height*0.25);
  //spots
  fill(10, 10+micVar);
  //Top half
  ellipse(width*0.49, height*0.655,width*0.06, height*0.044);
  ellipse(width*0.44, height*0.63,width*0.06, height*0.045);
  ellipse(width*0.41, height*0.68,width*0.08, height*0.045);
  ellipse(width*0.35, height*0.65,width*0.06);
  push();
  translate(width*0.225, height*0.6);
  rotate(75);
  ellipse(0,0, width*0.06, height*0.05);
  pop();
  push();
  translate(width*0.25, height*0.65);
  rotate(17);
  ellipse(0,0,width*0.06,width*0.045);
  pop();
  ellipse(width*0.19, height*0.53, width*0.04, height*0.06);
  ellipse(width*0.2, height*0.45, width*0.03, height*0.06);
  ellipse(width*0.18, height*0.41, width*0.03, height*0.04);
  //Bottom Half
  ellipse(width*0.51, height*0.755,width*0.07, height*0.047);
  ellipse(width*0.46, height*0.772,width*0.041, height*0.037);
  ellipse(width*0.44, height*0.81,width*0.09, height*0.045);
  ellipse(width*0.365, height*0.76,width*0.06,height*0.05);
  ellipse(width*0.3, height*0.78,width*0.04,height*0.04);
  push();
  translate(width*0.18, height*0.7);
  rotate(65);
  ellipse(0,0, width*0.08, height*0.05);
  pop();
  push();
  translate(width*0.25, height*0.72);
  rotate(25);
  ellipse(0,0,width*0.05,width*0.04);
  pop();
  push();
  translate(width*0.15, height*0.61);
  rotate(80);
  ellipse(0,0, width*0.07, height*0.06);
  pop();
  ellipse(width*0.12, height*0.54, width*0.03, height*0.06);
  ellipse(width*0.137, height*0.5, width*0.03, height*0.04);
  push();
  translate(width*0.125, height*0.43);
  rotate(7.5);
  ellipse(0,0, width*0.02, height*0.04);
  pop();
}

function torsoSection() {
  //Torso and Neck Section
  fill(245, 228, 78);
  push();
  translate(width*0.68, height*0.6);
  rotate(19);
  ellipse(0, 0, width*0.24, height*0.38);
  pop();
  ellipse(width*0.72, height*0.47, width*0.19, height*0.45);
}

class clover {
  constructor(xpos, ypos, r, g, b) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.t = int(random(360));
    this.s = random(-2,2);
    this.r = r;
    this.g = g;
    this.b = b;
  }
  display() {
     push();
    translate(this.xpos, this.ypos);
    rotate(this.t);
    fill(this.r, this.g, this.b);
    ellipse(14,9,25);
    ellipse(-14,9,25);
    ellipse(0,-14,25);
    //fill(0);
    ellipse(0,0,6);
    triangle(0,0,2.5,14,14,-3.5);
    triangle(0,0,-2.5,14,-14,-3.5);
    triangle(0,2,-12,-9,12, -9);
    triangle(0,-4, -3, 25, 3, 25);
    pop();
  }
  move() {
    this.t = this.t + this.s;
  }
}