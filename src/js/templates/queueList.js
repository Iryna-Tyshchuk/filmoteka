'use strict';
console.log('savedWathed');

import localStorageService from '../localstorage';
console.log('irasfile');
const btnWatched = document.querySelector('.js-btn-watched');
const btnQueue = document.querySelector('.js-btn-queue');
const addToWatchedBtn = document.querySelector('button[data-modal-watched]');
const addToQueueBtn = document.querySelector('button[data-modal-queue]');

const STORAGE_WATCHED = 'user-watched-list';
const STORAGE_QUEUE = 'user-queue-list';

console.log(STORAGE_WATCHED);

function getWatcedWilms() {
  const savedWathed = localStorageService.load(STORAGE_WATCHED);
  console.log(savedWathed);
  //   if (savedWathed) {
  //     let films = JSON.parse(savedWathed);
  //     console.log(films);
  //   }
}

getWatcedWilms();
