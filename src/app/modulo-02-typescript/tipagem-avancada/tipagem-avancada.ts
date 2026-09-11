import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interfaces e Types definidos fora da classe
interface Pessoa {
  nome: string;
  idade: number;
}

interface Endereco {
  rua: string;
  cidade: string;
}

interface Comprimento {
  length: number;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha?: string;
}

type ReadonlyPessoa = {
  readonly [K in keyof Pessoa]: Pessoa[K];
};

import { RouterLink } from '@angular/router';

type IsArray<T> = T extends any[] ? true : false;

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-tipagem-avancada',
  styleUrl: './tipagem-avancada.scss',
  templateUrl: './tipagem-avancada.html',
})
export class TipagemAvancada {
  // Union Types (Tipos União)
  valorUnion: string | number = 'Hello';
  
  // Intersection Types (Tipos Interseção)
  tipoPessoaEndereco: Pessoa & Endereco = {
    nome: 'João',
    idade: 30,
    rua: 'Rua A',
    cidade: 'São Paulo'
  };
  
  // Type Guards (Guardas de Tipo)
  processarValor(valor: string | number): string {
    if (typeof valor === 'string') {
      return `String: ${valor.toUpperCase()}`;
    }
    return `Number: ${valor * 2}`;
  }
  
  // Literal Types
  tipoStatus: 'ativo' | 'inativo' | 'pendente' = 'ativo';
  
  // Nullable Types
  valorNullable: string | null = null;
  
  // Generic Types (Tipos Genéricos)
  identidade<T>(valor: T): T {
    return valor;
  }
  
  // Array Genérico
  primeiroElemento<T>(array: T[]): T | undefined {
    return array[0];
  }
  
  // Generic Constraints
  obterComprimento<T extends Comprimento>(objeto: T): number {
    return objeto.length;
  }
  
  // Objeto base
  usuario: Usuario = {
    id: 1,
    nome: 'João',
    email: 'joao@email.com',
    senha: '123456'
  };
  
  // Utility Types
  usuarioParcial: Partial<Usuario> = {
    nome: 'Maria'
  };
  
  usuarioRequerido: Required<Usuario> = {
    id: 2,
    nome: 'Pedro',
    email: 'pedro@email.com',
    senha: 'abcdef'
  };
  
  usuarioReadonly: Readonly<Usuario> = {
    id: 3,
    nome: 'Ana',
    email: 'ana@email.com',
    senha: 'ghijkl'
  };
  
  usuarioPick: Pick<Usuario, 'nome' | 'email'> = {
    nome: 'Carlos',
    email: 'carlos@email.com'
  };
  
  usuarioOmit: Omit<Usuario, 'senha'> = {
    id: 4,
    nome: 'Luíza',
    email: 'luiza@email.com'
  };
  
  tipoRecord: Record<string, number> = {
    'um': 1,
    'dois': 2,
    'três': 3
  };
  
  pessoaReadonly: ReadonlyPessoa = {
    nome: 'Fernando',
    idade: 35
  };
  
  // Exemplos de uso
  exemplos: string[] = [];
  
  adicionarExemplo(exemplo: string): void {
    this.exemplos.push(exemplo);
  }
  
  executarExemplos(): void {
    // Union Types
    this.adicionarExemplo(`Union Type: ${this.processarValor('teste')}`);
    this.adicionarExemplo(`Union Type: ${this.processarValor(42)}`);
    
    // Intersection Types
    this.adicionarExemplo(`Intersection: ${this.tipoPessoaEndereco.nome} - ${this.tipoPessoaEndereco.cidade}`);
    
    // Literal Types
    this.adicionarExemplo(`Literal Type: ${this.tipoStatus}`);
    
    // Generic Types
    this.adicionarExemplo(`Generic: ${this.identidade('Hello World')}`);
    this.adicionarExemplo(`Generic: ${this.identidade(123)}`);
    
    // Array Genérico
    this.adicionarExemplo(`Primeiro elemento: ${this.primeiroElemento([1, 2, 3])}`);
    
    // Generic Constraints
    this.adicionarExemplo(`Comprimento: ${this.obterComprimento('Texto')}`);
    this.adicionarExemplo(`Comprimento: ${this.obterComprimento([1, 2, 3, 4])}`);
    
    // Utility Types
    this.adicionarExemplo(`Partial: ${JSON.stringify(this.usuarioParcial)}`);
    this.adicionarExemplo(`Pick: ${JSON.stringify(this.usuarioPick)}`);
    this.adicionarExemplo(`Omit: ${JSON.stringify(this.usuarioOmit)}`);
    
    // Record
    this.adicionarExemplo(`Record: ${JSON.stringify(this.tipoRecord)}`);
  }
  
  limparExemplos(): void {
    this.exemplos = [];
  }
}
