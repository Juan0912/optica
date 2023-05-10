import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { FilterMatchMode, SelectItem } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-agenda-llamadas',
  templateUrl: './index-agenda-llamadas.component.html',
  styleUrls: ['./index-agenda-llamadas.component.scss']
})
export class IndexAgendaLlamadasComponent implements OnInit {

  clientes : any = [];
  public loading: boolean = false;

  public matchModeOptions: SelectItem[] = [];


  constructor(
    private _clienteService: ClienteService
  ){

  }

  ngOnInit(): void {
    this.matchModeOptions = [
      { label: 'Igual', value: FilterMatchMode.EQUALS },
      { label: 'Contiene', value: FilterMatchMode.CONTAINS }
    ];
    this.initData();
  }

  initData(){
    this._clienteService.listarClientesAgendaLlamada().subscribe(resp => {
      console.log(resp);
      
      this.clientes = resp.datos;
      
    });
  }


}
