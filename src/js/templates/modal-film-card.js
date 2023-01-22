'use strict';
import { filmsApi } from './apiMainPage';
import { divEl } from './filmCard';


const modalBackdrop = document.querySelector('.backdrop__modal-film');
const buttonCloseModal = document.querySelector('button[data-modal-close]');
const modalFilmInfo = document.querySelector('.modal-film__info');
const addToWatchedBtn = document.querySelector('button[data-modal-watched]');
const addToQueueBtn = document.querySelector('button[data-modal-queue]');


divEl.addEventListener('click', onOpenModalFilmInfo);
function onOpenModalFilmInfo(event) {
    // console.log(event.target);
    if (!event.target.closest("[data-id]")) {
        return;
    }

    // console.log(event.target.parentNode);
    const currentFilmId = event.target.parentNode.dataset.id;
    
    addFilmInfo(currentFilmId);

    modalBackdrop.classList.remove('is-hidden');

    window.addEventListener('click', onCloseModalbyBackdrop);
    window.addEventListener('keydown', onKeyClick);
    buttonCloseModal.addEventListener('click', onCloseModalbyCross);

    addToWatchedBtn.addEventListener('click', onAddToWatchedToLocalStorage);
    addToQueueBtn.addEventListener('click', onAddToQueueToLocalStorage);
}

function onCloseModalbyCross() {
    modalBackdrop.classList.add('is-hidden');
    clearBackdropListeners();
    // console.log(event.target);
    modalFilmInfo.innerHTML = "";
}

function onKeyClick(event){
    if(event.code !== 'Escape') {
        return;
    }
    modalBackdrop.classList.add('is-hidden');
    clearBackdropListeners();
    modalFilmInfo.innerHTML = "";
}

function onCloseModalbyBackdrop(event) {
    if (event.target === modalBackdrop) {
        modalBackdrop.classList.add('is-hidden');
        clearBackdropListeners();
        modalFilmInfo.innerHTML = "";
    }
}

function clearBackdropListeners() {
    window.removeEventListener('keydown', onKeyClick);
    window.removeEventListener('click', onCloseModalbyBackdrop);
    buttonCloseModal.removeEventListener('click', onCloseModalbyCross);
}

let dataObj = null;

function addFilmInfo(filmId) {
    // console.log(filmId);
    return filmsApi.getInfoByOneFilm(filmId)
        .then(data => {
            dataObj = data;
            console.log(dataObj);

            modalFilmInfo.innerHTML = createFilmCard(data);
    })
}

//create film card
function createFilmCard(obj) {
    const { title, vote_average, vote_count, popularity, original_title, overview, genres, poster_path } = obj;
    const genresArr = [];
    genres.map(el => genresArr.push(el.name));
    // console.log(genres);
    // console.log(genresArr.join(", "));
    return `
        <div class="film-card">
            <div class="film-card__picture-container">
                <img class="film-card__picture" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${title}">
            </div>
            <h2 class="film-card__title">${title}</h2>
            <ul class="film-card__info-list">
                <li class="film-card__info-el">
                    <p class="film-card__info-item">Vote / Votes</p>
                    <p class="film-card__info-item--value">
                            <span class="info-item__highlight-orange">${vote_average.toFixed(1)}</span> / 
                            <span class="info-item__highlight-grey">${vote_count.toFixed()}</span>
                    </p>
                </li>
                <li class="film-card__info-el">
                    <p class="film-card__info-item">Popularity</p>
                    <p class="film-card__info-item--value">${popularity.toFixed(1)}</p>
                </li>
                <li class="film-card__info-el">
                    <p class="film-card__info-item">Original Title</p>
                    <p class="film-card__info-item--value">${original_title.toUpperCase()}</p>
                </li>
                <li class="film-card__info-el">
                <p class="film-card__info-item">Genre</p>
                <p class="film-card__info-item--value">${genresArr.join(", ")}</p>
                </li>
            </ul>
            
            <p class="film-card__overview-about">About</p>
            <p class="film-card__overview">${overview}</p>
        </div>
    `
};

//add to local storage to watched
let userWatchedList = [];
if (localStorage.getItem('user-watched-list')) {
    try {
        userWatchedList = JSON.parse(localStorage.getItem('user-watched-list'));
        // console.log(userWatchedList);
    }
    catch (error) {
        console.log(error)
    }
};
function onAddToWatchedToLocalStorage(event) {
    event.preventDefault();
    // const userWatchedList = dataObj;
    
    let userWatchedFilm = {
        id: dataObj.id,
        title: dataObj.title,
        vote_average: dataObj.vote_average,
        genres: dataObj.genres,
        poster_path: dataObj.poster_path,
        release_date: dataObj.release_date,
    };
    
    userWatchedList.forEach(el => {
        if (el.id === dataObj.id) {
            alert('This film have already add to watched list');
            return;
        }
    });
    
    userWatchedList.push(userWatchedFilm);
    localStorage.setItem("user-watched-list", JSON.stringify(userWatchedList));
    
    // console.log(userWatchedList);
    // console.log(JSON.stringify(userWatchedList));
}

// //add to local storage to queue
let userQueueList = [];
if (localStorage.getItem('user-queue-list')) {
    try {
        userQueueList = JSON.parse(localStorage.getItem('user-queue-list'));
        // console.log(userQueueList);
    }
    catch (error) {
        console.log(error)
    }
};

function onAddToQueueToLocalStorage(event) {
    event.preventDefault();
    // const userQueueList = dataObj;
    
    let userQueueFilm = {
        id: dataObj.id,
        title: dataObj.title,
        vote_average: dataObj.vote_average,
        genres: dataObj.genres,
        poster_path: dataObj.poster_path,
        release_date: dataObj.release_date,
    };

    userQueueList.forEach(el => {
        if (el.id === dataObj.id) {
            alert('This film have already add to queue list');
            return;
        }
    });
    
    userQueueList.push(userQueueFilm);
    localStorage.setItem("user-queue-list", JSON.stringify(userQueueList));
    
    // console.log(userQueueList);
    // console.log(JSON.stringify(userQueueList));
}
