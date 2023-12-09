import products from '../js/products.js';

createMenu();
displayProducts();
window.addEventListener('resize', displayProducts);

const chips = document.getElementsByName('menu');
chips.forEach((item)=>{
  item.addEventListener('click', ()=>{
    createMenu();
    displayProducts();
  })
});

function getCategory() {
  let category = '';
  const chips = document.getElementsByName('menu');
  chips.forEach((item)=>{
    if (item.checked)
    category = item.value;
  })
  return category;
}

function createMenu() {
  let category = getCategory();
  const productList = products.filter((item)=> item.category === category);
  const productBox = document.querySelector('.products-wrapper');
  productBox.innerHTML = '';

  productList.forEach((item) => {
  
    const productImgBox = document.createElement('div');
    productImgBox.className = 'product-img-wrapper';

    const productImg = document.createElement('img');
    productImg.className = 'product-img';
    productImg.src = item.src;
    productImg.alt = item.description;

    productImgBox.appendChild(productImg);

    const productInfoBox = document.createElement('div');
    productInfoBox.className = 'product-info';

    const title = document.createElement('h3');
    title.className = 'title-s';
    title.textContent = item.name;

    const description = document.createElement('p');
    description.className = 'text-m info';
    description.textContent = item.description;

    const price = document.createElement('p');
    price.className = 'title-s product-price';
    price.textContent = item.price;

    productInfoBox.appendChild(title);
    productInfoBox.appendChild(description);
    productInfoBox.appendChild(price);

    const productItem = document.createElement('article');
    productItem.className = 'product-item';

    productItem.appendChild(productImgBox);
    productItem.appendChild(productInfoBox);

    productBox.appendChild(productItem);
  })
}

function getProductList() {
  createMenu();
  const productList = document.querySelectorAll('.product-item');
  return productList;
}

function displayProducts() {
  const width = window.innerWidth;
  const productList = getProductList();
  const btn = document.querySelector('[data-btn]');
  btn.style.display = 'none';
  
  if (width <= 768) {
    
    if (productList.length > 4) {
      for (let i = 4; i < productList.length; i++) {
        productList[i].style.display = 'none';
      }
      btn.style.display = 'flex';
    } else {
      for (let i = 4; i < productList.length; i++) {
        productList[i].style.display = 'flex';
      }
      btn.style.display = 'none';
    }
  }
}

function showProducts() {

}