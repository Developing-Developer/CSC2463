// only change canvasSizeX
let canvasSizeX = 1920;
let canvasSizeY = canvasSizeX/2;
let characters = [];
let spriteSheets = [];
let countChars;

function preload() {
  countChars = random(1, 10);
  spriteSheets[0] = loadImage("Golden Monk.png");
  spriteSheets[1] = loadImage("Green.png");
  spriteSheets[2] = loadImage("Ninja.png");
  spriteSheets[3] = loadImage("SpelunkyGuy.png");
}

// initiate array with characters
function setup() {
  createCanvas(canvasSizeX, canvasSizeY);
  imageMode(CENTER);

  for (let i = 0; i < countChars; i++){
    // characters[i] = new Character(spriteSheets[i], random(0, canvasSizeX), random(0, canvasSizeY));
    characters[i] = new Character(random(spriteSheets), random(80, canvasSizeX - 80), random(0, canvasSizeY));
  }
}

// draw characters on canvas
function draw() {
  background('white');
  for (let i = 0; i < countChars; i++){
    characters[i].draw();
  }
}

// character move left or right
function keyPressed(){
  if (keyCode === LEFT_ARROW) {
    for (let i = 0; i < countChars; i++){
      characters[i].go(-1);
    }
  } else if (keyCode === RIGHT_ARROW) {
    for (let i = 0; i < countChars; i++){
      characters[i].go(1);
    }
  }
}

// character stops moving
function keyReleased(){
  for (let i = 0; i < countChars; i++){
    characters[i].stop();
  }
}


// character class
class Character {
  constructor(spriteSheet, x, y){
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.x = x;
    this.y = y;
    this.move = 0;
    this.facing = 1;
  }

  draw() {
    push();
    translate(this.x, this.y);
    scale(this.facing, 1);
    if (this.move == 0){
      image(this.spriteSheet, 0, 0, 200, 200, 0, 0, 80, 80);
    } else {
      image(this.spriteSheet, 0, 0, 200, 200, 80 * (this.sx + 1), 0, 80, 80);
    }
  
    if (frameCount % 9 == 0){
      this.sx = (this.sx + 1) % 8;
    }
    this.x += 2*this.move;

    if (this.x > width - 80){
      this.move = -1;
      this.facing = -1;
    } else if (this.x < 80){
      this.move = 1;
      this.facing = 1;
    }

    pop();
  }

  go(direction) {
    this.move = direction;
    this.facing = direction;
  }

  stop() {
    this.move = 0;
  }
}