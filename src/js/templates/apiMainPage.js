'use strict';

import { FilmsApi } from '../api';
import { createFilmCards } from './filmCard';

const filmsApi = new FilmsApi();

const formEl = document.querySelector('.search-form');
const buttonEl = document.querySelector('.search-form__button');

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

    document.body.innerHTML = '';
    buttonEl.disabled = true;

    filmsApi.query = event.target.elements[0].value.trim();
    filmsApi.page = 1;

    if (!filmsApi.query) {
        return
    }
    
    filmsApi
        .fetchFilmsByQuery()
        .then(({ data }) => {

            if (!data.results.length) {
                alert('nothing gets');
                event.target.reset();
                document.body.innerHTML = '';
                return;
            }

            //renderGalleryFilms(data.results);
            createFilmCards(data.results);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(buttonEl.disabled = false);
}


// function renderGalleryFilms(films) {
//     const markup = films.map((film) => {
//         return `
//             <div>
//                 <img src="https://image.tmdb.org/t/p/w500/${film.poster_path}" alt="${film.original_title}" width='395'  />
//                 <div>
//                     <b class='card-title'>${film.original_title}</b>
//                     <div class='card-container'>
//                     <p class='card-genre'>${film.genre_ids}</p><span class='card-year'>${getYear(film.release_date)}</span><span class='card-average'>${film.vote_average}</span>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }).join('');
//     document.body.insertAdjacentHTML("beforeend", markup);
// }

export function getYear(stringDate) {
    return stringDate.split('-')[0];
}


