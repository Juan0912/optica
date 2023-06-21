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
    this.exportPDF();
    // window.open(`${environment.urlFront}detalle-historia-clinica`, '_blank');

  }

  exportPDF() {
    const doc: any = new jsPDF();

    const logoUrl = 'assets/images/logo2.png';
    const imgData = logoUrl;
    var x = doc.internal.pageSize.getWidth() - 20;
    var y = 5;
    var width = 60; 

    doc.addImage(imgData, 'PNG', 14, y, 60, 20);
    doc.setFontSize(9);

    doc.text("Carrera 22 # 26-57", x, y + 5, { align: "right" });
    doc.text("Manizales", x, y + 10, { align: "right" });
    doc.text("Cuidado profesional para tus ojos", x, y + 15, { align: "right" });

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Historia Clínica", 130, y + 25, { align: 'right' });

    var headers = [['Nombres', 'Apellidos', 'Documento', 'Fecha Consulta']];
    var data = [
      [`${this.cliente.datos.nombres}`, `${this.cliente.datos.apellidos}`, `${this.cliente.datos.identificacion}`, `${this.historiaClinicaAImprimir.createdAt}`],
    ];

    var startY = 50;
    var styles = {
      fontSize: 8 // Tamaño de letra en puntos
    };
    doc.autoTable({
      head: headers,
      body: data,
      startY: 35,
      styles: styles
    });

    doc.rect(14, y + 45, 182, 25, "S");
    doc.setFontSize(10);
    
    doc.text("RX FINAL", 100, 45 + 10);
    doc.text("_____________________________________________________________________________________________", 14,57);
    doc.setFontSize(8);
    
    doc.text("OJO DERECHO", 15, 62);
    doc.text("AV", 60, 62);
    doc.text("OJO IZQUIERDO", 100, 62);
    doc.text("AV", 150, 62);
    
    doc.text("D.P.", 15, 70);
    doc.text("ADD", 60, 70);
    
    doc.setFont("helvetica", "nomral");
    console.log(this.historiaClinicaAImprimir)
    doc.text(`${this.historiaClinicaAImprimir.odFinal ?? 'N/A'}`, 15, 65);
    doc.text(`${this.historiaClinicaAImprimir.odAVF ?? 'N/A'}`, 60, 65);
    doc.text(`${this.historiaClinicaAImprimir.oiFinal ?? 'N/A'}`, 100, 65);
    doc.text(`${this.historiaClinicaAImprimir.oiAVF ?? 'N/A'}`, 150, 65);
    
    doc.text(`${this.historiaClinicaAImprimir.dp ?? 'N/A'}`, 15, 73);
    doc.text(`${this.historiaClinicaAImprimir.add ?? 'N/A'}`, 60, 73);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.rect(14, 80, 182, 35, "S");
    doc.text("DIAGNOSTICO FINAL", 90, 85);
    doc.text("_____________________________________________________________________________________________", 14,87);
    doc.setFontSize(8);
    doc.text("OJO DERECHO", 15, 92);
    doc.text("OJO IZQUIERDO", 100, 92);
    doc.text("TIPO LENTE", 15, 100);
    doc.text("CONTROL", 100, 100);
    doc.text("OBSERVACIONES", 15, 108);
    doc.setFont("helvetica", "nomral");
    doc.text(`${this.historiaClinicaAImprimir.odDx ?? 'N/A'}`, 15, 95);
    doc.text(`${this.historiaClinicaAImprimir.oiDx ?? 'N/A'}`, 100, 95);
    doc.text(`${this.historiaClinicaAImprimir.tipoLente ?? 'N/A'}`, 15,103);
    doc.text(`${this.historiaClinicaAImprimir.control ?? 'N/A'}`, 100,103);
    doc.text(`${this.historiaClinicaAImprimir.observaciones ?? 'N/A'}`, 15, 111);

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

  editarHistoriaClinica(historiaClinica: any) {
    localStorage.setItem('editarHistoria', JSON.stringify(historiaClinica));
  }



}
