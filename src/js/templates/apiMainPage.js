'use strict';

import { FilmsApi } from '../api';
import { createFilmCards } from './filmCard';

const filmsApi = new FilmsApi();

const formEl = document.querySelector('.search-form');
const buttonEl = document.querySelector('.search-form__button');
const divEl = document.querySelector('.films__list');

formEl.addEventListener('submit', onSearchFormSubmit);

loadPopular();

async function loadPopular() {

  try {

    const popularMovies = await filmsApi.fetchTrendingFilms().then(({ data }) => data.results);
    const genres = await filmsApi.fetchGenres().then(({ data }) => data.genres);

    createFilmCards(popularMovies, genres);

  } catch (error) {
    console.log(error);
  }
}

async function loadQuery() {

  try {
    const genres = await filmsApi.fetchGenres().then(({ data }) => data.genres);
    const queryMovies = await filmsApi.fetchFilmsByQuery().then(({ data }) => {

      if (!data.results.length) {
        alert('nothing gets');
        return;
      }
      return data.results})
      .finally((buttonEl.disabled = false));
    
    createFilmCards(queryMovies, genres);
  } catch (error) {
    console.log(error);
  }
}


function onSearchFormSubmit(event) {
  event.preventDefault();
  
  buttonEl.disabled = true;

  filmsApi.query = event.target.elements[0].value.trim();
  filmsApi.page = 1;

  if (!filmsApi.query) {
    return;
  }
  divEl.innerHTML = '';
  loadQuery();
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