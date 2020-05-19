import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashtallerService } from '../../services/dashtaller.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {
  subscription: Subscription
  isInited = false;

  constructor(protected dashtaller: DashtallerService) {
    this.subscription = this.dashtaller.$currentVehicle.subscribe(data => {
      this.isInited = data.ref ? data.ref : false
    }, err => {
      this.isInited = false;
      //show toast
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
