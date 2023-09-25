const container = document.querySelector('.container');
const magnifier = document.querySelector('.magnifier');
const input = document.querySelector('.input');
const firstColumn = document.querySelector('.first');
const secondColumn = document.querySelector('.second');
const thirdColumn = document.querySelector('.third');
const reset = document.querySelector('.reset');

let url = 'https://api.unsplash.com/search/photos?query=random&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(response.statusText);
  showData(data)
    .catch(error => {
      console.error('Ошибка:', error);
    });
};

getData();

async function showData(data) {
  firstColumn.innerHTML = '';
  secondColumn.innerHTML = '';
  thirdColumn.innerHTML = '';

  data.results.forEach((element, index) => {
    const pic = element.urls.regular;
    const img = `<img class="gallery__img" src='${pic}' alt="image">`;
    if (index < 10) firstColumn.insertAdjacentHTML('beforeend', img);
    if (index >= 10 && index < 20) secondColumn.insertAdjacentHTML('beforeend', img);
    if (index >= 20) thirdColumn.insertAdjacentHTML('beforeend', img);
  });
};

const searchPic = () => {
  const inputValue = input.value;
  url = `https://api.unsplash.com/search/photos?query=${inputValue}&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
  getData();
}

magnifier.addEventListener('click', searchPic);
document.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    searchPic();
  };
});

const resetInput = () => {
  reset.classList.toggle('reset__active', input.value !== '')
};

input.addEventListener('input', resetInput);
reset.addEventListener('click', () => {
  input.value = '';
  resetInput();
});