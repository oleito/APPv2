import { Injectable } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class DashpedidosService {

  constructor(private dataService: DataService) { }
  getOrdenes() {
    return this.dataService.getData('ordenes/pedidos');
  }
}
