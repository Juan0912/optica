import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConsultaService } from 'src/app/services/consulta.service';

declare var $ : any;

@Component({
  selector: 'app-create-cita',
  templateUrl: './create-cita.component.html',
  styleUrls: ['./create-cita.component.scss']
})
export class CreateCitaComponent implements OnInit {

  consulta : any = {};


  constructor(private _messageService: MessageService,
              private _consultaService: ConsultaService,
              private _router: Router){}

  ngOnInit(): void {
    
  }


  agendarConsulta(form: NgForm){

    if(form.valid){
      $('.preloader').show();      
      this._consultaService.crearCita(this.consulta).subscribe(resp => {
        this._messageService.add({ severity: 'success', summary: resp.mensaje, detail: 'Consulta agendada con éxito!' });
      $('.preloader').hide();        
        this._router.navigateByUrl('consultas/inicio');
      });

    } else {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son requeridos' });
    }

  }

}
