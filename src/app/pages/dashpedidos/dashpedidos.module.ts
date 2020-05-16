import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashpedidosRoutingModule } from './dashpedidos-routing.module';
import { DashpedidosComponent } from './dashpedidos.component';


@NgModule({
  declarations: [DashpedidosComponent],
  imports: [
    CommonModule,
    DashpedidosRoutingModule
  ]
})
export class DashpedidosModule { }
