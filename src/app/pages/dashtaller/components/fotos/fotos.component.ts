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
  defFotos = [
    {
      foto_thumb: "https://via.placeholder.com/160x90",
      foto_url: "https://via.placeholder.com/800x600"
    },
    {
      foto_thumb: "https://via.placeholder.com/160x90",
      foto_url: "https://via.placeholder.com/800x600"
    },
    {
      foto_thumb: "https://via.placeholder.com/160x90",
      foto_url: "https://via.placeholder.com/800x600"
    }
  ]
  fotos;

  constructor(
    private dashtallerService: DashtallerService,
    private fotosService: FotosService
  ) {
    this.subscription = this.dashtallerService.$currentVehicle.subscribe(data => {
      this.referencia = data.referencia ? data.referencia : false;
      this.idvehiculo = data.idvehiculo ? data.idvehiculo : false;
      this.fotos = data.fotos ? data.fotos : this.defFotos;
    }, err => {
      console.log(err);
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.obtenerFotos();
    }, 1500)
  }
  obtenerFotos() {
    this.fotosService.getFotos(this.referencia).subscribe(res => {
      // this.fotos = res.data > 0 ? res.data : this.defFotos;
      this.dashtallerService.updateDatosVehiculo('fotos', res.data);
    }, err => {
      console.log('getFotos: ', err)
    })
  }

}
