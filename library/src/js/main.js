// burger menu
const burger = document.querySelector('.burger')
const nav = document.querySelector('.nav')
const overlay = document.querySelector('.overlay')
const burgerClose = document.querySelector('.burger__close')
const itemLink = document.querySelectorAll('.item__link')
const profileLogo = document.querySelector('.profile__logo')

function burgerActive() {
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav__active')
    overlay.classList.add('overlay__active')
    burgerClose.classList.add('burger__close_active')
    profileLogo.style.position = 'fixed'
    profileLogo.style.top = '31px'
    profileLogo.style.right = '17px'
    profileLogo.style.zIndex = '3'
  })
}

burgerActive()

function burgerMenuClose() {
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

// burger menu

// profile modal
const profileModalBefore = document.querySelector('.profile__before');
const profileModalAfter = document.querySelector('.profile__after');

let isAuth = false

function profileModalToggle(e) {
  e.stopPropagation()
  if (isAuth) {
    profileModalAfter.classList.toggle('profile__modal__active')
  } else profileModalBefore.classList.toggle('profile__modal__active')
}

function closeMenuOnClickOutside(event) {
  const target = event.target;
  const profileModalActive = document.querySelector('.profile__modal__active');

  if (profileModalActive && target !== profileLogo) {
    profileModalActive.classList.remove('profile__modal__active');
  }
}

document.addEventListener('click', closeMenuOnClickOutside);
profileLogo.addEventListener('click', profileModalToggle);
profileLogo.addEventListener('click', burgerMenuClose);

// profile modal

// register/login/my profile modals

import { renderLibraryCard } from './libraryCardChange.js'

const registerButton = document.querySelectorAll('.register__button');
const registerModal = document.querySelector('.register__modal');
const registerCloseLogo = document.querySelector('.register__close');

const logInButton = document.querySelectorAll('.login__button');
const logInModal = document.querySelector('.login__modal');
const logInCloseLogo = document.querySelector('.login__close');

const myProfileButtons = document.querySelectorAll('.my__profile__button')
const myProfileModal = document.querySelector('.my__profile')
const myProfileCloseLogo = document.querySelector('.my__profile__close')

const buyLibraryCardModal = document.querySelector('.buy__modal')
const buyLibraryCardCloseLogo = document.querySelector('.buy__modal__close')

const copyButton = document.querySelector('.copy')

function modalOpen(modalType) {
  modalType.classList.add('modal__active');
  overlay.classList.add('overlay__active');

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
  if (modalType === myProfileModal) {
    copyButton.setAttribute('src', 'assets/icon-copy.svg')
  }
}

registerButton.forEach(item => {
  item.addEventListener('click', () => modalOpen(registerModal));
});
overlay.addEventListener('click', () => modalClose(registerModal));
registerCloseLogo.addEventListener('click', () => modalClose(registerModal));

logInButton.forEach(item => {
  item.addEventListener('click', () => modalOpen(logInModal));
});
overlay.addEventListener('click', () => modalClose(logInModal));
logInCloseLogo.addEventListener('click', () => modalClose(logInModal));

myProfileButtons.forEach(item => {
  item.addEventListener('click', () => modalOpen(myProfileModal));
})
overlay.addEventListener('click', () => modalClose(myProfileModal));
myProfileCloseLogo.addEventListener('click', () => modalClose(myProfileModal));

overlay.addEventListener('click', () => modalClose(buyLibraryCardModal));
buyLibraryCardCloseLogo.addEventListener('click', () => modalClose(buyLibraryCardModal));

// register/login/my profile modals

// registration to localStorage

const registrInputs = document.querySelectorAll('.registr__input')
const registSubmitBtn = document.querySelector('.registr__submit')
const loginInputs = document.querySelectorAll('.login__input')
const loginSubmitBtn = document.querySelector('.login__submit')

const buyModalInputs = document.querySelectorAll('.buy__input')
const buyModalButton = document.querySelector('.buy__modal__btn')

const MIN_PASSWORD_LENGTH = 8
const MIN_BANK_CARD_LENGTH = 16
const MAX_EXP_CODE_LENGTH = 2
const MAX_CVC_LENGTH = 3

const user = {}

registSubmitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (addUserToLocalStorage()) {
    modalClose(registerModal)
    resetInputValue(registrInputs)
    readersCodeGeneration()
    checkUserAuth()
    // libraryCardCheck()
    isAuth = true
  }
})

function setUser() {
  registrInputs.forEach(item => {
    const inputName = item.getAttribute('data-input')
    user[inputName] = item.value
  })
  user.cardNumber = readersCodeGeneration()
  // user.visitsCount = visitsCount
  // user.booksCount = 
  // user.libraryCard = 
}

function getLocalStorageData() {
  return JSON.parse(localStorage.getItem('users'))
}

function setLocalStorageData(data, key) {
  localStorage.setItem(key, JSON.stringify(data))

}

function addUserToLocalStorage() {
  setUser()
  const localStorageData = getLocalStorageData()
  let isDataAdded = false

  if (localStorageData === null) {
    setLocalStorageData([user], 'users')
    setLocalStorageData(user, 'currentUser')
    isDataAdded = true
  }
  else if (!checkEmail(localStorageData)) {
    isDataAdded = true
    localStorageData.push(user)
    setLocalStorageData(localStorageData, 'users')
    setLocalStorageData(user, 'currentUser')
  }
  return isDataAdded
}

function checkEmail(data) {
  const inputEmail = document.querySelector('.email')
  const error = inputEmail.nextElementSibling

  const isEmailMatch = data.find(item => item.email === inputEmail.value)

  if (isEmailMatch) {
    error.innerHTML = 'User with this email is already registered'
  } else {
    error.innerHTML = ''
  }
  return Boolean(isEmailMatch)
}

function resetInputValue(inputs) {
  inputs.forEach(item => {
    item.value = ''
  })
}

const emptyFieldText = {
  firstName: 'Fill First name',
  lastName: 'Fill Last name',
  email: 'Fill E-mail',
  password: 'Fill Password',
  emailOrReader: 'Fill E-mail or readers card',
  incorrectPasswordLength: 'Minimum number of characters 8',
  number: 'Fill Bank card number',
  code: 'Fill Expiration code',
  cvc: 'Fill CVC',
  name: 'Fill Cardholder name',
  postal: 'Fill Postal code',
  city: 'Fill City / Town',
  incorrectBankCardLength: 'Minimum number of characters 16',
}

function inputChange(inputs, button) {
  inputs.forEach(item => {
    const inputName = item.getAttribute('data-input')

    item.addEventListener('input', () => {
      emptyCheck(item, inputName)
      isAllFieldsFill(inputs, button)
    })
  })
}

function emptyCheck(item, inputName) {
  const error = item.nextElementSibling
  console.log(typeof item.value)
  if (inputName === 'password' && item.value.length < MIN_PASSWORD_LENGTH) {
    error.innerHTML = emptyFieldText.incorrectPasswordLength
  }
  else error.innerHTML = ''

  if (inputName === 'number' && item.value.length < MIN_BANK_CARD_LENGTH) {
    error.innerHTML = emptyFieldText.incorrectBankCardLength
  }
  else error.innerHTML = ''

  if (inputName === 'code' && item.value.length > MAX_EXP_CODE_LENGTH) {
    item.value = item.value.slice(0, MAX_EXP_CODE_LENGTH)
  }
  if (inputName === 'cvc' && item.value.length > MAX_CVC_LENGTH) {
    item.value = item.value.slice(0, MAX_CVC_LENGTH)
  }

  if (item.value === '') {
    item.classList.add('input__invalid')
    error.innerHTML = emptyFieldText[inputName]
  } else if (item.classList.contains('input__invalid')) {
    item.classList.remove('input__invalid')
    error.innerHTML = ''
  }
}

const hasEmptyFields = new Set()

function isAllFieldsFill(inputs, button) {

  inputs.forEach(item => {
    const inputName = item.getAttribute('data-input')
    const isInputPassword = inputName === 'password'
    const isInputBankCardNumber = inputName === 'number'

    if (isInputBankCardNumber) {
      if (item.value.length < MIN_BANK_CARD_LENGTH) hasEmptyFields.add(inputName)
      else hasEmptyFields.delete(inputName)
    }
    if (isInputPassword) {
      if (item.value.length < MIN_PASSWORD_LENGTH) hasEmptyFields.add(inputName)
      else hasEmptyFields.delete(inputName)
    }
    else if (item.value === '') hasEmptyFields.add(inputName)
    else hasEmptyFields.delete(inputName)
  })

  if (hasEmptyFields.size) {
    button.setAttribute('disabled', '')
  } else {
    button.removeAttribute('disabled')
  }
}

inputChange(registrInputs, registSubmitBtn)
inputChange(loginInputs, loginSubmitBtn)
inputChange(buyModalInputs, buyModalButton)

// registration to localStorage

// login check

const localStorageData = getLocalStorageData()
const loginInputEmail = document.querySelector('.login__email')
const loginInputPassword = document.querySelector('.login__password')

function loginCheck() {

  const { email, cardNumber, password } = localStorageData.reduce((acc, item) => {
    if (item.email === loginInputEmail.value || item.cardNumber === loginInputEmail.value) {
      acc.email = item.email
      acc.cardNumber = item.cardNumber
      acc.password = item.password
    }
    return acc
  }, {})

  const isPasswordMatch = password === loginInputPassword.value
  const isCardNumberMatch = cardNumber === loginInputEmail.value
  const isEmailMatch = email === loginInputEmail.value

  const errorEmail = loginInputEmail.nextElementSibling
  const errorPassword = loginInputPassword.nextElementSibling
  let isMatch = false

  if (isEmailMatch || isCardNumberMatch) {
    errorEmail.innerHTML = ''

    if (!isPasswordMatch) {
      errorPassword.innerHTML = 'User with this password was not found'
      isMatch = false
    }
    else {
      errorPassword.innerHTML = ''
      isMatch = true
    }
  }
  else {
    errorEmail.innerHTML = 'User with this email or card was not found'
    isMatch = false
  }

  return isMatch
}

loginSubmitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (loginCheck()) {
    addCurrentUserAfterAuth()
    modalClose(logInModal)
    resetInputValue(loginInputs)
    checkUserAuth()
    isAuth = true
    renderLibraryCard(isAuth)
  }
})

// login check

// check user authentification

function checkUserAuth() {
  let currentUserData = JSON.parse(localStorage.getItem('currentUser'))

  if (currentUserData !== null) {
    const { firstName, lastName, cardNumber } = currentUserData
    const fullName = `${firstName} ${lastName}`
    const capitalizedName = fullName.split(' ')
      .map(item => item[0].toUpperCase() + item.slice(1))
      .join(' ')
    const initials = (firstName[0] + lastName[0]).toUpperCase()
    addFullName(initials, capitalizedName)
    addCardNumber(cardNumber)
    isAuth = true
  }
}

checkUserAuth()

// check user authentification

// add current user to localStorage after auth

function addCurrentUserAfterAuth() {
  let currentUser = {}
  currentUser = localStorageData.find(user => user.email === loginInputEmail.value ||
    user.cardNumber === loginInputEmail.value &&
    user.password === loginInputPassword.value)
  setLocalStorageData(currentUser, 'currentUser')
}

// add current user to localStorage after auth

// add full name to elements according localStorage data

function addFullName(initials, capitalizedName) {
  const myProfileInitials = document.querySelector('.initials')
  const myProfileName = document.querySelector('.my__profile__name')

  profileLogo.classList.add('profile__logo__name')
  profileLogo.innerHTML = initials
  profileLogo.setAttribute('title', capitalizedName)

  myProfileInitials.innerHTML = initials
  myProfileName.innerHTML = capitalizedName

  // inputCardName.value = capitalizedName
}

// add full name to elements according localStorage data

// readers code generation

function readersCodeGeneration() {
  let cardNumber = ''
  const NUMBER__LENGTH = 9
  const HEX__CHAR__COUNT = 16

  for (let i = 0; i < NUMBER__LENGTH; i++) {
    const HEXRandomNumber = Math.trunc((Math.random() * HEX__CHAR__COUNT)).toString(16).toUpperCase()
    cardNumber += HEXRandomNumber
  }
  return cardNumber
}

// readers code generation

// add cardNumber 

function addCardNumber(cardNumber) {
  const cardNumberContainer = document.querySelector('.card__number')
  const profileTitle = document.querySelector('.profile__button')

  cardNumberContainer.innerHTML = cardNumber
  profileTitle.innerHTML = cardNumber

  copyButton.addEventListener('click', () => {
    window.navigator.clipboard.writeText(cardNumber)
    copyButton.setAttribute('src', 'assets/check-icon.svg')
  })
}

// add cardNumber

// buy library card modal 

export function buyLibraryCard() {
  const buttons = document.querySelectorAll('.buy__button')

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (isAuth) modalOpen(buyLibraryCardModal)
      else modalOpen(logInModal)
    })
  })
}

buyModalButton.addEventListener('click', () => modalClose(buyLibraryCardModal))

// buy library card modal 

// const checkBtn = document.querySelector('.check__btn')

// function libraryCardCheck() {
//   const inputCardName = document.querySelector('.input__name')
//   const inputCardNumber = document.querySelector('.input__cardNumber')
//   const libraryCardInfo = document.querySelector('.library__card__info')

//   checkBtn.addEventListener('click', () => {
//     let userMatch = localStorageData.find(user => (user.firstName + ' ' + user.lastName) === inputCardName.value
//       && user.cardNumber === inputCardNumber.value)

//     if (userMatch !== undefined) {
//       checkBtn.style.opacity = '0'
//       checkBtn.style.pointerEvents = 'none'
//       libraryCardInfo
//       setTimeout(() => {
//         checkBtn.style.opacity = '1'
//         checkBtn.style.pointerEvents = 'all'
//         inputCardName.value = ''
//         inputCardNumber.value = ''
//       }, 10000)
//     }
//   })
// }

// libraryCardCheck()

// show/hide password

function showHidePassword() {
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

// show/hide password

//  log out

const logOutButton = document.querySelector('.log__out__button')

function logOut() {
  isAuth = false
  localStorage.removeItem('currentUser')
  profileLogo.classList.remove('profile__logo__name')
  profileLogo.innerHTML = ''
  profileLogo.removeAttribute('title')
  buyLibraryCard()
}

logOutButton.addEventListener('click', logOut)

  //  log out
