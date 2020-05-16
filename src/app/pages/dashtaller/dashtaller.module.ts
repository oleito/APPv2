import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashtallerRoutingModule } from './dashtaller-routing.module';
import { DashtallerComponent } from './dashtaller.component';


@NgModule({
  declarations: [DashtallerComponent],
  imports: [
    CommonModule,
    DashtallerRoutingModule
  ]
})
export class DashtallerModule { }
