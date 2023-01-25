'use strict';
import { filmsApi } from './apiMainPage';
import localStorageService from '../localstorage.js';
import Notiflix from 'notiflix';
import { onTrailerBtnClick } from './trailer';

const body = document.querySelector('body');
const modalBackdrop = document.querySelector('.backdrop__modal-film');
const modalContainer = document.querySelector('.modal-film__card');
const buttonCloseModal = document.querySelector('button[data-modal-close]');
const modalFilmInfo = document.querySelector('.modal-film__info-card');
const addToWatchedBtn = document.querySelector('button[data-modal-watched]');
const addToQueueBtn = document.querySelector('button[data-modal-queue]');
const filmInfoBlock = document.querySelector('.film-card__film-info-block');
const btnQueue = document.querySelector('.js-btn-queue');
const btnWatched = document.querySelector('.js-btn-watched');
const wathedListInMyLibrary = document.querySelector('.watched__list');
const queueListInMyLibrary = document.querySelector('.queue__list');
const trailerBackdrop = document.querySelector('.trailer__backdrop');
const trailerContainer = document.querySelector('.trailer__container');
const trailerBtn = document.querySelector('.trailer-btn');

const { save, load, remove } = localStorageService;

body.addEventListener('click', onOpenModalFilmInfo);
function onOpenModalFilmInfo(event) {
  // console.log(event.target);
  if (!event.target.closest('[data-id]')) {
    return;
  }
  const getElemFilm = event.target.closest('[data-id]');
  // console.log(getElem);

  const currentFilmId = getElemFilm.dataset.id;
  addFilmInfo(currentFilmId);

  modalBackdrop.classList.remove('is-hidden');
  body.classList.add('no-scroll');

  window.addEventListener('click', onCloseModalbyBackdrop);
  window.addEventListener('keydown', onKeyClick);
  buttonCloseModal.addEventListener('click', onCloseModalbyCross);

  addToWatchedBtn.addEventListener('click', onAddToWatchedToLocalStorage);
  addToQueueBtn.addEventListener('click', onAddToQueueToLocalStorage);
  trailerBtn.addEventListener('click', onTrailerBtnClick);

  checkLocalStorageById(currentFilmId);
}

function onCloseModalbyCross() {
  modalSettings();
  // console.log(event.target);
}

function onKeyClick(event) {
  if (!trailerBackdrop.classList.contains('is-hidden')) {
    return;
  }
  if (event.code !== 'Escape') {
    return;
  }

  modalSettings();
}

function onCloseModalbyBackdrop(event) {
  if (!trailerBackdrop.classList.contains('is-hidden')) {
    return;
  }
  if (event.target === modalBackdrop) {
    modalSettings();
  }
}

function modalSettings() {
  modalBackdrop.classList.add('is-hidden');
  body.classList.remove('no-scroll');
  clearBackdropListeners();
  modalFilmInfo.firstElementChild.remove();
  filmInfoBlock.firstElementChild.remove();
  trailerContainer.innerHTML = '';
}

function clearBackdropListeners() {
  window.removeEventListener('keydown', onKeyClick);
  window.removeEventListener('click', onCloseModalbyBackdrop);
  buttonCloseModal.removeEventListener('click', onCloseModalbyCross);
}

let dataObj = null;

function addFilmInfo(filmId) {
  Notiflix.Loading.circle({ svgColor: '#ff6b01a1' });
  addToWatchedBtn.classList.add('is-hidden');
  addToQueueBtn.classList.add('is-hidden');
  return filmsApi
    .getInfoByOneFilm(filmId)
    .then(({ data }) => {
      dataObj = data;
      const [pictureImgContainer, aboutFilmContainer] = createFilmCard(data);
      modalFilmInfo.insertAdjacentHTML('afterbegin', pictureImgContainer);
      filmInfoBlock.insertAdjacentHTML('afterbegin', aboutFilmContainer);
      Notiflix.Loading.remove();
      addToWatchedBtn.classList.remove('is-hidden');
      addToQueueBtn.classList.remove('is-hidden');
    })
    .catch(error => {
      console.log(error);
    });
}

//create film card
function createFilmCard(obj) {
  const {
    id,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    overview,
    genres,
    poster_path,
  } = obj;
  modalContainer.setAttribute('data-film-id', `${id}`);
  const genresArr = [];
  genres.map(el => genresArr.push(el.name));

  const pictureImgContainer = `
        <div class="film-card__picture-container">
            <img class="film-card__picture" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${title}">
        </div>
    `;
  const aboutFilmContainer = `
        <div class="film-card__about-film-container">
                <div class="film-card__about-film-block">
                    <h2 class="film-card__title">${title}</h2>
                    <ul class="film-card__info-list">
                        <li class="film-card__info-el">
                            <p class="film-card__info-item">Vote / Votes</p>
                            <p class="film-card__info-item--value">
                                    <span class="info-item__highlight-orange">${vote_average.toFixed(
                                      1
                                    )}</span> / 
                                    <span class="info-item__highlight-grey">${vote_count.toFixed()}</span>
                            </p>
                        </li>
                        <li class="film-card__info-el">
                            <p class="film-card__info-item">Popularity</p>
                            <p class="film-card__info-item--value">${popularity.toFixed(
                              1
                            )}</p>
                        </li>
                        <li class="film-card__info-el">
                            <p class="film-card__info-item">Original Title</p>
                            <p class="film-card__info-item--value">${original_title.toUpperCase()}</p>
                        </li>
                        <li class="film-card__info-el">
                        <p class="film-card__info-item">Genre</p>
                        <p class="film-card__info-item--value">${genresArr.join(
                          ', '
                        )}</p>
                        </li>
                    </ul>
                    <p class="film-card__overview-about">About</p>
                    <p class="film-card__overview">${overview}</p>
                </div>
            </div>
    `;
    return [pictureImgContainer, aboutFilmContainer];
};

//add to local storage to watched
let userWatchedList = [];
// if (localStorage.getItem('user-watched-list')) {
if (load('user-watched-list')) {
    try {
        // userWatchedList = JSON.parse(localStorage.getItem('user-watched-list'));
        userWatchedList = load('user-watched-list');
        // console.log(userWatchedList);
    }
    catch (error) {
        console.log(error);
    };
};

function onAddToWatchedToLocalStorage(event) {
    event.preventDefault();
    // const userWatchedList = dataObj;
    if (!event.target.closest("[data-modal-watched]")) {
        return;
    }
    
    let userWatchedFilm = {
        id: dataObj.id,
        title: dataObj.title,
        vote_average: dataObj.vote_average,
        genres: dataObj.genres,
        poster_path: dataObj.poster_path,
        release_date: dataObj.release_date,
    };
    if (event.target.hasAttribute("data-watched-delete")) {
        const idxForDelete = userWatchedList.findIndex(el => el.id === dataObj.id);
        // console.log(idxForDelete);
        const deletedArr = userWatchedList.splice(idxForDelete, 1);
        // console.log(deletedArr);
        // console.log(userWatchedList);
        save("user-watched-list", userWatchedList);
        addToWatchedBtn.textContent = 'Add to watched';
        delete addToWatchedBtn.dataset.watchedDelete;
        if (userWatchedList.length === 0) {
            remove("user-watched-list");
        };

        if (btnWatched?.classList.contains("btn-header-active")) {
            const elForDelete = document.querySelector(`[data-id="${dataObj.id}"]`);
            elForDelete.remove();
        };

        return;
    };

    if (!event.target.hasAttribute("data-watched-delete") && btnWatched?.classList.contains("btn-header-active")) {
        wathedListInMyLibrary.insertAdjacentHTML('beforeend', addFilmCardToList(dataObj));
    };

    if (userWatchedList.every(el => el.id !== dataObj.id)) {
        // console.log(userWatchedList.every(el => el.id === dataObj.id));
        userWatchedList.push(userWatchedFilm);
        addToWatchedBtn.textContent = 'Delete from watched';
        addToWatchedBtn.dataset.watchedDelete = '';
        save("user-watched-list", userWatchedList);
        // localStorage.setItem("user-watched-list", JSON.stringify(userWatchedList));
    };
    // console.log(userWatchedList);
    // console.log(JSON.stringify(userWatchedList));
};

// //add to local storage to queue
let userQueueList = [];
if (load('user-queue-list')) {
    try {
        userQueueList = load('user-queue-list');
        // console.log(userQueueList);
    }
    catch (error) {
        console.log(error);
    }
};

function onAddToQueueToLocalStorage(event) {
    event.preventDefault();
    if (!event.target.closest("[data-modal-queue]")) {
        return;
    };
    
    let userQueueFilm = {
        id: dataObj.id,
        title: dataObj.title,
        vote_average: dataObj.vote_average,
        genres: dataObj.genres,
        poster_path: dataObj.poster_path,
        release_date: dataObj.release_date,
    };

    if (event.target.hasAttribute("data-queue-delete")) {
        const idxForDelete = userQueueList.findIndex(el => el.id === dataObj.id);
        const deletedArr = userQueueList.splice(idxForDelete, 1);
        save("user-queue-list", userQueueList);
        addToQueueBtn.textContent = 'Add to queue';
        delete addToQueueBtn.dataset.queueDelete;
        if (userQueueList.length === 0) {
            remove("user-queue-list");
        };
        
        if (btnQueue?.classList.contains("btn-header-active")) {
            const elForDelete = document.querySelector(`[data-id="${dataObj.id}"]`);
            elForDelete.remove();
        };
        return;
    };

    if (!event.target.hasAttribute("data-queue-delete") && btnQueue?.classList.contains("btn-header-active")) {
        queueListInMyLibrary.insertAdjacentHTML('beforeend', addFilmCardToList(dataObj));
    };

    if (userQueueList.every(el => el.id !== dataObj.id)) {
        // console.log(userQueueList.every(el => el.id === dataObj.id));
        userQueueList.push(userQueueFilm);
        addToQueueBtn.textContent = 'Delete from queue';
        addToQueueBtn.dataset.queueDelete = '';
        save("user-queue-list", userQueueList);
    };
};

function checkLocalStorageById(id) {
    // console.log(userWatchedList.find(el => el.id === Number(id)));
    if (userWatchedList.find(el => el.id === Number(id)) === undefined) {
        addToWatchedBtn.textContent = 'Add to watched';
        delete addToWatchedBtn.dataset.watchedDelete;
    } else {
        addToWatchedBtn.textContent = 'Delete from watched';
        addToWatchedBtn.dataset.watchedDelete = '';
    };
    
    // console.log(userQueueList.find(el => el.id === Number(id)));
    if (userQueueList.find(el => el.id === Number(id)) === undefined) {
        addToQueueBtn.textContent = 'Add to queue';
        delete addToQueueBtn.dataset.queueDelete;
    } else {
        addToQueueBtn.textContent = 'Delete from queue';
        addToQueueBtn.dataset.queueDelete = '';
    };
};

function addFilmCardToList(film) {
    const genresArr = film.genres.map(el => el.name);
  const filmsMarkup = 
        `
			<li class="film__list-element" data-id=${film.id}>
				<img class="film__list-img" src="https://image.tmdb.org/t/p/w500/${film.poster_path}" 
                alt="${film.original_title}" width='395' height='574'>
                <div class="film__description">
                    <h2 class='film__title'>${film.original_title}</h2>
                    <p class="film__title about">${genresArr.length > 2 ? genresArr.slice(0, 2).join(", ") + ', Other' : genresArr.join(", ")}
                    | ${film.release_date.split('-')[0]} | <span class='vote'>${Number(
                    film.vote_average).toFixed(1)}</span></p>
                </div>
			</li>
      `;
    return filmsMarkup;
};
