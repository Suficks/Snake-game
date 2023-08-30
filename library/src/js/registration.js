import {
  checkUserAuth,
  setLocalStorageData,
  localStorageData,
  modalClose,
  resetInputValue,
} from './main.js'

const MIN_PASSWORD_LENGTH = 8
const MIN_BANK_CARD_LENGTH = 16
const MAX_EXP_CODE_LENGTH = 2
const MAX_CVC_LENGTH = 3
const EMAIL_REGEXP = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

const registrInputs = document.querySelectorAll('.registr__input')
const registerModal = document.querySelector('.register__modal')
const registSubmitBtn = document.querySelector('.registr__submit')

const loginInputs = document.querySelectorAll('.login__input')
const loginSubmitBtn = document.querySelector('.login__submit')

const buyModalInputs = document.querySelectorAll('.buy__input')
const buyCard = document.querySelector('.buy__modal__btn')

const user = {}

const setUser = () => {
  registrInputs.forEach(item => {
    const inputName = item.getAttribute('data-input')
    user[inputName] = item.value
  })
  user.cardNumber = readersCodeGeneration()
  user.visitsCount = 1
  user.books = {}
  user.hasLibraryCard = false
}

const addUserToLocalStorage = () => {
  setUser()
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

const checkEmail = (data) => {
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

const emptyFieldText = {
  firstName: 'Fill First name',
  lastName: 'Fill Last name',
  email: 'Fill E-mail',
  password: 'Fill Password',
  emailOrReader: 'Fill E-mail or readers card',
  wrongEmail: 'Invalid email address',
  incorrectPasswordLength: 'Minimum number of characters 8',
  number: 'Fill Bank card number',
  code__month: 'Fill Expiration code',
  code__year: 'Fill Expiration code',
  cvc: 'Fill CVC',
  name: 'Fill Cardholder name',
  postal: 'Fill Postal code',
  city: 'Fill City / Town',
  incorrectBankCardLength: 'Minimum number of characters 16',
}

const emptyCheck = (item, inputName) => {
  const error = item.nextElementSibling
  switch (inputName) {
    case 'password':
      if (item.value.length < MIN_PASSWORD_LENGTH) {
        error.innerHTML = emptyFieldText.incorrectPasswordLength
      } else error.innerHTML = ''
      break
    case 'email':
      if (!item.value.match(EMAIL_REGEXP)) {
        error.innerHTML = emptyFieldText.wrongEmail
      } else {
        error.innerHTML = ''
      }
      break
    case 'number':
      if (item.value.length < MIN_BANK_CARD_LENGTH) {
        error.innerHTML = emptyFieldText.incorrectBankCardLength
      } else error.innerHTML = ''
      break
    case 'code__month':
      if (item.value.length > MAX_EXP_CODE_LENGTH) {
        item.value = item.value.slice(0, MAX_EXP_CODE_LENGTH)
      }
      break
    case 'code__year':
      if (item.value.length > MAX_EXP_CODE_LENGTH) {
        item.value = item.value.slice(0, MAX_EXP_CODE_LENGTH)
      }
      break
    case 'cvc':
      if (item.value.length > MAX_CVC_LENGTH) {
        item.value = item.value.slice(0, MAX_CVC_LENGTH)
      }
      break
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

const isAllFieldsFill = (inputs, button) => {
  inputs.forEach(item => {
    const inputName = item.getAttribute('data-input')
    const isInputPassword = inputName === 'password'
    const isInputBankCardNumber = inputName === 'number'
    const isInputCodeMonth = inputName === 'code__month'
    const isInputCodeYear = inputName === 'code__year'
    const isInputCVC = inputName === 'cvc'
    const isInputEmail = inputName === 'email'

    if (isInputBankCardNumber) {
      if (item.value.length < MIN_BANK_CARD_LENGTH) hasEmptyFields.add(inputName)
      else hasEmptyFields.delete(inputName)
      return
    }
    if (isInputEmail) {
      if (!item.value.match(EMAIL_REGEXP)) hasEmptyFields.add(inputName)
      else hasEmptyFields.delete(inputName)
      return
    }
    if (isInputPassword) {
      if (item.value.length < MIN_PASSWORD_LENGTH) hasEmptyFields.add(inputName)
      else hasEmptyFields.delete(inputName)
      return
    }
    if (isInputCodeMonth) {
      if (item.value.length < MAX_EXP_CODE_LENGTH) hasEmptyFields.add(inputName)
      else hasEmptyFields.delete(inputName)
      return
    }
    if (isInputCodeYear) {
      if (item.value.length < MAX_EXP_CODE_LENGTH) hasEmptyFields.add(inputName)
      else hasEmptyFields.delete(inputName)
      return
    }
    if (isInputCVC) {
      if (item.value.length < MAX_CVC_LENGTH) hasEmptyFields.add(inputName)
      else hasEmptyFields.delete(inputName)
      return
    }
    if (item.value === '') hasEmptyFields.add(inputName)
    else hasEmptyFields.delete(inputName)
  })
  if (hasEmptyFields.size) {
    button.setAttribute('disabled', '')
  } else {
    button.removeAttribute('disabled')
  }
}

const readersCodeGeneration = () => {
  let cardNumber = ''
  const NUMBER__LENGTH = 9
  const HEX__CHAR__COUNT = 16

  for (let i = 0; i < NUMBER__LENGTH; i++) {
    const HEXRandomNumber = Math.trunc((Math.random() * HEX__CHAR__COUNT)).toString(16).toUpperCase()
    cardNumber += HEXRandomNumber
  }
  return cardNumber
}

const inputChange = (inputs, button) => {
  inputs.forEach(item => {
    const inputName = item.getAttribute('data-input')

    item.addEventListener('input', () => {
      emptyCheck(item, inputName)
      isAllFieldsFill(inputs, button)
    })
  })
}

inputChange(registrInputs, registSubmitBtn)
inputChange(loginInputs, loginSubmitBtn)
inputChange(buyModalInputs, buyCard)

const registration = () => {
  if (addUserToLocalStorage()) {
    modalClose(registerModal)
    resetInputValue(registrInputs)
    readersCodeGeneration()
    checkUserAuth()
  }
}

registSubmitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  registration()
})