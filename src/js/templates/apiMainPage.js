'use strict';

import { FilmsApi } from '../api';

const filmsApi = new FilmsApi();

// const inputEl = document.querySelector('')

filmsApi
    .fetchTrendingFilms()
    .then(({ data }) => {
        console.log(data.results);
        renderGalleryFilms(data.results)
    })
    .catch(err => {
    console.log(err);
    });

function onSearchFormSubmit() {
    // event.preventDefault();
    // searchBtnEl.disabled = true;
    filmsApi.query = 'dog';
    // unsplashAPI.page = 1;

    filmsApi
        .fetchFilmsByQuery()
        .then(({ data }) => {
            console.log(data.results)
            renderGalleryFilms(data.results)
        })
        .catch(err => {
            console.log(err);
        });
}


function renderGalleryFilms(films) {
    const markup = films.map((film) => {
        return `
            <div>
                <img src="https://image.tmdb.org/t/p/w500/${film.poster_path}" alt="${film.original_title}" width='395'  />
                <div>
                    <b class='card-title'>${film.original_title}</b>
                    <div class='card-container'>
                    <p class='card-genre'>${film.genre_ids}</p><span class='card-year'>${getYear(film.release_date)}</span><span class='card-average'>${film.vote_average}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    document.body.insertAdjacentHTML("beforeend", markup);
}

function getYear(stringDate) {
    return stringDate.split('-')[0];
}
