import { authModalRender } from './authModal.js'
import { changeLogo } from './changeLogo.js'
import { libraryCardRender } from './libraryCard.js'
import { myProfileRender } from './profileModal.js'
import { renderSeasonCards } from './favorites.js'
import { visitsAndBooksCountShow } from './login.js'

const modals = document.querySelectorAll('.modal')
const registerModal = document.querySelector('.register__modal')
const logInModal = document.querySelector('.login__modal')
const myProfileModal = document.querySelector('.my__profile')
const buyLibraryCardModal = document.querySelector('.buy__modal')
const closeButtons = document.querySelectorAll('.close')
const copyButton = document.querySelector('.copy')
const overlay = document.querySelector('.overlay')

export let isAuth = false

// Рендер элементов после регистрации/авторизации

const initRender = (userData) => {
  changeLogo(userData)
  libraryCardRender(userData)
  authModalRender(userData)
  myProfileRender(userData)
  renderSeasonCards()
  visitsAndBooksCountShow()
}

// Получение и запись данных в localStorage

export const getLocalStorageData = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

export const setLocalStorageData = (data, key) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const localStorageData = getLocalStorageData('users')

// Проверка авторизации

export const checkUserAuth = () => {
  const currentUserData = getLocalStorageData('currentUser')

  if (currentUserData !== null) {
    isAuth = true
    initRender(currentUserData)
  } else initRender()

  addEventsForControlButtons()
}

checkUserAuth()

// Открытие/закрытие модальных окон

const closeItems = {
  logInModal,
  registerModal,
  myProfileModal,
  buyLibraryCardModal,
}

export const modalOpen = (modalType) => {
  modals.forEach(item => {
    modalClose(item, true)
  })

  modalType.classList.add('modal__active');
  overlay.classList.add('overlay__active');
}

export const modalClose = (modalType, fromModalOpen) => {
  if (!fromModalOpen) {
    overlay.classList.remove('overlay__active');
  }
  modalType.classList.remove('modal__active');

  if (modalType === myProfileModal) {
    copyButton.setAttribute('src', 'assets/icon-copy.svg')
  }
}

function addEventsForControlButtons() {
  const myProfileButton = document.querySelectorAll('.my__profile__button')
  const logInButton = document.querySelectorAll('.login__button')
  const registerButton = document.querySelectorAll('.register__button')
  const logOutButton = document.querySelector('.log__out__button')

  logInButton?.forEach(item => {
    item.addEventListener('click', () => modalOpen(logInModal))
  })

  registerButton?.forEach(item => {
    item.addEventListener('click', () => modalOpen(registerModal))
  })

  myProfileButton?.forEach(item => {
    item.addEventListener('click', () => modalOpen(myProfileModal))
  })

  closeButtons.forEach(item => {
    let modalName = item.getAttribute('data-close')
    item.addEventListener('click', () => modalClose(closeItems[modalName]))
  })

  overlay.addEventListener('click', () => {
    modalClose(logInModal)
    modalClose(registerModal)
    modalClose(myProfileModal)
    modalClose(buyLibraryCardModal)
  })

  logOutButton?.addEventListener('click', () => {
    localStorage.removeItem('currentUser')
    isAuth = false
    checkUserAuth()
  })
}

// Показать или скрыть пароль при вводе

const showHidePassword = () => {
  const password = document.querySelectorAll('.password')
  const eyeImg = document.querySelectorAll('.eye')

  eyeImg.forEach(item => {
    item.addEventListener('click', () => {
      password.forEach(password => {
        if (password.getAttribute('type') === 'password') {
          item.setAttribute('src', 'assets/close_eye.png')
          password.setAttribute('type', 'text')
        }
        else {
          item.setAttribute('src', 'assets/open-eye.png')
          password.setAttribute('type', 'password')
        }
      })
    })
  })
}

showHidePassword()

// Обнулить поля в формах

export const resetInputValue = (inputs) => {
  inputs.forEach(item => {
    item.value = ''
  })
}

// Кнопка для прокрутки страницы вверх

const arrowUp = document.querySelector('.arrow__up')

arrowUp.addEventListener('click', () => {
  window.scrollTo(scrollX, 0)
})

window.addEventListener('scroll', () => {
  if (scrollY < document.documentElement.clientWidth) arrowUp.style.display = 'none'
  else arrowUp.style.display = 'block'
})