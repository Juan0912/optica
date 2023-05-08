import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _adminService: AdminService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      request.url.indexOf('loginAdmin') >= 0 || 
      request.url.indexOf('registroProducto') >= 0 
    ) return next.handle(request.clone());
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = this._adminService.obtenerToken();
    return request.clone({
        setHeaders: {
          'content-type': 'application/json',
          Authorization: token
        }
    })
  }
}
