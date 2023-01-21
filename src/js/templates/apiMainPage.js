'use strict';

import { FilmsApi } from '../api';
import { createFilmCards } from './filmCard';

export const filmsApi = new FilmsApi();

const formEl = document.querySelector('.search-form');
const buttonEl = document.querySelector('.search-form__button');
const divEl = document.querySelector('.films__list');
const inputWarning = document.querySelector('.input-warning');
try {
  formEl.addEventListener('submit', onSearchFormSubmit);
  loadPopular();
} catch (error) {
  console.log(error);
}

async function loadPopular() {
  try {
    const popularMovies = await filmsApi
      .fetchTrendingFilms()
      .then(({ data }) => data.results);
    const genres = await filmsApi.fetchGenres().then(({ data }) => data.genres);

    createFilmCards(popularMovies, genres);
  } catch (error) {
    console.log(error);
  }
}

async function loadQuery() {
  try {
    const genres = await filmsApi.fetchGenres().then(({ data }) => data.genres);
    const queryMovies = await filmsApi
      .fetchFilmsByQuery()
      .then(({ data }) => {
        if (!data.results.length) {
          inputWarning.classList.remove('is-none');
          return;
        }
        divEl.innerHTML = '';
        return data.results;
      })
      .finally((buttonEl.disabled = false));

    createFilmCards(queryMovies, genres);
  } catch (error) {
    console.log(error);
  }
}

function onSearchFormSubmit(event) {
  event.preventDefault();

  buttonEl.disabled = true;
  inputWarning.classList.add('is-none');

  filmsApi.query = event.target.elements[0].value.trim();
  filmsApi.page = 1;

  if (!filmsApi.query) {
    return;
  }

  loadQuery();
  event.currentTarget.reset();
}

export function getYear(stringDate) {
  return stringDate.split('-')[0];
}

export function getGenresName(allGenres, genreIds) {
  const genresName = allGenres.reduce((acc, genre) => {
    if (genreIds.includes(genre.id)) {
      return [...acc, genre.name];
    }

    return acc;
  }, []);

  return genresName.length > 2 ? genresName.slice(0, 2) : genresName;
}
