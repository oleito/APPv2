import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DashtallerComponent } from '../../dashtaller.component';
import { MainmodalComponent } from '../mainmodal/mainmodal.component';

@Component({
  selector: 'app-newmodal',
  templateUrl: './newmodal.component.html',
  styleUrls: ['./newmodal.component.css']
})
export class NewmodalComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal,private modal: NgbModal) { }

  ngOnInit(): void {
  }

  cargarReferencia() {
    console.log('Cargando referencia');
    setTimeout(() => {
      this.activeModal.close('Close click');
      this.modal.open(MainmodalComponent, { size: 'lg', scrollable: true });
    }, 1000);
  }

}
