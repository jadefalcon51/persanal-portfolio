import { people } from '../data/people.js'

const mainContent = document.querySelector ('main')

const mainHeader = document.createElement('deader')

const maleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'
mainHeader.appendChild(maleButton)
document.body.insertBefore(mainHeader, mainContent)
maleButton.addEventListener('click', () => {
    populatDom (mailCharacters)
})


const mailCharacters = people.filter (person => person.gender === 'male')
const femailCharacters = people.filter (person => person.gender === 'female')
const otherCharacters = people.filter (person => {
    if (person.gender === 'n/a' || person.gender === 'none') {
        return person
    }
})

function populatDom(characters) {
 characters.forEach (person => {
    const charFigure = document.createElement('figure')
    const charImg = document.createElement('img')
    const charCaption = document.createElement('figcaption')
    let charNum = getLastNumber(person.url)
    charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`

    charCaption.textContent = person.name

    charFigure.appendChild(charImg)
    charFigure.appendChild(charCaption)
    mainContent.appendChild(charFigure)
})
}

function getLastNumber(url) {
    let end = url.lastIndexOf('/')
    let start = end - 2
    if (url.charAt(start) === '/') {
        start ++
    }
    return url.slice(start, end)
}
