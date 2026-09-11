import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChildCardComponent } from './child-card.component';
import { HighlightDirective } from '../highlight.directive';

@Component({
  imports: [CommonModule, FormsModule, RouterLink, ChildCardComponent, HighlightDirective],
  selector: 'app-componentes-avancados',
  styleUrl: './componentes-avancados.scss',
  templateUrl: './componentes-avancados.html',
})
export class ComponentesAvancados implements OnInit, OnChanges, OnDestroy {
  // Comunicação @Input e @Output
  contadorPai: number = 5;
  tituloFilho: string = 'Estatística de Engajamento';
  ultimaAcaoRecebida: string = 'Nenhuma ação recebida ainda.';
  totalAcoesFilho: number = 0;

  // Diretivas Estruturais
  mostrarPainel: boolean = true;
  abaSelecionada: 'if' | 'for' | 'switch' = 'if';
  frameworks = [
    { nome: 'Angular', status: 'Ativo', versao: '19+', rating: 5 },
    { nome: 'TypeScript', status: 'Ativo', versao: '5.5', rating: 5 },
    { nome: 'RxJS', status: 'Ativo', versao: '7.8', rating: 4 },
    { nome: 'NgRx / Signals', status: 'Beta/Prod', versao: 'Modern', rating: 4.8 }
  ];
  novoFrameworkNome: string = '';

  // Diretiva Customizada
  corDestaque: string = '#bfdbfe'; // Azul suave
  coresDisponiveis = [
    { nome: 'Azul Pastel', hex: '#bfdbfe' },
    { nome: 'Verde Menta', hex: '#bbf7d0' },
    { nome: 'Amarelo Sol', hex: '#fef08a' },
    { nome: 'Rosa Suave', hex: '#fbcfe8' }
  ];

  // Logs do Ciclo de Vida
  lifecycleLogs: string[] = [];

  ngOnInit(): void {
    this.registrarLog('1. ngOnInit: Componente pai inicializado com sucesso.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.registrarLog('ngOnChanges executado: propriedades alteradas.');
  }

  ngOnDestroy(): void {
    this.registrarLog('ngOnDestroy: Componente destruído.');
  }

  incrementarPai(): void {
    this.contadorPai++;
  }

  decrementarPai(): void {
    if (this.contadorPai > 0) this.contadorPai--;
  }

  onAcaoRecebidaDoFilho(event: { tipo: string; count: number }): void {
    this.totalAcoesFilho++;
    this.ultimaAcaoRecebida = `Ação "${event.tipo}" disparada pelo filho com contador = ${event.count} (Total: ${this.totalAcoesFilho})`;
    this.registrarLog(`Evento @Output capturado: ${this.ultimaAcaoRecebida}`);
  }

  adicionarFramework(): void {
    if (this.novoFrameworkNome.trim()) {
      this.frameworks.push({
        nome: this.novoFrameworkNome.trim(),
        status: 'Ativo',
        versao: '1.0',
        rating: 5
      });
      this.novoFrameworkNome = '';
    }
  }

  removerFramework(index: number): void {
    this.frameworks.splice(index, 1);
  }

  registrarLog(msg: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.lifecycleLogs.unshift(`[${timestamp}] ${msg}`);
    if (this.lifecycleLogs.length > 8) this.lifecycleLogs.pop();
  }

  limparLogs(): void {
    this.lifecycleLogs = [];
  }
}
