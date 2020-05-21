import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ModelsmodalComponent } from "./../modelsmodal/modelsmodal.component";
import { DashtallerService } from '../../services/dashtaller.service';
import { isNumber } from 'util';
import { Subscription } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  seguros = [];

  loadingSeguro = false;

  isInited = false;
  error = false;

  seguroSelected;

  subscription: Subscription;

  constructor(
    private modal: NgbModal,
    private dashtallerService: DashtallerService,
    private menuService: MenuService
  ) {
    this.subscription = this.dashtallerService.$currentVehicle.subscribe(data => {
      this.isInited = data.referencia ? data.referencia : false;
    }, err => {
      this.error = true;
      //show toast
    })
  }

  nuevoSeguroForm = new FormGroup({
    nuevoSeguro: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.obtenerSeguros();
  }
  model: NgbDateStruct;
  date: { year: number, month: number };

  fechaElejida() {
    console.log("fecha elejida: ")
  }

  openModal() {
    this.modal.open(ModelsmodalComponent, { size: 'lg' });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  obtenerSeguros(): void {
    this.menuService.getSeguros().subscribe(res => {
      console.log(res.data);
      this.seguros = res.data;
    }, err => {
      console.log(err);
    })
  }


  actualizarSeguro() {
    this.loadingSeguro = true;
    this.menuService.putOrdenSeguro(this.isInited, this.seguroSelected).subscribe(res => {
      console.log(res.data);

      const seguroFila = this.seguros.find(seguro => {
        return seguro.Id === this.seguroSelected;
      })

      this.dashtallerService.updateDatosVehiculo('seguro', seguroFila.Seguro);

      this.loadingSeguro = false;
    }, err => {
      console.log(err);
      this.loadingSeguro = false
    })
  }

  onSubmitNuevoSeguro(): void {
    let res = {
      data: {
        seguro: this.nuevoSeguroForm.controls.nuevoSeguro.value,
      }
    }
    this.loadingSeguro = true;
    this.menuService.postSeguro(res).subscribe(res => {
      this.seguros = res.data;
      this.loadingSeguro = false;
      this.nuevoSeguroForm.reset();
      console.log('reset');
    }, err => {
      console.log(err);
    })
  }

  obtenerMarcas(): void { }

  obtenerModelos(): void { }

}
