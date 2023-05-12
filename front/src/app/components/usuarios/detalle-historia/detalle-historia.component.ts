import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-historia',
  templateUrl: './detalle-historia.component.html',
  styleUrls: ['./detalle-historia.component.scss']
})
export class DetalleHistoriaComponent implements OnInit, OnDestroy{
  
  historiaClinicaAImprimir: any = {};
  cliente: any = {};

  constructor(
  ){}
  
  ngOnInit(): void {
    let historia = localStorage.getItem('detalleHistoriaClinica');
    let cliente = localStorage.getItem('cliente');
    if(cliente) this.cliente = JSON.parse(cliente);
    if(historia) {
      this.historiaClinicaAImprimir = JSON.parse(historia);
      window.print();
    };
  }

  ngOnDestroy(): void {
    localStorage.removeItem('detalleHistoriaClinica');
  }


}
