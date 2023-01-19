export const createFilmCards = cardInfo => {
	const filmCardsArr = cardInfo.map(
    el =>
      `
			<li>
				<img src="${el.poster_path}" alt="${el.title}" width='395' height='574'>
   			<div  class="film__description">
   				<h2>${el.title}</h2>
	   			<p class="film__description--more">${el.genres} | ${el.release_date}</p>
   			</div>
			</li>
      `
  );

  	return filmCardsArr.join('');
};
