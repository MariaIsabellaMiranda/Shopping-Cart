require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  test('Se fetchItem é uma função', () => {
    expect.assertions(1)
    expect(typeof fetchItem).toBe('function');
  });
  test('Se fetch é chamado ao executar a função fetchItem com o parâmetro "MLB1615760527"', async () => {
    expect.assertions(1)
    await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });
  test('Se fetch utiliza o endpoint correto ao chamar a função', async () => {
    expect.assertions(1)
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalledWith(url);
  });
  test('Se tem o retorno da função fetchItem tem a mesma estrutura que o objeto "item"', async () => {
    expect.assertions(1)
    const retorno = await fetchItem("MLB1615760527");
    expect(retorno).toEqual(item);
  });
  test('Se ao chamar fetchItem sem parâmetro retorna o erro "You must provide an url"', async () => {
    expect.assertions(1)
    const retorno = await fetchItem();
    expect(retorno).toEqual(new Error('You must provide an url'));
  });
});
