class Bioma {
  constructor(nome, temSavana, temRio) {
    this.nome = nome;
    this.temSavana = temSavana;
    this.temRio = temRio;
  }
}

class Recinto {
  constructor(bioma, capacidade) {
    this.bioma = bioma;
    this.capacidade = capacidade;
    this.animais = [];
  }

  adicionarAnimais(animais) {
    if (!this.verificarEspaco(animais) || !this.verificarCompatibilidade(animais)) {
      return false;
    }
    
    this.animais.push(...animais);
    return true;
  }

  verificarEspaco(animais) {
    const espacoNecessario = this.animais.length + animais.length;
    const especiesDiferentes = new Set(this.animais.map(a => a.especie)).size;
    const espacoExtra = especiesDiferentes > 1 ? 1 : 0;
    return espacoNecessario <= this.capacidade + espacoExtra;
  }

  verificarCompatibilidade(animais) {
    // Verifica compatibilidade com animais já existentes
    for (const animal of animais) {
      if (animal.especie === 'Hipopotamo' && (!this.bioma.temSavana || !this.bioma.temRio)) {
        return false;
      }

      if (animal.especie === 'Macaco' && this.animais.length === 0) {
        return false;
      }
    }

    // Verifica compatibilidade com animais já existentes
    for (const animal of this.animais) {
      if (animal.tipo === 'Carnivoro') {
        for (const novoAnimal of animais) {
          if (novoAnimal.tipo === 'Carnivoro' && novoAnimal.especie !== animal.especie) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

class Animal {
  constructor(especie, tipo) {
    this.especie = especie;
    this.tipo = tipo; // 'Carnivoro', 'Herbivoro', etc.
  }
}

function alocarAnimais(recintos, animais) {
  // Cria um array de lotes de animais para garantir que não dividimos lotes
  const lotes = [];
  let loteAtual = [];

  for (const animal of animais) {
    if (loteAtual.length === 0) {
      loteAtual.push(animal);
    } else {
      // Adiciona o animal ao lote atual
      loteAtual.push(animal);
    }
    
    // Verifica se temos um lote completo e o adiciona à lista de lotes
    if (loteAtual.length === 12) { // Supondo que o lote tem um tamanho fixo de 12
      lotes.push(loteAtual);
      loteAtual = [];
    }
  }

  // Adiciona o último lote se não estiver vazio
  if (loteAtual.length > 0) {
    lotes.push(loteAtual);
  }

  // Tenta alocar cada lote de animais nos recintos
  for (const lote of lotes) {
    let alocado = false;
    for (const recinto of recintos) {
      if (recinto.adicionarAnimais(lote)) {
        alocado = true;
        break;
      }
    }
    if (!alocado) {
      return `Não foi possível alocar o lote de animais`;
    }
  }
  return 'Todos os animais foram alocados com sucesso';
}

export default { Bioma, Recinto, Animal, alocarAnimais };






