import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
declare var $: any;
@Injectable({
    providedIn: 'root'
})
export class RequestsService {

    url: string = '';

    constructor(
        private _http: HttpClient
    ) {
        this.url = environment.url;
    }

    get(endpoint: string) {
        $('.preloader').show();
        // Request.
        return this._http.get(`${this.url}${endpoint}`).pipe(
            map((res: any) => {
                $('.preloader').hide();
                return res;
            })
        );
    }

    post(endpoint: string, data: any) {
        $('.preloader').show()
        // Request.
        return this._http.post(`${this.url}${endpoint}`, data).pipe(
            map((res: any) => {
                $('.preloader').hide()
                return res;
            })
        );
    }

    put(endpoint: string, data: any) {
        $('.preloader').show()
        // Request.
        return this._http.put(`${this.url}${endpoint}`, data).pipe(
            map((res: any) => {
                $('.preloader').hide()
                return res;
            })
        );
    }

    delete(endpoint: string) {
        $('.preloader').show()
        // Request.
        return this._http.delete(`${this.url}${endpoint}`).pipe(
            map((res: any) => {
                $('.preloader').hide()
                return res;
            })
        );
    }
}
