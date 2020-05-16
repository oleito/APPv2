import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashpedidosComponent } from './dashpedidos.component';


const routes: Routes = [
  {
    path: '',
    component: DashpedidosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashpedidosRoutingModule { }
