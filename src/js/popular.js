import axios from 'axios';

import { markupFilm } from './markup';
import { fetchResults } from './apiService';

fetchResults(1).then(res => {
  markupFilm(res.results);
});
