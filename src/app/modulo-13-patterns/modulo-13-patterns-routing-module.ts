import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatternsDemoComponent } from './patterns-demo.component';

const routes: Routes = [
  {
    path: '',
    component: PatternsDemoComponent,
    title: 'Design Patterns e SOLID'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modulo13PatternsRoutingModule {}
