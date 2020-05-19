import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashtallerService } from '../../services/dashtaller.service';

@Component({
  selector: 'app-piezas',
  templateUrl: './piezas.component.html',
  styleUrls: ['./piezas.component.css']
})
export class PiezasComponent implements OnInit {
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
