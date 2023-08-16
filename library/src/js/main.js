const burger = document.querySelector('.burger')
const nav = document.querySelector('.nav')
const overlay = document.querySelector('.overlay')
const burgerClose = document.querySelector('.burger__close')
const itemLink = document.querySelectorAll('.item__link')
const profileBurger = document.querySelector('.profile__logo')

function burgerActive() {
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav__active')
    overlay.classList.add('overlay__active')
    burgerClose.classList.add('burger__close_active')
    profileBurger.style.position = 'fixed'
    profileBurger.style.top = '31px'
    profileBurger.style.right = '17px'
  })
}

burgerActive()

function burgerMenuClose() {
  overlay.classList.remove('overlay__active')
  nav.classList.remove('nav__active')
  burgerClose.classList.remove('burger__close_active')
  profileBurger.style.position = 'static'
  profileBurger.style.top = '0'
  profileBurger.style.right = '0'
}

overlay.addEventListener('click', burgerMenuClose)
burgerClose.addEventListener('click', burgerMenuClose)
itemLink.forEach(item => {
  item.addEventListener('click', burgerMenuClose)
})

const labelsSeason = document.querySelectorAll('.season__label')
const winter = document.querySelector('.winter')
const spring = document.querySelector('.spring')
const summer = document.querySelector('.summer')
const autumn = document.querySelector('.autumn')

const fadeIn = (el, timeout, display) => {
  el.style.opacity = 0;
  el.style.display = display || 'block';
  el.style.transition = `opacity ${timeout}ms`;
  setTimeout(() => {
    el.style.opacity = 1;
  }, 10)
};

const fadeOut = (el, timeout) => {
  el.style.opacity = 1;
  el.style.transition = `opacity ${timeout}ms`;
  el.style.opacity = 0;
  setTimeout(() => {
    el.style.display = 'none'
  }, timeout);
};

let flag = false;

function seasonSort() {
  labelsSeason[0].addEventListener('click', () => {
    if (!flag) {
      fadeIn(winter, 3000, 'flex');
      flag = true;
    } else {
      fadeOut(spring, 500);
      flag = false;
      fadeOut(summer, 500);
      flag = false;
      fadeOut(autumn, 500);
      flag = false;

    }
  })
  labelsSeason[1].addEventListener('click', () => {
    if (!flag) {
      fadeIn(spring, 3000, 'flex');
      flag = true;
    } else {
      fadeOut(winter, 500);
      flag = false;
      fadeOut(summer, 500);
      flag = false;
      fadeOut(autumn, 500);
      flag = false;
    }
  })
  labelsSeason[2].addEventListener('click', () => {
    if (!flag) {
      fadeIn(summer, 3000, 'flex');
      flag = true;
    } else {
      fadeOut(winter, 500);
      flag = false;
      fadeOut(spring, 500);
      flag = false;
      fadeOut(autumn, 500);
      flag = false;
    }
  })
  labelsSeason[3].addEventListener('click', () => {
    if (!flag) {
      fadeIn(autumn, 3000, 'flex');
      flag = true;
    } else {
      fadeOut(winter, 500);
      flag = false;
      fadeOut(spring, 500);
      flag = false;
      fadeOut(summer, 500);
      flag = false;
    }
  })
}

seasonSort()