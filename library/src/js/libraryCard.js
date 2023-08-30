import { isAuth, getLocalStorageData } from './main.js'

const template = document.getElementById('cardTemplate')
const itemsContainer = document.querySelector('.check__books')
const buttonWrap = document.querySelector('.button__wrap')
const inputName = document.querySelector('.input__name')
const inputCardNumber = document.querySelector('.input__cardNumber')
const cardSubtitle = document.querySelector('.card__subtitle')
const getCardSubtitle = document.querySelector('.get__sibtitle')
const getCardInfo = document.querySelector('.get__info')

const cardBeforeAuth = {
  subtitle: 'Find your Library card',
  get__subtitle: 'Get a reader card',
  get__info: 'You will be able to see a reader card after logging into account or you can register a new account',
}

const cardAfterAuth = {
  subtitle: 'Your Library card',
  get__subtitle: 'Visit your profile',
  get__info: "With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.",
}

export const libraryCardRender = (data) => {
  const checkBtn = `<button class="button check__btn">Check the card</button>`
  const registBtn = `<button class="button register__button">Sign Up</button>`
  const loginBtn = `<button class="button login__button">Log in</button>`
  const profileBtn = `<button class="button my__profile__button">Profile</button>`

  if (isAuth) {
    cardSubtitle.innerHTML = cardAfterAuth.subtitle
    itemsContainer.innerHTML = ''
    itemsContainer.append(template.content.cloneNode(true))
    getCardSubtitle.innerHTML = cardAfterAuth.get__subtitle
    getCardInfo.innerHTML = cardAfterAuth.get__info
    buttonWrap.innerHTML = profileBtn
    inputName.value = `${data.firstName} ${data.lastName}`
    inputName.style.pointerEvents = 'none'
    inputCardNumber.value = data.cardNumber
    inputCardNumber.style.pointerEvents = 'none'
  } else {
    cardSubtitle.innerHTML = cardBeforeAuth.subtitle
    itemsContainer.innerHTML = ''
    itemsContainer.innerHTML = checkBtn
    getCardSubtitle.innerHTML = cardBeforeAuth.get__subtitle
    getCardInfo.innerHTML = cardBeforeAuth.get__info
    buttonWrap.innerHTML = ''
    inputName.value = ''
    inputCardNumber.value = ''
    inputName.style.pointerEvents = 'all'
    inputCardNumber.style.pointerEvents = 'all'
    buttonWrap.insertAdjacentHTML('beforeend', registBtn)
    buttonWrap.insertAdjacentHTML('beforeend', loginBtn)
    libraryCardCheck(checkBtn)
  }
}

function libraryCardCheck(checkBtn) {
  const checkBtnAfterRender = document.querySelector('.check__btn')

  checkBtnAfterRender.addEventListener('click', (e) => {
    e.preventDefault()

    const users = getLocalStorageData('users')
    const userMatch = users?.find(user => (user.firstName + ' ' + user.lastName) === inputName.value
      && user.cardNumber === inputCardNumber.value)

    if (userMatch !== undefined) {
      itemsContainer.innerHTML = ''
      itemsContainer.append(template.content.cloneNode(true))
      const visitsCount = document.getElementById('visitsTemplate')
      const booksCount = document.getElementById('booksTemplate')
      visitsCount.innerHTML = userMatch.visitsCount
      booksCount.innerHTML = Object.keys(userMatch.books).length

      setTimeout(() => {
        itemsContainer.innerHTML = checkBtn
        inputName.value = ''
        inputCardNumber.value = ''
        libraryCardCheck(checkBtn)
      }, 10000)
    }
  })
}