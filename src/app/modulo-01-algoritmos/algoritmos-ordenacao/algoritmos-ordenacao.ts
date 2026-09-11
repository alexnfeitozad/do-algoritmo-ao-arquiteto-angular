import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-algoritmos-ordenacao',
  styleUrl: './algoritmos-ordenacao.scss',
  templateUrl: './algoritmos-ordenacao.html',
})
export class AlgoritmosOrdenacao {
  arrayOriginal: number[] = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 42];
  arrayOrdenado: number[] = [];
  algoritmoSelecionado: string = 'bubble';
  tempoExecucao: number = 0;
  iteracoes: number = 0;
  tamanhoArray: number = 11;
  
  // Bubble Sort - O(n²)
  bubbleSort(arr: number[]): number[] {
    const array = [...arr];
    const n = array.length;
    let trocas = 0;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          trocas++;
        }
      }
    }
    
    this.iteracoes = trocas;
    return array;
  }
  
  // Selection Sort - O(n²)
  selectionSort(arr: number[]): number[] {
    const array = [...arr];
    const n = array.length;
    let iteracoes = 0;
    
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
        iteracoes++;
      }
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }
    
    this.iteracoes = iteracoes;
    return array;
  }
  
  // Insertion Sort - O(n²)
  insertionSort(arr: number[]): number[] {
    const array = [...arr];
    const n = array.length;
    let iteracoes = 0;
    
    for (let i = 1; i < n; i++) {
      let key = array[i];
      let j = i - 1;
      
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j--;
        iteracoes++;
      }
      array[j + 1] = key;
    }
    
    this.iteracoes = iteracoes;
    return array;
  }
  
  // Merge Sort - O(n log n)
  mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
      return arr;
    }
    
    const mid = Math.floor(arr.length / 2);
    const left = this.mergeSort(arr.slice(0, mid));
    const right = this.mergeSort(arr.slice(mid));
    
    return this.merge(left, right);
  }
  
  private merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let leftIdx = 0;
    let rightIdx = 0;
    
    while (leftIdx < left.length && rightIdx < right.length) {
      if (left[leftIdx] < right[rightIdx]) {
        result.push(left[leftIdx]);
        leftIdx++;
      } else {
        result.push(right[rightIdx]);
        rightIdx++;
      }
      this.iteracoes++;
    }
    
    return result.concat(left.slice(leftIdx)).concat(right.slice(rightIdx));
  }
  
  // Quick Sort - O(n log n) médio, O(n²) pior caso
  quickSort(arr: number[]): number[] {
    if (arr.length <= 1) {
      return arr;
    }
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    this.iteracoes += arr.length;
    
    return [...this.quickSort(left), ...middle, ...this.quickSort(right)];
  }
  
  // Executar algoritmo selecionado
  executarOrdenacao(): void {
    this.iteracoes = 0;
    const inicio = performance.now();
    
    switch (this.algoritmoSelecionado) {
      case 'bubble':
        this.arrayOrdenado = this.bubbleSort(this.arrayOriginal);
        break;
      case 'selection':
        this.arrayOrdenado = this.selectionSort(this.arrayOriginal);
        break;
      case 'insertion':
        this.arrayOrdenado = this.insertionSort(this.arrayOriginal);
        break;
      case 'merge':
        this.arrayOrdenado = this.mergeSort(this.arrayOriginal);
        break;
      case 'quick':
        this.arrayOrdenado = this.quickSort(this.arrayOriginal);
        break;
      default:
        this.arrayOrdenado = [...this.arrayOriginal];
    }
    
    const fim = performance.now();
    this.tempoExecucao = fim - inicio;
  }
  
  // Gerar array aleatório
  gerarArrayAleatorio(tamanho: number = 10): void {
    this.arrayOriginal = Array.from({ length: tamanho }, () => 
      Math.floor(Math.random() * 100) + 1
    );
    this.arrayOrdenado = [];
    this.tempoExecucao = 0;
    this.iteracoes = 0;
  }
  
  // Comparar complexidade
  getComplexidade(algoritmo: string): string {
    const complexidades: Record<string, string> = {
      bubble: 'O(n²)',
      selection: 'O(n²)',
      insertion: 'O(n²)',
      merge: 'O(n log n)',
      quick: 'O(n log n) médio, O(n²) pior caso'
    };
    return complexidades[algoritmo] || 'N/A';
  }
  
  // Descrição do algoritmo
  getDescricao(algoritmo: string): string {
    const descricoes: Record<string, string> = {
      bubble: 'Compara elementos adjacentes e os troca se estiverem na ordem errada. Repete até que não haja mais trocas necessárias.',
      selection: 'Encontra o menor elemento e o move para a posição correta. Repete para cada posição.',
      insertion: 'Constrói o array ordenado um elemento por vez, inserindo cada elemento na posição correta.',
      merge: 'Divide o array ao meio recursivamente, ordena cada metade e combina as metades ordenadas.',
      quick: 'Escolhe um pivô, particiona o array em torno do pivô e ordena recursivamente as partições.'
    };
    return descricoes[algoritmo] || '';
  }
}
