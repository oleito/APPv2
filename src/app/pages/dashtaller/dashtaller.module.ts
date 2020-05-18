import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashtallerRoutingModule } from './dashtaller-routing.module';
import { DashtallerComponent } from './dashtaller.component';
import { MainmodalComponent } from './components/mainmodal/mainmodal.component';
import { ModelsmodalComponent } from './components/modelsmodal/modelsmodal.component';
import { DatosComponent } from './components/datos/datos.component';
import { PiezasComponent } from './components/piezas/piezas.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { ReferenciasComponent } from './components/referencias/referencias.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './components/menu/menu.component';



@NgModule({
  declarations: [DashtallerComponent, MainmodalComponent, ModelsmodalComponent, DatosComponent, PiezasComponent, FotosComponent, ActividadComponent, ReferenciasComponent, MenuComponent],
  imports: [
    CommonModule,
    DashtallerRoutingModule,
    DragDropModule,
    NgbModule,
  ]
})
export class DashtallerModule { }
