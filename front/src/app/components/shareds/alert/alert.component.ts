import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.showAlert$.subscribe((data) => {
      if (data.type === 'info') this.messageService.add({ severity: 'info', summary: data.title, detail: data.message });
      if (data.type === 'success') this.messageService.add({ severity: 'success', summary: data.title, detail: data.message });
      if (data.type === 'warn') this.messageService.add({ severity: 'warn', summary: data.title, detail: data.message });
      if (data.type === 'error') this.messageService.add({ severity: 'error', summary: data.title, detail: data.message });
    });
  }

}
