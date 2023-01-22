'use strict';

import { FilmsApi } from '../api';
import { createFilmCards } from './filmCard';

const filmsApi = new FilmsApi();
const comingContainer = document.querySelector('.coming-container');

renderSlidesFilms();

function renderSlidesFilms() {
  filmsApi
    .fetchUpcomingFilms()
    .then(({ data }) => {
      return (comingContainer.firstElementChild.innerHTML =
        createUpcomigFilmCard(data.results));
    })
    .catch(error => console.log(error));
}

function createUpcomigFilmCard(filmsArr) {
  return filmsArr
    .map(film => {
      return `<div class="swiper-slide box">
        <div class="box-img">
          <img src="${FilmsApi.IMAGE_PATH + film.poster_path}" alt="" />
        </div>
      </div> `;
    })
    .join('');
}

const comingSwiper = new Swiper('.coming-container', {
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enable: true,
    onlyInViewport: true,
  },
  centeredSlides: true,
  breakpoints: {
    968: {
      slidesPerView: 7,
    },
    768: {
      slidesPerView: 5,
    },
    568: {
      slidesPerView: 3,
    },
    0: {
      slidesPerView: 2,
    },
  },
});
