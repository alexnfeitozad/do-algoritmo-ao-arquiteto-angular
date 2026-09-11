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

export type AlgorithmType = 'carro' | 'lanche' | 'loja';
export type AudienceType = 'iniciante' | 'cotidiano' | 'codigo';

@Component({
  selector: 'app-fundamentos-algoritmos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fundamentos-algoritmos.html',
  styleUrls: ['./fundamentos-algoritmos.scss']
})
export class FundamentosAlgoritmos {
  // Modo Pedagógico Selecionado
  selectedAudience = signal<AudienceType>('cotidiano');

  // Seletor de Algoritmo do Depurador
  selectedAlgorithm = signal<AlgorithmType>('carro');

  // Parâmetros do Algoritmo 1: Como Ligar o Carro (Exemplo do Usuário)
  carroTemChave = signal<boolean>(true);
  carroColocouCinto = signal<boolean>(true);
  carroPisouFreio = signal<boolean>(true);

  // Parâmetros do Algoritmo 2: Robô do Sanduíche
  lancheFatiasPao = signal<number>(2);
  lancheQuerQueijo = signal<boolean>(true);
  lancheQuerTostar = signal<boolean>(true);

  // Parâmetros do Algoritmo 3: Loja & Desconto
  inputValor = signal<number>(120);
  isVip = signal<boolean>(true);

  // Estado do Depurador
  currentStepIndex = signal<number>(-1);
  executionLog = signal<string[]>([]);
  ramVariables = signal<RamVariable[]>([]);
  cpuRegister = signal<string>('Processador em espera. Clique em "Passo a Passo" para iniciar.');
  memoryVariables = signal<Record<string, any>>({});

  // Big-O Simulator State
  bigONSize = signal<number>(100);
  selectedBigO = signal<string>('O(n)');

  readonly bigOList = [
    { notation: 'O(1)', name: 'Constante', color: '#10b981', desc: 'Acesso imediato, olhar o ponteiro do velocímetro ou ligar o farol. Não depende do tamanho.' },
    { notation: 'O(log n)', name: 'Logarítmica', color: '#38bdf8', desc: 'Busca em lista telefônica ou dicionário. Corta pela metade a cada folheada.' },
    { notation: 'O(n)', name: 'Linear', color: '#818cf8', desc: 'Conferir lista de chamada da sala ou ler um livro página por página. O tempo cresce com N.' },
    { notation: 'O(n log n)', name: 'Linearítmica', color: '#f59e0b', desc: 'Organizar um baralho ou fila de pessoas por altura de forma inteligente (MergeSort).' },
    { notation: 'O(n²)', name: 'Quadrática', color: '#ef4444', desc: 'Comparar cada pessoa de um grupo com todo mundo. Fica muito lento para grupos grandes.' }
  ];

  // Algoritmo 1: Como Ligar o Carro
  readonly stepsCarro: StepInstruction[] = [
    {
      line: 1,
      code: 'function ligarCarro(temChave, colocouCinto, pisouFreio) {',
      explanation: 'Passo 1: O motorista entra no carro. Os sensores do carro guardam na memória se a chave está presente e a posição dos pedais.',
      variableChanges: {}
    },
    {
      line: 2,
      code: '  let motorLigado = false;',
      explanation: 'Passo 2: O computador de bordo cria a caixinha "motorLigado = false", pois o motor ainda está em repouso.',
      variableChanges: {}
    },
    {
      line: 3,
      code: '  let alarmeCinto = false;',
      explanation: 'Passo 3: Cria a caixinha "alarmeCinto = false" para monitorar a segurança dos passageiros.',
      variableChanges: {}
    },
    {
      line: 4,
      code: '  if (!colocouCinto) {',
      explanation: 'Passo 4: Verificação de Segurança: O motorista esqueceu de colocar o cinto?',
      variableChanges: {}
    },
    {
      line: 5,
      code: '    alarmeCinto = true; // Pi-pi-pi no painel!',
      explanation: 'Passo 5: Se esqueceu o cinto, a caixinha alarmeCinto vira "true" e o painel começa a apitar!',
      variableChanges: {}
    },
    {
      line: 6,
      code: '  if (temChave && pisouFreio) {',
      explanation: 'Passo 6: Condição de Ignição: A chave está no alcance E o pé está pisando no freio?',
      variableChanges: {}
    },
    {
      line: 7,
      code: '    motorLigado = true; // Vrummm! 🚗',
      explanation: 'Passo 7: Condição atendida! O motor de arranque gira e o motor liga com sucesso (motorLigado = true).',
      variableChanges: {}
    },
    {
      line: 8,
      code: '  return { motorLigado, alarmeCinto };',
      explanation: 'Passo 8: Fim do algoritmo de partida! O carro está pronto para dirigir com segurança.',
      variableChanges: {}
    }
  ];

  // Algoritmo 2: Robô do Sanduíche
  readonly stepsLanche: StepInstruction[] = [
    {
      line: 1,
      code: 'function montarLanche(fatiasPao, querQueijo, querTostar) {',
      explanation: 'Passo 1: O robô recebe os ingredientes na bancada: número de fatias de pão e as preferências do pedido.',
      variableChanges: {}
    },
    {
      line: 2,
      code: '  let recheio = "manteiga";',
      explanation: 'Passo 2: O robô passa a manteiga básica na primeira fatia de pão (recheio = "manteiga").',
      variableChanges: {}
    },
    {
      line: 3,
      code: '  if (querQueijo) {',
      explanation: 'Passo 3: Decisão: O cliente pediu queijo no sanduíche?',
      variableChanges: {}
    },
    {
      line: 4,
      code: '    recheio = "queijo derretido e manteiga";',
      explanation: 'Passo 4: O robô adiciona uma fatia generosa de queijo sobre o pão!',
      variableChanges: {}
    },
    {
      line: 5,
      code: '  let temperatura = querTostar ? "quentinho" : "natural";',
      explanation: 'Passo 5: Se pediu para tostar, leva à sanduicheira até dourar; senão fica na temperatura ambiente.',
      variableChanges: {}
    },
    {
      line: 6,
      code: '  return { pronto: true, recheio, temperatura };',
      explanation: 'Passo 6: Lanche fechado, cortado e servido no prato! Bom apetite! 🥪',
      variableChanges: {}
    }
  ];

  // Algoritmo 3: Loja & Desconto
  readonly stepsLoja: StepInstruction[] = [
    {
      line: 1,
      code: 'function calcularDesconto(valor, isVip) {',
      explanation: 'Passo 1: A caixa registradora recebe o valor total da compra e a identificação do cliente.',
      variableChanges: {}
    },
    {
      line: 2,
      code: '  let desconto = 0;',
      explanation: 'Passo 2: Inicializa a caixinha "desconto" com R$ 0,00.',
      variableChanges: {}
    },
    {
      line: 3,
      code: '  if (isVip && valor > 100) {',
      explanation: 'Passo 3: Regra da loja: O cliente é VIP E comprou mais de R$ 100?',
      variableChanges: {}
    },
    {
      line: 4,
      code: '    desconto = valor * 0.15; // 15% de desconto',
      explanation: 'Passo 4: Regra atendida! Calcula 15% de desconto promocional.',
      variableChanges: {}
    },
    {
      line: 5,
      code: '  let valorFinal = valor - desconto;',
      explanation: 'Passo 5: Subtrai o desconto do valor original para saber quanto pagar.',
      variableChanges: {}
    },
    {
      line: 6,
      code: '  let pontos = Math.floor(valorFinal / 10);',
      explanation: 'Passo 6: Para cada R$ 10 gastos, o cliente ganha 1 ponto de fidelidade.',
      variableChanges: {}
    },
    {
      line: 7,
      code: '  return { valorFinal, pontos };',
      explanation: 'Passo 7: Imprime a nota fiscal com o total a pagar e os pontos acumulados.',
      variableChanges: {}
    }
  ];

  // Retorna os passos do algoritmo atual
  algorithmSteps = computed(() => {
    switch (this.selectedAlgorithm()) {
      case 'carro': return this.stepsCarro;
      case 'lanche': return this.stepsLanche;
      case 'loja': return this.stepsLoja;
      default: return this.stepsCarro;
    }
  });

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

  setAlgorithm(alg: AlgorithmType) {
    this.selectedAlgorithm.set(alg);
    this.resetSimulator();
  }

  setAudience(aud: AudienceType) {
    this.selectedAudience.set(aud);
  }

  resetSimulator() {
    this.currentStepIndex.set(-1);
    this.executionLog.set([]);
    this.ramVariables.set([]);
    this.cpuRegister.set('Processador em espera. Clique em "Passo a Passo" para iniciar.');
    this.memoryVariables.set({});
  }

  nextStep() {
    const steps = this.algorithmSteps();
    const nextIdx = this.currentStepIndex() + 1;
    if (nextIdx >= steps.length) return;

    this.currentStepIndex.set(nextIdx);
    const step = steps[nextIdx];

    const currentAlg = this.selectedAlgorithm();
    if (currentAlg === 'carro') {
      this.processCarroStep(nextIdx);
    } else if (currentAlg === 'lanche') {
      this.processLancheStep(nextIdx);
    } else {
      this.processLojaStep(nextIdx);
    }

    this.executionLog.update(log => [
      ...log,
      `[Passo ${nextIdx + 1}/${steps.length} • Linha ${step.line}] ${step.explanation}`
    ]);
  }

  private processCarroStep(idx: number) {
    const chave = Boolean(this.carroTemChave());
    const cinto = Boolean(this.carroColocouCinto());
    const freio = Boolean(this.carroPisouFreio());
    const alarme = !cinto;
    const motor = chave && freio;

    const vars: RamVariable[] = [];

    // Linha 1: Parâmetros de Entrada
    if (idx >= 0) {
      vars.push({ address: '0x00A1', name: 'temChave', type: 'boolean', value: chave, status: idx === 0 ? 'new' : 'unchanged' });
      vars.push({ address: '0x00A2', name: 'colocouCinto', type: 'boolean', value: cinto, status: idx === 0 ? 'new' : 'unchanged' });
      vars.push({ address: '0x00A3', name: 'pisouFreio', type: 'boolean', value: freio, status: idx === 0 ? 'new' : 'unchanged' });
    }
    // Linha 2: motorLigado
    if (idx >= 1) {
      vars.push({ address: '0x00A4', name: 'motorLigado', type: 'boolean', value: idx >= 6 ? motor : false, status: idx === 1 ? 'new' : (idx === 6 && motor ? 'updated' : 'unchanged') });
    }
    // Linha 3: alarmeCinto
    if (idx >= 2) {
      vars.push({ address: '0x00A5', name: 'alarmeCinto', type: 'boolean', value: idx >= 4 ? alarme : false, status: idx === 2 ? 'new' : (idx === 4 && alarme ? 'updated' : 'unchanged') });
    }

    this.ramVariables.set(vars);

    switch (idx) {
      case 0: this.cpuRegister.set(`Painel do Carro: Sensores lidos • Chave=${chave ? 'PRESENTE' : 'AUSENTE'}, Cinto=${cinto ? 'OK' : 'SOLTO'}, Freio=${freio ? 'PISADO' : 'LIVRE'}`); break;
      case 1: this.cpuRegister.set('Memória RAM: Alocada variável "motorLigado = false"'); break;
      case 2: this.cpuRegister.set('Memória RAM: Alocada variável "alarmeCinto = false"'); break;
      case 3: this.cpuRegister.set(`Segurança: Testando cinto... (${cinto ? 'Cinto OK, alarme fica quieto' : 'ALERTA: Motorista sem cinto!'})`); break;
      case 4: this.cpuRegister.set(alarme ? 'Alarme Acionado: Som de bipe toca no painel 🔔' : 'Alarme Ignorado: Cinto está devidamente afivelado.'); break;
      case 5: this.cpuRegister.set(`Ignição: Testando Chave (${chave}) E Freio (${freio}) => ${motor ? 'AUTORIZADO A LIGAR' : 'NÃO PODE LIGAR'}`); break;
      case 6: this.cpuRegister.set(motor ? 'Motor: VRUMMM! Partida elétrica efetuada com sucesso! 🚗💨' : 'Motor: Não ligou! Verifique se pisou no freio e tem a chave.'); break;
      case 7: this.cpuRegister.set(`Resultado Final: { motorLigado: ${motor}, alarmeCinto: ${alarme} }`); break;
    }
  }

  private processLancheStep(idx: number) {
    const fatias = Number(this.lancheFatiasPao()) || 2;
    const queijo = Boolean(this.lancheQuerQueijo());
    const tostar = Boolean(this.lancheQuerTostar());

    const vars: RamVariable[] = [];
    if (idx >= 0) {
      vars.push({ address: '0x00A1', name: 'fatiasPao', type: 'number', value: fatias, status: idx === 0 ? 'new' : 'unchanged' });
      vars.push({ address: '0x00A2', name: 'querQueijo', type: 'boolean', value: queijo, status: idx === 0 ? 'new' : 'unchanged' });
      vars.push({ address: '0x00A3', name: 'querTostar', type: 'boolean', value: tostar, status: idx === 0 ? 'new' : 'unchanged' });
    }
    if (idx >= 1) {
      vars.push({ address: '0x00A4', name: 'recheio', type: 'string', value: idx >= 3 && queijo ? 'manteiga e queijo' : 'manteiga', status: idx === 1 ? 'new' : (idx === 3 && queijo ? 'updated' : 'unchanged') });
    }
    if (idx >= 4) {
      vars.push({ address: '0x00A5', name: 'temperatura', type: 'string', value: tostar ? 'quentinho' : 'natural', status: idx === 4 ? 'new' : 'unchanged' });
    }

    this.ramVariables.set(vars);

    switch (idx) {
      case 0: this.cpuRegister.set(`Robô Culinário: ${fatias} fatias de pão na mesa. Queijo=${queijo}, Tostar=${tostar}`); break;
      case 1: this.cpuRegister.set('Bancada: Passando manteiga macia na fatia de pão...'); break;
      case 2: this.cpuRegister.set(`Decisão de Sabor: Cliente quer queijo? ${queijo ? 'SIM, adicionar!' : 'NÃO, pular queijo'}`); break;
      case 3: this.cpuRegister.set(queijo ? 'Bancada: Fatias de queijo adicionadas com sucesso!' : 'Bancada: Queijo não adicionado.'); break;
      case 4: this.cpuRegister.set(tostar ? 'Sanduicheira: Pão prensado e queijo derretido (quentinho) 🥪🔥' : 'Bancada: Sanduíche servido frio natural.'); break;
      case 5: this.cpuRegister.set('Entrega: Sanduíche finalizado e entregue na mesa do cliente! ✨'); break;
    }
  }

  private processLojaStep(idx: number) {
    const valor = Number(this.inputValor()) || 0;
    const vip = Boolean(this.isVip());
    const qualifies = vip && valor > 100;
    const desc = qualifies ? Number((valor * 0.15).toFixed(2)) : 0;
    const finalVal = Number((valor - desc).toFixed(2));
    const pts = Math.floor(finalVal / 10);

    const vars: RamVariable[] = [];
    if (idx >= 0) {
      vars.push({ address: '0x00A1', name: 'valor', type: 'number', value: valor, status: idx === 0 ? 'new' : 'unchanged' });
      vars.push({ address: '0x00A2', name: 'isVip', type: 'boolean', value: vip, status: idx === 0 ? 'new' : 'unchanged' });
    }
    if (idx >= 1) {
      vars.push({ address: '0x00A3', name: 'desconto', type: 'number', value: idx >= 3 && qualifies ? desc : 0, status: idx === 1 ? 'new' : (idx === 3 && qualifies ? 'updated' : 'unchanged') });
    }
    if (idx >= 4) {
      vars.push({ address: '0x00A4', name: 'valorFinal', type: 'number', value: finalVal, status: idx === 4 ? 'new' : 'unchanged' });
    }
    if (idx >= 5) {
      vars.push({ address: '0x00A5', name: 'pontos', type: 'number', value: pts, status: idx === 5 ? 'new' : 'unchanged' });
    }

    this.ramVariables.set(vars);

    switch (idx) {
      case 0: this.cpuRegister.set(`Caixa: Leitura da compra R$ ${valor} • VIP: ${vip}`); break;
      case 1: this.cpuRegister.set('Memória RAM: Alocado slot 0x00A3 (desconto = 0)'); break;
      case 2: this.cpuRegister.set(`Regra Comercial: (${vip} && ${valor} > 100) => ${qualifies ? 'DESCONTO AUTORIZADO' : 'SEM DESCONTO'}`); break;
      case 3: this.cpuRegister.set(qualifies ? `Cálculo: ${valor} * 0.15 = R$ ${desc} de economia!` : 'Cálculo: Sem desconto aplicado.'); break;
      case 4: this.cpuRegister.set(`Total a Pagar: R$ ${valor} - R$ ${desc} = R$ ${finalVal}`); break;
      case 5: this.cpuRegister.set(`Fidelidade: Math.floor(${finalVal} / 10) = ${pts} pontos`); break;
      case 6: this.cpuRegister.set(`Nota Fiscal Emitida: { valorFinal: ${finalVal}, pontos: ${pts} }`); break;
    }
  }

  runAllSteps() {
    this.resetSimulator();
    const len = this.algorithmSteps().length;
    for (let i = 0; i < len; i++) {
      this.nextStep();
    }
  }

  getCurrentExplanation(): string {
    const idx = this.currentStepIndex();
    const steps = this.algorithmSteps();
    if (idx === -1) {
      return 'O depurador está pausado antes da execução. Clique no botão "Passo a Passo ➔" para acompanhar a execução instrução por instrução.';
    }
    return steps[idx]?.explanation || '';
  }

  getProgressPercentage(): number {
    const idx = this.currentStepIndex();
    const total = this.algorithmSteps().length;
    if (idx < 0 || total === 0) return 0;
    return Math.round(((idx + 1) / total) * 100);
  }
}
