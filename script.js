// Canvas Variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Score
var score = 0;
var highscore = 0;
var highScoreFill = "#000000";
var instructionFill = "#000000";

// Block Variables
var blockWidth = 30;
var blockHeight = 30;
var blockX = canvas.width/2-(blockWidth/2);
var blockY = canvas.height/2-(blockHeight/2);
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

// Ball Variables
var ballRadius = 7;
var ballX = Math.random()*canvas.width;
var ballY = Math.random()*canvas.height;
var ballColor = "purple";
var balldx = 0;
var balldy = 0;

// Coin Variables
var coinRadius = 5;
var coinX = Math.random()*canvas.width;
var coinY = Math.random()*canvas.height;
var coinColor = "gold";



// Event Handlers
document.addEventListener("keydown", keyDownHandler, false); // (event, function, ctrl buttons are not pressed therefore false)
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) { // 39 right cursor key
    rightPressed = true;
  } else if (e.keyCode == 37) { // 37 left cursor key
    leftPressed = true;
  } else if (e.keyCode == 38) {
    upPressed = true;
  } else if (e.keyCode == 40) {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
      rightPressed = false;
  } else if (e.keyCode == 37) {
      leftPressed = false;
  } else if (e.keyCode == 38) {
      upPressed = false;
  } else if (e.keyCode == 40) {
      downPressed = false;
  }
}

function collisionDetection(ballX, ballY, ballRadius, blockX, blockY, blockWidth, blockHeight){
    var distX = Math.abs(ballX - blockX-blockWidth/2);
    var distY = Math.abs(ballY - blockY-blockHeight/2);

    if (distX > (blockWidth/2 + ballRadius)) { return false; }
    if (distY > (blockHeight/2 + ballRadius)) { return false; }

    if (distX <= (blockWidth/2)) { return true; }
    if (distY <= (blockHeight/2)) { return true; }

    var dx=distX-blockWidth/2;
    var dy=distY-blockHeight/2;
    return (dx*dx+dy*dy<=(ballRadius*ballRadius));
}

function coinDetection(coinX, coinY, coinRadius, blockX, blockY, blockWidth, blockHeight){
    var distX = Math.abs(coinX - blockX-blockWidth/2);
    var distY = Math.abs(coinY - blockY-blockHeight/2);

    if (distX > (blockWidth/2 + coinRadius)) { return false; }
    if (distY > (blockHeight/2 + coinRadius)) { return false; }

    if (distX <= (blockWidth/2)) { return true; }
    if (distY <= (blockHeight/2)) { return true; }

    var dx=distX-blockWidth/2;
    var dy=distY-blockHeight/2;
    return (dx*dx+dy*dy<=(coinRadius*coinRadius));
}

function reset() {
  score = 0;

  ballX = Math.random()*canvas.width;
  ballY = Math.random()*canvas.height;
  balldx = 0;
  balldy = 0;

  highScoreFill = "#000000";
  instructionFill = "#000000";

  coinX = Math.random()*canvas.width;
  coinY = Math.random()*canvas.height;

  blockX = canvas.width/2-(blockWidth/2);
  blockY = canvas.height/2-(blockHeight/2);
  rightPressed = false;
  leftPressed = false;
  upPressed = false;
  downPressed = false;
}

// Draw Functions
function drawBlock() {
  ctx.beginPath();
  ctx.rect(blockX, blockY, blockWidth, blockHeight);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 7;
  ctx.stroke();
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 7;
  ctx.stroke();
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function drawCoin() {
  ctx.beginPath();
  ctx.arc(coinX, coinY, coinRadius, 0, Math.PI*2);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 7;
  ctx.stroke();
  ctx.fillStyle = "gold";
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.beginPath();
  ctx.font = "16px Trebuchet MS";
  ctx.fillStyle = "#000";
  ctx.fillText("Score: " + score, 8, 20);
  ctx.fillText("High Score: ", 8, 40);
  ctx.closePath();
}

function drawHighScore() {
  ctx.beginPath();
  ctx.font = "16px Trebuchet MS";
  ctx.fillStyle = highScoreFill;
  ctx.fillText(highscore, 100, 40);
  ctx.closePath();
}

function displayInstructions() {
  ctx.beginPath();
  ctx.font = "16px Trebuchet MS";
  ctx.fillStyle = instructionFill;
  ctx.fillText("Use arrow keys and get coin to start! Avoid the purple ball", canvas.width/2-200, canvas.height/2+50);
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  displayInstructions();
  drawBlock();
  drawBall();
  drawCoin();
  drawScore();
  drawHighScore();
  ballX += balldx;
  ballY += balldy;

  if (ballX + balldx > canvas.width-ballRadius || ballX + balldx < ballRadius) {
    balldx = -balldx;
  }
  if (ballY + balldy > canvas.height-ballRadius || ballY + balldy < ballRadius) {
    balldy = -balldy;
  }

  if (coinDetection(coinX, coinY, coinRadius, blockX, blockY, blockWidth, blockHeight)) {
    score += 10
    instructionFill = "rgba(147,206,222,1)";
    coinX = Math.random()*canvas.width;
    coinY = Math.random()*canvas.height;
    if (balldx <= 0) {
      balldx -= 0.25;
    }
    if (balldy <= 0) {
      balldy -= 0.25;
    }
    if (balldx > 0) {
      balldx += 0.25;
    }
    if (balldy > 0) {
      balldy += 0.25;
    }
  }

  if (score > highscore) {
    highScoreFill = "gold";
    highscore = score;
  }

  if (collisionDetection(ballX, ballY, ballRadius, blockX, blockY, blockWidth, blockHeight)){

    alert("Game Over\nYour Final Score is " + score + "\nYour High Score was " + highscore);
    reset();
  }

  if (rightPressed && blockX < canvas.width-blockWidth) {
    blockX += 5;
  } if (leftPressed && blockX > 0) {
    blockX -= 5;
  } if (downPressed && blockY < canvas.height-blockHeight) {
    blockY += 5;
  } if (upPressed && blockY > 0) {
    blockY -= 5;
  }
  requestAnimationFrame(draw);
}

draw();
