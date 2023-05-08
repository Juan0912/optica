import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url: string = '';

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.url;
  }

  loginAdmin(data: any): Observable<any> {
    $('.preloader').show()
    // Headers.
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Request.
    return this._http.post(`${this.url}loginAdmin`, data, { headers: headers }).pipe(
      map((res: any) => {
        $('.preloader').hide()
        return res;
      })
    );
  }

  obtenerToken(): string {
    return JSON.stringify(localStorage.getItem('token'));
  }

  isAuthenticated(rolesPermitidos: string[]): boolean {
    const token: any = localStorage.getItem('token');
    // Se valida que exista token.
    if (!token) return false;

    // Se valida veracidad del token. 
    try {
      const helper = new JwtHelperService();
      var decodeToken = helper.decodeToken(token);
      // Se valida que sea real.

      // Token expirado
      if(helper.isTokenExpired(token)){
        localStorage.removeItem('token');
        return false;
      }

      if (!decodeToken) {
        localStorage.removeItem('token')
        return false;
      }
    } catch (error) {
      localStorage.removeItem('token')
      return false;
    }
    return rolesPermitidos.includes(decodeToken['rol']);

  }

}
