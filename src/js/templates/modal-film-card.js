'use strict';
import { filmsApi } from './apiMainPage';
// import { divEl } from './filmCard';
import localStorageService from '../localstorage.js';
import Notiflix from 'notiflix';
import { createTrallerMarkap } from './trailer';

const body = document.querySelector('body');
const modalBackdrop = document.querySelector('.backdrop__modal-film');
const buttonCloseModal = document.querySelector('button[data-modal-close]');
const modalFilmInfo = document.querySelector('.modal-film__info-card');
const addToWatchedBtn = document.querySelector('button[data-modal-watched]');
const addToQueueBtn = document.querySelector('button[data-modal-queue]');
const filmInfoBlock = document.querySelector('.film-card__film-info-block');
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
  createTrallerMarkap(currentFilmId);
  modalBackdrop.classList.remove('is-hidden');
  body.classList.add('no-scroll');

  window.addEventListener('click', onCloseModalbyBackdrop);
  window.addEventListener('keydown', onKeyClick);
  buttonCloseModal.addEventListener('click', onCloseModalbyCross);

  addToWatchedBtn.addEventListener('click', onAddToWatchedToLocalStorage);
  addToQueueBtn.addEventListener('click', onAddToQueueToLocalStorage);

  checkLocalStorageById(currentFilmId);
}

function onCloseModalbyCross() {
  modalSettings();
  // console.log(event.target);
}

function onKeyClick(event) {
  if (event.code !== 'Escape') {
    return;
  }
  modalSettings();
}

function onCloseModalbyBackdrop(event) {
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
}

function clearBackdropListeners() {
  window.removeEventListener('keydown', onKeyClick);
  window.removeEventListener('click', onCloseModalbyBackdrop);
  buttonCloseModal.removeEventListener('click', onCloseModalbyCross);
}

let dataObj = null;

function addFilmInfo(filmId) {
  // console.log(filmId);
  Notiflix.Loading.circle({ svgColor: '#ff6b01a1' });
  addToWatchedBtn.classList.add('is-hidden');
  addToQueueBtn.classList.add('is-hidden');
  return filmsApi
    .getInfoByOneFilm(filmId)
    .then(({ data }) => {
      dataObj = data;
      // console.log(dataObj);
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
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    overview,
    genres,
    poster_path,
  } = obj;
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
  // console.log(aboutFilmContainer);
  return [pictureImgContainer, aboutFilmContainer];
}

//add to local storage to watched
let userWatchedList = [];
// if (localStorage.getItem('user-watched-list')) {
if (load('user-watched-list')) {
  try {
    // userWatchedList = JSON.parse(localStorage.getItem('user-watched-list'));
    userWatchedList = load('user-watched-list');
    // console.log(userWatchedList);
  } catch (error) {
    console.log(error);
  }
}

function onAddToWatchedToLocalStorage(event) {
  event.preventDefault();
  // const userWatchedList = dataObj;
  if (!event.target.closest('[data-modal-watched]')) {
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
  if (event.target.hasAttribute('data-watched-delete')) {
    const idxForDelete = userWatchedList.findIndex(el => el.id === dataObj.id);
    // console.log(idxForDelete);
    const deletedArr = userWatchedList.splice(idxForDelete, 1);
    // console.log(deletedArr);
    // console.log(userWatchedList);
    save('user-watched-list', userWatchedList);
    addToWatchedBtn.textContent = 'Add to watched';
    delete addToWatchedBtn.dataset.watchedDelete;
    if (userWatchedList.length === 0) {
      remove('user-watched-list');
    }
    return;
  }

  if (userWatchedList.every(el => el.id !== dataObj.id)) {
    // console.log(userWatchedList.every(el => el.id === dataObj.id));
    userWatchedList.push(userWatchedFilm);
    addToWatchedBtn.textContent = 'Delete from watched';
    addToWatchedBtn.dataset.watchedDelete = '';
    save('user-watched-list', userWatchedList);
    // localStorage.setItem("user-watched-list", JSON.stringify(userWatchedList));
  }
  // console.log(userWatchedList);
  // console.log(JSON.stringify(userWatchedList));
}

// //add to local storage to queue
let userQueueList = [];
if (load('user-queue-list')) {
  try {
    userQueueList = load('user-queue-list');
    // console.log(userQueueList);
  } catch (error) {
    console.log(error);
  }
}

function onAddToQueueToLocalStorage(event) {
  event.preventDefault();
  // const userQueueList = dataObj;
  if (!event.target.closest('[data-modal-queue]')) {
    return;
  }

  let userQueueFilm = {
    id: dataObj.id,
    title: dataObj.title,
    vote_average: dataObj.vote_average,
    genres: dataObj.genres,
    poster_path: dataObj.poster_path,
    release_date: dataObj.release_date,
  };

  if (event.target.hasAttribute('data-queue-delete')) {
    const idxForDelete = userQueueList.findIndex(el => el.id === dataObj.id);
    // console.log(idxForDelete);
    const deletedArr = userQueueList.splice(idxForDelete, 1);
    // console.log(deletedArr);
    // console.log(userQueueList);
    save('user-queue-list', userQueueList);
    addToQueueBtn.textContent = 'Add to queue';
    delete addToQueueBtn.dataset.queueDelete;
    if (userQueueList.length === 0) {
      remove('user-queue-list');
    }
    return;
  }

  if (userQueueList.every(el => el.id !== dataObj.id)) {
    // console.log(userQueueList.every(el => el.id === dataObj.id));
    userQueueList.push(userQueueFilm);
    addToQueueBtn.textContent = 'Delete from queue';
    addToQueueBtn.dataset.queueDelete = '';
    save('user-queue-list', userQueueList);
    // localStorage.setItem("user-queue-list", JSON.stringify(userQueueList));
  }

  // console.log(userQueueList);
  // console.log(JSON.stringify(userQueueList));
}

function checkLocalStorageById(id) {
  // console.log(userWatchedList.find(el => el.id === Number(id)));
  if (userWatchedList.find(el => el.id === Number(id)) === undefined) {
    addToWatchedBtn.textContent = 'Add to watched';
    delete addToWatchedBtn.dataset.watchedDelete;
  } else {
    addToWatchedBtn.textContent = 'Delete from watched';
    addToWatchedBtn.dataset.watchedDelete = '';
  }

  // console.log(userQueueList.find(el => el.id === Number(id)));
  if (userQueueList.find(el => el.id === Number(id)) === undefined) {
    addToQueueBtn.textContent = 'Add to queue';
    delete addToQueueBtn.dataset.queueDelete;
  } else {
    addToQueueBtn.textContent = 'Delete from queue';
    addToQueueBtn.dataset.queueDelete = '';
  }
}
