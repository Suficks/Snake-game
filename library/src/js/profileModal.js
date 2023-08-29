export const myProfileRender = (userData) => {
  if (!userData) return;

  const cardNumberContainer = document.querySelector('.card__number')
  const modalInitials = document.querySelector('.initials')
  const profileName = document.querySelector('.my__profile__name')
  const copyButton = document.querySelector('.copy')

  const { firstName, lastName, cardNumber } = userData
  const fullName = `${firstName} ${lastName}`
  const initials = (firstName[0] + lastName[0]).toUpperCase()

  cardNumberContainer.innerHTML = cardNumber
  modalInitials.innerHTML = initials
  profileName.innerHTML = fullName

  copyButton.addEventListener('click', () => {
    window.navigator.clipboard.writeText(cardNumber)
    copyButton.setAttribute('src', 'assets/check-icon.svg')
  })
}