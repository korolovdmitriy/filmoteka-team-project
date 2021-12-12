import { fetchSearch, fetchResults } from './apiService';

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
    return refs.error.classList.remove('.visually-hidden');
  }
  refs.error.classList.add('.visually-hidden');
  console.log(query);
  refs.filmsUl.innerHTML = '';
  fetchSearch(1, query).then(data => {
    renderMarkup(data.results);
    console.log(data.results);
  });
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
          <span>${genre_ids}</span>
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
