const openModalBtn = document.querySelector('[data-modal-open]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const teamModal = document.querySelector('[data-modal]');
const bodyNode = document.querySelector('body');

openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);

function toggleModal(event) {
  event.preventDefault();
  teamModal.classList.toggle('is-hidden');

  if (event.target === openModalBtn) {
    bodyNode.style.overflow = 'hidden';
  } else {
    bodyNode.style.removeProperty('overflow');
  }
}

bodyNode.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    teamModal.classList.toggle('is-hidden');
  }
});
