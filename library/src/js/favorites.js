const winter = [
  {
    title: 'THE BOOK EATERS',
    author: 'By Sunyi Dean',
    description: 'An Unusual Sci-Fi Story About A Book Eater Woman Who Tries Desperately To Save Her Dangerous Mind-Eater Son From Tradition And Certain Death. Complete With Dysfunctional Family Values, Light Sapphic Romance, And A Strong, Complex Protagonist. Not For The Faint Of Heart.',
    imgSrc: 'assets/winter_book_1.jpg',
  },
  {
    title: 'CACKLE',
    author: 'By Rachel Harrison',
    description: 'Are Your Halloween Movies Of Choice The Witches Of Eastwick And Practical Magic? Look No Further Than Here - Where A Woman Recovering From A Breakup Moves To A Quaint Town In Upstate New York And Befriends A Beautiful Witch.',
    imgSrc: 'assets/winter_book_3.jpg',
  },
  {
    title: 'DANTE: POET OF THE SECULAR WORLD',
    author: 'By Erich Auerbach',
    description: "Auerbach's Engaging Book Places The 'Comedy' Within The Tradition Of Epic, Tragedy, And Philosophy In General, Arguing For Dante's Uniqueness As One Who Raised The Individual And His Drama Of Soul Into Something Of Divine Significance—An Inspired Introduction To Dante's Main Themes.",
    imgSrc: 'assets/winter_book_2.jpg',
  },
  {
    title: 'THE LAST QUEEN',
    author: 'By Clive Irving',
    description: 'A Timely And Revelatory New Biography Of Queen Elizabeth (And Her Family) Exploring How The Windsors Have Evolved And Thrived As The Modern World Has Changed Around Them.',
    imgSrc: 'assets/winter_book_4.jpg',
  }
]

const spring = [
  {
    title: 'THE BODY',
    author: 'By Stephen King',
    description: 'Powerful Novel That Takes You Back To A Nostalgic Time, Exploring Both The Beauty And Danger And Loss Of Innocence That Is Youth.',
    imgSrc: 'assets/spring_book_1.jpg',
  },
  {
    title: 'CARRY: A MEMOIR OF SURVIVAL ON STOLEN LAND',
    author: 'By Toni Jenson',
    description: "This Memoir About The Author's Relationship With Gun Violence Feels Both Expansive And Intimate, Resulting In A Lyrical Indictment Of The Way Things Are.",
    imgSrc: 'assets/spring_book_3.jpg',
  },
  {
    title: 'DAYS OF DISTRACTION',
    author: 'By Alexandra Chang',
    description: 'A Sardonic View Of Silicon Valley Culture, A Meditation On Race, And A Journal Of Displacement And Belonging, All In One Form-Defying Package Of Spare Prose.',
    imgSrc: 'assets/spring_book_2.jpg',
  },
  {
    title: 'DOMINICANA',
    author: 'By Angie Cruz',
    description: 'A Timely And Revelatory New Biography Of Queen Elizabeth (And Her Family) Exploring How The Windsors Have Evolved And Thrived As The Modern World Has Changed Around Them.',
    imgSrc: 'assets/spring_book_4.jpg',
  },
]

const summer = [
  {
    title: 'CRUDE: A MEMOIR',
    author: 'By Pablo Fajardo & ​​Sophie Tardy-Joubert',
    description: 'Drawing And Color By Damien Roudeau | This Book Illustrates The Struggles Of A Group Of Indigenous Ecuadoreans As They Try To Sue The ChevronTexaco Company For Damage Their Oil Fields Did To The Amazon And Her People',
    imgSrc: 'assets/summer_book_1.jpg',
  },
  {
    title: 'LET MY PEOPLE GO SURFING',
    author: 'By Yvon Chouinard',
    description: "Chouinard—Climber, Businessman, Environmentalist—Shares Tales Of Courage And Persistence From His Experience Of Founding And Leading Patagonia, Inc. Full Title: Let My People Go Surfing: The Education Of A Reluctant Businessman, Including 10 More Years Of Business Unusual.",
    imgSrc: 'assets/summer_book_3.jpg',
  },
  {
    title: 'THE OCTOPUS MUSEUM: POEMS',
    author: 'By Brenda Shaughnessy',
    description: 'This Collection Of Bold And Scathingly Beautiful Feminist Poems Imagines What Comes After Our Current Age Of Environmental Destruction, Racism, Sexism, And Divisive Politics.',
    imgSrc: 'assets/summer_book_2.jpg',
  },
  {
    title: 'SHARK DIALOGUES: A NOVEL',
    author: 'By Kiana Davenport',
    description: 'An Epic Saga Of Seven Generations Of One Family Encompasses The Tumultuous History Of Hawaii As A Hawaiian Woman Gathers Her Four Granddaughters Together In An Erotic Tale Of Villains And Dreamers, Queens And Revolutionaries, Lepers And Healers.',
    imgSrc: 'assets/summer_book_4.jpg',
  },
]

const autumn = [
  {
    title: 'CASUAL CONVERSATION',
    author: 'By Renia White',
    description: "White's Impressive Debut Collection Takes Readers Through And Beyond The Concepts Of Conversation And The Casual - Both What We Say To Each Other And What We Don't, Examining The Possibilities Around How We Construct And Communicate Identity.",
    imgSrc: 'assets/autumn_book_1.jpg',
  },
  {
    title: 'THE GREAT FIRE',
    author: 'By Lou Ureneck',
    description: "The Harrowing Story Of An Ordinary American And A Principled Naval Officer Who, Horrified By The Burning Of Smyrna, Led An Extraordinary Rescue Effort That Saved A Quarter Of A Million Refugees From The Armenian Genocide.",
    imgSrc: 'assets/autumn_book_3.jpg',
  },
  {
    title: 'RICKEY: THE LIFE AND LEGEND',
    author: 'By Howard Bryant',
    description: "With The Fall Rolling Around, One Can't Help But Think Of Baseball's Postseason Coming Up! And What Better Way To Prepare For It Than Reading The Biography Of One Of The Game's All-Time Greatest Performers, The Man Of Steal, Rickey Henderson?",
    imgSrc: 'assets/autumn_book_2.jpg',
  },
  {
    title: 'SLUG: AND OTHER STORIES',
    author: 'By Megan Milks',
    description: 'Exes Tegan And Sara Find Themselves Chained Together By Hairballs Of Codependency. A Father And Child Experience The Shared Trauma Of Giving Birth To Gods From Their Wounds.',
    imgSrc: 'assets/autumn_book_4.jpg',
  },
]

const seasons = {
  winter,
  spring,
  summer,
  autumn,
}

import { buyLibraryCard } from './main.js'

const seasonRadio = document.querySelectorAll('.radio')

function seasonChange() {
  seasonRadio.forEach(item => {
    item.addEventListener('click', () => {
      const season = item.getAttribute('data-season')
      renderSeasonCards(season)
    })
  })
}

seasonChange()

function renderSeasonCards(season = 'winter') {
  const cardContainer = document.querySelector('.season')
  let cards = ''

  cardContainer.classList.remove('season__change')

  seasons[season].forEach(item => {
    const { title, author, description, imgSrc } = item;
    const cardTemplate = `
      <div class="card">
        <p class="card__title">Staff Picks</p>
        <p class="book__title">${title}</p>
        <p class="author">${author}</p>
        <p class="description">${description}</p>
        <img class="pic" src=${imgSrc}>
        <button class="button buy__button">Buy</button>
      </div>
    `
    cards += cardTemplate
  })

  function getBuyButtons() {
    let buyButtons = document.querySelectorAll('.buy__button')
    return buyButtons
  }

  setTimeout(() => {
    cardContainer.innerHTML = ''
    cardContainer.insertAdjacentHTML('beforeend', cards)
    buyLibraryCard(getBuyButtons())
    cardContainer.classList.add('season__change')
  }, 500)
}

renderSeasonCards()

