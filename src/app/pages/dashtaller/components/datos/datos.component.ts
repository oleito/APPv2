import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashtallerService } from '../../services/dashtaller.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {
  subscription: Subscription
  referencia = false;
  datosVehiculo: {
    observaciones: null;
    marca: null;
    modelo: null;
    patente: null;
    vin: null;
    color: null;
    seguro: null;
    fecha_entrega: null;
  };

  observacionesForm = new FormGroup({
    observaciones: new FormControl({ value: null, disabled: !this.referencia }, Validators.required),
  })

  constructor(
    protected dashtallerService: DashtallerService,
    private datosService: DatosService
  ) {
    this.subscription = this.dashtallerService.$currentVehicle.subscribe(data => {
      this.referencia = data.referencia ? data.referencia : false;
      this.observacionesForm.controls.observaciones.enable();
      this.datosVehiculo = data;
    }, err => {
      this.referencia = false;
      //show toast
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.observacionesForm.controls.observaciones.disable();
  }

  onSubmitObservacionesForm() {
    this.observacionesForm.controls.observaciones.disable();
    this.datosService.putObservOrden(this.referencia, this.observacionesForm.controls.observaciones.value).subscribe(res => {
      this.dashtallerService.updateDatosVehiculo('observaciones', res.data.observaciones);
    }, err => {
      console.log('putObservOrde() ', err);
    })
  }

  editarObservaciones() {
    let tmpObs = this.datosVehiculo.observaciones;
    this.datosVehiculo.observaciones = null;
    this.observacionesForm.controls.observaciones.setValue(tmpObs);
  }


}
