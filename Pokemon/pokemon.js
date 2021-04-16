const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')
const fetchButton = document.querySelector('.fetchPokemonByID')
const newButton = document.querySelector('.newPokemon') 

loadButton.addEventListener('click', () => {
    loadPage()
})

fetchButton.addEventListener('click', () => {
    let pokeId = prompt("pokemon ID of Name:").toLowerCase()
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`).then(
        data => populatePokeCard(data)
    ).catch(error => console.log(error))
})

class pokemon {
    constructor(name, height, weight, abilities, moves) {
        this.id = 900
        this.name = name
        this.height = height
        this.weight = weight
        this.abilities = abilities
        this.moves = moves
    }
}

newButton.addEventListener('click', () => {
    let pokeName = prompt("What is the name of your new Pokemon?")
    let pokeHeight = prompt("Pokemon height?")
    let pokeWeight = prompt("Pokemon Weight?")
    let newPokemon = new pokemon(
        pokeName,
        pokeHeight,
        pokeWeight,
        ['eat', 'sleep'],
        ['study', 'code', 'silence']
    )
    populatePokeCard(newPokemon)
})


