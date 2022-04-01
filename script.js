const ol = document.querySelector('.cart__items');
const tagPrice = document.querySelector('.total-price');

const createLoading = () => {
  const pai = document.querySelector('.container');
  const load = document.createElement('p');
  load.className = 'loading'; 
  load.innerText = 'carregando...';
  pai.appendChild(load);
};

const removeLoading = () => {
  const load = document.querySelector('.loading');
  load.remove();
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const convertString = () => {
  const li = ol.childNodes;
  const pricesArray = [];
  li.forEach((element) => {
    const priceStr = element.innerText.split('$');
    pricesArray.push(parseFloat(priceStr[1]));
  });
  return pricesArray;
};

const somaTotal = () => {
  const soma = convertString().reduce((acc, cur) => (acc + cur), 0);
    if (soma === 0) {
      tagPrice.innerText = '0,00';
    } else {
      tagPrice.innerText = soma;
    }
    localStorage.setItem('subtotal', tagPrice.innerText);
};

const cartItemClickListener = (event) => {
  event.target.remove();
  somaTotal();
  saveCartItems(ol.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getSkuFromProductItem = (item) => {
  const product = item.target.parentNode;
  return product.querySelector('span.item__sku').innerText;
};

const addItem = async (item) => {
  createLoading();
  const { id, title, price } = await fetchItem(getSkuFromProductItem(item));
  removeLoading();
  const itemObj = { sku: id, name: title, salePrice: price };
  ol.appendChild(createCartItemElement(itemObj));
  saveCartItems(ol.innerHTML);
  somaTotal();
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(button);
  button.addEventListener('click', addItem);
  return section;
};

const getResults = async () => {
  createLoading();
  const products = await fetchProducts('computador');
  removeLoading();
  const { results } = products;
  return results;
};

const getElements = async () => {
  const section = document.querySelector('.items');
  createLoading();
  const results = await getResults();
  removeLoading();
  results.forEach((elementFor) => {
      const { id, title, thumbnail } = elementFor;
      const parametro = { sku: id, name: title, image: thumbnail };
      section.appendChild(createProductItemElement(parametro));
  });
};

const itemsSalvos = () => {
  ol.innerHTML = getSavedCartItems();
  const li = ol.childNodes;
  li.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
  const subtotal = localStorage.getItem('subtotal');
  tagPrice.innerText = subtotal;
};

const limpaCarrinho = () => {
  ol.innerHTML = '';
  somaTotal();
  saveCartItems(ol.innerHTML);
};

const createEventButton = () => {
  const bt = document.querySelector('.empty-cart');
  bt.addEventListener('click', limpaCarrinho);
};

window.onload = () => { getElements(); itemsSalvos(); createEventButton(); };
