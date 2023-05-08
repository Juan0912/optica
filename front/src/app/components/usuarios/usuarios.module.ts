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
import { CreateUsuarioComponent } from './create-usuario/create-usuario.component';

@NgModule({
  declarations: [
    IndexUsuariosComponent,
    CreateUsuarioComponent
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
    ButtonModule
  ],
  exports: [IndexUsuariosComponent]
})
export class UsuariosModule { }
