import { Component, OnInit } from '@angular/core';
import { DatosComponent } from "./../datos/datos.component";
import { PiezasComponent } from "./../piezas/piezas.component";
import { FotosComponent } from "./../fotos/fotos.component";
import { ActividadComponent } from "./../actividad/actividad.component";
import { ReferenciasComponent } from "./../referencias/referencias.component";

@Component({
  selector: 'app-mainmodal',
  templateUrl: './mainmodal.component.html',
  styleUrls: ['./mainmodal.component.css']
})
export class MainmodalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
