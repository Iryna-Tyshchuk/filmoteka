'use strict';

import Pagination from 'tui-pagination';

const itemListEl = document.querySelectorAll('.film__list-element');
const paginationEl = document.querySelector('#pagination');
const buttonWatchedEl = document.querySelector('.js-btn-watched');
const buttonQueueEl = document.querySelector('.js-btn-queue');

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
paginationLoad();

buttonWatchedEl.addEventListener('click', () => {
  paginationLoad();
});

buttonQueueEl.addEventListener('click', () => {
  paginationLoad();
});

function paginationLoad() {  
  if ( !itemListEl.length ) {
    paginationEl.classList.add('is-none');
  } else {
    paginationEl.classList.remove('is-none');
  }

  document.querySelector('.tui-page-btn.tui-next').textContent = `${pagination._getLastPage()}`;
  document.querySelector('.tui-page-btn.tui-prev').textContent = `1`; 
}

