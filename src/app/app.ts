import { Component, signal, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CursoModulo {
  id: string;
  title: string;
  icon: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Master';
  description: string;
}

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('do-algoritmo-ao-arquiteto-angular');
  searchTerm = signal('');
  mobileMenuOpen = signal(false);

  readonly modules: CursoModulo[] = [
    { id: 'modulo-01-algoritmos', title: 'Módulo 1: Algoritmos', icon: '🧮', level: 'Iniciante', description: 'Estruturas de dados, ordenação e busca' },
    { id: 'modulo-02-typescript', title: 'Módulo 2: TypeScript', icon: '📘', level: 'Iniciante', description: 'Tipagem avançada e POO moderna' },
    { id: 'modulo-03-fundamentos-angular', title: 'Módulo 3: Fundamentos Angular', icon: '🅰️', level: 'Iniciante', description: 'Componentes, templates e data binding' },
    { id: 'modulo-04-componentes-diretivas', title: 'Módulo 4: Componentes & Diretivas', icon: '🧩', level: 'Intermediário', description: 'Comunicação, lifecycle e diretivas custom' },
    { id: 'modulo-05-services-di', title: 'Módulo 5: Services e DI', icon: '⚙️', level: 'Intermediário', description: 'Injeção de dependências e singletons' },
    { id: 'modulo-06-http-apis', title: 'Módulo 6: HTTP e APIs', icon: '🌐', level: 'Intermediário', description: 'HttpClient, interceptors e tratamento de erros' },
    { id: 'modulo-07-reactive-forms', title: 'Módulo 7: Reactive Forms', icon: '📝', level: 'Intermediário', description: 'FormGroup, FormArray e validações custom' },
    { id: 'modulo-08-routing', title: 'Módulo 8: Routing e Navegação', icon: '🧭', level: 'Intermediário', description: 'Rotas dinâmicas, guards e parâmetros' },
    { id: 'modulo-09-rxjs', title: 'Módulo 9: RxJS Reativo', icon: '♻️', level: 'Avançado', description: 'Observables, operadores e programação reativa' },
    { id: 'modulo-10-state-management', title: 'Módulo 10: State Management', icon: '🗄️', level: 'Avançado', description: 'Angular Signals, computeds e stores reativas' },
    { id: 'modulo-11-testing', title: 'Módulo 11: Testes Unitários', icon: '🧪', level: 'Avançado', description: 'Testes de components, services e mocks' },
    { id: 'modulo-12-performance', title: 'Módulo 12: Performance', icon: '⚡', level: 'Avançado', description: 'OnPush, deferrable views e otimizações' },
    { id: 'modulo-13-patterns', title: 'Módulo 13: Design Patterns & SOLID', icon: '🎨', level: 'Avançado', description: 'Padrões de projeto e clean architecture' },
    { id: 'modulo-14-projeto-final', title: 'Módulo 14: Projeto Integrador', icon: '🚀', level: 'Master', description: 'Aplicação SPA completa production-ready' }
  ];

  filteredModules = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.modules;
    return this.modules.filter(m => 
      m.title.toLowerCase().includes(term) ||
      m.description.toLowerCase().includes(term) ||
      m.level.toLowerCase().includes(term)
    );
  });

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
