import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modelsmodal',
  templateUrl: './modelsmodal.component.html',
  styleUrls: ['./modelsmodal.component.css']
})
export class ModelsmodalComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  closeModelsModal() {
    console.log('Cerrar');
    this.activeModal.close('Close click');
  }

}
