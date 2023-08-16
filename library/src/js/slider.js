const slider = document.querySelector('.slider');
const sliderTrack = document.querySelector('.slider__track');
const buttonPrev = document.querySelector('.prev');
const buttonNext = document.querySelector('.next');
const buttonsContainer = document.querySelector('.slider__buttons');
const picAll = slider.querySelectorAll('.pic');

let shift = 0;
let picWidth;
const activePicCount = 1;
let sliderWidth = slider.clientWidth;

function resizeWidth() {
  let windowWidth = window.innerWidth;
  sliderWidth = slider.clientWidth;

  if (windowWidth > 1024) {
    picWidth = sliderWidth / 3 - (50 / 3);
  }
  if (windowWidth <= 1024) {
    picWidth = sliderWidth / 2;
  }
  if (windowWidth <= 768) {
    slider.style.maxWidth = 450 + 'px';
    picWidth = sliderWidth;
  }
  if (windowWidth > 768) {
    slider.style.maxWidth = 1400 + 'px';
  }
  picAll.forEach(item => item.style.width = picWidth + 'px');
  addButtonsSlideControl(sliderWidth)
}

resizeWidth()

function addButtonsSlideControl(sliderWidth) {
  let buttonsCount = picAll.length - (Math.floor(sliderWidth / picWidth)) + activePicCount;
  const buttonSlideContolHTML = '<span class="slider__button"></span>'

  buttonsContainer.innerHTML = '';

  for (let i = 0; i < buttonsCount; i++) {
    buttonsContainer.insertAdjacentHTML('beforeend', buttonSlideContolHTML)
  }
  const buttonsCircle = document.querySelectorAll('.slider__button');

  buttonsCircle.forEach((button, index) => {
    if (index === 0) {
      button.classList.add('button__active')
    }

    button.addEventListener('click', () => {

      buttonsCircle.forEach(button => {
        button.classList.remove('button__active')
      })

      if (index === 0) {
        shift = 0;
        button.classList.add('button__active')
      }
      if (shift < picWidth * 4 + 100) {
        shift = (picWidth + 25) * index;
      }
      sliderTrack.style.transform = `translateX(-${shift}px)`;
      button.classList.add('button__active')
    })
  })
}

addButtonsSlideControl(sliderWidth)

function disabledButtons() {
  if (shift === 0) {
    buttonPrev.classList.add('arrow__disabled');
  } else {
    buttonPrev.classList.remove('arrow__disabled');
  }
  if (shift === picWidth * 4 + 100) {
    buttonNext.classList.add('arrow__disabled');
  } else {
    buttonNext.classList.remove('arrow__disabled');
  }
}

buttonNext.addEventListener('click', () => {
  if (shift === picWidth * 4 + 100) {
    return;
  }
  shift += picWidth + 25;
  sliderTrack.style.transform = `translateX(-${shift}px)`;
  disabledButtons();
})

buttonPrev.addEventListener('click', () => {
  if (shift === 0) {
    shift = 0;
    return;
  }
  shift -= picWidth + 25;
  sliderTrack.style.transform = `translateX(-${shift}px)`;
  disabledButtons();
})

disabledButtons()

window.addEventListener('resize', () => {
  resizeWidth();
  sliderTrack.style.transform = 'translateX(0px)';
  shift = 0;
})
