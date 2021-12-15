import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { fetchResults, fetchGenres } from './apiService';

const unknownGenreName = 'Common';
const paginationContainer = document.getElementById('pagination');

const params = new URLSearchParams(document.location.search);
const page = parseInt(params.get('page')) || 1;

const paginationOptions = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  currentPage: page,
  page: page,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination(paginationContainer, paginationOptions);

let genres = [];

pagination.on('afterMove', async event => {
  const currentPage = event.page;
  const params = new URLSearchParams(window.location.search);
  params.set('page', currentPage);
  window.history.replaceState({}, '', decodeURIComponent(`${window.location.pathname}?${params}`));
  const filmsPagination = await getFilmsByPage(currentPage);
  const films = addGenreNamesToFilm(filmsPagination.results);
  renderFilms(films);
  scrollToTop();
});

// --- пролистывание вверх--- //
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// --- рендерим фильмы --- //
export const renderFilms = films => {
  const list = document.getElementsByClassName('films__list')[0];
  if (!list) {
    return;
  }
  list.innerHTML = films.map(getFilmItemTemplate).join('');
};

// --- получаем шаблон элемента фильма --- ? poster_path : (document.getElementById('img').src = '../images/sorry.jpg')//
const getFilmItemTemplate = ({
  id,
  poster_path,
  title,
  genre_names,
  release_date,
  vote_average,
}) => {
  return `<li class="films__item">
    <a href="#" class="result__link">
      <div id=${id} class="film__link">
         <img id="img" class="film__img" src="${
           poster_path
             ? 'https://image.tmdb.org/t/p/w500/' + poster_path
             : 'https://i.ibb.co/4MnLhbM/sorry1.jpg'
         }" alt="123">
      </div>
      <div id=${id} class="film__box">
        <p class="film__name">${title}</p>
        <p id=${id} class="film__info" >
          <span class="film__genres">${genre_names}</span>
          &nbsp;|&nbsp;
          ${new Date(release_date).getFullYear()}
          <span class="rating">${vote_average}</span>
        </p>
      </div>
    </a>
    </li>`;
};

// --- добавление жанров к фильму --- //
const addGenreNamesToFilm = films => {
  return films.map(film => ({
    ...film,
    genre_names: getFilmGenreNames(film),
  }));
};

// --- получаем названия жанров фильмов --- //
const getFilmGenreNames = film => {
  const genreNames = film.genre_ids.map(genreId => genres[genreId].name);
  return genreNames.length ? genreNames : [unknownGenreName];
};

// --- получаем фильмы по страницам --- //
const getFilmsByPage = async page => {
  return await fetchResults(page);
};

// --- запускаем функцию котороя рендерит первую страницу --- //
const initFirstPageFilms = async () => {
  await getAllGenres();
  const firtsPageFilms = await getFilmsByPage(page);
  renderFilms(addGenreNamesToFilm(firtsPageFilms.results));
};

// --- трансформация жанров в обьект --- //
const getAllGenres = async () => {
  await fetchGenres().then(data => {
    data.genres;
    genres = data.genres.reduce((result, genre) => {
      result[genre.id] = genre;
      return result;
    }, {});
  });
};

initFirstPageFilms();
