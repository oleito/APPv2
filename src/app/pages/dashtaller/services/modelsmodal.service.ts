import { Injectable } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ModelsmodalService {

  constructor(private dataService: DataService) { }

  getMarcas() {
    return this.dataService.getData('marcas');
  }
  postMarca(nuevaMarca) {
    return this.dataService.postData('marcas', nuevaMarca);
  }

  getModelos(marca) {
    return this.dataService.getData('marcas/' + marca + '/modelos');
  }
  postModelo(marca, nuevoModelo) {
    return this.dataService.postData('marcas/' + marca + '/modelos', nuevoModelo);
  }

  getCarrocerias() {
    return this.dataService.getData('tipos');
  }

}
