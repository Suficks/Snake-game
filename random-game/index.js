const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const box = 30;
let score = 0;
let snake = [];
let dir;

const field = new Image();
field.src = './assets/field.jpg';

const foodImg = new Image();
const foodPics = ['./assets/icon-food-apple.png', './assets/icon-food-carrot.png', './assets/icon-food-beetroot.png']
foodImg.src = foodPics[(Math.floor(Math.random() * 3))];

const snakeHadeImg = new Image();
snakeHadeImg.src = './assets/icon-snake-head.png';

const snakeTailImg = new Image();
snakeTailImg.src = './assets/icon-snake-tail.png';

snake[0] = {
  x: 9 * box,
  y: 10 * box
}

let food = {
  x: (Math.floor(Math.random() * 17 + 1)) * box,
  y: (Math.floor(Math.random() * 15 + 3)) * box,
}

const snakeDirection = (e) => {
  console.log(dir);
  if (e.keyCode === 37 && dir !== 'right') dir = 'left';
  else if (e.keyCode === 38 && dir !== 'down') dir = 'up';
  else if (e.keyCode === 39 && dir !== 'left') dir = 'right';
  else if (e.keyCode === 40 && dir !== 'up') dir = 'down';
}

document.addEventListener('keydown', snakeDirection)

const drawGame = () => {
  ctx.drawImage(field, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    if (i === 0) ctx.drawImage(snakeHadeImg, snake[i].x, snake[i].y);
    else ctx.drawImage(snakeTailImg, snake[i].x, snake[i].y);
  }
  ctx.fillStyle = 'white';
  ctx.font = '45px Arial';
  ctx.fillText(score, box * 2, box * 1.7)

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;


  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: (Math.floor(Math.random() * 17 + 1)) * box,
      y: (Math.floor(Math.random() * 15 + 3)) * box,
    }
  } else snake.pop();

  if (dir === 'left') snakeX -= box;
  if (dir === 'right') snakeX += box;
  if (dir === 'up') snakeY -= box;
  if (dir === 'down') snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead)
}

let game = setInterval(drawGame, 200);