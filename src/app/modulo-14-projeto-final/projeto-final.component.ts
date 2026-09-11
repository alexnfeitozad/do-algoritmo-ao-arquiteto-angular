import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface CursoItem {
  id: number;
  titulo: string;
  categoria: 'Frontend' | 'Backend' | 'DevOps' | 'Mobile';
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado';
  horas: number;
  avaliacao: number;
  alunosInscritos: number;
  inscrito: boolean;
  concluido: boolean;
}

@Component({
  selector: 'app-projeto-final',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './projeto-final.component.html',
  styleUrl: './projeto-final.component.scss'
})
export class ProjetoFinalComponent implements OnInit {
  // Signals de Estado Global
  cursos = signal<CursoItem[]>([
    {
      id: 1,
      titulo: 'Angular 19: Arquitetura Enterprise e Signals',
      categoria: 'Frontend',
      nivel: 'Avançado',
      horas: 45,
      avaliacao: 4.9,
      alunosInscritos: 1240,
      inscrito: true,
      concluido: false
    },
    {
      id: 2,
      titulo: 'TypeScript 5.5 Avançado e Padrões GoF',
      categoria: 'Frontend',
      nivel: 'Intermediário',
      horas: 30,
      avaliacao: 4.8,
      alunosInscritos: 890,
      inscrito: true,
      concluido: true
    },
    {
      id: 3,
      titulo: 'Node.js, NestJS e Microservices com Docker',
      categoria: 'Backend',
      nivel: 'Avançado',
      horas: 60,
      avaliacao: 4.9,
      alunosInscritos: 650,
      inscrito: false,
      concluido: false
    },
    {
      id: 4,
      titulo: 'Fundamentos de DevOps: CI/CD com GitHub Actions',
      categoria: 'DevOps',
      nivel: 'Iniciante',
      horas: 20,
      avaliacao: 4.7,
      alunosInscritos: 1100,
      inscrito: false,
      concluido: false
    },
    {
      id: 5,
      titulo: 'Flutter & Dart: Apps Multiplataforma de Alta Performance',
      categoria: 'Mobile',
      nivel: 'Intermediário',
      horas: 40,
      avaliacao: 4.8,
      alunosInscritos: 720,
      inscrito: false,
      concluido: false
    }
  ]);

  // Filtros Reativos (Signals)
  termoBusca = signal<string>('');
  categoriaFiltro = signal<string>('Todas');
  apenasInscritos = signal<boolean>(false);

  // Toast e Modais
  toastMensagem = signal<string>('');
  modalCadastroAberto = signal<boolean>(false);

  // Formulário Reativo para Novo Curso
  cursoForm!: FormGroup;

  // Computeds: KPIs do Dashboard
  kpis = computed(() => {
    const lista = this.cursos();
    const total = lista.length;
    const inscritos = lista.filter(c => c.inscrito).length;
    const concluidos = lista.filter(c => c.concluido).length;
    const totalAlunos = lista.reduce((acc, c) => acc + c.alunosInscritos, 0);
    const mediaAvaliacao = (lista.reduce((acc, c) => acc + c.avaliacao, 0) / (total || 1)).toFixed(1);

    return { total, inscritos, concluidos, totalAlunos, mediaAvaliacao };
  });

  // Computed: Cursos Filtrados Dinamicamente
  cursosFiltrados = computed(() => {
    const termo = this.termoBusca().toLowerCase().trim();
    const cat = this.categoriaFiltro();
    const inscritosApenas = this.apenasInscritos();

    return this.cursos().filter(c => {
      const matchTexto = !termo || c.titulo.toLowerCase().includes(termo) || c.nivel.toLowerCase().includes(termo);
      const matchCat = cat === 'Todas' || c.categoria === cat;
      const matchInscrito = !inscritosApenas || c.inscrito;
      return matchTexto && matchCat && matchInscrito;
    });
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(6)]],
      categoria: ['Frontend', Validators.required],
      nivel: ['Iniciante', Validators.required],
      horas: [20, [Validators.required, Validators.min(5), Validators.max(200)]]
    });
  }

  toggleInscricao(cursoId: number): void {
    this.cursos.update(lista =>
      lista.map(c => {
        if (c.id === cursoId) {
          const novoStatus = !c.inscrito;
          this.mostrarToast(novoStatus ? `Inscrição confirmada em "${c.titulo}"!` : `Inscrição cancelada.`);
          return {
            ...c,
            inscrito: novoStatus,
            alunosInscritos: novoStatus ? c.alunosInscritos + 1 : Math.max(0, c.alunosInscritos - 1),
            concluido: novoStatus ? c.concluido : false
          };
        }
        return c;
      })
    );
  }

  toggleConclusao(cursoId: number): void {
    this.cursos.update(lista =>
      lista.map(c => {
        if (c.id === cursoId) {
          const novoStatus = !c.concluido;
          this.mostrarToast(novoStatus ? `🎉 Parabéns! Curso "${c.titulo}" concluído!` : 'Status de conclusão revertido.');
          return { ...c, concluido: novoStatus };
        }
        return c;
      })
    );
  }

  salvarNovoCurso(): void {
    if (this.cursoForm.valid) {
      const formVal = this.cursoForm.value;
      const novo: CursoItem = {
        id: Math.max(...this.cursos().map(c => c.id), 0) + 1,
        titulo: formVal.titulo,
        categoria: formVal.categoria,
        nivel: formVal.nivel,
        horas: Number(formVal.horas),
        avaliacao: 5.0,
        alunosInscritos: 1,
        inscrito: true,
        concluido: false
      };

      this.cursos.update(lista => [novo, ...lista]);
      this.modalCadastroAberto.set(false);
      this.cursoForm.reset({ categoria: 'Frontend', nivel: 'Iniciante', horas: 20 });
      this.mostrarToast(`Curso "${novo.titulo}" cadastrado e disponível!`);
    } else {
      this.cursoForm.markAllAsTouched();
    }
  }

  mostrarToast(msg: string): void {
    this.toastMensagem.set(msg);
    setTimeout(() => {
      this.toastMensagem.set('');
    }, 3500);
  }
}
