import { Component, OnInit } from '@angular/core';
import { DatosComponent } from "./../datos/datos.component";
import { PiezasComponent } from "./../piezas/piezas.component";
import { FotosComponent } from "./../fotos/fotos.component";
import { ActividadComponent } from "./../actividad/actividad.component";
import { ReferenciasComponent } from "./../referencias/referencias.component";

import { NgbDateStruct, NgbCalendar, NgbTimepickerConfig, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mainmodal',
  templateUrl: './mainmodal.component.html',
  styleUrls: ['./mainmodal.component.css']
})
export class MainmodalComponent implements OnInit {

  constructor(private modal: NgbModal, private calendar: NgbCalendar, config: NgbTimepickerConfig) { }

  ngOnInit(): void {
  }
  openModal(content) {
    this.modal.open(content, { size: 'lg', scrollable: true });
  }

}
