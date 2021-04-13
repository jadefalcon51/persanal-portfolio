import { senators } from "../data/senators.js"
import { representatives } from "../data/representatives.js"
import { removeChildren } from "../Utils/index.js"

const congressGrid = document.querySelector('.congressGrid')
const seniorityButton = document.querySelector('#seniorityButton')
const birthdayButton = document.querySelector('#birthdayButton')

seniorityButton.addEventListener('click', () => senioritySort())

function populateCongressDiv(simlifiedList) {
    removeChildren(congressGrid)
    simplifiedLis.forEach(person => {
        let personDiv = document.createElement('div')
        personDiv.className = 'figureDiv'
        let perosnFig = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcapton')
        let partyIcon = document.createElement('i')
        if (person.party === 'R') partyIcon.className = 'fas fa-republican'
        if (person.party === 'D') partyIcon.className = 'fas fa-democrat'
        if (person.party === 'ID') partyIcon.className = 'fas fa-mitten'

        figImg.src = person.imgURL
        figCaption.textContent = person.name
        figCaption.appendChild(partyIcon)
        perosnFig.appendChild(figImg)
        perosnFig.appendChild(figCaption)
        personDiv.appendChild(perosnFig)
        congressGrid.appendChild(personDiv)    
    })
}

function getSimplifiedPeople(peopleList) {
    return peopleList.map(person => {
        let middleName = person.middle_name / ` ${person.middle_name}` : `` 
        return {
            id: person.id,
            name: `${person.first_name}${middleName} ${person.last_name}`,

        }
    })
}