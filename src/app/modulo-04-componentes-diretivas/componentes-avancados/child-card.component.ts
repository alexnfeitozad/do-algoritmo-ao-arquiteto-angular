import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="child-card">
      <div class="child-header">
        <span class="child-badge">Componente Filho</span>
        <h4>{{ title }}</h4>
      </div>
      
      <p class="child-metric">Valor recebido via <code>&#64;Input</code>: <strong>{{ count }}</strong></p>

      <!-- Projeção de conteúdo ng-content -->
      <div class="projected-content">
        <div class="projection-label">Conteúdo projetado (&lt;ng-content&gt;):</div>
        <ng-content></ng-content>
      </div>

      <div class="child-actions">
        <button class="btn btn-sm btn-primary" (click)="emitirAcao('curtir')">
          👍 Curtir (&#64;Output)
        </button>
        <button class="btn btn-sm btn-secondary" (click)="emitirAcao('compartilhar')">
          🔗 Compartilhar (&#64;Output)
        </button>
      </div>
    </div>
  `,
  styles: [`
    .child-card {
      background: #ffffff;
      border: 1.5px dashed var(--primary, #4f46e5);
      border-radius: 12px;
      padding: 1.25rem;
      margin-top: 1rem;
    }
    .child-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
      h4 { margin: 0; color: #1e293b; }
    }
    .child-badge {
      font-size: 0.7rem;
      font-weight: 700;
      background: #eef2ff;
      color: #4f46e5;
      padding: 2px 8px;
      border-radius: 9999px;
      text-transform: uppercase;
    }
    .child-metric {
      font-size: 0.9rem;
      color: #475569;
      margin-bottom: 0.75rem;
    }
    .projected-content {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 0.75rem;
      margin-bottom: 1rem;
      .projection-label {
        font-size: 0.75rem;
        color: #94a3b8;
        font-family: monospace;
        margin-bottom: 0.35rem;
      }
    }
    .child-actions {
      display: flex;
      gap: 0.5rem;
    }
  `]
})
export class ChildCardComponent {
  @Input() title: string = 'Card Filho';
  @Input() count: number = 0;
  @Output() actionEmitted = new EventEmitter<{ tipo: string; count: number }>();

  emitirAcao(tipo: string): void {
    this.actionEmitted.emit({ tipo, count: this.count });
  }
}
