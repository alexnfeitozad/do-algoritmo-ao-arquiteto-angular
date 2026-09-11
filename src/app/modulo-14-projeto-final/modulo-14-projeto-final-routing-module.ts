import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjetoFinalComponent } from './projeto-final.component';

const routes: Routes = [
  {
    path: '',
    component: ProjetoFinalComponent,
    title: 'Projeto Final Integrador'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modulo14ProjetoFinalRoutingModule {}
