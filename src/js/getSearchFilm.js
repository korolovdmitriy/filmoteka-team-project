import { fetchSearch } from './apiService';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'cfdb2a8aab50d545dc8a1d0938de62d8';

async function fetchGenres() {
  const urlSearch = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const response = await fetch(urlSearch);
  return await response.json();
}

const refs = {
  inputHero: document.querySelector('.hero__input'),
  filmsUl: document.querySelector('.films__list'),
  heroButton: document.querySelector('.hero__button'),
  error: document.querySelector('.text-error'),
};

refs.heroButton.addEventListener('click', onClick);

function onClick(e) {
  const queryValue = refs.inputHero.value;
  if (queryValue === '') {
    refs.filmsUl.innerHTML = '';
    return refs.error.classList.remove('visually-hidden');
  }

  fetchSearch(1, queryValue).then(data => {
    console.log(data.total_results);
    if (data.total_results < 1) {
      refs.inputHero.value = '';
      refs.inputHero.placeholder = 'Не найдено подходящих результатов';
    }
    renderMarkup(data.results);
  });
  refs.error.classList.add('visually-hidden');
  refs.filmsUl.innerHTML = '';
}

function renderMarkup(film) {
  const markup = film
    .map(
      ({ release_date, original_title, genre_ids, poster_path, vote_average, overview }) =>
        `<li class="films__item" >
      <div class="film__link">
        <img class="film__img" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="" />
        <p class="film__name">${original_title}</p>
      </div>
      <div class="film__box">
        <p class="film__info">
          <span>${fetchGenres(genre_ids)}</span>
          &nbsp;|&nbsp;
        </p>
        <p class="film__info">${new Date(release_date).getFullYear()}</p>
        <p class="rating">${vote_average}</p>
      </div>
      </li>
      `,
    )
    .join('');
  refs.filmsUl.insertAdjacentHTML('beforeend', markup);
}
