'use strict';

import { getYear } from './apiMainPage';
import { getGenresName } from './apiMainPage';
export const divEl = document.querySelector('.films__list');
export const createFilmCards = (films, genres) => {
  const filmsMarkup = films
    .map(
      film =>
        `
			<li class="film__list-element" data-id=${film.id}>
				<img class="film__list-img" src="https://image.tmdb.org/t/p/w500/${
          film.poster_path
        }" alt="${film.original_title}" width='395' height='574'>
   			<div class="film__description">
   				<h2 class='film__title'>${film.original_title}</h2>
	   			<p class="film__title about">${getGenresName(genres, film.genre_ids)} | ${getYear(film.release_date)} | <span class='vote'>${Number(
          film.vote_average
        ).toFixed(1)}</span></p>
   			</div>
			</li>
      `
    )
    .join('');

  divEl.insertAdjacentHTML('beforeend', filmsMarkup);
};
