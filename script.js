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

const cartItemClickListener = (event) => {
  event.target.remove();
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
  const { id, title, price } = await fetchItem(getSkuFromProductItem(item));
  const itemObj = { sku: id, name: title, salePrice: price };
  const ol = document.querySelector('.cart__items');
  ol.appendChild(createCartItemElement(itemObj));
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
  const products = await fetchProducts('computador');
  const { results } = products;
  return results;
};

const getElements = async () => {
  const section = document.querySelector('.items');
  const results = await getResults();
  results.forEach((elementFor) => {
      const { id, title, thumbnail } = elementFor;
      const parametro = { sku: id, name: title, image: thumbnail };
      section.appendChild(createProductItemElement(parametro));
  });
};

window.onload = () => { getElements(); };
