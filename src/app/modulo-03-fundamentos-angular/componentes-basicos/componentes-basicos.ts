import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-componentes-basicos',
  styleUrl: './componentes-basicos.scss',
  templateUrl: './componentes-basicos.html',
})
export class ComponentesBasicos {
  // Propriedades do componente
  titulo: string = 'Componentes Básicos Angular';
  subtitulo: string = 'Módulo 3: Fundamentos Angular';
  
  // Dados para demonstração
  usuario = {
    nome: 'João Silva',
    email: 'joao@email.com',
    idade: 30,
    ativo: true
  };
  
  // Lista de tarefas
  tarefas: string[] = ['Aprender Angular', 'Praticar TypeScript', 'Construir projetos'];
  
  // Estado do componente
  contador: number = 0;
  mostrarDetalhes: boolean = false;
  
  // Propriedades para input
  nomeInput: string = '';
  
  // Propriedades computadas
  get tarefasCount(): number {
    return this.tarefas.length;
  }
  
  get usuarioStatus(): string {
    return this.usuario.ativo ? 'Ativo' : 'Inativo';
  }
  
  // Métodos do componente
  incrementar(): void {
    this.contador++;
  }
  
  decrementar(): void {
    if (this.contador > 0) {
      this.contador--;
    }
  }
  
  toggleDetalhes(): void {
    this.mostrarDetalhes = !this.mostrarDetalhes;
  }
  
  adicionarTarefa(): void {
    if (this.nomeInput.trim()) {
      this.tarefas.push(this.nomeInput);
      this.nomeInput = '';
    }
  }
  
  removerTarefa(index: number): void {
    this.tarefas.splice(index, 1);
  }
  
  // Ciclo de vida do componente
  ngOnInit(): void {
    console.log('Componente inicializado - ngOnInit');
    this.logCicloDeVida('ngOnInit');
  }
  
  ngDoCheck(): void {
    // Chamado durante cada detecção de mudança
    // Cuidado: pode impactar performance se usado incorretamente
  }
  
  ngAfterContentInit(): void {
    console.log('Conteúdo do componente inicializado - ngAfterContentInit');
  }
  
  ngAfterViewInit(): void {
    console.log('View do componente inicializada - ngAfterViewInit');
  }
  
  ngOnDestroy(): void {
    console.log('Componente será destruído - ngOnDestroy');
  }
  
  // Método auxiliar para demonstração
  logCicloDeVida(hook: string): void {
    console.log(`Hook de ciclo de vida executado: ${hook}`);
  }
  
  // Informações sobre a estrutura do componente
  get componentInfo() {
    return {
      selector: 'app-componentes-basicos',
      templateUrl: './componentes-basicos.html',
      styleUrl: './componentes-basicos.scss',
      imports: ['CommonModule'],
      properties: ['titulo', 'subtitulo', 'usuario', 'tarefas', 'contador'],
      methods: ['incrementar', 'decrementar', 'toggleDetalhes', 'adicionarTarefa']
    };
  }
}
