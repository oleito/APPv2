import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelsmodalService } from '../../services/modelsmodal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modelsmodal',
  templateUrl: './modelsmodal.component.html',
  styleUrls: ['./modelsmodal.component.css']
})
export class ModelsmodalComponent implements OnInit {
  marcas;
  modelos;
  carrocerias;

  loadingMarca = true;
  loadingModelo = true;
  loadingCarrocerias = true;

  readyToConfirm = false;

  currentMarca: number;
  currentModelo: number;
  currentCarroceria: number;

  marcaForm = new FormGroup({
    marca: new FormControl('', Validators.required),
  });
  modeloForm = new FormGroup({
    modelo: new FormControl('', Validators.required),
  });

  constructor(
    private activeModal: NgbActiveModal,
    private modelsmodalService: ModelsmodalService) { }

  ngOnInit(): void {
    this.obtenerMarcas();
    this.obtenerCarrocerias();
  }
  ngOnDestroy() {
    console.log('modal cerrado');
  }

  onSubmitMarca(): void {
    this.loadingMarca = true;
    let res = {
      data: {
        marca: this.marcaForm.controls.marca.value,
      }
    }
    this.modelsmodalService.postMarca(res).subscribe(res => {
      this.loadingMarca = false;
      this.marcas = res.data;
      this.marcaForm.reset();
    }, err => {
      console.log('postmarca', err);
      this.loadingMarca = false;
    })
  }

  onSubmitModelo(): void {
    this.loadingModelo = true;
    let res = {
      data: {
        modelo: this.modeloForm.controls.modelo.value,
      }
    }
    this.modelsmodalService.postModelo(this.currentMarca, res).subscribe(res => {
      this.loadingModelo = false;
      this.modelos = res.data;
      this.modeloForm.reset();
    }, err => {
      console.log('postmodelo', err);
      this.loadingModelo = false;
    })
  }

  closeModelsModal() {
    console.log('Cerrar');
    this.activeModal.close('Close click');
  }

  obtenerMarcas() {
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

  obtenerCarrocerias() {
    this.modelsmodalService.getCarrocerias().subscribe(res => {
      this.carrocerias = res.data;
    }, err => {
      console.log('getCarrocerias: ', err);
    })
  }

  selectMarca(idMarca) {
    this.loadingModelo = true;
    this.currentMarca = idMarca;
    this.obtenerModelos(this.currentMarca);
  }

  selectModelo(idModelo) {
    this.currentModelo = idModelo;
    console.log('Selected modelo', this.currentModelo);


    const seguroFila = this.modelos.find(modelo => {
      return modelo.Id === idModelo;
    })

    this.currentCarroceria = seguroFila.Tipo;

  }

  confirmar() {
    console.log(this.marcas);
    console.log(this.modelos);
  }

}
