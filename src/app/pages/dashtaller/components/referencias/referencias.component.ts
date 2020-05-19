import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashtallerService } from '../../services/dashtaller.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  referenciasForm = new FormGroup({
    referencia: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  });

  constructor(protected dashtaller: DashtallerService) {
    this.dashtaller.$currentVehicle.subscribe(data => {
      this.referencia = data.ref;
      console.log("ref: ", this.referencia);
    }, err => {
      this.error = true;
      //show toast
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    this.dashtaller.init(this.referenciasForm.controls.referencia.value);
    this.inited = true;
  }

  ngOnDestroy() {

  }

}
