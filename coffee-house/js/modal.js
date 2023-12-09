import products from '../js/products.js';
import { getCategory } from '../js/menu.js';
import { createMenu } from '../js/menu.js';
import { displayProducts } from '../js/menu.js';


const modal = document.querySelector('.modal-overlay');
const modalWindow = document.querySelector('.modal-wrapper');
const productItems = document.querySelectorAll('.product-item');
const closeBtn = document.querySelector('[data-btn-modal]');

const title = document.querySelector('.modal-product-title');
const description = document.querySelector('.modal-product-description');
const img = document.querySelector('.modal-product-img');
const sizes = document.querySelectorAll('.size');
const additives = document.querySelectorAll('.add');
const price = document.querySelector('.total-price');

productItems.forEach((item, index)=>{
  item.addEventListener('click', ()=>{
    openModal();
    const data = getData(index);
    addData(data);
  })
})

modal.addEventListener('click', (event)=>{
  if (event.target === event.currentTarget || event.target === closeBtn) {
    closeModal();
  }
});

export function filterMenu(category) {
  const menu = products.filter((item) => item.category === category);
  return menu;
}

export function openModal() {
  modal.style.display = 'flex';
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
}

export function closeModal() {
  modal.style.display = 'none';
  document.getElementsByTagName('body')[0].style.overflow = 'auto';
}

export function getData(index) {
  const category = getCategory();
  const menu = filterMenu(category);
  const data = menu[index];
  return data;
}

export function addData(data) {
  const sizeValues = data.sizes;
  const arrSize = Object.values(sizeValues).map(item => item.size);

  const addValues = data.additives;
  const arrAdd = addValues.map(item => item.name);

  title.innerHTML = data.name;
  description.innerHTML = data.description;
  sizes.forEach((item, index)=> item.innerHTML = arrSize[index]);
  additives.forEach((item, index) => item.innerHTML = arrAdd[index]);

  price.innerHTML = `$${data.price}`;
  img.src = data.src; 
}