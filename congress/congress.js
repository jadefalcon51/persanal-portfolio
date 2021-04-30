import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../Utils/index.js'

const representativesSelect = document.querySelector('#representatives')
const senatorsSelect = document.querySelector('#senators')
const congressGrid = document.querySelector('.congressGrid')
const seniorityButton = document.querySelector('#seniorityButton')
//const birthdayButton = document.querySelector('#birthdayButton')
const republicansButton = document.querySelector('#republicans')
//const missedVotes = document.querySelector('#missedVotes')
const democratsButton = document.querySelector('#democrats')
const independentsButton = document.querySelector('#independents')

let state = 'representatives'

function houseChooser (house) {
    if (house === 'representatives')
        return representatives
    return senators
}

representativesSelect.addEventListener('click', () => {
    state = 'representatives'
    populateCongressDiv(getSimplifiedPeople(houseChooser(state)))
})

senatorsSelect.addEventListener('click', () => {
    state = 'senators'
    populateCongressDiv(getSimplifiedPeople(houseChooser(state)))
})

republicansButton.addEventListener('click', () => {
    populateCongressDiv(filterCongressPeople(houseChooser(state), 'R'))
})

democratsButton.addEventListener('click', () => {
    populateCongressDiv(filterCongressPeople(houseChooser(state), 'D'))
})

independentsButton.addEventListener('click', () => {
    populateCongressDiv(filterCongressPeople(houseChooser(state), 'ID'))
})

//  missedVotes.addEventListener('click', () => {
//     populateCongressDiv(missedVotesMember(houseChooser(state)))
//     console.log(missedVotesMember(houseChooser(state)))
//  })

seniorityButton.addEventListener('click', () => senioritySort())

function populateCongressDiv(simplifiedList) {
    removeChildren(congressGrid)
    simplifiedList.forEach(person => {
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
        let middleName = person.middle_name ? ` ${person.middle_name}` : `` 
        return {
            id: person.id,
            name: `${person.first_name}${middleName} ${person.last_name}`,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${person.govtrack_id}-200px.jpeg`,
            seniority: parseInt(person.seniority, 10),
            party: person.party,
            missed_votes_pct: person.missed_votes_pct
        }
    })
}

function senioritySort() {
    populateCongressDiv(getSimplifiedPeople(houseChooser(state)).sort((a, b) => a.seniority - b.seniority).reverse())
}

const filterCongressPeople = (chamber, politicalParty) => {
    console.log(getSimplifiedPeople(chamber))
   return getSimplifiedPeople(chamber).filter(member => member.party === politicalParty)
}

// const missedVotesMember = (chamber) => {
//     const highestMissedVotesPerson = getSimplifiedPeople(chamber).reduce((acc, member) => acc.missed_votes_pct > member.missedVotesMember ? acc : member)
//     return getSimplifiedPeople(chamber).filter((person) => person.missed_votes_pct === highestMissedVotesPerson.missed_votes_pct)
// }

populateCongressDiv(getSimplifiedPeople(houseChooser(state)))