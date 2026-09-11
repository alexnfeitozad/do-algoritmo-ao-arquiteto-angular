import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerformanceDemoComponent } from './performance-demo.component';

const routes: Routes = [
  {
    path: '',
    component: PerformanceDemoComponent,
    title: 'Performance e Otimização'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modulo12PerformanceRoutingModule {}
