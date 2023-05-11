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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';

import { CreateUsuarioComponent } from './create-usuario/create-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { IndexHistoriaClinicaComponent } from './historia-clinica/index-historia-clinica/index-historia-clinica.component';
import { CreateHistoriaClinicaComponent } from './historia-clinica/create-historia-clinica/create-historia-clinica.component';

@NgModule({
  declarations: [
    IndexUsuariosComponent,
    CreateUsuarioComponent,
    EditUsuarioComponent,
    IndexHistoriaClinicaComponent,
    CreateHistoriaClinicaComponent,
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
    DialogModule,
    PanelModule,
    MenubarModule
  ],
  exports: [IndexUsuariosComponent]
})
export class UsuariosModule { }
