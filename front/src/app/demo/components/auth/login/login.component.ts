import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


    password!: string;
    email: string = '';

    constructor(
        public layoutService: LayoutService,
        private _adminService: AdminService,
        private _alertService: AlertService,
        private _router: Router
    ) { }

    ngOnInit(): void {

    }

    enviar() {
        if (this.password == '' || this.email == '') {
            this._alertService.showAlert$.emit({ type: 'error', message: 'Todos los campos son requeridos.', title: 'Opps!' });
        } else {
            this._adminService.loginAdmin({ email: this.email, password: this.password }).subscribe((res: any) => {
                if (res.resultadoExitoso) {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('_id', res.datos._id);
                    this._alertService.showAlert$.emit({ type: 'success', message: res.mensaje, title: 'Exito!' })
                    this._router.navigate(['/panel']);
                } else  this._alertService.showAlert$.emit({ type: 'error', message: res.mensaje, title: 'Opps!' })
            })
        }
    }
}
