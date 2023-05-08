import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AlertComponent } from './alert/alert.component';






@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    ToastModule
  ],
  exports: [AlertComponent]
})
export class SharedsModule { }
