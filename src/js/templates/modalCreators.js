'use strict';
const btnOpenAboutModal = document.querySelector('.js-open-modal');
const btnCloseAboutModal = document.querySelector('.js-close-about-modal');
const aboutModal = document.querySelector('.js-about-modal');
const body = document.querySelector('body');

btnOpenAboutModal.addEventListener('click', openAboutModal);
btnCloseAboutModal.addEventListener('click', closeAboutModal);

function openAboutModal() {
  aboutModal.classList.add('team-modal-link');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onCloseEsc);
  document.addEventListener('click', function onCloseClick(e) {
    if (e.target === aboutModal) {
      closeAboutModal();
    }
  });
}

function onCloseEsc(e) {
  if (e.code === 'Escape') {
    closeAboutModal();
  }
}

function closeAboutModal() {
  aboutModal.classList.remove('team-modal-link');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseEsc);
}
