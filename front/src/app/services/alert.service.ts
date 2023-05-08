import { EventEmitter, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  showAlert$: EventEmitter<any> = new EventEmitter();

  constructor(
    private messageService: MessageService,
  ) { }




}
