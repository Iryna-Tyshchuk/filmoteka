'use strict';
import axios from 'axios';
import { FilmsApi } from '../api';

import { filmsApi } from './apiMainPage';
const body = document.querySelector('body');
const trailerBackdrop = document.querySelector('.trailer__backdrop');
const trailerContainer = document.querySelector('.trailer__container');
const trailerBtn = document.querySelector('.trailer-btn');
const modalBackdrop = document.querySelector('.backdrop__modal-film');

export function onTrailerBtnClick(event) {
  const filmID = event.target.closest('[data-film-id]').dataset.filmId;
  createTrallerMarkap(filmID);

  trailerBackdrop.classList.remove('is-hidden');
  body.classList.add('no-scroll');

  window.addEventListener('click', onCloseTrailerbyBackdrop);
  window.addEventListener('keydown', onCloseTrailerbyEsc);
}

function onCloseTrailerbyBackdrop(event) {
  // trailerBackdrop.classList.add('is-hidden');
  if (event.target === modalBackdrop) {
    clearTrailer();
  }
}

function onCloseTrailerbyEsc(event) {
  // trailerBackdrop.classList.add('is-hidden');
  if (event.code !== 'Escape') {
    return;
  }
  clearTrailer();
}

function clearTrailer() {
  trailerBackdrop.classList.add('is-hidden');
  body.classList.remove('no-scroll');

  window.removeEventListener('click', onCloseTrailerbyBackdrop);
  window.removeEventListener('keydown', onCloseTrailerbyEsc);
}

async function getVideoUrl(id) {
  const data = await filmsApi
    .fetchTrailer(id)
    .then(({ results }) =>
      results.map(item => {
        if (item.site === 'YouTube') {
          return `https://www.youtube.com/embed/${item.key}`;
        }
      })
    )
    .catch(err => console.log(err));
  return data[0];
}

async function createTrallerMarkap(currentFilmId) {
  const trailerUrl = await getVideoUrl(currentFilmId);
  // console.log(trailerUrl);
  const trailerMarkap = `
  <iframe class="trailer__iframe" 
  src="${trailerUrl}" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; 
  encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
  </iframe>
  `;
  trailerContainer.innerHTML = trailerMarkap;
}

export { createTrallerMarkap };
