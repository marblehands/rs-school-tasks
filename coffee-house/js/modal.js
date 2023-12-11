import products from '../js/products.js';
import { getCategory } from '../js/menu.js';
import { createMenu } from '../js/menu.js';
import { displayProducts } from '../js/menu.js';

let currentProductData;

const modal = document.querySelector('.modal-overlay');
const modalWindow = document.querySelector('.modal-wrapper');
const productItems = document.querySelectorAll('.product-item');
const closeBtn = document.querySelector('[data-btn-modal]');

const title = document.querySelector('.modal-product-title');
const description = document.querySelector('.modal-product-description');
const img = document.querySelector('.modal-product-img');
const sizes = document.querySelectorAll('.size');
const sizeInputs = document.getElementsByName('size');
const additives = document.querySelectorAll('.add');
const addInputs = document.getElementsByName('additives');
const price = document.querySelector('.total-price');
let cost;

productItems.forEach((item, index)=>{
  item.addEventListener('click', ()=>{
    openModal();
    data = getData(index);
    addData(data);
  })
})

modal.addEventListener('click', (event)=>{
  if (event.target === event.currentTarget || event.target === closeBtn) {
    closeModal();
  }
});

sizeInputs.forEach((item) => {
  item.addEventListener('click', () => {
    let extraPrice = Number(item.value);
    const type = 'size';
    updateTotal(item, type, extraPrice);
  })
})

addInputs.forEach((item) => {
  item.addEventListener('click', () => {
    let extraPrice = Number(item.value);
    const type = 'additive';
    updateTotal(item, type, extraPrice);
  })
})

export function filterMenu(category) {
  const menu = products.filter((item) => item.category === category);
  return menu;
}

export function openModal() {
  clearData();
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
  currentProductData = data;
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
  price.setAttribute('value', `${data.price}`);
  cost = Number(price.getAttribute('value'));
  img.src = data.src; 
}

function clearData() {
  sizeInputs.forEach((item, index) => {
    index !== 0 ? item.checked = false : item.checked = true;
  });
  addInputs.forEach((item) => {
    item.checked = false;
  })
}

function updateTotal(item, type, extraPrice) {
  const price = document.querySelector('.total-price');
  console.log(price)
  console.log(cost)
  let total = Number(price.getAttribute('value'));
  if (type === 'size') {
    const addInputs = document.getElementsByName('additives');
    let count = 0;
    addInputs.forEach((item) => {
      if (item.checked) {
        count++;
      }
    })
    total = cost + extraPrice + count * 0.5;
  }
  if (type === 'additive') {
    if (item.checked === false) {
      extraPrice = -extraPrice;
    }
    total += extraPrice;
  }
  console.log(total)
  price.innerHTML = `$${total}`;
  price.setAttribute('value', `${total}`);
}