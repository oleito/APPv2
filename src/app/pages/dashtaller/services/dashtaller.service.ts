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

  constructor(private dataservice: DataService) {
    this.$currentVehicle = this.$currentVehicleSubject.asObservable();
  }

  init(ref) {
    const req = {
      ref: ref,
    }
    this.$currentVehicleSubject.next({
      ref: ref,
    });
    // this.dataservice.postData('/ordenes', {req}).subscribe(res => {
    //   let currentVehicle = res.vehicle;
    //   this.$currentVehicleSubject.next(currentVehicle);
    // } , err => {
    //   this.$currentVehicleSubject.error(err);
    // })
  }

  agregarPiezas(ref, piezas) {
    const req = {
      ref: ref,
      piezas: piezas,
    }
    // this.dataservice.postData('orden/'+ref+'/piezas', {req}).subscribe(res => {
    //   let currentVehicle = res.vehicle;
    //   this.$currentVehicleSubject.next(currentVehicle);
    // })
  }

  end() {
    console.log(this.$currentVehicle);
    this.$currentVehicleSubject.next({
      ref: null,
    })
  }
}
