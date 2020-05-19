import { Injectable } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashtallerService {

  private $currentVehicleSubject: BehaviorSubject<any> = new BehaviorSubject<any>({
    ref: null
  });

  $currentVehicle;

  constructor(private dataService: DataService) {
    this.$currentVehicle = this.$currentVehicleSubject.asObservable();
  }

  init(ref) {
    this.$currentVehicleSubject.next({
      ref: ref,
    });
  }

  getVhBySector() {
    return this.dataService.getData('sectores/vehiculos');
  }

  agregarPiezas(ref, piezas) {
    const req = {
      ref: ref,
      piezas: piezas,
    }
  }

  end() {
    console.log(this.$currentVehicle);
    this.$currentVehicleSubject.next({
      ref: null,
    })
  }
}
