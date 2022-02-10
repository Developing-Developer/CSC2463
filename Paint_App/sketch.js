// only change canvasSizeX
let canvasSizeX = 1920;
let canvasSizeY = canvasSizeX/2;
let squareSize = canvasSizeX/40;
const colors = [];
let lineColor = ['red'];
let lastX, lastY;

function setup() {
    createCanvas(canvasSizeX, canvasSizeY);
    colors[0] = color('red'), colors[1] = color('orange'), colors[2] = color('yellow'),
    colors[3] = color(50, 225, 50), colors[4] = color('cyan'), colors[5] = color('blue'),
    colors[6] = color('magenta'), colors[7] = color(150, 75, 0), colors[8] = color('white'), colors[9] = color('black');
}

function draw() {
  // Draw color palette
  for (var i = 0; i < colors.length; i++){
    fill(colors[i]);
    stroke('white');
    strokeWeight(2);
    square(0, i * squareSize, squareSize);
  }
  
  // Draw on screen
  if (mouseIsPressed) {
    stroke(lineColor);
    strokeWeight(12.5);
    line(lastX, lastY, mouseX, mouseY);
  }
  lastX = mouseX;
  lastY = mouseY;
}

// Change brush to colors
function mouseClicked(){
  if (mouseX > 0 && mouseX < squareSize*1 && mouseY > 0 && mouseY < squareSize*1){
    console.log("Red");
    lineColor = colors[0];
  }
  else if (mouseX > 0 && mouseX < squareSize*1 && mouseY > squareSize*1 && mouseY < squareSize*2){
    console.log("Orange");
    lineColor = colors[1];
  }
  else if (mouseX > 0 && mouseX < squareSize*1 && mouseY > squareSize*2 && mouseY < squareSize*3){
    console.log("Yellow");
    lineColor = colors[2];
  }
  else if (mouseX > 0 && mouseX < squareSize*1 && mouseY > squareSize*3 && mouseY < squareSize*4){
    console.log("Green");
    lineColor = colors[3];
  }
  else if (mouseX > 0 && mouseX < squareSize*1 && mouseY > squareSize*4 && mouseY < squareSize*5){
    console.log("Cyan");
    lineColor = colors[4];
  }
  else if (mouseX > 0 && mouseX < squareSize*1 && mouseY > squareSize*5 && mouseY < squareSize*6){
    console.log("Blue");
    lineColor = colors[5];
  }
  else if (mouseX > 0 && mouseX < squareSize*1 && mouseY > squareSize*6 && mouseY < squareSize*7){
    console.log("Magenta");
    lineColor = colors[6];
  }
  else if (mouseX > 0 && mouseX < squareSize*1 && mouseY > squareSize*7 && mouseY < squareSize*8){
    console.log("Brown");
    lineColor = colors[7];
  }
  else if (mouseX > 0 && mouseX < squareSize*1 && mouseY > squareSize*8 && mouseY < squareSize*9){
    console.log("White");
    lineColor = colors[8];
  }
  else if (mouseX > 0 && mouseX < squareSize*1 && mouseY > squareSize*9 && mouseY < squareSize*10){
    console.log("Black");
    lineColor = colors[9];
  }
}