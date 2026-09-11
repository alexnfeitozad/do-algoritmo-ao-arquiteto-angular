import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Classe Base
class Animal {
  constructor(public nome: string, public idade: number) {}
  
  emitirSom(): string {
    return 'Som genérico de animal';
  }
  
  informacao(): string {
    return `${this.nome}, ${this.idade} anos`;
  }
}

// Classe Derivada (Herança)
class Cachorro extends Animal {
  constructor(nome: string, idade: number, public raca: string) {
    super(nome, idade);
  }
  
  override emitirSom(): string {
    return 'Au au!';
  }
  
  buscar(): string {
    return `${this.nome} está buscando a bola!`;
  }
}

// Outra Classe Derivada
class Gato extends Animal {
  constructor(nome: string, idade: number, public cor: string) {
    super(nome, idade);
  }
  
  override emitirSom(): string {
    return 'Miau!';
  }
  
  arranhar(): string {
    return `${this.nome} está arranhando o sofá!`;
  }
}

// Interface
interface Veiculo {
  marca: string;
  modelo: string;
  ano: number;
  ligar(): void;
  desligar(): void;
}

// Implementação de Interface
class Carro implements Veiculo {
  constructor(
    public marca: string,
    public modelo: string,
    public ano: number,
    private ligado: boolean = false
  ) {}
  
  ligar(): void {
    this.ligado = true;
  }
  
  desligar(): void {
    this.ligado = false;
  }
  
  estaLigado(): boolean {
    return this.ligado;
  }
}

// Classe Abstrata
abstract class FormaGeometrica {
  constructor(public cor: string) {}
  
  abstract calcularArea(): number;
  
  abstract calcularPerimetro(): number;
  
  informacao(): string {
    return `Forma ${this.cor}`;
  }
}

// Implementação de Classe Abstrata
class Retangulo extends FormaGeometrica {
  constructor(
    cor: string,
    public largura: number,
    public altura: number
  ) {
    super(cor);
  }
  
  override calcularArea(): number {
    return this.largura * this.altura;
  }
  
  override calcularPerimetro(): number {
    return 2 * (this.largura + this.altura);
  }
}

class Circulo extends FormaGeometrica {
  constructor(cor: string, public raio: number) {
    super(cor);
  }
  
  override calcularArea(): number {
    return Math.PI * this.raio * this.raio;
  }
  
  override calcularPerimetro(): number {
    return 2 * Math.PI * this.raio;
  }
}

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-poo-typescript',
  styleUrl: './poo-typescript.scss',
  templateUrl: './poo-typescript.html',
})
export class PooTypescript {
  // Exemplos de Herança
  cachorro = new Cachorro('Rex', 5, 'Labrador');
  gato = new Gato('Mimi', 3, 'Branca');
  
  // Exemplos de Interface
  carro = new Carro('Toyota', 'Corolla', 2022);
  
  // Exemplos de Classe Abstrata
  retangulo = new Retangulo('Azul', 5, 3);
  circulo = new Circulo('Vermelho', 4);
  
  // Polimorfismo
  animais: Animal[] = [this.cachorro, this.gato];
  formas: FormaGeometrica[] = [this.retangulo, this.circulo];
  
  // Encapsulamento
  private contador: number = 0;
  
  incrementar(): void {
    this.contador++;
  }
  
  getContador(): number {
    return this.contador;
  }
  
  // Getters e Setters
  private _preco: number = 0;
  
  get preco(): number {
    return this._preco;
  }
  
  set preco(valor: number) {
    if (valor >= 0) {
      this._preco = valor;
    }
  }
  
  // Métodos de demonstração
  demonstrarHeranca(): string[] {
    const resultados: string[] = [];
    
    this.animais.forEach(animal => {
      resultados.push(`${animal.informacao()}: ${animal.emitirSom()}`);
      
      if (animal instanceof Cachorro) {
        resultados.push(animal.buscar());
      } else if (animal instanceof Gato) {
        resultados.push(animal.arranhar());
      }
    });
    
    return resultados;
  }
  
  demonstrarInterface(): string[] {
    const resultados: string[] = [];
    
    resultados.push(`Carro: ${this.carro.marca} ${this.carro.modelo} (${this.carro.ano})`);
    resultados.push(`Ligado: ${this.carro.estaLigado() ? 'Sim' : 'Não'}`);
    
    this.carro.ligar();
    resultados.push(`Após ligar: ${this.carro.estaLigado() ? 'Sim' : 'Não'}`);
    
    this.carro.desligar();
    resultados.push(`Após desligar: ${this.carro.estaLigado() ? 'Sim' : 'Não'}`);
    
    return resultados;
  }
  
  demonstrarClasseAbstrata(): string[] {
    const resultados: string[] = [];
    
    this.formas.forEach(forma => {
      resultados.push(`${forma.informacao()}`);
      resultados.push(`Área: ${forma.calcularArea().toFixed(2)}`);
      resultados.push(`Perímetro: ${forma.calcularPerimetro().toFixed(2)}`);
      resultados.push('---');
    });
    
    return resultados;
  }
  
  demonstrarEncapsulamento(): string[] {
    const resultados: string[] = [];
    
    resultados.push(`Contador inicial: ${this.getContador()}`);
    this.incrementar();
    this.incrementar();
    this.incrementar();
    resultados.push(`Contador após 3 incrementos: ${this.getContador()}`);
    
    return resultados;
  }
  
  demonstrarGettersSetters(): string[] {
    const resultados: string[] = [];
    
    resultados.push(`Preço inicial: ${this.preco}`);
    this.preco = 100;
    resultados.push(`Preço após definir 100: ${this.preco}`);
    this.preco = -50; // Não deve aceitar valor negativo
    resultados.push(`Preço após tentar definir -50: ${this.preco}`);
    
    return resultados;
  }
  
  // Propriedades para exibição
  resultadosHeranca: string[] = [];
  resultadosInterface: string[] = [];
  resultadosAbstrata: string[] = [];
  resultadosEncapsulamento: string[] = [];
  resultadosGettersSetters: string[] = [];
  
  mostrarHeranca(): void {
    this.resultadosHeranca = this.demonstrarHeranca();
  }
  
  mostrarInterface(): void {
    this.resultadosInterface = this.demonstrarInterface();
  }
  
  mostrarAbstrata(): void {
    this.resultadosAbstrata = this.demonstrarClasseAbstrata();
  }
  
  mostrarEncapsulamento(): void {
    this.resultadosEncapsulamento = this.demonstrarEncapsulamento();
  }
  
  mostrarGettersSetters(): void {
    this.resultadosGettersSetters = this.demonstrarGettersSetters();
  }
  
  limparResultados(): void {
    this.resultadosHeranca = [];
    this.resultadosInterface = [];
    this.resultadosAbstrata = [];
    this.resultadosEncapsulamento = [];
    this.resultadosGettersSetters = [];
  }
}
