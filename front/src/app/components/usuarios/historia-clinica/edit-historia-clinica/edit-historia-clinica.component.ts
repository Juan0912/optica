import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-edit-historia-clinica',
  templateUrl: './edit-historia-clinica.component.html',
  styleUrls: ['./edit-historia-clinica.component.scss']
})
export class EditHistoriaClinicaComponent implements OnInit {

  public campoRequerido : boolean = false;
  public historiaClinica : any = {};
  public edad : any;
  public id: any;
  public index: any;
  public cliente: any = {};

  constructor(private _clienteService: ClienteService,
              private _messageService: MessageService,
              private _router: Router,
              private _route: ActivatedRoute){}

  ngOnInit(): void {
    this.initdata();
    this.id = localStorage.getItem('id_cliente');
    this.id = JSON.parse(this.id);

    this._route.params.subscribe(params => {
      this.index = params['position'];
    });
    
    this.calcularEdad();

  }

  initdata(){
    this.historiaClinica = localStorage.getItem('editarHistoria');
    this.historiaClinica = JSON.parse(this.historiaClinica);
    this.historiaClinica.createdAt = moment(this.historiaClinica.createdAt).format('YYYY-MM-DD');    
  }

  actualizarHistoriaClinica(form: NgForm){
    if(form.valid){
            
      this._clienteService.obtenerClienteAdmin(this.id).subscribe(resp => {
        this.cliente = resp.datos;
        
        if(this.historiaClinica.createdAt == null){
          
          this.historiaClinica.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

        }else {
          this.historiaClinica.createdAt = moment(this.historiaClinica.createdAt).format('YYYY-MM-DD HH:mm:ss');
        }

        this.historiaClinica.edadRealizaExamen = this.edad;
        this.historiaClinica.motivo = this.historiaClinica.motivo.toUpperCase();
        this.historiaClinica.ocupacion = this.historiaClinica.ocupacion.toUpperCase();
        this.historiaClinica.antecedentes = this.historiaClinica.antecedentes.toUpperCase();
        this.historiaClinica.observaciones = this.historiaClinica.observaciones.toUpperCase();
        
        this.cliente.historiaClinica[this.index] = this.historiaClinica;

        this._clienteService.actualizarClienteAdmin(this.cliente).subscribe(resp => {
          this._messageService.add({ severity: 'success', summary: resp.mensaje, detail: 'Historia clínica actualizada con éxito!' });
          this._router.navigateByUrl(`/usuarios/historia-clinica/inicio/${this.id}`);        
        });

        
      });   

    } 
    else {
      
      this.campoRequerido = true;
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Hay campos obligatorios que no están diligenciados' });
    }

  }

  calcularEdad(){

    let fechaNacimiento;
    const formatoFecha = "YYYY-MM-DD";

    this._clienteService.obtenerClienteAdmin(this.id).subscribe(resp => {
      // Calcula la edad actual
      fechaNacimiento = resp.datos.fNacimiento
      const edad = moment().diff(moment(fechaNacimiento, formatoFecha), 'years');
      this.edad = edad;
    });    
  }

}

 

