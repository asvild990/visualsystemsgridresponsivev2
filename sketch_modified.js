let fonts = [];
let fontNames = [
  "Futura", "Didot", "Verdana", "Baskerville", "Avenir",
  "Gill Sans", "Source Code Pro", "Cooper", "Helvetica", "Rockwell"
];

let message = "Visual\nSystems";
let cols, rows;
let cellW, cellH;
let fontGrid = [];
let freezeGrid = [];
let rippleTimer = 0;
let rippleSpeed = 1800; // 1.8 seconds
let fontCache = {};

function preload() {
  textFont('sans-serif');
  fontNames.forEach(name => {
    fonts.push(name); // Font faces must be available via CSS or Google Fonts in index.html
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  updateGridDimensions();
  initializeFontGrid();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateGridDimensions();
  initializeFontGrid();
}

function updateGridDimensions() {
  cols = floor(width / 40);
  rows = floor(height / 40);
  cellW = width / cols;
  cellH = height / rows;
}

function initializeFontGrid() {
  fontGrid = [];
  freezeGrid = [];
  for (let i = 0; i < cols; i++) {
    fontGrid[i] = [];
    freezeGrid[i] = [];
    for (let j = 0; j < rows; j++) {
      fontGrid[i][j] = floor(random(fonts.length));
      freezeGrid[i][j] = false;
    }
  }
}

function draw() {
  background('#F3F3F3');
  textAlign(CENTER, CENTER);
  textSize(min(width, height) * 0.75); // scale up text
  noStroke();

  let pg = createGraphics(width, height);
  pg.background(0, 0);
  pg.fill(0);
  pg.textAlign(CENTER, CENTER);
  pg.textSize(min(width, height) * 0.75);
  pg.textLeading(min(width, height) * 0.75 * 0.9); // tighter leading
  pg.text(message, width / 2, height / 2);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW;
      let y = j * cellH;
      let idx = fontGrid[i][j];
      let font = fonts[idx];

      pg.textFont(font);
      let clipped = pg.get(x, y, cellW, cellH);

      image(clipped, x, y, cellW, cellH);

      stroke('#FFFFFF');
      strokeWeight(0.5);
      noFill();
      rect(x, y, cellW, cellH);
    }
  }

  if (millis() - rippleTimer > rippleSpeed) {
    rippleTimer = millis();
    updateFontsInRipple();
  }
}

function updateFontsInRipple() {
  let t = millis() * 0.001;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (!freezeGrid[i][j]) {
        let delay = (i + j) * 30;
        if ((millis() - rippleTimer) > delay) {
          fontGrid[i][j] = floor(random(fonts.length));
        }
      }
    }
  }
}

function mousePressed() {
  let i = floor(mouseX / cellW);
  let j = floor(mouseY / cellH);
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      let ni = i + dx;
      let nj = j + dy;
      if (ni >= 0 && ni < cols && nj >= 0 && nj < rows) {
        freezeGrid[ni][nj] = true;
      }
    }
  }
}
