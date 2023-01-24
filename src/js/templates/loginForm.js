const loginBtnEl = document.querySelector('#login-btn');
const backdrop = document.querySelector('.backdrop');
const closeBtnEl = document.querySelector('button[data-modal-close]');

loginBtnEl.addEventListener('click', onLoginBtnClick);

function onLoginBtnClick() {
  toggleModal();

  window.addEventListener('click', onModalClose);
  window.addEventListener('keydown', onEscapeClick);
}

function onModalClose({ target }) {
  if (!target.classList.contains('backdrop')) {
    return;
  }
  
  toggleModal();
  console.log(target);
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

function toggleModal() {
  document.body.classList.toggle('no-scroll');
  backdrop.classList.toggle('is-hidden');
}
