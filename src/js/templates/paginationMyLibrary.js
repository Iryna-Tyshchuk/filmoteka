'use strict';

import Pagination from 'tui-pagination';
import localStorageService from '../localstorage';

const itemListEl = document.querySelectorAll('.film__list-element');
const paginationEl = document.querySelector('#pagination');
const buttonWatchedEl = document.querySelector('.js-btn-watched');
const buttonQueueEl = document.querySelector('.js-btn-queue');

const savedWathed = localStorageService.load('user-watched-list');
const savedQueue = localStorageService.load('user-queue-list'); 

checkActiveButton();

buttonWatchedEl.addEventListener('click', () => {
  checkActiveButton();
});

buttonQueueEl.addEventListener('click', () => {
  checkActiveButton();
});


function paginationLoadWathed() {  
  if ( Number(savedWathed.length) < 20 ) {
    paginationEl.classList.add('is-none');
  } else {
    paginationEl.classList.remove('is-none');
  }
}

function paginationLoadQueue() {  
  if ( Number(savedQueue.length) < 20 ) {
    paginationEl.classList.add('is-none');
  } else {
    paginationEl.classList.remove('is-none');
  }
}


function checkActiveButton() {
  if (buttonWatchedEl.classList.contains('btn-header-active')) {

  const optionsWathed = {
  totalItems: `${Number(savedWathed.length)}`,
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

  const pagination = new Pagination('pagination', optionsWathed);
  paginationLoadWathed();
  } else {
    
  const optionsSavedQueue = {
  totalItems: `${Number(savedQueue.length)}`,
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
    
    const pagination = new Pagination('pagination', optionsSavedQueue);
    paginationLoadQueue();
  }
}