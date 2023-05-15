import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexAgendaLlamadasComponent } from './index-agenda-llamadas/index-agenda-llamadas.component';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    IndexAgendaLlamadasComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    TooltipModule,
    InputSwitchModule,
    FormsModule,
    DropdownModule,

  ]
})
export class AgendaLlamadasModule { }
