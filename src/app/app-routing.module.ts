import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'taller',
    canActivate: [],
    loadChildren: './pages/dashtaller/dashtaller.module#DashtallerModule'
  },
  {
    path: 'pedidos',
    canActivate: [],
    loadChildren: './pages/dashpedidos/dashpedidos.module#DashpedidosModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
