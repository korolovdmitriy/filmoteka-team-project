import { fetchMovies } from './apiService';

const WATCHED_FILMS = 'watch';
const QUEUE_FILMS = 'queue';

const watchedBth = document.querySelector('[data-watched]');
const queueBth = document.querySelector('[data-queue]');
const filmsList = document.querySelector('.films__list');
const emptyList = document.querySelector('.empty-list');

window.addEventListener('DOMContentLoaded', () => {
  getFilmsFromLS(WATCHED_FILMS);
});

watchedBth &&
  watchedBth.addEventListener('click', e => {
    e.currentTarget.classList.add('active');
    queueBth.classList.remove('active');
    filmsList.innerHTML = '';
    getFilmsFromLS(WATCHED_FILMS);
  });

queueBth &&
  queueBth.addEventListener('click', e => {
    e.currentTarget.classList.add('active');
    watchedBth.classList.remove('active');
    filmsList.innerHTML = '';
    getFilmsFromLS(QUEUE_FILMS);
  });

function getFilmsFromLS(type) {
  const dataFromLS = JSON.parse(localStorage.getItem(type));

  if (dataFromLS) {
    emptyList.innerHTML = '';
    dataFromLS.forEach(el =>
      fetchMovies(el).then(res => {
        filmsList.insertAdjacentHTML('afterbegin', markupFilm(res));
      }),
    );
  } else {
    filmsList.innerHTML = '';
    emptyList.innerHTML = `My ${type} films library is empty`;
  }
}

function markupFilm({ id, poster_path, title, genres, release_date, vote_average }) {
  return `<li class="films__item" data-id="${id}">
                <div class="film__link">
                    <img class="film__img" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" />
                </div>
                <div class="film__box">
                    <p class="film__name">${title}</p>
                    <p class="film__info">
                        <span>${genres
                          .map(el => el.name)
                          .slice(0, 2)
                          .join(', ')}</span>
                        &nbsp;|&nbsp;
                        ${new Date(release_date).getFullYear()}
                    </p>
                    <p class="rating">${vote_average}</p>
                </div>
            </li>`;
}

// function setWatchedFilmToLS(data) {
//   localStorage.setItem(WATCHED_FILMS, JSON.stringify([...data]));
// }

// function setQueueFilmToLS(data) {
//   localStorage.setItem(QUEUE_FILMS, JSON.stringify([...data]));
// }

// setWatchedFilmToLS(['580489', '770254', '634649']);
// setQueueFilmToLS(['585221', '770254']);
