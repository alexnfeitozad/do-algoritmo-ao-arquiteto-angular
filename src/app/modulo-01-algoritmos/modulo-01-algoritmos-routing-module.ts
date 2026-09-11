import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./fundamentos-algoritmos/fundamentos-algoritmos').then(m => m.FundamentosAlgoritmos),
    title: 'Lógica e Algoritmos do Zero'
  },
  {
    path: 'fundamentos-algoritmos',
    loadComponent: () => import('./fundamentos-algoritmos/fundamentos-algoritmos').then(m => m.FundamentosAlgoritmos),
    title: 'Lógica e Algoritmos do Zero'
  },
  {
    path: 'estruturas-dados',
    loadComponent: () => import('./estruturas-dados/estruturas-dados').then(m => m.EstruturasDados),
    title: 'Estruturas de Dados'
  },
  {
    path: 'algoritmos-busca',
    loadComponent: () => import('./algoritmos-busca/algoritmos-busca').then(m => m.AlgoritmosBusca),
    title: 'Algoritmos de Busca'
  },
  {
    path: 'algoritmos-ordenacao',
    loadComponent: () => import('./algoritmos-ordenacao/algoritmos-ordenacao').then(m => m.AlgoritmosOrdenacao),
    title: 'Algoritmos de Ordenação'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modulo01AlgoritmosRoutingModule {}
