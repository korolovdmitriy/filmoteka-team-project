const watchedBth = document.querySelector('[data-watched]');
const queueBth = document.querySelector('[data-queue]');
const filmsContainer = document.querySelector('.films');

window.addEventListener('DOMContentLoaded', () => {
  watchedBth.focus();
  filmsContainer.innerHTML = '<div class="empty-list">Список просмотренных фильмов еще пуст</div>';
});

watchedBth.addEventListener('click', () => {
  filmsContainer.innerHTML = '<div class="empty-list">Список просмотренных фильмов еще пуст</div>';
});

queueBth.addEventListener('click', () => {
  filmsContainer.innerHTML = '<div class="empty-list">Список фильмов для просмотра еще пуст</div>';
});
