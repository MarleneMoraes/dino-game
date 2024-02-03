// Global vars
const dino = document.querySelector('#dino');
const background = document.querySelector('#dino-game');

let isJumping = false;
let isGameOver = false;
let position = 521;

// Press space (keycode 32) to jump function
function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

// Dino's jump
function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 620) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 521) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = `${position}px`;
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = `${position}px`;
    }
  }, 20);
}

// Appearing cactus
function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = `${cactusPosition}px`;

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftTimer);
      isGameOver = true;
      document.main.innerHTML = '<h1 id="game-over">Game Over</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = `${cactusPosition}px`;
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);