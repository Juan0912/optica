import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-index-citas',
  templateUrl: './index-citas.component.html',
  styleUrls: ['./index-citas.component.scss']
})
export class IndexCitasComponent implements OnInit{

  tableShow: boolean = false;

  selectedDate : Date = new Date;

  constructor(){

  }

  ngOnInit(): void {
    
  }

  onDateChange(event: any) {
    // Función que se ejecutará cada vez que cambie la fecha
    console.log('Fecha cambiada:', event);
  }

}
