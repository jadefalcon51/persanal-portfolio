import { films } from '../data/films.js'

let titlelist = document.querySelector('.titleList');

for (var i = 0; i < films.length; i++) {
    let title = films [i].title
    let newItem = document.createElement ('li')
    newItem.textContent = title
    titlelist.appendChild(newItem)
}