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

export interface RamVariable {
  address: string;
  name: string;
  type: 'number' | 'boolean' | 'string' | 'object';
  value: string | number | boolean;
  status: 'new' | 'updated' | 'unchanged';
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
  ramVariables = signal<RamVariable[]>([]);
  cpuRegister = signal<string>('Processador em espera. Clique em "Passo a Passo" para iniciar.');

  // Compatibilidade com possíveis bindings legados
  memoryVariables = signal<Record<string, any>>({});

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
      explanation: 'Início da Função: A CPU recebe os argumentos de entrada e aloca os slots correspondentes na memória RAM.',
      variableChanges: {}
    },
    {
      line: 2,
      code: '  let desconto = 0;',
      explanation: 'Alocação de Memória: Reserva um novo slot de memória para a variável "desconto" e inicializa com 0.',
      variableChanges: {}
    },
    {
      line: 3,
      code: '  if (isVip && valor > 100) {',
      explanation: 'Estrutura Condicional: A Unidade Lógica e Aritmética (ALU) testa se "isVip" é verdadeiro E se "valor" é maior que 100.',
      variableChanges: {}
    },
    {
      line: 4,
      code: '    desconto = valor * 0.15; // 15% de desconto',
      explanation: 'Processamento Aritmético: Como a condição foi satisfeita, calcula 15% do valor e ATUALIZA o slot da variável "desconto".',
      variableChanges: {}
    },
    {
      line: 5,
      code: '  let valorFinal = valor - desconto;',
      explanation: 'Subtração: Aloca o slot "valorFinal" na RAM e armazena o valor da compra menos o desconto calculado.',
      variableChanges: {}
    },
    {
      line: 6,
      code: '  let pontos = Math.floor(valorFinal / 10);',
      explanation: 'Cálculo de Bônus: Aloca "pontos" na RAM e guarda a pontuação de fidelidade (1 ponto para cada R$ 10 pagos).',
      variableChanges: {}
    },
    {
      line: 7,
      code: '  return { valorFinal, pontos };',
      explanation: 'Instrução Return: O algoritmo empacota o resultado final e devolve o controle ao chamador.',
      variableChanges: {}
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
    this.ramVariables.set([]);
    this.cpuRegister.set('Processador em espera. Clique em "Passo a Passo" para iniciar.');
    this.memoryVariables.set({});
  }

  nextStep() {
    const nextIdx = this.currentStepIndex() + 1;
    if (nextIdx >= this.algorithmSteps.length) return;

    this.currentStepIndex.set(nextIdx);
    const step = this.algorithmSteps[nextIdx];
    const valor = Number(this.inputValor()) || 0;
    const vip = Boolean(this.isVip());
    const qualifies = vip && valor > 100;
    const desc = qualifies ? Number((valor * 0.15).toFixed(2)) : 0;
    const finalVal = Number((valor - desc).toFixed(2));
    const pts = Math.floor(finalVal / 10);

    const vars: RamVariable[] = [];

    // Linha 1: parâmetros alocados
    if (nextIdx >= 0) {
      vars.push({
        address: '0x00A1',
        name: 'valor',
        type: 'number',
        value: valor,
        status: nextIdx === 0 ? 'new' : 'unchanged'
      });
      vars.push({
        address: '0x00A2',
        name: 'isVip',
        type: 'boolean',
        value: vip,
        status: nextIdx === 0 ? 'new' : 'unchanged'
      });
    }

    // Linha 2: desconto declarado com 0
    if (nextIdx >= 1) {
      const isLine4OrLater = nextIdx >= 3 && qualifies;
      vars.push({
        address: '0x00A3',
        name: 'desconto',
        type: 'number',
        value: isLine4OrLater ? desc : 0,
        status: nextIdx === 1 ? 'new' : (nextIdx === 3 && qualifies ? 'updated' : 'unchanged')
      });
    }

    // Linha 5: valorFinal alocado
    if (nextIdx >= 4) {
      vars.push({
        address: '0x00A4',
        name: 'valorFinal',
        type: 'number',
        value: finalVal,
        status: nextIdx === 4 ? 'new' : 'unchanged'
      });
    }

    // Linha 6: pontos alocado
    if (nextIdx >= 5) {
      vars.push({
        address: '0x00A5',
        name: 'pontos',
        type: 'number',
        value: pts,
        status: nextIdx === 5 ? 'new' : 'unchanged'
      });
    }

    this.ramVariables.set(vars);

    // Registrador da CPU e log
    let cpuMsg = '';
    switch (nextIdx) {
      case 0:
        cpuMsg = `Registrador PC: Linha 1 • Argumentos carregados na RAM: valor=${valor}, isVip=${vip}`;
        break;
      case 1:
        cpuMsg = `Registrador PC: Linha 2 • Alocado slot RAM 0x00A3 (desconto = 0)`;
        break;
      case 2:
        cpuMsg = `Registrador PC: Linha 3 • Teste Condicional ALU: (${vip} && ${valor} > 100) => ${qualifies ? 'VERDADEIRO' : 'FALSO'}`;
        break;
      case 3:
        cpuMsg = qualifies 
          ? `Registrador PC: Linha 4 • ALU calculou ${valor} * 0.15 = ${desc}. Slot 0x00A3 atualizado.`
          : `Registrador PC: Linha 4 • Condição não atendida. Pula cálculo de desconto.`;
        break;
      case 4:
        cpuMsg = `Registrador PC: Linha 5 • ALU calculou ${valor} - ${desc} = ${finalVal}. Alocado slot 0x00A4.`;
        break;
      case 5:
        cpuMsg = `Registrador PC: Linha 6 • Math.floor(${finalVal} / 10) = ${pts}. Alocado slot 0x00A5.`;
        break;
      case 6:
        cpuMsg = `Registrador PC: Linha 7 • Retorno: { valorFinal: ${finalVal}, pontos: ${pts} }. Execução finalizada.`;
        break;
    }

    this.cpuRegister.set(cpuMsg);
    this.executionLog.update(log => [
      ...log,
      `[Passo ${nextIdx + 1}/7 • Linha ${step.line}] ${step.explanation}`
    ]);
  }

  runAllSteps() {
    this.resetSimulator();
    for (let i = 0; i < this.algorithmSteps.length; i++) {
      this.nextStep();
    }
  }

  getCurrentExplanation(): string {
    const idx = this.currentStepIndex();
    if (idx === -1) {
      return 'O depurador está pausado antes da execução. Clique no botão "Passo a Passo ➔" para carregar a primeira instrução na CPU.';
    }
    return this.algorithmSteps[idx]?.explanation || '';
  }

  getProgressPercentage(): number {
    const idx = this.currentStepIndex();
    if (idx < 0) return 0;
    return Math.round(((idx + 1) / this.algorithmSteps.length) * 100);
  }
}
