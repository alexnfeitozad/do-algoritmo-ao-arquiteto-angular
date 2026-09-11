import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-routing-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './routing-demo.component.html',
  styleUrl: './routing-demo.component.scss'
})
export class RoutingDemoComponent implements OnInit {
  // Parâmetros de rota
  artigoId: number = 42;
  filtroSelecionado: string = 'angular';
  paginaAtual: number = 1;
  
  // Parâmetros lidos da rota atual
  queryParamsAtuais: Record<string, any> = {};

  // Estado do Route Guard (CanActivate)
  usuarioAutenticado: boolean = true;
  guardFeedback: string = '';

  // Estado do CanDeactivate (alterações não salvas)
  temAlteracoesNaoSalvas: boolean = false;
  conteudoRascunho: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.queryParamsAtuais = params;
    });
  }

  navegarComParametros(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        artigo: this.artigoId,
        categoria: this.filtroSelecionado,
        pagina: this.paginaAtual
      },
      queryParamsHandling: 'merge'
    });
    this.guardFeedback = `Navegação imperativa realizada! QueryParams atualizados na URL.`;
  }

  testarGuardCanActivate(): void {
    if (!this.usuarioAutenticado) {
      this.guardFeedback = '❌ CanActivate BLOQUEADO: Acesso restrito a usuários autenticados.';
    } else {
      this.guardFeedback = '✅ CanActivate PERMITIDO: Token de autenticação válido detectado.';
    }
  }

  onConteudoChange(novoValor: string): void {
    this.conteudoRascunho = novoValor;
    this.temAlteracoesNaoSalvas = novoValor.length > 0;
  }

  salvarRascunho(): void {
    this.temAlteracoesNaoSalvas = false;
    this.guardFeedback = '💾 Rascunho salvo! CanDeactivate liberará a navegação livremente.';
  }
}
