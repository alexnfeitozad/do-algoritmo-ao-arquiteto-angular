import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-algoritmos-busca',
  styleUrl: './algoritmos-busca.scss',
  templateUrl: './algoritmos-busca.html',
})
export class AlgoritmosBusca {
  arrayOrdenado: number[] = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
  valorBusca: number = 23;
  resultado: string = '';
  indiceEncontrado: number = -1;
  iteracoes: number = 0;
  tempoExecucao: number = 0;
  algoritmoSelecionado: string = 'linear';
  tamanhoArray: number = 10;
  
  getDescricaoAlgoritmo(algoritmo: string): string {
    const nomes: Record<string, string> = {
      linear: 'Busca Linear',
      binaria: 'Busca Binária',
      'binaria-recursiva': 'Busca Binária Recursiva',
      jump: 'Jump Search'
    };
    return nomes[algoritmo] || algoritmo;
  }
  
  // Busca Linear - O(n)
  buscaLinear(arr: number[], valor: number): number {
    for (let i = 0; i < arr.length; i++) {
      this.iteracoes++;
      if (arr[i] === valor) {
        return i;
      }
    }
    return -1;
  }
  
  // Busca Binária - O(log n)
  buscaBinaria(arr: number[], valor: number): number {
    let esquerda = 0;
    let direita = arr.length - 1;
    
    while (esquerda <= direita) {
      this.iteracoes++;
      const meio = Math.floor((esquerda + direita) / 2);
      
      if (arr[meio] === valor) {
        return meio;
      } else if (arr[meio] < valor) {
        esquerda = meio + 1;
      } else {
        direita = meio - 1;
      }
    }
    
    return -1;
  }
  
  // Busca Binária Recursiva
  buscaBinariaRecursiva(arr: number[], valor: number, esquerda: number = 0, direita: number = arr.length - 1): number {
    if (esquerda > direita) {
      return -1;
    }
    
    this.iteracoes++;
    const meio = Math.floor((esquerda + direita) / 2);
    
    if (arr[meio] === valor) {
      return meio;
    } else if (arr[meio] < valor) {
      return this.buscaBinariaRecursiva(arr, valor, meio + 1, direita);
    } else {
      return this.buscaBinariaRecursiva(arr, valor, esquerda, meio - 1);
    }
  }
  
  // Jump Search - O(√n)
  jumpSearch(arr: number[], valor: number): number {
    const n = arr.length;
    const passo = Math.floor(Math.sqrt(n));
    let prev = 0;
    let atual = passo;
    
    // Encontrar o bloco onde o elemento pode estar
    while (arr[Math.min(atual, n) - 1] < valor) {
      this.iteracoes++;
      prev = atual;
      atual += passo;
      
      if (prev >= n) {
        return -1;
      }
    }
    
    // Busca linear no bloco encontrado
    while (arr[prev] < valor) {
      this.iteracoes++;
      prev++;
      
      if (prev === Math.min(atual, n)) {
        return -1;
      }
    }
    
    if (arr[prev] === valor) {
      return prev;
    }
    
    return -1;
  }
  
  // Executar busca
  executarBusca(): void {
    this.iteracoes = 0;
    const inicio = performance.now();
    
    switch (this.algoritmoSelecionado) {
      case 'linear':
        this.indiceEncontrado = this.buscaLinear(this.arrayOrdenado, this.valorBusca);
        break;
      case 'binaria':
        this.indiceEncontrado = this.buscaBinaria(this.arrayOrdenado, this.valorBusca);
        break;
      case 'binaria-recursiva':
        this.indiceEncontrado = this.buscaBinariaRecursiva(this.arrayOrdenado, this.valorBusca);
        break;
      case 'jump':
        this.indiceEncontrado = this.jumpSearch(this.arrayOrdenado, this.valorBusca);
        break;
      default:
        this.indiceEncontrado = -1;
    }
    
    const fim = performance.now();
    this.tempoExecucao = fim - inicio;
    
    if (this.indiceEncontrado !== -1) {
      this.resultado = `Valor ${this.valorBusca} encontrado no índice ${this.indiceEncontrado}`;
    } else {
      this.resultado = `Valor ${this.valorBusca} não encontrado no array`;
    }
  }
  
  // Gerar array ordenado aleatório
  gerarArrayOrdenado(tamanho: number = 10): void {
    const array = Array.from({ length: tamanho }, () => 
      Math.floor(Math.random() * 100) + 1
    );
    this.arrayOrdenado = array.sort((a, b) => a - b);
    this.resultado = '';
    this.indiceEncontrado = -1;
    this.iteracoes = 0;
    this.tempoExecucao = 0;
  }
  
  // Obter complexidade
  getComplexidade(algoritmo: string): string {
    const complexidades: Record<string, string> = {
      linear: 'O(n)',
      binaria: 'O(log n)',
      'binaria-recursiva': 'O(log n)',
      jump: 'O(√n)'
    };
    return complexidades[algoritmo] || 'N/A';
  }
  
  // Obter descrição
  getDescricao(algoritmo: string): string {
    const descricoes: Record<string, string> = {
      linear: 'Percorre o array elemento por elemento até encontrar o valor desejado. Funciona em arrays ordenados e não ordenados.',
      binaria: 'Divide o array ao meio repetidamente, eliminando metades a cada iteração. Requer array ordenado.',
      'binaria-recursiva': 'Versão recursiva da busca binária. Usa a mesma lógica de divisão, mas com chamadas recursivas.',
      jump: 'Faz "saltos" de tamanho √n no array e depois faz busca linear no bloco provável. Requer array ordenado.'
    };
    return descricoes[algoritmo] || '';
  }
  
  // Highlight do índice encontrado
  getArrayComHighlight(): { valor: number; destacado: boolean }[] {
    return this.arrayOrdenado.map((valor, indice) => ({
      valor,
      destacado: indice === this.indiceEncontrado
    }));
  }

  getCodigoAlgoritmo(algoritmo: string): string {
    const codigos: Record<string, string> = {
      linear: `function buscaLinear(arr: number[], valor: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === valor) return i; // Encontrado
  }
  return -1; // Não encontrado
}`,
      binaria: `function buscaBinaria(arr: number[], valor: number): number {
  let inicio = 0, fim = arr.length - 1;
  while (inicio <= fim) {
    const meio = Math.floor((inicio + fim) / 2);
    if (arr[meio] === valor) return meio;
    if (arr[meio] < valor) inicio = meio + 1;
    else fim = meio - 1;
  }
  return -1;
}`,
      'binaria-recursiva': `function buscaBinariaRecursiva(arr: number[], val: number, ini: number, fim: number): number {
  if (ini > fim) return -1;
  const meio = Math.floor((ini + fim) / 2);
  if (arr[meio] === val) return meio;
  if (arr[meio] < val) return buscaBinariaRecursiva(arr, val, meio + 1, fim);
  return buscaBinariaRecursiva(arr, val, ini, meio - 1);
}`,
      jump: `function jumpSearch(arr: number[], valor: number): number {
  const n = arr.length;
  let salto = Math.floor(Math.sqrt(n));
  let prev = 0;
  while (arr[Math.min(salto, n) - 1] < valor) {
    prev = salto;
    salto += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }
  for (let i = prev; i < Math.min(salto, n); i++) {
    if (arr[i] === valor) return i;
  }
  return -1;
}`
    };
    return codigos[algoritmo] || '// Código não disponível';
  }
}
