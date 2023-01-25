import localstorage from '../localstorage';
const loginBtnEl = document.querySelector('#login-btn');
const backdrop = document.querySelector('.backdrop');
const closeBtnEl = document.querySelector('button[data-modal-close]');

loginBtnEl.addEventListener('click', onLoginBtnClick);

if (localstorage.load('user')) {
  //window.location.href = './index.html';
  loginBtnEl.textContent = 'LOGOUT';
}

function onLoginBtnClick() {
  if (localstorage.load('user')) {
    localstorage.remove('user');
    //window.location.href = './index.html';
    loginBtnEl.textContent = 'LOGIN';
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
