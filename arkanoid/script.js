const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const $sprite = document.querySelector("#sprite");
const $bricks = document.querySelector("#bricks");

canvas.width = 448;
canvas.height = 400;

const ballRadius = 3;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = -1;
let dy = -1;

const paddleHeight = 10;
const paddleWidth = 50;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

let rigthPressed = false;
let leftPressed = false;

const bricksRowCount = 6;
const bricksColumnCount = 13;
const bricksWidth = 32;
const bricksHeight = 16;
const bricksPadding = 0;
const bricksOffsetTop = 80;
const bricksOffsetLeft = 16;
const bricks = [];

const BRICK_STATUS = {
  ACTIVE: 1,
  DESTROYED: 0,
};

for (let c = 0; c < bricksColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < bricksRowCount; r++) {
    const bricksX = c * (bricksWidth + bricksPadding) + bricksOffsetLeft;

    const bricksY = r * (bricksHeight + bricksPadding) + bricksOffsetTop;

    const random = Math.floor(Math.random() * 8);

    bricks[c][r] = {
      x: bricksX,
      y: bricksY,
      status: BRICK_STATUS.ACTIVE,
      color: random,
    };
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.drawImage(
    $sprite,
    29,
    174,
    paddleWidth,
    paddleHeight,
    paddleX,
    paddleY,
    paddleWidth,
    paddleHeight
  );
}

function drawBricks() {
  for (let c = 0; c < bricksColumnCount; c++) {
    for (let r = 0; r < bricksRowCount; r++) {
      const currentBrick = bricks[c][r];
      if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

      const clipX = currentBrick.color * 32

      ctx.drawImage(
        $bricks,
        clipX,
        0,
        bricksWidth,
        bricksHeight,
        currentBrick.x,
        currentBrick.y,
        bricksWidth,
        bricksHeight

      )

    }
  }
}

function collisionDetection(){
    for (let c = 0; c < bricksColumnCount; c++) {
        for (let r = 0; r < bricksRowCount; r++) {}
}}

function ballMovement() {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  }
  const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddleWidth;

  const isBallTouchingpaddle = y + dy > paddleY;

  if (isBallSameXAsPaddle && isBallTouchingpaddle) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    console.log("game over");
    document.location.reload();
  }

  x += dx;
  y += dy;
}

function paddleMovement() {
  if (rigthPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 5;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 5;
  }
}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initEvents() {
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

  function keyDownHandler(event) {
    const { key } = event;

    if (key === "Right" || key === "ArrowRight") {
      rigthPressed = true;
    } else if (key === "Left" || key === "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(event) {
    const { key } = event;

    if (key === "Right" || key === "ArrowRight") {
      rigthPressed = false;
    } else if (key === "Left" || key === "ArrowLeft") {
      leftPressed = false;
    }
  }
}

function draw() {
  cleanCanvas();
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection()
  ballMovement();
  paddleMovement();
  window.requestAnimationFrame(draw);
}

draw();
initEvents();
