import throttle from 'lodash.throttle';

const up = document.querySelector('#scrollUpLink');

window.addEventListener('DOMContentLoaded', () => {
  up.classList.add('is-hidden');
});

window.addEventListener('scroll', throttle(toggleVisibilityUpButton, 250));

up.addEventListener('click', scrollToTop);

function toggleVisibilityUpButton() {
  pageYOffset > 200 ? up.classList.remove('is-hidden') : up.classList.add('is-hidden');
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
