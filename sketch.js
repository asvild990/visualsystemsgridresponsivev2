let message = "visual\nsystems";
let cols = 20;
let rows = 20;
let cellW, cellH;
let fontList = ['Georgia','Verdana','Courier','Arial','Times','Trebuchet MS','Impact'];
let fontIndex = [];
let cellGraphics = [];
let showGrid = true;
let canvasSize;

function setup() {
  canvasSize = min(windowWidth, windowHeight);
  createCanvas(canvasSize, canvasSize);
  cellW = width / cols;
  cellH = height / rows;

  for (let i = 0; i < cols; i++) {
    fontIndex[i] = [];
    cellGraphics[i] = [];
    for (let j = 0; j < rows; j++) {
      fontIndex[i][j] = int(random(fontList.length));
      cellGraphics[i][j] = createCell(i, j, fontIndex[i][j]);
    }
  }
}

function draw() {
  background('#F3F3F3');
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      image(cellGraphics[i][j], i * cellW, j * cellH, cellW, cellH);
      if (showGrid) {
        stroke(0);
        strokeWeight(0.25);
        noFill();
        rect(i * cellW, j * cellH, cellW, cellH);
      }
    }
  }
}

function mousePressed() {
  let centerI = int(mouseX / cellW);
  let centerJ = int(mouseY / cellH);
  let affected = [];

  for (let di = -2; di <= 2; di++) {
    for (let dj = -2; dj <= 2; dj++) {
      let i = centerI + di;
      let j = centerJ + dj;
      if (i >= 0 && i < cols && j >= 0 && j < rows) {
        affected.push({i, j});
      }
    }
  }

  shuffle(affected, true);
  let numToChange = int(random(3, 6));
  for (let k = 0; k < min(numToChange, affected.length); k++) {
    let i = affected[k].i;
    let j = affected[k].j;
    let current = fontIndex[i][j];
    let newIndex = current;
    while (newIndex === current) {
      newIndex = int(random(fontList.length));
    }
    fontIndex[i][j] = newIndex;
    cellGraphics[i][j] = createCell(i, j, newIndex);
  }
}

function createCell(i, j, fontIdx) {
  let pg = createGraphics(width, height);
  pg.textAlign(LEFT, CENTER);
  pg.textFont(fontList[fontIdx]);
  pg.textSize(min(cellW, cellH) * cols / 5.5);
  pg.fill(0);
  pg.noStroke();
  pg.background(0, 0);
  let lines = message.split('\n');
  let totalHeight = lines.length * pg.textSize();
  let yOffset = height / 2 - totalHeight / 2 + pg.textSize() / 2;
  for (let k = 0; k < lines.length; k++) {
    pg.text(lines[k], width / 2 - 200, yOffset + k * pg.textSize());
  }
  let clipped = pg.get(i * cellW, j * cellH, cellW, cellH);
  let tile = createGraphics(cellW, cellH);
  tile.image(clipped, 0, 0);
  return tile;
}

function windowResized() {
  canvasSize = min(windowWidth, windowHeight);
  resizeCanvas(canvasSize, canvasSize);
  cellW = width / cols;
  cellH = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      cellGraphics[i][j] = createCell(i, j, fontIndex[i][j]);
    }
  }
}
