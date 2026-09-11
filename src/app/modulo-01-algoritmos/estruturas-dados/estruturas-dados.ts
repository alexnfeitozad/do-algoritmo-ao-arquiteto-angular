import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface LinkedListNode {
  value: string | number;
  id: number;
}

@Component({
  selector: 'app-estruturas-dados',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  styleUrl: './estruturas-dados.scss',
  templateUrl: './estruturas-dados.html',
})
export class EstruturasDados {
  // 1. Arrays Interativos
  arrayItems = signal<number[]>([10, 25, 42, 8, 99]);
  novoNumeroArray: number = 55;
  arrayLog = signal<string>('Array inicializado com 5 elementos.');

  // 2. Pilha (Stack - LIFO)
  pilha = signal<number[]>([10, 20, 30]);
  novoValorPilha: number = 40;
  pilhaLog = signal<string>('Pilha com 3 itens. O topo é o 30.');

  // 3. Fila (Queue - FIFO)
  fila = signal<string[]>(['Ana', 'Bruno', 'Carlos']);
  novoNomeFila: string = 'Daniela';
  filaLog = signal<string>('Fila com 3 pessoas. A próxima a ser atendida é Ana.');

  // 4. Lista Encadeada (Linked List)
  linkedList = signal<LinkedListNode[]>([
    { id: 1, value: 'Header (Início)' },
    { id: 2, value: 'Payload A' },
    { id: 3, value: 'Payload B' }
  ]);
  novoValorNode: string = 'Novo Nó';
  linkedListLog = signal<string>('Lista encadeada com 3 nós encadeados por ponteiros.');

  // 5. Sets & Maps
  uniqueSet = signal<number[]>([1, 2, 3, 4]);
  novoItemSet: number = 2;
  setFeedback = signal<string>('Tente adicionar o número 2 novamente para ver o Set rejeitar a duplicação!');

  // Map
  mapEntries = signal<{ chave: string; valor: string }[]>([
    { chave: 'user:1', valor: 'Alex Feitoza' },
    { chave: 'user:2', valor: 'Maria Santos' }
  ]);
  novaChaveMap: string = 'user:3';
  novoValorMap: string = 'Pedro Rocha';

  // Métodos de Array
  arrayPush(): void {
    if (this.novoNumeroArray !== null && this.novoNumeroArray !== undefined) {
      this.arrayItems.update(items => [...items, this.novoNumeroArray]);
      this.arrayLog.set(`push(${this.novoNumeroArray}): Adicionado ao FINAL com complexidade O(1).`);
      this.novoNumeroArray = Math.floor(Math.random() * 90) + 10;
    }
  }

  arrayPop(): void {
    if (this.arrayItems().length === 0) {
      this.arrayLog.set('Array já está vazio!');
      return;
    }
    const removed = this.arrayItems()[this.arrayItems().length - 1];
    this.arrayItems.update(items => items.slice(0, -1));
    this.arrayLog.set(`pop(): Removido ${removed} do FINAL com complexidade O(1).`);
  }

  arrayUnshift(): void {
    if (this.novoNumeroArray !== null && this.novoNumeroArray !== undefined) {
      this.arrayItems.update(items => [this.novoNumeroArray, ...items]);
      this.arrayLog.set(`unshift(${this.novoNumeroArray}): Adicionado no INÍCIO. Requer reindexar todos os elementos: complexidade O(n).`);
      this.novoNumeroArray = Math.floor(Math.random() * 90) + 10;
    }
  }

  arrayShift(): void {
    if (this.arrayItems().length === 0) {
      this.arrayLog.set('Array já está vazio!');
      return;
    }
    const removed = this.arrayItems()[0];
    this.arrayItems.update(items => items.slice(1));
    this.arrayLog.set(`shift(): Removido ${removed} do INÍCIO. Reindexa toda a memória: complexidade O(n).`);
  }

  arrayMapDobro(): void {
    this.arrayItems.update(items => items.map(n => n * 2));
    this.arrayLog.set('map(n => n * 2): Transformou cada elemento no seu dobro.');
  }

  arrayFilterPares(): void {
    this.arrayItems.update(items => items.filter(n => n % 2 === 0));
    this.arrayLog.set('filter(n => n % 2 === 0): Manteve apenas os números pares.');
  }

  // Métodos de Pilha (LIFO)
  adicionarPilha(): void {
    if (this.novoValorPilha !== null && this.novoValorPilha !== undefined) {
      this.pilha.update(p => [...p, this.novoValorPilha]);
      this.pilhaLog.set(`Push: ${this.novoValorPilha} empilhado no topo. LIFO (Last In, First Out).`);
      this.novoValorPilha = Math.floor(Math.random() * 80) + 10;
    }
  }

  removerPilha(): void {
    if (this.pilha().length === 0) {
      this.pilhaLog.set('A pilha está vazia (Stack Underflow)!');
      return;
    }
    const popVal = this.pilha()[this.pilha().length - 1];
    this.pilha.update(p => p.slice(0, -1));
    this.pilhaLog.set(`Pop: ${popVal} foi desempilhado do topo!`);
  }

  // Métodos de Fila (FIFO)
  adicionarFila(): void {
    if (this.novoNomeFila.trim()) {
      this.fila.update(f => [...f, this.novoNomeFila.trim()]);
      this.filaLog.set(`Enqueue: ${this.novoNomeFila} entrou no FINAL da fila.`);
      this.novoNomeFila = '';
    }
  }

  removerFila(): void {
    if (this.fila().length === 0) {
      this.filaLog.set('Fila vazia! Ninguém aguardando atendimento.');
      return;
    }
    const atendido = this.fila()[0];
    this.fila.update(f => f.slice(1));
    this.filaLog.set(`Dequeue: ${atendido} foi atendido(a) e saiu do INÍCIO da fila. FIFO (First In, First Out).`);
  }

  // Métodos de Lista Encadeada
  adicionarNode(): void {
    if (this.novoValorNode.trim()) {
      const newNode: LinkedListNode = {
        id: Date.now(),
        value: this.novoValorNode.trim()
      };
      this.linkedList.update(list => [...list, newNode]);
      this.linkedListLog.set(`Novo nó "${newNode.value}" encadeado apontando para o próximo.`);
      this.novoValorNode = 'Nó ' + (this.linkedList().length + 1);
    }
  }

  removerNode(id: number): void {
    this.linkedList.update(list => list.filter(n => n.id !== id));
    this.linkedListLog.set('Nó removido! O nó anterior agora aponta diretamente para o seguinte.');
  }

  // Métodos de Set
  adicionarSet(): void {
    const current = this.uniqueSet();
    if (current.includes(this.novoItemSet)) {
      this.setFeedback.set(`❌ O número ${this.novoItemSet} JÁ EXISTE no Set! O Set rejeitou a duplicata automaticamente.`);
    } else {
      this.uniqueSet.update(s => [...s, this.novoItemSet]);
      this.setFeedback.set(`✅ Número ${this.novoItemSet} adicionado com sucesso! Sets mantêm valores únicos.`);
    }
  }

  // Métodos de Map
  adicionarMap(): void {
    if (this.novaChaveMap && this.novoValorMap) {
      this.mapEntries.update(entries => {
        const filtered = entries.filter(e => e.chave !== this.novaChaveMap);
        return [...filtered, { chave: this.novaChaveMap, valor: this.novoValorMap }];
      });
      this.novaChaveMap = '';
      this.novoValorMap = '';
    }
  }
}
