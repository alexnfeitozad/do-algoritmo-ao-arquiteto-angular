import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DadosService } from '../dados';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-service-exemplo',
  styleUrl: './service-exemplo.scss',
  templateUrl: './service-exemplo.html',
})
export class ServiceExemploComponent implements OnInit {
  // Injeção de dependência do service
  constructor(private dadosService: DadosService) {
    console.log('ServiceExemploComponent criado');
  }
  
  // Dados do componente
  dados: any[] = [];
  dadoSelecionado: any = null;
  estatisticas: any = { total: 0, mediaIdade: 0 };
  
  // Formulário
  novoDado = {
    nome: '',
    email: '',
    idade: 25
  };
  
  // Busca
  termoBusca: string = '';
  resultadosBusca: any[] = [];
  
  // Estado
  mostrandoFormulario: boolean = false;
  editando: boolean = false;
  
  ngOnInit(): void {
    this.carregarDados();
    this.carregarEstatisticas();
  }
  
  // Métodos para interagir com o service
  carregarDados(): void {
    this.dados = this.dadosService.getDados();
  }
  
  carregarEstatisticas(): void {
    this.estatisticas = this.dadosService.getEstatisticas();
  }
  
  selecionarDado(id: number): void {
    this.dadoSelecionado = this.dadosService.getDadoPorId(id);
    this.editando = true;
    this.mostrandoFormulario = true;
    
    if (this.dadoSelecionado) {
      this.novoDado = {
        nome: this.dadoSelecionado.nome,
        email: this.dadoSelecionado.email,
        idade: this.dadoSelecionado.idade
      };
    }
  }
  
  adicionarDado(): void {
    if (this.novoDado.nome && this.novoDado.email) {
      this.dadosService.adicionarDado(this.novoDado);
      this.carregarDados();
      this.carregarEstatisticas();
      this.limparFormulario();
      this.mostrandoFormulario = false;
    }
  }
  
  atualizarDado(): void {
    if (this.dadoSelecionado && this.novoDado.nome && this.novoDado.email) {
      const sucesso = this.dadosService.atualizarDado(this.dadoSelecionado.id, this.novoDado);
      if (sucesso) {
        this.carregarDados();
        this.carregarEstatisticas();
        this.limparFormulario();
        this.mostrandoFormulario = false;
        this.editando = false;
        this.dadoSelecionado = null;
      }
    }
  }
  
  removerDado(id: number): void {
    if (confirm('Tem certeza que deseja remover este item?')) {
      const sucesso = this.dadosService.removerDado(id);
      if (sucesso) {
        this.carregarDados();
        this.carregarEstatisticas();
        
        if (this.dadoSelecionado && this.dadoSelecionado.id === id) {
          this.dadoSelecionado = null;
          this.mostrandoFormulario = false;
        }
      }
    }
  }
  
  buscar(): void {
    if (this.termoBusca.trim()) {
      this.resultadosBusca = this.dadosService.buscarDados(this.termoBusca);
    } else {
      this.resultadosBusca = [];
    }
  }
  
  mostrarFormularioAdicao(): void {
    this.limparFormulario();
    this.editando = false;
    this.dadoSelecionado = null;
    this.mostrandoFormulario = true;
  }
  
  cancelarFormulario(): void {
    this.limparFormulario();
    this.mostrandoFormulario = false;
    this.editando = false;
    this.dadoSelecionado = null;
  }
  
  limparFormulario(): void {
    this.novoDado = {
      nome: '',
      email: '',
      idade: 25
    };
  }
  
  // Utilitários
  get totalDados(): number {
    return this.dados.length;
  }
}
