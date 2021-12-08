import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'cfdb2a8aab50d545dc8a1d0938de62d8';

export default class FilmsApi {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalPages = 500;
    }
    async fetchResults() {
    const urlPopular = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${this.page}`;
    const response = await fetch(urlPopular);
    const filmsLists = await response.json();
    return filmsLists;
    }
    async fetchSearch() {
    const urlSearch = `${BASE_URL}search/movie?api_key=${API_KEY}&page=${this.page}&query=${this.searchQuery}`;
    const response = await fetch(urlSearch);
    const filmsLists = await response.json();
    return filmsLists;
  }
  async fetchMovies(id) {
    const urlSearch = `${BASE_URL}movie/${id}?api_key=${API_KEY}`;
    const response = await fetch(urlSearch);
    const filmData = await response.json();
    return filmData;
  }

  incrementPage() {
    console.log(this.page);
    if (this.currentPage === this.totalPages) {
      return;
    }
    this.page += 1;
  }
  decrementPage() {
    if (this.page === 1) {
      return;
    }
    this.page -= 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// // Получение данных после импорта
// const filmsApi = new FilmsApi(); // создание объекта класса

// // Получение списка популярных фильмов
// const popularFilms = await filmsApi.fetchResults();
// console.log(popularFilms.results); 

// // Получение списка фильмов поиску
// filmsApi.query = 'Dune'; // запись в клас поискового запроса
// const filmInfo = await filmsApi.fetchSearch();
// console.log(filmInfo.results);

// // Получение фильма по ID
// const id = 580489;
// const filmById = await filmsApi.fetchMovies(id);
// console.log(filmById);

// // прибавление номера страницы для пагинации
// filmsApi.incrementPage();

// // уменьшение номера страницы для пагинации
// filmsApi.decrementPage();

// // обнуление страницы 
// filmsApi.resetPage();