
let fonts = [];
let fontNames = [
  "Georgia", "Courier New", "Verdana", "Arial", "Times New Roman",
  "Trebuchet MS", "Lucida Console", "Impact", "Comic Sans MS", "Palatino Linotype"
];

let message = "Visual Systems";
let cols = Math.floor(windowWidth / 40);
let rows = Math.floor(windowHeight / 40);
let fontIndex = [];
let freezeMap = [];
let cellW, cellH;

function preload() {
  for (let name of fontNames) {
    fonts.push(loadFont("https://fonts.gstatic.com/s/" + name.replace(/ /g, '').toLowerCase() + "/v1.ttf"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  initGrid();
  frameRate(30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initGrid();
}

function initGrid() {
  fontIndex = Array.from({ length: cols }, () => Array(rows).fill(0));
  freezeMap = Array.from({ length: cols }, () => Array(rows).fill(false));
  cellW = width / cols;
  cellH = height / rows;
}

function draw() {
  background('#F3F3F3');
  textAlign(CENTER, CENTER);
  textSize(min(width, height) * 0.075); // scale to ~75% of canvas
  fill(0);
  stroke('#FFFFFF');
  strokeWeight(0.25);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      push();
      let x = i * cellW;
      let y = j * cellH;
      let diagOffset = i + j;
      if (!freezeMap[i][j] && frameCount % int(54 + diagOffset * 0.2) === 0) {
        fontIndex[i][j] = int(random(fonts.length));
      }
      textFont(fonts[fontIndex[i][j]]);
      text(message, width / 2 - cellW / 2, height / 2 - cellH / 2);
      let graphic = get(x, y, cellW, cellH);
      image(graphic, x, y, cellW, cellH);
      noFill();
      rect(x, y, cellW, cellH);
      pop();
    }
  }
}

function mousePressed() {
  let i = int(mouseX / cellW);
  let j = int(mouseY / cellH);
  for (let di = -2; di <= 2; di++) {
    for (let dj = -2; dj <= 2; dj++) {
      let ni = i + di;
      let nj = j + dj;
      if (ni >= 0 && ni < cols && nj >= 0 && nj < rows) {
        freezeMap[ni][nj] = true;
      }
    }
  }
}
