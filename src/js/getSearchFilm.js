import { fetchSearch } from './apiService';
import { markupFilm } from './renderFilm';
import './pagination.js';
const refs = {
  inputHero: document.querySelector('.hero__input'),
  filmsUl: document.querySelector('.films__list'),
  heroButton: document.querySelector('.hero__button'),
  error: document.querySelector('.text-error'),
};

refs.heroButton.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();
  refs.inputHero.placeholder = 'Поиск фильмов';
  const queryValue = refs.inputHero.value;
  if (queryValue === '') {
    refs.inputHero.value = '';
    refs.filmsUl.innerHTML = '';
    return (refs.inputHero.placeholder = 'Введите корректный запрос');
  }

  fetchSearch(1, queryValue).then(data => {
    console.log(data.total_results);
    if (data.total_results < 1) {
      refs.inputHero.value = '';
      refs.filmsUl.innerHTML = '';
      refs.inputHero.placeholder = 'Не найдено подходящих результатов';
    }
    markupFilm(data.results);
  });
  refs.error.classList.add('visually-hidden');
  refs.filmsUl.innerHTML = '';
}
