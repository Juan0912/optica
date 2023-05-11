import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss']
})
export class EditUsuarioComponent implements OnInit {

  public cliente: any = {};
  public id: any;

  constructor(private _route: ActivatedRoute,
              private _clienteService: ClienteService,
              private _messageService: MessageService,
              private _router: Router ) {

  }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this._route.params.subscribe(params => {
      this.id = params['id'];      
    });

    this._clienteService.obtenerClienteAdmin(this.id).subscribe(resp => {

      if(resp.datos == null){
        this._router.navigateByUrl('/usuarios/inicio');
        this._messageService.add({ severity: 'error', summary: 'Error', detail: resp.mensaje });
      } else {
        this.cliente = resp.datos;
      }

    });
  }

  actualizarCliente(form: NgForm){
    if(form.valid){
      this._clienteService.actualizarClienteAdmin(this.cliente).subscribe(resp => {
        this._router.navigateByUrl('/usuarios/inicio');
        this._messageService.add({ severity: 'success', summary: resp.mensaje, detail: 'Cliente actualizado con éxito!' });  
      });
    }
  }

}
