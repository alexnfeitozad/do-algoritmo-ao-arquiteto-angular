import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface ModuleCard {
  id: string;
  number: string;
  phase: 1 | 2 | 3;
  phaseName: string;
  title: string;
  shortDesc: string;
  icon: string;
  tags: string[];
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  selectedPhase = signal<'all' | 1 | 2 | 3>('all');
  activeComparisonTab = signal<'common' | 'architect'>('architect');

  readonly stats = [
    { label: 'Módulos Práticos', value: '14', detail: 'Do zero à produção' },
    { label: 'Testes Automatizados', value: '31/31', detail: 'Vitest & TestBed (100% pass)' },
    { label: 'Pilares de Engenharia', value: '3 Fases', detail: 'Lógica, Framework & Arquitetura' },
    { label: 'Reatividade Moderna', value: 'Signals', detail: 'Angular 19+ sem boilerplate' },
  ];

  readonly phases = [
    {
      id: 1 as const,
      num: '01',
      title: 'A Base Lógica (O Algoritmo)',
      subtitle: 'Módulos 01 ao 03',
      icon: '🧠',
      color: '#6366f1',
      desc: 'Fundamentos de ciência da computação: estruturas de dados na memória, pilhas, filas, buscas, ordenações, tipagem estrita com TypeScript e ciclo de vida.',
      highlights: ['Estruturas de Dados na memória', 'Busca Binária & QuickSort', 'Generics & Conditional Types']
    },
    {
      id: 2 as const,
      num: '02',
      title: 'O Ecossistema Reativo (O Framework)',
      subtitle: 'Módulos 04 ao 10',
      icon: '⚡',
      color: '#ec4899',
      desc: 'O domínio do Angular moderno: DI avançada com inject(), diretivas customizadas, HTTP resiliente com retry, Reactive Forms dinâmicos, RxJS e Signals.',
      highlights: ['Injeção com inject()', 'RxJS vs Signals', 'Formulários dinâmicos complexos']
    },
    {
      id: 3 as const,
      num: '03',
      title: 'O Nível Arquiteto (Engenharia & Escala)',
      subtitle: 'Módulos 11 ao 14',
      icon: '🏛️',
      color: '#10b981',
      desc: 'O diferencial dos desenvolvedores de elite: testes com Vitest, ChangeDetection OnPush, renderização diferida com @defer, princípios SOLID e o Projeto Final.',
      highlights: ['Vitest & Mocking', 'ChangeDetection OnPush & @defer', 'SOLID & Clean Architecture']
    },
  ];

  readonly modules: ModuleCard[] = [
    {
      id: 'modulo-01-algoritmos',
      number: '01',
      phase: 1,
      phaseName: 'Fase 1: Base Lógica',
      title: 'Algoritmos e Estruturas de Dados',
      shortDesc: 'Pilhas, Filas, Listas Encadeadas, buscas e ordenações com simulador em tempo real.',
      icon: '🔢',
      tags: ['Pilhas & Filas', 'QuickSort', 'Busca Binária'],
      level: 'Iniciante'
    },
    {
      id: 'modulo-02-typescript',
      number: '02',
      phase: 1,
      phaseName: 'Fase 1: Base Lógica',
      title: 'TypeScript Avançado & POO',
      shortDesc: 'Generics, Mapped Types, Utility Types e POO com polimorfismo, interfaces e herança.',
      icon: '🔷',
      tags: ['Generics', 'Mapped Types', 'POO Estrita'],
      level: 'Iniciante'
    },
    {
      id: 'modulo-03-fundamentos-angular',
      number: '03',
      phase: 1,
      phaseName: 'Fase 1: Base Lógica',
      title: 'Fundamentos do Angular',
      shortDesc: 'Sintaxe moderna, Data Binding bidirecional e todos os hooks do ciclo de vida.',
      icon: '🅰️',
      tags: ['Data Binding', 'Lifecycle', 'Template Syntax'],
      level: 'Iniciante'
    },
    {
      id: 'modulo-04-componentes-diretivas',
      number: '04',
      phase: 2,
      phaseName: 'Fase 2: Ecossistema',
      title: 'Componentes e Diretivas Avançadas',
      shortDesc: 'Diretiva customizada appHighlight, @Input/@Output e projeção <ng-content>.',
      icon: '🧩',
      tags: ['@Input/@Output', 'ng-content', 'Diretivas'],
      level: 'Intermediário'
    },
    {
      id: 'modulo-05-services-di',
      number: '05',
      phase: 2,
      phaseName: 'Fase 2: Ecossistema',
      title: 'Services e Injeção de Dependência',
      shortDesc: 'Injeção moderna com a função inject(), escopos e estado reativo isolado.',
      icon: '💉',
      tags: ['inject()', 'providedIn: root', 'Singleton'],
      level: 'Intermediário'
    },
    {
      id: 'modulo-06-http-apis',
      number: '06',
      phase: 2,
      phaseName: 'Fase 2: Ecossistema',
      title: 'HTTP Client e Integração de APIs',
      shortDesc: 'CRUD completo com HttpClient, retry logic, tratamento de erros e fallback mock.',
      icon: '🌐',
      tags: ['HttpClient', 'Retry', 'CatchError'],
      level: 'Intermediário'
    },
    {
      id: 'modulo-07-reactive-forms',
      number: '07',
      phase: 2,
      phaseName: 'Fase 2: Ecossistema',
      title: 'Formulários Reativos Avançados',
      shortDesc: 'FormGroup, FormArray dinâmico de tags/skills e validadores síncronos customizados.',
      icon: '📝',
      tags: ['FormGroup', 'FormArray', 'Validadores'],
      level: 'Intermediário'
    },
    {
      id: 'modulo-08-routing',
      number: '08',
      phase: 2,
      phaseName: 'Fase 2: Ecossistema',
      title: 'Roteamento Avançado e Guards',
      shortDesc: 'Route Params, Query Params e simulador de Guards funcionais CanActivate/CanDeactivate.',
      icon: '🗺️',
      tags: ['Guards', 'Query Params', 'Lazy Routes'],
      level: 'Intermediário'
    },
    {
      id: 'modulo-09-rxjs',
      number: '09',
      phase: 2,
      phaseName: 'Fase 2: Ecossistema',
      title: 'Programação Reativa com RxJS',
      shortDesc: 'debounceTime, switchMap, BehaviorSubject e monitor de stream de mármore.',
      icon: '🔄',
      tags: ['switchMap', 'BehaviorSubject', 'Streams'],
      level: 'Avançado'
    },
    {
      id: 'modulo-10-state-management',
      number: '10',
      phase: 2,
      phaseName: 'Fase 2: Ecossistema',
      title: 'State Management com Signals',
      shortDesc: 'signal(), computed(), effect() e mini-store de carrinho de compras sem boilerplate.',
      icon: '📡',
      tags: ['Signals', 'computed()', 'effect()'],
      level: 'Avançado'
    },
    {
      id: 'modulo-11-testing',
      number: '11',
      phase: 3,
      phaseName: 'Fase 3: Nível Arquiteto',
      title: 'Testes Unitários e Integração',
      shortDesc: 'Testes automatizados com Vitest e TestBed, spies, mocks e pipeline interativa.',
      icon: '🧪',
      tags: ['Vitest', 'TestBed', 'Unit Tests'],
      level: 'Avançado'
    },
    {
      id: 'modulo-12-performance',
      number: '12',
      phase: 3,
      phaseName: 'Fase 3: Nível Arquiteto',
      title: 'Performance e Otimização',
      shortDesc: 'OnPush, blocos de renderização diferida @defer (on interaction; prefetch on hover).',
      icon: '⚡',
      tags: ['OnPush', '@defer', 'TrackBy'],
      level: 'Avançado'
    },
    {
      id: 'modulo-13-patterns',
      number: '13',
      phase: 3,
      phaseName: 'Fase 3: Nível Arquiteto',
      title: 'Design Patterns e Princípios SOLID',
      shortDesc: 'Padrão Strategy de pagamentos, 5 princípios SOLID detalhados e Clean Architecture.',
      icon: '🏗️',
      tags: ['Strategy Pattern', 'SOLID', 'Clean Arch'],
      level: 'Avançado'
    },
    {
      id: 'modulo-14-projeto-final',
      number: '14',
      phase: 3,
      phaseName: 'Fase 3: Nível Arquiteto',
      title: 'Projeto Integrador: DevLearn Pro',
      shortDesc: 'Plataforma completa conectando Signals, Forms, Modais, KPIs, filtros e toasts.',
      icon: '🏆',
      tags: ['Signals Store', 'CRUD Integrado', 'KPIs'],
      level: 'Avançado'
    },
  ];

  filteredModules = computed(() => {
    const phase = this.selectedPhase();
    if (phase === 'all') return this.modules;
    return this.modules.filter(m => m.phase === phase);
  });

  setPhase(phase: 'all' | 1 | 2 | 3) {
    this.selectedPhase.set(phase);
  }
}
