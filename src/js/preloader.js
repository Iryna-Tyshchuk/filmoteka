document.getElementById('preloader');

window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('disappear');
    setTimeout(() => {
      document.body.classList.add('loaded');
      document.body.classList.remove('disappear');
    }, 500);
  }, 500);
});

let toggler = document.querySelector('.toolbar-container');

toggler.addEventListener('input', () => {
  setTimeout(() => {
    document.body.classList.add('disappear');
    setTimeout(() => {
      document.body.classList.add('loaded');
      document.body.classList.remove('disappear');
    }, 500);
  }, 500);
});

let onClickfilmCard = document.querySelector('.film__list-element');

onClickfilmCard.addEventListener('click', () => {
  setTimeout(() => {
    document.body.classList.add('disappear');
    setTimeout(() => {
      document.body.classList.add('loaded');
      document.body.classList.remove('disappear');
    }, 500);
  }, 500);
});