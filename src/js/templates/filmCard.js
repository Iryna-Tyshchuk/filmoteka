'use strict';

export default const createFilmCards = films => {
	const filmsMarkup = films.map(
    film =>
      `
			<li>
				<img src="https://image.tmdb.org/t/p/w500/${film.poster_path}" alt="${film.original_title}" width='395'>
   			<div class="film__description">
   				<h2>${film.original_title}</h2>
	   			<p class="film__description--more">${film.genre_ids} | ${getYear(film.release_date)} | ${film.vote_average}</p>
   			</div>
			</li>
      `
  ).join('');

    document.body.insertAdjacentHTML("beforeend", filmsMarkup);
};