const burger = document.querySelector('.burger')
const nav = document.querySelector('.nav')
const overlay = document.querySelector('.overlay')
const burgerClose = document.querySelector('.burger__close')
const itemLink = document.querySelectorAll('.item__link')

function burgerActive() {
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav__active')
    overlay.classList.toggle('overlay__active')
    burger.classList.toggle('burger__close.active')
  })
}

burgerActive()

function burgerMenuClose() {
  overlay.classList.remove('overlay__active')
  nav.classList.remove('nav__active')
  burger.classList.remove('burger__close.active')
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