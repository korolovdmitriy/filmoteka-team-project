import { fetchMovies } from './apiService';

const WATCHED_FILMS = 'watched-films';
const QUEUE_FILMS = 'queue-films';

const watchedBth = document.querySelector('[data-watched]');
const queueBth = document.querySelector('[data-queue]');
const filmsContainer = document.querySelector('.films');

watchedBth.addEventListener('click', e => {
  e.currentTarget.classList.add('active');
  e.currentTarget.nextElementSibling.classList.remove('active');
  getWatchedFilmsFromLS();
});

queueBth.addEventListener('click', e => {
  e.currentTarget.classList.add('active');
  e.currentTarget.previousElementSibling.classList.remove('active');
  getQueueFilmsFromLS();
});

function getWatchedFilmsFromLS() {
  const dataFromLS = JSON.parse(localStorage.getItem(WATCHED_FILMS));

  if (dataFromLS) {
    dataFromLS.forEach(el => fetchMovies(el).then(res => console.log(res)));
  } else {
    filmsContainer.innerHTML = '<div class="empty-list">My watched films library is empty</div>';
  }
}

function getQueueFilmsFromLS() {
  const dataFromLS = JSON.parse(localStorage.getItem(QUEUE_FILMS));

  if (dataFromLS) {
    dataFromLS.forEach(el => fetchMovies(el).then(res => console.log(res)));
  } else {
    filmsContainer.innerHTML = '<div class="empty-list">My queue films library is empty</div>';
  }
}

function setWatchedFilmToLS(data) {
  localStorage.setItem(WATCHED_FILMS, JSON.stringify([...data]));
}

function setQueueFilmToLS(data) {
  localStorage.setItem(QUEUE_FILMS, JSON.stringify([...data]));
}

// setWatchedFilmToLS(['520492', '585220']);
// setQueueFilmToLS(['580492', '570520']);
