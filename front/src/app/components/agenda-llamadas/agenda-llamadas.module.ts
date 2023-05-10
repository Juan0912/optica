import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexAgendaLlamadasComponent } from './index-agenda-llamadas/index-agenda-llamadas.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    IndexAgendaLlamadasComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class AgendaLlamadasModule { }
