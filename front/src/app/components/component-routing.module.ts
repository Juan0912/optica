import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexUsuariosComponent } from './usuarios/index-usuarios/index-usuarios.component';
import { CreateUsuarioComponent } from './usuarios/create-usuario/create-usuario.component';
import { AdminGuard } from '../guards/admin.guard';

@NgModule({
    imports: [RouterModule.forChild([
        { 
            path: 'usuarios',
            children: [
                {path:'inicio', component: IndexUsuariosComponent, canActivate: [AdminGuard]},
                {path:'registro', component: CreateUsuarioComponent, canActivate: [AdminGuard]},
            ]
        }
    ])],
    exports: [RouterModule]
})
export class ComponentsRoutingModule { }
