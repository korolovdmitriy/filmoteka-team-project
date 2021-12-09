import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const container = document.getElementById('pagination');

const options = {
  totalItems: 20000,
  itemsPerPage: 21,
  visiblePages: 5,
  page: 1,
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

const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();
fetchImages(page).then(data => {
  pagination.reset(data.total);
  renderImages(data.images);
});

pagination.on('afterMove', event => {
  const currentPage = event.page;
  fetchImages(currentPage).then(data => renderImages(data.images));
});

function fetchImages(page) {
  return fetch(
    `https://pixabay.com/api/?key=4823621-792051e21e56534e6ae2e472f&q=sun&page=${page}&per_page=20`,
  )
    .then(res => res.json())
    .then(data => ({ images: data.hits, total: data.totalHits }));
}

function renderImages(images) {
  console.log('RENDER');
  console.log(images);
}
