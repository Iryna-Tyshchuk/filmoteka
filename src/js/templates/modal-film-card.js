'use strict';
import { filmsApi } from './apiMainPage';
import { divEl } from './filmCard';


const modalBackdrop = document.querySelector('.backdrop__modal-film');
const buttonCloseModal = document.querySelector('button[data-modal-close]');
const modalFilmInfo = document.querySelector('.modal-film__info');


divEl.addEventListener('click', onOpenModalFilmInfo);
function onOpenModalFilmInfo(event) {
    // console.log(event.target);
    if (!event.target.closest("[data-id]")) {
        return;
    }

    // console.log(event.target.parentNode);
    const currentFilmId = event.target.parentNode.dataset.id;

    addFilmInfo(currentFilmId);

    modalBackdrop.classList.remove('is-hidden');

    window.addEventListener('click', onCloseModalbyBackdrop);
    window.addEventListener('keydown', onKeyClick);
    buttonCloseModal.addEventListener('click', onCloseModalbyCross);

}

function onCloseModalbyCross() {
    modalBackdrop.classList.add('is-hidden');
    clearBackdropListeners();
    // console.log(event.target);
    modalFilmInfo.innerHTML = "";
}

function onKeyClick(event){
    if(event.code !== 'Escape') {
        return;
    }
    modalBackdrop.classList.add('is-hidden');
    clearBackdropListeners();
    modalFilmInfo.innerHTML = "";
}

function onCloseModalbyBackdrop(event) {
    if (event.target === modalBackdrop) {
        modalBackdrop.classList.add('is-hidden');
        clearBackdropListeners();
        modalFilmInfo.innerHTML = "";
    }
}

function clearBackdropListeners() {
    window.removeEventListener('keydown', onKeyClick);
    window.removeEventListener('click', onCloseModalbyBackdrop);
    buttonCloseModal.removeEventListener('click', onCloseModalbyCross);
}


function addFilmInfo(filmId) {
    return filmsApi.getInfoByOneFilm(filmId)
        .then(data => {
            // console.log(data);
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
};