'use strict';

import { FilmsApi } from '../api';
import { createFilmCards } from './filmCard';

export const filmsApi = new FilmsApi();

const formEl = document.querySelector('.search-form');
const buttonEl = document.querySelector('.search-form__button');
const divEl = document.querySelector('.films__list');

formEl.addEventListener('submit', onSearchFormSubmit);

filmsApi
  .fetchTrendingFilms()
  .then(({ data }) => {
    createFilmCards(data.results);
  })
  .catch(err => {
    console.log(err);
  });

function onSearchFormSubmit(event) {
  event.preventDefault();

  divEl.innerHTML = '';
  buttonEl.disabled = true;

  filmsApi.query = event.target.elements[0].value.trim();
  filmsApi.page = 1;

  if (!filmsApi.query) {
    return;
  }

  filmsApi
    .fetchFilmsByQuery()
    .then(({ data }) => {
      if (!data.results.length) {
        alert('nothing gets');
        event.target.reset();
        divEl.innerHTML = '';
        return;
      }

      createFilmCards(data.results);
    })
    .catch(err => {
      console.log(err);
    })
    .finally((buttonEl.disabled = false));
}

export function getYear(stringDate) {
  return stringDate.split('-')[0];
}
