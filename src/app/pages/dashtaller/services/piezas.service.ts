import { Injectable } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class PiezasService {

  constructor(private dataService:DataService) { }
}
