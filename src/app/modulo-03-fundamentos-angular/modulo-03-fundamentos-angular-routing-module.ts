import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentesBasicos } from './componentes-basicos/componentes-basicos';
import { DataBinding } from './data-binding/data-binding';

const routes: Routes = [
  {
    path: '',
    component: ComponentesBasicos,
    title: 'Componentes Básicos'
  },
  {
    path: 'componentes-basicos',
    component: ComponentesBasicos,
    title: 'Componentes Básicos'
  },
  {
    path: 'data-binding',
    component: DataBinding,
    title: 'Data Binding'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modulo03FundamentosAngularRoutingModule {}
