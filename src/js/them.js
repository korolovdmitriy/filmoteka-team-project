const themeEl = document.querySelector('.theme__btn');

themeEl.addEventListener('click', onClickTheme);


function onClickTheme (){
  if (document.body.classList.contains('dark')) {
    document.body.classList.remove('dark')
    localStorage.removeItem('theme')
    
     }else{
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
     } 
}

if(localStorage.theme === 'dark'){
  document.body.classList.add('dark')
  }

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
}
refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
function toggleModal(){
  refs.modal.classList.toggle('is-hidden');

}