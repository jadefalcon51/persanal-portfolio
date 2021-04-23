import { removeChildren } from '../utils/index.js'

const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')
const fetchButton = document.querySelector('.fetchPokemonByID')
const newButton = document.querySelector('.newPokemon')

let offset = 251
let limit = 24

loadButton.addEventListener('click', () => {
  loadPage(offset, limit)
  offset = offset + limit
  loadButton.textContent = `Load ${limit} more Pokemon`
})

fetchButton.addEventListener('click', () => {
  let pokeId = prompt('Pokemon ID or Name:').toLowerCase()
  getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    .then((data) => populatePokeCard(data))
    .catch((error) => console.log(error))
})

class Pokemon {
  constructor(name, height, weight, abilities, moves, types, stats) {
    this.id = 900
    this.name = name
    this.height = height
    this.weight = weight
    this.abilities = abilities
    this.moves = moves
    this.types = types
    this.stats = stats
  }
}

newButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  let pokeName = prompt('What is the name of your new Pokemon?')
  //let pokeHeight = prompt('Pokemon height?')
  //let pokeWeight = prompt('Pokemon weight?')
  let pokeAbilities = prompt(
    'What are your Pokemon abilities? (use a comma separated list',
  )
  let abilitiesArray = getAbilitiesArray(pokeAbilities)
  let newPokemon = new Pokemon(
    pokeName,
    234,
    3000,
    abilitiesArray,
    ['study', 'code', 'silence'],
    [
      {
        type: {
          name: 'normal',
        },
      },
    ],
    [{
      base_stat: 100,
      stat: {
        name: "hp"
      }
    }]
  )
  populatePokeCard(newPokemon)
})

function getAbilitiesArray(commaString) {
  let tempArray = commaString.split(',')
  return tempArray.map((abilityName) => {
    return {
      ability: {
        name: abilityName,
      },
    }
  })
}

async function getAPIData(url) {
  try {
    const response = await fetch(url) 
    const data = await response.json() 
    return data 
  } catch (error) {
    console.log(error)
    alert('Could not find that data')
  }
}

function loadPage(offset, limit) {
  removeChildren(pokeGrid)
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  ).then(async (data) => {
    for (const singlePokemon of data.results) {
      await getAPIData(singlePokemon.url).then((pokeData) =>
        populatePokeCard(pokeData),
      )
    }
  })
}

function populatePokeCard(singlePokemon) {
  let pokeScene = document.createElement('div')
  pokeScene.className = 'scene'
  let pokeCard = document.createElement('div')
  pokeCard.className = 'card'
  pokeCard.addEventListener('click', () => {
    pokeCard.classList.toggle('is-flipped')
  })
  pokeCard.appendChild(populateCardFront(singlePokemon))
  pokeCard.appendChild(populateCardBack(singlePokemon))
  pokeScene.appendChild(pokeCard)
  pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
  let pokeFront = document.createElement('div')
  pokeFront.className = 'card__face card__face--front'
  let frontLabel = document.createElement('p')
  frontLabel.textContent = pokemon.name
  let frontImage = document.createElement('img')
  frontImage.src = getImageFileName(pokemon)
  frontImage.addEventListener(
    'error',
    () => (frontImage.src = 'images/pokeball.png'),
  )
  pokeFront.appendChild(frontImage)
  pokeFront.appendChild(frontLabel)

  let pokeStats = document.createElement('p')
  pokeStats.textContent = `Height: ${pokemon.height / 10} m Weight: ${
    pokemon.weight / 10
  } kg`
  pokeFront.appendChild(pokeStats)

  typesBackground(pokemon, pokeFront)

  return pokeFront
}

function typesBackground(pokemon, card) {
  let pokeType1 = pokemon.types[0].type.name
  if (pokemon.types.length > 1) {
    let pokeType2 = pokemon.types[1].type.name
    card.style.setProperty(
      'background',
      `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(
        pokeType2,
      )})`,
    )
  } else {
    card.style.setProperty('background', getPokeTypeColor(pokeType1))
  }
}

function populateCardBack(pokemon) {
  let pokeBack = document.createElement('div')
  pokeBack.className = 'card__face card__face--back'
  typesBackground(pokemon, pokeBack)
  let backLabel = document.createElement('p')
  backLabel.textContent = `Moves: ${pokemon.moves.length}`
  pokeBack.appendChild(backLabel)

  pokemon.types.forEach((pokeType) => {
    let backType = document.createElement('p')
    backType.textContent = pokeType.type.name
    pokeBack.appendChild(backType)
  })

  let typeLabel = document.createElement('h3')
  typeLabel.textContent = 'Abilities:'
  pokeBack.appendChild(typeLabel)

  pokemon.abilities.forEach((pokeAbility) => {
    let abilityType = document.createElement('p')
    abilityType.textContent = pokeAbility.ability.name
    pokeBack.appendChild(abilityType)
  })

  pokemon.stats.forEach((stat) => {
    let statPara = document.createElement('p')
    statPara.textContent = `${stat.stat.name} : ${stat.base_stat}`
    pokeBack.appendChild(statPara)
  })

  return pokeBack
}

function getImageFileName(pokemon) {
  let pokeId
  if (pokemon.id < 10) pokeId = `00${pokemon.id}`
  if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`
  if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id
  if (pokemon.id === 900) {
    return 'error'
  }
  return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`
}

function getPokeTypeColor(pokeType) {
  let color
  switch (pokeType) {
    case 'grass':
      color = '#00FF00'
      break
    case 'fire':
      color = '#FF0000'
      break
    case 'water':
      color = '#0000FF'
      break
    case 'bug':
      color = '#7fff00'
      break
    case 'normal':
      color = '#f5f5dc'
      break
    case 'flying':
      color = '#00ffff'
      break
    case 'poison':
      color = '#c300ff'
      break
    case 'electric':
      color = '#c8ff00'
      break
    default:
      color = '#555555'
  }
  return color
}
