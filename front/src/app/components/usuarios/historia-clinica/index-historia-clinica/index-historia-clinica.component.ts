import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterMatchMode, MessageService, SelectItem } from 'primeng/api';
import { ClienteService } from '../../../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { environment } from 'src/environments/environment';
require('jspdf-autotable');

declare var $: any;



@Component({
  selector: 'app-index-historia-clinica',
  templateUrl: './index-historia-clinica.component.html',
  styleUrls: ['./index-historia-clinica.component.scss']
})
export class IndexHistoriaClinicaComponent implements OnInit, OnDestroy {

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
  public userCliente: any = {};


  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService,
    private _router: Router,
    private _messageService: MessageService) {

  }
  ngOnDestroy(): void {
    localStorage.removeItem('cliente');
  }

  ngOnInit(): void {
    this.initData();
    this.matchModeOptions = [
      { label: 'Igual', value: FilterMatchMode.EQUALS },
      { label: 'Contiene', value: FilterMatchMode.CONTAINS }
    ];
  }

  initData() {
    $('.preloader').show();

    this._route.params.subscribe(params => {
      this.id = params['id'];
    });

    this._clienteService.obtenerClienteAdmin(this.id).subscribe(resp => {

      if (resp.datos == null) {
        this._router.navigateByUrl('/usuarios/inicio');
        this._messageService.add({ severity: 'error', summary: 'Error', detail: resp.mensaje });
      } else {

        localStorage.setItem('cliente', JSON.stringify(resp));
        localStorage.setItem('id_cliente', JSON.stringify(resp.datos._id));
        this.historiasClinicas = resp.datos.historiaClinica;
        this.cliente = localStorage.getItem('cliente');
        this.cliente = JSON.parse(this.cliente);
        
      }
      $('.preloader').hide();

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
    localStorage.setItem('detalleHistoriaClinica', JSON.stringify(this.historiaClinicaAImprimir));
    this.modalImprimir = false;
    window.open(`${environment.urlFront}detalle-historia-clinica`, '_blank');
  }

  exportPDF() {
    const doc: any = new jsPDF();

    const logoUrl = 'assets/images/logo.jpg';
    // Agregar logo de la empresa
    const imgData = logoUrl;
    doc.addImage(imgData, 'PNG', 14, 20, 40, 40);
    // Agrega el título "Historia Clínica"
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Historia Clínica", 130, 20, { align: 'right' });

    // Agrega las secciones de información
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Edad:", 60, 35);
    doc.setFont("helvetica", "nomral");
    doc.text(`${this.historiaClinicaAImprimir.edadRealizaExamen}`, 80, 35);
    doc.setFont("helvetica", "bold");
    doc.text("Ocupación:", 120, 35);
    doc.setFont("helvetica", "normal");
    doc.text(`${this.historiaClinicaAImprimir.ocupacion}`, 145, 35);

    doc.setFont("helvetica", "bold");
    doc.text("Ojo izquierdo:", 60, 40);
    doc.setFont("helvetica", "normal");
    doc.text(`${this.historiaClinicaAImprimir.oi}`, 89, 40);
    doc.setFont("helvetica", "bold");
    doc.text("Ojo derecho:", 120, 40);
    doc.setFont("helvetica", "normal");
    doc.text(`${this.historiaClinicaAImprimir.od}`, 147, 40);

    doc.setFont("helvetica", "bold");
    doc.text("Antecedentes:", 60, 45);
    doc.setFont("helvetica", "normal");
    doc.text(`${this.historiaClinicaAImprimir.antecedentes}`, 60, 50, { maxWidth: 60, align: "justify" });
    doc.setFont("helvetica", "bold");
    doc.text("Tipo de lente:", 120, 45);
    doc.setFont("helvetica", "normal");
    doc.text(`${this.historiaClinicaAImprimir.tipoLente}`, 149, 45);

    // Agrega las secciones adicionales
    doc.setFont("helvetica", "bold");
    doc.text("Motivo:", 20, 70);
    doc.setFont("helvetica", "normal");
    doc.text(`${this.historiaClinicaAImprimir.motivo}`, 20, 75, { maxWidth: 170, align: "justify" });

    doc.setFont("helvetica", "bold");
    doc.text("Observaciones:", 20, 105);
    doc.setFont("helvetica", "normal");
    doc.text(`${this.historiaClinicaAImprimir.observaciones}`, 20, 110, { maxWidth: 170, align: "justify" });

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

  editarHistoriaClinica(historiaClinica: any){
    localStorage.setItem('editarHistoria', JSON.stringify(historiaClinica));
  }



}
