import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceExemploComponent } from './service-exemplo/service-exemplo';

const routes: Routes = [
  {
    path: '',
    component: ServiceExemploComponent,
    title: 'Services e Dependency Injection'
  },
  {
    path: 'service-exemplo',
    component: ServiceExemploComponent,
    title: 'Services e Dependency Injection'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modulo05ServicesDiRoutingModule {}
