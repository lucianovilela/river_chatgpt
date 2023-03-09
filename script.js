// Define canvas element and 2D context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Define game variables
var score = 0;
var speed = 1;
var level = 1;
var playerX = 110;
var playerY = 400;
var bullets = [];
var enemies = [];

// Define game functions
function drawPlayer() {
  ctx.fillStyle = "black";
  ctx.fillRect(playerX, playerY, 20, 20);
}

function drawBullet(bullet) {
  ctx.fillStyle = "gray";
  ctx.fillRect(bullet.x, bullet.y, 4, 10);
}

function drawEnemy(enemy) {
  ctx.fillStyle = "red";
  ctx.fillRect(enemy.x, enemy.y, 20, 20);
}

function movePlayer(dir) {
  if (dir === "left" && playerX > 0) {
    playerX -= 5;
  } else if (dir === "right" && playerX < 220) {
    playerX += 5;
  }
}

function shoot() {
  bullets.push({
    x: playerX + 8,
    y: playerY - 10
  });
}

function moveBullets() {
  bullets.forEach(function(bullet, index) {
    bullet.y -= 5;
    if (bullet.y < 0) {
      bullets.splice(index, 1);
    }
  });
}

function spawnEnemy() {
  var x = Math.floor(Math.random() * 240);
  enemies.push({
    x: x,
    y: -20
  });
}

function moveEnemies() {
  enemies.forEach(function(enemy, index) {
    enemy.y += speed;
    if (enemy.y > 500) {
      enemies.splice(index, 1);
    }
  });
}

function checkCollisions() {
  enemies.forEach(function(enemy, index1) {
    bullets.forEach(function(bullet, index2) {
      if (bullet.x >= enemy.x && bullet.x <= enemy.x + 20 &&
          bullet.y >= enemy.y && bullet.y <= enemy.y + 20) {
        bullets.splice(index2, 1);
        enemies.splice(index1, 1);
        score += 10;
      }
    });
    if (playerX + 20 >= enemy.x && playerX <= enemy.x + 20 &&
        playerY + 20 >= enemy.y && playerY <= enemy.y + 20) {
      gameOver();
    }
  });
}

function gameOver() {
  clearInterval(gameInterval);
  alert("Game over! Your score is " + score);
}

function drawGame() {
  ctx.clearRect(0, 0, 240, 500);
  drawPlayer();
  bullets.forEach(drawBullet);
  enemies.forEach(drawEnemy);
}

function updateGame() {
  moveBullets();
  moveEnemies();
  checkCollisions();
  drawGame();
}

function startGame() {
  score = 0;
  speed = 1;
  level = 1;
  playerX = 110;
  playerY = 400;
  bullets = [];
  enemies = [];
  gameInterval = setInterval(updateGame, 30);
  setInterval(spawnEnemy, 1000);
}

const handleKeyDown=(event)=> {

    console.log(event);
  if (event.keyCode === 37) {
    movePlayer("left");
  } else if (event.keyCode === 39) {
    movePlayer("right");
  } else if (event.keyCode === 32) {
    shoot();
  }
}
function addMultiEventListener(element, events, callback) {
  events.forEach(event => {
    element.addEventListener(event, callback);
  });
}
const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
addMultiEventListener(document, keys, handleKeyDown);


// Start the game
startGame();
