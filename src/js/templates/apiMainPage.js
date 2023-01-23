'use strict';

import Pagination from 'tui-pagination';

import { FilmsApi } from '../api';
import { createFilmCards } from './filmCard';

export const filmsApi = new FilmsApi();

const formEl = document.querySelector('.search-form');
const buttonEl = document.querySelector('.search-form__button');
const divEl = document.querySelector('.films__list');
const inputWarning = document.querySelector('.input-warning');



const options = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}"></span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}"></span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
      '</a>'
    
  }
};

const pagination = new Pagination('pagination', options);

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
      .then(({ data }) => { pagination.setTotalItems(data.total_pages); return data.results });
    const genres = await filmsApi.fetchGenres().then(({ data }) => data.genres);
    filmsApi.page = 1;
    console.log(pagination._getLastPage())
    const buttonFirstEl = document.querySelector('.tui-page-btn.tui-prev');
    const buttonLastEl = document.querySelector('.tui-page-btn.tui-next');
    buttonLastEl.textContent = `${pagination._getLastPage()}`;
    buttonFirstEl.textContent = `1`;    
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
        pagination.setTotalItems(data.total_pages);
        console.log(pagination._getLastPage())
        divEl.innerHTML = '';
        return data.results;
      })
      .finally((buttonEl.disabled = false));
    filmsApi.page = 1;
    if (!queryMovies) { filmsApi.query = ''; return } else {
      createFilmCards(queryMovies, genres);
    }
    const buttonFirstEl = document.querySelector('.tui-page-btn.tui-prev');
    const buttonLastEl = document.querySelector('.tui-page-btn.tui-next');
    buttonLastEl.textContent = `${pagination._getLastPage()}`;
    buttonFirstEl.textContent = `1`;  
  } catch (error) {
    console.log(error);
  }
}

function onSearchFormSubmit(event) {
  event.preventDefault();
  pagination.reset();

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

pagination.on('afterMove', ({ page }) => {
  divEl.innerHTML = '';
  filmsApi.page = page;
  if (!filmsApi.query) {
    loadPopular()
  } else { loadQuery()}
  });


  