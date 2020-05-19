import { Injectable } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ReferenciasService {

  constructor(private dataService: DataService) { }
  postReferencia(data) {
    return this.dataService.postData('ordenes', data);
  }
}
