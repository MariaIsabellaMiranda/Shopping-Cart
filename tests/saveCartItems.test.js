const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  test('Se ao chamar a função saveCartItems com o argumento "<ol><li>Item</li></ol>" o localStorage.setItem é chamado', () => {

    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  test('Se ao chamar saveCartItems com o argumento "<ol><li>Item</li></ol>" o localStorage.setItem é chamado com dois parâmetros, primeiro cartItems, segundo sendo o valor passado como argumento', () => {
    const item = '<ol><li>Item</li></ol>'
    saveCartItems(item);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', item);
  })
});
