import { Injectable } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  constructor(private dataService: DataService) { }
  getFotos(idReferencia) {
    return this.dataService.getData('ordenes/' + idReferencia + '/fotos');
  }
}
