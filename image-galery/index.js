const container = document.querySelector('.container');
const magnifier = document.querySelector('.magnifier');
const input = document.querySelector('.input');
const firstColumn = document.querySelector('.first');
const secondColumn = document.querySelector('.second');
const thirdColumn = document.querySelector('.third');
const reset = document.querySelector('.reset');

let url = 'https://api.unsplash.com/search/photos?query=random&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';
input.focus();

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(response.statusText);
  showData(data)
};

getData();

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
    if (index < 10) firstColumn.insertAdjacentHTML('beforeend', img);
    if (index >= 10 && index < 20) secondColumn.insertAdjacentHTML('beforeend', img);
    if (index >= 20) thirdColumn.insertAdjacentHTML('beforeend', img);
    likePic();
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
      }
    })
  })
}