import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HttpApisComponent } from './http-apis.component';

const routes: Routes = [
  {
    path: '',
    component: HttpApisComponent,
    title: 'HTTP e APIs'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modulo06HttpApisRoutingModule {}
