import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { FilterMatchMode, SelectItem } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-index-agenda-llamadas',
  templateUrl: './index-agenda-llamadas.component.html',
  styleUrls: ['./index-agenda-llamadas.component.scss']
})
export class IndexAgendaLlamadasComponent implements OnInit {

  clientes: any = [];
  cliente: any = {};
  rangoSelected: any = 0;
  public loading: boolean = false;

  public matchModeOptions: SelectItem[] = [];


  constructor(
    private _clienteService: ClienteService,
    private _requestService: RequestsService
  ) {

  }

  ngOnInit(): void {
    this.matchModeOptions = [
      { label: 'Igual', value: FilterMatchMode.EQUALS },
      { label: 'Contiene', value: FilterMatchMode.CONTAINS }
    ];
    this.initData();
  }

  initData() {
    this._requestService.get(`obtenerClientesALlamar?dias=0`).subscribe(resp => {
      this.clientes = resp.datos;
    });
  }

  changeState(id: string) {
    this._requestService.get(`actualizarLlamadoCliente/${id}`).subscribe((resp) => {

    });
  }

  handleFecha() {
    this._requestService.get(`obtenerClientesALlamar?dias=${parseInt(this.rangoSelected)}`).subscribe(resp => {
      this.clientes = resp.datos;
    });
  }


}
