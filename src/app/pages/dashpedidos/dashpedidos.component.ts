import { DashpedidosService } from './services/dashpedidos.service';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];




@Component({
  selector: 'app-dashpedidos',
  templateUrl: './dashpedidos.component.html',
  styleUrls: ['./dashpedidos.component.css']
})
export class DashpedidosComponent implements OnInit {
  countries = COUNTRIES;

  ordenes = [];

  constructor(private dashpedidosService: DashpedidosService) { }

  ngOnInit(): void {
    this.obtenerOrdenesConPedidos();
  }
  obtenerOrdenesConPedidos() {
    this.dashpedidosService.getOrdenes().subscribe(res => {
      this.ordenes = res.data;
    }, err => {
      console.error(err);
    })
  }

}
