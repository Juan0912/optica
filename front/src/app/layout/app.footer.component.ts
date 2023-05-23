import { Component } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import * as moment from 'moment';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {

    ano: any = moment().format('YYYY');

    constructor(public layoutService: LayoutService) { }


}
