import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipagemAvancada } from './tipagem-avancada/tipagem-avancada';
import { PooTypescript } from './poo-typescript/poo-typescript';

const routes: Routes = [
  {
    path: '',
    component: TipagemAvancada,
    title: 'Tipagem Avançada'
  },
  {
    path: 'tipagem-avancada',
    component: TipagemAvancada,
    title: 'Tipagem Avançada'
  },
  {
    path: 'poo-typescript',
    component: PooTypescript,
    title: 'POO TypeScript'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modulo02TypescriptRoutingModule {}
