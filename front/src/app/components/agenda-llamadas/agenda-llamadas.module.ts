import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexAgendaLlamadasComponent } from './index-agenda-llamadas/index-agenda-llamadas.component';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    IndexAgendaLlamadasComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    TooltipModule
  ]
})
export class AgendaLlamadasModule { }
