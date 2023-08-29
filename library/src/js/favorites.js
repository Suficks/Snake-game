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

const renderSeasonCards = (season = 'winter') => {
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
    cards += cardTemplate
  })

  setTimeout(() => {
    cardContainer.innerHTML = ''
    cardContainer.insertAdjacentHTML('beforeend', cards)
    openLibraryCardModal()
    cardContainer.classList.add('season__change')
  }, 500)
}

renderSeasonCards()

const buyLibraryCardModal = document.querySelector('.buy__modal')
const buyCard = document.querySelector('.buy__modal__btn')
const logInModal = document.querySelector('.login__modal')

function openLibraryCardModal(item) {
  const buttons = document.querySelectorAll('.buy__button')

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      console.log(item)
      if (isAuth) {
        const { hasLibraryCard } = getLocalStorageData('currentUser')
        if (hasLibraryCard) {
          button.innerHTML = 'Own'
          button.classList.add('own__button')
        }
        else modalOpen(buyLibraryCardModal)
      } else modalOpen(logInModal)
    })
  })
}

function buyLibraryCard() {
  const currentUser = getLocalStorageData('currentUser')
  currentUser.hasLibraryCard = true
  setLocalStorageData(currentUser, 'currentUser')

  const users = getLocalStorageData('users')
  const userMatch = users.find(item => currentUser.email === item.email)
  userMatch.hasLibraryCard = true
  setLocalStorageData(users, 'users')

  modalClose(buyLibraryCardModal)
}

buyCard.addEventListener('click', buyLibraryCard)
