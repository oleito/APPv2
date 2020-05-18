import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modelsmodal',
  templateUrl: './modelsmodal.component.html',
  styleUrls: ['./modelsmodal.component.css']
})
export class ModelsmodalComponent implements OnInit {

  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
  }


}
