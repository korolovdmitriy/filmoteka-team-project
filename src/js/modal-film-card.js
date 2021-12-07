import * as basicLightbox from 'basiclightbox'
import 'basiclightbox/dist/basicLightbox.min.css'


export function onFilmCardClick(event){
    event.preventDefault();


    const instance = basicLightbox.create(`
    <div class="modal">
        <svg class="modal__close-btn">
            <use href="../images/sprite.svg#icon-x_cross" width="18" height="18"></use>
        </svg>
        <img src="${event.target.dataset.source}" class="modal__poster" width="274" height="398">
        <h2></h2>
        <div class="modal__parameters">
            <ul class="modal__parameter">
                <li class="modal__parameter--name">Vote / Votes</li>
                <li class="modal__parameter--name">Popularity</li>
                <li class="modal__parameter--name">Original Title</li>
                <li class="modal__parameter--name">Genre</li>
            </ul>
            <ul class="modal__parameter__status">
                <li class="modal__parameter--value"></li>
                <li class="modal__parameter--value"></li>
                <li class="modal__parameter--value"></li>
                <li class="modal__parameter--value"></li>
            </ul>
            <h3 class="modal__about">About</h3>
            <div class="modal__about--scroll"><p class="modal__descr"></p></div>
        </div>
    </div>`,{
        onShow:(instance)=>{
            window.addEventListener('keydown', onKeyboardClick)
            function onKeyboardClick(event){
                if (event.code === 27){
                    instance.close();
                    window.removeEventListener('keydown', onKeyboardClick);
                }
            }
            instance.element().querySelector('.modal__close-btn').addEventListener('click', ()=>{
                instance.close;
            });
        },
    }).show();
}