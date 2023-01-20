'use strict';
import { FilmsApi } from './class.js'

const buttonOpenModal = document.querySelector('button[data-modal-open]');
const modalBackdrop = document.querySelector('.backdrop__modal-film');
const buttonCloseModal = document.querySelector('button[data-modal-close]');
// console.log(modalBackdrop);
const modalFilmInfo = document.querySelector('.modal-film__info');

buttonOpenModal.addEventListener('click', onOpenModalFilmInfo);
function onOpenModalFilmInfo() {
    modalBackdrop.classList.remove('is-hidden');

    window.addEventListener('click', onCloseModalbyBackdrop);
    window.addEventListener('keydown', onKeyClick);
    buttonCloseModal.addEventListener('click', onCloseModalbyCross);

    aboutFiltInfo();
}

function onCloseModalbyCross(event) {
    modalBackdrop.classList.add('is-hidden');
    clearBackdropListeners();
    // console.log(event.target);
}

function onKeyClick(event){
    if(event.code !== 'Escape') {
        return;
    }
    modalBackdrop.classList.add('is-hidden');
    clearBackdropListeners();
}

function onCloseModalbyBackdrop(event) {
    if (event.target === modalBackdrop) {
        modalBackdrop.classList.add('is-hidden');
        clearBackdropListeners();
    }
}

function clearBackdropListeners() {
    window.removeEventListener('keydown', onKeyClick);
    window.removeEventListener('click', onCloseModalbyBackdrop);
    buttonCloseModal.removeEventListener('click', onCloseModalbyCross);
}


function aboutFiltInfo() {
    const filmsApi = new FilmsApi;
    // console.log(filmsApi);

    const film = filmsApi.getInfoByOneFilm()
        .then(data => {
            console.log(data);
            modalFilmInfo.innerHTML = createFilmCard(data);
    })
    // console.log(film);
}


function createFilmCard(obj) {
    const { title, vote_average, vote_count, popularity, original_title, overview, genres, poster_path } = obj;
    const genresArr = [];
    genres.map(el => genresArr.push(el.name));
    // console.log(genres);
    // console.log(genresArr);
    return `
        <div class="film-card">
            <img class="film-card__picture" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${title}">
            <h2 class="film-card__title">${title}</h2>
            <div class="film-card__general-info">
                <p class="info-item">Vote/Votes<span>${vote_average}/${vote_count}</span></p>
                <p class="info-item">Popularity<span>${popularity}</span></p>
                <p class="info-item">Original Title<span>${original_title}</span></p>
                <p class="info-item">Genre<span>${[...genresArr]}</span></p>
            </div>
            <p class="film-card__overview-title">About</p>
            <p class="film-card__overview">${overview}</p>
        </div>
    `
    // console.log(cardsFilmsArr);
};