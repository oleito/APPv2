import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashtallerService } from '../../services/dashtaller.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-piezas',
  templateUrl: './piezas.component.html',
  styleUrls: ['./piezas.component.css']
})
export class PiezasComponent implements OnInit {
  subscription: Subscription
  referencia = false;
  puedePedir = false;
  pedidoInterno = true;
  modoIsDefined = false;

  puedeCargar = true;

  piezasPorCargar = [];

  currenAccion;
  modoPedido;

  //,


  constructor(protected dashtaller: DashtallerService) {
    this.subscription = this.dashtaller.$currentVehicle.subscribe(data => {
      this.referencia = data.referencia ? data.referencia : false
    }, err => {
      this.referencia = false;
      //show toast
    })
  }

  // { value: null, disabled: this.referencia === false }
  cargarPiezasForm = new FormGroup({
    pieza: new FormControl('', Validators.required),
    accion: new FormControl('', Validators.required),
    modo: new FormControl({ value: '', disabled: true }, Validators.required),
    codigo: new FormControl({ value: '', disabled: true }, Validators.required),
    proveedor: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAccionChange() {
    console.log(this.cargarPiezasForm.controls.accion.value);
    this.cargarPiezasForm.controls.accion.value === '3' ? this.cargarPiezasForm.controls.modo.enable() : this.cargarPiezasForm.controls.modo.disable();
  }
  onModopedidoChange() {
    this.pedidoInterno = this.cargarPiezasForm.controls.modo.value === '1' ? true : false;
    this.cargarPiezasForm.controls.codigo.enable();
    this.cargarPiezasForm.controls.proveedor.enable();
    this.modoIsDefined = true;
  }

  onSubmitCargarPieza(){
    this.piezasPorCargar.push(this.cargarPiezasForm.value);
    console.log(this.piezasPorCargar);
  }

}
