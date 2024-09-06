const { Bioma, Recinto, Animal, alocarAnimais } = require('./recintos-zoo');

describe('Recintos do Zoológico', () => {

  // Configura os recintos com base na tabela fornecida
  const recinto1 = new Recinto(new Bioma('Savana', true, false), 10);
  const recinto2 = new Recinto(new Bioma('Floresta', false, false), 5);
  const recinto3 = new Recinto(new Bioma('Savana e Rio', true, true), 7);
  const recinto4 = new Recinto(new Bioma('Rio', false, true), 8);
  const recinto5 = new Recinto(new Bioma('Savana', true, false), 9);

  // Adiciona animais existentes aos recintos
  recinto1.adicionarAnimais([new Animal('Macaco', 'Herbivoro'), new Animal('Macaco', 'Herbivoro'), new Animal('Macaco', 'Herbivoro')]);
  recinto3.adicionarAnimais([new Animal('Gazela', 'Herbivoro')]);
  recinto5.adicionarAnimais([new Animal('Leão', 'Carnivoro')]);

  test('Deve alocar animais em recintos corretamente', () => {
    const animais = [
      new Animal('Hipopotamo', 'Herbivoro'), // Deve ser alocado no recinto com 'Savana e Rio'
      new Animal('Macaco', 'Herbivoro'),    // Deve ser alocado no recinto 1 ou 2
      new Animal('Leão', 'Carnivoro'),     // Não deve ser alocado, pois já está no recinto 5
      new Animal('Elefante', 'Herbivoro')  // Deve ser alocado no recinto 2 ou 4
    ];

    const resultado = alocarAnimais([recinto1, recinto2, recinto3, recinto4, recinto5], animais);
    
    expect(resultado.erro).toBeNull();
    expect(resultado.recintosViaveis).toBe(true);
    // Verificar se os animais foram alocados corretamente
    expect(recinto1.animais.length).toBe(4); // 3 macacos existentes + 1 novo macaco
    expect(recinto2.animais.length).toBe(1); // 1 novo elefante
    expect(recinto3.animais.length).toBe(2); // 1 gazela existente + 1 hipopotamo
    expect(recinto4.animais.length).toBe(0); // Nenhum animal adicionado ainda
    expect(recinto5.animais.length).toBe(1); // 1 leão existente
  });

  test('Deve rejeitar alocação devido à incompatibilidade de bioma', () => {
    const animais = [
      new Animal('Hipopotamo', 'Herbivoro') // Precisa de Savana e Rio
    ];

    // O recinto 1 não tem rio, então a alocação deve falhar
    const resultado = alocarAnimais([recinto1], animais);
    
    expect(resultado.erro).toBe('Não foi possível alocar o lote de animais');
    expect(resultado.recintosViaveis).toBe(false);
  });

  test('Deve rejeitar alocação devido à falta de espaço', () => {
    const recintoPequeno = new Recinto(new Bioma('Savana', true, false), 3);
    recintoPequeno.adicionarAnimais([
      new Animal('Macaco', 'Herbivoro'),
      new Animal('Macaco', 'Herbivoro')
    ]);

    const animais = [
      new Animal('Macaco', 'Herbivoro'), // Excedendo a capacidade
      new Animal('Macaco', 'Herbivoro')
    ];

    const resultado = alocarAnimais([recintoPequeno], animais);
    
    expect(resultado.erro).toBe('Não foi possível alocar o lote de animais');
    expect(resultado.recintosViaveis).toBe(false);
  });

});


