import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import * as moment from 'moment';
import { log } from 'console';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    usuarioLogado: any = {};
    hora: any;
    saludo: string = '';
    
    enviroment: any = environment;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private _router: Router) {
        this.usuarioLogado = localStorage.getItem('usuarioLogado');
        this.usuarioLogado = JSON.parse(this.usuarioLogado)
     }

     ngOnInit(): void {
        this.hora = moment().format('HH:mm');        
        this.definirSaludo();        
     }

    logout(){
        localStorage.clear();
        this._router.navigate(['/autenticacion']);
    }

    definirSaludo(){
        console.log(this.hora);

        if(this.hora >= moment().format('00:00') && this.hora < moment().format('12:00')) this.saludo = 'Buenas dias';
        if(this.hora >= moment().format('12:00') && this.hora < moment().format('18:00')) this.saludo = 'Buenas tardes';
        if(this.hora >= moment().format('18:00') && this.hora < moment().format('23:59')) this.saludo = 'Buenas noches';
        console.log(this.saludo);
        

        
    }
}
