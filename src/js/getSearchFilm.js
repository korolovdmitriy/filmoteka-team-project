import { fetchSearch } from './apiService';
import { markupFilm } from './renderFilm';

const refs = {
  inputHero: document.querySelector('.hero__input'),
  filmsUl: document.querySelector('.films__list'),
  heroButton: document.querySelector('.hero__button'),
  error: document.querySelector('.text-error'),
};

refs.heroButton.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();
  const queryValue = refs.inputHero.value;

  if (queryValue === '') {
    refs.inputHero.value = '';
    refs.filmsUl.innerHTML = '';
    return (refs.error.textContent =
      'Search result not successful. Enter the correct movie name and ');
  }

  fetchSearch(1, queryValue).then(data => {
    console.log(data.total_results);
    if (data.total_results < 1) {
      refs.inputHero.value = '';
      refs.filmsUl.innerHTML = '';
      return (refs.error.textContent =
        'Search result not successful. Enter the correct movie name and ');
    }

    markupFilm(data.results);
  });

  refs.filmsUl.innerHTML = '';
}
