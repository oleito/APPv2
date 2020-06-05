import { Injectable } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private dataService: DataService) { }

  getSeguros() {
    return this.dataService.getData('seguros');
  }
  postSeguro(data) {
    console.log('datos post seguro: ', data);
    return this.dataService.postData('seguros', data);
  }

  putOrdenSeguro(ref, seguro) {
    let res = {
      data: {
        idseguro: seguro
      }
    }
    return this.dataService.putData('ordenes/' + ref, res);
  }

  putVehiculo(idvehiculo, datos) {
    return this.dataService.putData('vehiculos/' + idvehiculo, datos)
  }

  putOrdenVehiculo(ref, data) {
    return this.dataService.putData('ordenes/' + ref, data);
  }

  putFechaVehiculo(ref, fecha) {
    let res = {
      data: {
        fecha_entrega: fecha
      }
    }
    return this.dataService.putData('ordenes/' + ref, res);
  }

  getImg(Url) {
    return this.dataService.getResource(Url)
  }

  postFotos(idReferencia, data) {
    let res = {
      data: data
    };
    console.log(res);
    return this.dataService.postData('ordenes/' + idReferencia + '/fotos', res);
  }

}
