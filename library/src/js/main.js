// burger menu
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
    profileBurger.style.zIndex = '2'
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
  profileBurger.style.zIndex = '0'
}

overlay.addEventListener('click', burgerMenuClose)
burgerClose.addEventListener('click', burgerMenuClose)
itemLink.forEach(item => {
  item.addEventListener('click', burgerMenuClose)
})

// burger menu

// favorite cards cort

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

// favorite cards cort

// profile modal
const profileModal = document.querySelector('.profile__modal');
const profileModalBefore = document.querySelector('.profile__before');
const profileModalAfter = document.querySelector('.profile__after');

function profileModalActive() {
  // if () {
  // profileModalAfter.toggle('profile__modal__active');
  // } else {
  profileModal.classList.toggle('profile__modal__active');
}

function closeMenuOnClickOutside(event) {
  const target = event.target;
  if (!profileModal.contains(target) && target !== profileBurger) {
    profileModal.classList.remove('profile__modal__active');
  }
}

function addClickOutsideListener() {
  document.addEventListener('click', closeMenuOnClickOutside);
}

profileBurger.addEventListener('click', profileModalActive);
profileBurger.addEventListener('click', burgerMenuClose);
addClickOutsideListener();

// profile modal

// register/login modal

const registerButton = document.querySelectorAll('.register__button');
const registerModal = document.querySelector('.register__modal');
const registerCloseLogo = document.querySelector('.register__close');

const logInButton = document.querySelectorAll('.login__button');
const logInModal = document.querySelector('.login__modal');
const logInCloseLogo = document.querySelector('.login__close');

function ModalOpen(modalType) {
  modalType.classList.add('modal__active');
  overlay.classList.add('overlay__active');
  profileModal.classList.remove('profile__modal__active');
  if (modalType === registerModal) {
    logInModal.classList.remove('modal__active')
  }
  if (modalType === logInModal) {
    registerModal.classList.remove('modal__active')
  }
}

function modalClose(modalType) {
  modalType.classList.remove('modal__active');
  overlay.classList.remove('overlay__active');
}

registerButton.forEach(item => {
  item.addEventListener('click', () => ModalOpen(registerModal));
});
overlay.addEventListener('click', () => modalClose(registerModal));
registerCloseLogo.addEventListener('click', () => modalClose(registerModal));

logInButton.forEach(item => {
  item.addEventListener('click', () => ModalOpen(logInModal));
});
overlay.addEventListener('click', () => modalClose(logInModal));
logInCloseLogo.addEventListener('click', () => modalClose(logInModal));

// register/login modal

