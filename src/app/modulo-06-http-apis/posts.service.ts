import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, delay, of, retry, throwError } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Base mock local para garantir estabilidade mesmo offline
  private mockPosts: Post[] = [
    { id: 1, title: 'Dominando Angular 19', body: 'Aprenda Signals, standalone components e nova arquitetura reativa.', userId: 1 },
    { id: 2, title: 'RxJS na Prática', body: 'Como orquestrar fluxos assíncronos complexos com operadores.', userId: 1 },
    { id: 3, title: 'Arquitetura Clean em SPAs', body: 'Desacoplando regra de negócio dos templates Angular.', userId: 2 }
  ];

  constructor(private http: HttpClient) {}

  getPosts(forceMock: boolean = true): Observable<Post[]> {
    if (forceMock) {
      return of([...this.mockPosts]).pipe(delay(400));
    }
    return this.http.get<Post[]>(this.apiUrl).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  createPost(novoPost: Omit<Post, 'id'>, forceMock: boolean = true): Observable<Post> {
    const postCompleto: Post = {
      ...novoPost,
      id: Math.max(...this.mockPosts.map(p => p.id), 0) + 1
    };

    if (forceMock) {
      this.mockPosts.unshift(postCompleto);
      return of(postCompleto).pipe(delay(350));
    }

    return this.http.post<Post>(this.apiUrl, novoPost).pipe(
      catchError(this.handleError)
    );
  }

  updatePost(id: number, alteracoes: Partial<Post>, forceMock: boolean = true): Observable<Post> {
    if (forceMock) {
      const idx = this.mockPosts.findIndex(p => p.id === id);
      if (idx !== -1) {
        this.mockPosts[idx] = { ...this.mockPosts[idx], ...alteracoes };
        return of(this.mockPosts[idx]).pipe(delay(300));
      }
      return throwError(() => new Error('Post não encontrado'));
    }

    return this.http.put<Post>(`${this.apiUrl}/${id}`, alteracoes).pipe(
      catchError(this.handleError)
    );
  }

  deletePost(id: number, forceMock: boolean = true): Observable<boolean> {
    if (forceMock) {
      this.mockPosts = this.mockPosts.filter(p => p.id !== id);
      return of(true).pipe(delay(300));
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      retry(1),
      catchError(this.handleError),
      // retorna true se concluído
      () => of(true)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let mensagem = 'Ocorreu um erro desconhecido na requisição.';
    if (error.error instanceof ErrorEvent) {
      mensagem = `Erro no cliente: ${error.error.message}`;
    } else {
      mensagem = `Servidor retornou código ${error.status}: ${error.message}`;
    }
    return throwError(() => new Error(mensagem));
  }
}
