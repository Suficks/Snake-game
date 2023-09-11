const burger = document.querySelector('.burger')
const nav = document.querySelector('.nav')
const burgerClose = document.querySelector('.burger__close')
const itemLink = document.querySelectorAll('.item__link')
const overlay = document.querySelector('.overlay')
const profileLogo = document.querySelector('.profile__logo')

burger.addEventListener('click', () => {
  nav.classList.toggle('nav__active')
  overlay.classList.add('overlay__active')
  burgerClose.classList.add('burger__close_active')
  profileLogo.style.position = 'fixed'
  profileLogo.style.top = '31px'
  profileLogo.style.right = '16px'
  profileLogo.style.zIndex = '3'
})

export const burgerMenuClose = () => {
  overlay.classList.remove('overlay__active')
  nav.classList.remove('nav__active')
  burgerClose.classList.remove('burger__close_active')
  profileLogo.style.position = 'static'
  profileLogo.style.top = '0'
  profileLogo.style.right = '0'
  profileLogo.style.zIndex = '0'
}

overlay.addEventListener('click', burgerMenuClose)
burgerClose.addEventListener('click', burgerMenuClose)
itemLink.forEach(item => {
  item.addEventListener('click', burgerMenuClose)
})
