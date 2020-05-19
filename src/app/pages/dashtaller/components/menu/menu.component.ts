import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ModelsmodalComponent } from "./../modelsmodal/modelsmodal.component";
import { DashtallerService } from '../../services/dashtaller.service';
import { isNumber } from 'util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isInited = false;
  error = false;

  subscription: Subscription;

  constructor(private modal: NgbModal, private dashtaller: DashtallerService) {
    this.subscription = this.dashtaller.$currentVehicle.subscribe(data => {
      this.isInited = data.ref ? data.ref : false
    }, err => {
      this.error = true;
      //show toast
    })
  }

  ngOnInit(): void {
  }
  model: NgbDateStruct;
  date: { year: number, month: number };
  fechaElejida() {
    console.log("fecha elejida: ")
  }
  openModal() {
    this.modal.open(ModelsmodalComponent, { size: 'lg' });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
