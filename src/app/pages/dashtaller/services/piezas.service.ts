import { Injectable } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class PiezasService {

  constructor(private dataService: DataService) { }

  getPiezas(idReferencia) {
    return this.dataService.getData('ordenes/' + idReferencia + '/piezas');
  }

  postPiezas(idReferencia, data) {
    return this.dataService.postData('ordenes/' + idReferencia + '/piezas', data);
  }
}
