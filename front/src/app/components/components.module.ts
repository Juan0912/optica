import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ComponentsRoutingModule } from './component-routing.module';
import { SharedsModule } from './shareds/shareds.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptor/token.interceptor';
import { IndexCitasComponent } from './citas/index-citas/index-citas.component';





@NgModule({
  declarations: [
  
    IndexCitasComponent
  ],
  imports: [
    CommonModule,
    UsuariosModule,
    ComponentsRoutingModule,
    SharedsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
})
export class ComponentsModule { }
