'use strict';

import Pagination from 'tui-pagination';
import Notiflix from 'notiflix';

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
    Notiflix.Loading.circle({svgColor: '#ff6b01a1'});
    const popularMovies = await filmsApi
      .fetchTrendingFilms()
      .then(({ data }) => { pagination.setTotalItems(data.total_pages); return data.results });
    const genres = await filmsApi.fetchGenres().then(({ data }) => data.genres);
    filmsApi.page = 1;

    document.querySelector('.tui-page-btn.tui-next').textContent = `${pagination._getLastPage()}`;
    document.querySelector('.tui-page-btn.tui-prev').textContent = `1`; 
    
    createFilmCards(popularMovies, genres);
    Notiflix.Loading.remove();
  } catch (error) {
    console.log(error);
  }
}

async function loadQuery() {
  try {
    Notiflix.Loading.circle({svgColor: '#ff6b01a1'});
    const genres = await filmsApi.fetchGenres().then(({ data }) => data.genres);
    const queryMovies = await filmsApi
      .fetchFilmsByQuery()
      .then(({ data }) => {
        if (!data.results.length) {
          inputWarning.classList.remove('is-none');
          return;
        }
        pagination.setTotalItems(data.total_pages);
        
        divEl.innerHTML = '';
        return data.results;
      })
      .finally((buttonEl.disabled = false));
    
    filmsApi.page = 1;
    if (!queryMovies) { filmsApi.query = ''; return } else {
      createFilmCards(queryMovies, genres);
    }
    

    document.querySelector('.tui-page-btn.tui-next').textContent = `${pagination._getLastPage()}`;
    document.querySelector('.tui-page-btn.tui-prev').textContent = `1`;  
    
    if (Number(pagination._getLastPage()) === 1) {
      pagination._options.visiblePages = 1;
      pagination._paginate();
      return;

    } else { pagination._options.visiblePages = 5 };
    Notiflix.Loading.remove();
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
  
  const prevButtonEl = document.querySelector('.tui-page-btn.tui-prev');
  const nextButtonEl = document.querySelector('.tui-page-btn.tui-next');
    
  if (page === 2 || page === 3) {
    prevButtonEl.classList.add('is-none');
  } else { prevButtonEl.classList.remove('is-none') };

  if (page === Number(pagination._getLastPage()) - 1 || page === Number(pagination._getLastPage()) - 2) {
    nextButtonEl.classList.add('is-none')
  } else {nextButtonEl.classList.remove('is-none') };

  if (!filmsApi.query) {
    loadPopular()
  } else { loadQuery()}
  });

