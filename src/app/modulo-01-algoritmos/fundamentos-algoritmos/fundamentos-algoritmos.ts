import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface StepInstruction {
  line: number;
  code: string;
  explanation: string;
  variableChanges: Record<string, any>;
}

@Component({
  selector: 'app-fundamentos-algoritmos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fundamentos-algoritmos.html',
  styleUrls: ['./fundamentos-algoritmos.scss']
})
export class FundamentosAlgoritmos {
  // Simulator State
  inputValor = signal<number>(120);
  isVip = signal<boolean>(true);
  currentStepIndex = signal<number>(-1);
  executionLog = signal<string[]>([]);
  memoryVariables = signal<Record<string, any>>({
    valorCompra: 120,
    ehClienteVIP: true,
    desconto: 0,
    valorFinal: 0,
    pontosBonus: 0
  });

  // Big-O Simulator State
  bigONSize = signal<number>(100);
  selectedBigO = signal<string>('O(n)');

  readonly bigOList = [
    { notation: 'O(1)', name: 'Constante', color: '#10b981', desc: 'Acesso a índice de array, leitura de variável. Tempo não muda com o tamanho dos dados.' },
    { notation: 'O(log n)', name: 'Logarítmica', color: '#38bdf8', desc: 'Busca Binária. Corta os dados pela metade a cada iteração.' },
    { notation: 'O(n)', name: 'Linear', color: '#818cf8', desc: 'Busca Linear, loop simples (for de 0 a N). O tempo cresce proporcionalmente a N.' },
    { notation: 'O(n log n)', name: 'Linearítmica', color: '#f59e0b', desc: 'MergeSort, QuickSort (caso médio). Algoritmos de ordenação eficientes.' },
    { notation: 'O(n²)', name: 'Quadrática', color: '#ef4444', desc: 'Loops aninhados (for dentro de for), Bubble Sort. O tempo explode com grandes volumes.' }
  ];

  readonly algorithmSteps: StepInstruction[] = [
    {
      line: 1,
      code: 'function calcularDesconto(valor, isVip) {',
      explanation: 'Início do algoritmo. Recebemos os dados de entrada na memória.',
      variableChanges: { status: 'Execução Iniciada' }
    },
    {
      line: 2,
      code: '  let desconto = 0;',
      explanation: 'Declaração e inicialização da variável desconto em 0 na memória RAM.',
      variableChanges: { desconto: 0 }
    },
    {
      line: 3,
      code: '  if (isVip && valor > 100) {',
      explanation: 'Estrutura de Decisão: Avaliando se o cliente é VIP E o valor é maior que 100.',
      variableChanges: { condicaoAtendida: true }
    },
    {
      line: 4,
      code: '    desconto = valor * 0.15; // 15% de desconto',
      explanation: 'Processamento aritmético: calcula 15% de desconto.',
      variableChanges: { desconto: 18 }
    },
    {
      line: 5,
      code: '  let valorFinal = valor - desconto;',
      explanation: 'Subtrai o desconto do valor original para obter o total a pagar.',
      variableChanges: { valorFinal: 102 }
    },
    {
      line: 6,
      code: '  let pontos = Math.floor(valorFinal / 10);',
      explanation: 'Cálculo de pontos de fidelidade: 1 ponto a cada R$ 10 gastos.',
      variableChanges: { pontosBonus: 10 }
    },
    {
      line: 7,
      code: '  return { valorFinal, pontos };',
      explanation: 'Saída do algoritmo: retorna o resultado processado para o usuário.',
      variableChanges: { status: 'Finalizado com Sucesso' }
    }
  ];

  calculatedOperations = computed(() => {
    const n = this.bigONSize();
    const type = this.selectedBigO();
    switch (type) {
      case 'O(1)': return 1;
      case 'O(log n)': return Math.ceil(Math.log2(n || 1));
      case 'O(n)': return n;
      case 'O(n log n)': return Math.ceil(n * Math.log2(n || 1));
      case 'O(n²)': return n * n;
      default: return n;
    }
  });

  resetSimulator() {
    this.currentStepIndex.set(-1);
    this.executionLog.set([]);
    this.memoryVariables.set({
      valorCompra: this.inputValor(),
      ehClienteVIP: this.isVip(),
      desconto: 0,
      valorFinal: 0,
      pontosBonus: 0,
      status: 'Pronto para iniciar'
    });
  }

  nextStep() {
    const nextIdx = this.currentStepIndex() + 1;
    if (nextIdx >= this.algorithmSteps.length) return;

    this.currentStepIndex.set(nextIdx);
    const step = this.algorithmSteps[nextIdx];
    
    // Atualiza variáveis de acordo com os inputs reais
    const valor = this.inputValor();
    const vip = this.isVip();
    let desc = 0;
    if (nextIdx >= 3 && vip && valor > 100) {
      desc = valor * 0.15;
    }

    const currentMem = { ...this.memoryVariables() };
    if (nextIdx === 0) currentMem['status'] = 'Iniciando execução...';
    if (nextIdx === 1) currentMem['desconto'] = 0;
    if (nextIdx === 2) currentMem['condicaoVIP'] = vip && valor > 100 ? 'VERDADEIRA' : 'FALSA';
    if (nextIdx === 3) currentMem['desconto'] = desc;
    if (nextIdx === 4) currentMem['valorFinal'] = valor - desc;
    if (nextIdx === 5) currentMem['pontosBonus'] = Math.floor((valor - desc) / 10);
    if (nextIdx === 6) currentMem['status'] = 'Concluído!';

    this.memoryVariables.set(currentMem);
    this.executionLog.update(log => [
      ...log,
      `[Linha ${step.line}] ${step.explanation}`
    ]);
  }

  runAllSteps() {
    this.resetSimulator();
    for (let i = 0; i < this.algorithmSteps.length; i++) {
      this.nextStep();
    }
  }
}
