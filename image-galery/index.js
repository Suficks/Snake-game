const container = document.querySelector('.container');
const magnifier = document.querySelector('.magnifier');
const input = document.querySelector('.input');

let url = 'https://api.unsplash.com/search/photos?query=random&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  showData(data)
}

getData();

async function showData(data) {
  container.innerHTML = '';
  data.results.forEach(element => {
    const pic = element.urls.regular;
    const img = `<img class="gallery__img" src='${pic}' alt="image">`;
    container.insertAdjacentHTML('beforeend', img);
  });
}

const searchPic = () => {
  const inputValue = input.value;
  url = `https://api.unsplash.com/search/photos?query=${inputValue}&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
  getData();
}


magnifier.addEventListener('click', searchPic);

document.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    searchPic()
  };
});
