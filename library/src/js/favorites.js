import {
  isAuth,
  modalOpen,
  modalClose,
  getLocalStorageData,
  setLocalStorageData
} from './main.js'

import {
  winter,
  spring,
  summer,
  autumn
} from './seasonsData.js'

import { visitsAndBooksCountShow } from './login.js'

const seasons = {
  winter,
  spring,
  summer,
  autumn,
}

const seasonRadio = document.querySelectorAll('.radio')

const seasonChange = () => {
  seasonRadio.forEach(item => {
    item.addEventListener('click', () => {
      const season = item.getAttribute('data-season')
      renderSeasonCards(season)
    })
  })
}

seasonChange()

const booksCache = {}

export const renderSeasonCards = (season = 'winter') => {
  const cardContainer = document.querySelector('.season')
  let cards = ''

  cardContainer.classList.remove('season__change')

  seasons[season].forEach(item => {
    const { title, author, description, imgSrc, id } = item;
    const cardTemplate = `
      <div class="card">
        <p class="card__title">Staff Picks</p>
        <p class="book__title">${title}</p>
        <p class="author">${author}</p>
        <p class="description">${description}</p>
        <img class="pic" src=${imgSrc}>
        <button class="button buy__button" data-id="${id}">Buy</button>
      </div>
    `
    const book = {
      title,
      author,
    }
    booksCache[id] = book

    cards += cardTemplate
  })

  setTimeout(() => {
    cardContainer.innerHTML = ''
    cardContainer.insertAdjacentHTML('beforeend', cards)
    openLibraryCardModal()
    cardContainer.classList.add('season__change')
  }, 500)
}

// renderSeasonCards()

const buyLibraryCardModal = document.querySelector('.buy__modal')
const buyCard = document.querySelector('.buy__modal__btn')
const logInModal = document.querySelector('.login__modal')

function openLibraryCardModal() {
  const buttons = document.querySelectorAll('.buy__button')

  buttons.forEach(button => {
    const currentUser = getLocalStorageData('currentUser')
    const id = button.getAttribute('data-id')

    if (currentUser) {
      const booksId = Object.keys(currentUser.books)
      if (booksId.includes(id)) {
        button.innerHTML = 'Own'
        button.classList.add('own__button')
      }
    } else {
      button.innerHTML = 'Buy'
      button.classList.remove('own__button')
    }

    button.addEventListener('click', () => {
      if (isAuth) {
        const { hasLibraryCard } = getLocalStorageData('currentUser')
        if (hasLibraryCard) {
          addBooksToLocalStorage(id)
          visitsAndBooksCountShow()
          button.innerHTML = 'Own'
          button.classList.add('own__button')
        }
        else modalOpen(buyLibraryCardModal)
      } else modalOpen(logInModal)
    })
  })
}

// openLibraryCardModal()

// Функция добавления libraryCard в localStorage

function buyLibraryCard() {
  const currentUser = getLocalStorageData('currentUser')
  const users = getLocalStorageData('users')

  currentUser.hasLibraryCard = true
  setLocalStorageData(currentUser, 'currentUser')

  const userIndex = users.findIndex(item => currentUser.email === item.email)
  users[userIndex].hasLibraryCard = true
  setLocalStorageData(users, 'users')

  modalClose(buyLibraryCardModal)
}

buyCard.addEventListener('click', buyLibraryCard)

// Функция добавления книг в localStorage

function addBooksToLocalStorage(id) {
  const currentUser = getLocalStorageData('currentUser')
  const users = getLocalStorageData('users')

  currentUser.books[id] = booksCache[id]
  setLocalStorageData(currentUser, 'currentUser')

  const userIndex = users.findIndex(item => currentUser.email === item.email)
  users[userIndex].books[id] = booksCache[id]
  setLocalStorageData(users, 'users')
}

// Функция проверки покупки книг и смены кнопки Buy

// export const booksCheck = () => {
//   const buttons = document.querySelectorAll('.buy__button')
//   const currentUser = getLocalStorageData('currentUser')

//   buttons.forEach(button => {
//     const id = button.getAttribute('data-id')
//     if (currentUser) {
//       const booksId = Object.keys(currentUser.books)
//       if (booksId.includes(id)) {
//         button.innerHTML = 'Own'
//         button.classList.add('own__button')
//       } else {
//         button.innerHTML = 'Buy'
//         button.classList.remove('own__button')
//       }
//     }
//   })
// }

// booksCheck()