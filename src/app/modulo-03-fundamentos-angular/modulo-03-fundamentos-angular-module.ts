import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Modulo03FundamentosAngularRoutingModule } from './modulo-03-fundamentos-angular-routing-module';
import { ComponentesBasicos } from './componentes-basicos/componentes-basicos';
import { DataBinding } from './data-binding/data-binding';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Modulo03FundamentosAngularRoutingModule,
    ComponentesBasicos,
    DataBinding
  ],
})
export class Modulo03FundamentosAngularModule {}
