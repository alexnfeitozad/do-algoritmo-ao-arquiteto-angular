import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PostsService, Post } from './posts.service';

@Component({
  selector: 'app-http-apis',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './http-apis.component.html',
  styleUrl: './http-apis.component.scss'
})
export class HttpApisComponent implements OnInit {
  posts: Post[] = [];
  carregando: boolean = false;
  mensagemStatus: string = '';
  erroStatus: string = '';
  
  // Novo Post
  novoTitulo: string = '';
  novoCorpo: string = '';

  // Interceptor Simulator
  interceptorLog: string[] = [];
  modoMockAtivo: boolean = true;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.carregarPosts();
  }

  carregarPosts(): void {
    this.carregando = true;
    this.erroStatus = '';
    this.adicionarLogInterceptor('GET', '/api/posts', 'Token: Bearer eyJhbGciOi...');

    this.postsService.getPosts(this.modoMockAtivo).subscribe({
      next: (dados) => {
        this.posts = dados;
        this.carregando = false;
        this.mensagemStatus = `Sucesso: ${dados.length} posts carregados via GET.`;
      },
      error: (err) => {
        this.carregando = false;
        this.erroStatus = err.message || 'Falha ao buscar posts.';
      }
    });
  }

  criarPost(): void {
    if (!this.novoTitulo.trim() || !this.novoCorpo.trim()) return;

    this.carregando = true;
    this.erroStatus = '';
    this.adicionarLogInterceptor('POST', '/api/posts', 'Content-Type: application/json');

    this.postsService.createPost({
      title: this.novoTitulo.trim(),
      body: this.novoCorpo.trim(),
      userId: 1
    }, this.modoMockAtivo).subscribe({
      next: (criado) => {
        this.carregando = false;
        this.novoTitulo = '';
        this.novoCorpo = '';
        this.mensagemStatus = `Post #${criado.id} criado via POST com sucesso!`;
        this.carregarPosts();
      },
      error: (err) => {
        this.carregando = false;
        this.erroStatus = err.message;
      }
    });
  }

  excluirPost(id: number): void {
    this.carregando = true;
    this.adicionarLogInterceptor('DELETE', `/api/posts/${id}`, 'Authorization: Bearer valid');

    this.postsService.deletePost(id, this.modoMockAtivo).subscribe({
      next: () => {
        this.carregando = false;
        this.mensagemStatus = `Post #${id} removido via DELETE.`;
        this.carregarPosts();
      },
      error: (err) => {
        this.carregando = false;
        this.erroStatus = err.message;
      }
    });
  }

  simularErro(): void {
    this.carregando = true;
    this.adicionarLogInterceptor('GET', '/api/dados-invalidos', 'Simulando status 500 (Internal Server Error)');
    setTimeout(() => {
      this.carregando = false;
      this.erroStatus = 'Erro 500: Falha simulada capturada pelo catchError com retry(2) tentado!';
    }, 600);
  }

  private adicionarLogInterceptor(metodo: string, rota: string, headers: string): void {
    const time = new Date().toLocaleTimeString();
    this.interceptorLog.unshift(`[${time}] [INTERCEPTOR] ${metodo} ${rota} | Header: ${headers}`);
    if (this.interceptorLog.length > 6) this.interceptorLog.pop();
  }

  limparLogs(): void {
    this.interceptorLog = [];
  }
}
