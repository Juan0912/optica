import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { RequestsService } from 'src/app/services/requests.service';
import * as moment from 'moment-timezone';
import 'moment/locale/es';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;
    kpi: any = {};
    fechaActual: string = '';
    mesActual: string = '';

    constructor(private productService: ProductService, public layoutService: LayoutService, private _requestService: RequestsService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
       
        this._requestService.get('kpiConsultasPorMes').subscribe((res: any) => {
            this.kpi = res.datos.kpi;
            moment.locale('es');
            this.fechaActual = moment().tz('America/Bogota').format("LL");
            this.mesActual = `${moment().tz('America/Bogota').format('MMMM')} del ${moment().tz('America/Bogota').format('YYYY')}`;
            this.initChart();
        })
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [
                {
                    label: 'Año pasado',
                    data: [
                        this.kpi.pasado.enero,
                        this.kpi.pasado.febrero,
                        this.kpi.pasado.marzo,
                        this.kpi.pasado.abril,
                        this.kpi.pasado.mayo,
                        this.kpi.pasado.junio,
                        this.kpi.pasado.julio,
                        this.kpi.pasado.agosto,
                        this.kpi.pasado.septiembre,
                        this.kpi.pasado.octubre,
                        this.kpi.pasado.noviembre,
                        this.kpi.pasado.diciembre
                    ],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Año actual',
                    data: [
                        this.kpi.actual.enero,
                        this.kpi.actual.febrero,
                        this.kpi.actual.marzo,
                        this.kpi.actual.abril,
                        this.kpi.actual.mayo,
                        this.kpi.actual.junio,
                        this.kpi.actual.julio,
                        this.kpi.actual.agosto,
                        this.kpi.actual.septiembre,
                        this.kpi.actual.octubre,
                        this.kpi.actual.noviembre,
                        this.kpi.actual.diciembre,
                    ],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
