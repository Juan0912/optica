import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';

import { IndexCitasComponent } from "../citas/index-citas/index-citas.component";
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    IndexCitasComponent,
  ],
  imports: [
    CommonModule,
    CalendarModule,
    TableModule,
    FormsModule
  ]
})
export class CitasModule { }
