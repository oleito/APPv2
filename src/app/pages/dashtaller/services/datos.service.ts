import { Injectable } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private dataService:DataService) { }


  putObservOrden(ref, obs) {
    let res = {
      data: {
        observaciones: obs
      }
    }
    return this.dataService.putData('ordenes/' + ref, res);
  }
}
