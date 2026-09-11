import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Strategy Pattern Interface
export interface EstrategiaPagamento {
  nome: string;
  icone: string;
  calcularTaxa(valor: number): number;
  processar(valor: number): string;
}

export class PagamentoPix implements EstrategiaPagamento {
  nome = 'PIX Instantâneo';
  icone = '⚡';
  calcularTaxa(valor: number): number { return 0; }
  processar(valor: number): string {
    return `PIX de R$ ${valor.toFixed(2)} processado instantaneamente com taxa R$ 0,00. QR Code gerado!`;
  }
}

export class PagamentoCartao implements EstrategiaPagamento {
  nome = 'Cartão de Crédito';
  icone = '💳';
  calcularTaxa(valor: number): number { return valor * 0.035; }
  processar(valor: number): string {
    const taxa = this.calcularTaxa(valor);
    return `Cartão autorizado: R$ ${(valor + taxa).toFixed(2)} (Taxa de intermediação: R$ ${taxa.toFixed(2)}).`;
  }
}

export class PagamentoBoleto implements EstrategiaPagamento {
  nome = 'Boleto Bancário';
  icone = '📄';
  calcularTaxa(valor: number): number { return 2.50; }
  processar(valor: number): string {
    const taxa = this.calcularTaxa(valor);
    return `Boleto gerado: R$ ${(valor + taxa).toFixed(2)} (Taxa de emissão bancária: R$ ${taxa.toFixed(2)}). Vencimento em 3 dias.`;
  }
}

@Component({
  selector: 'app-patterns-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './patterns-demo.component.html',
  styleUrl: './patterns-demo.component.scss'
})
export class PatternsDemoComponent {
  valorCompra = signal<number>(150.00);
  estrategiaAtual = signal<EstrategiaPagamento>(new PagamentoPix());
  resultadoProcessamento = signal<string>('');

  readonly estrategias: EstrategiaPagamento[] = [
    new PagamentoPix(),
    new PagamentoCartao(),
    new PagamentoBoleto()
  ];

  selecionarEstrategia(est: EstrategiaPagamento): void {
    this.estrategiaAtual.set(est);
    this.resultadoProcessamento.set('');
  }

  processarPagamento(): void {
    const res = this.estrategiaAtual().processar(this.valorCompra());
    this.resultadoProcessamento.set(res);
  }
}
