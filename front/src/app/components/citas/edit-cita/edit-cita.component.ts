import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  id : any;

  constructor(private _messageService: MessageService,
              private _requestService: RequestsService,
              private _route: ActivatedRoute,
              private _router: Router){}

  
  ngOnInit(): void {
    this.initData();
  }

  actualizarConsulta(form: NgForm){
    if(form.valid){
      this._requestService.put(`actualizarCita/${this.id}`, this.consulta).subscribe(resp => {
        this._messageService.add({ severity: 'success', summary: resp.mensaje, detail: 'Cliente actualizado con exito!' });
        this._router.navigateByUrl('/consultas/inicio');
      });
    } else {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son requeridos' });
    }
  }

  initData(){
    this._route.params.subscribe(params => {
      this.id = params['id'];      
    });
    this._requestService.get(`obtenerCita/${this.id}`).subscribe(resp => {
      console.log(resp);
      this.consulta = resp.datos;
    });
  }


}
