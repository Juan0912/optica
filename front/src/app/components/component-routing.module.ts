import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexUsuariosComponent } from './usuarios/index-usuarios/index-usuarios.component';
import { CreateUsuarioComponent } from './usuarios/create-usuario/create-usuario.component';
import { AdminGuard } from '../guards/admin.guard';
import { EditUsuarioComponent } from './usuarios/edit-usuario/edit-usuario.component';

@NgModule({
    imports: [RouterModule.forChild([
        { 
            path: 'usuarios',
            children: [
                {path:'inicio', component: IndexUsuariosComponent, canActivate: [AdminGuard]},
                {path:'registro', component: CreateUsuarioComponent, canActivate: [AdminGuard]},
                {path:'editar/:id', component: EditUsuarioComponent, canActivate: [AdminGuard]},
            ]
        }
    ])],
    exports: [RouterModule]
})
export class ComponentsRoutingModule { }
