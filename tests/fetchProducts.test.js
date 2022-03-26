require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  test('Se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  test('A chamada de fetch passando o argumento "computador" para fetchProducts', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  test('Se fetch utiliza o endpoint correto ao chamar a função fetchProducts com argumento "computador"', async () => {
    const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url)
  });
  test('Se o retorno de fetchProducts com argumento "computador" tem a mesma estrutura que computadorSearch', async () => {
    const retorno = await fetchProducts('computador');
    expect(retorno).toEqual(computadorSearch);
  });
  test('Se ao chamar fetchProducts sem parâmetros retorna a mensagem de erro: "You must provide an url"', async () => {
    const retorno = await fetchProducts();
    expect(retorno).toEqual(new Error('You must provide an url'));
  })
});
