import { films } from '../data/films.js'

let titlelist = document.querySelector('.titleList');

for (let i = 0; i < films.length; i++) {
    const foundFilm = films.find(film => getLastNumber(film.url) === (i + 1))
    // let title = foundFilm.title
    let newItem = document.createElement ('li')
    newItem.textContent = foundFilm.title
    titlelist.appendChild(newItem)    
}

function getLastNumber(url) {
    let end = url[url.length -2]
    return parseInt(end, 10)
}