import { isAuth } from './main.js'

const profileLogo = document.querySelector('.profile__logo')

export const changeLogo = (userData) => {
  if (isAuth) {
    const { firstName, lastName } = userData
    const fullName = `${firstName} ${lastName}`
    const initials = (firstName[0] + lastName[0]).toUpperCase()
    profileLogo.classList.add('profile__logo__name')
    profileLogo.innerHTML = initials
    profileLogo.setAttribute('title', fullName)
  } else {
    profileLogo.classList.remove('profile__logo__name')
    profileLogo.innerHTML = ''
    profileLogo.removeAttribute('title')
  }
}