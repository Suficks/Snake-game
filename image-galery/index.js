const container = document.querySelector('.container');
const magnifier = document.querySelector('.magnifier');
const input = document.querySelector('.input');
const firstColumn = document.querySelector('.first');
const secondColumn = document.querySelector('.second');
const thirdColumn = document.querySelector('.third');
const reset = document.querySelector('.reset');
const header = document.querySelector('.header');
const preloader = document.querySelector('.preloader');

let url = 'https://api.unsplash.com/search/photos?query=random&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

input.focus();

// Получение картинок

async function getData() {
  preloader.classList.add('show__preloader');
  const res = await fetch(url);
  const data = await res.json();
  showData(data);

  setTimeout(() => {
    preloader.classList.remove('show__preloader');
  }, 2000)
};

getData();

// container.onload = () => console.log('img onload')

// Получение картинок

// Отображение картинок

function showData(data) {
  firstColumn.innerHTML = '';
  secondColumn.innerHTML = '';
  thirdColumn.innerHTML = '';

  data.results.forEach((element, index) => {
    const pic = element.urls.regular;
    const img = `
    <div class="img__item">
      <img class="gallery__img" src='${pic}' alt="image">
      <img class="like" src="./assets/like-icon.png" alt="like">
    </div>`;
    columnFill(index, img);
    likePic();
  });
};

// Отображение картинок

// Заполнение столбцов картинками

function columnFill(index, img) {
  if (window.innerWidth <= 880) {
    if (index < 15) firstColumn.insertAdjacentHTML('beforeend', img);
    if (index >= 15) secondColumn.insertAdjacentHTML('beforeend', img);
  } else {
    if (index < 10) firstColumn.insertAdjacentHTML('beforeend', img);
    if (index >= 10 && index < 20) secondColumn.insertAdjacentHTML('beforeend', img);
    if (index >= 20) thirdColumn.insertAdjacentHTML('beforeend', img);
  };
};

// Заполнение столбцов картинками

// Поиск картинки

const searchPic = () => {
  const inputValue = input.value;
  url = `https://api.unsplash.com/search/photos?query=${inputValue}&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
  getData()
    .catch(() => {
      const div = document.createElement('div');
      div.classList.add('error__modal');
      div.innerHTML = '<p class="error__text">Слишком частые запросы. Попробуйте позже</p>';
      document.body.append(div)
    });
};

magnifier.addEventListener('click', () => {
  searchPic();
});
document.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    searchPic();
  };
});

// Поиск картинки

// Очистка инпута

const resetInput = () => {
  reset.classList.toggle('reset__active', input.value !== '')
};

input.addEventListener('input', resetInput);
reset.addEventListener('click', () => {
  input.value = '';
  resetInput();
});

// Очистка инпута

// Лайк картинке

function likePic() {
  const likeBtn = document.querySelectorAll('.like');
  let isActive = false;

  likeBtn.forEach(item => {
    item.addEventListener('click', () => {
      if (!isActive) {
        item.classList.add('like__active');
        item.src = './assets/like-icon-active.png';
        isActive = true;
      } else {
        item.classList.remove('like__active');
        item.src = './assets/like-icon.png';
        isActive = false;
      };
    });
  });
};

// Лайк картинке

// Исчезание хедера при скроле

window.addEventListener('scroll', () => {
  if (!header.classList.contains('header__scroll')) header.classList.add('header__scroll');
  if (window.scrollY === 0) header.classList.add('header__scroll')
});

window.addEventListener('scrollend', () => {
  if (header.classList.contains('header__scroll')) header.classList.remove('header__scroll');
});

// Исчезание хедера при скроле

// Изменение колонок при ресайзе

window.addEventListener('resize', getData);

// Изменение колонок при ресайзе
