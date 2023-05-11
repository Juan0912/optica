import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import * as moment from 'moment-timezone';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-create-historia-clinica',
  templateUrl: './create-historia-clinica.component.html',
  styleUrls: ['./create-historia-clinica.component.scss']
})
export class CreateHistoriaClinicaComponent {

  public historiaClinica: any = {};
  public cliente: any = {};
  public id: any;
  public edad: any;

  constructor(private _messageService: MessageService,
              private _clienteService: ClienteService,
              private _route: ActivatedRoute,
              private _router: Router){

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];      
    });
    this.calcularEdad();
  }



  crearHistoriaClinica(form: NgForm){
    if(form.valid){

      this._clienteService.obtenerClienteAdmin(this.id).subscribe(resp => {
        this.cliente = resp.datos;
        this.historiaClinica.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
        this.historiaClinica.edadRealizaExamen = this.edad;
        
        this.cliente.historiaClinica.unshift(this.historiaClinica);

        console.log(this.cliente);

        this._clienteService.actualizarClienteAdmin(this.cliente).subscribe(resp => {
          console.log(resp);          
          this._messageService.add({ severity: 'success', summary: resp.mensaje, detail: 'Historia clínica creada con exito!' });
          this._router.navigateByUrl('/usuarios/inicio');        
        });

        
      });   

    } else {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son requeridos' });
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
