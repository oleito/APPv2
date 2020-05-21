import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashtallerService } from '../../services/dashtaller.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReferenciasService } from '../../services/referencias.service';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.css']
})
export class ReferenciasComponent implements OnInit {

  inited = false;
  loading = false;
  error = false;

  referencia: number;
  orden: number;
  siniestro: string;
  subscription: Subscription;

  referenciasForm = new FormGroup({
    referencia: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  });

  constructor(
    protected dashtallerService: DashtallerService,
    private referenciaService: ReferenciasService
  ) {
    this.subscription = this.dashtallerService.$currentVehicle.subscribe(data => {
      this.inited = data.referencia ? data.referencia : false
      this.referencia = data.referencia;
    }, err => {
      this.error = true;
      //show toast
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    let res = {
      data: {
        referencia: this.referenciasForm.controls.referencia.value
      }
    }
    this.referenciaService.postReferencia(res).subscribe(res => {
      this.dashtallerService.init(res.data.referencia);
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
