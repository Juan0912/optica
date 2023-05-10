import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, MessageService, SelectItem } from 'primeng/api';
import { ClienteService } from '../../../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';


@Component({
  selector: 'app-index-historia-clinica',
  templateUrl: './index-historia-clinica.component.html',
  styleUrls: ['./index-historia-clinica.component.scss']
})
export class IndexHistoriaClinicaComponent implements OnInit {

  historiasClinicas : any = [];

  public loading: boolean = false;
  public matchModeOptions: SelectItem[] = [];
  public statuses!: any[];
  public id: any;


  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService,
    private _router: Router,
    private _messageService: MessageService){

    }

  ngOnInit(): void {
    this.initData();
    this.matchModeOptions = [
      { label: 'Igual', value: FilterMatchMode.EQUALS },
      { label: 'Contiene', value: FilterMatchMode.CONTAINS }
    ];
  }


  initData(){
    this._route.params.subscribe(params => {
      this.id = params['id'];      
    });

    this._clienteService.obtenerClienteAdmin(this.id).subscribe(resp => {

      if(resp.datos == null){
        this._router.navigateByUrl('/usuarios/inicio');
        this._messageService.add({ severity: 'error', summary: 'Error', detail: resp.mensaje });
      } else {
        this.historiasClinicas = resp.datos.historiaClinica;
        console.log(this.historiasClinicas);   
      }

    });
  }

}
