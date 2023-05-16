import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente.service';

declare var $ : any;


@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.scss']
})
export class CreateUsuarioComponent implements OnInit {

  cliente: any = { genero: '', tipoDocumento: '' };

  constructor(
    private _messageService: MessageService,
    private _clienteService: ClienteService,
    private _router: Router
  ) { }

  ngOnInit(): void {
   
  }

  crearCliente(form: NgForm){
    
    if(form.valid){

      $('.preloader').show();

      this._clienteService.registroClienteAdmin(this.cliente).subscribe(resp => {
          
        if(resp.resultadoExitoso == false) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: resp.mensaje });
        } else {
          this._messageService.add({ severity: 'success', summary: resp.mensaje, detail: 'Cliente creado con éxito!' });
          this._router.navigateByUrl('/usuarios/inicio');
        }

      $('.preloader').hide();

      });

    } else {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son requeridos' });
    }   
  }

  

  

}
