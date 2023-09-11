import { isAuth } from './main.js'
import { burgerMenuClose } from './burgerMenu.js'

const authModal = document.querySelector('.auth__modal')
const authModalTitle = authModal.querySelector('.title')
const profileLogo = document.querySelector('.profile__logo')
const buttonsWrapper = document.querySelector('.buttons__wrapper')

export const authModalRender = (userData) => {
  const beforeAuth = ` 
    <button class="info login__button">Log In</button>
    <button class="info register__button">Register</button>
    `
  const afterAuth = `
    <button class="info my__profile__button">My profile</button>
    <button class="info log__out__button">Log Out</button>
  `
  buttonsWrapper.innerHTML = ''
  if (isAuth) {
    const { cardNumber } = userData
    authModalTitle.innerHTML = cardNumber
    authModalTitle.classList.add('title__card__number')
    buttonsWrapper.insertAdjacentHTML('beforeend', afterAuth)
  } else {
    authModalTitle.innerHTML = 'Profile'
    authModalTitle.classList.remove('title__card__number')
    buttonsWrapper.insertAdjacentHTML('beforeend', beforeAuth)
  }
}

const authModalToggle = () => {
  authModal.classList.toggle('modal__active')
}

const closeMenuOnClickOutside = (event) => {
  const target = event.target;

  if (target !== profileLogo) {
    authModal.classList.remove('modal__active')
  }
}

document.addEventListener('click', closeMenuOnClickOutside);

profileLogo.addEventListener('click', () => {
  authModalToggle()
  burgerMenuClose()
})
