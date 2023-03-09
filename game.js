const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define variables for the player and enemies
let player = {
  x: 100,
  y: canvas.height - 100,
  width: 50,
  height: 50,
  speed: 5,
  score: 0,
  lives: 3
};

const keys={right:false, left:false, up:false, down:false, space:false};

let enemies = [];

const bullets=[];

// Set up the game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update the player's position
  movePlayer();

  // Update the enemies' positions
  moveEnemies();

  moveBullets();

  // Check for collisions between the player and enemies
  checkCollisions();

  // Draw the player and enemies
  drawPlayer();
  drawEnemies();
  drawBullets()

  // Draw the score and lives
  drawScore();
  drawLives();

  createEnemy();

  // Call the game loop again
  requestAnimationFrame(gameLoop);
}

// Handle player movement
function movePlayer() {
    // Move the player left
    if (keys.left && player.x > 0) {
      player.x -= player.speed;
    }
  
    // Move the player right
    if (keys.right && player.x + player.width < canvas.width) {
      player.x += player.speed;
    }
  
    if (keys.space && bullets.length<10) {
        createBullet();
    }
  
    // // Move the player up
    // if (keys.up && player.y > 0) {
    //   player.y -= player.speed;
    // }
  
    // // Move the player down
    // if (keys.down && player.y + player.height < canvas.height) {
    //   player.y += player.speed;
    // }
  }
  function createEnemy() {
    // Create a new enemy object with random x and y positions and speed
    if(enemies.length<20){

        let enemy = {
            x: Math.floor(Math.random() * canvas.width),
            y: -50,
            width: 30,
            height: 50,
            speed: Math.floor(Math.random() * 5) + 1,
            score:10

        };
        
        // Add the enemy to the enemies array
        enemies.push(enemy);
    }
  }
    

// Handle enemy movement
function moveEnemies() {
    // Move each enemy downward
    for (let i = 0; i < enemies.length; i++) {
      let enemy = enemies[i];
      enemy.y += enemy.speed;
      
      // Remove enemies that have gone off the bottom of the canvas
      if (enemy.y > canvas.height) {
        enemies.splice(i, 1);
      }
    }
  }

function checkCollisions() {
  // Check for collisions between player and enemies
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (collides(player, enemy)) {
      player.lives--;
      enemies.splice(i, 1);
      //resetPlayer();
      break;
    }
  }

  // Check for collisions between bullets and enemies
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    for (let j = 0; j < enemies.length; j++) {
      let enemy = enemies[j];
      if (collides(bullet, enemy)) {
        enemies.splice(j, 1);
        bullets.splice(i, 1);
        player.score += enemy.score;
        break;
      }
    }
  }
}

function collides(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}
  


  function drawPlayer() {
    // Draw the player as a rectangle
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }
  
  function drawEnemies() {
    // Draw each enemy as a rectangle
    for (let i = 0; i < enemies.length; i++) {
      let enemy = enemies[i];
      ctx.fillStyle = "red";
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
  }
  function drawBullets() {
    ctx.fillStyle = "gray";
    
    // Loop through all bullets and draw them as rectangles
    for (let i = 0; i < bullets.length; i++) {
      let bullet = bullets[i];
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
  }
  function moveBullets() {
    // Loop through all bullets and move them up
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].y -= bulletSpeed;
      
      // Remove bullet from array if it goes off the screen
      if (bullets[i].y < 0) {
        bullets.splice(i, 1);
        i--;
      }
    }
  }
  
  function createBullet() {
    // Create a new bullet object at the player's position
    let bullet = {
      x: player.x + (player.width / 2),
      y: player.y,
      width: 5,
      height: 10,
      speed: 10
    };
    
    // Add the bullet to the bullets array
    bullets.push(bullet);
  }
  
  function moveBullets() {
    // Move each bullet up the canvas
    for (let i = 0; i < bullets.length; i++) {
      let bullet = bullets[i];
      bullet.y -= bullet.speed;
      
      // Remove bullets that have gone off the top of the canvas
      if (bullet.y < 0) {
        bullets.splice(i, 1);
        i--;
      }
    }
  }
  
  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Score: " + player.score, 10, 20);
  }
  
  function drawLives() {
    for (let i = 0; i < player.lives; i++) {
      let heartX = canvas.width - (30 * (i + 1));
      let heartY = 20;
      ctx.fillText('❤️', heartX, heartY, 25, 25);
    }
  }
  


function handleKeyPress(event) {
    // Set the corresponding key property to true when a key is pressed
    if (event.keyCode === 37) {
      keys.left = true;
    } else if (event.keyCode === 39) {
      keys.right = true;
    } else if (event.keyCode === 38) {
      keys.up = true;
    } else if (event.keyCode === 40) {
      keys.down = true;
    } else if (event.keyCode === 32) {
        keys.space = true;
    }
  }
  
  function handleKeyRelease(event) {
    // Set the corresponding key property to false when a key is released
    if (event.keyCode === 37) {
      keys.left = false;
    } else if (event.keyCode === 39) {
      keys.right = false;
    } else if (event.keyCode === 38) {
      keys.up = false;
    } else if (event.keyCode === 40) {
      keys.down = false;
    } else if (event.keyCode === 32) {
        keys.space = false;
    }
  }
  
  // Listen for key presses and releases
  document.addEventListener("keydown", handleKeyPress);
  document.addEventListener("keyup", handleKeyRelease);
  
// Start the game loop
requestAnimationFrame(gameLoop);
