let message = "Visual\nSystems";
let cols = 20;
let rows = 20;
let freeze = [];
let fontGrid = [];
let cellW, cellH;
let nextRipple = 0;
const rippleInterval = 60; // frames per diagonal step

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  initGrid();
  frameRate(30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initGrid();
}

function initGrid() {
  cellW = width / cols;
  cellH = height / rows;
  freeze = Array(cols).fill().map(() => Array(rows).fill(false));
  fontGrid = Array(cols).fill().map(() => Array(rows).fill(0));
}

function draw() {
  background('#F3F3F3');
  textSize(min(cellW, cellH) * cols * 0.03 + min(cellW, cellH) * 0.05);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (!freeze[i][j] && frameCount >= nextRipple + (i + j) * rippleInterval) {
        fontGrid[i][j] = int(random(5)); // choose 5 basic font styles
      }
      push();
      translate(i * cellW, j * cellH);
      fill(0);
      noStroke();
      text(message, cellW / 2, cellH / 2);
      pop();
      stroke('#FFFFFF');
      strokeWeight(0.5);
      noFill();
      rect(i * cellW, j * cellH, cellW, cellH);
    }
  }
  if (frameCount > nextRipple + (cols + rows) * rippleInterval) {
    nextRipple = frameCount;
  }
}

function mousePressed() {
  const gx = floor(mouseX / cellW);
  const gy = floor(mouseY / cellH);
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      let x = gx + dx, y = gy + dy;
      if (x >= 0 && x < cols && y >= 0 && y < rows) {
        freeze[x][y] = true;
      }
    }
  }
}
