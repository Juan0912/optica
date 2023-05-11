import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, MessageService, SelectItem } from 'primeng/api';
import { ClienteService } from '../../../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { jsPDF } from 'jspdf';
require('jspdf-autotable');


@Component({
  selector: 'app-index-historia-clinica',
  templateUrl: './index-historia-clinica.component.html',
  styleUrls: ['./index-historia-clinica.component.scss']
})
export class IndexHistoriaClinicaComponent implements OnInit {

  cliente: any = {};
  historiasClinicas: any = [];
  historiaClinicaAImprimir: any = {};
  modalImprimir: boolean = false;
  modalEliminarHistoriaClinica: boolean = false;
  index: number = 0;


  imgAlerta: string = 'assets/images/alerta.png';

  public loading: boolean = false;
  public matchModeOptions: SelectItem[] = [];
  public statuses!: any[];
  public id: any;


  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService,
    private _router: Router,
    private _messageService: MessageService) {

  }

  ngOnInit(): void {
    this.initData();
    this.matchModeOptions = [
      { label: 'Igual', value: FilterMatchMode.EQUALS },
      { label: 'Contiene', value: FilterMatchMode.CONTAINS }
    ];
  }


  initData() {
    this._route.params.subscribe(params => {
      this.id = params['id'];
    });

    this._clienteService.obtenerClienteAdmin(this.id).subscribe(resp => {

      if (resp.datos == null) {
        this._router.navigateByUrl('/usuarios/inicio');
        this._messageService.add({ severity: 'error', summary: 'Error', detail: resp.mensaje });
      } else {


        if (localStorage.getItem('cliente')) {
          localStorage.removeItem('cliente');
          localStorage.setItem('cliente', JSON.stringify(resp));
        } else {
          localStorage.setItem('cliente', JSON.stringify(resp));
        }

        this.historiasClinicas = resp.datos.historiaClinica;
        this.cliente = localStorage.getItem('cliente');
        this.cliente = JSON.parse(this.cliente);
        console.log(this.historiasClinicas);
        console.log(this.cliente);

      }

    });
  }

  abrirModalImprimirHistoriaClinica() {
    this.modalImprimir = true;
  }

  detalle(historiaClinica: any) {
    this.historiaClinicaAImprimir = historiaClinica;
    this.abrirModalImprimirHistoriaClinica();
  }

  imprimirHistoriaClinica() {
    console.log(this.historiaClinicaAImprimir);
    // window.print();
    this.exportPDF();
    this.modalImprimir = false;
  }

  exportPDF() {
    const doc: any = new jsPDF();
    doc.text("Historia clínica", 80, 10,);
    // Guarda el documento PDF
    doc.save("ejemplo.pdf");

  }


  abrirModalEliminarHistoriaClinica(index: number) {
    this.modalEliminarHistoriaClinica = true;
    this.index = index;
  }

  eliminarHistoriaClinica() {
    this.modalEliminarHistoriaClinica = false;
    this.cliente.datos.historiaClinica.splice(this.index, 1);
    this._clienteService.actualizarClienteAdmin(this.cliente.datos).subscribe(resp => {
      this._messageService.add({ severity: 'success', summary: resp.mensaje, detail: 'Historia clinica eliminada con exito!' });
      this.initData();
    });
  }



}
