import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComponentesAvancados } from './componentes-avancados/componentes-avancados';

const routes: Routes = [
  {
    path: '',
    component: ComponentesAvancados,
    title: 'Componentes e Diretivas'
  },
  {
    path: 'componentes-avancados',
    component: ComponentesAvancados,
    title: 'Componentes e Diretivas'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modulo04ComponentesDiretivasRoutingModule {}
