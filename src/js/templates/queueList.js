'use strict';
import Notiflix from 'notiflix';
import localStorageService from '../localstorage';
import { getYear } from './apiMainPage';
import { getGenresName } from './apiMainPage';
import createFilmCards from './filmCard';

const btnWatched = document.querySelector('.js-btn-watched');
const btnQueue = document.querySelector('.js-btn-queue');
const watchedList = document.querySelector('.watched__list');
const queueList = document.querySelector('.queue__list');
const addToWatchedBtn = document.querySelector('button[data-modal-watched]');
const addToQueueBtn = document.querySelector('button[data-modal-queue]');

const STORAGE_WATCHED = 'user-watched-list';
const STORAGE_QUEUE = 'user-queue-list';

const savedWathed = localStorageService.load(STORAGE_WATCHED);
console.log(savedWathed);
const savedQueue = localStorageService.load(STORAGE_QUEUE);
if (savedWathed) {
  btnWatched.classList.add('btn-header-active');
  watchedList.insertAdjacentHTML(
    'beforeend',
    createMarkapFromStoradge(savedWathed)
  );
} else {
  const info = `<span class='vote'>You don't add any film to Wathed</span>`;
  watchedList.innerHTML = info;
}

btnWatched.addEventListener('click', createWatchedList);
btnQueue.addEventListener('click', createQueueList);

function createWatchedList() {
  queueList.innerHTML = '';
  if (savedWathed) {
    btnQueue.classList.remove('btn-header-active');
    btnWatched.classList.add('btn-header-active');

    watchedList.insertAdjacentHTML(
      'beforeend',
      createMarkapFromStoradge(savedWathed)
    );
  } else {
    const info = `<span class='vote'>You don't add any film to Wathed</span>`;
    watchedList.innerHTML = info;
  }
}

function createQueueList() {
  watchedList.innerHTML = '';
  if (savedQueue) {
    btnQueue.classList.add('btn-header-active');
    btnWatched.classList.remove('btn-header-active');
    queueList.insertAdjacentHTML(
      'beforeend',
      createMarkapFromStoradge(savedQueue)
    );
  } else {
    const info = `<span class='vote'>You don't add any film to Queue</span>`;
    queueList.innerHTML = info;
  }
}

function renderGenres(array) {
  const genresNames = array.map(el => el.name);
  return genresNames.length > 2 ? genresNames.slice(0, 2) : genresNames;
}

function createMarkapFromStoradge(array) {
  return array
    .map(
      film =>
        `
			<li class="film__list-element" data-id=${film.id}>
				<img class="film__list-img" src="https://image.tmdb.org/t/p/w500/${
          film.poster_path
        }" alt="${film.title}" width='395'>
   			<div class="film__description">
   				<h2 class='film__title'>${film.title}</h2>
	   			<p class="film__title about">
          ${renderGenres(film.genres).join(', ')}
          | ${getYear(film.release_date)} | <span class='vote'>${Number(
          film.vote_average
        ).toFixed(1)}</span></p>
   			</div>
			</li>
      `
    )
    .join('');
}
