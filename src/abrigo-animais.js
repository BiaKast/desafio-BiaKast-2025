class AbrigoAnimais {
  constructor() {
    this.animais = [
      { nome: 'Rex', brinquedos: ['RATO', 'BOLA'], tipo: 'Cão' },
      { nome: 'Mimi', brinquedos: ['BOLA', 'LASER'], tipo: 'Gato' },
      { nome: 'Fofo', brinquedos: ['BOLA', 'RATO', 'LASER'], tipo: 'Gato' },
      { nome: 'Zero', brinquedos: ['RATO', 'BOLA'], tipo: 'Gato' },
      { nome: 'Bola', brinquedos: ['CAIXA', 'NOVELO'], tipo: 'Cão' },
      { nome: 'Bebe', brinquedos: ['LASER', 'RATO', 'BOLA'], tipo: 'Cão' },
      { nome: 'Loco', brinquedos: ['SKATE', 'RATO'], tipo: 'Jabuti' }
    ];
  }
  adicionarAnimal(animal) {
    this.animais.push(animal);
  }
  listarAnimais() {
    return this.animais;
  }

  atribuirAnimalPessoa(contador, nome, tipo, pessoa, lista) {
    if (lista.length == 0 && tipo === 'Gato') {
      lista.push(`${nome} - ${pessoa}`);
      contador += 1
    }
    else if (tipo === 'Gato' && lista.length > 0) {
      
      let verifica = lista.some(item => item.split(' - ')[1] === pessoa);

      if (verifica) {
        lista.push(`${nome} - abrigo`);
      } else {
        lista.push(`${nome} - ${pessoa}`);
        contador += 1
      }
    } 
    else {
      let verifica = []
      lista.some((item) => {
        item.split(' - ')[1] === pessoa ? verifica = this.animais.filter(b => b.nome === item.split(' - ')[0]) : null
      })

      if (verifica[0]?.tipo == 'Gato') {
        lista.push(`${nome} - abrigo`);
      } else {
        lista.push(`${nome} - ${pessoa}`);
        contador += 1
      }
    }
    return contador
  }

  verificarBrinquedos(opcaoPessoa1, opcaoPessoa2, animaisEscolhidos, lista) {
    let contador1 = 0
    let contador2 = 0

    for (let animal of animaisEscolhidos) {    
      let { brinquedos, nome, tipo } = animal;
      let semOrdem = null;

      for (let b of brinquedos) {
        if (opcaoPessoa1.includes(b) && nome === 'Loco') {
          semOrdem = 'pessoa 1';
          break;
        } else if (opcaoPessoa2.includes(b) && nome === 'Loco') {
          semOrdem = 'pessoa 2';
          break;
        }
      }
      
      const arrayBrinquedos = JSON.stringify(brinquedos)
      const brinquedosEscolhidos1 = JSON.stringify(opcaoPessoa1.filter(b => brinquedos.includes(b)))
      const brinquedosEscolhidos2 = JSON.stringify(opcaoPessoa2.filter(b => brinquedos.includes(b)))
      

      if (brinquedosEscolhidos1 == arrayBrinquedos && brinquedosEscolhidos2 == arrayBrinquedos) {
        lista.push(`${animal.nome} - abrigo`);
      }
      else if (brinquedosEscolhidos1 == arrayBrinquedos && contador1 < 3 && nome !== 'Loco') {
        contador1 = this.atribuirAnimalPessoa(contador1, nome, tipo, 'pessoa 1', lista)
      }
      else if (brinquedosEscolhidos2 == arrayBrinquedos && contador2 < 3 && nome !== 'Loco') {
        contador2 = this.atribuirAnimalPessoa(contador2, nome, tipo, 'pessoa 2', lista)
      }
      else if (nome === 'Loco' && semOrdem === 'pessoa 1' && contador1 > 0 && contador1 < 3) {
        lista.push(`${nome} - pessoa 1`);
      } 
      else if (nome === 'Loco' && semOrdem === 'pessoa 2' && contador2 > 0 && contador2 < 3) {
        lista.push(`${nome} - pessoa 2`);
      }
      else {
        lista.push(`${animal.nome} - abrigo`);
      }
    }
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const opcaoPessoa1 = brinquedosPessoa1.split(',');
    const opcaoPessoa2 = brinquedosPessoa2.split(',');
    const arrayAnimaisEscolhidos = ordemAnimais.split(',');
    const brinquedosValidos = this.animais.flatMap(a => a.brinquedos);
    let lista = [];

    const animaisEscolhidos = this.animais.filter(a => arrayAnimaisEscolhidos.includes(a.nome));
    const duplicadoBrinquedo1 = opcaoPessoa1.length !== new Set(opcaoPessoa1).size;
    const duplicadoBrinquedo2 = opcaoPessoa2.length !== new Set(opcaoPessoa2).size;
    const brinquedoInvalido1 = opcaoPessoa1.some(b => !brinquedosValidos.includes(b));
    const brinquedoInvalido2 = opcaoPessoa2.some(b => !brinquedosValidos.includes(b));
    const duplicadoAnimal = new Set(arrayAnimaisEscolhidos).size !== arrayAnimaisEscolhidos.length;
    
    if (animaisEscolhidos.length !== arrayAnimaisEscolhidos.length ||
      duplicadoAnimal) {
      return { erro: 'Animal inválido' };
    } else if (duplicadoBrinquedo1 || duplicadoBrinquedo2 || brinquedoInvalido1 || brinquedoInvalido2) {
      return { erro: 'Brinquedo inválido' };
    }

    this.verificarBrinquedos(opcaoPessoa1, opcaoPessoa2, animaisEscolhidos, lista);
    
    return { lista: lista.sort() }
  }
}

export { AbrigoAnimais as AbrigoAnimais };
