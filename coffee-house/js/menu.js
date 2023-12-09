import products from '../js/products.js';

createProduct('coffee');
hideProducts()
window.addEventListener('resize', hideProducts);

const chips = document.getElementsByName('menu');
chips.forEach((item)=>{
  item.addEventListener('click', ()=>{
    createProduct(item.value);
    hideProducts()
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

function filterProducts(category) {
  return products.filter((item)=> item.category === category);
}

function createProduct(category) {
  const productList = filterProducts(category);
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

function hideProducts() {
  const width = window.innerWidth;
  const category = getCategory();
  createProduct(category);
  const productList = document.querySelectorAll('.product-item');
  const btn = document.querySelector('[data-btn]');
  btn.style.display = 'none';
  
  if (width <= 768) {
    
    if (productList.length > 4) {
      for (let i = 4; i < productList.length; i++) {
        productList[i].style.display = 'none';
      }
      btn.style.display = 'flex';
    }

  if (width > 768) {
    for (let i = 4; i < productList.length; i++) {
      productList[i].style.display = 'flex';
    }
    btn.style.display = 'none';
  }
  }
}

function showProducts() {

}