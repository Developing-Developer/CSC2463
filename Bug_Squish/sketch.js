// only change canvasSizeX
let canvasSizeX = 1920;
let canvasSizeY = canvasSizeX/2;
let gameState = "wait";
let bugs = [];
let spriteSheet;
let startSide = ["top", "left", "right", "bottom"];
let bugsSquished = 0;
let countBugs;
let speed = 1;
let startTime;
let score = 0;
let frameSpeed = 15;

function preload() {
  countBugs = round(random(10, 20));
  spriteSheet = loadImage("Bug_Trans.png");
}

// initiate array with bugs
function setup() {
  createCanvas(canvasSizeX, canvasSizeY);
  imageMode(CENTER);
  for (let i = 0; i < countBugs; i++){
    bugs[i] = new Bug(spriteSheet, random(40, canvasSizeX - 40), random(40, canvasSizeY - 40), random(startSide));
  }
}

// Bug Squish Game
function draw() {
  background('white');

  // Main menu
  if (gameState == "wait"){
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Press any key to play", width/2, height/2);
    if (mouseIsPressed){
      startTime = millis();
      gameState = "playing";
    }
  }

  // Game is running
  else if (gameState == "playing"){
    if (bugsSquished >= countBugs){
      bugsSquished = 0;
      setup();
    }
    let time = timer();
    let totalTime = 30;
    textAlign(LEFT, LEFT);
    text("Score: " + score, 80, 120);
    text("Time: " + (totalTime - time), 80, 80);
    if (time >= totalTime) {
      gameState = "end";
    }
    for (let i = 0; i < countBugs; i++){
      bugs[i].draw();
    }
  }

  // Game over
  else if (gameState == "end"){
    textAlign(CENTER, CENTER);
    text("Game over", width/2, height/2);
    text("Press any key to restart", width/2, height/2 + height * .1);
    if (mouseIsPressed) {
      startTime = millis();
      gameState = "playing";
      speed = 1;
      score = 0;
      frameSpeed = 15;
      setup();
    }
  }
}

// Timer
function timer() {
  return int((millis() - startTime) / 1000);
}

// Kill bug
function mouseClicked() {
  for (let i = 0; i < countBugs; i++){
    bugs[i].stop();
  }
}

// Bug class
class Bug {
  constructor(spriteSheet, x, y, startSide){
    this.spriteSheet = spriteSheet;
    this.startSide = startSide;
    this.sx = 0;
    this.x = x;
    this.y = y;
    this.move = 1;
    this.facing = 1;
    this.deadge = false;

    if (this.startSide == "right"){
      this.facing = 1;
      this.move = -1;
    }
    else if (this.startSide == "bottom"){
      this.move = -1;
    }
    else if (this.startSide == "top"){
      this.facing = -1;
    }
  }

  draw() {
    push();
    translate(this.x, this.y);

    // Bug Movement
    if (this.startSide == "left" || this.startSide == "right"){
      if (this.startSide == "left"){
        rotate(PI/2);
        scale(this.facing, this.facing);
      } else if (this.startSide == "right"){
        rotate(3*PI/2);
        scale(this.facing, this.facing);
      }
      this.x += speed*this.move;
    }
    if (this.startSide == "top" || this.startSide == "bottom"){
      if (this.startSide == "top"){
        scale(this.facing, this.facing);
      } else if (this.startSide == "bottom"){
        scale(this.facing, this.facing);
      }
      this.y += speed*this.move;
    }

    // Sprite Animation
    if (this.move == 0 && this.deadge){
      image(this.spriteSheet, 0, 0, 60, 60, 0, 30, 30, 30);
    } else {
      image(this.spriteSheet, 0, 0, 60, 60, 30 * (this.sx), 0, 30, 30);
    }
    if (frameCount % frameSpeed == 0){
      this.sx = (this.sx + 1) % 7;
    }

    // Change direction on wall collision
    if (this.x > width - 30){
      this.move *= -1;
      this.facing *= -1;
    } else if (this.x < 30){
      this.move *= -1;
      this.facing *= -1;
    } else if (this.y > height - 30){
      this.move *= -1;
      this.facing *= -1;
    } else if (this.y < 30){
      this.move *= -1;
      this.facing *= -1;
    }

    pop();
  }

  // Kill bug function
  stop() {
    if (mouseX > this.x - 30 && mouseX < this.x + 30 && mouseY > this.y - 30 && mouseY < this.y + 30) {
      console.log(this.startSide);
      this.move = 0;
      if (!this.deadge){
        bugsSquished += 1;
        score += 1;
        if (frameSpeed > 1){
          frameSpeed--;
        } 
        speed += 0.5;
        this.deadge = true;
      }
    }
  }
}