import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css'
import axios from 'axios';
import { fetchMovies } from './apiService';
import { markupFilm } from './my-library';

const cardEl = document.querySelector('.films__list');
const libraryFlag = document.querySelector('.hero__lib-background');
const emptyList = document.querySelector('.empty-list');
const unknownGenreName = 'Common';

cardEl.addEventListener('click', event => {
  event.preventDefault();
  // let filmId = event.target.closest('.films__item').dataset.id;
  let genre, popularity, original, title, post, descr, vote, votes;
  let filmId;
  const { id, tagName, parentNode } = event.target;
  filmId = tagName === 'DIV' ? id : parentNode.id;
  if (!id) {
    filmId = tagName === 'DIV' ? id : parentNode.id;
    console.log(filmId);
  }

  fetchMovies(filmId).then(data => {
    title = data.title;
    post = data.poster_path;
    vote = data.vote_average;
    votes = data.vote_count;
    descr = data.overview;
    original = data.original_title;
    popularity = data.popularity;
    genre = data.genres.map(el => el.name).join(', ');
    onFilmCardClick(genre, popularity, original, title, post, descr, vote, votes, filmId);
  });
});

function onFilmCardClick(genre, popularity, original, title, post, descr, vote, votes, filmId) {
  let toggleQueue = [];
  let toggleWatched = [];
  if (JSON.parse(localStorage.getItem('queue'))) {
    toggleQueue = [...JSON.parse(localStorage.getItem('queue'))];
  }
  if (JSON.parse(localStorage.getItem('watch'))) {
    toggleWatched = [...JSON.parse(localStorage.getItem('watch'))];
  }
  const instance = basicLightbox.create(
    `
    <div class="modal">
        <svg class="modal__close-btn">
            <use href="../images/sprite.svg#icon-x_cross" class="modal_close-btn--cross" width="14px" height="14px"></use>
        </svg>
        <img src="${
          post ? 'https://image.tmdb.org/t/p/w500/' + post : 'https://i.ibb.co/4MnLhbM/sorry1.jpg'
        }" class="modal__poster" width="396" height="478">
        
        <div class="modal__parameters">
            <div class="modal__parameters--information">
                <h2 class="modal__parameters--title">${title}</h2>
                <div class="modal__parameters--data">
                    <ul class="modal__parameters--list">
                        <li class="modal__parameters--list-name">Vote / Votes</li>
                        <li class="modal__parameters--list-name">Popularity</li>
                        <li class="modal__parameters--list-name">Original Title</li>
                        <li class="modal__parameters--list-name">Genre</li>
                    </ul>
                        <ul class="modal__parameters--list-status">
                        <li class="modal__parameters--value"><span class="modal__parameter--summar">${vote}/</span>${votes}</li>
                        <li class="modal__parameters--value">${popularity}</li>
                        <li class="modal__parameters--value">${original}</li>
                        <li class="modal__parameters--value">${
                          genre ? genre : unknownGenreName
                        }</li>
                    </ul>
                </div>    
            </div>
            <div class="modal__description">
                <h3 class="modal__description--title">About</h3>
                <p class="modal__description--about">${descr}</p>
                <ul class="modal__description--buttons">
                    <li class="modal__description--button">
                        <button class="modal__description--button-action addToWatchBtn ${
                          toggleWatched.includes(filmId) ? 'active' : null
                        }" data-id="${filmId}">${
      toggleWatched.includes(filmId) ? 'remove from watched' : 'add to watched'
    }</button>
                    </li>
                    <li class="modal__description--button">
                        <button class="modal__description--button-action addToQueueBtn ${
                          toggleQueue.includes(filmId) ? 'active' : null
                        }" data-id="${filmId}">${
      toggleQueue.includes(filmId) ? 'remove from queue' : 'add to queue'
    }</button>
                    </li>
            </div>
        </div>
    </div>`,
    {
      onShow: instance => {
        window.addEventListener('keydown', onKeyboardClick);
        window.addEventListener('click', addToLibrary);

        function onKeyboardClick(event) {
          if (event.code === 'Escape') {
            instance.close();
            window.removeEventListener('keydown', onKeyboardClick);
          }
        }
        instance
          .element()
          .querySelector('.modal__close-btn')
          .addEventListener('click', () => {
            instance.close;
          });
      },
    },
  );
  instance.show();
}

function addToLibrary(event) {
  // event.preventDefault();

  let watchedFilms = [];
  let queueFilms = [];

  const parsedWatchFilm = JSON.parse(localStorage.getItem('watch'));
  const parsedQueueFilm = JSON.parse(localStorage.getItem('queue'));

  if (parsedWatchFilm) {
    watchedFilms = [...parsedWatchFilm];
  }
  if (parsedQueueFilm) {
    queueFilms = [...parsedQueueFilm];
  }

  const addToWatchBtn = document.querySelector('.addToWatchBtn');
  const addToQueueBtn = document.querySelector('.addToQueueBtn');

  if (event.target === addToWatchBtn) {
    if (watchedFilms.includes(event.target.dataset.id)) {
      const uniqueId = watchedFilms.filter(id => id !== event.target.dataset.id);
      localStorage.setItem('watch', JSON.stringify(uniqueId));
      addToWatchBtn.classList.remove('active');
      addToWatchBtn.textContent = 'add to watched';
      rerenderMyLibraryFilms(uniqueId, 'watched');
    } else {
      watchedFilms.push(event.target.dataset.id);
      localStorage.setItem('watch', JSON.stringify(watchedFilms));
      addToWatchBtn.classList.add('active');
      addToWatchBtn.textContent = 'remove from watched';
    }
  }

  if (event.target === addToQueueBtn) {
    if (queueFilms.includes(event.target.dataset.id)) {
      const uniqueId = queueFilms.filter(id => id !== event.target.dataset.id);
      localStorage.setItem('queue', JSON.stringify(uniqueId));
      addToQueueBtn.classList.remove('active');
      addToQueueBtn.textContent = 'add to queue';
      rerenderMyLibraryFilms(uniqueId, 'queue');
    } else {
      queueFilms.push(event.target.dataset.id);
      localStorage.setItem('queue', JSON.stringify(queueFilms));
      addToQueueBtn.classList.add('active');
      addToQueueBtn.textContent = 'remove from queue';
    }
  }
}

function rerenderMyLibraryFilms(ids, type) {
  if (libraryFlag) {
    cardEl.innerHTML = '';
    if (ids.length > 0) {
      ids.forEach(el =>
        fetchMovies(el).then(res => {
          cardEl.insertAdjacentHTML('afterbegin', markupFilm(res));
        }),
      );
    } else {
      emptyList.textContent = `My ${type} films library is empty`;
    }
  }
}
