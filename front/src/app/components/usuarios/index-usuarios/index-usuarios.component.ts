import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { AlertService } from 'src/app/services/alert.service';
import { RequestsService } from 'src/app/services/requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-usuarios',
  templateUrl: './index-usuarios.component.html',
  styleUrls: ['./index-usuarios.component.scss']
})
export class IndexUsuariosComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private customerService: CustomerService,
    private config: PrimeNGConfig,
    private _requestsService: RequestsService,
    private _router: Router
  ) { }

  clientes: any[] = [];

  representatives!: Representative[];

  statuses!: any[];

  loading: boolean = false;

  activityValues: number[] = [0, 100];

  ngOnInit() {
    this.loadUsers();
    this.loadConfig();
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
        console.log(res);
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

  hola(test: any) {
    console.log(test)
  }

  crearCliente(){
    console.log('Hola mundo');
    this._router.navigateByUrl('usuarios/registro');
  }

}
