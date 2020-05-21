import { Injectable } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashtallerService {

  private $currentVehicleSubject: BehaviorSubject<any> = new BehaviorSubject<any>({
    referencia: null
  });

  $currentVehicle;
  vehiculo = {
    referencia: false,
    idvehiculo: null,
    seguro: null,
  }

  constructor(private dataService: DataService) {
    this.$currentVehicle = this.$currentVehicleSubject.asObservable();
  }

  init(data) {
    this.vehiculo.referencia = data.referencia;
    this.vehiculo.idvehiculo = data.idvehiculo;
    this.$currentVehicleSubject.next(
      this.vehiculo
    );
  }

  updateDatosVehiculo(prop, data) {
    this.vehiculo[prop] = data;
    this.$currentVehicleSubject.next(
      this.vehiculo
    );
  }

  obtenerDatosVehiculo(referencia) {
    this.getDetalleOrden(referencia).subscribe(res => {
      this.$currentVehicleSubject.next(res.data);
    }, err => {
      console.log('obtenerDatosVehiculo() ', err)
    })
  }
  getDetalleOrden(referencia) {
    return this.dataService.getData('ordenes/' + referencia);
  }


  getVhBySector() {
    return this.dataService.getData('sectores/vehiculos');
  }

  end() {
    console.log(this.$currentVehicle);
    this.$currentVehicleSubject.next({
      referencia: null,
    })
  }
}
