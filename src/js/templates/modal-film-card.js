'use strict';

const buttomOpenModal = document.querySelector('button[data-modal-open]');
const modalBackdrop = document.querySelector('.backdrop__modal-film');
const buttonCloseModal = document.querySelector('button[data-modal-close]');
// console.log(modalBackdrop);
console.log(buttomOpenModal);
console.log(buttonCloseModal);
console.log(modalBackdrop);


buttomOpenModal.addEventListener('click', onOpenModalFilmInfo);
function onOpenModalFilmInfo() {
    modalBackdrop.classList.remove('is-hidden');

    window.addEventListener('click', onCloseModalbyBackdrop);
    window.addEventListener('keydown', onKeyClick);
    buttonCloseModal.addEventListener('click', onCloseModalbyCross);
}

function onCloseModalbyCross(event) {
    modalBackdrop.classList.add('is-hidden');
    clearBackdropListeners();
    console.log(event.target);

}

function onKeyClick(event){
    if(event.code !== 'Escape') {
        return;
    }
    modalBackdrop.classList.add('is-hidden');
    clearBackdropListeners();
    console.log(event.target);
}

function onCloseModalbyBackdrop(event) {
    if (event.target === modalBackdrop) {
        modalBackdrop.classList.add('is-hidden');
        clearBackdropListeners();
    }
    
    console.log(event.target);

}

function clearBackdropListeners() {
    window.removeEventListener('keydown', onKeyClick);
    window.removeEventListener('click', onCloseModalbyBackdrop);
    buttonCloseModal.removeEventListener('click', onCloseModalbyCross);
}