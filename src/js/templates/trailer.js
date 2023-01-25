'use strict';
import axios from 'axios';
import { FilmsApi } from '../api';

import { filmsApi } from './apiMainPage';
const body = document.querySelector('body');
const trailerBackdrop = document.querySelector('.trailer__backdrop');
const trailerContainer = document.querySelector('.trailer__container');
const trailerBtn = document.querySelector('.trailer-btn');
trailerBtn.addEventListener('click', onTrailerBtnClick);

function onTrailerBtnClick(event) {
  trailerBackdrop.classList.remove('visually-hidden');
  console.log('open trailer container');

  body.classList.add('no-scroll');

  window.addEventListener('click', onCloseTrailerbyBackdrop);
  window.addEventListener('keydown', onCloseTrailerbyEsc);
}

function onCloseTrailerbyBackdrop(event) {
  if (event.target === trailerBackdrop) {
    clearTrailer();
  }
}

function onCloseTrailerbyEsc(event) {
  if (event.code !== 'Escape') {
    return;
  }
  clearTrailer();
}

function clearTrailer() {
  trailerBackdrop.classList.add('is-hidden');
  body.classList.remove('no-scroll');
  trailerContainer.innerHTML = '';
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
  const trailerMarkap = `
  <iframe class="trailer__iframe" 
  src="${await getVideoUrl(currentFilmId)}" 
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
