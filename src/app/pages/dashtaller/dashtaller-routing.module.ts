import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashtallerComponent } from './dashtaller.component';


const routes: Routes = [
  {
    path: '',
    component: DashtallerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashtallerRoutingModule { }
