import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface ProdutoCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

@Component({
  selector: 'app-state-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './state-management.component.html',
  styleUrl: './state-management.component.scss'
})
export class StateManagementComponent {
  // Signals Primitivos
  descontoCupom = signal<number>(10); // 10% de desconto
  cupomAtivo = signal<boolean>(true);

  // Signal de Coleção (Carrinho)
  carrinho = signal<ProdutoCarrinho[]>([
    { id: 1, nome: 'Curso Angular Avançado', preco: 199.90, quantidade: 1 },
    { id: 2, nome: 'E-book TypeScript Patterns', preco: 49.90, quantidade: 2 },
    { id: 3, nome: 'Mentoria 1-on-1 Code Review', preco: 350.00, quantidade: 1 }
  ]);

  // Signal Computado: Subtotal
  subtotal = computed(() => {
    return this.carrinho().reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  });

  // Signal Computado: Valor do Desconto
  valorDesconto = computed(() => {
    if (!this.cupomAtivo()) return 0;
    return (this.subtotal() * this.descontoCupom()) / 100;
  });

  // Signal Computado: Total Final
  totalFinal = computed(() => {
    return Math.max(0, this.subtotal() - this.valorDesconto());
  });

  // Signal Computado: Total de Itens Físicos
  totalItens = computed(() => {
    return this.carrinho().reduce((acc, item) => acc + item.quantidade, 0);
  });

  // Histórico do Effect
  effectLogs = signal<string[]>([]);

  constructor() {
    // Angular Effect: dispara automaticamente sempre que os signals dependentes mudarem
    effect(() => {
      const sub = this.subtotal();
      const total = this.totalFinal();
      const time = new Date().toLocaleTimeString();
      const log = `[${time}] [EFFECT] Estado recalculado: Subtotal: R$ ${sub.toFixed(2)} | Total Final: R$ ${total.toFixed(2)}`;
      
      this.effectLogs.update(logs => [log, ...logs.slice(0, 6)]);
    });
  }

  aumentarQuantidade(id: number): void {
    this.carrinho.update(itens =>
      itens.map(item => item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item)
    );
  }

  diminuirQuantidade(id: number): void {
    this.carrinho.update(itens =>
      itens.map(item => {
        if (item.id === id && item.quantidade > 1) {
          return { ...item, quantidade: item.quantidade - 1 };
        }
        return item;
      })
    );
  }

  removerItem(id: number): void {
    this.carrinho.update(itens => itens.filter(item => item.id !== id));
  }

  adicionarItemExemplo(): void {
    const novoId = Math.max(...this.carrinho().map(i => i.id), 0) + 1;
    this.carrinho.update(itens => [
      ...itens,
      { id: novoId, nome: `Módulo Especial #${novoId}`, preco: 79.90, quantidade: 1 }
    ]);
  }

  toggleCupom(): void {
    this.cupomAtivo.update(ativo => !ativo);
  }

  limparLogs(): void {
    this.effectLogs.set([]);
  }
}
