import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, SelectItem } from 'primeng/api';
import { ConsultaService } from 'src/app/services/consulta.service';
import { RequestsService } from '../../../services/requests.service';

declare var $: any;

@Component({
  selector: 'app-index-citas',
  templateUrl: './index-citas.component.html',
  styleUrls: ['./index-citas.component.scss']
})
export class IndexCitasComponent implements OnInit{

  selectedDate : Date = new Date;
  consultas : any = [];
  dateSelectedFilter : string = '';

  public loading: boolean = false;
  public matchModeOptions: SelectItem[] = [];
  public statuses!: any[];

  constructor(private _consultaService: ConsultaService,
              private _requestService: RequestsService){

  }

  ngOnInit(): void {
    this.matchModeOptions = [
      { label: 'Igual', value: FilterMatchMode.EQUALS },
      { label: 'Contiene', value: FilterMatchMode.CONTAINS }
    ];
  }

  onDateChange(event: any) {
    // Función que se ejecutará cada vez que cambie la fecha
    this.dateSelectedFilter = event;

    this._requestService.post('listarCitasPorFecha', {fecha: this.dateSelectedFilter}).subscribe(resp => {
      console.log(resp);
      this.consultas = resp.datos;
    });

  }

  listarTodasCitas(){
    this._consultaService.listarTodasCitas().subscribe(resp => {
      console.log(resp);
      this.consultas = resp.datos;     
    });
  }

  listarCitasDia(){
    this._consultaService.listarCitasDia().subscribe(resp => {
      console.log(resp);
      this.consultas = resp.datos;     
    });
  }  

  limpiarTabla(){
    this.consultas.length = 0;
  }

}
