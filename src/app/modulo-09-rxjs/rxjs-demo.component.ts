import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { 
  Observable, 
  Subject, 
  BehaviorSubject, 
  Subscription, 
  of, 
  interval, 
  timer 
} from 'rxjs';
import { 
  map, 
  filter, 
  debounceTime, 
  distinctUntilChanged, 
  switchMap, 
  take, 
  delay 
} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './rxjs-demo.component.html',
  styleUrl: './rxjs-demo.component.scss'
})
export class RxjsDemoComponent implements OnInit, OnDestroy {
  // Operadores
  inputBusca: string = '';
  private searchSubject = new Subject<string>();
  resultadosBusca: string[] = [];
  buscando: boolean = false;

  // Stream de Operadores (Map / Filter)
  numerosStream: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  filtroSelecionado: 'todos' | 'pares' | 'dobro' = 'todos';
  streamProcessado: (number | string)[] = [];

  // BehaviorSubject Demo
  private contadorSubject = new BehaviorSubject<number>(0);
  contador$: Observable<number> = this.contadorSubject.asObservable();
  historicoSubject: number[] = [];

  // Marble / Stream Logs
  streamLogs: string[] = [];
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.inicializarBuscaDebounce();
    this.aplicarOperadoresStream();

    const subContador = this.contador$.subscribe(v => {
      this.historicoSubject.unshift(v);
      if (this.historicoSubject.length > 5) this.historicoSubject.pop();
    });
    this.subscriptions.add(subContador);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  inicializarBuscaDebounce(): void {
    const sub = this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(termo => {
        this.buscando = true;
        this.registrarLog(`switchMap: Cancelou request anterior e iniciou busca por "${termo}"`);
        // Simulação de endpoint assíncrono com delay
        return of([
          `Resultado 1 para "${termo}"`,
          `Resultado 2 para "${termo}"`,
          `Dica Angular sobre "${termo}"`
        ]).pipe(delay(500));
      })
    ).subscribe(resultados => {
      this.resultadosBusca = resultados;
      this.buscando = false;
      this.registrarLog(`Observable completou emissão com ${resultados.length} itens.`);
    });

    this.subscriptions.add(sub);
  }

  onDigitarBusca(termo: string): void {
    this.inputBusca = termo;
    if (termo.trim().length > 1) {
      this.searchSubject.next(termo);
    } else {
      this.resultadosBusca = [];
      this.buscando = false;
    }
  }

  aplicarOperadoresStream(): void {
    if (this.filtroSelecionado === 'todos') {
      this.streamProcessado = [...this.numerosStream];
    } else if (this.filtroSelecionado === 'pares') {
      // Demonstração do operador filter
      of(...this.numerosStream).pipe(
        filter(n => n % 2 === 0)
      ).subscribe();
      this.streamProcessado = this.numerosStream.filter(n => n % 2 === 0);
    } else if (this.filtroSelecionado === 'dobro') {
      // Demonstração do operador map
      this.streamProcessado = this.numerosStream.map(n => n * 2);
    }
    this.registrarLog(`Operador [${this.filtroSelecionado}] aplicado aos dados.`);
  }

  emitirProximoValorSubject(): void {
    const proximo = this.contadorSubject.value + 1;
    this.contadorSubject.next(proximo);
    this.registrarLog(`BehaviorSubject.next(${proximo}) emitido.`);
  }

  resetarSubject(): void {
    this.contadorSubject.next(0);
    this.registrarLog('BehaviorSubject resetado para 0.');
  }

  simularStreamInterval(): void {
    this.registrarLog('Iniciando stream com interval(500).pipe(take(5))...');
    interval(500).pipe(
      take(5),
      map(v => `Tic #${v + 1}`)
    ).subscribe({
      next: (val) => this.registrarLog(`Stream emitiu: ${val}`),
      complete: () => this.registrarLog('Stream finalizou (complete)!')
    });
  }

  registrarLog(msg: string): void {
    const time = new Date().toLocaleTimeString();
    this.streamLogs.unshift(`[${time}] ${msg}`);
    if (this.streamLogs.length > 8) this.streamLogs.pop();
  }

  limparLogs(): void {
    this.streamLogs = [];
  }
}
