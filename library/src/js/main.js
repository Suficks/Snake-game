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

const registerButton = document.querySelectorAll('.register__button');
const registerModal = document.querySelector('.register__modal');
const registerCloseLogo = document.querySelector('.register__close');

const logInButton = document.querySelectorAll('.login__button');
const logInModal = document.querySelector('.login__modal');
const logInCloseLogo = document.querySelector('.login__close');

const profileButton = document.querySelector('.my__profile__button')
const myProfileModal = document.querySelector('.my__profile')
const myProfileCloseLogo = document.querySelector('.my__profile__close')

const buyLibraryCardModal = document.querySelector('.buy__modal')

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

profileButton.addEventListener('click', () => modalOpen(myProfileModal));
overlay.addEventListener('click', () => modalClose(myProfileModal));
myProfileCloseLogo.addEventListener('click', () => modalClose(myProfileModal));

// register/login/my profile modals

// registration to localStorage

const registrInputs = document.querySelectorAll('.registr__input')
const registSubmitBtn = document.querySelector('.registr__submit')
const loginInputs = document.querySelectorAll('.login__input')
const loginSubmitBtn = document.querySelector('.login__submit')

const MIN_PASSWORD_LENGTH = 8

const user = {}

registSubmitBtn.addEventListener('click', () => {
  if (addUserToLocalStorage()) {
    modalClose(registerModal)
    resetInputValue(registrInputs)
    readersCodeGeneration()
    checkUserAuth()
    isAuth = true
  }
})

function setUser() {
  registrInputs.forEach(item => {
    const inputName = item.getAttribute('data-input')
    user[inputName] = item.value
  })
  user.cardNumber = readersCodeGeneration()
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
}

function inputChange(inputs, button) {
  inputs.forEach(item => {
    const inputName = item.getAttribute('data-input')

    item.addEventListener('input', () => {
      emptyCheck(item, inputName)
      isAllFieldsFill(inputs, button, inputName)
    })
  })
}

function emptyCheck(item, inputName) {
  const error = item.nextElementSibling

  if (inputName === 'password' && item.value.length < MIN_PASSWORD_LENGTH) {
    error.innerHTML = emptyFieldText.incorrectPasswordLength
  }
  else error.innerHTML = ''

  if (item.value === '') {
    item.classList.add('input__invalid')
    error.innerHTML = emptyFieldText[inputName]
  } else if (item.classList.contains('input__invalid')) {
    item.classList.remove('input__invalid')
    error.innerHTML = ''
  }
}

function isAllFieldsFill(inputs, button, inputName) {
  let isDisabled = false

  inputs.forEach(item => {
    const isInputPassword = inputName === 'password'

    if (isInputPassword) {
      if (item.value.length < MIN_PASSWORD_LENGTH) isDisabled = true
      else isDisabled = false
    }

    if (item.value === '') {
      isDisabled = true
    }
  })

  if (isDisabled) {
    button.setAttribute('disabled', '')
  } else {
    button.removeAttribute('disabled')
  }
}

inputChange(registrInputs, registSubmitBtn)
inputChange(loginInputs, loginSubmitBtn)

// registration to localStorage

// login check

const localStorageData = getLocalStorageData()

function loginCheck() {
  const loginInputEmail = document.querySelector('.login__email')
  const loginInputPassword = document.querySelector('.login__password')

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

loginSubmitBtn.addEventListener('click', () => {
  if (loginCheck()) {
    modalClose(logInModal)
    resetInputValue(loginInputs)
    checkUserAuth()
    // buyLibraryCard(buyLibraryCardModal)
    isAuth = true
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

//  log out

// function logOut() {
//   const logOutButton = document.querySelector('.log__out__button')

//   logOutButton.addEventListener('click', () => {
//     localStorage.removeItem('currentUser')
//   })
// }

// logOut()

//  log out

export function buyLibraryCard(buttons) {
  const buyLibraryCardCloseLogo = document.querySelector('.buy__modal__close')

  if (isAuth) {
    buttons.forEach(button => {
      button.addEventListener('click', () => modalOpen(buyLibraryCardModal))
    })
    overlay.addEventListener('click', () => modalClose(buyLibraryCardModal));
    buyLibraryCardCloseLogo.addEventListener('click', () => modalClose(buyLibraryCardModal));
  }
  else {
    buttons.forEach(button => {
      button.addEventListener('click', () => modalOpen(logInModal))
    })
    overlay.addEventListener('click', () => modalClose(logInModal));
    buyLibraryCardCloseLogo.addEventListener('click', () => modalClose(logInModal));
  }
}
