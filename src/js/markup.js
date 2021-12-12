import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const filmsList = document.querySelector('.films__list');

function markupFilm(films) {
  const markupFilm = films
    .map(({ id, poster_path, title, genre_ids, release_date, vote_average }) => {
      return `<li class="films__item" data-id="${id}">
                <div class="film__link">
                    <img class="film__img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" />
                    <p class="film__name">${title}</p>
                </div>
                <div class="film__box">
                    <p class="film__info">
                        <span>${genre_ids.map(id => id).join(', ')}</span>
                        &nbsp;|&nbsp;
                    </p>
                    <p class="film__info">${new Date(release_date).getFullYear()}</p>
                    <p class="rating">${vote_average}</p>
                </div>
            </li>`;
    })
    .join('');

  filmsList.innerHTML = markupFilm;
}

export { markupFilm };
