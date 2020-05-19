import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";

import { NgbModal, NgbCalendar, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { MainmodalComponent } from './components/mainmodal/mainmodal.component';
import { NewmodalComponent } from "./components/newmodal/newmodal.component";
import { DashtallerService } from './services/dashtaller.service';



@Component({
  selector: 'app-dashtaller',
  templateUrl: './dashtaller.component.html',
  styleUrls: ['./dashtaller.component.css']
})
export class DashtallerComponent implements OnInit {
 vhBySector = [
    {
      sector: 'Espera Repuestos',
      vehiculos: [

      ]
    },
    {
      sector: 'Espera turno',
      vehiculos: [

      ]
    },
  ];
  constructor(private dashTallerService: DashtallerService, private modal: NgbModal, private calendar: NgbCalendar, config: NgbTimepickerConfig) { }

  ngOnInit(): void {
    this.obtenerVehiculos();
  }

  onDrop(event: CdkDragDrop<any[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    console.log(event.item.element.nativeElement.id);
    console.log(event.previousContainer.element.nativeElement.id);
    console.log(event.container.element.nativeElement.id);
  }

  obtenerVehiculos() {
    this.dashTallerService.getVhBySector().subscribe(res=>{
      this.vhBySector=res.data;
      console.log(this.vhBySector);
    })
  }

  openMainModalNew() {
    this.modal.open(MainmodalComponent, { size: 'lg', scrollable: true }).result.then(result => {
    }).catch(err => {
      this.dashTallerService.end();
    });
  }

  openMainModalCurrent(referencia) {
    this.dashTallerService.init(referencia);
    this.modal.open(MainmodalComponent, { size: 'lg', scrollable: true }).result.then(result => {
    }).catch(err => {
      this.dashTallerService.end();
    });
  }
  openModalNuevo() {
    this.modal.open(NewmodalComponent);
  }
}
