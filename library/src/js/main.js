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

const profile = document.querySelector('.profile__logo')
const profileModal = document.querySelector('.profile__modal')

function profileActive() {
  profile.addEventListener('click', () => {
    profile.classList.add('.profile__modal.active')
  })
}

profileActive()