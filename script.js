let snake;
let food;
let resolution = 20;
let cols;
let rows;
let score = 0;
let gameState = 'start';
// This section above is a global variable that I will be using to set variables through the code
function setup() {
  createCanvas(400, 400);
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  frameRate(10);
  snake = new Snake();
  foodLocation();
//this is where the frame is set up

}

function foodLocation() {
  let x = floor(random(cols));
  let y = floor(random(rows));
  food = createVector(x, y);
//This is where the food is spawned randomly in the code
}

function draw() {
  scale(resolution);
  background(220);

  if (gameState === 'start') {
    fill(0);
    textSize(1);
    textAlign(CENTER);
    text("Press ENTER to start", cols / 2, rows / 2);
  } else if (gameState === 'running') {
    if (snake.eat(food)) {
      foodLocation();
      score++;

    //This is where the text for the start goes
    }
  
    snake.update();
    snake.show();

    noStroke();
    fill(255, 0, 0);
    rect(food.x, food.y, 1, 1);

    fill(0);
    textSize(1); 
    text(`Score: ${score}`, 10, 1);
  } else if (gameState === 'end') {
    fill(0);
    textSize(1.5);
    textAlign(CENTER);
    text("GAME OVER", cols / 2, rows / 2);
    text("Press ENTER to restart", cols / 2, rows / 2 + 2);

  //This is where the text for the end goes
  }
}

function keyPressed() {
  if (gameState === 'start' && keyCode === ENTER) {
    gameState = 'running';
  } else if (gameState === 'running') {
    if (keyCode === LEFT_ARROW) {
      snake.setDir(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
      snake.setDir(1, 0);
    } else if (keyCode === DOWN_ARROW) {
      snake.setDir(0, 1);
    } else if (keyCode === UP_ARROW) {
      snake.setDir(0, -1);
    }
  } else if (gameState === 'end' && keyCode === ENTER) {
    gameState = 'running';
    snake = new Snake();
    score = 0;
    foodLocation();
//This is where the comands for the different movements of the snake go as it dictates the movement of the snake based off the arrow keys pressed
  }
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(cols / 2), floor(rows / 2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }
//the vector function makes the snakes head and places the food randomly creating 2D and 3D objects
  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();

    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
//This is what makes the snake using arrays (the push function)
    if (head.x > cols - 1) head.x = 0;
    if (head.x < 0) head.x = cols - 1;
    if (head.y > rows - 1) head.y = 0;
    if (head.y < 0) head.y = rows - 1;

    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x === head.x && part.y === head.y) {
        this.endGame();
      }
    }
  }
//Code above updates the snakes positon when its moving around or hirts itself resulting in teh game to end
  endGame() {
    gameState = 'end';
  }

  eat(pos) {
    let head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y === pos.y) {
      this.len++;
      this.body.push(head.copy());
      return true;
    }
    return false;
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }
}
//This shows the state of hte game when its done meaning that it will show the end restart screen
// The code above also shows a the snake growing and the updating as it moves
