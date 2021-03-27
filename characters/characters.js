import { people } from '../data/people.js'
import { removeChildren, getLastNumber } from '../Utils/index.js'

const mainContent = document.querySelector ('main')

const mainHeader = document.createElement('header')
mainHeader.className = 'buttonRow'

document.body.insertBefore(mainHeader, mainContent)

const maleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'
maleButton.addEventListener('click', () => populatDom (maleCharacters))
mainHeader.appendChild(maleButton)

const femaleButton = document.createElement('button')
femaleButton.textContent = 'Female Characters'
femaleButton.addEventListener('click', () => populatDom (femaleCharacters))
mainHeader.appendChild(femaleButton)

const otherButton = document.createElement('button')
otherButton.textContent = 'Other Characters'
otherButton.addEventListener('click', () => populatDom (otherCharacters))
mainHeader.appendChild(otherButton)

const maleCharacters = people.filter (person => person.gender === 'male')
const femaleCharacters = people.filter (person => person.gender === 'female')
const otherCharacters = people.filter (person => {
    if (person.gender === 'n/a' || person.gender === 'none' || person.gender === 'hermaphrodite') {
        return person
    }
})

function populatDom(characters) {
    removeChildren(mainContent)
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


