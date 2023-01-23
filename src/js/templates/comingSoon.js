'use strict';

import { FilmsApi } from '../api';
import { createFilmCards } from './filmCard';

const filmsApi = new FilmsApi();
//const comingContainer = document.querySelector('.coming-container');

renderSlidesFilms();

function renderSlidesFilms() {
  filmsApi
    .fetchUpcomingFilms()
    .then(({ data }) => {
      return (comingContainer.firstElementChild.innerHTML =
        createUpcomigFilmCard(data.results));
    })
    .catch(error => console.log(error));
}

function createUpcomigFilmCard(filmsArr) {
  return filmsArr
    .map(film => {
      return `
        <li data-id=${film.id}>
          <img class="box-img" src="${FilmsApi.IMAGE_PATH + film.poster_path}" alt="" />
        </li> `;
    })
    .join('');
}

