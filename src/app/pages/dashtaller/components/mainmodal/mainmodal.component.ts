import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatosComponent } from "./../datos/datos.component";
import { PiezasComponent } from "./../piezas/piezas.component";
import { FotosComponent } from "./../fotos/fotos.component";
import { ActividadComponent } from "./../actividad/actividad.component";
import { ReferenciasComponent } from "./../referencias/referencias.component";

import { NgbDateStruct, NgbCalendar, NgbTimepickerConfig, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashtallerService } from '../../services/dashtaller.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mainmodal',
  templateUrl: './mainmodal.component.html',
  styleUrls: ['./mainmodal.component.css']
})
export class MainmodalComponent implements OnInit {
  subscription: Subscription;
  isInited = false;
  referencia;

  constructor(private modal: NgbModal, private calendar: NgbCalendar, config: NgbTimepickerConfig, protected dashTallerService: DashtallerService) {
    this.subscription = this.dashTallerService.$currentVehicle.subscribe(data => {
      this.referencia = data.referencia;
      this.isInited = true;
    }, err => {
      this.isInited = false;
      //show toast
    })
  }

  ngOnInit(): void {
    this.dashTallerService.obtenerDatosVehiculo(Number(this.referencia));
  }
  openModal(content) {
    this.modal.open(content, { size: 'lg', scrollable: true });
  }
  ngOnDestroy(): void {
    this.dashTallerService.end();
  }
}
