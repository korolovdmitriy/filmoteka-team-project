const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'cfdb2a8aab50d545dc8a1d0938de62d8';
import axios from 'axios';

async function fetchResults(page) {
  const urlPopular = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${page}`;
  const response = await fetch(urlPopular);
  const data = await response.json();
  // console.log(data);
  return data;
}

// fetchResults(5).then(res => console.log(res.results));

async function fetchSearch(page, searchQuery) {
  const urlSearch = `${BASE_URL}search/movie?api_key=${API_KEY}&page=${page}&query=${searchQuery}`;
  const response = await fetch(urlSearch);
  return await response.json();
}

// fetchSearch(1, 'Dune').then(res => console.log(res.results));

async function fetchMovies(id) {
  const urlSearch = `${BASE_URL}movie/${id}?api_key=${API_KEY}`;
  const response = await fetch(urlSearch);
  return await response.json();
}

// fetchMovies(580489).then(res => console.log(res));

async function fetchGenres() {
  const urlSearch = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const response = await fetch(urlSearch);
  return await response.json();
}
// fetchGenres().then(res => console.log(res));

export { fetchResults, fetchSearch, fetchMovies, fetchGenres };
