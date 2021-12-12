import * as basicLightbox from 'basiclightbox'
// import 'basiclightbox/dist/basicLightbox.min.css'
import axios from 'axios';
import { fetchMovies } from './apiService';



const cardEl = document.querySelector('.films__list');
cardEl.addEventListener('click', onFilmCardClick);

let genre, popularity, original, title, post, descr, vote, votes;
 
let filmId = 580489;
fetchMovies(filmId).then(data => {
    title = data.title;
    post = data.poster_path;
    vote = data.vote_average;
    votes = data.vote_count;
    descr = data.overview;
    original = data.original_title;
    popularity = data.popularity;
    genre = data.genres.map(el => el.name).join(', ');   
});


function onFilmCardClick(event) {
    console.log(event);
    const instance = basicLightbox.create(`
    <div class="modal">
        <svg class="modal__close-btn">
            <use href="../images/sprite.svg#icon-x_cross" class="modal_close-btn--cross" width="14px" height="14px"></use>
        </svg>
        <img src="https://image.tmdb.org/t/p/w500/${post}" class="modal__poster" width="396" height="478">
        
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
                        <button class="modal__description--button-action" data-id="${filmId}">add to watched</button>
                    </li>
                    <li class="modal__description--button">
                        <button class="modal__description--button-action" data-id="${filmId}>add to queue</button>
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

