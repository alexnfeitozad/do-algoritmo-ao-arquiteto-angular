import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  private dados: any[] = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', idade: 30 },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com', idade: 25 },
    { id: 3, nome: 'Pedro Oliveira', email: 'pedro@email.com', idade: 35 }
  ];
  
  constructor() {
    console.log('DadosService criado');
  }
  
  // Método para obter todos os dados
  getDados(): any[] {
    return [...this.dados];
  }
  
  // Método para obter dado por ID
  getDadoPorId(id: number): any | undefined {
    return this.dados.find(dado => dado.id === id);
  }
  
  // Método para adicionar novo dado
  adicionarDado(dado: any): void {
    const novoId = Math.max(...this.dados.map(d => d.id), 0) + 1;
    this.dados.push({ ...dado, id: novoId });
  }
  
  // Método para atualizar dado
  atualizarDado(id: number, dadoAtualizado: any): boolean {
    const index = this.dados.findIndex(dado => dado.id === id);
    if (index !== -1) {
      this.dados[index] = { ...this.dados[index], ...dadoAtualizado };
      return true;
    }
    return false;
  }
  
  // Método para remover dado
  removerDado(id: number): boolean {
    const index = this.dados.findIndex(dado => dado.id === id);
    if (index !== -1) {
      this.dados.splice(index, 1);
      return true;
    }
    return false;
  }
  
  // Método para buscar dados
  buscarDados(termo: string): any[] {
    const termoLower = termo.toLowerCase();
    return this.dados.filter(dado => 
      dado.nome.toLowerCase().includes(termoLower) ||
      dado.email.toLowerCase().includes(termoLower)
    );
  }
  
  // Método para obter estatísticas
  getEstatisticas(): { total: number; mediaIdade: number } {
    const total = this.dados.length;
    const mediaIdade = total > 0 
      ? this.dados.reduce((sum, dado) => sum + dado.idade, 0) / total 
      : 0;
    return { total, mediaIdade: Math.round(mediaIdade) };
  }
}
