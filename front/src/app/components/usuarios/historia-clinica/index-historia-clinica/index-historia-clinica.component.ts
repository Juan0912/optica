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

    // Agrega el título "Historia Clínica"
    doc.setFontSize(18);
    doc.setFontType("bold");
    doc.text("Historia Clínica", 20, 20);

    // Agrega las secciones de información
    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.text("Edad:", 20, 35);
    doc.setFontType("normal");
    doc.text("40", 60, 35);
    doc.setFontType("bold");
    doc.text("Ocupación:", 100, 35);
    doc.setFontType("normal");
    doc.text("Independiente", 150, 35);

    doc.setFontType("bold");
    doc.text("Ojo izquierdo:", 20, 45);
    doc.setFontType("normal");
    doc.text("hola", 60, 45);
    doc.setFontType("bold");
    doc.text("Ojo derecho:", 100, 45);
    doc.setFontType("normal");
    doc.text("hola", 150, 45);

    doc.setFontType("bold");
    doc.text("Antecedentes:", 20, 55);
    doc.setFontType("normal");
    doc.text("hola", 60, 55);
    doc.setFontType("bold");
    doc.text("Tipo de lente:", 100, 55);
    doc.setFontType("normal");
    doc.text("hola", 150, 55);

    // Agrega las secciones adicionales
    doc.setFontType("bold");
    doc.text("Motivo:", 20, 70);
    doc.setFontType("normal");
    doc.text("El cliente manifiesta que permanece sentado en el computador mas de 5 horas al día, quiere realizarse el examen médico para usar gafas y proteger los ojos de la larga exposición a la luz artificial de las pantallas.", 20, 75, { maxWidth: 170, align: "justify" });

    doc.setFontType("bold");
    doc.text("Observaciones:", 20, 105);
    doc.setFontType("normal");
    doc.text("Carboximetilcelulosa 0.5% Una gota 3 veces al día - Control en 1 año", 20, 110, { maxWidth: 170, align: "justify" });

    // Guarda el documento PDF generado
    doc.save("historia_clinica.pdf");

  }


  abrirModalEliminarHistoriaClinica(index: number) {
    this.modalEliminarHistoriaClinica = true;
    this.index = index;
  }

  eliminarHistoriaClinica() {
    this.modalEliminarHistoriaClinica = false;
    this.cliente.datos.historiaClinica.splice(this.index, 1);
    this._clienteService.actualizarClienteAdmin(this.cliente.datos).subscribe(resp => {
      this._messageService.add({ severity: 'success', summary: resp.mensaje, detail: 'Historia clínica eliminada con éxito!' });
      this.initData();
    });
  }



}
