import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutingDemoComponent } from './routing-demo.component';

const routes: Routes = [
  {
    path: '',
    component: RoutingDemoComponent,
    title: 'Routing e Navegação'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modulo08RoutingRoutingModule {}
