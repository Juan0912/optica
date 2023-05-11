import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, MessageService, SelectItem } from 'primeng/api';
import { ConsultaService } from 'src/app/services/consulta.service';
import { RequestsService } from '../../../services/requests.service';
import { log } from 'console';

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

  modalEliminarCita: boolean = false;
  cosultaSelected: any = {};
  imgAlerta: string = 'assets/images/alerta.png';


  public loading: boolean = false;
  public matchModeOptions: SelectItem[] = [];
  public statuses!: any[];

  constructor(private _consultaService: ConsultaService,
              private _requestService: RequestsService,
              private _messageService: MessageService){

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
      this.consultas = resp.datos;
    });

  }

  listarTodasCitas(){
    this._consultaService.listarTodasCitas().subscribe(resp => {
      this.consultas = resp.datos;     
    });
  }

  listarCitasDia(){
    this._consultaService.listarCitasDia().subscribe(resp => {
      this.consultas = resp.datos;     
    });
  }  

  limpiarTabla(){
    this.consultas.length = 0;
  }

  abrirModalEliminarCita(cita: any){
    this.modalEliminarCita = true;
    this.cosultaSelected = cita;
  }

  eliminarCita(){
    this._requestService.delete(`eliminarCita/${this.cosultaSelected._id}`).subscribe(resp => {
      this._messageService.add({ severity: 'success', summary: resp.mensaje, detail: 'Consulta eliminada de la agenda con éxito!' });  
      this.listarTodasCitas();   
    });
    this.modalEliminarCita = false;
  }



}
