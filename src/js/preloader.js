window.addEventListener('load', () => {
	let preloader = document.querySelector('.preloader');
	preloader.classList.add('disappear');
});
// let preloaderRef = document.getElementById('preloader');

// window.addEventListener('load', closePreloader);
// function closePreloader() {
//   setTimeout(() => {
//     document.body.classList.add('disappear');
//     setTimeout(() => {
//       document.body.classList.add('preloader');
//       document.body.classList.remove('disappear');
//     }, 1000);
//   }, 1000);
// }