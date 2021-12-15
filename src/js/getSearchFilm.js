import { fetchSearch } from './apiService';
// import { markupFilm } from './renderFilm';
import { renderFilms } from './pagination';

const refs = {
  inputHero: document.querySelector('.hero__input'),
  filmsUl: document.querySelector('.films__list'),
  heroButton: document.querySelector('.hero__button'),
  error: document.querySelector('.text-error'),
  pagination: document.querySelector('#pagination'),
};

refs.heroButton.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();
  refs.pagination.classList.add('visually-hidden');
  const queryValue = refs.inputHero.value;

  if (queryValue === '') {
    refs.inputHero.value = '';
    refs.filmsUl.innerHTML = '';
    return (refs.error.textContent = 'Enter text in the text field');
  }

  fetchSearch(1, queryValue).then(data => {
    // data.results.map(item => console.log(item.genre_ids));
    if (data.total_results < 1) {
      refs.inputHero.value = '';
      refs.filmsUl.innerHTML = '';
      return (refs.error.textContent =
        'Search result not successful. Enter the correct movie name and ');
    }
    refs.error.innerHTML = '';
    renderFilms(data.results);
  });

  refs.filmsUl.innerHTML = '';
}
