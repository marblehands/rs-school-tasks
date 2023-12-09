import products from '../js/products.js';

const modal = document.querySelector('.modal-overlay');
const modalWindow = document.querySelector('.modal-wrapper');
const productItems = document.querySelectorAll('.product-item');
const closeBtn = document.querySelector('[data-btn-modal]')

// сейчас модалка открывается только после обновления страницы
// нужно сделать так чтобы слушатель вешался при каждой отрисовки карточек
productItems.forEach((item)=>{
  item.addEventListener('click', ()=>{
    openModal();
  })
})

modal.addEventListener('click', (event)=>{
  if (event.target === event.currentTarget || event.target === closeBtn) {
    closeModal();
  }
})

function openModal() {
  modal.style.display = 'flex';
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.getElementsByTagName('body')[0].style.overflow = 'auto';
}