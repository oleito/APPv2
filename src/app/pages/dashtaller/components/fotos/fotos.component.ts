import { Component, OnInit } from '@angular/core';
import { FotosService } from '../../services/fotos.service';
import { DashtallerService } from '../../services/dashtaller.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {

  subscription;
  referencia;
  idvehiculo;
  fotos = []

  constructor(
    private dashtallerService: DashtallerService,
    private fotosService: FotosService

  ) {
    this.subscription = this.dashtallerService.$currentVehicle.subscribe(data => {
      this.referencia = data.referencia ? data.referencia : false;
      this.idvehiculo = data.idvehiculo ? data.idvehiculo : false;
    }, err => {
      console.log(err);
    })
  }

  ngOnInit(): void {
    this.obtenerFotos();
  }
  obtenerFotos() {
    console.log('obtenerFotos')
    this.fotosService.getFotos(this.referencia).subscribe(res => {
      console.log(res);
      this.fotos = res.data;
    }, err => {
      console.log('getFotos: ', err)
    })
  }

}
