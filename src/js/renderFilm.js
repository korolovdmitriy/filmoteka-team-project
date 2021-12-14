// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// import { fetchGenres } from './apiService';

// const filmsList = document.querySelector('.films__list');

// let genresData = {};

// fetchGenres().then(data => {
//   data.genres.map(genre => {
//     genresData[genre.id] = genre.name;
//   });
// });

// function convertGenreIds(ids) {
//   return [...ids]
//     .map(genreID => (genreID = genresData[genreID]))
//     .slice(0, 2)
//     .join(', ');
// }

// function markupFilm(films) {
//   const markupFilm = films
//     .map(({ id, poster_path, title, genre_ids, release_date, vote_average }) => {
//       return `<li class="films__item" data-id="${id}">
//                 <div class="film__link">
//                     <img class="film__img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" />
//                 </div>
//                 <div class="film__box">
//                     <p class="film__name">${title}</p>
//                     <p class="film__info">
//                         <span>${convertGenreIds(genre_ids)}</span>
//                         &nbsp;|&nbsp;
//                         ${new Date(release_date).getFullYear()}
//                     </p>
//                     <p class="rating">${vote_average}</p>
//                 </div>
//             </li>`;
//     })
//     .join('');

//   filmsList.innerHTML = markupFilm;
// }

// export { markupFilm };
