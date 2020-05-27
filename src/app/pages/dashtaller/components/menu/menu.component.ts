import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ModelsmodalComponent } from "./../modelsmodal/modelsmodal.component";
import { DashtallerService } from '../../services/dashtaller.service';
import { isNumber } from 'util';
import { Subscription } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModelsmodalService } from '../../services/modelsmodal.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  /**modelo */
  marcas;
  modelos;
  currentMarca = null;
  currentModelo = null;
  loadingMarca = true;
  loadingModelo = true;
  canUpdate = false;

  /**seguros */
  seguros = [];
  seguroSelected;

  loadingSeguro = false;

  referencia = false;
  idvehiculo;

  error = false;

  subscription: Subscription;

  constructor(
    private modal: NgbModal,
    private dashtallerService: DashtallerService,
    private menuService: MenuService,
    private modelsmodalService: ModelsmodalService
  ) {
    this.subscription = this.dashtallerService.$currentVehicle.subscribe(data => {
      this.referencia = data.referencia ? data.referencia : false;
      this.idvehiculo = data.idvehiculo ? data.idvehiculo : false;
    }, err => {
      this.error = true;
      //show toast
    })
  }

  nuevoSeguroForm = new FormGroup({
    nuevoSeguro: new FormControl('', Validators.required),
  })

  vehiculoForm = new FormGroup({
    patente: new FormControl('', Validators.required),
    vin: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
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
      this.seguros = res.data;
    }, err => {
      console.log('obtenerSeguros() ', err);
    })
  }

  actualizarSeguro() {
    this.loadingSeguro = true;
    this.menuService.putOrdenSeguro(this.referencia, this.seguroSelected).subscribe(res => {
      const seguroFila = this.seguros.find(seguro => {
        return seguro.Id === this.seguroSelected;
      })
      this.dashtallerService.updateDatosVehiculo('seguro', seguroFila.Seguro);
      this.loadingSeguro = false;
    }, err => {
      console.log('actualizarSeguro() ', err);
      this.loadingSeguro = false
    })
  }

  onSubmitVehiculo(): void {
    let res = {
      data: {
        patente: this.vehiculoForm.controls.patente.value,
        vin: this.vehiculoForm.controls.vin.value,
        color: this.vehiculoForm.controls.color.value,
      }
    }
    console.log(this.idvehiculo);
    console.log(res);
    this.menuService.putVehiculo(this.idvehiculo, res).subscribe(res => {
      this.dashtallerService.updateDatosVehiculo('idvehiculo', this.idvehiculo);
      this.dashtallerService.updateDatosVehiculo('patente', res.data.patente);
      this.dashtallerService.updateDatosVehiculo('vin', res.data.vin);
      this.dashtallerService.updateDatosVehiculo('color', res.data.color);
    }, err => {
      console.log('putvehiculo ', err);
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
    }, err => {
      console.log('onSubmitNuevoSeguro() ', err);
      this.loadingSeguro = false;
    })
  }

  /** Cargadores */
  obtenerMarcas() {
    this.loadingMarca = true;
    this.modelsmodalService.getMarcas().subscribe(res => {
      this.marcas = res.data;
      this.loadingMarca = false;
    }, err => {
      console.log('Get marcas ', err)
      this.loadingMarca = false;
    })
  }

  obtenerModelos(marca) {
    this.loadingModelo = true;
    this.modelsmodalService.getModelos(marca).subscribe(res => {
      this.modelos = res.data;
      this.loadingModelo = false;
    }, err => {
      console.log('Get marcas ', err)
      this.loadingModelo = false;
    })
  }

  /** Actuadores */
  selectMarca(idMarca) {
    this.loadingModelo = true;
    this.currentMarca = idMarca;
    this.obtenerModelos(this.currentMarca);
    this.canUpdate = false;
  }

  selectModelo(idModelo) {
    this.currentModelo = idModelo;
    const modelo = this.modelos.find(modelo => {
      return modelo.Id === idModelo;
    })
    this.canUpdate = false;
    // this.currentCarroceria = modelo.Tipo;
    // this.updateImg(this.currentCarroceria);
    // this.loadingCarrocerias = false;
  }

  updateImg(idCarroceria) {
    // const carroceria = this.carrocerias.find(tipo => {
    //   return tipo.Id === idCarroceria;
    // });
    // this.currentCarroceriaImg = idCarroceria == null ? this.defImg : carroceria.Img;
  }
}
