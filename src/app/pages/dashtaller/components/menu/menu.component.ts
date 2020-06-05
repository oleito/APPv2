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
  carrocerias;
  carroceriasImg = [];
  imageToShow;
  currentMarca = null;
  currentModelo = null;
  loadingMarcas = true;
  loadingModelos = true;
  canUpdate = false;
  selectedMarca;
  selectedModelo;

  defImg = 'https://via.placeholder.com/350x220';
  currentCarroceriaImg = this.defImg;

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
    this.obtenerMarcas();
    this.obtenerCarrocerias();
  }


  selectedDate;
  selectedTime;
  model: NgbDateStruct;
  // let myDate = new Date(ngbDate.year, ngbDate.month-1, ngbDate.day);
  date;
  // date: { year: number, month: number };

  onDateSelect() {
    let selectDate = new Date(this.date.year, this.date.month - 1, this.date.day);
    this.selectedDate = selectDate.toLocaleDateString('es-AR');
  }
  onDateConfirm() {
    console.log(this.selectedDate);
    this.menuService.putFechaVehiculo(this.referencia, this.selectedDate).subscribe(res => {
      console.log(res);
    }, err => {
      console.log('putFechaVehiculo', err);
    }
    )
  }




  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /** VEHICULO */
  onSubmitVehiculo(): void {
    let res = {
      data: {
        patente: this.vehiculoForm.controls.patente.value,
        vin: this.vehiculoForm.controls.vin.value,
        color: this.vehiculoForm.controls.color.value,
      }
    }
    this.menuService.putVehiculo(this.idvehiculo, res).subscribe(res => {
      this.dashtallerService.updateDatosVehiculo('idvehiculo', this.idvehiculo);
      this.dashtallerService.updateDatosVehiculo('patente', res.data.patente);
      this.dashtallerService.updateDatosVehiculo('vin', res.data.vin);
      this.dashtallerService.updateDatosVehiculo('color', res.data.color);
    }, err => {
      console.log('putvehiculo ', err);
    })
  }

  /** SEGUROS */
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

  /** MODELO */
  obtenerMarcas() {
    this.loadingMarcas = true;
    this.modelsmodalService.getMarcas().subscribe(res => {
      this.marcas = res.data;
      this.loadingMarcas = false;
    }, err => {
      console.log('Get marcas ', err)
      this.loadingMarcas = false;
    })
  }
  obtenerCarrocerias() {
    this.modelsmodalService.getCarrocerias().subscribe(res => {
      this.carrocerias = res.data;
      this.carrocerias.map(carr => {
        this.menuService.getImg(carr.Img).subscribe(res => {
          this.createImageFromBlob(res, carr.Id);
        }, err => {
          console.log('getImg: ', err)
        });
      });
      // console.log(this.carroceriasImg);
    }, err => {
      console.log('getCarrocerias: ', err);
    })
  }

  createImageFromBlob(image: Blob, ID) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // this.imageToShow = ;
      this.carroceriasImg.push({ image: reader.result, id: ID });
      // console.log(this.carroceriasImg);
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  obtenerModelos(marca) {
    this.loadingModelos = true;
    this.modelsmodalService.getModelos(marca).subscribe(res => {
      this.modelos = res.data;
      this.loadingModelos = false;
    }, err => {
      console.log('Get modelos ', err)
      this.loadingModelos = false;
    })
  }

  /** Actuadores */
  selectMarca() {
    this.loadingModelos = true;
    this.currentMarca = this.selectedMarca;
    this.obtenerModelos(this.currentMarca);
    this.canUpdate = false;
    this.selectedModelo = null;
  }
  selectModelo() {
    const modelo = this.modelos.find(modelo => {
      return modelo.Id === this.selectedModelo;
    })
    console.clear();
    console.log(modelo);
    this.updateImg(modelo.Tipo);
    this.canUpdate = true;
  }
  updateImg(idCarroceria) {
    console.log(idCarroceria);
    console.log(this.carroceriasImg);
    const carroceria = this.carroceriasImg.find(img => {
      return img.id === idCarroceria;
    });
    this.imageToShow = idCarroceria == null ? this.defImg : carroceria.image;
  }

  updateModelo() {
    this.canUpdate = false;
    this.loadingMarcas = true;
    this.loadingModelos = true;
    let res = {
      data: {
        idModelo: this.selectedModelo,
      }
    }
    this.menuService.putVehiculo(this.idvehiculo, res).subscribe(res => {
      const modelo = this.modelos.find(modelo => {
        return modelo.Id === this.selectedModelo;
      })
      const marca = this.marcas.find(marca => {
        return marca.Id === this.selectedMarca;
      })
      this.dashtallerService.updateDatosVehiculo('modelo', modelo.Modelo);
      this.dashtallerService.updateDatosVehiculo('marca', marca.Marca);
      this.loadingMarcas = false;
      this.loadingModelos = false;
    }, err => {
      console.log('putVehiculo', err);
    });
  }

  openModal() {
    this.modal.open(ModelsmodalComponent, { size: 'lg' });
  }

  /**fotos */

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64;
  cardImagesBase64 = [];
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      let qt = fileInput.target.files.length;
      console.log(qt);
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';
        return false;
      }

      for (let i = 0; i < qt; i++) {

        const reader = new FileReader();

        // const element = array[index];
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            const img_height = rs.currentTarget['height'];
            const img_width = rs.currentTarget['width'];

            console.log(img_height, img_width);

            let ratio = img_width / 40;

            if (img_height > max_height && img_width > max_width) {
              this.imageError =
                'Maximum dimentions allowed ' +
                max_height +
                '*' +
                max_width +
                'px';
              return false;
            } else {
              const imgBase64Path = e.target.result;
              this.cardImagesBase64.push(imgBase64Path);
              this.isImageSaved = true;
            }
          };
        };
        let file = fileInput.target.files[i];
        reader.readAsDataURL(file);
      }
    }
    console.log(this.cardImagesBase64);
  }

  subirFotos() {
    this.menuService.postFotos(this.referencia, this.cardImagesBase64).subscribe(res => {
      console.log(res.data);
    })
  }
}
