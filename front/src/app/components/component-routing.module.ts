import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexUsuariosComponent } from './usuarios/index-usuarios/index-usuarios.component';
import { CreateUsuarioComponent } from './usuarios/create-usuario/create-usuario.component';
import { AdminGuard } from '../guards/admin.guard';
import { EditUsuarioComponent } from './usuarios/edit-usuario/edit-usuario.component';
import { IndexCitasComponent } from './citas/index-citas/index-citas.component';
import { IndexHistoriaClinicaComponent } from './usuarios/historia-clinica/index-historia-clinica/index-historia-clinica.component';
import { CreateHistoriaClinicaComponent } from './usuarios/historia-clinica/create-historia-clinica/create-historia-clinica.component';
import { IndexAgendaLlamadasComponent } from './agenda-llamadas/index-agenda-llamadas/index-agenda-llamadas.component';
import { CreateCitaComponent } from './citas/create-cita/create-cita.component';
import { EditCitaComponent } from './citas/edit-cita/edit-cita.component';

@NgModule({
    imports: [RouterModule.forChild([
        { 
            path: 'usuarios',
            children: [
                {path:'inicio', component: IndexUsuariosComponent, canActivate: [AdminGuard]},
                {path:'registro', component: CreateUsuarioComponent, canActivate: [AdminGuard]},
                {path:'editar/:id', component: EditUsuarioComponent, canActivate: [AdminGuard]},
                {path:'historia-clinica/inicio/:id', component: IndexHistoriaClinicaComponent, canActivate: [AdminGuard]},
                {path:'historia-clinica/registro/:id', component: CreateHistoriaClinicaComponent, canActivate: [AdminGuard]},
            ]
        }, 
        {
            path: 'consultas',
            children: [
                {path: 'inicio', component: IndexCitasComponent, canActivate: [AdminGuard]},
                {path: 'registro', component: CreateCitaComponent, canActivate: [AdminGuard]},
                {path: 'editar/:id', component: EditCitaComponent, canActivate: [AdminGuard]}
            ]
        },
        {
            path: 'agenda-llamadas', component: IndexAgendaLlamadasComponent, canActivate: [AdminGuard]
        }
    ])],
    exports: [RouterModule]
})
export class ComponentsRoutingModule { }
