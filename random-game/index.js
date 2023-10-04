const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const levelChangeModal = document.querySelector('.level__change');
const startGameBtn = document.querySelector('.start');
const levels = levelChangeModal.querySelectorAll('input');
const startPic = document.querySelector('.start__img');
const musicBtn = document.querySelector('.volume__img');

const lose = document.querySelector('.lose');
const finalScore = document.querySelector('.final__score');
const finalPlace = document.querySelector('.final__place');
const playAgain = document.querySelector('.again');

const box = 30;
let game;
let score = 0;
let snake = [];
let dir;
let gameIndex = 1;

snake[0] = {
  x: 9 * box,
  y: 10 * box
}

let food = {
  x: (Math.floor(Math.random() * 17 + 1)) * box,
  y: (Math.floor(Math.random() * 15 + 3)) * box,
}

const snakeDirection = (e) => {
  if (e.keyCode === 37 && dir !== 'right') dir = 'left';
  else if (e.keyCode === 38 && dir !== 'down') dir = 'up';
  else if (e.keyCode === 39 && dir !== 'left') dir = 'right';
  else if (e.keyCode === 40 && dir !== 'up') dir = 'down';
};

document.addEventListener('keydown', (e) => {
  snakeDirection(e);
  startPic.style.opacity = '0';
  moveAudio.play()
});

const gameLose = () => {
  clearInterval(game);
  loseAudio.play();
  lose.classList.add('lose__active');
  finalScore.innerHTML = score;
  addScoreToLocalStorage(gameIndex, score);
  score = 0;
  gameIndex++;
};

const getLocalStorageData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setLocalStorageData = (data, key) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const results = [];

setLocalStorageData(results, 'results');

function addScoreToLocalStorage(gameIndex, score) {
  const currentGame = {
    game: gameIndex,
    score: score,
  };
  if (results.length > 9) {
    results.shift(currentGame);
    results.push(currentGame);
  } else results.push(currentGame);
  setLocalStorageData(results, 'results')
}

const eatTail = (head, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) {
      setTimeout(() => gameLose(), 100)
    };
  };
};

const foodImg = new Image();
const foodPics = ['./assets/icon-food-apple.png', './assets/icon-food-carrot.png', './assets/icon-food-cherry.png']
foodImg.src = foodPics[(Math.floor(Math.random() * 3))];

const snakeHadeImg = new Image();
snakeHadeImg.src = './assets/icon-snake-head.png';

const snakeTaiImg = new Image();
snakeTaiImg.src = './assets/tail.jpg';

const moveAudio = new Audio();
moveAudio.src = './assets/move-sound.mp3'

const loseAudio = new Audio();
loseAudio.src = './assets/lose-sound.mp3'

const field = new Image();
field.src = './assets/field.jpg';
field.onload = drawGame;

function drawGame() {
  ctx.drawImage(field, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    if (i === 0) ctx.drawImage(snakeHadeImg, snake[i].x, snake[i].y);
    else ctx.drawImage(snakeTaiImg, snake[i].x, snake[i].y);
  }

  ctx.fillStyle = 'white';
  ctx.font = '40px Arial';
  ctx.fillText(score, box * 2, box * 1.6);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    foodImg.src = foodPics[(Math.floor(Math.random() * 3))];
    food = {
      x: (Math.floor(Math.random() * 17 + 1)) * box,
      y: (Math.floor(Math.random() * 15 + 3)) * box,
    }
    ctx.drawImage(foodImg, food.x, food.y);
  } else snake.pop();

  if (snakeX < box || snakeX > box * 17
    || snakeY < 3 * box || snakeY > box * 17) {
    gameLose();
  };

  if (dir === 'left') snakeX -= box;
  if (dir === 'right') snakeX += box;
  if (dir === 'up') snakeY -= box;
  if (dir === 'down') snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

levels.forEach((item) => {
  item.addEventListener('click', () => {
    dir = '';
    startPic.style.opacity = '1';
    if (item.classList.contains('light')) game = setInterval(drawGame, 300);
    if (item.classList.contains('medium')) game = setInterval(drawGame, 200);
    if (item.classList.contains('heavy')) game = setInterval(drawGame, 100);
  });
});

startGameBtn.addEventListener('click', () => {
  levelChangeModal.classList.add('level__change__hide');
});

playAgain.addEventListener('click', () => {
  lose.classList.remove('lose__active');
  levelChangeModal.classList.remove('level__change__hide');
  snake.length = 1;
  snake[0].x = 270;
  snake[0].y = 300;
  drawGame();
  levels.forEach(item => {
    item.checked = false;
  });
});

musicBtn.addEventListener('click', () => {
  if (moveAudio.volume === 1) {
    loseAudio.volume = 0;
    moveAudio.volume = 0;
    musicBtn.src = './assets/mute.png';
  } else {
    loseAudio.volume = 1;
    moveAudio.volume = 1;
    musicBtn.src = './assets/volume.png';
  };
});