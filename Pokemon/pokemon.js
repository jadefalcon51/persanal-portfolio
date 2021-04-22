const pokeGrid = document.querySelector(".pokeGrid");
const loadButton = document.querySelector(".loadPokemon");
const fetchButton = document.querySelector(".fetchPokemonByID");
const newButton = document.querySelector(".newPokemon");

loadButton.addEventListener("click", () => {
  loadPage();
});

fetchButton.addEventListener("click", () => {
  let pokeId = prompt("pokemon ID of Name:").toLowerCase();
  getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    .then((data) => populatePokeCard(data))
    .catch((error) => console.log(error));
});

class pokemon {
  constructor(name, height, weight, abilities, moves, types) {
    this.id = 900;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.abilities = abilities;
    this.moves = moves;
    this.types = types;
  }
}

newButton.addEventListener("click", () => {
  let pokeName = prompt("What is the name of your new Pokemon?");
  let pokeHeight = prompt("Pokemon height?");
  let pokeWeight = prompt("Pokemon Weight?");
  let newPokemon = new pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    ["eat", "sleep"],
    ["study", "code", "silence"],
    [{
      type: {
        name: 'normal'
      }
    }],
  )
  populatePokeCard(newPokemon);
});

async function getAPIData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    alert("could not find that data");
  }
}

function loadPage() {
  getAPIData("https://pokeapi.co/api/v2/pokemon?limit=25").then(
    async (data) => {
      for (const singlePokemon of data.results) {
        await getAPIData(singlePokemon.url).then((pokeData) =>
          populatePokeCard(pokeData)
        );
      }
    }
  );
}

function populatePokeCard(singlePokemon) {
  let pokeSene = document.createElement("div");
  pokeSene.className = "scene";
  let pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () => {
    pokeCard.classList.toggle("is-flipped");
  });

  pokeCard.appendChild(populateCardFront(singlePokemon));

  pokeCard.appendChild(populateCardBack(singlePokemon));

  pokeSene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeSene);
}

function populateCardFront(pokemon) {
  let pokeFront = document.createElement("div");
  pokeFront.className = "card_face card_face--front";
  let frontLabel = document.createElement("p");
  frontLabel.textContent = pokemon.name;
  let frontImage = document.createElement("img");
  frontImage.src = getImageFileName(pokemon);
  pokeFront.appendChild(frontImage);
  pokeFront.appendChild(frontLabel);

  let pokeType1 = pokemon.types[0].type.name;
  pokeFront.style.setProperty("background", getPokeTypeColor(pokeType1));
  if (pokemon.types.length > 1) {
    let pokeType2 = pokemon.types[1].type.name;
    frontImage.style.setProperty(
      "filter",
      `drop-shadow(10px 5px 4px ${getPokeTypeColor(pokeType2)})`
    );
  }

  return pokeFront;
}

function populateCardBack(pokemon) {
  let pokeBack = document.createElement("div");
  pokeBack.className = "card_face card_face--back";
  let backLabel = document.createElement("p");
  backLabel.textContent = `Moves: ${pokemon.moves.length}`;
  pokeBack.appendChild(backLabel);

  pokemon.types.forEach((pokeType) => {
    let backType = document.createElement("p");
    backType.textContent = pokeType.type.name;
    pokeBack.appendChild(backType);
  });

  return pokeBack;
}

function getImageFileName(pokemon) {
  let pokeId;
  if (pokemon.id < 10) pokeId = `00${pokemon.id}`;
  if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`;
  if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id;
  if (pokemon.id === 900) {
    return; //image
  }
  return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`;
}

function getPokeTypeColor(pokeType) {
  let color;
  switch (pokeType) {
    case "grass":
      color = "#0f0";
      break;
    case "fire":
      color = "#f00";
      break;
    case "water":
      color = "#00f";
      break;
    case "bug":
      color = "#7fff00";
      break;
    case "normal":
      color = "#f5f5dc";
      break;
    case "flying":
      color = "#0ff";
      break;
    case "poison":
      color = "#c300ff";
      break;
      case "electric":
        color = "#c8ff00";
        break;
    default:
        color = `#555`
  }
  return color
}
