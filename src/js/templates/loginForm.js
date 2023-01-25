import localstorage from '../localstorage';
import { renderUserData } from '../firebase';
import { clearUserData } from '../firebase';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const loginBtnEl = document.querySelector('#login-btn');
const backdrop = document.querySelector('.backdrop');
const closeBtnEl = document.querySelector('button[data-modal-close]');
const libraryBtnEl = document.querySelector('#library-btn');

loginBtnEl.addEventListener('click', onLoginBtnClick);

if (localstorage.load('user')) {
  loginBtnEl.textContent = 'LOGOUT';
  renderUserData();
}

(function checkAutorization() {
  
    libraryBtnEl.addEventListener('click', event => {
      const savedUser = localstorage.load('user');
      
      if (!savedUser) {
        event.preventDefault();
        Notify.failure('You should login to access the library', {
          timeout: 1000,
        });
        return;
      }
    });
})();

function onLoginBtnClick() {
  if (localstorage.load('user')) {
    localstorage.remove('user');
    //window.location.href = './index.html';
    loginBtnEl.textContent = 'LOGIN';
    clearUserData();
    return;
  }

  toggleModal();

  window.addEventListener('click', onModalClose);
  window.addEventListener('keydown', onEscapeClick);
}

function onModalClose({ target }) {
  if (
    !target.classList.contains('backdrop') &&
    !target.closest('.login-modal__bnt-close')
  ) {
    return;
  }

  toggleModal();
  clearBackdropListeners();
}

function onEscapeClick(event) {
  if (event.code !== 'Escape') {
    return;
  }
  toggleModal();
  clearBackdropListeners();
}

function clearBackdropListeners() {
  window.removeEventListener('click', onModalClose);
  window.removeEventListener('keydown', onEscapeClick);
}

export function toggleModal() {
  document.body.classList.toggle('no-scroll');
  backdrop.classList.toggle('is-hidden');
}
