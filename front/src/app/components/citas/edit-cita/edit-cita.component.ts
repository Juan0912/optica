import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConsultaService } from 'src/app/services/consulta.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-edit-cita',
  templateUrl: './edit-cita.component.html',
  styleUrls: ['./edit-cita.component.scss']
})
export class EditCitaComponent implements OnInit {

  consulta : any = {};

  constructor(private _messageService: MessageService,
              private _requestService: RequestsService){}

  
  ngOnInit(): void {
    
  }

  actualizarConsulta(form: NgForm){
    if(form.valid){
      console.log(this.consulta);      
    } else {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son requeridos' });
    }
  }

  initData(){
    // this._requestService.get()
  }


}
