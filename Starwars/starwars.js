import { films } from '../data/films.js'
import { getLastNumber } from '../Utils/index.js'

let titlelist = document.querySelector('.titleList');

for (let i = 0; i < films.length; i++) {
    const foundFilm = films.find(film => getLastNumber(film.url) === (i + 1))
    let figure = document.createElement('figure')
    let newIimage = document.createElement ('img')
    let figCaption = document.createElement ('figcaption')
    newIimage.src = `https://starwars-visualguide.com/assets/img/films/${i + 1}.jpg`
    figCaption.textContent = foundFilm.title

    titlelist.appendChild(newIimage)   
    figure.appendChild(figCaption)
    titlelist.appendChild(figure) 
}

/* function getLastNumber(url) {
    let end = url[url.length -2]
    return parseInt(end, 10)
}*/