'use strict';
import axios from 'axios';
import { FilmsApi } from '../api';

import { filmsApi } from './apiMainPage';
const trailerBackdrop = document.querySelector('.trailer__backdrop');
const trailerBtn = document.querySelector('.trailer-btn');
trailerBtn.addEventListener('click', onTtailerBtnClick);

function onTtailerBtnClick(event) {
  // console.log('trailer');
  const filmID = event.target.closest('[data-id]');
  // console.log(filmID);
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

// console.log(getVideoUrl(536554));
export { getVideoUrl };
