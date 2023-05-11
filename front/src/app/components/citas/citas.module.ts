import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';

import { IndexCitasComponent } from "../citas/index-citas/index-citas.component";
import { FormsModule } from '@angular/forms';
import { CreateCitaComponent } from './create-cita/create-cita.component';
import { EditCitaComponent } from './edit-cita/edit-cita.component';
import { DialogModule } from 'primeng/dialog';




@NgModule({
  declarations: [
    IndexCitasComponent,
    CreateCitaComponent,
    EditCitaComponent,
  ],
  imports: [
    CommonModule,
    CalendarModule,
    TableModule,
    FormsModule,
    MenuModule,
    DialogModule
  ]
})
export class CitasModule { }
