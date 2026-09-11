import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface TesteItem {
  id: string;
  nome: string;
  categoria: 'Component' | 'Service' | 'Signal' | 'Async';
  status: 'pendente' | 'executando' | 'passou' | 'falhou';
  duracaoMs: number;
  descricao: string;
}

@Component({
  selector: 'app-testing-demo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './testing-demo.component.html',
  styleUrl: './testing-demo.component.scss'
})
export class TestingDemoComponent {
  testes = signal<TesteItem[]>([
    { 
      id: 't1', 
      nome: 'Component: deve renderizar título e escutar clique no botão', 
      categoria: 'Component', 
      status: 'passou', 
      duracaoMs: 14, 
      descricao: 'Usa fixture.detectChanges() e querySelector para validar o DOM.' 
    },
    { 
      id: 't2', 
      nome: 'Service: deve retornar lista mockada via HttpClientTesting', 
      categoria: 'Service', 
      status: 'passou', 
      duracaoMs: 22, 
      descricao: 'Usa HttpTestingController para interceptar e simular resposta da API.' 
    },
    { 
      id: 't3', 
      nome: 'Signals: deve recalcular valor computed após signal.update()', 
      categoria: 'Signal', 
      status: 'passou', 
      duracaoMs: 6, 
      descricao: 'Testa reatividade pura de signals sem depender de lifecycle de view.' 
    },
    { 
      id: 't4', 
      nome: 'Async: deve aguardar resolução com fakeAsync / tick() ou async/await', 
      categoria: 'Async', 
      status: 'passou', 
      duracaoMs: 35, 
      descricao: 'Testa streams assíncronos e temporizadores controlados.' 
    }
  ]);

  executandoTodos = signal<boolean>(false);
  abaAtiva = signal<'runner' | 'exemplos'>('runner');

  totalPassaram = () => this.testes().filter(t => t.status === 'passou').length;
  totalFalharam = () => this.testes().filter(t => t.status === 'falhou').length;

  executarTodosOsTestes(): void {
    this.executandoTodos.set(true);

    // Reseta status para executando
    this.testes.update(lista => lista.map(t => ({ ...t, status: 'executando' })));

    let index = 0;
    const intervalId = setInterval(() => {
      if (index < this.testes().length) {
        const idAtual = this.testes()[index].id;
        this.testes.update(lista => 
          lista.map(t => t.id === idAtual ? { ...t, status: 'passou', duracaoMs: Math.floor(Math.random() * 25) + 8 } : t)
        );
        index++;
      } else {
        clearInterval(intervalId);
        this.executandoTodos.set(false);
      }
    }, 450);
  }

  simularFalha(id: string): void {
    this.testes.update(lista =>
      lista.map(t => t.id === id ? { ...t, status: t.status === 'falhou' ? 'passou' : 'falhou' } : t)
    );
  }
}
