import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexUsuariosComponent } from './index-usuarios/index-usuarios.component';
import { SharedsModule } from '../shareds/shareds.module';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';

import { CreateUsuarioComponent } from './create-usuario/create-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';

@NgModule({
  declarations: [
    IndexUsuariosComponent,
    CreateUsuarioComponent,
    EditUsuarioComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedsModule,
    TableModule,
    TagModule,
    ProgressBarModule,
    SliderModule,
    DropdownModule,
    MultiSelectModule,
    ButtonModule,
    TooltipModule,
    MenuModule,
    DialogModule
    
  ],
  exports: [IndexUsuariosComponent]
})
export class UsuariosModule { }
