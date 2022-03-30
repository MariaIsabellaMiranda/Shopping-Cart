const getSavedCartItems = () => {
  const itemSalvo = localStorage.getItem('cartItems');
  return itemSalvo;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
