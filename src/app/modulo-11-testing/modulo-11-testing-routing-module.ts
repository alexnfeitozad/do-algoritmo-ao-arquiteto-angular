import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestingDemoComponent } from './testing-demo.component';

const routes: Routes = [
  {
    path: '',
    component: TestingDemoComponent,
    title: 'Testes Unitários'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modulo11TestingRoutingModule {}
