import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-estruturas-dados',
  styleUrl: './estruturas-dados.scss',
  templateUrl: './estruturas-dados.html',
})
export class EstruturasDados {
  novoValorPilha: number = 0;
  novoValorFila: number = 0;
  // Arrays - Estrutura de dados básica
  numeros: number[] = [5, 2, 8, 1, 9, 3, 7, 4, 6];
  frutas: string[] = ['maçã', 'banana', 'laranja', 'uva'];
  
  // Objetos - Estrutura chave-valor
  pessoa = {
    nome: 'João Silva',
    idade: 30,
    profissao: 'Desenvolvedor',
    habilidades: ['JavaScript', 'TypeScript', 'Angular']
  };
  
  // Sets - Coleção de valores únicos
  numerosUnicos = new Set([1, 2, 3, 2, 1, 4, 5, 3]);
  
  // Maps - Estrutura chave-valor com qualquer tipo de chave
  mapaPessoas = new Map([
    ['joao', { idade: 30, cidade: 'São Paulo' }],
    ['maria', { idade: 25, cidade: 'Rio de Janeiro' }],
    ['pedro', { idade: 35, cidade: 'Belo Horizonte' }]
  ]);
  
  // Stack (Pilha) - LIFO (Last In, First Out)
  pilha: number[] = [];
  
  // Queue (Fila) - FIFO (First In, First Out)
  fila: number[] = [];
  
  // Métodos para demonstrar operações
  adicionarPilha(): void {
    if (this.novoValorPilha !== undefined && this.novoValorPilha !== null) {
      this.pilha.push(this.novoValorPilha);
      this.novoValorPilha = 0;
    }
  }
  
  removerPilha(): void {
    this.pilha.pop();
  }
  
  adicionarFila(): void {
    if (this.novoValorFila !== undefined && this.novoValorFila !== null) {
      this.fila.push(this.novoValorFila);
      this.novoValorFila = 0;
    }
  }
  
  removerFila(): void {
    this.fila.shift();
  }
  
  // Exemplo de array com métodos
  manipularArrays(): void {
    const novoArray = [...this.numeros];
    novoArray.sort((a, b) => a - b);
    console.log('Array ordenado:', novoArray);
    
    const arrayFiltrado = this.numeros.filter(n => n > 5);
    console.log('Números maiores que 5:', arrayFiltrado);
    
    const arrayMapeado = this.numeros.map(n => n * 2);
    console.log('Números dobrados:', arrayMapeado);
    
    const soma = this.numeros.reduce((acc, curr) => acc + curr, 0);
    console.log('Soma total:', soma);
  }
  
  // Exemplo de manipulação de objetos
  manipularObjetos(): void {
    const { nome, idade } = this.pessoa;
    console.log('Nome:', nome, 'Idade:', idade);
    
    const novaPessoa = { ...this.pessoa, idade: 31 };
    console.log('Nova pessoa:', novaPessoa);
  }
  
  // Exemplo de manipulação de Sets
  manipularSets(): void {
    this.numerosUnicos.add(6);
    this.numerosUnicos.add(7);
    console.log('Set após adicionar:', this.numerosUnicos);
    
    const temCinco = this.numerosUnicos.has(5);
    console.log('Contém 5?', temCinco);
  }
  
  // Exemplo de manipulação de Maps
  manipularMaps(): void {
    this.mapaPessoas.set('ana', { idade: 28, cidade: 'Curitiba' });
    console.log('Map após adicionar:', this.mapaPessoas);
    
    const dadosJoao = this.mapaPessoas.get('joao');
    console.log('Dados do João:', dadosJoao);
  }
}
