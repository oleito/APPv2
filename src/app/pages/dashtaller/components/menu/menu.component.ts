import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
  }
  model: NgbDateStruct;
  date: { year: number, month: number };
  fechaElejida() {
    console.log("fecha elejida: ")
  }
  openModal(content) {
    this.modal.open(content, { size: 'lg' });
  }

}
