import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RxjsDemoComponent } from './rxjs-demo.component';

const routes: Routes = [
  {
    path: '',
    component: RxjsDemoComponent,
    title: 'RxJS Reativo'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modulo09RxjsRoutingModule {}
