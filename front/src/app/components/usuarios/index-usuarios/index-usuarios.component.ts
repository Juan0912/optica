import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Representative } from 'src/app/demo/api/customer';
import { RequestsService } from 'src/app/services/requests.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-index-usuarios',
  templateUrl: './index-usuarios.component.html',
  styleUrls: ['./index-usuarios.component.scss']
})
export class IndexUsuariosComponent implements OnInit {


  matchModeOptions: SelectItem[] = [];

  constructor(
    private config: PrimeNGConfig,
    private _requestsService: RequestsService,
    private _router: Router,
    private _clienteService: ClienteService
  ) { }

  clientes: any[] = [];
  representatives!: Representative[];
  statuses!: any[];
  loading: boolean = false;
  activityValues: number[] = [0, 100];
  modalAbrirDetalle: boolean = false;
  modalEliminarCliente: boolean = false;
  clienteSelected: any = {};



  ngOnInit() {
    this.loadUsers();
    this.loadConfig()
    this.matchModeOptions = [
      { label: 'Igual', value: FilterMatchMode.EQUALS },
      { label: 'Contiene', value: FilterMatchMode.CONTAINS }
    ];
  }

  loadConfig() {
    this.statuses = [
      { label: 'Debe', value: 'Debe' },
      { label: 'Al día', value: 'Al día' },
    ];
    this.config.setTranslation({
      accept: 'Accept',
      reject: 'Cancel',
      matchAll: 'Todo',
      matchAny: 'Cualquiera',
      startsWith: 'Comienza con',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Finaliza con',
      equals: 'Igual',
      notEquals: 'No igual',
      clear: 'Limpiar',
      apply: 'Aplicar',
      dateIs: 'Fecha es',
      dateIsNot: 'Fecha no es',
      dateBefore: 'Fecha antes de',
      dateAfter: 'Fecha despues de',
    });
  }

  loadUsers() {
    this._requestsService.get('listarClientes').subscribe((res: any) => {
      if (res.resultadoExitoso) {
        this.clientes = res.datos;
      }
    })
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string): any {
    switch (status) {
      case 'Debe':
        return 'danger';

      case 'Al día':
        return 'success';
    }
  }

  handle(dt1: any, event: any) {
    dt1.filterGlobal(event.target.value, 'contains')
  }

  abrirModalDetalle(cliente: any) {
    this.clienteSelected = cliente;
    console.log(this.clienteSelected);
    this.modalAbrirDetalle = true;

  }


  abrirModalEliminarCliente(cliente: any) {
    this.clienteSelected = cliente;
    this.modalEliminarCliente = true;
  }

  eliminarCliente() {
    this._clienteService.eliminarClienteAdmin(this.clienteSelected._id).subscribe(resp => {
      this.loadUsers();
      this.modalEliminarCliente = false;

    });
  }

}
