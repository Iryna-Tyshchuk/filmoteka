'use strict';
console.log('savedWathed');

import localStorageService from '../localstorage';
import { getYear } from './apiMainPage';
import { getGenresName } from './apiMainPage';
import createFilmCards from './filmCard';

console.log('irasfile');
const btnWatched = document.querySelector('.js-btn-watched');
const btnQueue = document.querySelector('.js-btn-queue');
const watchedList = document.querySelector('.watched__list');
const queueList = document.querySelector('.queue__list');
const addToWatchedBtn = document.querySelector('button[data-modal-watched]');
const addToQueueBtn = document.querySelector('button[data-modal-queue]');

const STORAGE_WATCHED = 'user-watched-list';
const STORAGE_QUEUE = 'user-queue-list';

console.log(STORAGE_WATCHED);
btnWatched.addEventListener('click', createWatchedList);
btnQueue.addEventListener('click', createQueueList);
function createWatchedList() {
  queueList.innerHTML = '';
  const savedWathed = localStorageService.load(STORAGE_WATCHED);
  console.log(savedWathed);
  const filmsMarkup = savedWathed
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
          
          | ${getYear(film.release_date)} | ${Number(film.vote_average).toFixed(
          1
        )}</p>
   			</div>
			</li>
      `
    )
    .join('');
  console.log(filmsMarkup);
  watchedList.insertAdjacentHTML('beforeend', filmsMarkup);
}

function createQueueList() {
  watchedList.innerHTML = '';
  const savedQueue = localStorageService.load(STORAGE_QUEUE);

  const filmsMarkup = savedQueue
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
          
          | ${getYear(film.release_date)} | ${Number(film.vote_average).toFixed(
          1
        )}</p>
   			</div>
			</li>
      `
    )
    .join('');
  console.log(filmsMarkup);
  queueList.insertAdjacentHTML('beforeend', filmsMarkup);
}
