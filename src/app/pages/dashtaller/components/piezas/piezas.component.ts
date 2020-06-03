import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashtallerService } from '../../services/dashtaller.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PiezasService } from '../../services/piezas.service';

@Component({
  selector: 'app-piezas',
  templateUrl: './piezas.component.html',
  styleUrls: ['./piezas.component.css']
})


export class PiezasComponent implements OnInit {


  @ViewChild('inputPieza') inputPieza: ElementRef;


  subscription: Subscription
  referencia = false;
  puedePedir = false;
  pedidoInterno = true;
  modoIsDefined = false;

  puedeCargar = true;

  piezasPorCargar = [];
  piezasCargadas = [];

  currenAccion;
  modoPedido;

  //,


  constructor(protected dashtaller: DashtallerService, private piezasService: PiezasService) {
    this.subscription = this.dashtaller.$currentVehicle.subscribe(data => {
      this.referencia = data.referencia ? data.referencia : false
    }, err => {
      this.referencia = false;
      //show toast
    })
  }

  // { value: null, disabled: this.referencia === false }
  cargarPiezasForm = new FormGroup({
    pieza: new FormControl(null, Validators.required),
    accion: new FormControl(null, Validators.required),
    modo: new FormControl({ value: null, disabled: true }, Validators.required),
    codigo: new FormControl({ value: null, disabled: true }, Validators.required),
    proveedor: new FormControl({ value: null, disabled: true }, Validators.required),
  });

  ngOnInit(): void {
    this.obtenerPiezasCargadas(this.referencia);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**cargadores */
  obtenerPiezasCargadas(idReferencia) {
    this.piezasService.getPiezas(idReferencia).subscribe(res => {
      this.piezasCargadas = res.data;
    }, err => {
      console.log('getPiezas ', err)
    })
  }

  /** Detectores de cambios */
  onAccionChange() {
    this.cargarPiezasForm.controls.accion.value === '3' ? this.cargarPiezasForm.controls.modo.enable() : this.cargarPiezasForm.controls.modo.disable();
  }
  onModopedidoChange() {
    this.pedidoInterno = this.cargarPiezasForm.controls.modo.value === '1' ? true : false;
    this.cargarPiezasForm.controls.codigo.enable();
    this.cargarPiezasForm.controls.proveedor.enable();
    this.modoIsDefined = true;
  }

  /** Actuadores */
  onSubmitCargarPieza() {
    let pieza = {
      pieza: this.cargarPiezasForm.controls.pieza.value,
      accion: this.cargarPiezasForm.controls.accion.value,
      modo: this.cargarPiezasForm.controls.modo.value,
      codigo: this.cargarPiezasForm.controls.codigo.value,
      proveedor: this.cargarPiezasForm.controls.proveedor.value,
    }
    this.piezasPorCargar.push(pieza);
    this.cargarPiezasForm.controls.pieza.setValue(null);
    this.cargarPiezasForm.controls.codigo.setValue(null);
    this.inputPieza.nativeElement.focus();
  }
  eliminarPiezaPorPedir(i) {
    this.piezasPorCargar.splice(i, 1);
  }

  /** API */
  subirPiezasPorCargar() {
    let data = {
      data: {
        piezas: this.piezasPorCargar
      }
    }
    console.log(data);
    this.piezasService.postPiezas(this.referencia, data).subscribe(res => {
      this.piezasCargadas = res.data;
      this.piezasPorCargar = [];
    }, err => {
      console.log('postPiezas: ', err);
    })
  }
}
