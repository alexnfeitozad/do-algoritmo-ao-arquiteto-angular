import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-onpush-child',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="strategy-card onpush">
      <div class="strategy-header">
        <span class="badge badge-success">OnPush Strategy</span>
        <h4>Componente Otimizado</h4>
      </div>
      <p>Ciclos de verificação avaliados: <strong class="badge-count">{{ checkCount() }}</strong></p>
      <p class="desc">Só re-renderiza quando o <code>&#64;Input</code> referencial muda, evento interno ocorre ou Signal emite.</p>
    </div>
  `,
  styles: [`
    .strategy-card.onpush {
      background: #f0fdf4;
      border: 1.5px solid #86efac;
      border-radius: 10px;
      padding: 1rem;
      .strategy-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; h4 { margin: 0; color: #166534; } }
      .badge-count { font-size: 1.2rem; color: #15803d; }
      .desc { font-size: 0.8rem; color: #4b5563; margin-top: 0.5rem; }
    }
  `]
})
export class OnPushChildComponent {
  // Chamado a cada verificação de template
  checkCount = signal(1);

  incrementarCheck(): void {
    this.checkCount.update(c => c + 1);
  }
}

@Component({
  selector: 'app-performance-demo',
  standalone: true,
  imports: [CommonModule, RouterLink, OnPushChildComponent],
  templateUrl: './performance-demo.component.html',
  styleUrl: './performance-demo.component.scss'
})
export class PerformanceDemoComponent {
  contadorPai = signal<number>(0);
  textoDigitado = signal<string>('');
  deferAtivado = signal<boolean>(false);

  // Lista com 10.000 itens simulados para demonstrar track em loop
  itens = signal<{ id: number; nome: string }[]>([
    { id: 1, nome: 'Item A (TrackBy ID)' },
    { id: 2, nome: 'Item B (TrackBy ID)' },
    { id: 3, nome: 'Item C (TrackBy ID)' },
    { id: 4, nome: 'Item D (TrackBy ID)' }
  ]);

  incrementarPai(): void {
    this.contadorPai.update(v => v + 1);
  }

  embaralharItens(): void {
    this.itens.update(lista => [...lista].reverse());
  }

  ativarDefer(): void {
    this.deferAtivado.set(true);
  }
}
