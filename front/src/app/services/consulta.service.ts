import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url: string = '';

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.url;
  }

    crearCita(cita: any): Observable<any> {
      // Request.
      return this._http.post(`${this.url}crearCita`, cita);
    }

    listarTodasCitas(): Observable<any> {
      // Request.
      return this._http.get(`${this.url}listarCitas`);
    }

    listarCitaFechaSelected(fecha: any): Observable<any> {
      // Request.
      return this._http.post(`${this.url}listarCitasPorFecha`, fecha);
    }

    listarCitasDia(): Observable<any> {
      // Request.
      return this._http.get(`${this.url}listarCitasDia`);
    }

  

}
