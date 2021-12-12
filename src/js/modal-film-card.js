import * as basicLightbox from 'basiclightbox'
// import 'basiclightbox/dist/basicLightbox.min.css'
import axios from 'axios';
const API_KEY = 'cfdb2a8aab50d545dc8a1d0938de62d8';
const BASE_URL = 'https://api.themoviedb.org/3';



const cardEl = document.querySelector('.films__list')
cardEl.addEventListener('click', onFilmCardClick)

export function onFilmCardClick(genre, popularity, original, title, post, descr, vote, votes){
    // event.preventDefault();
    const instance = basicLightbox.create(`
    <div class="modal">
        <svg class="modal__close-btn">
            <use href="../images/sprite.svg#icon-x_cross" class="modal_close-btn--cross" width="14px" height="14px"></use>
        </svg>
        <img src="${post}" class="modal__poster" width="396" height="478">
        
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
                        <li class="modal__parameters--value">${genre}</li>
                    </ul>
                </div>    
            </div>
            <div class="modal__description">
                <h3 class="modal__description--title">About</h3>
                <p class="modal__description--about">${descr}</p>
                <ul class="modal__description--buttons">
                    <li class="modal__description--button">
                        <button class="modal__description--button-action">add to watched</button>
                    </li>
                    <li class="modal__description--button">
                        <button class="modal__description--button-action">add to queue</button>
                    </li>
            </div>
        </div>
    </div>`
        ,{
        onShow:(instance)=>{
                window.addEventListener('keydown', onKeyboardClick)
                        
                function onKeyboardClick(event) {
                if (event.code === 'Escape'){
                    instance.close();
                    window.removeEventListener('keydown', onKeyboardClick);
                }
            }
            instance.element().querySelector('.modal__close-btn').addEventListener('click', ()=>{
                instance.close;
            });
        },
    });
    instance.show();
}

function getFilm(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    return axios.get(url);}

    getFilm(35384).then(res=>{
        console.log(res.data);
        const title = res.data.title;
        const post = res.data.poster_path;
        const vote = res.data.vote_average;
        const votes = res.data.vote_count;
        const descr = res.data.overview;
        const original = res.data.original_title;
        const popularity = res.data.popularity;
        const genre = res.data.genres.map(el => el.name).join(', ');
        // onFilmCardClick(genre, popularity, original, title, post, descr, vote, votes);
        
        })
        