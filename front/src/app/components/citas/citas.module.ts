import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';

import { IndexCitasComponent } from "../citas/index-citas/index-citas.component";
import { FormsModule } from '@angular/forms';
import { CreateCitaComponent } from './create-cita/create-cita.component';




@NgModule({
  declarations: [
    IndexCitasComponent,
    CreateCitaComponent,
  ],
  imports: [
    CommonModule,
    CalendarModule,
    TableModule,
    FormsModule,
    MenuModule
  ]
})
export class CitasModule { }
