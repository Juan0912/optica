import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url: string = '';

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.url;
  }

  listarClientes(tipo: any, filtro: any): Observable<any> {
    // Request.
    return this._http.get(`${this.url}listarClientes/${tipo}/${filtro}`);
  }

  registroClienteAdmin(cliente: any): Observable<any> {
    // Request.
    return this._http.post(`${this.url}registro`, cliente);
  }

  actualizarClienteAdmin(cliente: any): Observable<any> {
    // Request.
    return this._http.put(`${this.url}actualizarCliente/${cliente._id}`, cliente);
  }

  obtenerClienteAdmin(id: string): Observable<any> {
    // Request.
    return this._http.get(`${this.url}obtenerCliente/${id}`);
  }

  eliminarClienteAdmin(id: string): Observable<any> {
    // Request.
    return this._http.delete(`${this.url}eliminarCliente/${id}`);
  }

  buscarClientePorIdentificacion(identificacion: any): Observable<any> {
    // Request.
    return this._http.get(`${this.url}buscarClientePorIdentificacion/${identificacion}`);
  }

  listarClientesAgendaLlamada(): Observable<any> {
    // Request.
    return this._http.get(`${this.url}obtenerClientesALlamar`);
  }


}
